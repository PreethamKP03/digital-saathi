import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import VoiceControls from '../components/VoiceControls';
import SafeUpiSimulator from '../components/SafeUpiSimulator';
import PhishingDetectorGame from '../components/PhishingDetectorGame';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, Clock, 
  BookOpen, Sparkles, AlertCircle, Award 
} from 'lucide-react';

const LessonPage = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const { language, t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLesson = async () => {
      setLoading(true);
      try {
        const res = await api.getLesson(id, language);
        if (res.success && res.lesson) {
          setLesson(res.lesson);
        }
      } catch (err) {
        console.error("Error loading lesson:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id, language]);

  const handleCompleteAndNext = async () => {
    if (isAuthenticated) {
      setCompleting(true);
      try {
        await api.completeLesson(lesson.id);
      } catch (err) {
        console.error("Complete error:", err);
      } finally {
        setCompleting(false);
      }
    }

    if (lesson.next_lesson_id) {
      navigate(`/lessons/${lesson.next_lesson_id}`);
    } else {
      navigate(`/quiz/${lesson.course_id}`);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-saathi-blue-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs font-semibold text-slate-500">Loading lesson content...</p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-lg font-bold text-slate-800">Lesson not found</h2>
        <Link to="/courses" className="px-4 py-2 bg-saathi-blue-900 text-white rounded-xl text-xs font-semibold">
          Return to Courses
        </Link>
      </div>
    );
  }

  // Render markdown with nice paragraph formatting
  const formattedContent = lesson.content
    .split('\n\n')
    .map((paragraph, idx) => {
      if (paragraph.startsWith('# ')) {
        return <h1 key={idx} className="text-2xl sm:text-3xl font-extrabold text-saathi-blue-950 mt-6 mb-3">{paragraph.replace('# ', '')}</h1>;
      }
      if (paragraph.startsWith('### ')) {
        return <h3 key={idx} className="text-lg sm:text-xl font-bold text-saathi-blue-900 mt-5 mb-2">{paragraph.replace('### ', '')}</h3>;
      }
      if (paragraph.startsWith('> ')) {
        return (
          <blockquote key={idx} className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl my-4 text-xs sm:text-sm text-amber-950 font-medium">
            {paragraph.replace('> ', '')}
          </blockquote>
        );
      }
      return <p key={idx} className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4">{paragraph}</p>;
    });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to={`/courses/${lesson.course_id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-saathi-blue-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {lesson.course_title}</span>
        </Link>

        <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
          Lesson {lesson.order_index} of {lesson.total_lessons}
        </span>
      </div>

      {/* Lesson Header */}
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800">
            {lesson.course_title}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{lesson.duration_minutes} minutes</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-saathi-blue-950 tracking-tight">
          {lesson.title}
        </h1>

        {lesson.summary && (
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            {lesson.summary}
          </p>
        )}
      </div>

      {/* Voice Controls (Browser Text-To-Speech) */}
      <VoiceControls textToRead={`${lesson.title}. ${lesson.summary || ''}. ${lesson.content}`} />

      {/* Practical Action Simulation Widget (if any) */}
      {lesson.practical_action_type === 'upi_simulation' && (
        <div className="my-8">
          <div className="bg-teal-50 border-l-4 border-teal-600 p-4 rounded-r-2xl mb-4">
            <h4 className="font-extrabold text-teal-900 text-sm">
              Hands-On Practical Lab: Safe UPI Sandbox
            </h4>
            <p className="text-xs text-teal-800 mt-1">
              Practice scanning QR codes and entering PINs safely in this simulation before handling real bank apps.
            </p>
          </div>
          <SafeUpiSimulator />
        </div>
      )}

      {lesson.practical_action_type === 'phishing_detector' && (
        <div className="my-8">
          <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded-r-2xl mb-4">
            <h4 className="font-extrabold text-amber-900 text-sm">
              Hands-On Practical Lab: Scam Spotter Practice
            </h4>
            <p className="text-xs text-amber-800 mt-1">
              Test your ability to spot fake lottery and electricity disconnection messages in real-life scenarios.
            </p>
          </div>
          <PhishingDetectorGame />
        </div>
      )}

      {/* Main Formatted Lesson Content */}
      <article className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm prose prose-slate max-w-none">
        {formattedContent}
      </article>

      {/* Bottom Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
        {lesson.prev_lesson_id ? (
          <Link
            to={`/lessons/${lesson.prev_lesson_id}`}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('common.previous')}</span>
          </Link>
        ) : (
          <div></div>
        )}

        <button
          onClick={handleCompleteAndNext}
          disabled={completing}
          className="flex items-center gap-2 px-6 py-3 bg-saathi-blue-900 hover:bg-saathi-blue-950 text-white rounded-xl text-xs font-bold shadow-md shadow-saathi-blue-900/20 transition active:scale-95"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>
            {completing
              ? "Updating Progress..."
              : lesson.next_lesson_id
              ? t('common.markCompleted')
              : "Complete & Take Assessment"}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default LessonPage;
