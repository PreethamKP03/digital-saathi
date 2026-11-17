from flask import Blueprint, request, jsonify
from datetime import datetime
import json
import uuid
from models import db, Quiz, QuizQuestion, QuizResult, Course, Enrollment, Certificate, UserActivity
from services.auth_service import login_required, role_required

quizzes_bp = Blueprint('quizzes', __name__)

@quizzes_bp.route('/course/<int:course_id>', methods=['GET'])
def get_quiz_for_course(course_id):
    lang = request.args.get('lang', 'en')
    quiz = Quiz.query.filter_by(course_id=course_id).first()
    if not quiz:
        return jsonify({'success': False, 'message': 'No quiz found for this course.'}), 404

    return jsonify({
        'success': True,
        'quiz': quiz.to_dict(lang=lang, include_answers=False)
    }), 200

@quizzes_bp.route('/<int:quiz_id>/submit', methods=['POST'])
@login_required
def submit_quiz(current_user, quiz_id):
    quiz = Quiz.query.get_or_404(quiz_id)
    course = Course.query.get(quiz.course_id)
    lang = request.args.get('lang', 'en')

    data = request.get_json() or {}
    user_answers = data.get('answers', {}) # e.g. {"1": "A", "2": "C"}

    questions = quiz.questions.all()
    if not questions:
        return jsonify({'success': False, 'message': 'Quiz contains no questions.'}), 400

    total_questions = len(questions)
    correct_count = 0
    feedback_details = []

    for q in questions:
        submitted_opt = user_answers.get(str(q.id)) or user_answers.get(q.id)
        is_correct = (submitted_opt == q.correct_option)
        if is_correct:
            correct_count += 1

        exp = q.explanation
        if lang == 'kn' and q.explanation_kn:
            exp = q.explanation_kn
        elif lang == 'hi' and q.explanation_hi:
            exp = q.explanation_hi

        feedback_details.append({
            'question_id': q.id,
            'question': q.question,
            'submitted_option': submitted_opt,
            'correct_option': q.correct_option,
            'is_correct': is_correct,
            'explanation': exp
        })

    score_percentage = (correct_count / total_questions) * 100.0
    passed = score_percentage >= quiz.passing_score

    # Save Quiz Result
    result = QuizResult(
        user_id=current_user.id,
        quiz_id=quiz.id,
        total_questions=total_questions,
        correct_answers=correct_count,
        score_percentage=score_percentage,
        passed=passed,
        user_answers=json.dumps(user_answers),
        attempt_date=datetime.utcnow()
    )
    db.session.add(result)
    db.session.flush()

    # Update enrollment if passed
    enrollment = Enrollment.query.filter_by(user_id=current_user.id, course_id=course.id).first()
    if not enrollment:
        enrollment = Enrollment(
            user_id=current_user.id,
            course_id=course.id,
            status='completed' if passed else 'in_progress',
            progress_percentage=100 if passed else 90
        )
        db.session.add(enrollment)
    else:
        if passed:
            enrollment.status = 'completed'
            enrollment.progress_percentage = 100
            enrollment.completed_at = datetime.utcnow()

    # Check / Create Certificate if passed
    certificate_code = None
    if passed:
        existing_cert = Certificate.query.filter_by(user_id=current_user.id, course_id=course.id).first()
        if not existing_cert:
            code = f"DS-{datetime.utcnow().year}-C{course.id}-U{current_user.id}-{uuid.uuid4().hex[:6].upper()}"
            cert = Certificate(
                certificate_code=code,
                user_id=current_user.id,
                course_id=course.id,
                quiz_result_id=result.id,
                score_percentage=score_percentage,
                learner_name=current_user.name,
                course_title=course.title,
                issue_date=datetime.utcnow()
            )
            db.session.add(cert)
            certificate_code = code
        else:
            certificate_code = existing_cert.certificate_code
            if score_percentage > existing_cert.score_percentage:
                existing_cert.score_percentage = score_percentage
                existing_cert.quiz_result_id = result.id

    # Improvement Suggestions
    improvement_tips = []
    if not passed:
        improvement_tips.append("Review the course lessons once more, especially the safety instructions and practical steps.")
        improvement_tips.append("Ask Digital Saathi Assistant for clarifications on topics you found tricky.")
        improvement_tips.append("You can retake this quiz at any time to earn your certificate!")
    elif score_percentage < 100:
        improvement_tips.append("Great job passing! Review the few questions missed to achieve a 100% mastery score.")
        improvement_tips.append("Share your newfound knowledge with friends and family in your village.")
    else:
        improvement_tips.append("Outstanding perfect score! You are now a certified Digital Saathi in this module.")

    # Log activity
    act = UserActivity(
        user_id=current_user.id,
        activity_type='quiz_passed' if passed else 'quiz_attempted',
        description=f"{'Passed' if passed else 'Attempted'} quiz for {course.title} with score {round(score_percentage, 1)}%"
    )
    db.session.add(act)
    db.session.commit()

    return jsonify({
        'success': True,
        'result_id': result.id,
        'total_questions': total_questions,
        'correct_answers': correct_count,
        'score_percentage': round(score_percentage, 1),
        'passing_score': quiz.passing_score,
        'passed': passed,
        'feedback': feedback_details,
        'improvement_tips': improvement_tips,
        'certificate_code': certificate_code,
        'can_download_certificate': passed
    }), 200

@quizzes_bp.route('/history', methods=['GET'])
@login_required
def get_quiz_history(current_user):
    results = QuizResult.query.filter_by(user_id=current_user.id).order_by(QuizResult.attempt_date.desc()).all()
    return jsonify({
        'success': True,
        'results': [r.to_dict() for r in results]
    }), 200

@quizzes_bp.route('', methods=['POST'])
@role_required('admin', 'trainer')
def create_quiz(current_user):
    data = request.get_json() or {}
    course_id = data.get('course_id')
    title = data.get('title', '').strip()

    if not course_id or not title:
        return jsonify({'success': False, 'message': 'course_id and title are required.'}), 400

    existing = Quiz.query.filter_by(course_id=course_id).first()
    if existing:
        return jsonify({'success': False, 'message': 'Quiz already exists for this course.'}), 400

    quiz = Quiz(
        course_id=course_id,
        title=title,
        title_kn=data.get('title_kn'),
        title_hi=data.get('title_hi'),
        passing_score=data.get('passing_score', 60),
        time_limit_minutes=data.get('time_limit_minutes', 15)
    )
    db.session.add(quiz)
    db.session.commit()

    return jsonify({'success': True, 'quiz': quiz.to_dict()}), 201

@quizzes_bp.route('/<int:quiz_id>/questions', methods=['POST'])
@role_required('admin', 'trainer')
def add_quiz_question(current_user, quiz_id):
    quiz = Quiz.query.get_or_404(quiz_id)
    data = request.get_json() or {}

    question = QuizQuestion(
        quiz_id=quiz.id,
        question=data.get('question'),
        question_kn=data.get('question_kn'),
        question_hi=data.get('question_hi'),
        option_a=data.get('option_a'),
        option_b=data.get('option_b'),
        option_c=data.get('option_c'),
        option_d=data.get('option_d'),
        option_a_kn=data.get('option_a_kn'),
        option_b_kn=data.get('option_b_kn'),
        option_c_kn=data.get('option_c_kn'),
        option_d_kn=data.get('option_d_kn'),
        option_a_hi=data.get('option_a_hi'),
        option_b_hi=data.get('option_b_hi'),
        option_c_hi=data.get('option_c_hi'),
        option_d_hi=data.get('option_d_hi'),
        correct_option=data.get('correct_option', 'A').upper(),
        explanation=data.get('explanation'),
        explanation_kn=data.get('explanation_kn'),
        explanation_hi=data.get('explanation_hi'),
        order_index=data.get('order_index', quiz.questions.count() + 1)
    )
    db.session.add(question)
    db.session.commit()

    return jsonify({'success': True, 'question': question.to_dict(include_answer=True)}), 201
