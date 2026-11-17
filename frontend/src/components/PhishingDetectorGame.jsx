import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle, RotateCcw, AlertTriangle } from 'lucide-react';

const SCENARIOS = [
  {
    id: 1,
    sender: "BZ-KBCPRZ",
    message: "Dear customer, Congratulation! Your SIM number has won ₹25,00,000 in KBC Lucky Draw 2026. To claim cash, call WhatsApp Manager Rana Pratap on 98450-XXXXX. Fee ₹5,000 required.",
    isScam: true,
    reason: "Classic Lottery Scam! Legitimate lotteries never demand an advance 'processing fee'. You cannot win a lottery you never entered."
  },
  {
    id: 2,
    sender: "VK-PMKSAN",
    message: "PM-KISAN: 17th installment of ₹2,000 has been credited to your Aadhaar-linked bank account on 15/10/2026. Check status at official portal https://pmkisan.gov.in.",
    isScam: false,
    reason: "Legitimate! Uses official sender ID prefix and points directly to the authentic '.gov.in' domain without asking for PIN or OTP."
  },
  {
    id: 3,
    sender: "+91 97412 88990 (Unknown)",
    message: "URGENT: Your electricity power will be DISCONNECTED tonight at 9:30 PM from the power station because last month bill was not updated. Call electricity officer immediately at 97412-88990.",
    isScam: true,
    reason: "Electricity Disconnection Phishing! Power boards (BESCOM, HESCOM, etc.) never send threats from personal 10-digit mobile numbers or ask you to install apps."
  },
  {
    id: 4,
    sender: "AX-HDFCBK",
    message: "Dear Customer, do not share OTP 849201 with ANYONE. Bank never calls to ask for OTP. OTP for transaction of INR 350.00 at Jan Aushadhi Kendra.",
    isScam: false,
    reason: "Legitimate bank notification! Notice how it explicitly warns: 'Bank never calls to ask for OTP'."
  }
];

const PhishingDetectorGame = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [userChoice, setUserChoice] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const current = SCENARIOS[currentIndex];

  const handleAnswer = (choice) => {
    if (answered) return;
    setUserChoice(choice);
    setAnswered(true);

    const isCorrect = choice === current.isScam;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < SCENARIOS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setAnswered(false);
      setUserChoice(null);
    } else {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setUserChoice(null);
    setGameOver(false);
  };

  return (
    <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 shadow-xl max-w-xl mx-auto my-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
              Scam Spotter Simulator
            </span>
            <h4 className="font-extrabold text-slate-900 text-sm">
              Spot the Fake Message Game
            </h4>
          </div>
        </div>

        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
          Case {currentIndex + 1} of {SCENARIOS.length}
        </span>
      </div>

      {!gameOver ? (
        <div className="space-y-4">
          {/* Mock SMS Card */}
          <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl shadow-inner space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-1.5">
              <span>SMS from: <strong className="text-slate-200">{current.sender}</strong></span>
              <span>Today 10:45 AM</span>
            </div>
            <p className="text-xs leading-relaxed font-sans text-slate-200">
              "{current.message}"
            </p>
          </div>

          <p className="text-xs font-bold text-center text-slate-700">
            Is this SMS a Scam / Fraud or Legitimate?
          </p>

          {/* Action Buttons */}
          {!answered ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleAnswer(true)}
                className="py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-red-600/20 transition active:scale-95"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>🚨 FAKE SCAM / PHISHING</span>
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition active:scale-95"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>✅ GENUINE / SAFE</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3 animate-in zoom-in-95">
              <div className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                userChoice === current.isScam 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                  : 'bg-red-50 border-red-300 text-red-900'
              }`}>
                {userChoice === current.isScam ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <div className="text-xs space-y-1">
                  <p className="font-extrabold">
                    {userChoice === current.isScam ? "CORRECT! Great eye!" : "INCORRECT! Be careful!"}
                  </p>
                  <p className="leading-relaxed">{current.reason}</p>
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition"
              >
                {currentIndex < SCENARIOS.length - 1 ? "Next Message →" : "View Final Score"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h4 className="font-extrabold text-xl text-slate-900">
              Training Complete!
            </h4>
            <p className="text-sm font-bold text-amber-700">
              Score: {score} out of {SCENARIOS.length} Correct
            </p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You are now better equipped to safeguard your family and friends in your village from cyber criminals!
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-saathi-blue-900 hover:bg-saathi-blue-950 text-white font-bold rounded-xl text-xs mx-auto transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Play Again</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PhishingDetectorGame;
