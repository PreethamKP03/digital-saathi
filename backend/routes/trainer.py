from flask import Blueprint, request, jsonify
from models import db, User, Course, Enrollment, QuizResult, TrainingProgram, LearningMaterial
from services.auth_service import login_required, role_required

trainer_bp = Blueprint('trainer', __name__)

@trainer_bp.route('/overview', methods=['GET'])
@role_required('trainer', 'admin')
def get_trainer_overview(current_user):
    # Total courses created or available
    courses_query = Course.query
    if current_user.role == 'trainer':
        # Trainer sees platform courses or those they authored
        authored_courses = Course.query.filter_by(created_by=current_user.id).all()
    else:
        authored_courses = Course.query.all()

    total_courses = len(authored_courses) if authored_courses else Course.query.count()
    total_students = User.query.filter_by(role='student').count()
    
    # Enrollments in trainer's courses
    course_ids = [c.id for c in authored_courses] if authored_courses else [c.id for c in Course.query.all()]
    enrollments_count = Enrollment.query.filter(Enrollment.course_id.in_(course_ids)).count() if course_ids else 0
    completions_count = Enrollment.query.filter(
        Enrollment.course_id.in_(course_ids),
        Enrollment.status == 'completed'
    ).count() if course_ids else 0

    # Quiz performance
    quiz_results = QuizResult.query.all()
    avg_score = round(sum(q.score_percentage for q in quiz_results) / len(quiz_results), 1) if quiz_results else 0

    return jsonify({
        'success': True,
        'stats': {
            'total_courses_managed': total_courses,
            'total_students_enrolled': enrollments_count,
            'total_course_completions': completions_count,
            'platform_students': total_students,
            'average_quiz_score': avg_score
        }
    }), 200

@trainer_bp.route('/students', methods=['GET'])
@role_required('trainer', 'admin')
def get_trainer_students(current_user):
    # List all students with their enrollment progress
    students = User.query.filter_by(role='student').order_by(User.created_at.desc()).all()
    
    student_list = []
    for s in students:
        s_enrollments = Enrollment.query.filter_by(user_id=s.id).all()
        s_quizzes = QuizResult.query.filter_by(user_id=s.id).all()
        avg_score = round(sum(q.score_percentage for q in s_quizzes) / len(s_quizzes), 1) if s_quizzes else 0
        
        student_list.append({
            'id': s.id,
            'name': s.name,
            'email': s.email,
            'phone': s.phone,
            'village': s.village,
            'district': s.district,
            'state': s.state,
            'preferred_language': s.preferred_language,
            'enrolled_courses_count': len(s_enrollments),
            'completed_courses_count': sum(1 for e in s_enrollments if e.status == 'completed'),
            'average_quiz_score': avg_score,
            'registered_date': s.created_at.strftime('%Y-%m-%d') if s.created_at else None
        })

    return jsonify({
        'success': True,
        'total': len(student_list),
        'students': student_list
    }), 200

@trainer_bp.route('/programs', methods=['GET'])
@role_required('trainer', 'admin')
def get_training_programs(current_user):
    programs = TrainingProgram.query.order_by(TrainingProgram.start_date.desc()).all()
    return jsonify({
        'success': True,
        'programs': [p.to_dict() for p in programs]
    }), 200

@trainer_bp.route('/programs', methods=['POST'])
@role_required('trainer', 'admin')
def create_training_program(current_user):
    data = request.get_json() or {}
    title = data.get('title', '').strip()
    if not title:
        return jsonify({'success': False, 'message': 'Title is required.'}), 400

    program = TrainingProgram(
        title=title,
        description=data.get('description'),
        target_group=data.get('target_group', 'Rural Community'),
        location=data.get('location', 'Village Community Center'),
        trainer_id=current_user.id,
        status=data.get('status', 'upcoming'),
        max_participants=data.get('max_participants', 40)
    )
    db.session.add(program)
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'Training program scheduled successfully.',
        'program': program.to_dict()
    }), 201

@trainer_bp.route('/materials', methods=['POST'])
@role_required('trainer', 'admin')
def upload_material(current_user):
    data = request.get_json() or {}
    course_id = data.get('course_id')
    title = data.get('title', '').strip()
    file_url = data.get('file_url', '').strip()

    if not course_id or not title:
        return jsonify({'success': False, 'message': 'course_id and title are required.'}), 400

    material = LearningMaterial(
        course_id=course_id,
        lesson_id=data.get('lesson_id'),
        title=title,
        material_type=data.get('material_type', 'guide'),
        file_url=file_url or 'https://example.com/materials/guide.pdf',
        file_size_kb=data.get('file_size_kb', 500),
        description=data.get('description')
    )
    db.session.add(material)
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'Learning material uploaded successfully.',
        'material': material.to_dict()
    }), 201
