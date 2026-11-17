import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import CertificateViewer from '../components/CertificateViewer';
import { 
  BookOpen, CheckCircle2, Clock, Award, Play, Sparkles, 
  ShieldCheck, Lock, GraduationCap, ChevronRight, Activity, 
  Flame, TrendingUp, Printer, ArrowRight 
} from 'lucide-react';

const iconBadgeMap = {
  Sparkles,
  Award,
  ShieldCheck,
  Lock,
  GraduationCap
};

const StudentDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);
  const { language, t } = useLanguage();
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.getStudentDashboard();
        if (res.success) {
          setData(res);
        }
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-saathi-blue-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs font-semibold text-slate-500">Loading your learning dashboard...</p>
      </div>
    );
  }

  const summary = data?.summary || {};
  const badges = data?.badges || [];
  const activities = data?.recent_activities || [];
  const progressList = data?.course_progress || [];
  const certificates = data?.certificates || [];
  const nextLesson = summary.next_recommended_lesson;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-saathi-blue-950 via-saathi-blue-900 to-teal-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-400/30">
            <GraduationCap className="w-4 h-4" />
            <span>Learner Profile &bull; {user?.village || "Karnataka Gram"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t('dashboard.welcomeBack')}, {user?.name || "Learner"}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
            {t('dashboard.learnerSubtitle')} You have completed <strong>{summary.completed_courses}</strong> out of {summary.enrolled_courses} enrolled courses.
          </p>
        </div>

        {/* Continue Next Lesson Quick Card */}
        {nextLesson && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 w-full md:w-80 shrink-0 text-left space-y-2">
            <span className="text-[10px] uppercase font-bold text-teal-300 tracking-wider block">
              Up Next For You
            </span>
            <h4 className="font-bold text-sm text-white line-clamp-1">
              {nextLesson.title}
            </h4>
            <p className="text-[11px] text-slate-300 line-clamp-1">
              {nextLesson.course_title}
            </p>
            <Link
              to={`/lessons/${nextLesson.id}`}
              className="mt-2 w-full py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{t('dashboard.continueLesson')}</span>
            </Link>
          </div>
        )}
      </div>

      {/* METRIC KPI STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold text-slate-600">{t('dashboard.enrolledCourses')}</span>
            <BookOpen className="w-5 h-5 text-saathi-blue-700" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {summary.enrolled_courses || 0}
          </p>
          <p className="text-[11px] text-slate-500">
            {summary.ongoing_courses} in progress
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold text-slate-600">{t('dashboard.completedCourses')}</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {summary.completed_courses || 0}
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold">
            {summary.overall_progress_percentage}% Overall Mastery
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold text-slate-600">{t('dashboard.quizAverage')}</span>
            <TrendingUp className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {summary.average_quiz_score || 0}%
          </p>
          <p className="text-[11px] text-slate-500">
            {summary.passed_quizzes} quizzes passed
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold text-slate-600">{t('dashboard.certificatesCount')}</span>
            <Award className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {summary.certificates_earned || 0}
          </p>
          <p className="text-[11px] text-purple-600 font-semibold">
            Verified Credentials
          </p>
        </div>
      </div>

      {/* TWO COLUMN SECTION: COURSE PROGRESS BREAKDOWN & ACHIEVEMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Course Progress Bars */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                {t('dashboard.overallProgress')}
              </h3>
              <p className="text-xs text-slate-500">Real-time status across your registered modules</p>
            </div>
            <Link to="/courses" className="text-xs font-bold text-saathi-blue-900 hover:text-teal-700">
              Browse More →
            </Link>
          </div>

          {progressList.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              You are not enrolled in any courses yet. <Link to="/courses" className="text-saathi-blue-900 underline font-semibold">Browse courses</Link> to begin!
            </div>
          ) : (
            <div className="space-y-4">
              {progressList.map((cp) => (
                <div key={cp.course_id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 line-clamp-1">{cp.course_title}</span>
                    <span className="font-semibold text-slate-600">{cp.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        cp.status === 'completed' ? 'bg-emerald-500' : 'bg-saathi-blue-600'
                      }`}
                      style={{ width: `${cp.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Achievement Badges */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-extrabold text-base text-slate-900">
              {t('dashboard.achievements')}
            </h3>
            <p className="text-xs text-slate-500">Milestones unlocked along your digital journey</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {badges.map((b) => {
              const Icon = iconBadgeMap[b.icon] || Award;
              return (
                <div
                  key={b.id}
                  className={`p-3.5 rounded-2xl border flex items-center gap-3 transition ${
                    b.unlocked 
                      ? 'bg-gradient-to-r from-amber-50/70 to-teal-50/70 border-amber-200 text-slate-900' 
                      : 'bg-slate-50 border-slate-200 opacity-50 text-slate-400'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    b.unlocked ? 'bg-amber-500 text-white shadow-md' : 'bg-slate-200 text-slate-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs">{b.title}</h4>
                      {b.unlocked && (
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                          Unlocked
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{b.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MY CERTIFICATES SECTION */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                Earned Digital Saathi Certificates
              </h3>
              <p className="text-xs text-slate-500">
                Official verified credentials with unique verification codes and QR links.
              </p>
            </div>
          </div>
        </div>

        {certificates.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center space-y-2">
            <Award className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold text-slate-600">
              {t('dashboard.noCertificatesYet')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-gradient-to-br from-amber-50/50 via-white to-purple-50/50 border border-amber-200 rounded-2xl p-5 shadow-sm space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    Verified Award
                  </span>
                  <span className="text-xs font-extrabold text-emerald-700">
                    Score: {cert.score_percentage}%
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1">
                    {cert.course_title}
                  </h4>
                  <p className="text-[10px] font-mono text-slate-400 mt-1">
                    ID: {cert.certificate_code}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="w-full py-2 bg-saathi-blue-900 hover:bg-saathi-blue-950 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>View / Print PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RECENT ACTIVITIES LOG */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Activity className="w-4 h-4 text-saathi-blue-900" />
          <h3 className="font-extrabold text-sm text-slate-900">
            {t('dashboard.recentActivities')}
          </h3>
        </div>

        <div className="space-y-3">
          {activities.length === 0 ? (
            <p className="text-xs text-slate-400">No activity logged yet.</p>
          ) : (
            activities.map((act) => (
              <div key={act.id} className="flex items-start gap-3 text-xs">
                <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                <div>
                  <p className="font-medium text-slate-800">{act.description}</p>
                  <span className="text-[10px] text-slate-400">
                    {new Date(act.created_at).toLocaleDateString()} &bull; {new Date(act.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* CERTIFICATE VIEWER MODAL */}
      {selectedCert && (
        <CertificateViewer
          certificate={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </div>
  );
};

export default StudentDashboard;
