import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import VoiceControls from '../components/VoiceControls';
import { 
  BookOpen, Clock, Award, CheckCircle2, Play, FileText, 
  ArrowLeft, Download, ShieldCheck, HelpCircle, Lock, Sparkles 
} from 'lucide-react';

const CourseDetailsPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const { language, t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const fetchCourse = async () => {
    try {
      const res = await api.getCourse(id, language);
      if (res.success && res.course) {
        setCourse(res.course);
      }
    } catch (err) {
      console.error("Error loading course details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id, language]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setEnrolling(true);
    try {
      const res = await api.enrollCourse(course.id);
      if (res.success) {
        await fetchCourse();
      }
    } catch (err) {
      console.error("Enroll error:", err);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-saathi-blue-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs font-semibold text-slate-500">Loading course curriculum...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-lg font-bold text-slate-800">Course not found</h2>
        <Link to="/courses" className="inline-block px-4 py-2 bg-saathi-blue-900 text-white rounded-xl text-xs font-semibold">
          Back to Courses
        </Link>
      </div>
    );
  }

  const isEnrolled = course.enrolled;
  const completedIds = course.completed_lesson_ids || [];
  const progress = course.progress_percentage || 0;
  const isCompleted = course.status === 'completed' || progress === 100;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back link */}
      <Link
        to="/courses"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-saathi-blue-900 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t('common.back')} to All Courses</span>
      </Link>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-saathi-blue-950 via-saathi-blue-900 to-teal-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-teal-500/20 text-teal-300 border border-teal-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {course.category}
            </span>
            <span className="bg-white/10 text-white px-2.5 py-1 rounded-full text-xs font-medium">
              {course.difficulty} Level
            </span>
            <span className="bg-white/10 text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>~{course.estimated_hours} Hours</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {course.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
            {course.description}
          </p>

          {/* Enrollment / Resume CTA */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            {!isEnrolled ? (
              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="px-8 py-3.5 bg-teal-500 hover:bg-teal-600 active:scale-95 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-teal-500/30 transition flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{enrolling ? "Enrolling..." : t('common.enrollNow')}</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to={`/lessons/${course.lessons?.[0]?.id || 1}`}
                  className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Resume First Lesson</span>
                </Link>

                {course.has_quiz && (
                  <Link
                    to={`/quiz/${course.id}`}
                    className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                  >
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>{t('common.startQuiz')}</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Voice Controls for Course Overview */}
      <VoiceControls textToRead={`${course.title}. ${course.description}`} />

      {/* Course Curriculum & Syllabus */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              Module Curriculum & Lessons
            </h2>
            <p className="text-xs text-slate-500">
              {course.lessons?.length || 0} interactive lessons designed with step-by-step guides.
            </p>
          </div>

          {isEnrolled && (
            <span className="text-xs font-bold text-saathi-blue-900 bg-saathi-blue-50 px-3 py-1 rounded-full border border-saathi-blue-200">
              {progress}% Completed
            </span>
          )}
        </div>

        <div className="space-y-3">
          {course.lessons?.map((lesson, idx) => {
            const isDone = completedIds.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                className="bg-white border border-slate-200 hover:border-saathi-blue-300 rounded-2xl p-4 sm:p-5 shadow-sm transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    isDone ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700 group-hover:bg-saathi-blue-50 group-hover:text-saathi-blue-900'
                  }`}>
                    {isDone ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : idx + 1}
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-saathi-blue-900 transition">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {lesson.summary || "Interactive multimedia practical guide."}
                    </p>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{lesson.duration_minutes} mins</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Link
                    to={`/lessons/${lesson.id}`}
                    className="px-4 py-2 bg-saathi-blue-50 hover:bg-saathi-blue-900 text-saathi-blue-900 hover:text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{isDone ? "Review" : t('common.startLesson')}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* QUIZ & CERTIFICATE STATUS CARD */}
      {course.has_quiz && (
        <div className="bg-gradient-to-r from-amber-50 via-teal-50 to-slate-50 border-2 border-amber-200/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest block">
                Official Certification Assessment
              </span>
              <h3 className="font-extrabold text-base text-slate-900">
                {course.quiz_title || "Module Assessment"}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Score {course.quiz_passing_score || 60}% or higher to instantly receive your Digital Saathi verified certificate.
              </p>
            </div>
          </div>

          <Link
            to={`/quiz/${course.id}`}
            className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-xl shadow-md transition text-center whitespace-nowrap"
          >
            {t('common.startQuiz')}
          </Link>
        </div>
      )}

      {/* Learning Materials & Downloads */}
      {course.materials?.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-saathi-blue-900" />
            <span>Downloadable Guides & Visual Materials</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {course.materials.map((mat) => (
              <div key={mat.id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{mat.title}</h4>
                  <p className="text-[11px] text-slate-500">{mat.description || "PDF Summary Cheatsheet"}</p>
                </div>
                <button
                  onClick={() => alert(`Downloading ${mat.title}...`)}
                  className="p-2 text-teal-700 hover:bg-teal-50 rounded-lg transition"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailsPage;
