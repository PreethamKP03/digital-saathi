import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  Users, BookOpen, Award, CheckCircle2, Plus, Upload, 
  MapPin, Calendar, FileText, Search, TrendingUp, Filter 
} from 'lucide-react';

const TrainerDashboard = () => {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const [overview, setOverview] = useState(null);
  const [students, setStudents] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [programForm, setProgramForm] = useState({
    title: '',
    target_group: 'Farmers',
    location: '',
    max_participants: 50,
    description: ''
  });

  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [materialForm, setMaterialForm] = useState({
    course_id: 1,
    title: '',
    material_type: 'guide',
    file_url: 'https://example.com/guide.pdf',
    description: ''
  });

  const fetchData = async () => {
    try {
      const [overRes, stuRes, progRes] = await Promise.all([
        api.getTrainerOverview(),
        api.getTrainerStudents(),
        api.getTrainingPrograms()
      ]);

      if (overRes.success) setOverview(overRes.stats);
      if (stuRes.success) setStudents(stuRes.students);
      if (progRes.success) setPrograms(progRes.programs);
    } catch (err) {
      console.error("Trainer load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateProgram = async (e) => {
    e.preventDefault();
    try {
      const res = await api.createTrainingProgram(programForm);
      if (res.success) {
        setShowProgramModal(false);
        setProgramForm({ title: '', target_group: 'Farmers', location: '', max_participants: 50, description: '' });
        fetchData();
      }
    } catch (err) {
      console.error("Program creation error:", err);
    }
  };

  const handleUploadMaterial = async (e) => {
    e.preventDefault();
    try {
      const res = await api.uploadMaterial(materialForm);
      if (res.success) {
        setShowMaterialModal(false);
        setMaterialForm({ course_id: 1, title: '', material_type: 'guide', file_url: '', description: '' });
        alert("Learning material uploaded successfully!");
      }
    } catch (err) {
      console.error("Material upload error:", err);
    }
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.village?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs font-semibold text-slate-500">Loading Trainer Hub & Student Analytics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-saathi-blue-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3">
          <span className="bg-teal-500/20 text-teal-200 border border-teal-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Village Trainer Dashboard & Student Monitoring
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome, {user?.name || "Trainer"}
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 max-w-xl">
            {user?.trainer_profile?.organization || "Digital Literacy Mission"} &bull; {user?.trainer_profile?.assigned_region || "Rural Training Hub"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowProgramModal(true)}
            className="px-4 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Camp</span>
          </button>

          <button
            onClick={() => setShowMaterialModal(true)}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Guide</span>
          </button>
        </div>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold text-slate-600">Registered Learners</span>
            <Users className="w-5 h-5 text-teal-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {overview?.platform_students || students.length}
          </p>
          <p className="text-[11px] text-slate-500">Across village centers</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold text-slate-600">Total Enrollments</span>
            <BookOpen className="w-5 h-5 text-saathi-blue-700" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {overview?.total_students_enrolled || 0}
          </p>
          <p className="text-[11px] text-teal-600 font-semibold">Active modules</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold text-slate-600">Course Completions</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {overview?.total_course_completions || 0}
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold">Graduates</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold text-slate-600">Average Quiz Score</span>
            <TrendingUp className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {overview?.average_quiz_score || 0}%
          </p>
          <p className="text-[11px] text-slate-500">Mastery benchmark</p>
        </div>
      </div>

      {/* STUDENT PERFORMANCE & ENROLLMENT TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">
              Registered Village Learners & Performance Tracker
            </h3>
            <p className="text-xs text-slate-500">
              Track real student progress, quiz scores, and village origin.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, village..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-teal-600"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Learner Name</th>
                <th className="py-3 px-4">Village / Location</th>
                <th className="py-3 px-4">Enrolled Modules</th>
                <th className="py-3 px-4">Completed</th>
                <th className="py-3 px-4">Avg Quiz Score</th>
                <th className="py-3 px-4">Language</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-400">
                    No learners found matching search.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {st.name}
                      <span className="block text-[10px] text-slate-400 font-normal">{st.email}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {st.village ? `${st.village}, ${st.district}` : 'Karnataka Gram'}
                    </td>
                    <td className="py-3 px-4 font-semibold text-saathi-blue-900">
                      {st.enrolled_courses_count}
                    </td>
                    <td className="py-3 px-4 font-semibold text-emerald-700">
                      {st.completed_courses_count}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800">
                      {st.average_quiz_score}%
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 uppercase">
                        {st.preferred_language}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* COMMUNITY TRAINING PROGRAMS SECTION */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">
              Gram Panchayat & Community Literacy Drives
            </h3>
            <p className="text-xs text-slate-500">
              Scheduled offline and online training workshops for farmers, self-help groups, and seniors.
            </p>
          </div>

          <button
            onClick={() => setShowProgramModal(true)}
            className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Drive</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((prog) => (
            <div key={prog.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                  {prog.target_group}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                  prog.status === 'ongoing' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {prog.status}
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-sm text-slate-900">{prog.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{prog.description}</p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{prog.location || "Panchayat Hall"}</span>
                </span>
                <span>Max: {prog.max_participants} Participants</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SCHEDULE PROGRAM MODAL */}
      {showProgramModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-extrabold text-base text-slate-900">Schedule Literacy Drive</h3>
            <form onSubmit={handleCreateProgram} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Drive / Workshop Title</label>
                <input
                  type="text"
                  required
                  value={programForm.title}
                  onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })}
                  placeholder="e.g. Gram Panchayat Safe UPI Camp"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Target Community</label>
                <select
                  value={programForm.target_group}
                  onChange={(e) => setProgramForm({ ...programForm, target_group: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-teal-600"
                >
                  <option value="Farmers">Farmers (ರೈತರು)</option>
                  <option value="Rural Women (SHG)">Rural Women (SHG)</option>
                  <option value="Village Elders">Village Elders (ಹಿರಿಯರು)</option>
                  <option value="Youth & Students">Youth & Students</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Village / Location</label>
                <input
                  type="text"
                  required
                  value={programForm.location}
                  onChange={(e) => setProgramForm({ ...programForm, location: e.target.value })}
                  placeholder="e.g. Koppa Panchayat Hall"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description & Goals</label>
                <textarea
                  rows="3"
                  value={programForm.description}
                  onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                  placeholder="Hands-on workshop details..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-teal-600"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProgramModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-md"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPLOAD MATERIAL MODAL */}
      {showMaterialModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-extrabold text-base text-slate-900">Upload Learning Material</h3>
            <form onSubmit={handleUploadMaterial} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Material Title</label>
                <input
                  type="text"
                  required
                  value={materialForm.title}
                  onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })}
                  placeholder="e.g. UPI Safety Quick Handbook"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Material Type</label>
                <select
                  value={materialForm.material_type}
                  onChange={(e) => setMaterialForm({ ...materialForm, material_type: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                >
                  <option value="guide">PDF Guide</option>
                  <option value="infographic">Visual Infographic</option>
                  <option value="cheatsheet">Summary Cheatsheet</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows="2"
                  value={materialForm.description}
                  onChange={(e) => setMaterialForm({ ...materialForm, description: e.target.value })}
                  placeholder="Short explanation for learners"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMaterialModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-saathi-blue-900 hover:bg-saathi-blue-950 text-white rounded-xl font-bold shadow-md"
                >
                  Publish Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerDashboard;
