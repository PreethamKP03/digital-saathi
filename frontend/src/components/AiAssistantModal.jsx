import React, { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { 
  Bot, MessageSquare, X, Send, Sparkles, Volume2, 
  Trash2, HelpCircle, CheckCircle2, AlertCircle 
} from 'lucide-react';

const AiAssistantModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [quickPrompts, setQuickPrompts] = useState([]);
  const { language, speak, t } = useLanguage();
  const messagesEndRef = useRef(null);

  // Load quick prompts when language changes
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const res = await api.getAiQuickPrompts(language);
        if (res.success && res.prompts) {
          setQuickPrompts(res.prompts);
        }
      } catch (err) {
        console.error("Error loading prompts:", err);
      }
    };
    fetchPrompts();
  }, [language]);

  // Initial welcome message in active language
  useEffect(() => {
    let welcome = "Hello! I am your Digital Saathi Assistant. You can ask me any question about Computer Basics, Smartphone usage, UPI Digital Payments, Cyber Safety, or Government Schemes!";
    if (language === 'kn') {
      welcome = "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಸಾಥಿ ಸಹಾಯಕ. ಕಂಪ್ಯೂಟರ್, ಸ್ಮಾರ್ಟ್‌ಫೋನ್, ಯುಪಿಐ ಪಾವತಿ, ಸೈಬರ್ ಸುರಕ್ಷತೆ ಅಥವಾ ಆನ್‌ಲೈನ್ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಕುರಿತು ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ!";
    } else if (language === 'hi') {
      welcome = "नमस्ते! मैं आपका डिजिटल साथी सहायक हूँ। आप कंप्यूटर, स्मार्टफोन, सुरक्षित यूपीआई, साइबर सुरक्षा या सरकारी योजनाओं के बारे में कोई भी सवाल पूछ सकते हैं!";
    }

    setMessages([
      {
        id: 'initial',
        sender: 'bot',
        text: welcome,
        source: 'system'
      }
    ]);
  }, [language]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend = null) => {
    const message = (textToSend || inputText).trim();
    if (!message || loading) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: message
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const res = await api.sendAiMessage(message, language);
      if (res.success && res.reply) {
        const botMsg = {
          id: Date.now() + 1,
          sender: 'bot',
          text: res.reply,
          source: res.source
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            text: language === 'kn' ? "ಕ್ಷಮಿಸಿ, ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ." : "Sorry, I could not process your query right now. Please try again.",
            source: 'error'
          }
        ]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: "Service temporarily unavailable. Please check your network connection.",
          source: 'error'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages(messages.slice(0, 1));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-saathi-blue-900 to-teal-700 hover:from-saathi-blue-950 hover:to-teal-800 text-white rounded-full shadow-2xl shadow-saathi-blue-900/40 hover:scale-105 transition-all duration-300 focus:outline-none"
          title="Digital Saathi Assistant / AI ಸಹಾಯಕ"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold leading-tight">Digital Saathi AI</p>
            <p className="text-[10px] text-teal-200">
              {language === 'kn' ? 'ಪ್ರಶ್ನೆ ಕೇಳಿ' : language === 'hi' ? 'सवाल पूछें' : 'Ask Question'}
            </p>
          </div>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-teal-500"></span>
          </span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-saathi-blue-950 via-saathi-blue-900 to-teal-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                <Bot className="w-5 h-5 text-teal-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                  <span>Digital Saathi AI</span>
                  <span className="text-[9px] bg-teal-500/30 text-teal-200 border border-teal-400/40 px-1.5 py-0.2 rounded font-semibold uppercase">
                    Rural Guide
                  </span>
                </h3>
                <p className="text-[11px] text-slate-300">
                  {language === 'kn' ? 'ಕಂಪ್ಯೂಟರ್ ಮತ್ತು ಮೊಬೈಲ್ ಸಹಾಯಕ' : language === 'hi' ? 'कंप्यूटर व मोबाइल सहायक' : 'Always here to guide you safely'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition"
                title="Clear Chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="bg-slate-50 border-b border-slate-200 p-2.5 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              {t('common.quickQuestions')}:
            </span>
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(prompt)}
                className="inline-block text-[11px] bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200 hover:border-teal-300 px-2.5 py-1 rounded-full transition shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-saathi-blue-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-teal-300" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-saathi-blue-900 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Read aloud button for bot responses */}
                  {msg.sender === 'bot' && (
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 italic">
                        {msg.source === 'gemini_ai' ? 'Powered by AI' : 'Verified Knowledge Base'}
                      </span>
                      <button
                        onClick={() => speak(msg.text)}
                        className="flex items-center gap-1 text-[11px] text-teal-700 hover:text-teal-900 font-semibold"
                        title="Listen to this explanation"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{language === 'kn' ? 'ಕೇಳಿ' : language === 'hi' ? 'सुनें' : 'Listen'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-lg bg-saathi-blue-900 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-teal-300 animate-spin" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm rounded-tl-none flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping"></span>
                  <span className="text-xs text-slate-500 font-medium">
                    {language === 'kn' ? 'ಚಿಂತಿಸುತ್ತಿದೆ...' : language === 'hi' ? 'सोच रहा है...' : 'Digital Saathi is thinking...'}
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('common.askQuestion')}
              className="flex-1 text-xs bg-slate-100 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-teal-500 rounded-xl px-3.5 py-2.5 outline-none transition"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || loading}
              className="p-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 text-white disabled:text-slate-400 rounded-xl transition shadow-md shadow-teal-700/20 disabled:shadow-none"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AiAssistantModal;
