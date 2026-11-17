# DIGITAL SAATHI – AI-POWERED DIGITAL LITERACY PLATFORM FOR RURAL COMMUNITIES

> **National Digital Literacy & Cyber Empowerment Platform**  
> Developed for Bachelor of Engineering (B.E.) Software Engineering Academic Demonstration & Real-World Rural Inclusion.

---

## 🌟 1. Project Overview

**Digital Saathi** is a comprehensive, responsive, and production-ready full-stack web application designed specifically to empower rural citizens across India—including farmers, rural women (Self-Help Groups), village elders, students, and beginners—with essential digital literacy, safe mobile banking habits, cyber fraud awareness, and seamless access to government online services.

Unlike static prototypes, **Digital Saathi** features an interactive backend with persistent relational database storage, secure JWT authentication with Role-Based Access Control (RBAC), browser-native Text-to-Speech (TTS) voice learning, an intelligent AI Assistant with multi-lingual fallback, risk-free interactive sandboxes (Safe UPI simulator, Phishing detector game), automatic quiz grading, and verifiable PDF certificate generation with unique verification codes and QR codes.

---

## 🛠️ 2. Technology Stack

### Frontend:
- **React.js (Vite)**: Modern component architecture, fast Hot Module Replacement (HMR).
- **Tailwind CSS**: High-contrast, mobile-first rural UI with deep blue, teal, and emerald theme.
- **Lucide React**: Clean, accessible iconography.
- **HTML5 & CSS3**: Semantic layouts, responsive flexbox/grid, custom accessibility styling.
- **Web Speech API**: In-browser Text-to-Speech (TTS) with Play, Pause, Resume, and Stop controls in English, Kannada, and Hindi.
- **Canvas Confetti**: Visual celebration on passing certification assessments.

### Backend:
- **Python Flask**: RESTful API architecture with clean modular Blueprints.
- **Flask-SQLAlchemy**: Relational Object-Relational Mapping (ORM).
- **PyJWT**: Secure JSON Web Token authentication with expiration and payload claims.
- **Werkzeug Security**: Cryptographic password hashing (`pbkdf2:sha256`).
- **Flask-CORS**: Cross-Origin Resource Sharing handling.

### Database:
- **SQLite (Default Development)**: Out-of-the-box zero-setup database (`backend/digital_saathi.db`).
- **MySQL (Production Support)**: Seamlessly supported by setting `DATABASE_URL` or `MYSQL_*` environment variables in `.env`.
- **Database Schema**: Full DDL script located at `database/schema.sql`.

### AI Assistant:
- **Digital Saathi Assistant**: Integrated chatbot with dual-mode support:
  1. Configurable Google Gemini / OpenAI REST API integration via backend (keys are never exposed to frontend).
  2. Built-in Semantic & Keyword Multilingual Knowledge Base covering Computer basics, Smartphone usage, UPI safety, DigiLocker, PM-KISAN, and Cyber fraud prevention in English, Kannada, and Hindi.

---

## 👥 3. User Roles & 1-Click Demo Accounts

The platform includes three distinct user roles with full Role-Based Access Control (RBAC):

| Role | Email | Password | Key Permissions & Features |
| :--- | :--- | :--- | :--- |
| **Student / Learner** | `student@digitalsaathi.in` | `Student@123` | Browse 7 modules, listen via voice TTS, complete lessons, practice on UPI Sandbox & Phishing Game, take quizzes, view progress percentage, earn badges, and download official PDF certificates. |
| **Village Trainer** | `trainer@digitalsaathi.in` | `Trainer@123` | Monitor registered village learners, view student progress reports & quiz averages, create courses, upload learning guides, and schedule Gram Panchayat literacy camps. |
| **Platform Admin** | `admin@digitalsaathi.in` | `Admin@123` | Platform analytics dashboard, monthly registration growth charts, course performance rates, user management (RBAC role changes, activate/suspend, delete), and platform activity audit logs. |

*Tip: The Login page features 1-Click Quick-Fill buttons for Student, Trainer, and Admin for instantaneous testing!*

---

## 📚 4. The 7 Main Learning Modules

All 7 modules specified in the curriculum are fully implemented and pre-seeded:

1. **Module 1: Computer Basics (ಕಂಪ್ಯೂಟರ್ ಮೂಲಗಳು / कंप्यूटर की मूल बातें)**
   - Hardware vs Software, CPU, monitor, mouse navigation (single click, double click, right click), keyboard shortcuts, folder organization, and safe shutdown.
2. **Module 2: Smartphone Learning (ಸ್ಮಾರ್ಟ್‌ಫೋನ್ ಕಲಿಕೆ / स्मार्टफोन सीखना)**
   - Android essentials, touch gestures, downloading verified apps safely from Google Play Store, phone settings, WiFi, mobile data, and contacts management.
3. **Module 3: Internet and Email (ಇಂಟರ್ನೆಟ್ ಮತ್ತು ಇಮೇಲ್ / इंटरनेट और ईमेल)**
   - World Wide Web, safe Google searches, identifying official `.gov.in` websites, creating Gmail accounts, composing emails, and attaching documents.
4. **Module 4: Digital Payments (ಡಿಜಿಟಲ್ ಪಾವತಿಗಳು / डिजिटल भुगतान)**
   - UPI fundamentals, Google Pay, PhonePe, BHIM, scanning shop QR codes safely, and **THE GOLDEN RULE: You NEVER enter UPI PIN to receive money!** Includes interactive **Safe UPI Sandbox Simulator**.
5. **Module 5: Government Online Services (ಸರ್ಕಾರಿ ಆನ್‌ಲೈನ್ ಸೇವೆಗಳು / सरकारी सेवाएं)**
   - DigiLocker for carrying legal digital Aadhaar, Driving License, and RC; checking PM-KISAN ₹6,000 yearly benefit; viewing Karnataka Bhoomi RTC land records; and citizen portal access.
6. **Module 6: Cybersecurity and Online Safety (ಸೈಬರ್ ಸುರಕ್ಷತೆ / साइबर सुरक्षा)**
   - Identifying fake lottery SMS (KBC), electricity cutoff threats, OTP safety (never share OTP with anyone), password strength, and reporting financial fraud within the Golden Hour to **National Cyber Helpline 1930**. Includes **Scam Spotter Game**.
7. **Module 7: Online Education and Healthcare (ಆನ್‌ಲೈನ್ ಶಿಕ್ಷಣ ಮತ್ತು ಆರೋಗ್ಯ / ऑनलाइन शिक्षा व स्वास्थ्य)**
   - Free digital education via DIKSHA and SWAYAM, generating 14-digit ABHA Health IDs, and consulting MBBS specialists online on video calls via **e-Sanjeevani**.

---

## 🌐 5. Multi-Language Support

Digital Saathi features high-quality localization across three languages:
- **English** (`en`)
- **ಕನ್ನಡ (Kannada)** (`kn`)
- **हिंदी (Hindi)** (`hi`)

The navbar contains an interactive language selector that dynamically updates UI labels, navigation buttons, module titles, lesson content, quiz questions, and configures the browser Text-to-Speech voice to match the selected regional language.

---

## 💻 6. Installation & Local Development

### Prerequisites:
- Python 3.9+ (Python 3.11 recommended)
- Node.js 18+ (Node.js 20 or 24 recommended)
- npm 9+

### Quick Start (Windows 1-Click):
Double-click `start.bat` in the project root directory. This will automatically launch both the backend on port 5000 and the frontend on port 5173 in separate console windows!

---

### Manual Setup:

#### 1. Backend Setup:
```bash
cd backend
python -m venv venv

# Windows activate:
venv\Scripts\activate

# macOS / Linux activate:
source venv/bin/activate

# Install dependencies:
pip install -r requirements.txt

# Seed the database with all 7 modules, quizzes, and demo users:
python seed_data.py

# Run the Flask API server:
python app.py
```
*Backend will be running at: `http://127.0.0.1:5000`*

#### 2. Frontend Setup:
```bash
cd frontend
npm install
npm run dev
```
*Frontend will be running at: `http://127.0.0.1:5173`*

---

## 🗄️ 7. Database Structure (12 Core Tables)

1. `users`: User authentication, roles (`student`, `trainer`, `admin`), village, district, language preferences.
2. `trainers`: Extended profile for certified village trainers and NGO educators.
3. `courses`: 7 core learning modules with multi-lingual titles, descriptions, icons, and difficulty.
4. `lessons`: Step-by-step modular lessons with duration, video URLs, and practical simulation identifiers.
5. `learning_materials`: Handbooks, cheatsheets, infographics, and PDFs.
6. `enrollments`: Course enrollment status, completion dates, and overall progress percentage.
7. `quizzes`: Certification assessments linked to courses with passing criteria.
8. `quiz_questions`: 4-option multiple-choice questions with multi-lingual options and explanations.
9. `quiz_results`: Stored quiz submissions, scores, answers, and pass/fail audit history.
10. `learning_progress`: Per-lesson completion tracking and timestamp.
11. `certificates`: Official verifiable completion certificates with unique codes (e.g., `DS-2024-C1-U3-A8F29D`).
12. `training_programs`: Community workshops (Gram Panchayat camps, Mahila SHG drives).
13. `user_activities`: Platform-wide activity audit trail.

---

## 📜 8. Public Certificate Verification

Any certificate issued by the platform can be verified in real time without logging in:
- Navigate to `/verify` in the browser or `/verify/<certificate_code>`
- Displays learner name, course title, completion score, issue date, and official issuing body confirmation.

---

## 🎓 9. Academic Project Suitability

This project has been engineered to strictly satisfy all academic evaluation criteria for a **Bachelor of Engineering in Computer Science / Information Science / Software Engineering**:
- Complete full-stack implementation (no mock UI or empty placeholders).
- Decoupled client-server architecture with RESTful endpoints.
- Role-Based Access Control (RBAC) with cryptographic password hashing.
- AI Assistant with resilient fallbacks.
- Multi-lingual accessibility tailored to rural digital empowerment.
- Comprehensive database schema with foreign keys and relational integrity.
