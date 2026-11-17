import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('digital_saathi_lang') || 'en';
  });

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('digital_saathi_lang', lang);
    stopSpeech();
  };

  const t = (path) => {
    const keys = path.split('.');
    let current = translations[language] || translations['en'];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English
        let fallback = translations['en'];
        for (const fbKey of keys) {
          if (fallback && fallback[fbKey] !== undefined) {
            fallback = fallback[fbKey];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return current;
  };

  // Browser Text-To-Speech (Web Speech API)
  const speak = (text) => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in this browser. Please use Google Chrome or Edge.");
      return;
    }

    window.speechSynthesis.cancel(); // Stop any ongoing speech

    // Clean markdown hashes/asterisks from text before speaking
    const cleanText = text
      .replace(/#+/g, '')
      .replace(/\*+/g, '')
      .replace(/`/g, '')
      .replace(/>/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.9; // Slightly slower, clear pace for rural learners
    utterance.pitch = 1.0;

    // Pick best voice for language
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = null;

    if (language === 'kn') {
      selectedVoice = voices.find(v => v.lang.includes('kn') || v.lang.includes('kn-IN'));
      utterance.lang = 'kn-IN';
    } else if (language === 'hi') {
      selectedVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('hi-IN'));
      utterance.lang = 'hi-IN';
    } else {
      selectedVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en-US'));
      utterance.lang = 'en-IN';
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const pauseSpeech = () => {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeSpeech = () => {
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

  // Pre-load voices
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      speak,
      pauseSpeech,
      resumeSpeech,
      stopSpeech,
      isSpeaking,
      isPaused
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
