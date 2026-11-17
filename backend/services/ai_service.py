import re
import requests
from flask import current_app

FAQ_KNOWLEDGE_BASE = [
    # DIGITAL PAYMENTS & UPI
    {
        "keywords": ["upi", "pin", "receive money", "money", "payment", "gpay", "phonepe", "paytm", "ಹಣ", "ಯುಪಿಐ", "ಪಿನ್", "पैसे", "यूपीआई", "पिन"],
        "en": "IMPORTANT RULE: You NEVER need to enter your UPI PIN to receive money! A UPI PIN is only entered when sending money from your bank account. If someone asks you to enter your PIN or scan a QR code to 'receive a prize or payment', it is 100% a FRAUD.",
        "kn": "ಮುಖ್ಯ ನಿಯಮ: ಹಣ ಸ್ವೀಕರಿಸಲು ನೀವು ಎಂದಿಗೂ ನಿಮ್ಮ UPI PIN ಅನ್ನು ನಮೂದಿಸಬೇಕಾಗಿಲ್ಲ! ಹಣವನ್ನು ಕಳುಹಿಸುವಾಗ ಮಾತ್ರ UPI PIN ಬಳಸಲಾಗುತ್ತದೆ. ಯಾರಾದರೂ ಹಣ ಪಡೆಯಲು ಪಿನ್ ಹಾಕಿ ಎಂದರೆ ಅದು 100% ಮೋಸ.",
        "hi": "महत्वपूर्ण नियम: पैसे प्राप्त करने के लिए आपको कभी भी अपना UPI PIN दर्ज करने की आवश्यकता नहीं होती है! पिन केवल पैसे भेजने के लिए होता है। अगर कोई पैसे देने के लिए पिन डालने को कहे, तो वह धोखाधड़ी (धोखा) है।"
    },
    {
        "keywords": ["qr", "qr code", "scan", "ಕ್ಯೂಆರ್", "ಸ್ಕ್ಯಾನ್", "क्यूआर", "स्कैन"],
        "en": "A QR code is like a digital barcode for making payments. To pay a shopkeeper: Open Google Pay or PhonePe -> Click 'Scan QR' -> Point your camera at the shopkeeper's QR -> Check the name displayed on screen -> Enter amount -> Enter UPI PIN -> Done!",
        "kn": "QR ಕೋಡ್ ಎಂದರೆ ಅಂಗಡಿಯಲ್ಲಿ ಡಿಜಿಟಲ್ ಪಾವತಿ ಮಾಡಲು ಬಳಸುವ ಸಂಕೇತ. ಪಾವತಿಸಲು: Google Pay ಅಥವಾ PhonePe ತೆರೆಯಿರಿ -> 'Scan QR' ಒತ್ತಿರಿ -> ಕ್ಯಾಮರಾವನ್ನು ಕೋಡ್ ಮುಂದೆ ಹಿಡಿಯಿರಿ -> ಹೆಸರು ಪರಿಶೀಲಿಸಿ -> ಮೊತ್ತ ನಮೂದಿಸಿ -> UPI PIN ಹಾಕಿ.",
        "hi": "QR कोड एक डिजिटल कोड है जिससे आप दुकान पर भुगतान कर सकते हैं। Google Pay या PhonePe खोलें -> 'Scan QR' पर टैप करें -> कैमरे को QR कोड के सामने रखें -> दुकानदार का नाम जांचें -> राशि और UPI PIN दर्ज करें।"
    },
    # CYBERSECURITY & OTP
    {
        "keywords": ["otp", "fraud", "scam", "password", "bank call", "ಓಟಿಪಿ", "ಮೋಸ", "ಪಾಸ್‌ವರ್ಡ್", "ओटीपी", "धोखा", "पासवर्ड"],
        "en": "GOLDEN RULE: Never share your OTP (One Time Password) with ANYONE — not even bank managers or police. Banks never call asking for OTPs or passwords. If you get a call saying 'your account will be blocked unless you share OTP', hang up immediately!",
        "kn": "ಸುವರ್ಣ ನಿಯಮ: ನಿಮ್ಮ ಮೊಬೈಲ್ OTP ಅನ್ನು ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ — ಬ್ಯಾಂಕ್ ಮ್ಯಾನೇಜರ್ ಅಥವಾ ಪೊಲೀಸ್ ಕೇಳಿದರೂ ನೀಡಬೇಡಿ. ಬ್ಯಾಂಕ್‌ನವರು ಎಂದಿಗೂ OTP ಕೇಳುವುದಿಲ್ಲ.",
        "hi": "गोल्डन रूल: अपना OTP (वन टाइम पासवर्ड) कभी भी किसी के साथ साझा न करें - बैंक अधिकारी या पुलिस के साथ भी नहीं। बैंक कभी भी OTP नहीं मांगते।"
    },
    {
        "keywords": ["lottery", "win", "prize", "link", "message", "sms", "ಲಾಟರಿ", "ಬಹುಮಾನ", "ಲಿಂಕ್", "लॉटरी", "इनाम", "लिंक"],
        "en": "Beware of messages like 'You won ₹25 Lakhs' or 'Click link to claim free electricity/ration'. These are phishing links designed to steal your bank money or hack your phone. Delete such messages immediately and do not click links from unknown numbers.",
        "kn": "ನಿಮಗೆ ₹25 ಲಕ್ಷ ಲಾಟರಿ ಬಂದಿದೆ ಅಥವಾ ಉಚಿತ ಉಡುಗೊರೆಗಾಗಿ ಈ ಲಿಂಕ್ ಒತ್ತಿ ಎಂಬ ಸಂದೇಶಗಳನ್ನು ಎಂದಿಗೂ ನಂಬಬೇಡಿ. ಅವು ನಿಮ್ಮ ಹಣ ಕದಿಯುವ ನಕಲಿ ಲಿಂಕ್‌ಗಳು. ತಕ್ಷಣ ಡಿಲೀಟ್ ಮಾಡಿ.",
        "hi": "‘आपको 25 लाख की लॉटरी लगी है’ या ‘मुफ्त राशन के लिए लिंक पर क्लिक करें’ जैसे संदेशों से सावधान रहें। ये फर्जी लिंक हैं। इन्हें तुरंत हटा दें।"
    },
    # SMARTPHONE USAGE
    {
        "keywords": ["install", "app", "play store", "download", "ಅಪ್ಲಿಕೇಶನ್", "ಡೌನ್‌ಲೋಡ್", "ಆಪ್", "ऐप", "डाउनलोड", "प्ले स्टोर"],
        "en": "To safely install apps on Android: Open the official Google Play Store -> Type the app name in search bar -> Check verified developer -> Click 'Install'. NEVER install APK files sent via WhatsApp or unknown websites as they may contain viruses.",
        "kn": "ಸುರಕ್ಷಿತವಾಗಿ ಆಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು: ಗೂಗಲ್ ಪ್ಲೇ ಸ್ಟೋರ್ (Play Store) ತೆರೆಯಿರಿ -> ಸರ್ಚ್ ಬಾಕ್ಸ್‌ನಲ್ಲಿ ಹೆಸರು ಟೈಪ್ ಮಾಡಿ -> 'Install' ಒತ್ತಿರಿ. ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಯಾರೋ ಕಳುಹಿಸಿದ ಫೈಲ್‌ಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಬೇಡಿ.",
        "hi": "सुरक्षित रूप से ऐप डाउनलोड करने के लिए: Google Play Store खोलें -> सर्च में ऐप का नाम लिखें -> 'Install' पर टैप करें। व्हाट्सएप पर आई अनजान फाइलों को कभी इंस्टॉल न करें।"
    },
    {
        "keywords": ["storage", "full", "hang", "slow", "ಮೆಮೊರಿ", "ಸ್ಲೋ", "ಸ್ಟೋರೇಜ್", "मेमोरी", "फोन हैंग", "स्टोरेज"],
        "en": "If your phone is slow or storage is full: 1. Delete unnecessary photos/videos from WhatsApp. 2. Clear browser cache. 3. Uninstall apps you do not use. 4. Restart your phone once every 2 days.",
        "kn": "ಮೊಬೈಲ್ ಸ್ಲೋ ಆಗಿದ್ದರೆ ಅಥವಾ ಮೆಮೊರಿ ತುಂಬಿದ್ದರೆ: 1. ವಾಟ್ಸಾಪ್‌ನ ಅನಗತ್ಯ ವಿಡಿಯೋಗಳನ್ನು ಡಿಲೀಟ್ ಮಾಡಿ. 2. ಬಳಸದ ಆಪ್‌ಗಳನ್ನು ಅನ್‌ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ. 3. ಎರಡು ದಿನಕ್ಕೊಮ್ಮೆ ಫೋನ್ ರಿಸ್ಟಾರ್ಟ್ ಮಾಡಿ.",
        "hi": "अगर फोन धीमा चल रहा है या स्टोरेज भर गया है: 1. व्हाट्सएप के अनावश्यक वीडियो डिलीट करें। 2. बिना इस्तेमाल वाले ऐप्स हटाएं। 3. फोन को रीस्टार्ट करें।"
    },
    # COMPUTER BASICS
    {
        "keywords": ["computer", "mouse", "keyboard", "start", "folder", "shut down", "ಕಂಪ್ಯೂಟರ್", "ಮೌಸ್", "ಕೀಬೋರ್ಡ್", "ಫೋಲ್ಡರ್", "कंप्यूटर", "माउस", "कीबोर्ड", "फोल्डर"],
        "en": "Computer Basics: 1. Left click on mouse selects an item. 2. Right click opens options menu. 3. Double click opens a file. 4. To turn off safely, click Start button -> Power -> Shut Down. Never turn off direct power switch without shutting down first.",
        "kn": "ಕಂಪ್ಯೂಟರ್ ಮೂಲಗಳು: 1. ಮೌಸ್‌ನ ಎಡ ಕ್ಲಿಕ್ ಆಯ್ಕೆ ಮಾಡಲು. 2. ಬಲ ಕ್ಲಿಕ್ ಆಪ್ಷನ್ ನೋಡಲು. 3. ಡಬಲ್ ಕ್ಲಿಕ್ ಫೈಲ್ ತೆರೆಯಲು. 4. ಕಂಪ್ಯೂಟರ್ ಆಫ್ ಮಾಡಲು: Start -> Power -> Shut Down ಒತ್ತಿರಿ. ನೇರವಾಗಿ ಪವರ್ ಸ್ವಿಚ್ ಆಫ್ ಮಾಡಬೇಡಿ.",
        "hi": "कंप्यूटर की मूल बातें: 1. माउस का बायाँ (Left) बटन किसी चीज़ को चुनने के लिए है। 2. दायाँ (Right) बटन विकल्प देखने के लिए है। 3. फाइल खोलने के लिए डबल क्लिक करें। 4. बंद करने के लिए Start -> Power -> Shut Down चुनें।"
    },
    # GOVERNMENT SCHEMES & DIGILOCKER
    {
        "keywords": ["digilocker", "aadhaar", "pm kisan", "scheme", "ration", "bhoomi", "ಆಧಾರ್", "ಡಿಜಿಲಾಕರ್", "ರೇಷನ್", "ಯೋಜನೆ", "आधार", "राशन", "डिजीलॉकर", "योजना"],
        "en": "Government Services: 1. DigiLocker allows you to carry valid digital Aadhaar, Driving License, and RC book legally on your phone. 2. PM-KISAN provides ₹6,000 yearly income support to farmers directly into their bank account via DBT. Always visit official '.gov.in' websites.",
        "kn": "ಸರ್ಕಾರಿ ಸೇವೆಗಳು: 1. ಡಿಜಿಲಾಕರ್ (DigiLocker) ನಲ್ಲಿ ನಿಮ್ಮ ಆಧಾರ್, ಡ್ರೈವಿಂಗ್ ಲೈಸೆನ್ಸ್ ಸುರಕ್ಷಿತವಾಗಿ ಮೊಬೈಲ್‌ನಲ್ಲೇ ಇಟ್ಟುಕೊಳ್ಳಬಹುದು. 2. ಪಿಎಂ-ಕಿಸಾನ್ ಯೋಜನೆಯಡಿ ರೈತರಿಗೆ ವಾರ್ಷಿಕ ₹6,000 ನೇರ ಬ್ಯಾಂಕ್ ಜಮೆ ಆಗುತ್ತದೆ. ಯಾವಾಗಲೂ ಅಧಿಕೃತ .gov.in ವೆಬ್‌ಸೈಟ್‌ಗಳನ್ನೇ ಬಳಸಿ.",
        "hi": "सरकारी सेवाएं: 1. DigiLocker में आप अपना आधार, ड्राइविंग लाइसेंस और अंकपत्र कानूनी रूप से फोन में रख सकते हैं। 2. PM-KISAN योजना के तहत किसानों को सीधे बैंक खाते में ₹6,000 मिलते हैं। केवल '.gov.in' वाली आधिकारिक वेबसाइट्स देखें।"
    },
    # HEALTHCARE & EDUCATION
    {
        "keywords": ["health", "doctor", "esanjeevani", "education", "swayam", "diksha", "ಆರೋಗ್ಯ", "ವೈದ್ಯ", "ಶಿಕ್ಷಣ", "डॉक्टर", "स्वास्थ्य", "शिक्षा"],
        "en": "e-Sanjeevani is a free government telemedicine service where you can consult MBBS and specialist doctors online via video call from your phone without travelling to the city. For free school & college courses, use DIKSHA and SWAYAM portals.",
        "kn": "ಇ-ಸಂಜೀವಿನಿ (e-Sanjeevani) ಭಾರತ ಸರ್ಕಾರದ ಉಚಿತ ಸೇವೆಯಾಗಿದ್ದು, ಹಳ್ಳಿಯಲ್ಲೇ ಕುಳಿತು ಮೊಬೈಲ್ ಮೂಲಕ ವಿಡಿಯೋ ಕರೆಯಲ್ಲಿ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಬಹುದು. ಉಚಿತ ಶಿಕ್ಷಣಕ್ಕಾಗಿ DIKSHA ಮತ್ತು SWAYAM ಬಳಸಿ.",
        "hi": "ई-संजीवनी (e-Sanjeevani) भारत सरकार की मुफ्त सेवा है जिसके जरिए आप घर बैठे फोन पर विशेषज्ञ डॉक्टरों से वीडियो कॉल द्वारा परामर्श ले सकते हैं। मुफ्त शिक्षा के लिए दीक्षा (DIKSHA) और स्वयं (SWAYAM) का उपयोग करें।"
    }
]

def get_ai_response(user_message, language='en'):
    """
    Answers user digital literacy questions using either external AI API (Gemini/OpenAI)
    or local multilingual knowledge base fallback.
    """
    api_key = current_app.config.get('GEMINI_API_KEY')
    
    # Try Gemini API if key is set
    if api_key:
        try:
            prompt = (
                f"You are 'Digital Saathi Assistant', a kind, patient, and clear digital literacy guide for rural citizens "
                f"(farmers, women, elders, students) in India. Explain concepts in very simple, non-technical language. "
                f"User preferred language is '{language}'. "
                f"Answer the user's question clearly in the requested language (if 'kn' use Kannada, if 'hi' use Hindi, otherwise English). "
                f"Question: {user_message}"
            )
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
            payload = {
                "contents": [{"parts": [{"text": prompt}]}]
            }
            res = requests.post(url, json=payload, timeout=8)
            if res.status_code == 200:
                data = res.json()
                text = data['candidates'][0]['content']['parts'][0]['text']
                return {
                    'source': 'gemini_ai',
                    'reply': text,
                    'language': language
                }
        except Exception as e:
            # Fall back to knowledge base on failure
            pass

    # Intelligent Knowledge Base Fallback
    cleaned = user_message.lower().strip()
    words = re.findall(r'\w+', cleaned)

    best_match = None
    max_score = 0

    for item in FAQ_KNOWLEDGE_BASE:
        score = sum(2 if kw in cleaned else 1 for kw in item['keywords'] if kw in cleaned or any(kw in w for w in words))
        if score > max_score:
            max_score = score
            best_match = item

    if best_match and max_score > 0:
        if language == 'kn' and 'kn' in best_match:
            reply = best_match['kn']
        elif language == 'hi' and 'hi' in best_match:
            reply = best_match['hi']
        else:
            reply = best_match['en']
        return {
            'source': 'knowledge_base',
            'reply': reply,
            'language': language
        }

    # Generic helpful default in respective language
    if language == 'kn':
        default_reply = "ನಮಸ್ಕಾರ! ನಾನು ಡಿಜಿಟಲ್ ಸಾಥಿ ಸಹಾಯಕ. ಕಂಪ್ಯೂಟರ್, ಸ್ಮಾರ್ಟ್‌ಫೋನ್, ಯುಪಿಐ ಪಾವತಿ (Google Pay/PhonePe), ಸೈಬರ್ ಸುರಕ್ಷತೆ ಅಥವಾ ಆನ್‌ಲೈನ್ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಕುರಿತು ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ!"
    elif language == 'hi':
        default_reply = "नमस्ते! मैं डिजिटल साथी सहायक हूँ। आप कंप्यूटर, स्मार्टफोन, यूपीआई भुगतान (GPay/PhonePe), साइबर सुरक्षा या सरकारी योजनाओं के बारे में कोई भी सवाल पूछ सकते हैं!"
    else:
        default_reply = "Hello! I am your Digital Saathi Assistant. You can ask me anything about Computer Basics, Smartphone usage, UPI Digital Payments (GPay/PhonePe safety), Cyber fraud prevention, or Government online services!"

    return {
        'source': 'default_guide',
        'reply': default_reply,
        'language': language
    }
