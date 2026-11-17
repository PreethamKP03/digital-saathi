from flask import Blueprint, request, jsonify
from datetime import datetime
from models import db, Lesson, Course, Enrollment, UserProgress, UserActivity
from services.auth_service import login_required, role_required

lessons_bp = Blueprint('lessons', __name__)

@lessons_bp.route('/<int:lesson_id>', methods=['GET'])
def get_lesson(lesson_id):
    lang = request.args.get('lang', 'en')
    lesson = Lesson.query.get_or_404(lesson_id)
    course = Course.query.get(lesson.course_id)

    # Next and Previous lessons in this course
    all_lessons = course.lessons.order_by(Lesson.order_index.asc()).all()
    current_idx = next((i for i, l in enumerate(all_lessons) if l.id == lesson.id), -1)
    
    prev_id = all_lessons[current_idx - 1].id if current_idx > 0 else None
    next_id = all_lessons[current_idx + 1].id if current_idx < len(all_lessons) - 1 else None

    lesson_data = lesson.to_dict(lang=lang)
    lesson_data['prev_lesson_id'] = prev_id
    lesson_data['next_lesson_id'] = next_id
    lesson_data['course_title'] = course.title
    lesson_data['course_slug'] = course.slug
    lesson_data['total_lessons'] = len(all_lessons)

    return jsonify({
        'success': True,
        'lesson': lesson_data
    }), 200

@lessons_bp.route('/<int:lesson_id>/complete', methods=['POST'])
@login_required
def complete_lesson(current_user, lesson_id):
    lesson = Lesson.query.get_or_404(lesson_id)
    course = Course.query.get(lesson.course_id)

    # Auto-enroll user if not yet enrolled
    enrollment = Enrollment.query.filter_by(user_id=current_user.id, course_id=course.id).first()
    if not enrollment:
        enrollment = Enrollment(
            user_id=current_user.id,
            course_id=course.id,
            status='in_progress',
            progress_percentage=0
        )
        db.session.add(enrollment)
        db.session.flush()

    # Track lesson progress
    progress = UserProgress.query.filter_by(user_id=current_user.id, lesson_id=lesson.id).first()
    if not progress:
        progress = UserProgress(
            user_id=current_user.id,
            lesson_id=lesson.id,
            course_id=course.id,
            is_completed=True,
            completed_at=datetime.utcnow()
        )
        db.session.add(progress)
    else:
        progress.is_completed = True
        progress.completed_at = datetime.utcnow()

    # Calculate overall progress for this course
    total_lessons = course.lessons.count()
    completed_lessons = UserProgress.query.filter_by(
        user_id=current_user.id, course_id=course.id, is_completed=True
    ).count()

    percentage = int((completed_lessons / total_lessons) * 100) if total_lessons > 0 else 100
    enrollment.progress_percentage = min(percentage, 100)
    
    if enrollment.progress_percentage == 100 and course.quiz is None:
        enrollment.status = 'completed'
        enrollment.completed_at = datetime.utcnow()

    # Log activity
    act = UserActivity(
        user_id=current_user.id,
        activity_type='completed_lesson',
        description=f'Completed lesson: {lesson.title} ({percentage}% in {course.title})'
    )
    db.session.add(act)
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'Lesson completed!',
        'progress_percentage': enrollment.progress_percentage,
        'completed_lessons': completed_lessons,
        'total_lessons': total_lessons
    }), 200

@lessons_bp.route('', methods=['POST'])
@role_required('admin', 'trainer')
def create_lesson(current_user):
    data = request.get_json() or {}
    course_id = data.get('course_id')
    title = data.get('title', '').strip()
    content = data.get('content', '').strip()

    if not course_id or not title or not content:
        return jsonify({'success': False, 'message': 'course_id, title, and content are required.'}), 400

    course = Course.query.get_or_404(course_id)
    order_index = data.get('order_index', course.lessons.count() + 1)

    lesson = Lesson(
        course_id=course_id,
        title=title,
        title_kn=data.get('title_kn'),
        title_hi=data.get('title_hi'),
        content=content,
        content_kn=data.get('content_kn'),
        content_hi=data.get('content_hi'),
        summary=data.get('summary'),
        summary_kn=data.get('summary_kn'),
        summary_hi=data.get('summary_hi'),
        order_index=order_index,
        duration_minutes=data.get('duration_minutes', 15),
        video_url=data.get('video_url'),
        practical_action_type=data.get('practical_action_type')
    )
    db.session.add(lesson)
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'Lesson created successfully.',
        'lesson': lesson.to_dict()
    }), 201

@lessons_bp.route('/<int:lesson_id>', methods=['PUT'])
@role_required('admin', 'trainer')
def update_lesson(current_user, lesson_id):
    lesson = Lesson.query.get_or_404(lesson_id)
    data = request.get_json() or {}

    lesson.title = data.get('title', lesson.title)
    lesson.title_kn = data.get('title_kn', lesson.title_kn)
    lesson.title_hi = data.get('title_hi', lesson.title_hi)
    lesson.content = data.get('content', lesson.content)
    lesson.content_kn = data.get('content_kn', lesson.content_kn)
    lesson.content_hi = data.get('content_hi', lesson.content_hi)
    lesson.summary = data.get('summary', lesson.summary)
    lesson.summary_kn = data.get('summary_kn', lesson.summary_kn)
    lesson.summary_hi = data.get('summary_hi', lesson.summary_hi)
    lesson.order_index = data.get('order_index', lesson.order_index)
    lesson.duration_minutes = data.get('duration_minutes', lesson.duration_minutes)
    lesson.video_url = data.get('video_url', lesson.video_url)
    lesson.practical_action_type = data.get('practical_action_type', lesson.practical_action_type)

    db.session.commit()
    return jsonify({
        'success': True,
        'message': 'Lesson updated successfully.',
        'lesson': lesson.to_dict()
    }), 200

@lessons_bp.route('/<int:lesson_id>', methods=['DELETE'])
@role_required('admin', 'trainer')
def delete_lesson(current_user, lesson_id):
    lesson = Lesson.query.get_or_404(lesson_id)
    db.session.delete(lesson)
    db.session.commit()
    return jsonify({'success': True, 'message': 'Lesson deleted.'}), 200
