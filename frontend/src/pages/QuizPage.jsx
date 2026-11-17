import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import CertificateViewer from '../components/CertificateViewer';
import confetti from 'canvas-confetti';
import { 
  Award, CheckCircle2, XCircle, ArrowLeft, RotateCcw, 
  HelpCircle, Sparkles, Clock, AlertTriangle, Download 
} from 'lucide-react';

const QuizPage = () => {
  const { courseId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  const { language, t } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      try {
        const res = await api.getQuizForCourse(courseId, language);
        if (res.success && res.quiz) {
          setQuiz(res.quiz);
        }
      } catch (err) {
        console.error("Error loading quiz:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [courseId, language]);

  const handleSelectOption = (questionId, optionKey) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.submitQuiz(quiz.id, answers, language);
      if (res.success) {
        setResult(res);

        if (res.passed) {
          // Trigger celebratory confetti
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });

          // Fetch or prepare certificate
          if (res.certificate_code) {
            setCertificateData({
              certificate_code: res.certificate_code,
              learner_name: user?.name || "Valued Rural Citizen",
              course_title: quiz.title,
              score_percentage: res.score_percentage,
              issue_date: new Date().toISOString()
            });
          }
        }
      }
    } catch (err) {
      console.error("Quiz submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setResult(null);
    setShowCertificate(false);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-saathi-blue-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs font-semibold text-slate-500">Preparing assessment questions...</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-lg font-bold text-slate-800">Quiz not available</h2>
        <Link to={`/courses/${courseId}`} className="px-4 py-2 bg-saathi-blue-900 text-white rounded-xl text-xs font-semibold">
          Return to Course
        </Link>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = quiz.questions?.length || 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top back link */}
      <Link
        to={`/courses/${courseId}`}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-saathi-blue-900 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Course Overview</span>
      </Link>

      {/* Quiz Header */}
      <div className="bg-gradient-to-br from-saathi-blue-950 via-saathi-blue-900 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
            <Award className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">
              Digital Literacy Assessment
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {quiz.title}
            </h1>
            <p className="text-xs text-slate-200">
              Passing criteria: {quiz.passing_score}% &bull; {totalQuestions} Multiple Choice Questions
            </p>
          </div>
        </div>

        <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-2 text-center text-xs">
          <p className="text-slate-300">Answered</p>
          <p className="text-lg font-extrabold text-amber-300">
            {answeredCount} / {totalQuestions}
          </p>
        </div>
      </div>

      {/* QUIZ SUBMITTED RESULTS MODAL / SUMMARY */}
      {result && (
        <div className={`p-6 sm:p-8 rounded-3xl border-2 shadow-xl space-y-6 animate-in zoom-in-95 ${
          result.passed 
            ? 'bg-emerald-50/70 border-emerald-400 text-emerald-950' 
            : 'bg-amber-50/70 border-amber-400 text-amber-950'
        }`}>
          <div className="text-center space-y-2">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-inner ${
              result.passed ? 'bg-emerald-200 text-emerald-700' : 'bg-amber-200 text-amber-700'
            }`}>
              {result.passed ? <CheckCircle2 className="w-10 h-10" /> : <AlertTriangle className="w-10 h-10" />}
            </div>

            <h2 className="text-2xl font-extrabold">
              {result.passed ? "Congratulations! Assessment Passed!" : "Assessment Incomplete"}
            </h2>

            <div className="text-sm font-semibold">
              <span>Your Score: </span>
              <strong className="text-lg underline decoration-2">{result.score_percentage}%</strong>
              <span className="text-slate-500 font-normal"> ({result.correct_answers} of {result.total_questions} correct)</span>
            </div>
          </div>

          {/* Improvement Tips */}
          {result.improvement_tips?.length > 0 && (
            <div className="bg-white/80 border border-slate-200 rounded-2xl p-4 space-y-1.5 text-xs text-slate-700">
              <span className="font-bold uppercase tracking-wider text-[11px] text-slate-500 block">
                Guidance & Next Steps:
              </span>
              <ul className="list-disc pl-5 space-y-1">
                {result.improvement_tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {result.passed && certificateData && (
              <button
                onClick={() => setShowCertificate(true)}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>{t('common.viewCert')}</span>
              </button>
            )}

            <button
              onClick={handleRetake}
              className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t('common.retakeQuiz')}</span>
            </button>

            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-5 py-3 bg-saathi-blue-900 hover:bg-saathi-blue-950 text-white font-bold text-xs rounded-xl transition text-center"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      )}

      {/* QUESTIONS LIST */}
      <div className="space-y-6">
        {quiz.questions?.map((q, idx) => {
          const selected = answers[q.id];
          const feedback = result?.feedback?.find(f => f.question_id === q.id);

          return (
            <div
              key={q.id}
              className={`bg-white border-2 rounded-3xl p-6 shadow-sm transition space-y-4 ${
                feedback 
                  ? feedback.is_correct ? 'border-emerald-300 bg-emerald-50/20' : 'border-red-300 bg-red-50/20'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-xl bg-saathi-blue-100 text-saathi-blue-900 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    {q.question}
                  </h3>
                </div>
              </div>

              {/* 4 Options Grid */}
              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {q.options?.map((opt) => {
                  const isChecked = selected === opt.key;
                  let optStyle = "border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-800";

                  if (feedback) {
                    if (opt.key === feedback.correct_option) {
                      optStyle = "border-emerald-500 bg-emerald-100 text-emerald-950 font-bold";
                    } else if (isChecked && !feedback.is_correct) {
                      optStyle = "border-red-500 bg-red-100 text-red-950 font-medium";
                    }
                  } else if (isChecked) {
                    optStyle = "border-saathi-blue-600 bg-saathi-blue-50 text-saathi-blue-950 font-semibold shadow-sm";
                  }

                  return (
                    <label
                      key={opt.key}
                      onClick={() => !result && handleSelectOption(q.id, opt.key)}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 cursor-pointer transition ${optStyle}`}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={opt.key}
                        checked={isChecked}
                        onChange={() => {}}
                        disabled={!!result}
                        className="w-4 h-4 text-saathi-blue-600 border-slate-300 focus:ring-saathi-blue-500"
                      />
                      <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs font-bold shrink-0">
                        {opt.key}
                      </span>
                      <span className="text-xs">{opt.text}</span>
                    </label>
                  );
                })}
              </div>

              {/* Post-submission explanation */}
              {feedback && (
                <div className={`p-3.5 rounded-xl border text-xs leading-relaxed flex items-start gap-2 ${
                  feedback.is_correct ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'
                }`}>
                  {feedback.is_correct ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold block mb-0.5">
                      {feedback.is_correct ? "Correct!" : `Incorrect. The correct answer was (${feedback.correct_option}).`}
                    </span>
                    <p>{feedback.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Action */}
      {!result && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Ensure all {totalQuestions} questions have an option selected before submitting.
          </p>

          <button
            onClick={handleSubmit}
            disabled={submitting || answeredCount < totalQuestions}
            className="w-full sm:w-auto px-8 py-3.5 bg-saathi-blue-900 hover:bg-saathi-blue-950 disabled:bg-slate-200 text-white disabled:text-slate-400 font-extrabold text-xs rounded-xl shadow-md transition active:scale-95"
          >
            {submitting ? "Grading Assessment..." : t('common.submit')}
          </button>
        </div>
      )}

      {/* CERTIFICATE VIEWER MODAL */}
      {showCertificate && certificateData && (
        <CertificateViewer
          certificate={certificateData}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
};

export default QuizPage;
