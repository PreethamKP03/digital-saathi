from flask import Blueprint, jsonify
from datetime import datetime
from models import db, Course, Lesson, Enrollment, QuizResult, Certificate, UserProgress, UserActivity
from services.auth_service import login_required

progress_bp = Blueprint('progress', __name__)

@progress_bp.route('/dashboard', methods=['GET'])
@login_required
def get_student_dashboard(current_user):
    user_id = current_user.id

    # Enrollments
    enrollments = Enrollment.query.filter_by(user_id=user_id).all()
    enrolled_count = len(enrollments)
    completed_count = sum(1 for e in enrollments if e.status == 'completed')
    ongoing_count = sum(1 for e in enrollments if e.status == 'in_progress')

    total_progress_sum = sum(e.progress_percentage for e in enrollments)
    overall_progress_pct = round(total_progress_sum / enrolled_count) if enrolled_count > 0 else 0

    # Quizzes
    quiz_results = QuizResult.query.filter_by(user_id=user_id).all()
    quizzes_taken = len(quiz_results)
    passed_quizzes = sum(1 for q in quiz_results if q.passed)
    avg_score = round(sum(q.score_percentage for q in quiz_results) / quizzes_taken, 1) if quizzes_taken > 0 else 0

    # Certificates
    certificates = Certificate.query.filter_by(user_id=user_id).all()
    certificates_count = len(certificates)

    # Recent activities (last 7)
    recent_activities = UserActivity.query.filter_by(user_id=user_id).order_by(
        UserActivity.created_at.desc()
    ).limit(7).all()

    # Recommended next lessons / courses to take
    # If user hasn't enrolled in some courses, recommend them.
    enrolled_course_ids = [e.course_id for e in enrollments]
    recommended_courses = Course.query.filter(
        Course.is_published == True,
        ~Course.id.in_(enrolled_course_ids) if enrolled_course_ids else True
    ).order_by(Course.module_number.asc()).limit(3).all()

    # Also recommend next incomplete lesson in ongoing course
    next_lesson = None
    if ongoing_count > 0:
        for e in enrollments:
            if e.status == 'in_progress':
                completed_ids = [
                    p.lesson_id for p in UserProgress.query.filter_by(
                        user_id=user_id, course_id=e.course_id, is_completed=True
                    ).all()
                ]
                pending_lesson = Lesson.query.filter(
                    Lesson.course_id == e.course_id,
                    ~Lesson.id.in_(completed_ids) if completed_ids else True
                ).order_by(Lesson.order_index.asc()).first()
                if pending_lesson:
                    next_lesson = {
                        'id': pending_lesson.id,
                        'title': pending_lesson.title,
                        'course_id': e.course_id,
                        'course_title': e.course.title if e.course else '',
                        'order_index': pending_lesson.order_index,
                        'duration_minutes': pending_lesson.duration_minutes
                    }
                    break

    # Achievement Badges Calculation
    badges = [
        {
            'id': 'welcome',
            'title': 'Digital Pioneer',
            'title_kn': 'ಡಿಜಿಟಲ್ ಆರಂಭಿಕ',
            'title_hi': 'डिजिटल पायनियर',
            'description': 'Joined the Digital Saathi Literacy Mission',
            'unlocked': True,
            'icon': 'Sparkles',
            'color': 'indigo'
        },
        {
            'id': 'first_lesson',
            'title': 'First Step',
            'title_kn': 'ಮೊದಲ ಹೆಜ್ಜೆ',
            'title_hi': 'पहला कदम',
            'description': 'Completed your very first digital lesson',
            'unlocked': UserProgress.query.filter_by(user_id=user_id, is_completed=True).count() >= 1,
            'icon': 'Award',
            'color': 'blue'
        },
        {
            'id': 'upi_safe',
            'title': 'UPI Safety Star',
            'title_kn': 'ಯುಪಿಐ ರಕ್ಷಕ',
            'title_hi': 'यूपीआई सुरक्षा स्टार',
            'description': 'Mastered safe digital banking without falling for scams',
            'unlocked': any(c.course_id == 4 for c in certificates) or any(q.quiz.course_id == 4 for q in quiz_results if q.passed and q.quiz),
            'icon': 'ShieldCheck',
            'color': 'emerald'
        },
        {
            'id': 'cyber_sentinel',
            'title': 'Cyber Guardian',
            'title_kn': 'ಸೈಬರ್ ಕಾವಲುಗಾರ',
            'title_hi': 'साइबर रक्षक',
            'description': 'Passed cybersecurity module and learned never to share OTP',
            'unlocked': any(c.course_id == 6 for c in certificates) or any(q.quiz.course_id == 6 for q in quiz_results if q.passed and q.quiz),
            'icon': 'Lock',
            'color': 'amber'
        },
        {
            'id': 'scholar',
            'title': 'Certified Scholar',
            'title_kn': 'ಪ್ರಮಾಣೀಕೃತ ವಿದ್ವಾಂಸ',
            'title_hi': 'प्रमाणित विद्वान',
            'description': 'Earned at least 2 course certificates',
            'unlocked': certificates_count >= 2,
            'icon': 'GraduationCap',
            'color': 'purple'
        }
    ]

    # Chart data: Course progress breakdown
    course_progress_data = [
        {
            'course_id': e.course_id,
            'course_title': e.course.title if e.course else f'Course #{e.course_id}',
            'progress': e.progress_percentage,
            'status': e.status
        }
        for e in enrollments
    ]

    return jsonify({
        'success': True,
        'summary': {
            'user_name': current_user.name,
            'preferred_language': current_user.preferred_language,
            'enrolled_courses': enrolled_count,
            'completed_courses': completed_count,
            'ongoing_courses': ongoing_count,
            'overall_progress_percentage': overall_progress_pct,
            'quizzes_taken': quizzes_taken,
            'passed_quizzes': passed_quizzes,
            'average_quiz_score': avg_score,
            'certificates_earned': certificates_count,
            'next_recommended_lesson': next_lesson
        },
        'course_progress': course_progress_data,
        'badges': badges,
        'recent_activities': [a.to_dict() for a in recent_activities],
        'recommended_courses': [c.to_dict() for c in recommended_courses],
        'certificates': [c.to_dict() for c in certificates]
    }), 200
