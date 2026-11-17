import os
from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from models import db

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Enable CORS for frontend Vite dev server & production origin
    CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

    # Initialize extensions
    db.init_app(app)

    # Register blueprints
    from routes.auth import auth_bp
    from routes.courses import courses_bp
    from routes.lessons import lessons_bp
    from routes.quizzes import quizzes_bp
    from routes.certificates import certificates_bp
    from routes.progress import progress_bp
    from routes.ai_chat import ai_bp
    from routes.trainer import trainer_bp
    from routes.admin import admin_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(courses_bp, url_prefix='/api/courses')
    app.register_blueprint(lessons_bp, url_prefix='/api/lessons')
    app.register_blueprint(quizzes_bp, url_prefix='/api/quizzes')
    app.register_blueprint(certificates_bp, url_prefix='/api/certificates')
    app.register_blueprint(progress_bp, url_prefix='/api/progress')
    app.register_blueprint(ai_bp, url_prefix='/api/ai')
    app.register_blueprint(trainer_bp, url_prefix='/api/trainer')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            'status': 'healthy',
            'platform': 'Digital Saathi – Rural Digital Literacy Platform',
            'version': '1.0.0',
            'database': app.config['SQLALCHEMY_DATABASE_URI'].split('://')[0]
        }), 200

    with app.app_context():
        db.create_all()

    return app

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app = create_app()
    print(f"🚀 Digital Saathi Backend running on http://127.0.0.1:{port}")
    app.run(host='0.0.0.0', port=port, debug=True)
