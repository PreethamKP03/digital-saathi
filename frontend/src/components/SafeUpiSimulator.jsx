import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  QrCode, ShieldAlert, CheckCircle2, ArrowRight, RotateCcw, 
  Smartphone, IndianRupee, Store, Lock, AlertTriangle, KeyRound 
} from 'lucide-react';

const SafeUpiSimulator = () => {
  const [step, setStep] = useState('scan'); // 'scan', 'amount', 'pin', 'success', 'fraud_alert'
  const [amount, setAmount] = useState('150');
  const [pin, setPin] = useState('');
  const [scenario, setScenario] = useState('shop'); // 'shop' or 'scam'
  const { language } = useLanguage();

  const handleReset = () => {
    setStep('scan');
    setPin('');
    setAmount('150');
  };

  const handlePinKey = (num) => {
    if (pin.length < 4) {
      setPin(prev => prev + num);
    }
  };

  const handlePinBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleProceedPin = () => {
    if (scenario === 'scam') {
      setStep('fraud_alert');
    } else {
      setStep('success');
    }
  };

  return (
    <div className="bg-white border-2 border-teal-200 rounded-3xl p-6 shadow-xl max-w-xl mx-auto my-6 overflow-hidden">
      {/* Simulation Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-700 flex items-center justify-center">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
              {language === 'kn' ? 'ಪ್ರಾಯೋಗಿಕ ತರಬೇತಿ ಸಿಮ್ಯುಲೇಟರ್' : 'Interactive UPI Sandbox'}
            </span>
            <h3 className="font-extrabold text-slate-900 text-sm">
              Safe UPI Payment Practice (No Real Money)
            </h3>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 bg-slate-100 px-2.5 py-1.5 rounded-lg transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Scenario Switcher */}
      <div className="bg-slate-50 p-2 rounded-xl mb-4 flex items-center justify-between text-xs">
        <span className="font-medium text-slate-600">Choose Practice Mode:</span>
        <div className="flex gap-2">
          <button
            onClick={() => { setScenario('shop'); handleReset(); }}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              scenario === 'shop' ? 'bg-teal-600 text-white shadow-sm' : 'bg-white text-slate-700'
            }`}
          >
            Paying a Village Shop
          </button>
          <button
            onClick={() => { setScenario('scam'); handleReset(); }}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              scenario === 'scam' ? 'bg-amber-600 text-white shadow-sm' : 'bg-white text-slate-700'
            }`}
          >
            "Receive Money" Trap
          </button>
        </div>
      </div>

      {/* STEP 1: SCAN QR CODE */}
      {step === 'scan' && (
        <div className="text-center py-6 space-y-4">
          <div className="w-44 h-44 mx-auto border-4 border-dashed border-teal-500 rounded-3xl p-4 flex flex-col items-center justify-center bg-teal-50/50 relative">
            <QrCode className="w-24 h-24 text-slate-800" />
            <div className="absolute inset-x-4 top-1/2 h-0.5 bg-red-500 shadow-md animate-pulse"></div>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-sm">
              {scenario === 'shop' ? 'Malleshappa General Stores & Fertilizer' : 'Caller: "Claim ₹5,000 Prize!"'}
            </h4>
            <p className="text-xs text-slate-500">
              UPI ID: {scenario === 'shop' ? 'mallesh.groceries@upi' : 'unknown_lottery_claim@fraud'}
            </p>
          </div>

          <button
            onClick={() => setStep('amount')}
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-600/30 text-xs flex items-center justify-center gap-2 transition"
          >
            <QrCode className="w-4 h-4" />
            <span>Scan Simulated QR Code</span>
          </button>
        </div>
      )}

      {/* STEP 2: ENTER AMOUNT */}
      {step === 'amount' && (
        <div className="py-4 space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Store className="w-6 h-6 text-teal-600" />
              <div>
                <p className="text-xs text-slate-500">Paying to</p>
                <p className="font-bold text-sm text-slate-900">
                  {scenario === 'shop' ? 'Malleshappa General Stores' : 'Claim Prize QR'}
                </p>
              </div>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              Verified Merchant
            </span>
          </div>

          <div className="text-center py-4">
            <label className="text-xs text-slate-500 block mb-1">Enter Bill Amount (₹)</label>
            <div className="flex items-center justify-center gap-1 text-3xl font-extrabold text-slate-900">
              <span>₹</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-28 text-center bg-transparent border-b-2 border-teal-500 outline-none pb-1"
              />
            </div>
          </div>

          <button
            onClick={() => setStep('pin')}
            disabled={!amount || Number(amount) <= 0}
            className="w-full py-3 bg-saathi-blue-900 hover:bg-saathi-blue-950 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
          >
            <span>Proceed to Security PIN Keypad</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 3: MOCK BANK PIN KEYPAD */}
      {step === 'pin' && (
        <div className="py-2 space-y-4">
          {/* CRITICAL SECURITY BANNER */}
          <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-3.5 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="text-xs text-red-900 space-y-1">
              <p className="font-extrabold uppercase">
                ⚠️ CRITICAL SECURITY WARNING:
              </p>
              <p>
                You are about to <strong>SEND ₹{amount} OUT OF YOUR BANK ACCOUNT</strong>.
              </p>
              <p className="font-semibold text-red-700">
                You NEVER enter a PIN to receive money! If anyone told you this PIN will credit money to you, STOP NOW!
              </p>
            </div>
          </div>

          {/* PIN Display */}
          <div className="text-center py-2">
            <p className="text-xs text-slate-600 font-medium mb-2">ENTER 4-DIGIT UPI PIN</p>
            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-lg ${
                    pin.length > idx ? 'border-saathi-blue-900 bg-saathi-blue-900 text-white font-bold' : 'border-slate-300'
                  }`}
                >
                  {pin.length > idx ? '●' : ''}
                </div>
              ))}
            </div>
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <button
                key={n}
                onClick={() => handlePinKey(n)}
                className="py-2.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl text-sm font-bold text-slate-800 transition"
              >
                {n}
              </button>
            ))}
            <button
              onClick={handlePinBackspace}
              className="py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-600"
            >
              ⌫ Clear
            </button>
            <button
              onClick={() => handlePinKey(0)}
              className="py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold text-slate-800"
            >
              0
            </button>
            <button
              onClick={handleProceedPin}
              disabled={pin.length < 4}
              className="py-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 text-white disabled:text-slate-400 rounded-xl text-xs font-bold shadow-md transition"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: SUCCESS */}
      {step === 'success' && (
        <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Payment Successful!
            </span>
            <h4 className="text-2xl font-extrabold text-slate-900">
              ₹{amount} Paid
            </h4>
            <p className="text-xs text-slate-500">
              To: Malleshappa General Stores &bull; UPI Ref: 41209384912
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-left text-xs space-y-1">
            <p className="font-semibold text-slate-700">Simulated Bank SMS:</p>
            <p className="text-slate-500 font-mono text-[11px]">
              "Dear Customer, A/C **4321 debited for INR {amount}.00 on 17-Nov-26 via UPI to Malleshappa Stores. Balance: INR 12,450.00."
            </p>
          </div>

          <button
            onClick={handleReset}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition"
          >
            Practice Again
          </button>
        </div>
      )}

      {/* SCAM TRAP CAUGHT ALERT */}
      {step === 'fraud_alert' && (
        <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <AlertTriangle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
              ⚠️ SCAM PREVENTED!
            </span>
            <h4 className="text-lg font-extrabold text-slate-900">
              You Almost Lost ₹{amount}!
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
              In real life, the caller tricked you into scanning a QR code and entering your PIN under the guise of "receiving money".
              <strong> If you had entered your PIN on a real phone, ₹{amount} would have been deducted from YOUR bank account!</strong>
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3 text-xs text-amber-900 font-medium">
            💡 <strong>Remember</strong>: When someone sends you genuine money, it deposits directly into your account automatically. You NEVER scan a QR code or enter your PIN to receive money!
          </div>

          <button
            onClick={handleReset}
            className="w-full py-2.5 bg-saathi-blue-900 text-white font-bold rounded-xl text-xs transition"
          >
            I Understand – Reset Simulator
          </button>
        </div>
      )}
    </div>
  );
};

export default SafeUpiSimulator;
