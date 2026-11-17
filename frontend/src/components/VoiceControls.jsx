import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Volume2, VolumeX, Pause, Play, Square, Sparkles } from 'lucide-react';

const VoiceControls = ({ textToRead, title = "Voice Learning Assistant" }) => {
  const { 
    language, 
    speak, 
    pauseSpeech, 
    resumeSpeech, 
    stopSpeech, 
    isSpeaking, 
    isPaused, 
    t 
  } = useLanguage();

  const handlePlay = () => {
    if (isPaused) {
      resumeSpeech();
    } else {
      speak(textToRead);
    }
  };

  const getLanguageLabel = () => {
    if (language === 'kn') return 'ಕನ್ನಡ ಧ್ವನಿ (Kannada Voice)';
    if (language === 'hi') return 'हिंदी आवाज (Hindi Voice)';
    return 'English Audio Guide';
  };

  return (
    <div className="bg-gradient-to-r from-saathi-blue-50 via-teal-50 to-emerald-50 border border-teal-200/80 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md transition-all ${
          isSpeaking && !isPaused ? 'bg-teal-600 animate-pulse scale-105' : 'bg-saathi-blue-900'
        }`}>
          {isSpeaking && !isPaused ? <Volume2 className="w-6 h-6 animate-bounce" /> : <Volume2 className="w-6 h-6" />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900">
              {t('common.listenVoice')}
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
              {getLanguageLabel()}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            {language === 'kn' 
              ? 'ಸ್ಪಷ್ಟ ಧ್ವನಿಯಲ್ಲಿ ಪಾಠದ ವಿವರಣೆ ಕೇಳಲು ಪ್ಲೇ ಬಟನ್ ಒತ್ತಿರಿ' 
              : language === 'hi' 
              ? 'स्पष्ट आवाज में पाठ सुनने के लिए प्ले बटन दबाएं' 
              : 'Listen to the full lesson spoken aloud at a gentle, easy pace.'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {(!isSpeaking || isPaused) ? (
          <button
            onClick={handlePlay}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md shadow-teal-700/20 transition active:scale-95"
            title="Play Audio"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isPaused ? 'Resume' : t('common.listenVoice')}</span>
          </button>
        ) : (
          <button
            onClick={pauseSpeech}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-md transition active:scale-95"
            title="Pause Audio"
          >
            <Pause className="w-4 h-4 fill-white" />
            <span>{t('common.pauseVoice')}</span>
          </button>
        )}

        {isSpeaking && (
          <button
            onClick={stopSpeech}
            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold transition active:scale-95"
            title="Stop Audio"
          >
            <Square className="w-3.5 h-3.5 fill-slate-700" />
            <span>{t('common.stopVoice')}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default VoiceControls;
