import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Award, CheckCircle2, XCircle, Search, ShieldCheck, ArrowLeft, Calendar, User } from 'lucide-react';

const CertificateVerifyPage = () => {
  const { code } = useParams();
  const [searchCode, setSearchCode] = useState(code || '');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const verify = async (codeToVerify) => {
    if (!codeToVerify.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await api.verifyCertificate(codeToVerify.trim());
      setResult(res);
    } catch (err) {
      setResult({ success: false, is_valid: false, message: 'Certificate verification failed' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (code) {
      verify(code);
    }
  }, [code]);

  const handleSubmit = (e) => {
    e.preventDefault();
    verify(searchCode);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-saathi-blue-900 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>

      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-saathi-blue-900 to-purple-600 flex items-center justify-center text-white mx-auto shadow-md">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-saathi-blue-950">
          Digital Saathi Certificate Verification
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Verify the authenticity and validity of any Digital Saathi course completion certificate.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm flex items-center gap-2">
        <input
          type="text"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          placeholder="Enter Certificate Code (e.g. DS-2024-C1-U3-A8F29D)"
          className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-saathi-blue-600 focus:bg-white uppercase font-mono tracking-wider"
        />
        <button
          type="submit"
          disabled={loading || !searchCode.trim()}
          className="px-6 py-2.5 bg-saathi-blue-900 hover:bg-saathi-blue-950 disabled:bg-slate-200 text-white font-bold text-xs rounded-xl shadow-md transition"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      {/* Verification Result */}
      {searched && !loading && (
        <div className="animate-in zoom-in-95">
          {result?.is_valid ? (
            <div className="bg-white border-2 border-emerald-400 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Official Authentic Credential
                  </span>
                  <h3 className="font-extrabold text-lg text-slate-900 mt-1">
                    Valid Certificate Verified
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-3.5 rounded-2xl space-y-1">
                  <span className="text-slate-400 font-semibold block text-[10px]">LEARNER NAME</span>
                  <p className="font-extrabold text-sm text-slate-900">{result.certificate.learner_name}</p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl space-y-1">
                  <span className="text-slate-400 font-semibold block text-[10px]">COURSE COMPLETED</span>
                  <p className="font-extrabold text-sm text-teal-800">{result.certificate.course_title}</p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl space-y-1">
                  <span className="text-slate-400 font-semibold block text-[10px]">ASSESSMENT SCORE</span>
                  <p className="font-extrabold text-sm text-emerald-700">{result.certificate.score_percentage}% (Passed)</p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl space-y-1">
                  <span className="text-slate-400 font-semibold block text-[10px]">ISSUE DATE</span>
                  <p className="font-extrabold text-sm text-slate-800">{result.certificate.issue_date}</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-[11px] text-slate-500 space-y-1">
                <p><strong>Issuer:</strong> {result.certificate.issuer}</p>
                <p><strong>Verification Code:</strong> <span className="font-mono">{result.certificate.certificate_code}</span></p>
                <p><strong>Verified At:</strong> {result.certificate.verified_at}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white border-2 border-red-300 rounded-3xl p-8 text-center space-y-3 shadow-md">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
                <XCircle className="w-7 h-7" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">
                Invalid or Unrecognized Certificate
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No certificate record was found matching code: <strong className="font-mono text-red-600">{searchCode}</strong>. Please verify the code on your printed document.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CertificateVerifyPage;
