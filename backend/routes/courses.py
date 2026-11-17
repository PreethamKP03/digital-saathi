from flask import Blueprint, request, jsonify
from models import db, Course, Lesson, LearningMaterial, Enrollment, UserProgress, UserActivity, Quiz
from services.auth_service import login_required, role_required, decode_token
import re

courses_bp = Blueprint('courses', __name__)

def slugify(text):
    text = re.sub(r'[^\w\s-]', '', text).strip().lower()
    return re.sub(r'[-\s]+', '-', text)

@courses_bp.route('', methods=['GET'])
def get_courses():
    lang = request.args.get('lang', 'en')
    category = request.args.get('category')
    difficulty = request.args.get('difficulty')
    search = request.args.get('search', '').strip()

    query = Course.query.filter_by(is_published=True)

    if category and category != 'All':
        query = query.filter_by(category=category)
    if difficulty and difficulty != 'All':
        query = query.filter_by(difficulty=difficulty)
    if search:
        query = query.filter(
            (Course.title.ilike(f'%{search}%')) |
            (Course.description.ilike(f'%{search}%')) |
            (Course.category.ilike(f'%{search}%'))
        )

    courses = query.order_by(Course.module_number.asc()).all()
    courses_data = [c.to_dict(lang=lang) for c in courses]

    # If logged in user, attach enrollment progress
    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith('Bearer '):
        token = auth_header.split(' ')[1]
        payload = decode_token(token)
        if payload:
            user_id = payload['sub']
            user_enrollments = {e.course_id: e for e in Enrollment.query.filter_by(user_id=user_id).all()}
            for c in courses_data:
                enrollment = user_enrollments.get(c['id'])
                c['enrolled'] = enrollment is not None
                c['progress_percentage'] = enrollment.progress_percentage if enrollment else 0
                c['status'] = enrollment.status if enrollment else 'not_enrolled'

    return jsonify({
        'success': True,
        'count': len(courses_data),
        'courses': courses_data
    }), 200

@courses_bp.route('/<int:course_id>', methods=['GET'])
def get_course_detail(course_id):
    lang = request.args.get('lang', 'en')
    course = Course.query.get_or_404(course_id)
    
    course_data = course.to_dict(lang=lang)
    lessons = [l.to_dict(lang=lang) for l in course.lessons.order_by(Lesson.order_index.asc()).all()]
    materials = [m.to_dict() for m in course.materials.all()]
    
    course_data['lessons'] = lessons
    course_data['materials'] = materials
    course_data['has_quiz'] = course.quiz is not None
    if course.quiz:
        course_data['quiz_id'] = course.quiz.id
        course_data['quiz_title'] = course.quiz.title
        course_data['quiz_passing_score'] = course.quiz.passing_score

    # Check user enrollment & progress
    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith('Bearer '):
        token = auth_header.split(' ')[1]
        payload = decode_token(token)
        if payload:
            user_id = payload['sub']
            enrollment = Enrollment.query.filter_by(user_id=user_id, course_id=course.id).first()
            course_data['enrolled'] = enrollment is not None
            course_data['progress_percentage'] = enrollment.progress_percentage if enrollment else 0
            course_data['status'] = enrollment.status if enrollment else 'not_enrolled'

            # Completed lesson IDs
            completed_lesson_ids = [
                p.lesson_id for p in UserProgress.query.filter_by(
                    user_id=user_id, course_id=course.id, is_completed=True
                ).all()
            ]
            course_data['completed_lesson_ids'] = completed_lesson_ids

    return jsonify({
        'success': True,
        'course': course_data
    }), 200

@courses_bp.route('/<int:course_id>/enroll', methods=['POST'])
@login_required
def enroll_course(current_user, course_id):
    course = Course.query.get_or_404(course_id)
    
    enrollment = Enrollment.query.filter_by(user_id=current_user.id, course_id=course.id).first()
    if enrollment:
        return jsonify({
            'success': True,
            'message': 'Already enrolled in this course.',
            'enrollment': enrollment.to_dict()
        }), 200

    new_enrollment = Enrollment(
        user_id=current_user.id,
        course_id=course.id,
        status='in_progress',
        progress_percentage=0
    )
    db.session.add(new_enrollment)

    # Log activity
    act = UserActivity(
        user_id=current_user.id,
        activity_type='enrolled',
        description=f'Enrolled in course: {course.title}'
    )
    db.session.add(act)
    db.session.commit()

    return jsonify({
        'success': True,
        'message': f'Successfully enrolled in {course.title}!',
        'enrollment': new_enrollment.to_dict()
    }), 201

@courses_bp.route('', methods=['POST'])
@role_required('admin', 'trainer')
def create_course(current_user):
    data = request.get_json() or {}
    title = data.get('title', '').strip()
    if not title:
        return jsonify({'success': False, 'message': 'Course title is required.'}), 400

    slug = slugify(title)
    existing = Course.query.filter_by(slug=slug).first()
    if existing:
        slug = f"{slug}-{Course.query.count() + 1}"

    course = Course(
        title=title,
        title_kn=data.get('title_kn'),
        title_hi=data.get('title_hi'),
        slug=slug,
        description=data.get('description', ''),
        description_kn=data.get('description_kn'),
        description_hi=data.get('description_hi'),
        category=data.get('category', 'Digital Basics'),
        difficulty=data.get('difficulty', 'Beginner'),
        estimated_hours=data.get('estimated_hours', 2),
        thumbnail=data.get('thumbnail'),
        icon=data.get('icon', 'BookOpen'),
        module_number=data.get('module_number', Course.query.count() + 1),
        is_published=data.get('is_published', True),
        created_by=current_user.id
    )
    db.session.add(course)
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'Course created successfully.',
        'course': course.to_dict()
    }), 201

@courses_bp.route('/<int:course_id>', methods=['PUT'])
@role_required('admin', 'trainer')
def update_course(current_user, course_id):
    course = Course.query.get_or_404(course_id)
    data = request.get_json() or {}

    course.title = data.get('title', course.title)
    course.title_kn = data.get('title_kn', course.title_kn)
    course.title_hi = data.get('title_hi', course.title_hi)
    course.description = data.get('description', course.description)
    course.description_kn = data.get('description_kn', course.description_kn)
    course.description_hi = data.get('description_hi', course.description_hi)
    course.category = data.get('category', course.category)
    course.difficulty = data.get('difficulty', course.difficulty)
    course.estimated_hours = data.get('estimated_hours', course.estimated_hours)
    course.thumbnail = data.get('thumbnail', course.thumbnail)
    course.icon = data.get('icon', course.icon)
    course.module_number = data.get('module_number', course.module_number)
    course.is_published = data.get('is_published', course.is_published)

    db.session.commit()
    return jsonify({
        'success': True,
        'message': 'Course updated successfully.',
        'course': course.to_dict()
    }), 200

@courses_bp.route('/<int:course_id>', methods=['DELETE'])
@role_required('admin')
def delete_course(current_user, course_id):
    course = Course.query.get_or_404(course_id)
    db.session.delete(course)
    db.session.commit()
    return jsonify({
        'success': True,
        'message': 'Course deleted successfully.'
    }), 200
