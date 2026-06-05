import React, { useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { ASSOC_TIERS, REQUIRED_DOCS, getTierForUnits } from '../lib/associationEngine.js';

export default function AssociationPortal() {
  const [units, setUnits] = useState(50);
  const tier = getTierForUnits(units);
  const [step, setStep] = useState('landing');

  return (
    <div><Nav />
    <section className="py-16 px-4" style={{ background: 'var(--navy)' }}>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-4">HOA & Condo Association Portal</h1>
        <p className="text-gray-300 mb-6">Fannie Mae requires Full Review of your financial documents for every condo loan. We make it simple — one portal, all your documents, automated compliance.</p>
      </div>
    </section>
    <section className="py-16 px-4 max-w-5xl mx-auto">
      {step === 'landing' && (
        <>
          <div className="bg-white rounded-2xl p-6 border shadow-sm mb-8">
            <h2 className="font-bold text-xl mb-4">Calculate Your Subscription</h2>
            <div className="flex items-center gap-4 mb-4">
              <label className="text-sm font-medium w-32">Units in HOA:</label>
              <input type="range" min={1} max={2000} value={units} onChange={e => setUnits(parseInt(e.target.value))} className="flex-1" />
              <span className="font-bold w-20 text-right">{units} units</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
              <div><p className="text-sm text-gray-600">Your tier: <strong>{tier.units} units</strong></p><p className="text-3xl font-bold mt-1" style={{ color: 'var(--navy)' }}>${tier.price}<span className="text-sm font-normal text-gray-500">/month</span></p></div>
              <button onClick={() => setStep('signup')} className="px-6 py-3 rounded-xl text-white font-semibold" style={{ background: 'var(--gold)' }}>Get Started</button>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border shadow-sm mb-8">
            <h2 className="font-bold text-xl mb-4">Required Documents (24 types)</h2>
            <div className="grid md:grid-cols-2 gap-2">
              {REQUIRED_DOCS.map((d, i) => <div key={i} className="text-sm text-gray-600 flex gap-2"><span className="text-blue-500">📄</span>{d}</div>)}
            </div>
          </div>
        </>
      )}
      {step === 'signup' && (
        <div className="bg-white rounded-2xl p-8 border shadow-sm max-w-lg mx-auto">
          <h2 className="font-bold text-xl mb-6">Association Enrollment</h2>
          {[{l:'Association Name',p:'Sunset Palms HOA'},{l:'Property Manager Email',p:'manager@yourHOA.com'},{l:'Number of Units',p:'Units in association'},{l:'State',p:'FL'}].map((f, i) => (
            <div key={i} className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">{f.l}</label><input type="text" placeholder={f.p} className="w-full border rounded-lg px-3 py-2 text-sm" /></div>
          ))}
          <button className="w-full py-3 rounded-xl text-white font-semibold" style={{ background: 'var(--navy)' }}>Create Portal Account</button>
          <p className="text-xs text-gray-400 text-center mt-3">Supabase required for live enrollment processing.</p>
        </div>
      )}
    </section>
    <Footer /></div>
  );
}
