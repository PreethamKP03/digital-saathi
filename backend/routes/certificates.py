from flask import Blueprint, request, jsonify
from datetime import datetime
import uuid
from models import db, Certificate, Course, Enrollment, QuizResult, UserActivity
from services.auth_service import login_required

certificates_bp = Blueprint('certificates', __name__)

@certificates_bp.route('/my', methods=['GET'])
@login_required
def get_my_certificates(current_user):
    certs = Certificate.query.filter_by(user_id=current_user.id).order_by(Certificate.issue_date.desc()).all()
    return jsonify({
        'success': True,
        'certificates': [c.to_dict() for c in certs]
    }), 200

@certificates_bp.route('/<int:cert_id>', methods=['GET'])
@login_required
def get_certificate_detail(current_user, cert_id):
    cert = Certificate.query.get_or_404(cert_id)
    if cert.user_id != current_user.id and current_user.role not in ['admin', 'trainer']:
        return jsonify({'success': False, 'message': 'Access denied.'}), 403

    return jsonify({
        'success': True,
        'certificate': cert.to_dict()
    }), 200

@certificates_bp.route('/verify/<string:certificate_code>', methods=['GET'])
def verify_certificate(certificate_code):
    cert = Certificate.query.filter_by(certificate_code=certificate_code.strip()).first()
    if not cert:
        return jsonify({
            'success': False,
            'is_valid': False,
            'message': 'No certificate found with this verification code.'
        }), 404

    return jsonify({
        'success': True,
        'is_valid': True,
        'certificate': {
            'certificate_code': cert.certificate_code,
            'learner_name': cert.learner_name,
            'course_title': cert.course_title,
            'score_percentage': cert.score_percentage,
            'issue_date': cert.issue_date.strftime('%B %d, %Y') if cert.issue_date else None,
            'issuer': 'Digital Saathi – Rural Digital Literacy Mission',
            'verified_at': datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')
        }
    }), 200

@certificates_bp.route('/claim', methods=['POST'])
@login_required
def claim_certificate(current_user):
    data = request.get_json() or {}
    course_id = data.get('course_id')

    if not course_id:
        return jsonify({'success': False, 'message': 'course_id is required.'}), 400

    course = Course.query.get_or_404(course_id)

    # Verify completion
    enrollment = Enrollment.query.filter_by(user_id=current_user.id, course_id=course.id).first()
    if not enrollment or enrollment.status != 'completed':
        return jsonify({
            'success': False,
            'message': 'You must complete all lessons and pass the module assessment to earn this certificate.'
        }), 400

    # Check existing
    existing = Certificate.query.filter_by(user_id=current_user.id, course_id=course.id).first()
    if existing:
        return jsonify({
            'success': True,
            'message': 'Certificate already issued.',
            'certificate': existing.to_dict()
        }), 200

    # Get best quiz result
    quiz_result = QuizResult.query.filter_by(
        user_id=current_user.id,
        quiz_id=course.quiz.id if course.quiz else None,
        passed=True
    ).order_by(QuizResult.score_percentage.desc()).first()

    score = quiz_result.score_percentage if quiz_result else 100.0
    code = f"DS-{datetime.utcnow().year}-C{course.id}-U{current_user.id}-{uuid.uuid4().hex[:6].upper()}"

    cert = Certificate(
        certificate_code=code,
        user_id=current_user.id,
        course_id=course.id,
        quiz_result_id=quiz_result.id if quiz_result else None,
        score_percentage=score,
        learner_name=current_user.name,
        course_title=course.title,
        issue_date=datetime.utcnow()
    )
    db.session.add(cert)

    # Activity log
    act = UserActivity(
        user_id=current_user.id,
        activity_type='earned_certificate',
        description=f'Earned Certificate of Completion for {course.title} (Code: {code})'
    )
    db.session.add(act)
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'Congratulations! Your certificate has been issued.',
        'certificate': cert.to_dict()
    }), 201
