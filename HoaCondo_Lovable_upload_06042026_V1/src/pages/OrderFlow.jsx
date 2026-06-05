import React, { useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { isBuyerProtectionVisible, PRICE as BP_PRICE } from '../lib/negotiationCoach.js';
import { isTestMode } from '../lib/testModeEngine.js';

const STEPS = ['Who are you?', 'Property Details', 'Add-Ons', 'Review & Pay'];

export default function OrderFlow() {
  const [step, setStep] = useState(0);
  const [userType, setUserType] = useState('');
  const [address, setAddress] = useState('');
  const [buyerProtection, setBuyerProtection] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const testMode = false; // isTestMode() - check URL param

  const showBP = isBuyerProtectionVisible(userType);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) return (
    <div><Nav />
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-4">✅</div>
      <h1 className="text-2xl font-bold mb-3">Order Confirmed!</h1>
      <p className="text-gray-600 mb-4">Your HOA analysis for <strong>{address}</strong> has been submitted.</p>
      <p className="text-gray-500 text-sm">You'll receive an email when your report is ready (within 48 hours).</p>
      {buyerProtection && <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700"><strong>Buyer Protection Report</strong> will be delivered privately to your email only. Your agent has not been notified.</div>}
    </div>
    <Footer /></div>
  );

  return (
    <div><Nav />
    <div className="max-w-2xl mx-auto px-4 py-12">
      {testMode && <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-6 text-center text-sm font-bold text-red-700">TEST MODE — Orders will not be charged</div>}
      <div className="flex gap-2 mb-8">
        {STEPS.map((s, i) => <div key={i} className={`flex-1 text-center text-xs py-2 rounded-full font-medium ${i <= step ? 'text-white' : 'bg-gray-100 text-gray-400'}`} style={i <= step ? { background: 'var(--navy)' } : {}}>{s}</div>)}
      </div>

      {step === 0 && (
        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <h2 className="text-xl font-bold mb-4">Who are you?</h2>
          <div className="grid grid-cols-2 gap-3">
            {['buyer', 'current_owner', 'realtor', 'lender', 'title', 'attorney'].map(type => (
              <button key={type} onClick={() => { setUserType(type); setStep(1); }}
                className={`p-4 rounded-xl border-2 text-left capitalize font-medium transition-colors ${userType === type ? 'border-yellow-400' : 'border-gray-200 hover:border-gray-300'}`}>
                {type.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <h2 className="text-xl font-bold mb-4">Property Details</h2>
          <label className="block text-sm font-medium text-gray-700 mb-1">HOA Property Address</label>
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="123 Ocean Dr, Unit 4B, Miami, FL 33101" className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2" style={{ '--tw-ring-color': 'var(--gold)' }} />
          <button onClick={() => setStep(2)} disabled={!address} className="w-full py-3 rounded-xl text-white font-semibold disabled:opacity-40" style={{ background: 'var(--navy)' }}>Continue →</button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <h2 className="text-xl font-bold mb-4">Add-Ons</h2>
          {showBP && (
            <div className={`border-2 rounded-xl p-4 mb-4 cursor-pointer ${buyerProtection ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}`} onClick={() => setBuyerProtection(!buyerProtection)}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">🔒 Buyer Protection Report — ${BP_PRICE}</p>
                  <p className="text-sm text-gray-600 mt-1">Turns every risk flag into a negotiation strategy. Delivered privately to your email only — your agent is not notified.</p>
                </div>
                <input type="checkbox" checked={buyerProtection} onChange={() => {}} className="mt-1 h-4 w-4" />
              </div>
            </div>
          )}
          <div className="border rounded-xl p-4 mb-4 text-sm text-gray-600">
            <p className="font-semibold text-gray-800 mb-1">HOA Monitoring — $49/year</p>
            <p>Annual alerts if your HOA's score drops or a special assessment is detected.</p>
          </div>
          <button onClick={() => setStep(3)} className="w-full py-3 rounded-xl text-white font-semibold" style={{ background: 'var(--navy)' }}>Continue →</button>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <h2 className="text-xl font-bold mb-4">Review & Pay</h2>
          <div className="space-y-2 mb-6 text-sm">
            <div className="flex justify-between"><span>HOA Health Analysis Report</span><span className="font-semibold">$39.00</span></div>
            {buyerProtection && <div className="flex justify-between text-blue-700"><span>Buyer Protection Report (Private)</span><span className="font-semibold">$19.00</span></div>}
            <div className="flex justify-between font-bold text-base border-t pt-2 mt-2"><span>Total</span><span>${buyerProtection ? 58 : 39}.00</span></div>
          </div>
          <p className="text-xs text-gray-400 mb-4">Stripe payment integration — add VITE_STRIPE_PUBLISHABLE_KEY to enable live payments.</p>
          <button onClick={handleSubmit} className="w-full py-3 rounded-xl text-white font-bold text-lg" style={{ background: 'var(--gold)' }}>Complete Order</button>
        </div>
      )}
    </div>
    <Footer /></div>
  );
}
