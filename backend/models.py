from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import json

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    phone = db.Column(db.String(20), nullable=True)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='student', nullable=False)  # 'student', 'trainer', 'admin'
    preferred_language = db.Column(db.String(10), default='en')         # 'en', 'kn', 'hi'
    village = db.Column(db.String(100), nullable=True)
    district = db.Column(db.String(100), nullable=True)
    state = db.Column(db.String(100), default='Karnataka', nullable=True)
    age = db.Column(db.Integer, nullable=True)
    avatar = db.Column(db.String(255), nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    trainer_profile = db.relationship('TrainerProfile', backref='user', uselist=False, cascade='all, delete-orphan')
    enrollments = db.relationship('Enrollment', backref='user', lazy='dynamic', cascade='all, delete-orphan')
    quiz_results = db.relationship('QuizResult', backref='user', lazy='dynamic', cascade='all, delete-orphan')
    progress_entries = db.relationship('UserProgress', backref='user', lazy='dynamic', cascade='all, delete-orphan')
    certificates = db.relationship('Certificate', backref='user', lazy='dynamic', cascade='all, delete-orphan')
    activities = db.relationship('UserActivity', backref='user', lazy='dynamic', cascade='all, delete-orphan')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self, include_sensitive=False):
        data = {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'role': self.role,
            'preferred_language': self.preferred_language,
            'village': self.village,
            'district': self.district,
            'state': self.state,
            'age': self.age,
            'avatar': self.avatar or f"https://api.dicebear.com/7.x/bottts/svg?seed={self.email}",
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
        if self.role == 'trainer' and self.trainer_profile:
            data['trainer_profile'] = self.trainer_profile.to_dict()
        return data


class TrainerProfile(db.Model):
    __tablename__ = 'trainers'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), unique=True, nullable=False)
    qualification = db.Column(db.String(200), nullable=True)
    organization = db.Column(db.String(200), nullable=True)
    specialization = db.Column(db.String(200), nullable=True)
    bio = db.Column(db.Text, nullable=True)
    assigned_region = db.Column(db.String(100), nullable=True)
    is_verified = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'qualification': self.qualification,
            'organization': self.organization,
            'specialization': self.specialization,
            'bio': self.bio,
            'assigned_region': self.assigned_region,
            'is_verified': self.is_verified,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Course(db.Model):
    __tablename__ = 'courses'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    title_kn = db.Column(db.String(200), nullable=True)
    title_hi = db.Column(db.String(200), nullable=True)
    slug = db.Column(db.String(200), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    description_kn = db.Column(db.Text, nullable=True)
    description_hi = db.Column(db.Text, nullable=True)
    category = db.Column(db.String(100), nullable=False)
    difficulty = db.Column(db.String(50), default='Beginner')
    estimated_hours = db.Column(db.Integer, default=2)
    thumbnail = db.Column(db.String(255), nullable=True)
    icon = db.Column(db.String(50), default='BookOpen')
    module_number = db.Column(db.Integer, default=1)
    is_published = db.Column(db.Boolean, default=True)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='SET NULL'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    lessons = db.relationship('Lesson', backref='course', lazy='dynamic', cascade='all, delete-orphan', order_by='Lesson.order_index')
    materials = db.relationship('LearningMaterial', backref='course', lazy='dynamic', cascade='all, delete-orphan')
    quiz = db.relationship('Quiz', backref='course', uselist=False, cascade='all, delete-orphan')
    enrollments = db.relationship('Enrollment', backref='course', lazy='dynamic', cascade='all, delete-orphan')

    def to_dict(self, lang='en'):
        title = self.title
        desc = self.description
        if lang == 'kn' and self.title_kn:
            title = self.title_kn
            desc = self.description_kn or self.description
        elif lang == 'hi' and self.title_hi:
            title = self.title_hi
            desc = self.description_hi or self.description

        return {
            'id': self.id,
            'title': title,
            'title_en': self.title,
            'title_kn': self.title_kn,
            'title_hi': self.title_hi,
            'slug': self.slug,
            'description': desc,
            'description_en': self.description,
            'description_kn': self.description_kn,
            'description_hi': self.description_hi,
            'category': self.category,
            'difficulty': self.difficulty,
            'estimated_hours': self.estimated_hours,
            'thumbnail': self.thumbnail,
            'icon': self.icon,
            'module_number': self.module_number,
            'is_published': self.is_published,
            'lessons_count': self.lessons.count(),
            'has_quiz': self.quiz is not None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Lesson(db.Model):
    __tablename__ = 'lessons'

    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id', ondelete='CASCADE'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    title_kn = db.Column(db.String(200), nullable=True)
    title_hi = db.Column(db.String(200), nullable=True)
    content = db.Column(db.Text, nullable=False)
    content_kn = db.Column(db.Text, nullable=True)
    content_hi = db.Column(db.Text, nullable=True)
    summary = db.Column(db.Text, nullable=True)
    summary_kn = db.Column(db.Text, nullable=True)
    summary_hi = db.Column(db.Text, nullable=True)
    order_index = db.Column(db.Integer, default=1)
    duration_minutes = db.Column(db.Integer, default=15)
    video_url = db.Column(db.String(255), nullable=True)
    practical_action_type = db.Column(db.String(100), nullable=True) # 'upi_simulation', 'phishing_detector', etc.
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self, lang='en'):
        title = self.title
        content = self.content
        summary = self.summary
        if lang == 'kn' and self.title_kn:
            title = self.title_kn
            content = self.content_kn or self.content
            summary = self.summary_kn or self.summary
        elif lang == 'hi' and self.title_hi:
            title = self.title_hi
            content = self.content_hi or self.content
            summary = self.summary_hi or self.summary

        return {
            'id': self.id,
            'course_id': self.course_id,
            'title': title,
            'title_en': self.title,
            'title_kn': self.title_kn,
            'title_hi': self.title_hi,
            'content': content,
            'content_en': self.content,
            'content_kn': self.content_kn,
            'content_hi': self.content_hi,
            'summary': summary,
            'summary_en': self.summary,
            'summary_kn': self.summary_kn,
            'summary_hi': self.summary_hi,
            'order_index': self.order_index,
            'duration_minutes': self.duration_minutes,
            'video_url': self.video_url,
            'practical_action_type': self.practical_action_type,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class LearningMaterial(db.Model):
    __tablename__ = 'learning_materials'

    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id', ondelete='CASCADE'), nullable=False)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id', ondelete='SET NULL'), nullable=True)
    title = db.Column(db.String(200), nullable=False)
    material_type = db.Column(db.String(50), nullable=False) # 'pdf', 'guide', 'infographic', 'cheatsheet'
    file_url = db.Column(db.String(255), nullable=False)
    file_size_kb = db.Column(db.Integer, default=0)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'course_id': self.course_id,
            'lesson_id': self.lesson_id,
            'title': self.title,
            'material_type': self.material_type,
            'file_url': self.file_url,
            'file_size_kb': self.file_size_kb,
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Enrollment(db.Model):
    __tablename__ = 'enrollments'
    __table_args__ = (db.UniqueConstraint('user_id', 'course_id', name='uq_user_course'),)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id', ondelete='CASCADE'), nullable=False)
    status = db.Column(db.String(50), default='in_progress') # 'in_progress', 'completed'
    progress_percentage = db.Column(db.Integer, default=0)
    enrolled_at = db.Column(db.DateTime, default=datetime.utcnow)
    completed_at = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'course_id': self.course_id,
            'status': self.status,
            'progress_percentage': self.progress_percentage,
            'enrolled_at': self.enrolled_at.isoformat() if self.enrolled_at else None,
            'completed_at': self.completed_at.isoformat() if self.completed_at else None,
            'course': self.course.to_dict() if self.course else None
        }


class Quiz(db.Model):
    __tablename__ = 'quizzes'

    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id', ondelete='CASCADE'), unique=True, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    title_kn = db.Column(db.String(200), nullable=True)
    title_hi = db.Column(db.String(200), nullable=True)
    passing_score = db.Column(db.Integer, default=60) # percentage
    time_limit_minutes = db.Column(db.Integer, default=15)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    questions = db.relationship('QuizQuestion', backref='quiz', lazy='dynamic', cascade='all, delete-orphan', order_by='QuizQuestion.order_index')
    results = db.relationship('QuizResult', backref='quiz', lazy='dynamic', cascade='all, delete-orphan')

    def to_dict(self, lang='en', include_answers=False):
        title = self.title
        if lang == 'kn' and self.title_kn:
            title = self.title_kn
        elif lang == 'hi' and self.title_hi:
            title = self.title_hi

        questions_data = [q.to_dict(lang=lang, include_answer=include_answers) for q in self.questions.all()]

        return {
            'id': self.id,
            'course_id': self.course_id,
            'title': title,
            'title_en': self.title,
            'title_kn': self.title_kn,
            'title_hi': self.title_hi,
            'passing_score': self.passing_score,
            'time_limit_minutes': self.time_limit_minutes,
            'total_questions': len(questions_data),
            'questions': questions_data
        }


class QuizQuestion(db.Model):
    __tablename__ = 'quiz_questions'

    id = db.Column(db.Integer, primary_key=True)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quizzes.id', ondelete='CASCADE'), nullable=False)
    question = db.Column(db.Text, nullable=False)
    question_kn = db.Column(db.Text, nullable=True)
    question_hi = db.Column(db.Text, nullable=True)
    option_a = db.Column(db.String(255), nullable=False)
    option_b = db.Column(db.String(255), nullable=False)
    option_c = db.Column(db.String(255), nullable=False)
    option_d = db.Column(db.String(255), nullable=False)
    option_a_kn = db.Column(db.String(255), nullable=True)
    option_b_kn = db.Column(db.String(255), nullable=True)
    option_c_kn = db.Column(db.String(255), nullable=True)
    option_d_kn = db.Column(db.String(255), nullable=True)
    option_a_hi = db.Column(db.String(255), nullable=True)
    option_b_hi = db.Column(db.String(255), nullable=True)
    option_c_hi = db.Column(db.String(255), nullable=True)
    option_d_hi = db.Column(db.String(255), nullable=True)
    correct_option = db.Column(db.String(1), nullable=False) # 'A', 'B', 'C', 'D'
    explanation = db.Column(db.Text, nullable=True)
    explanation_kn = db.Column(db.Text, nullable=True)
    explanation_hi = db.Column(db.Text, nullable=True)
    order_index = db.Column(db.Integer, default=1)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self, lang='en', include_answer=False):
        q_text = self.question
        opt_a = self.option_a
        opt_b = self.option_b
        opt_c = self.option_c
        opt_d = self.option_d
        exp = self.explanation

        if lang == 'kn' and self.question_kn:
            q_text = self.question_kn
            opt_a = self.option_a_kn or self.option_a
            opt_b = self.option_b_kn or self.option_b
            opt_c = self.option_c_kn or self.option_c
            opt_d = self.option_d_kn or self.option_d
            exp = self.explanation_kn or self.explanation
        elif lang == 'hi' and self.question_hi:
            q_text = self.question_hi
            opt_a = self.option_a_hi or self.option_a
            opt_b = self.option_b_hi or self.option_b
            opt_c = self.option_c_hi or self.option_c
            opt_d = self.option_d_hi or self.option_d
            exp = self.explanation_hi or self.explanation

        data = {
            'id': self.id,
            'quiz_id': self.quiz_id,
            'question': q_text,
            'option_a': opt_a,
            'option_b': opt_b,
            'option_c': opt_c,
            'option_d': opt_d,
            'options': [
                {'key': 'A', 'text': opt_a},
                {'key': 'B', 'text': opt_b},
                {'key': 'C', 'text': opt_c},
                {'key': 'D', 'text': opt_d}
            ],
            'order_index': self.order_index
        }
        if include_answer:
            data['correct_option'] = self.correct_option
            data['explanation'] = exp
        return data


class QuizResult(db.Model):
    __tablename__ = 'quiz_results'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quizzes.id', ondelete='CASCADE'), nullable=False)
    total_questions = db.Column(db.Integer, nullable=False)
    correct_answers = db.Column(db.Integer, nullable=False)
    score_percentage = db.Column(db.Float, nullable=False)
    passed = db.Column(db.Boolean, nullable=False)
    user_answers = db.Column(db.Text, nullable=True) # JSON of user chosen answers
    attempt_date = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        answers = []
        if self.user_answers:
            try:
                answers = json.loads(self.user_answers)
            except Exception:
                answers = []
        return {
            'id': self.id,
            'user_id': self.user_id,
            'quiz_id': self.quiz_id,
            'total_questions': self.total_questions,
            'correct_answers': self.correct_answers,
            'score_percentage': round(self.score_percentage, 1),
            'passed': self.passed,
            'user_answers': answers,
            'attempt_date': self.attempt_date.isoformat() if self.attempt_date else None,
            'quiz_title': self.quiz.title if self.quiz else 'Assessment'
        }


class UserProgress(db.Model):
    __tablename__ = 'learning_progress'
    __table_args__ = (db.UniqueConstraint('user_id', 'lesson_id', name='uq_user_lesson'),)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id', ondelete='CASCADE'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id', ondelete='CASCADE'), nullable=False)
    is_completed = db.Column(db.Boolean, default=False)
    completed_at = db.Column(db.DateTime, nullable=True)
    time_spent_seconds = db.Column(db.Integer, default=0)
    last_accessed = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'lesson_id': self.lesson_id,
            'course_id': self.course_id,
            'is_completed': self.is_completed,
            'completed_at': self.completed_at.isoformat() if self.completed_at else None,
            'time_spent_seconds': self.time_spent_seconds,
            'last_accessed': self.last_accessed.isoformat() if self.last_accessed else None
        }


class Certificate(db.Model):
    __tablename__ = 'certificates'

    id = db.Column(db.Integer, primary_key=True)
    certificate_code = db.Column(db.String(100), unique=True, nullable=False, index=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id', ondelete='CASCADE'), nullable=False)
    quiz_result_id = db.Column(db.Integer, db.ForeignKey('quiz_results.id', ondelete='SET NULL'), nullable=True)
    score_percentage = db.Column(db.Float, nullable=False)
    learner_name = db.Column(db.String(120), nullable=False)
    course_title = db.Column(db.String(200), nullable=False)
    issue_date = db.Column(db.DateTime, default=datetime.utcnow)
    certificate_url = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'certificate_code': self.certificate_code,
            'user_id': self.user_id,
            'course_id': self.course_id,
            'quiz_result_id': self.quiz_result_id,
            'score_percentage': round(self.score_percentage, 1),
            'learner_name': self.learner_name,
            'course_title': self.course_title,
            'issue_date': self.issue_date.isoformat() if self.issue_date else None,
            'certificate_url': self.certificate_url
        }


class TrainingProgram(db.Model):
    __tablename__ = 'training_programs'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    target_group = db.Column(db.String(100), default='Rural Community') # 'Farmers', 'Women SHG', 'Village Elders', 'Students'
    location = db.Column(db.String(200), nullable=True)
    start_date = db.Column(db.Date, nullable=True)
    end_date = db.Column(db.Date, nullable=True)
    trainer_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='SET NULL'), nullable=True)
    status = db.Column(db.String(50), default='upcoming') # 'upcoming', 'ongoing', 'completed'
    max_participants = db.Column(db.Integer, default=50)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationship to trainer
    trainer = db.relationship('User', backref='programs_trained', foreign_keys=[trainer_id])

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'target_group': self.target_group,
            'location': self.location,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'trainer_id': self.trainer_id,
            'trainer_name': self.trainer.name if self.trainer else 'Unassigned',
            'status': self.status,
            'max_participants': self.max_participants,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class UserActivity(db.Model):
    __tablename__ = 'user_activities'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    activity_type = db.Column(db.String(100), nullable=False) # 'login', 'enrolled', 'completed_lesson', 'quiz_passed', 'certificate_generated'
    description = db.Column(db.Text, nullable=True)
    ip_address = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'activity_type': self.activity_type,
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
