import os
from datetime import datetime
from app import create_app
from models import (
    db, User, TrainerProfile, Course, Lesson, LearningMaterial,
    Enrollment, Quiz, QuizQuestion, QuizResult, UserProgress, Certificate,
    TrainingProgram, UserActivity
)

def seed():
    app = create_app()
    with app.app_context():
        print("🌱 Seeding Digital Saathi Database...")
        db.create_all()

        # 1. SEED USERS
        admin_user = User.query.filter_by(email='admin@digitalsaathi.in').first()
        if not admin_user:
            admin_user = User(
                name='Dr. Ramesh Rao',
                email='admin@digitalsaathi.in',
                phone='+91 98450 11223',
                role='admin',
                preferred_language='en',
                village='Mandya Rural',
                district='Mandya',
                state='Karnataka',
                age=48
            )
            admin_user.set_password('Admin@123')
            db.session.add(admin_user)
            db.session.flush()

        trainer_user = User.query.filter_by(email='trainer@digitalsaathi.in').first()
        if not trainer_user:
            trainer_user = User(
                name='Sunitha Patil',
                email='trainer@digitalsaathi.in',
                phone='+91 94480 33445',
                role='trainer',
                preferred_language='kn',
                village='Haveri Gram',
                district='Haveri',
                state='Karnataka',
                age=32
            )
            trainer_user.set_password('Trainer@123')
            db.session.add(trainer_user)
            db.session.flush()

            trainer_profile = TrainerProfile(
                user_id=trainer_user.id,
                qualification='M.Sc Computer Science & Digital Literacy Facilitator',
                organization='Pradhan Mantri Gramin Digital Saksharta Abhiyan (PMGDISHA)',
                specialization='Rural Digital Inclusion & Mobile Payments',
                bio='Dedicated to helping rural families, farmers, and women self-help groups gain confidence in everyday smartphone and online banking tools.',
                assigned_region='North Karnataka Rural Hub'
            )
            db.session.add(trainer_profile)

        student_user = User.query.filter_by(email='student@digitalsaathi.in').first()
        if not student_user:
            student_user = User(
                name='Basavaraju Gowda',
                email='student@digitalsaathi.in',
                phone='+91 97410 77889',
                role='student',
                preferred_language='en',
                village='Koppa Taluk',
                district='Chikkamagaluru',
                state='Karnataka',
                age=28
            )
            student_user.set_password('Student@123')
            db.session.add(student_user)
            db.session.flush()

        db.session.commit()

        # 2. SEED COURSES & LESSONS (ALL 7 MODULES)
        if Course.query.count() == 0:
            modules_data = [
                # MODULE 1
                {
                    "module_number": 1,
                    "title": "Module 1: Computer Basics",
                    "title_kn": "ಭಾಗ ೧: ಕಂಪ್ಯೂಟರ್ ಮೂಲಭೂತ ಜ್ಞಾನ",
                    "title_hi": "भाग 1: कंप्यूटर की मूल बातें",
                    "slug": "computer-basics",
                    "category": "Foundations",
                    "difficulty": "Beginner",
                    "estimated_hours": 3,
                    "icon": "Monitor",
                    "description": "Learn the foundation of modern computers: hardware, software, mouse and keyboard operations, file management, and safe computer shut-down.",
                    "description_kn": "ಕಂಪ್ಯೂಟರ್ ಹಾರ್ಡ್‌ವೇರ್, ಸಾಫ್ಟ್‌ವೇರ್, ಕೀಬೋರ್ಡ್-ಮೌಸ್ ಬಳಕೆ, ಫೋಲ್ಡರ್ ನಿರ್ವಹಣೆ ಮತ್ತು ಕಂಪ್ಯೂಟರ್ ಸರಿಯಾಗಿ ಆನ್/ಆಫ್ ಮಾಡುವ ವಿಧಾನಗಳನ್ನು ಕಲಿಯಿರಿ.",
                    "description_hi": "कंप्यूटर की मूल बातें: हार्डवेयर, सॉफ्टवेयर, माउस और कीबोर्ड का उपयोग, फाइल और फोल्डर प्रबंधन, और सुरक्षित रूप से बंद करना सीखें।",
                    "lessons": [
                        {
                            "title": "Introduction to Computers, Hardware & Software",
                            "title_kn": "ಕಂಪ್ಯೂಟರ್ ಪರಿಚಯ, ಹಾರ್ಡ್‌ವೇರ್ ಮತ್ತು ಸಾಫ್ಟ್‌ವೇರ್",
                            "title_hi": "कंप्यूटर का परिचय, हार्डवेयर और सॉफ्टवेयर",
                            "summary": "Understand what a computer is, CPU, monitor, keyboard, and system software.",
                            "summary_kn": "ಕಂಪ್ಯೂಟರ್‌ನ ವಿವಿಧ ಭಾಗಗಳು ಮತ್ತು ತಂತ್ರಾಂಶಗಳ ಪ್ರಾಥಮಿಕ ಪರಿಚಯ.",
                            "summary_hi": "कंप्यूटर के मुख्य अंगों और सॉफ्टवेयर की बुनियादी जानकारी।",
                            "duration_minutes": 20,
                            "order_index": 1,
                            "content": """# Welcome to Computer Basics!

A computer is an electronic machine that helps you perform tasks faster, store important documents, view land records, and connect with government services.

### Key Parts of a Computer (Hardware):
1. **Monitor (Screen)**: Shows your work, videos, and texts visually.
2. **CPU (Central Processing Unit)**: The brain of the computer that processes all information.
3. **Keyboard**: Used to type your name, numbers, and searches.
4. **Mouse**: Helps you point, click, and navigate on the screen.
5. **Printer & Scanner**: Used to print documents like ration cards or scan identity proofs.

### Hardware vs Software:
- **Hardware**: Parts you can touch and feel (Screen, Keyboard, Mouse, Cables).
- **Software**: Programs inside the computer (Operating System like Windows, Web Browsers, Typing tools).

💡 **Pro Tip**: Keep your computer clean from dust and always shut down using the software menu, never turn off the main switch directly!"""
                        },
                        {
                            "title": "Mastering the Keyboard and Mouse",
                            "title_kn": "ಕೀಬೋರ್ಡ್ ಮತ್ತು ಮೌಸ್ ಬಳಕೆ ಸುಲಭವಾಗಿ ಕಲಿಯಿರಿ",
                            "title_hi": "कीबोर्ड और माउस का सही उपयोग सीखें",
                            "summary": "Master left-click, right-click, double-click, and essential keyboard shortcuts.",
                            "summary_kn": "ಮೌಸ್ ಕ್ಲಿಕ್ ಮತ್ತು ಕೀಬೋರ್ಡ್ ಕೀಲಿಗಳನ್ನು ಸರಳವಾಗಿ ಬಳಸುವುದು.",
                            "summary_hi": "माउस के क्लिक और कीबोर्ड की आवश्यक कुंजियों का अभ्यास।",
                            "duration_minutes": 15,
                            "order_index": 2,
                            "content": """# Keyboard & Mouse Practical Guide

Mastering the mouse and keyboard is the first step to feeling confident with any computer or laptop.

### Understanding the Mouse:
- **Left-Click (Once)**: Selects an icon, button, or opens a web link.
- **Double-Click (Two quick left-clicks)**: Opens a file, folder, or desktop application.
- **Right-Click (Once)**: Opens a secret options menu (Rename, Delete, Copy, Properties).
- **Scroll Wheel**: Roll up or down to read long articles and documents easily without dragging the scrollbar.

### Keyboard Essentials:
- **Enter Key**: Confirms an action or moves down to the next line.
- **Backspace**: Erases the previous letter you typed.
- **Spacebar**: Leaves a single space between two words.
- **Caps Lock**: Types letters in CAPITAL (ABC) when turned ON.
- **Shift Key**: Hold Shift and press a number key to type special symbols like @, #, ₹, &."""
                        },
                        {
                            "title": "File and Folder Management & Safe Shutdown",
                            "title_kn": "ಫೈಲ್ ಮತ್ತು ಫೋಲ್ಡರ್ ನಿರ್ವಹಣೆ ಹಾಗೂ ಕಂಪ್ಯೂಟರ್ ಆಫ್ ಮಾಡುವುದು",
                            "title_hi": "फाइल और फोल्डर प्रबंधन और कंप्यूटर बंद करना",
                            "summary": "Organize certificates, photos, and documents into folders, and learn proper shutdown.",
                            "summary_kn": "ದಾಖಲೆಗಳನ್ನು ಫೋಲ್ಡರ್‌ನಲ್ಲಿ ಇಡುವುದು ಮತ್ತು ಕಂಪ್ಯೂಟರ್ ಸರಿಯಾಗಿ ಸ್ಥಗಿತಗೊಳಿಸುವುದು.",
                            "summary_hi": "प्रमाणपत्रों और फाइलों को सहेजना और कंप्यूटर को सही तरीके से बंद करना।",
                            "duration_minutes": 20,
                            "order_index": 3,
                            "content": """# Files, Folders, and Safe Shutdown

Just like you keep land papers and ration cards in a physical plastic file at home, a computer keeps digital documents in digital folders!

### How to Create a New Folder:
1. Go to your Desktop or 'Documents' folder.
2. Right-click on any empty space.
3. Move your mouse to **New** -> Click **Folder**.
4. Type a name like *"Family Certificates"* or *"Farm Records 2024"* and press **Enter**.

### How to Safely Turn Off a Computer:
1. Close all open applications and save any documents you were typing.
2. Click the **Start (Windows)** icon in the bottom-left corner.
3. Click the **Power** icon.
4. Click **Shut Down**.
5. Wait until the monitor screen turns completely black before switching off the wall power switch!"""
                        }
                    ],
                    "quiz": {
                        "title": "Computer Basics Certification Quiz",
                        "passing_score": 60,
                        "questions": [
                            {
                                "question": "Which component is considered the 'brain' of the computer?",
                                "question_kn": "ಕಂಪ್ಯೂಟರ್‌ನ 'ಮೆದುಳು' ಎಂದು ಯಾವ ಭಾಗವನ್ನು ಕರೆಯಲಾಗುತ್ತದೆ?",
                                "question_hi": "कंप्यूटर का 'मस्तिष्क' किस घटक को कहा जाता है?",
                                "option_a": "Monitor",
                                "option_b": "CPU",
                                "option_c": "Keyboard",
                                "option_d": "Mouse",
                                "option_a_kn": "ಮಾನಿಟರ್",
                                "option_b_kn": "ಸಿಪಿಯು (CPU)",
                                "option_c_kn": "ಕೀಬೋರ್ಡ್",
                                "option_d_kn": "ಮೌಸ್",
                                "option_a_hi": "मॉनिटर",
                                "option_b_hi": "सीपीयू (CPU)",
                                "option_c_hi": "कीबोर्ड",
                                "option_d_hi": "माउस",
                                "correct_option": "B",
                                "explanation": "The CPU (Central Processing Unit) performs all computational processing and manages instructions, making it the computer's brain."
                            },
                            {
                                "question": "What is the correct action to open a file or program on the desktop?",
                                "question_kn": "ಡೆಸ್ಕ್‌ಟಾಪ್‌ನಲ್ಲಿರುವ ಫೈಲ್ ಅಥವಾ ಪ್ರೋಗ್ರಾಂ ಅನ್ನು ತೆರೆಯಲು ಏನು ಮಾಡಬೇಕು?",
                                "question_hi": "डेस्कटॉप पर किसी फाइल या प्रोग्राम को खोलने के लिए क्या क्रिया की जाती है?",
                                "option_a": "Single right-click",
                                "option_b": "Double left-click quickly",
                                "option_c": "Press Spacebar once",
                                "option_d": "Turn off the monitor",
                                "option_a_kn": "ಒಮ್ಮೆ ಬಲ ಕ್ಲಿಕ್ ಮಾಡುವುದು",
                                "option_b_kn": "ಎರಡು ಬಾರಿ ಬೇಗನೆ ಎಡ ಕ್ಲಿಕ್ ಮಾಡುವುದು (Double-click)",
                                "option_c_kn": "ಸ್ಪೇಸ್‌ಬಾರ್ ಒತ್ತಿ ಹಿಡಿಯುವುದು",
                                "option_d_kn": "ಮಾನಿಟರ್ ಆಫ್ ಮಾಡುವುದು",
                                "option_a_hi": "एक बार दायां क्लिक",
                                "option_b_hi": "जल्दी से दो बार बायां क्लिक (Double-click)",
                                "option_c_hi": "स्पेसबार दबाना",
                                "option_d_hi": "मॉनिटर बंद करना",
                                "correct_option": "B",
                                "explanation": "A quick double left-click signals the operating system to open the selected program or file."
                            },
                            {
                                "question": "How should you safely turn off your computer?",
                                "question_kn": "ಕಂಪ್ಯೂಟರ್ ಅನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಆಫ್ ಮಾಡುವುದು ಹೇಗೆ?",
                                "question_hi": "कंप्यूटर को सुरक्षित रूप से बंद करने का सही तरीका क्या है?",
                                "option_a": "Directly pull out the wall power plug",
                                "option_b": "Start Menu -> Power -> Shut Down",
                                "option_c": "Only switch off the monitor",
                                "option_d": "Press the keyboard backspace key 5 times",
                                "option_a_kn": "ನೇರವಾಗಿ ಗೋಡೆಯ ವಿದ್ಯುತ್ ಪ್ಲಗ್ ಕಿತ್ತು ಹಾಕುವುದು",
                                "option_b_kn": "Start ಮೆನು -> Power -> Shut Down ಆಯ್ಕೆ ಮಾಡುವುದು",
                                "option_c_kn": "ಕೇವಲ ಮಾನಿಟರ್ ಸ್ವಿಚ್ ಆಫ್ ಮಾಡುವುದು",
                                "option_d_kn": "ಕೀಬೋರ್ಡ್ ಬ್ಯಾಕ್‌ಸ್ಪೇಸ್ ೫ ಬಾರಿ ಒತ್ತುವುದು",
                                "option_a_hi": "सीधे दीवार का बिजली प्लग निकाल देना",
                                "option_b_hi": "Start मेनू -> Power -> Shut Down चुनना",
                                "option_c_hi": "केवल मॉनिटर बंद करना",
                                "option_d_hi": "कीबोर्ड बैकस्पेस दबाना",
                                "correct_option": "B",
                                "explanation": "Always use Start Menu -> Power -> Shut Down so the operating system closes files cleanly without corruption."
                            }
                        ]
                    }
                },
                # MODULE 2
                {
                    "module_number": 2,
                    "title": "Module 2: Smartphone Learning",
                    "title_kn": "ಭಾಗ ೨: ಸ್ಮಾರ್ಟ್‌ಫೋನ್ ಕಲಿಕೆ ಮತ್ತು ಬಳಕೆ",
                    "title_hi": "भाग 2: स्मार्टफोन सीखना और उपयोग",
                    "slug": "smartphone-learning",
                    "category": "Mobile Essentials",
                    "difficulty": "Beginner",
                    "estimated_hours": 2,
                    "icon": "Smartphone",
                    "description": "Master your Android smartphone: installing apps from Google Play Store, managing mobile data, WiFi, brightness, and organizing contacts and messages.",
                    "description_kn": "ಆಂಡ್ರಾಯ್ಡ್ ಮೊಬೈಲ್ ಬಳಕೆ, ಗೂಗಲ್ ಪ್ಲೇ ಸ್ಟೋರ್‌ನಿಂದ ಆಪ್ ಡೌನ್‌ಲೋಡ್, ಇಂಟರ್ನೆಟ್ ಕನೆಕ್ಟಿವಿಟಿ ಮತ್ತು ಫೋನ್ ಸೆಟ್ಟಿಂಗ್ಸ್ ಕಲಿಯಿರಿ.",
                    "description_hi": "एंड्रॉयड स्मार्टफोन का उपयोग, गूगल प्ले स्टोर से ऐप इंस्टॉल करना, इंटरनेट कनेक्टिविटी और फोन सेटिंग्स सीखें।",
                    "lessons": [
                        {
                            "title": "Android Smartphone Essentials & Touch Gestures",
                            "title_kn": "ಆಂಡ್ರಾಯ್ಡ್ ಸ್ಮಾರ್ಟ್‌ಫೋನ್ ಮತ್ತು ಟಚ್ ಗೆಸ್ಚರ್ಸ್ ಪರಿಚಯ",
                            "title_hi": "एंड्रॉयड स्मार्टफोन और टच जेस्चर का परिचय",
                            "summary": "Learn tap, long-press, swipe, and essential phone navigation buttons.",
                            "summary_kn": "ಟ್ಯಾಪ್, ಸ್ವೈಪ್ ಮತ್ತು ಮೊಬೈಲ್‌ನ ಕೆಳಗಿನ ೩ ಬಟನ್‌ಗಳ ಪರಿಚಯ.",
                            "summary_hi": "टैप, स्वाइप और फोन के तीन मुख्य नेविगेशन बटनों की जानकारी।",
                            "duration_minutes": 15,
                            "order_index": 1,
                            "content": """# Android Smartphone Essentials

Smartphones are pocket computers that connect you with family, weather reports for agriculture, market prices, and online banking.

### The Three Main Navigation Buttons:
1. **Back Button (◁ or <)**: Takes you back one step or screen.
2. **Home Button (○ or ⌂)**: Immediately brings you back to your main home screen.
3. **Recent Apps Button (□ or |||)**: Shows all apps currently running so you can switch between them or close them.

### Touch Gestures:
- **Tap**: Touching once quickly opens an app or link.
- **Long-Press**: Pressing and holding your finger opens extra settings or allows you to move an app icon.
- **Swipe Down (From top of screen)**: Opens your Notification Bar and Quick Toggles (Torch, WiFi, Mobile Data, Brightness, Sound)."""
                        },
                        {
                            "title": "Installing and Uninstalling Apps Safely from Play Store",
                            "title_kn": "ಗೂಗಲ್ ಪ್ಲೇ ಸ್ಟೋರ್‌ನಿಂದ ಸುರಕ್ಷಿತವಾಗಿ ಆಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡುವುದು",
                            "title_hi": "गूगल प्ले स्टोर से सुरक्षित ऐप इंस्टॉल और अनइंस्टॉल करना",
                            "summary": "Learn how to find verified apps, check ratings, and safely remove unused apps.",
                            "summary_kn": "ಅಧಿಕೃತ ಆಪ್‌ಗಳನ್ನು ಹುಡುಕಿ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡುವುದು ಮತ್ತು ಅನ್‌ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡುವುದು.",
                            "summary_hi": "वेरिफाइड ऐप्स ढूंढना, इंस्टॉल करना और गैर-जरूरी ऐप्स हटाना।",
                            "duration_minutes": 20,
                            "order_index": 2,
                            "content": """# Safe App Installation Guide

Always use the official **Google Play Store** to download applications.

### Steps to Install an App:
1. Find and tap the **Google Play Store** icon (looks like a colorful triangle).
2. Tap the search bar at the top and type the app name (e.g., *"Kisan Suvidha"* or *"DigiLocker"*).
3. Check the developer name and user star rating (look for 4+ stars and verified badges).
4. Tap **Install**. Wait until the progress wheel finishes 100%.
5. Tap **Open** to launch your new app!

### How to Uninstall (Delete) an Unused App:
1. Find the app icon on your screen.
2. Press and hold your finger on it for 2 seconds.
3. Tap **Uninstall** (or drag it to the trash icon).
4. Tap **OK** to confirm."""
                        }
                    ],
                    "quiz": {
                        "title": "Smartphone Learning Quiz",
                        "passing_score": 60,
                        "questions": [
                            {
                                "question": "Where should you always download apps from on an Android phone?",
                                "question_kn": "ಆಂಡ್ರಾಯ್ಡ್ ಫೋನ್‌ನಲ್ಲಿ ಆಪ್‌ಗಳನ್ನು ಎಲ್ಲಿಂದ ಮಾತ್ರ ಡೌನ್‌ಲೋಡ್ ಮಾಡಬೇಕು?",
                                "question_hi": "एंड्रॉइड फोन में ऐप्स हमेशा कहां से डाउनलोड करने चाहिए?",
                                "option_a": "Official Google Play Store",
                                "option_b": "Random links received on WhatsApp",
                                "option_c": "Unknown advertisements on websites",
                                "option_d": "Forwarded SMS messages",
                                "option_a_kn": "ಅಧಿಕೃತ ಗೂಗಲ್ ಪ್ಲೇ ಸ್ಟೋರ್ (Google Play Store)",
                                "option_b_kn": "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಬಂದ ಅಪರಿಚಿತ ಲಿಂಕ್‌ಗಳಿಂದ",
                                "option_c_kn": "ಅಪರಿಚಿತ ವೆಬ್‌ಸೈಟ್ ಜಾಹೀರಾತುಗಳಿಂದ",
                                "option_d_kn": "ಯಾರೋ ಕಳುಹಿಸಿದ SMS ಮೆಸೇಜ್‌ನಿಂದ",
                                "option_a_hi": "आधिकारिक गूगल प्ले स्टोर (Google Play Store)",
                                "option_b_hi": "व्हाट्सएप पर मिले किसी भी लिंक से",
                                "option_c_hi": "वेबसाइटों के अज्ञात विज्ञापनों से",
                                "option_d_hi": "अपरिचित एसएमएस से",
                                "correct_option": "A",
                                "explanation": "The Google Play Store scans apps with Play Protect to verify security and prevent malware."
                            },
                            {
                                "question": "What is the function of the Home button on an Android smartphone?",
                                "question_kn": "ಆಂಡ್ರಾಯ್ಡ್ ಮೊಬೈಲ್‌ನಲ್ಲಿ ಹೋಮ್ (Home) ಬಟನ್‌ನ ಕೆಲಸವೇನು?",
                                "question_hi": "एंड्रॉयड फोन में होम (Home) बटन का क्या काम है?",
                                "option_a": "Turns off the smartphone immediately",
                                "option_b": "Returns you instantly to the main home screen",
                                "option_c": "Deletes your photos",
                                "option_d": "Changes phone language to English",
                                "option_a_kn": "ಫೋನ್ ಅನ್ನು ತಕ್ಷಣ ಸ್ವಿಚ್ ಆಫ್ ಮಾಡುತ್ತದೆ",
                                "option_b_kn": "ನೇರವಾಗಿ ಮುಖ್ಯ ಮುಖಪುಟಕ್ಕೆ (Home Screen) ಮರಳಿ ಕರೆದೊಯ್ಯುತ್ತದೆ",
                                "option_c_kn": "ಫೋಟೋಗಳನ್ನು ಅಳಿಸಿಹಾಕುತ್ತದೆ",
                                "option_d_kn": "ಫೋನ್ ಭಾಷೆಯನ್ನು ಬದಲಾಯಿಸುತ್ತದೆ",
                                "option_a_hi": "फोन को तुरंत बंद कर देता है",
                                "option_b_hi": "सीधे मुख्य होम स्क्रीन पर वापस ले जाता है",
                                "option_c_hi": "फोटो डिलीट कर देता है",
                                "option_d_hi": "फोन की भाषा बदल देता है",
                                "correct_option": "B",
                                "explanation": "The Home button instantly brings you back to your primary home screen from inside any application."
                            }
                        ]
                    }
                },
                # MODULE 3
                {
                    "module_number": 3,
                    "title": "Module 3: Internet and Email",
                    "title_kn": "ಭಾಗ ೩: ಇಂಟರ್ನೆಟ್ ಮತ್ತು ಇಮೇಲ್ ಬಳಕೆ",
                    "title_hi": "भाग 3: इंटरनेट और ईमेल का उपयोग",
                    "slug": "internet-and-email",
                    "category": "Communication",
                    "difficulty": "Beginner",
                    "estimated_hours": 2,
                    "icon": "Mail",
                    "description": "Understand the World Wide Web, web browsers (Chrome), safe Google searching, creating a personal email account, sending emails, and attaching files.",
                    "description_kn": "ವೆಬ್ ಬ್ರೌಸರ್ ಬಳಕೆ, ಗೂಗಲ್ ಸರ್ಚ್, ಸ್ವಂತ ಇಮೇಲ್ ಖಾತೆ ರಚನೆ, ಇಮೇಲ್ ಕಳುಹಿಸುವುದು ಮತ್ತು ದಾಖಲೆಗಳನ್ನು ಅಟ್ಯಾಚ್ ಮಾಡುವುದು ಕಲಿಯಿರಿ.",
                    "description_hi": "इंटरनेट का परिचय, वेब ब्राउज़र (क्रोम), सुरक्षित गूगल सर्च, ईमेल खाता बनाना, ईमेल भेजना और फाइल अटैच करना सीखें।",
                    "lessons": [
                        {
                            "title": "Understanding the Web and Browsing Safely",
                            "title_kn": "ಇಂಟರ್ನೆಟ್ ಮತ್ತು ಗೂಗಲ್ ಕ್ರೋಮ್ ಬ್ರೌಸರ್ ಬಳಕೆ",
                            "title_hi": "वेब ब्राउज़र और इंटरनेट सुरक्षित रूप से चलाना",
                            "summary": "How to search information, recognize secure HTTPS websites, and bookmark useful pages.",
                            "summary_kn": "ಗೂಗಲ್‌ನಲ್ಲಿ ಮಾಹಿತಿ ಹುಡುಕುವುದು ಮತ್ತು ಸುರಕ್ಷಿತ ವೆಬ್‌ಸೈಟ್‌ಗಳನ್ನು ಗುರುತಿಸುವುದು.",
                            "summary_hi": "गूगल पर जानकारी खोजना और सुरक्षित वेबसाइट्स की पहचान करना।",
                            "duration_minutes": 20,
                            "order_index": 1,
                            "content": """# Surfing the Internet with Confidence

The internet connects computers all over the world, allowing you to access agricultural weather forecasts, children's school exam results, and government applications.

### What is a Web Browser?
A browser (like **Google Chrome**) is your vehicle to travel the web.
- Tap the address bar at the top to type a website or a search query.
- Use simple search words: *"Karnataka Bhoomi RTC land record"* or *"PM Kisan status check"*.

### Identifying Safe Websites:
- Look for a small **Padlock icon (🔒)** or **https://** in the address bar.
- Official government websites in India always end with **.gov.in** or **.nic.in**. If a website asks for money for a free government scheme and does not have .gov.in, it is fake!"""
                        },
                        {
                            "title": "Creating an Email Account & Sending Messages",
                            "title_kn": "ಇಮೇಲ್ (Gmail) ಖಾತೆ ತೆರೆಯುವುದು ಮತ್ತು ಸಂದೇಶ ಕಳುಹಿಸುವುದು",
                            "title_hi": "जीमेल (Gmail) अकाउंट बनाना और ईमेल भेजना",
                            "summary": "Step-by-step guide to creating your Gmail, composing messages, and attaching documents.",
                            "summary_kn": "ಜಿಮೇಲ್ ರಚಿಸುವುದು ಮತ್ತು ದಾಖಲೆಗಳೊಂದಿಗೆ ಇಮೇಲ್ ಕಳುಹಿಸುವುದು.",
                            "summary_hi": "जीमेल पर आईडी बनाना और फाइल अटैच करके संदेश भेजना।",
                            "duration_minutes": 20,
                            "order_index": 2,
                            "content": """# Email: Your Official Digital Identity

An email address (like `ramesh.farmer@gmail.com`) is your official digital mailbox for receiving government notifications, job interview calls, and college letters.

### How to Compose and Send an Email:
1. Open the **Gmail** app.
2. Tap the **Compose (✏️)** button at the bottom-right.
3. In the **To** field: Type the recipient's email address correctly.
4. In the **Subject** field: Type a short title (e.g., *"Application for Scholarship"*).
5. In the body area: Type your message respectfully.
6. **Attach Files**: Tap the paperclip icon (📎) at the top to attach your photo or PDF certificate.
7. Tap the blue arrow (**Send ✈️**) button. Your email is delivered in seconds!"""
                        }
                    ],
                    "quiz": {
                        "title": "Internet and Email Certification Quiz",
                        "passing_score": 60,
                        "questions": [
                            {
                                "question": "What website domain extension indicates an authentic Indian Government portal?",
                                "question_kn": "ಅಧಿಕೃತ ಭಾರತ ಸರ್ಕಾರದ ಪೋರ್ಟಲ್ ಅನ್ನು ಗುರುತಿಸುವ ವೆಬ್‌ಸೈಟ್ ಡೊಮೈನ್ ಯಾವುದು?",
                                "question_hi": "भारत सरकार के आधिकारिक पोर्टल की सही पहचान क्या है?",
                                "option_a": ".gov.in",
                                "option_b": ".freecash.com",
                                "option_c": ".winprize.org",
                                "option_d": ".instantmoney.biz",
                                "option_a_kn": ".gov.in ಅಥವಾ .nic.in",
                                "option_b_kn": ".freecash.com",
                                "option_c_kn": ".winprize.org",
                                "option_d_kn": ".instantmoney.biz",
                                "option_a_hi": ".gov.in या .nic.in",
                                "option_b_hi": ".freecash.com",
                                "option_c_hi": ".winprize.org",
                                "option_d_hi": ".instantmoney.biz",
                                "correct_option": "A",
                                "explanation": "Official Indian government portals strictly use the .gov.in or .nic.in domain extensions."
                            },
                            {
                                "question": "What icon in Gmail is used to attach a photo or document?",
                                "question_kn": "ಜಿಮೇಲ್‌ನಲ್ಲಿ ಫೋಟೋ ಅಥವಾ ದಾಖಲೆಗಳನ್ನು ಅಟ್ಯಾಚ್ ಮಾಡಲು ಯಾವ ಐಕಾನ್ ಬಳಸಲಾಗುತ್ತದೆ?",
                                "question_hi": "जीमेल में फोटो या दस्तावेज जोड़ने के लिए किस आइकन पर टैप करते हैं?",
                                "option_a": "Paperclip icon (📎)",
                                "option_b": "Trash can icon (🗑️)",
                                "option_c": "Speaker icon (🔊)",
                                "option_d": "Refresh icon (🔄)",
                                "option_a_kn": "ಪೇಪರ್‌ಕ್ಲಿಪ್ ಐಕಾನ್ (📎)",
                                "option_b_kn": "ಕಸದ ಬುಟ್ಟಿ ಐಕಾನ್ (🗑️)",
                                "option_c_kn": "ಸ್ಪೀಕರ್ ಐಕಾನ್ (🔊)",
                                "option_d_kn": "ರಿಫ್ರೆಶ್ ಐಕಾನ್ (🔄)",
                                "option_a_hi": "पेपरक्लिप आइकन (📎)",
                                "option_b_hi": "कचरा पेटी आइकन (🗑️)",
                                "option_c_hi": "स्पीकर आइकन (🔊)",
                                "option_d_hi": "रिफ्रेश आइकन (🔄)",
                                "correct_option": "A",
                                "explanation": "The paperclip icon (📎) is the universal symbol for attaching files to an email message."
                            }
                        ]
                    }
                },
                # MODULE 4
                {
                    "module_number": 4,
                    "title": "Module 4: Digital Payments",
                    "title_kn": "ಭಾಗ ೪: ಡಿಜಿಟಲ್ ಪಾವತಿಗಳು ಮತ್ತು ಯುಪಿಐ ಸುರಕ್ಷತೆ",
                    "title_hi": "भाग 4: डिजिटल भुगतान और सुरक्षित यूपीआई",
                    "slug": "digital-payments",
                    "category": "Financial Literacy",
                    "difficulty": "Intermediate",
                    "estimated_hours": 3,
                    "icon": "CreditCard",
                    "description": "Understand UPI, Google Pay, PhonePe, and BHIM. Learn how to safely scan QR codes, send money, and master the Golden Rule: NEVER enter UPI PIN to receive money!",
                    "description_kn": "UPI, PhonePe, Google Pay ಬಳಕೆ ಕಲಿಯಿರಿ. ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡುವುದು ಮತ್ತು ಆನ್‌ಲೈನ್ ಬ್ಯಾಂಕಿಂಗ್ ಮೋಸಗಳಿಂದ ಪಾರಾಗುವ ಸುವರ್ಣ ನಿಯಮಗಳನ್ನು ತಿಳಿಯಿರಿ.",
                    "description_hi": "UPI, गूगल पे, फोनपे और भीम का सही उपयोग। क्यूआर कोड स्कैन करना और सबसे महत्वपूर्ण नियम: पैसे लेने के लिए कभी यूपीआई पिन न डालें!",
                    "lessons": [
                        {
                            "title": "What is UPI and How Does it Work?",
                            "title_kn": "ಯುಪಿಐ (UPI) ಎಂದರೇನು ಮತ್ತು ಅದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ?",
                            "title_hi": "UPI क्या है और यह कैसे काम करता है?",
                            "summary": "Understand Unified Payments Interface, bank account linking, and zero-fee transactions.",
                            "summary_kn": "ಯುಪಿಐ ಮೂಲಕ ಬ್ಯಾಂಕ್‌ನಿಂದ ನೇರ ಪಾವತಿ ಮಾಡುವ ವಿಧಾನ.",
                            "summary_hi": "यूपीआई के जरिए सीधे बैंक खाते से आसान और त्वरित लेन-देन।",
                            "duration_minutes": 20,
                            "order_index": 1,
                            "practical_action_type": "upi_simulation",
                            "content": """# Understanding UPI (Unified Payments Interface)

UPI is India's revolutionary system developed by NPCI that allows instant money transfers between any two bank accounts using just a mobile number or QR code, 24 hours a day, 365 days a year.

### Why is UPI Useful for Rural Citizens?
- No need to travel to the bank branch or stand in long ATM queues.
- Instant payment for seeds, fertilizers, tractor repairs, and groceries.
- Direct money transfer to family members in emergencies.
- Zero fees for normal peer-to-peer and merchant payments.

### Popular UPI Applications:
- **BHIM**: Government of India's official app.
- **Google Pay (GPay)**
- **PhonePe**
- **Paytm**

All these apps run on the exact same secure UPI network!"""
                        },
                        {
                            "title": "Scanning QR Codes & The Golden Rule of Receiving Money",
                            "title_kn": "ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡುವುದು ಮತ್ತು ಹಣ ಸ್ವೀಕರಿಸುವ ಸುವರ್ಣ ನಿಯಮ",
                            "title_hi": "क्यूआर कोड स्कैन करना और पैसे प्राप्त करने का 'गोल्डन रूल'",
                            "summary": "Master scanning shop QR codes and memorize the ultimate rule: NEVER enter PIN to receive money!",
                            "summary_kn": "ಅಂಗಡಿಯಲ್ಲಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಪಾವತಿಸುವುದು ಹಾಗೂ ಹಣ ಪಡೆಯಲು ಪಿನ್ ಅಗತ್ಯವಿಲ್ಲ ಎಂಬ ಅರಿವು.",
                            "summary_hi": "क्यूआर कोड से भुगतान करना और पैसे लेने के लिए कभी पिन न दर्ज करने का नियम।",
                            "duration_minutes": 25,
                            "order_index": 2,
                            "practical_action_type": "upi_simulation",
                            "content": """# Scanning QR Codes Safely

When you buy groceries or farm supplies at a local store, you will see a square barcode with a name printed on it. This is a **UPI QR Code**.

### Step-by-Step Payment Process:
1. Open Google Pay or PhonePe.
2. Tap the **Scan QR** icon.
3. Point your mobile camera at the shop's QR code.
4. **VERIFY THE NAME**: Look at the merchant name displayed on your screen before proceeding.
5. Enter the exact bill amount (e.g., ₹250).
6. Enter your secret **UPI PIN** (4 or 6 digits) on the black bank security keypad.
7. Hear the confirmation sound. Show the green success tick to the shopkeeper.

---

### ⚠️ THE GOLDEN RULE (MEMORIZE THIS):
> **YOU NEVER, EVER ENTER YOUR UPI PIN TO RECEIVE MONEY!**
> 
> Entering your PIN is like giving a signed withdrawal check to someone. If someone calls saying: *"I am sending you ₹5,000 for your cow or crop, please scan this QR code or enter your PIN to claim the money"*, **IT IS A 100% FRAUD SCAM!**
> 
> When someone sends you genuine money, it deposits into your bank account automatically. You never touch your phone or enter any PIN to get paid!"""
                        }
                    ],
                    "quiz": {
                        "title": "Digital Payments and UPI Safety Assessment",
                        "passing_score": 60,
                        "questions": [
                            {
                                "question": "When do you need to enter your secret UPI PIN?",
                                "question_kn": "ನಿಮ್ಮ ರಹಸ್ಯ UPI PIN ಅನ್ನು ಯಾವಾಗ ನಮೂದಿಸಬೇಕು?",
                                "question_hi": "आपको अपना गुप्त UPI PIN कब दर्ज करना चाहिए?",
                                "option_a": "Only when SENDING money from your account",
                                "option_b": "When receiving money or a prize",
                                "option_c": "When answering a phone call from the bank",
                                "option_d": "Whenever someone asks for it on WhatsApp",
                                "option_a_kn": "ನಿಮ್ಮ ಖಾತೆಯಿಂದ ಹಣವನ್ನು ಕಳುಹಿಸುವಾಗ (ಪಾವತಿಸುವಾಗ) ಮಾತ್ರ",
                                "option_b_kn": "ಹಣ ಅಥವಾ ಬಹುಮಾನವನ್ನು ಸ್ವೀಕರಿಸುವಾಗ",
                                "option_c_kn": "ಬ್ಯಾಂಕ್ ಅಧಿಕಾರಿಯೆಂದು ಹೇಳುವವರು ಕರೆ ಮಾಡಿದಾಗ",
                                "option_d_kn": "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಯಾರಾದರೂ ಕೇಳಿದಾಗ",
                                "option_a_hi": "केवल अपने खाते से पैसे भेजते (भुगतान करते) समय",
                                "option_b_hi": "पैसे या पुरस्कार प्राप्त करते समय",
                                "option_c_hi": "बैंक अधिकारी के फोन करने पर",
                                "option_d_hi": "व्हाट्सएप पर किसी के मांगने पर",
                                "correct_option": "A",
                                "explanation": "A UPI PIN is strictly for authorizing money to LEAVE your bank account. You never enter a PIN to receive money!"
                            },
                            {
                                "question": "A buyer calls offering ₹10,000 for your farm produce and sends a QR code asking you to scan and enter your PIN to receive the advance. What should you do?",
                                "question_kn": "ವ್ಯಕ್ತಿಯೊಬ್ಬರು ನಿಮ್ಮ ಬೆಳೆಗೆ ಮುಂಗಡ ₹೧೦,೦೦೦ ಕಳುಹಿಸುತ್ತೇನೆಂದು ಕ್ಯೂಆರ್ ಕೋಡ್ ಕಳುಹಿಸಿ, ಪಿನ್ ಹಾಕಿ ಹಣ ಪಡೆಯಿರಿ ಎಂದರೆ ಏನು ಮಾಡುತ್ತೀರಿ?",
                                "question_hi": "एक खरीदार आपकी फसल के लिए ₹10,000 भेजने का दावा करता है और क्यूआर कोड भेजकर पिन डालने को कहता है। आप क्या करेंगे?",
                                "option_a": "Scan the QR and enter your UPI PIN immediately",
                                "option_b": "Refuse and do not enter PIN because it is a scam to steal your money",
                                "option_c": "Share your ATM card number instead",
                                "option_d": "Ask your neighbor to enter their PIN",
                                "option_a_kn": "ಕೂಡಲೇ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಪಿನ್ ಹಾಕುತ್ತೇನೆ",
                                "option_b_kn": "ಇದು ಮೋಸವೆಂದು ತಿಳಿದು ತಿರಸ್ಕರಿಸುತ್ತೇನೆ ಮತ್ತು ಯಾವುದೇ ಪಿನ್ ಹಾಕುವುದಿಲ್ಲ",
                                "option_c_kn": "ಎಟಿಎಂ ಕಾರ್ಡ್ ಸಂಖ್ಯೆಯನ್ನು ತಿಳಿಸುತ್ತೇನೆ",
                                "option_d_kn": "ನೆರೆಹೊರೆಯವರ ಬಳಿ ಪಿನ್ ಹಾಕಿಸುತ್ತೇನೆ",
                                "option_a_hi": "तुरंत स्कैन करके पिन डाल दूंगा",
                                "option_b_hi": "मना कर दूंगा क्योंकि पैसे लेने के लिए कभी पिन नहीं लगता और यह धोखाधड़ी है",
                                "option_c_hi": "अपना एटीएम कार्ड नंबर दे दूंगा",
                                "option_d_hi": "पड़ोसी से पिन डलवाऊंगा",
                                "correct_option": "B",
                                "explanation": "This is a classic QR code scam. Legitimate payments directly credit your account without you scanning or entering PIN."
                            }
                        ]
                    }
                },
                # MODULE 5
                {
                    "module_number": 5,
                    "title": "Module 5: Government Online Services",
                    "title_kn": "ಭಾಗ ೫: ಸರ್ಕಾರಿ ಆನ್‌ಲೈನ್ ಸೇವೆಗಳು ಮತ್ತು ಯೋಜನೆಗಳು",
                    "title_hi": "भाग 5: सरकारी ऑनलाइन सेवाएं और योजनाएं",
                    "slug": "government-online-services",
                    "category": "E-Governance",
                    "difficulty": "Beginner",
                    "estimated_hours": 3,
                    "icon": "Landmark",
                    "description": "Learn to access essential citizen services: DigiLocker for digital certificates, PM-KISAN farmer status, Ration Card services, and official state portals like Seva Sindhu / Bhoomi.",
                    "description_kn": "ಡಿಜಿಲಾಕರ್, ಪಿಎಂ ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ, ರೇಷನ್ ಕಾರ್ಡ್, ಜಾತಿ-ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಮತ್ತು ಭೂಮಿ ಪೋರ್ಟಲ್ ಸೇವೆಗಳ ಸಂಪೂರ್ಣ ಮಾಹಿತಿ.",
                    "description_hi": "डिजिलॉकर, पीएम किसान सम्मान निधि, राशन कार्ड, आय-जाति प्रमाण पत्र और सरकारी नागरिक सेवाओं का लाभ उठाना सीखें।",
                    "lessons": [
                        {
                            "title": "DigiLocker: Your Pocket Digital Vault",
                            "title_kn": "ಡಿಜಿಲಾಕರ್ (DigiLocker) ಬಳಕೆ ಮತ್ತು ಮಹತ್ವ",
                            "title_hi": "डिजीलॉकर: आपका सुरक्षित डिजिटल लॉकर",
                            "summary": "Legally valid digital storage for Aadhaar, Driving License, RC, and school marks cards.",
                            "summary_kn": "ಆಧಾರ್, ಡ್ರೈವಿಂಗ್ ಲೈಸೆನ್ಸ್ ಹಾಗೂ ದಾಖಲೆಗಳನ್ನು ಮೊಬೈಲ್‌ನಲ್ಲೇ ಸುರಕ್ಷಿತವಾಗಿ ಇಡುವುದು.",
                            "summary_hi": "आधार, ड्राइविंग लाइसेंस और अंकपत्र को मोबाइल में सुरक्षित रखना।",
                            "duration_minutes": 20,
                            "order_index": 1,
                            "content": """# DigiLocker: Carry Documents Safely on Your Phone

DigiLocker is a flagship initiative of the Ministry of Electronics & IT under Digital India. Documents stored in DigiLocker are **legally equivalent to physical originals** under the IT Act 2000!

### What Documents Can You Store?
- Aadhaar Card
- Driving License & Vehicle RC Book (Accepted by traffic police across India!)
- Class 10 & 12 Marks Sheets
- Caste and Income Certificates
- Ration Card & COVID/Health IDs

### How to Sign Up:
1. Download the **DigiLocker** app from Google Play Store.
2. Tap **Get Started** -> **Create Account**.
3. Enter your full name, date of birth, mobile number, and set a 6-digit security PIN.
4. Enter your 12-digit **Aadhaar Number** to verify via OTP.
5. All your government documents are automatically linked!"""
                        },
                        {
                            "title": "PM-KISAN, Land Records & Citizen Portals",
                            "title_kn": "ಪಿಎಂ ಕಿಸಾನ್, ಭೂಮಿ (RTC) ಮತ್ತು ನಾಗರಿಕ ಸೇವಾ ಪೋರ್ಟಲ್ಸ್",
                            "title_hi": "पीएम-किसान, भूमि रिकॉर्ड और नागरिक सेवा पोर्टल",
                            "summary": "Check PM-KISAN installment status, view land records (RTC), and apply for welfare schemes.",
                            "summary_kn": "ರೈತ ಕಿಸಾನ್ ಯೋಜನೆ ಹಣ ತಪಾಸಣೆ ಮತ್ತು ಜಮೀನಿನ ಪಹಣಿ (RTC) ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಪಡೆಯುವುದು.",
                            "summary_hi": "पीएम किसान सम्मान निधि की किस्त जांचना और खसरा/खतौनी ऑनलाइन देखना।",
                            "duration_minutes": 25,
                            "order_index": 2,
                            "content": """# Essential Online Citizen Services

You no longer need to pay extra middleman fees to check your land records or welfare benefit status.

### 1. PM-KISAN Samman Nidhi (`pmkisan.gov.in`):
- ₹6,000 direct cash transfer per year in 3 equal installments of ₹2,000 for landholding farmer families.
- Check 'Beneficiary Status' simply by entering your Registration Number or Mobile Number.
- Complete your e-KYC using facial recognition on the PM-KISAN mobile app.

### 2. Digital Land Records (RTC / Pahani):
- In Karnataka, use the official **Bhoomi** portal (`landrecords.karnataka.gov.in`) or **Dishaank** app to view land boundaries.
- In other states, use your respective state portal (e.g., Bhulekh, AnyRoR, Dharani).
- You can view owner name, crop survey, and survey number in seconds from your phone!"""
                        }
                    ],
                    "quiz": {
                        "title": "Government Online Services Assessment",
                        "passing_score": 60,
                        "questions": [
                            {
                                "question": "Are documents issued inside the DigiLocker app legally valid for police and official verification?",
                                "question_kn": "ಡಿಜಿಲಾಕರ್‌ನಲ್ಲಿರುವ ದಾಖಲೆಗಳು (ಲೈಸೆನ್ಸ್, ಆರ್‌ಸಿ) ಕಾನೂನುಬದ್ಧವಾಗಿ ಮಾನ್ಯವಾಗಿವೆಯೇ?",
                                "question_hi": "क्या डिजीलॉकर में मौजूद दस्तावेज पुलिस और सरकारी जांच के लिए कानूनी रूप से मान्य हैं?",
                                "option_a": "Yes, legally equivalent to physical original documents under IT Act",
                                "option_b": "No, only original paper cards are accepted",
                                "option_c": "Only valid on Sundays",
                                "option_d": "Only valid if printed on stamp paper",
                                "option_a_kn": "ಹೌದು, ಐಟಿ ಕಾಯ್ದೆಯಡಿ ಮೂಲ ದಾಖಲೆಗಳಿಗೆ ಸಂಪೂರ್ಣ ಸಮಾನ ಮಾನ್ಯತೆ ಇದೆ",
                                "option_b_kn": "ಇಲ್ಲ, ಕೇವಲ ಕಾಗದದ ದಾಖಲೆ ಮಾತ್ರ ಮಾನ್ಯ",
                                "option_c_kn": "ಕೇವಲ ಭಾನುವಾರ ಮಾತ್ರ ಮಾನ್ಯ",
                                "option_d_kn": "ಸ್ಟಾಂಪ್ ಪೇಪರ್‌ನಲ್ಲಿ ಪ್ರಿಂಟ್ ಮಾಡಿದರೆ ಮಾತ್ರ ಮಾನ್ಯ",
                                "option_a_hi": "हाँ, आईटी एक्ट के तहत मूल भौतिक दस्तावेजों के बराबर मान्य हैं",
                                "option_b_hi": "नहीं, केवल मूल कागजी दस्तावेज ही मान्य हैं",
                                "option_c_hi": "केवल रविवार को मान्य हैं",
                                "option_d_hi": "केवल स्टाम्प पेपर पर मान्य हैं",
                                "correct_option": "A",
                                "explanation": "Under Rule 9A of the IT Rules 2016, documents in DigiLocker are treated at par with original physical documents."
                            }
                        ]
                    }
                },
                # MODULE 6
                {
                    "module_number": 6,
                    "title": "Module 6: Cybersecurity and Online Safety",
                    "title_kn": "ಭಾಗ ೬: ಸೈಬರ್ ಸುರಕ್ಷತೆ ಮತ್ತು ಆನ್‌ಲೈನ್ ವಂಚನೆಗಳ ತಡೆ",
                    "title_hi": "भाग 6: साइबर सुरक्षा और ऑनलाइन धोखाधड़ी से बचाव",
                    "slug": "cybersecurity-and-safety",
                    "category": "Cyber Safety",
                    "difficulty": "Intermediate",
                    "estimated_hours": 3,
                    "icon": "ShieldAlert",
                    "description": "Protect your family and hard-earned savings from cyber criminals: identify phishing links, lottery scams, fake bank calls, protect OTPs, and report cyber crimes on Helpline 1930.",
                    "description_kn": "ಆನ್‌ಲೈನ್ ವಂಚನೆ, ನಕಲಿ ಕರೆಗಳು, ಲಾಟರಿ ಮೆಸೇಜ್‌ಗಳು, ಓಟಿಪಿ ರಕ್ಷಣೆ ಮತ್ತು ಸೈಬರ್ ಕ್ರೈಂ ಸಹಾಯವಾಣಿ ೧೯೩೦ ಬಗ್ಗೆ ಅಗತ್ಯ ಜಾಗೃತಿ ಪಡೆಯಿರಿ.",
                    "description_hi": "साइबर अपराधियों से अपनी मेहनत की कमाई बचाएं: फर्जी लिंक, लॉटरी स्कैम, फर्जी बैंक कॉल की पहचान और राष्ट्रीय साइबर हेल्पलाइन 1930 की जानकारी।",
                    "lessons": [
                        {
                            "title": "Identifying Online Fraud, Fake Calls & Phishing",
                            "title_kn": "ಆನ್‌ಲೈನ್ ವಂಚನೆ, ನಕಲಿ ಬ್ಯಾಂಕ್ ಕರೆ ಮತ್ತು ಫಿಶಿಂಗ್ ಲಿಂಕ್ ಗುರುತಿಸುವುದು",
                            "title_hi": "ऑनलाइन धोखाधड़ी, फर्जी कॉल और फिशिंग लिंक की पहचान",
                            "summary": "How cyber fraudsters trick people and how to spot fake lottery messages and threat calls.",
                            "summary_kn": "ಮೋಸದ ಕರೆಗಳು ಮತ್ತು ಸಂದೇಶಗಳನ್ನು ತಕ್ಷಣ ಗುರುತಿಸಿ ಜಾಗೃತರಾಗುವ ಬಗೆ.",
                            "summary_hi": "धोखेबाज कॉल और लॉटरी संदेशों को पहचान कर खुद को सुरक्षित रखना।",
                            "duration_minutes": 25,
                            "order_index": 1,
                            "practical_action_type": "phishing_detector",
                            "content": """# Spotting Online Fraud Before It Happens

Cyber criminals target rural communities with fear, greed, or fake urgency. Knowing their tricks makes you 100% immune!

### 3 Most Common Rural Scams:
1. **The 'Electricity / Bill' Threat**:
   - Message: *"Your electricity will be disconnected tonight at 9:30 PM due to unpaid bill. Call this number immediately or download QuickSupport app."*
   - Reality: Government electricity boards never send personal mobile numbers or ask you to install screen-sharing apps.

2. **The Fake Lottery / KBC Prize**:
   - Message: *"Congratulations! Your SIM number won ₹25 Lakhs in Kaun Banega Crorepati lucky draw. Deposit ₹5,000 processing fee to claim."*
   - Reality: You NEVER have to pay money to win a prize!

3. **Fake Bank Executive Call**:
   - Caller: *"Sir, your ATM card is expiring today. Tell me the 16-digit card number and the 6-digit OTP to renew it."*
   - Reality: Real banks never ask for your card CVV, expiry date, or OTP over the phone!"""
                        },
                        {
                            "title": "OTP Safety, Strong Passwords & National Helpline 1930",
                            "title_kn": "ಓಟಿಪಿ (OTP) ಭದ್ರತೆ, ಬಲವಾದ ಪಾಸ್‌ವರ್ಡ್ ಮತ್ತು ಸಹಾಯವಾಣಿ ೧೯೩೦",
                            "title_hi": "OTP सुरक्षा, मजबूत पासवर्ड और राष्ट्रीय हेल्पलाइन 1930",
                            "summary": "Why OTP must never be shared, creating uncrackable passwords, and reporting fraud within the Golden Hour.",
                            "summary_kn": "ಓಟಿಪಿ ರಹಸ್ಯ ಕಾಪಾಡುವುದು ಮತ್ತು ಹಣ ಕಳೆದುಕೊಂಡರೆ ತಕ್ಷಣ ೧೯೩೦ ಕರೆ ಮಾಡುವ ವಿಧಾನ.",
                            "summary_hi": "ओटीपी की गोपनीयता बनाए रखना और धोखाधड़ी होने पर तुरंत 1930 डायल करना।",
                            "duration_minutes": 20,
                            "order_index": 2,
                            "content": """# OTP Safety & The National Cyber Crime Portal

### What is an OTP?
An **OTP (One Time Password)** is a temporary digital key sent to your mobile phone to verify that YOU are the one making a transaction or logging in.

- **Rule**: Sharing your OTP with someone is like handing them the keys to your home locker.
- **NEVER** read out an OTP over the phone to ANYONE, no matter who they claim to be.

---

### What to Do If You Ever Lose Money to Fraud:
1. **Act Within the 'Golden Hour' (First 2 to 3 hours)**!
2. Call the Government of India National Cyber Crime Helpline: **1930** immediately.
3. The police cyber cell will immediately freeze the fraudster's account and prevent your money from being withdrawn!
4. You can also file an official complaint at **cybercrime.gov.in**."""
                        }
                    ],
                    "quiz": {
                        "title": "Cybersecurity & Online Safety Quiz",
                        "passing_score": 60,
                        "questions": [
                            {
                                "question": "What is the official National Cyber Crime Helpline number in India to report online financial fraud?",
                                "question_kn": "ಆನ್‌ಲೈನ್ ಹಣಕಾಸು ವಂಚನೆಯಾದಾಗ ತಕ್ಷಣ ಕರೆ ಮಾಡಬೇಕಾದ ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಕ್ರೈಂ ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆ ಯಾವುದು?",
                                "question_hi": "ऑनलाइन वित्तीय धोखाधड़ी की शिकायत दर्ज कराने के लिए भारत का राष्ट्रीय साइबर हेल्पलाइन नंबर क्या है?",
                                "option_a": "1930",
                                "option_b": "100",
                                "option_c": "108",
                                "option_d": "1098",
                                "option_a_kn": "೧೯೩೦ (1930)",
                                "option_b_kn": "೧೦೦ (100)",
                                "option_c_kn": "೧೦೮ (108)",
                                "option_d_kn": "೧೦೯೮ (1098)",
                                "option_a_hi": "1930",
                                "option_b_hi": "100",
                                "option_c_hi": "108",
                                "option_d_hi": "1098",
                                "correct_option": "A",
                                "explanation": "Helpline 1930 is the dedicated national cyber crime reporting number operated by the Ministry of Home Affairs."
                            },
                            {
                                "question": "A caller claiming to be your bank manager asks for the 6-digit OTP sent to your phone to prevent your account from being blocked. What should you do?",
                                "question_kn": "ಬ್ಯಾಂಕ್ ಮ್ಯಾನೇಜರ್ ಎಂದು ಹೇಳಿಕೊಂಡು ನಿಮ್ಮ ಖಾತೆ ಬ್ಲಾಕ್ ಆಗದಂತೆ ಓಟಿಪಿ ನೀಡಿ ಎಂದು ಕರೆ ಮಾಡಿದರೆ ನೀವು ಏನು ಮಾಡುತ್ತೀರಿ?",
                                "question_hi": "बैंक मैनेजर बनकर कोई फोन करे और खाता बंद होने से बचाने के लिए ओटीपी मांगे, तो आपको क्या करना चाहिए?",
                                "option_a": "Immediately tell them the OTP",
                                "option_b": "Hang up and never share OTP, because banks never ask for OTP",
                                "option_c": "Ask them to send ₹100 first",
                                "option_d": "Write the OTP on Facebook",
                                "option_a_kn": "ಕೂಡಲೇ ಓಟಿಪಿ ಹೇಳುತ್ತೇನೆ",
                                "option_b_kn": "ಕರೆಯನ್ನು ಕಟ್ ಮಾಡಿ ಓಟಿಪಿ ನೀಡುವುದಿಲ್ಲ; ಏಕೆಂದರೆ ಬ್ಯಾಂಕ್ ಎಂದಿಗೂ ಓಟಿಪಿ ಕೇಳುವುದಿಲ್ಲ",
                                "option_c_kn": "ಮೊದಲು ನೂರು ರೂಪಾಯಿ ಕಳುಹಿಸಲು ಹೇಳುತ್ತೇನೆ",
                                "option_d_kn": "ಫೇಸ್‌ಬುಕ್‌ನಲ್ಲಿ ಓಟಿಪಿ ಹಾಕುತ್ತೇನೆ",
                                "option_a_hi": "तुरंत ओटीपी बता दूंगा",
                                "option_b_hi": "फोन काट दूंगा और कभी ओटीपी नहीं दूंगा, क्योंकि बैंक कभी ओटीपी नहीं मांगते",
                                "option_c_hi": "पहले पैसे भेजने को कहूंगा",
                                "option_d_hi": "फेसबुक पर डाल दूंगा",
                                "correct_option": "B",
                                "explanation": "No legitimate bank or organization will ever ask for your OTP. Sharing an OTP allows scammers to drain your balance."
                            }
                        ]
                    }
                },
                # MODULE 7
                {
                    "module_number": 7,
                    "title": "Module 7: Online Education and Healthcare",
                    "title_kn": "ಭಾಗ ೭: ಆನ್‌ಲೈನ್ ಶಿಕ್ಷಣ ಮತ್ತು ಡಿಜಿಟಲ್ ಆರೋಗ್ಯ ಸೇವೆಗಳು",
                    "title_hi": "भाग 7: ऑनलाइन शिक्षा और डिजिटल स्वास्थ्य सेवाएं",
                    "slug": "online-education-and-healthcare",
                    "category": "Social Welfare",
                    "difficulty": "Beginner",
                    "estimated_hours": 2,
                    "icon": "HeartHandshake",
                    "description": "Unlock free digital resources for your family: free educational portals (DIKSHA, SWAYAM), Ayushman Bharat ABHA Health ID, and consulting specialist doctors online via e-Sanjeevani.",
                    "description_kn": "ಉಚಿತ ಶಿಕ್ಷಣ ಪೋರ್ಟಲ್‌ಗಳು (DIKSHA, SWAYAM), ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ABHA ಹೆಲ್ತ್ ಕಾರ್ಡ್ ಹಾಗೂ ಇ-ಸಂಜೀವಿನಿ ಮೂಲಕ ಆನ್‌ಲೈನ್ ವೈದ್ಯಕೀಯ ಸಮಾಲೋಚನೆ ತಿಳಿಯಿರಿ.",
                    "description_hi": "दीक्षा और स्वयं से मुफ्त ऑनलाइन पढ़ाई, आयुष्मान भारत ABHA हेल्थ आईडी बनाना और ई-संजीवनी से घर बैठे मुफ्त डॉक्टर परामर्श लेना सीखें।",
                    "lessons": [
                        {
                            "title": "Free Online Education Portals: DIKSHA & SWAYAM",
                            "title_kn": "ಉಚಿತ ಶಿಕ್ಷಣ ಪೋರ್ಟಲ್ಸ್: ದೀಕ್ಷಾ (DIKSHA) ಮತ್ತು ಸ್ವಯಂ (SWAYAM)",
                            "title_hi": "मुफ्त ऑनलाइन शिक्षा: दीक्षा (DIKSHA) और स्वयं (SWAYAM)",
                            "summary": "Access school textbooks, animated video lessons, and free college certificates for rural students.",
                            "summary_kn": "ಶಾಲಾ-ಕಾಲೇಜು ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಉಚಿತ ಡಿಜಿಟಲ್ ಪಠ್ಯಪುಸ್ತಕ ಮತ್ತು ತರಬೇತಿ.",
                            "summary_hi": "कक्षा 1 से 12 तक की पाठ्यपुस्तकें और मुफ्त कॉलेज कोर्स का लाभ उठाना।",
                            "duration_minutes": 20,
                            "order_index": 1,
                            "content": """# Empowering Rural Youth with Free Digital Education

Children in villages now have access to the exact same top-tier teachers as students in top metropolitan cities, completely free!

### 1. DIKSHA Portal (`diksha.gov.in`):
- National digital platform for school education across all Indian states and languages.
- Simply scan the QR code printed on state school textbooks with your phone to watch animated video explanations of difficult science and math chapters!
- Works offline once lessons are downloaded.

### 2. SWAYAM (`swayam.gov.in`):
- Offers free college and university courses taught by professors from IITs, IIMs, and Central Universities.
- Earn verified government certificates for career growth and employment."""
                        },
                        {
                            "title": "Digital Healthcare: e-Sanjeevani & Ayushman Bharat ABHA",
                            "title_kn": "ಡಿಜಿಟಲ್ ಆರೋಗ್ಯ: ಇ-ಸಂಜೀವಿನಿ ವೈದ್ಯ ಸಮಾಲೋಚನೆ ಮತ್ತು ABHA ಕಾರ್ಡ್",
                            "title_hi": "डिजिटल स्वास्थ्य: ई-संजीवनी डॉक्टर परामर्श और ABHA कार्ड",
                            "summary": "Consult MBBS and specialist doctors on video calls from home, and generate your 14-digit ABHA health card.",
                            "summary_kn": "ಮನೆಯಲ್ಲೇ ಕುಳಿತು ಮೊಬೈಲ್ ಮೂಲಕ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸುವುದು ಮತ್ತು ಹೆಲ್ತ್ ಐಡಿ ಹೊಂದುವುದು.",
                            "summary_hi": "घर बैठे वीडियो कॉल पर डॉक्टर को दिखाना और 14 अंकों का ABHA हेल्थ कार्ड बनाना।",
                            "duration_minutes": 20,
                            "order_index": 2,
                            "content": """# Telemedicine & Digital Health for Rural India

You no longer have to spend entire days traveling to district hospitals for minor illnesses or follow-up consultations.

### What is e-Sanjeevani (`esanjeevani.mohfw.gov.in`)?
- Government of India's free National Teleconsultation Service.
- Connects citizens in villages directly with certified MBBS doctors and specialists (Pediatricians, Gynecologists, Cardiologists) via video calls on your smartphone.
- The doctor generates an official digital prescription that you can show at any Jan Aushadhi Kendra or pharmacy for low-cost medicines.

### Ayushman Bharat Health Account (ABHA ID):
- A 14-digit unique health identity number.
- Allows you to store lab test reports, X-rays, and doctor prescriptions digitally without carrying bulky paper files."""
                        }
                    ],
                    "quiz": {
                        "title": "Online Education and Healthcare Quiz",
                        "passing_score": 60,
                        "questions": [
                            {
                                "question": "What is e-Sanjeevani?",
                                "question_kn": "ಇ-ಸಂಜೀವಿನಿ (e-Sanjeevani) ಎಂದರೇನು?",
                                "question_hi": "ई-संजीवनी (e-Sanjeevani) क्या है?",
                                "option_a": "Government of India's free online doctor teleconsultation service",
                                "option_b": "A paid gaming application",
                                "option_c": "An online loan application",
                                "option_d": "A social media video app",
                                "option_a_kn": "ಭಾರತ ಸರ್ಕಾರದ ಉಚಿತ ಆನ್‌ಲೈನ್ ವೈದ್ಯಕೀಯ ಸಮಾಲೋಚನಾ (ಟೆಲಿಮೆಡಿಸಿನ್) ಸೇವೆ",
                                "option_b_kn": "ಹಣ ಕೊಟ್ಟು ಆಡುವ ಮೊಬೈಲ್ ಗೇಮ್",
                                "option_c_kn": "ಆನ್‌ಲೈನ್ ಸಾಲ ನೀಡುವ ಆಪ್",
                                "option_d_kn": "ಸಾಮಾಜಿಕ ಜಾಲತಾಣದ ವಿಡಿಯೋ ಆಪ್",
                                "option_a_hi": "भारत सरकार की मुफ्त ऑनलाइन डॉक्टर परामर्श (टेलीमेडिसिन) सेवा",
                                "option_b_hi": "पैसे देकर खेला जाने वाला गेम",
                                "option_c_hi": "ऑनलाइन लोन देने वाला ऐप",
                                "option_d_hi": "सोशल मीडिया वीडियो ऐप",
                                "correct_option": "A",
                                "explanation": "e-Sanjeevani provides free patient-to-doctor and doctor-to-doctor teleconsultations across India."
                            }
                        ]
                    }
                }
            ]

            for m in modules_data:
                c = Course(
                    module_number=m['module_number'],
                    title=m['title'],
                    title_kn=m['title_kn'],
                    title_hi=m['title_hi'],
                    slug=m['slug'],
                    category=m['category'],
                    difficulty=m['difficulty'],
                    estimated_hours=m['estimated_hours'],
                    icon=m['icon'],
                    description=m['description'],
                    description_kn=m['description_kn'],
                    description_hi=m['description_hi'],
                    created_by=trainer_user.id
                )
                db.session.add(c)
                db.session.flush()

                # Add lessons
                for l in m['lessons']:
                    lesson = Lesson(
                        course_id=c.id,
                        title=l['title'],
                        title_kn=l['title_kn'],
                        title_hi=l['title_hi'],
                        summary=l['summary'],
                        summary_kn=l['summary_kn'],
                        summary_hi=l['summary_hi'],
                        duration_minutes=l['duration_minutes'],
                        order_index=l['order_index'],
                        content=l['content'],
                        practical_action_type=l.get('practical_action_type')
                    )
                    db.session.add(lesson)

                # Add learning materials
                mat = LearningMaterial(
                    course_id=c.id,
                    title=f"Handbook: {m['title']}",
                    material_type="guide",
                    file_url=f"/materials/{m['slug']}-quick-guide.pdf",
                    file_size_kb=450,
                    description=f"Concise visual summary and quick reference guide for {m['title']}."
                )
                db.session.add(mat)

                # Add Quiz
                if 'quiz' in m:
                    q_data = m['quiz']
                    quiz = Quiz(
                        course_id=c.id,
                        title=q_data['title'],
                        passing_score=q_data['passing_score'],
                        time_limit_minutes=15
                    )
                    db.session.add(quiz)
                    db.session.flush()

                    for idx, q in enumerate(q_data['questions'], start=1):
                        qq = QuizQuestion(
                            quiz_id=quiz.id,
                            question=q['question'],
                            question_kn=q.get('question_kn'),
                            question_hi=q.get('question_hi'),
                            option_a=q['option_a'],
                            option_b=q['option_b'],
                            option_c=q['option_c'],
                            option_d=q['option_d'],
                            option_a_kn=q.get('option_a_kn'),
                            option_b_kn=q.get('option_b_kn'),
                            option_c_kn=q.get('option_c_kn'),
                            option_d_kn=q.get('option_d_kn'),
                            option_a_hi=q.get('option_a_hi'),
                            option_b_hi=q.get('option_b_hi'),
                            option_c_hi=q.get('option_c_hi'),
                            option_d_hi=q.get('option_d_hi'),
                            correct_option=q['correct_option'],
                            explanation=q['explanation'],
                            order_index=idx
                        )
                        db.session.add(qq)

            db.session.commit()
            print("✅ Successfully seeded all 7 modules, lessons, and quizzes!")

        # 3. SEED STUDENT SAMPLE ENROLLMENTS & ACTIVITIES
        if Enrollment.query.filter_by(user_id=student_user.id).count() == 0:
            c1 = Course.query.filter_by(module_number=1).first()
            c4 = Course.query.filter_by(module_number=4).first()
            c6 = Course.query.filter_by(module_number=6).first()

            if c1:
                # Mark completed with certificate
                e1 = Enrollment(user_id=student_user.id, course_id=c1.id, status='completed', progress_percentage=100)
                db.session.add(e1)
                for l in c1.lessons.all():
                    p = UserProgress(user_id=student_user.id, lesson_id=l.id, course_id=c1.id, is_completed=True)
                    db.session.add(p)

                # Add quiz result & certificate
                if c1.quiz:
                    qr = QuizResult(
                        user_id=student_user.id,
                        quiz_id=c1.quiz.id,
                        total_questions=c1.quiz.questions.count(),
                        correct_answers=c1.quiz.questions.count(),
                        score_percentage=100.0,
                        passed=True
                    )
                    db.session.add(qr)
                    db.session.flush()

                    cert = Certificate(
                        certificate_code="DS-2024-C1-U3-A8F29D",
                        user_id=student_user.id,
                        course_id=c1.id,
                        quiz_result_id=qr.id,
                        score_percentage=100.0,
                        learner_name=student_user.name,
                        course_title=c1.title
                    )
                    db.session.add(cert)

            if c4:
                # Module 4 In Progress
                e4 = Enrollment(user_id=student_user.id, course_id=c4.id, status='in_progress', progress_percentage=50)
                db.session.add(e4)
                first_l = c4.lessons.first()
                if first_l:
                    p = UserProgress(user_id=student_user.id, lesson_id=first_l.id, course_id=c4.id, is_completed=True)
                    db.session.add(p)

            # Seed sample activities
            activities = [
                UserActivity(user_id=student_user.id, activity_type='register', description='Registered for Digital Saathi platform'),
                UserActivity(user_id=student_user.id, activity_type='enrolled', description='Enrolled in Module 1: Computer Basics'),
                UserActivity(user_id=student_user.id, activity_type='completed_lesson', description='Completed lesson: Introduction to Computers'),
                UserActivity(user_id=student_user.id, activity_type='quiz_passed', description='Passed Computer Basics Certification Quiz with 100% score'),
                UserActivity(user_id=student_user.id, activity_type='earned_certificate', description='Earned Certificate for Module 1: Computer Basics (Code: DS-2024-C1-U3-A8F29D)'),
                UserActivity(user_id=student_user.id, activity_type='enrolled', description='Enrolled in Module 4: Digital Payments')
            ]
            for act in activities:
                db.session.add(act)

            # Seed community training programs
            prog1 = TrainingProgram(
                title='Gram Panchayat Digital Banking Camp',
                description='Hands-on offline training for village elders and farmers on scanning QR codes and avoiding UPI scams.',
                target_group='Farmers & Village Elders',
                location='Koppa Gram Panchayat Hall',
                trainer_id=trainer_user.id,
                status='upcoming',
                max_participants=50
            )
            prog2 = TrainingProgram(
                title='Mahila Self-Help Group (SHG) Smartphone Literacy Drive',
                description='Training rural women entrepreneurs on using DigiLocker, online banking, and government welfare schemes.',
                target_group='Rural Women (SHG)',
                location='Mandya Community Hall',
                trainer_id=trainer_user.id,
                status='ongoing',
                max_participants=40
            )
            db.session.add(prog1)
            db.session.add(prog2)

            db.session.commit()
            print("✅ Successfully seeded student progress, certificates, and community training programs!")

if __name__ == '__main__':
    seed()
