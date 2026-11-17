import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, Search, Filter, Clock, Award, CheckCircle2, 
  ChevronRight, Monitor, Smartphone, Mail, CreditCard, 
  Landmark, ShieldAlert, HeartHandshake, Sparkles 
} from 'lucide-react';

const iconMap = {
  Monitor,
  Smartphone,
  Mail,
  CreditCard,
  Landmark,
  ShieldAlert,
  HeartHandshake,
  BookOpen
};

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const { language, t } = useLanguage();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await api.getCourses({
          lang: language,
          category: selectedCategory,
          difficulty: selectedDifficulty,
          search: searchTerm
        });
        if (res.success && res.courses) {
          setCourses(res.courses);
        }
      } catch (err) {
        console.error("Error loading courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [language, selectedCategory, selectedDifficulty, searchTerm]);

  const categories = ['All', 'Foundations', 'Mobile Essentials', 'Communication', 'Financial Literacy', 'E-Governance', 'Cyber Safety', 'Social Welfare'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saathi-blue-100 text-saathi-blue-900 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Complete Digital Literacy Catalog</span>
        </div>
        <h1 className="text-3xl font-extrabold text-saathi-blue-950 tracking-tight">
          {t('nav.courses')}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Browse all 7 foundational digital literacy modules. Learn at your own pace, take the multiple-choice quizzes, and earn downloadable completion certificates.
        </p>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('common.searchCourses')}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-saathi-blue-600 focus:bg-white transition"
            />
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full md:w-auto px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 outline-none focus:border-saathi-blue-600"
            >
              <option value="All">{t('common.allLevels')}</option>
              <option value="Beginner">{t('common.beginner')}</option>
              <option value="Intermediate">{t('common.intermediate')}</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-saathi-blue-900 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat === 'All' ? t('common.allCategories') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-white rounded-2xl border border-slate-200 p-6 h-64 animate-pulse space-y-4">
              <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="h-3 bg-slate-200 rounded w-full"></div>
              <div className="h-3 bg-slate-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">No courses match your filter</h3>
          <p className="text-xs text-slate-500">Try adjusting your search terms or clearing category filters.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedDifficulty('All'); setSearchTerm(''); }}
            className="px-4 py-2 bg-saathi-blue-900 text-white rounded-xl text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const Icon = iconMap[course.icon] || BookOpen;
            const isEnrolled = course.enrolled;
            const progress = course.progress_percentage || 0;
            const isCompleted = course.status === 'completed' || progress === 100;

            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-saathi-blue-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6 space-y-4">
                  {/* Top tags */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-saathi-blue-50 text-saathi-blue-900 flex items-center justify-center border border-saathi-blue-100 group-hover:scale-105 transition">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {course.difficulty}
                      </span>
                      {isCompleted && (
                        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{t('common.completed')}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider block mb-1">
                      {course.category}
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-saathi-blue-900 transition">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Course stats */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span>{course.lessons_count} {t('common.lessons')}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>~{course.estimated_hours} {t('common.duration')}</span>
                    </span>
                    {course.has_quiz && (
                      <span className="flex items-center gap-1 text-amber-600 font-semibold">
                        <Award className="w-3.5 h-3.5" />
                        <span>Quiz</span>
                      </span>
                    )}
                  </div>

                  {/* Progress Bar for Enrolled Students */}
                  {isAuthenticated && isEnrolled && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isCompleted ? 'bg-emerald-500' : 'bg-saathi-blue-600'
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/courses/${course.id}`}
                    className="w-full py-2.5 px-4 bg-saathi-blue-900 hover:bg-saathi-blue-950 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
                  >
                    <span>{isCompleted ? "Review & Certificate" : isEnrolled ? "Continue Learning" : t('common.viewDetails')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
