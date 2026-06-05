import React, { useState } from 'react';
import Nav from '../../components/Nav.jsx';
import Footer from '../../components/Footer.jsx';
export default function LenderDashboard() {
  const [tab, setTab] = useState('overview');
  return (<div><Nav />
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--navy)' }}>Lender Dashboard</h1>
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {['overview','analyses','team','billing'].map(t => <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${tab === t ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500'}`}>{t}</button>)}
      </div>
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        {[{l:'Reports This Month',v:'0'},{l:'Avg Turnaround',v:'—'},{l:'Pass Rate',v:'—'},{l:'Active Users',v:'0'}].map((k,i) => <div key={i} className="bg-white rounded-xl border p-4 shadow-sm"><p className="text-xs text-gray-500">{k.l}</p><p className="text-2xl font-bold mt-1">{k.v}</p></div>)}
      </div>
      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <p className="text-gray-600 text-sm mb-2">Your enterprise lender dashboard — full analyses, Form 1076 auto-fill, LOS integration, team management.</p>
        <p className="text-xs text-amber-700">Connect Supabase and enter API keys to activate live data.</p>
      </div>
    </div><Footer /></div>);
}
