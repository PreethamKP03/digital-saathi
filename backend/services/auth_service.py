import jwt
from datetime import datetime, timedelta
from functools import wraps
from flask import request, jsonify, current_app
from models import User

def generate_token(user):
    payload = {
        'sub': user.id,
        'email': user.email,
        'role': user.role,
        'name': user.name,
        'iat': datetime.utcnow(),
        'exp': datetime.utcnow() + timedelta(hours=current_app.config.get('JWT_EXPIRATION_HOURS', 72))
    }
    secret = current_app.config.get('SECRET_KEY', 'default-key')
    return jwt.encode(payload, secret, algorithm='HS256')

def decode_token(token):
    secret = current_app.config.get('SECRET_KEY', 'default-key')
    try:
        return jwt.decode(token, secret, algorithms=['HS256'])
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'success': False, 'message': 'Authentication required. Missing or invalid Bearer token.'}), 401
        
        token = auth_header.split(' ')[1]
        payload = decode_token(token)
        if not payload:
            return jsonify({'success': False, 'message': 'Token has expired or is invalid.'}), 401
        
        user = User.query.get(payload['sub'])
        if not user or not user.is_active:
            return jsonify({'success': False, 'message': 'User account inactive or not found.'}), 401
        
        return f(current_user=user, *args, **kwargs)
    return decorated

def role_required(*allowed_roles):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            auth_header = request.headers.get('Authorization')
            if not auth_header or not auth_header.startswith('Bearer '):
                return jsonify({'success': False, 'message': 'Authentication required.'}), 401
            
            token = auth_header.split(' ')[1]
            payload = decode_token(token)
            if not payload:
                return jsonify({'success': False, 'message': 'Invalid token.'}), 401
            
            user = User.query.get(payload['sub'])
            if not user or not user.is_active:
                return jsonify({'success': False, 'message': 'User not found.'}), 401
            
            if user.role not in allowed_roles:
                return jsonify({'success': False, 'message': f'Access forbidden. Role {user.role} is not permitted for this action.'}), 403
            
            return f(current_user=user, *args, **kwargs)
        return decorated
    return decorator
