import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { GraduationCap, Lock, Mail, ArrowRight, AlertCircle, Shield, Sparkles } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        if (res.user.role === 'admin') {
          navigate('/admin');
        } else if (res.user.role === 'trainer') {
          navigate('/trainer');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(res.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection error. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-saathi-blue-900 to-teal-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-saathi-blue-900/20">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-saathi-blue-950">
            Welcome to Digital Saathi
          </h1>
          <p className="text-xs text-slate-500">
            Sign in to access your courses, interactive simulations, and certificates.
          </p>
        </div>

        {/* Demo Fast-Login Selector Bar */}
        <div className="bg-gradient-to-r from-saathi-blue-50 to-teal-50 border border-teal-200/80 rounded-2xl p-3.5 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-saathi-blue-950">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>1-Click Academic Demo Credentials:</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickFill('student@digitalsaathi.in', 'Student@123')}
              className="py-1.5 px-2 bg-white hover:bg-saathi-blue-100 text-saathi-blue-900 border border-saathi-blue-200 rounded-lg text-[11px] font-bold shadow-sm transition"
            >
              🎓 Student
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('trainer@digitalsaathi.in', 'Trainer@123')}
              className="py-1.5 px-2 bg-white hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-lg text-[11px] font-bold shadow-sm transition"
            >
              👨‍🏫 Trainer
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('admin@digitalsaathi.in', 'Admin@123')}
              className="py-1.5 px-2 bg-white hover:bg-purple-100 text-purple-800 border border-purple-200 rounded-lg text-[11px] font-bold shadow-sm transition"
            >
              🛡️ Admin
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="youremail@example.com"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-saathi-blue-600 focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-saathi-blue-600 focus:bg-white transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-saathi-blue-900 hover:bg-saathi-blue-950 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-saathi-blue-900/20 transition active:scale-95 flex items-center justify-center gap-2"
          >
            <span>{loading ? "Authenticating..." : t('nav.login')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Register Footer Link */}
        <p className="text-center text-xs text-slate-500">
          New to Digital Saathi?{' '}
          <Link to="/register" className="text-saathi-blue-900 font-bold hover:underline">
            Register as a Learner or Trainer
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
