from flask import Blueprint, request, jsonify
from services.ai_service import get_ai_response
from models import db, UserActivity
from services.auth_service import decode_token

ai_bp = Blueprint('ai', __name__)

@ai_bp.route('/chat', methods=['POST'])
def chat():
    data = request.get_json() or {}
    message = data.get('message', '').strip()
    language = data.get('language', 'en')

    if not message:
        return jsonify({'success': False, 'message': 'Message is required.'}), 400

    response_data = get_ai_response(message, language=language)

    # Optional activity logging if user is authenticated
    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith('Bearer '):
        token = auth_header.split(' ')[1]
        payload = decode_token(token)
        if payload:
            act = UserActivity(
                user_id=payload['sub'],
                activity_type='ai_query',
                description=f"Asked Digital Saathi: {message[:60]}..."
            )
            db.session.add(act)
            db.session.commit()

    return jsonify({
        'success': True,
        'reply': response_data['reply'],
        'source': response_data['source'],
        'language': response_data['language']
    }), 200

@ai_bp.route('/quick-prompts', methods=['GET'])
def get_quick_prompts():
    lang = request.args.get('lang', 'en')
    
    prompts = {
        'en': [
            "Do I need to enter UPI PIN to receive money?",
            "How do I scan a QR code to pay a shopkeeper?",
            "What should I do if someone calls asking for OTP?",
            "How to download apps safely on Android?",
            "What is DigiLocker and how does it help me?"
        ],
        'kn': [
            "ಹಣ ಪಡೆಯಲು ನಾನು UPI PIN ನಮೂದಿಸಬೇಕೇ?",
            "ಅಂಗಡಿಯಲ್ಲಿ QR ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡುವುದು ಹೇಗೆ?",
            "ಯಾರಾದರೂ ಫೋನ್ ಮಾಡಿ OTP ಕೇಳಿದರೆ ಏನು ಮಾಡಬೇಕು?",
            "ಮೊಬೈಲ್‌ನಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿ ಆಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡುವುದು ಹೇಗೆ?",
            "ಡಿಜಿಲಾಕರ್ (DigiLocker) ಎಂದರೇನು ಮತ್ತು ಅದು ಹೇಗೆ ಸಹಕಾರಿ?"
        ],
        'hi': [
            "क्या पैसे प्राप्त करने के लिए UPI PIN डालना जरूरी है?",
            "दुकान पर QR कोड स्कैन करके भुगतान कैसे करें?",
            "अगर कोई फोन पर OTP मांगे तो क्या करना चाहिए?",
            "एंड्रॉइड फोन में सुरक्षित ऐप कैसे डाउनलोड करें?",
            "डिजीलॉकर (DigiLocker) क्या है और इसका क्या लाभ है?"
        ]
    }
    
    return jsonify({
        'success': True,
        'prompts': prompts.get(lang, prompts['en'])
    }), 200
