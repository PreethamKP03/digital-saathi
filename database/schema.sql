-- ======================================================================
-- DIGITAL SAATHI – AI-POWERED DIGITAL LITERACY PLATFORM
-- Database Schema for MySQL / SQLite compatible DDL
-- ======================================================================

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'student', -- 'student', 'trainer', 'admin'
    preferred_language VARCHAR(10) DEFAULT 'en', -- 'en', 'kn', 'hi'
    village VARCHAR(100),
    district VARCHAR(100),
    state VARCHAR(100),
    age INTEGER,
    avatar VARCHAR(255),
    is_active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TRAINERS TABLE (Extended profile for trainers)
CREATE TABLE IF NOT EXISTS trainers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    qualification VARCHAR(200),
    organization VARCHAR(200),
    specialization VARCHAR(200),
    bio TEXT,
    assigned_region VARCHAR(100),
    is_verified BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. COURSES TABLE
CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(200) NOT NULL,
    title_kn VARCHAR(200),
    title_hi VARCHAR(200),
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    description_kn TEXT,
    description_hi TEXT,
    category VARCHAR(100) NOT NULL,
    difficulty VARCHAR(50) DEFAULT 'Beginner', -- 'Beginner', 'Intermediate', 'Advanced'
    estimated_hours INTEGER DEFAULT 2,
    thumbnail VARCHAR(255),
    icon VARCHAR(50) DEFAULT 'BookOpen',
    module_number INTEGER DEFAULT 1,
    is_published BOOLEAN DEFAULT 1,
    created_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- 4. LESSONS TABLE
CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    title_kn VARCHAR(200),
    title_hi VARCHAR(200),
    content TEXT NOT NULL,
    content_kn TEXT,
    content_hi TEXT,
    summary TEXT,
    summary_kn TEXT,
    summary_hi TEXT,
    order_index INTEGER DEFAULT 1,
    duration_minutes INTEGER DEFAULT 15,
    video_url VARCHAR(255),
    practical_action_type VARCHAR(100), -- 'upi_simulation', 'phishing_detector', 'email_composer', etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- 5. LEARNING MATERIALS TABLE
CREATE TABLE IF NOT EXISTS learning_materials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL,
    lesson_id INTEGER,
    title VARCHAR(200) NOT NULL,
    material_type VARCHAR(50) NOT NULL, -- 'pdf', 'guide', 'infographic', 'cheatsheet', 'video'
    file_url VARCHAR(255) NOT NULL,
    file_size_kb INTEGER DEFAULT 0,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE SET NULL
);

-- 6. ENROLLMENTS TABLE
CREATE TABLE IF NOT EXISTS enrollments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'in_progress', -- 'in_progress', 'completed'
    progress_percentage INTEGER DEFAULT 0,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    UNIQUE(user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- 7. QUIZZES TABLE
CREATE TABLE IF NOT EXISTS quizzes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    title_kn VARCHAR(200),
    title_hi VARCHAR(200),
    passing_score INTEGER DEFAULT 60, -- passing percentage
    time_limit_minutes INTEGER DEFAULT 15,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- 8. QUIZ QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS quiz_questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quiz_id INTEGER NOT NULL,
    question TEXT NOT NULL,
    question_kn TEXT,
    question_hi TEXT,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    option_a_kn VARCHAR(255),
    option_b_kn VARCHAR(255),
    option_c_kn VARCHAR(255),
    option_d_kn VARCHAR(255),
    option_a_hi VARCHAR(255),
    option_b_hi VARCHAR(255),
    option_c_hi VARCHAR(255),
    option_d_hi VARCHAR(255),
    correct_option VARCHAR(1) NOT NULL, -- 'A', 'B', 'C', 'D'
    explanation TEXT,
    explanation_kn TEXT,
    explanation_hi TEXT,
    order_index INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- 9. QUIZ RESULTS TABLE
CREATE TABLE IF NOT EXISTS quiz_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    quiz_id INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    correct_answers INTEGER NOT NULL,
    score_percentage REAL NOT NULL,
    passed BOOLEAN NOT NULL,
    user_answers TEXT, -- JSON representation of answers submitted
    attempt_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- 10. LEARNING PROGRESS TABLE (Per-lesson progress)
CREATE TABLE IF NOT EXISTS learning_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    lesson_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    is_completed BOOLEAN DEFAULT 0,
    completed_at TIMESTAMP,
    time_spent_seconds INTEGER DEFAULT 0,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, lesson_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- 11. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS certificates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    certificate_code VARCHAR(100) UNIQUE NOT NULL, -- e.g. 'DS-2024-C1-U489'
    user_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    quiz_result_id INTEGER,
    score_percentage REAL NOT NULL,
    learner_name VARCHAR(120) NOT NULL,
    course_title VARCHAR(200) NOT NULL,
    issue_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    certificate_url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_result_id) REFERENCES quiz_results(id) ON DELETE SET NULL
);

-- 12. TRAINING PROGRAMS TABLE
CREATE TABLE IF NOT EXISTS training_programs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    target_group VARCHAR(100), -- 'Farmers', 'Rural Women (SHG)', 'Village Elders', 'Youth'
    location VARCHAR(200),
    start_date DATE,
    end_date DATE,
    trainer_id INTEGER,
    status VARCHAR(50) DEFAULT 'upcoming', -- 'upcoming', 'ongoing', 'completed'
    max_participants INTEGER DEFAULT 50,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trainer_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 13. USER ACTIVITIES TABLE (Audit & Activity Tracking)
CREATE TABLE IF NOT EXISTS user_activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    activity_type VARCHAR(100) NOT NULL, -- 'login', 'enrolled', 'completed_lesson', 'attempted_quiz', 'earned_certificate'
    description TEXT,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
