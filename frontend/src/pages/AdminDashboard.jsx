import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Users, Shield, BookOpen, Award, CheckCircle2, TrendingUp, 
  Trash2, Edit, Search, Activity, BarChart2, PieChart, Sparkles 
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    try {
      const [overRes, analRes, usersRes, actRes] = await Promise.all([
        api.getAdminOverview(),
        api.getAdminAnalytics(),
        api.getAdminUsers({ role: roleFilter, search: searchTerm }),
        api.getAdminActivities()
      ]);

      if (overRes.success) setMetrics(overRes.metrics);
      if (analRes.success) setAnalytics(analRes);
      if (usersRes.success) setUsers(usersRes.users);
      if (actRes.success) setActivities(actRes.activities);
    } catch (err) {
      console.error("Admin data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [roleFilter, searchTerm]);

  const handleToggleUserRole = async (targetUser) => {
    const rolesCycle = { 'student': 'trainer', 'trainer': 'admin', 'admin': 'student' };
    const nextRole = rolesCycle[targetUser.role] || 'student';
    
    if (window.confirm(`Change role of ${targetUser.name} to '${nextRole}'?`)) {
      try {
        const res = await api.updateAdminUserRole(targetUser.id, { role: nextRole });
        if (res.success) {
          loadData();
        }
      } catch (err) {
        console.error("Role update error:", err);
      }
    }
  };

  const handleToggleStatus = async (targetUser) => {
    try {
      const res = await api.updateAdminUserRole(targetUser.id, { is_active: !targetUser.is_active });
      if (res.success) {
        loadData();
      }
    } catch (err) {
      console.error("Status toggle error:", err);
    }
  };

  const handleDeleteUser = async (targetUser) => {
    if (window.confirm(`Are you sure you want to permanently delete user: ${targetUser.name}?`)) {
      try {
        const res = await api.deleteAdminUser(targetUser.id);
        if (res.success) {
          loadData();
        }
      } catch (err) {
        console.error("Delete user error:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs font-semibold text-slate-500">Loading Platform Administration Analytics...</p>
      </div>
    );
  }

  const monthlyRegistrations = analytics?.monthly_registrations || [];
  const coursePerformance = analytics?.course_performance || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-950 via-saathi-blue-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Platform Executive Control Panel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Digital Saathi Administration & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Real-time telemetry, learner growth metrics, course completion rates, and user access management.
          </p>
        </div>

        <div className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center text-xs">
          <p className="text-slate-300">Active Learners</p>
          <p className="text-2xl font-extrabold text-amber-300">{metrics?.active_learners || 0}</p>
        </div>
      </div>

      {/* METRIC KPI ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold text-slate-600">Total Users</span>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {metrics?.total_users || 0}
          </p>
          <p className="text-[11px] text-slate-500">
            {metrics?.total_students} students &bull; {metrics?.total_trainers} trainers
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold text-slate-600">Total Courses</span>
            <BookOpen className="w-5 h-5 text-saathi-blue-700" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {metrics?.total_courses || 0}
          </p>
          <p className="text-[11px] text-teal-600 font-semibold">
            {metrics?.total_enrollments} total enrollments
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold text-slate-600">Course Completions</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {metrics?.total_completions || 0}
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold">Graduation Rate</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold text-slate-600">Avg Quiz Score</span>
            <TrendingUp className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {metrics?.average_quiz_score || 0}%
          </p>
          <p className="text-[11px] text-slate-500">
            {metrics?.total_certificates} certs awarded
          </p>
        </div>
      </div>

      {/* INTERACTIVE ANALYTICS CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Monthly User Registrations Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-purple-600" />
                <span>Monthly Registration Statistics</span>
              </h3>
              <p className="text-xs text-slate-500">Growth of rural citizens joining Digital Saathi</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              +142% Growth
            </span>
          </div>

          {/* SVG Bar Chart Visualization */}
          <div className="h-56 flex items-end justify-between gap-4 pt-6 px-2">
            {monthlyRegistrations.map((m, i) => {
              const maxUsers = Math.max(...monthlyRegistrations.map(r => r.users), 20);
              const heightPct = Math.round((m.users / maxUsers) * 100);

              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="text-[10px] font-bold text-purple-700 opacity-0 group-hover:opacity-100 transition">
                    {m.users}
                  </div>
                  <div
                    className="w-full bg-gradient-to-t from-purple-800 to-saathi-blue-500 rounded-xl group-hover:from-purple-700 group-hover:to-teal-400 transition-all duration-500 relative"
                    style={{ height: `${Math.max(heightPct, 15)}%` }}
                  ></div>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {m.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Course-wise Completion Rates */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-teal-600" />
              <span>Course Completion Performance</span>
            </h3>
            <p className="text-xs text-slate-500">Completion rate % by module</p>
          </div>

          <div className="space-y-3.5">
            {coursePerformance.slice(0, 5).map((cp) => (
              <div key={cp.course_id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 line-clamp-1">M{cp.module_number}: {cp.title}</span>
                  <span className="font-extrabold text-teal-700">{cp.completion_rate}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="h-full rounded-full bg-teal-600"
                    style={{ width: `${cp.completion_rate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* USER MANAGEMENT TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">
              User Management & Access Control (RBAC)
            </h3>
            <p className="text-xs text-slate-500">
              Change roles, toggle active status, and manage platform participants.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="trainer">Trainers</option>
              <option value="admin">Admins</option>
            </select>

            {/* Search */}
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search user..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-purple-600"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Joined</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {u.name}
                    <span className="block text-[10px] text-slate-400 font-normal">{u.email}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                      u.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      u.role === 'trainer' ? 'bg-teal-100 text-teal-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {u.village ? `${u.village}, ${u.district}` : 'Karnataka Gram'}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleToggleStatus(u)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition ${
                        u.is_active ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {u.is_active ? 'Active' : 'Suspended'}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-[11px]">
                    {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleToggleUserRole(u)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition"
                      title="Cycle role"
                    >
                      Change Role
                    </button>
                    {u.id !== user?.id && (
                      <button
                        onClick={() => handleDeleteUser(u)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                        title="Delete user"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PLATFORM AUDIT ACTIVITIES */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Activity className="w-4 h-4 text-purple-600" />
          <h3 className="font-extrabold text-sm text-slate-900">
            Platform Activity Audit Log
          </h3>
        </div>

        <div className="space-y-3 max-h-72 overflow-y-auto">
          {activities.map((act) => (
            <div key={act.id} className="flex items-start gap-3 text-xs border-b border-slate-50 pb-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0"></span>
              <div className="flex-1">
                <p className="font-medium text-slate-800">
                  <strong className="text-slate-900">{act.user_name}</strong> ({act.user_role}): {act.description}
                </p>
                <span className="text-[10px] text-slate-400">
                  {new Date(act.created_at).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
