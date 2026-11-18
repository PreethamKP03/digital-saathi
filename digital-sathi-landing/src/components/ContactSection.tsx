import React, { useState } from 'react';
import { Mail, MapPin, MessageSquare, Send, CheckCircle2, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Government Services');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setTopic('Government Services');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <section id="contact" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF4FF] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#145BFF]">
              <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Help &amp; Support</span>
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0B1B3B] sm:text-4xl">
              Need Guidance? Reach Out to Us
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Have a question about using Digital Sathi, finding a service guide, or suggesting a new
              digital learning topic? Send us a message anytime.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-[#F8FAFF] p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#145BFF]">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0B1B3B]">
                    Support Email (Placeholder)
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-slate-700">
                    support@digitalsathi.example
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-[#F8FAFF] p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#145BFF]">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0B1B3B]">
                    Support Hours
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-slate-700">
                    Monday – Saturday, 9:00 AM – 6:00 PM IST
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-[#F8FAFF] p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#145BFF]">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0B1B3B]">
                    Community Reach
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-slate-700">
                    Built to serve citizens across India online
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Accessible Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft sm:p-9">
              {submitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-[#0B1B3B]">
                    Message Received!
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                    Thank you, <strong>{name}</strong>. Your inquiry regarding{' '}
                    <strong>{topic}</strong> has been recorded. Our support team will review your
                    message shortly.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#145BFF] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0F48D6]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-1.5 block text-xs font-semibold text-[#0B1B3B]"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-[#0B1B3B] outline-none transition focus:border-[#145BFF] focus:bg-white focus:ring-2 focus:ring-[#145BFF]/20"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-1.5 block text-xs font-semibold text-[#0B1B3B]"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-[#0B1B3B] outline-none transition focus:border-[#145BFF] focus:bg-white focus:ring-2 focus:ring-[#145BFF]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-topic"
                      className="mb-1.5 block text-xs font-semibold text-[#0B1B3B]"
                    >
                      Topic
                    </label>
                    <select
                      id="contact-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-[#0B1B3B] outline-none transition focus:border-[#145BFF] focus:bg-white focus:ring-2 focus:ring-[#145BFF]/20"
                    >
                      <option value="Government Services">Government Services Guidance</option>
                      <option value="Digital Learning">Digital Learning Tutorials</option>
                      <option value="Help & Support">Technical Help &amp; Support</option>
                      <option value="Feedback">General Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-xs font-semibold text-[#0B1B3B]"
                    >
                      How can we help you? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your question or the service guide you are looking for..."
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-[#0B1B3B] outline-none transition focus:border-[#145BFF] focus:bg-white focus:ring-2 focus:ring-[#145BFF]/20"
                    />
                  </div>

                  <p className="text-xs text-slate-500">
                    Reminder: Never share your Aadhaar number, OTP, or banking PIN in any support
                    message.
                  </p>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#145BFF] px-6 py-3.5 text-sm font-semibold text-white shadow-blue-glow transition hover:bg-[#0F48D6] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#145BFF] focus:ring-offset-2 sm:w-auto"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
