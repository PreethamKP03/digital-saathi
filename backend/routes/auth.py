from flask import Blueprint, request, jsonify
from models import db, User, TrainerProfile, UserActivity
from services.auth_service import generate_token, login_required

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    email = data.get('email', '').strip().lower()
    phone = data.get('phone', '').strip()
    password = data.get('password', '').strip()
    role = data.get('role', 'student').strip().lower()
    preferred_language = data.get('preferred_language', 'en')
    village = data.get('village', '').strip()
    district = data.get('district', '').strip()
    state = data.get('state', 'Karnataka').strip()
    age = data.get('age')

    if not name or not email or not password:
        return jsonify({'success': False, 'message': 'Name, email, and password are required.'}), 400

    if role not in ['student', 'trainer', 'admin']:
        role = 'student'

    if User.query.filter_by(email=email).first():
        return jsonify({'success': False, 'message': 'An account with this email already exists.'}), 409

    user = User(
        name=name,
        email=email,
        phone=phone,
        role=role,
        preferred_language=preferred_language,
        village=village,
        district=district,
        state=state,
        age=int(age) if age else None
    )
    user.set_password(password)
    db.session.add(user)
    db.session.flush()

    if role == 'trainer':
        trainer = TrainerProfile(
            user_id=user.id,
            qualification=data.get('qualification', 'Community Educator'),
            organization=data.get('organization', 'Digital Saksharta Mission'),
            specialization=data.get('specialization', 'Rural Digital Literacy'),
            bio=data.get('bio', 'Dedicated to empowering rural citizens with essential digital skills.')
        )
        db.session.add(trainer)

    # Log activity
    act = UserActivity(user_id=user.id, activity_type='register', description=f'User registered as {role}')
    db.session.add(act)
    db.session.commit()

    token = generate_token(user)
    return jsonify({
        'success': True,
        'message': 'Registration successful! Welcome to Digital Saathi.',
        'token': token,
        'user': user.to_dict()
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    password = data.get('password', '').strip()

    if not email or not password:
        return jsonify({'success': False, 'message': 'Email and password are required.'}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({'success': False, 'message': 'Invalid email or password.'}), 401

    if not user.is_active:
        return jsonify({'success': False, 'message': 'Your account has been deactivated. Please contact support.'}), 403

    token = generate_token(user)

    # Log login activity
    act = UserActivity(user_id=user.id, activity_type='login', description='User logged in')
    db.session.add(act)
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'Login successful.',
        'token': token,
        'user': user.to_dict()
    }), 200

@auth_bp.route('/me', methods=['GET'])
@login_required
def get_current_user(current_user):
    return jsonify({
        'success': True,
        'user': current_user.to_dict()
    }), 200

@auth_bp.route('/profile', methods=['PUT'])
@login_required
def update_profile(current_user):
    data = request.get_json() or {}
    current_user.name = data.get('name', current_user.name).strip()
    current_user.phone = data.get('phone', current_user.phone)
    current_user.preferred_language = data.get('preferred_language', current_user.preferred_language)
    current_user.village = data.get('village', current_user.village)
    current_user.district = data.get('district', current_user.district)
    current_user.state = data.get('state', current_user.state)
    if 'age' in data and data['age']:
        try:
            current_user.age = int(data['age'])
        except ValueError:
            pass

    if current_user.role == 'trainer' and current_user.trainer_profile:
        current_user.trainer_profile.qualification = data.get('qualification', current_user.trainer_profile.qualification)
        current_user.trainer_profile.organization = data.get('organization', current_user.trainer_profile.organization)
        current_user.trainer_profile.specialization = data.get('specialization', current_user.trainer_profile.specialization)
        current_user.trainer_profile.bio = data.get('bio', current_user.trainer_profile.bio)

    db.session.commit()
    return jsonify({
        'success': True,
        'message': 'Profile updated successfully.',
        'user': current_user.to_dict()
    }), 200

@auth_bp.route('/change-password', methods=['PUT'])
@login_required
def change_password(current_user):
    data = request.get_json() or {}
    old_password = data.get('old_password', '')
    new_password = data.get('new_password', '').strip()

    if not current_user.check_password(old_password):
        return jsonify({'success': False, 'message': 'Incorrect current password.'}), 400

    if len(new_password) < 6:
        return jsonify({'success': False, 'message': 'New password must be at least 6 characters.'}), 400

    current_user.set_password(new_password)
    db.session.commit()
    return jsonify({'success': True, 'message': 'Password changed successfully.'}), 200
