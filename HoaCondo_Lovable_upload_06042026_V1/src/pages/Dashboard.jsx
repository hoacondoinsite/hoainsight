import React, { useState, useEffect } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import ScoreCard from '../components/ScoreCard.jsx';
import { getMockAnalysis } from '../lib/aiEngine.js';
import { isTestMode } from '../lib/testModeEngine.js';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState('reports');
  const testMode = false;

  const sampleOrder = getMockAnalysis('456 Sample Condo Dr, Boca Raton FL 33432');

  return (
    <div><Nav />
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--navy)' }}>My Dashboard</h1>
        <Link to="/order" className="px-4 py-2 rounded-lg text-white text-sm font-semibold" style={{ background: 'var(--gold)' }}>Order New Report</Link>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[{l:'Reports Ordered',v:'1',s:'Welcome!'},{l:'Analyses Complete',v:'1',s:'View below'},{l:'Active Monitoring',v:'0',s:'Add from report'}].map((k,i) => (
          <div key={i} className="bg-white rounded-xl border p-5 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">{k.l}</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--navy)' }}>{k.v}</p>
            <p className="text-xs text-gray-400 mt-1">{k.s}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-6 border-b border-gray-200">
        {['reports','monitoring','profile'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${tab === t ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>{t}</button>
        ))}
      </div>

      {tab === 'reports' && (
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">{sampleOrder.propertyAddress}</p>
              <p className="text-xs text-gray-400 mt-0.5">Ordered June 4, 2026 · Analysis Complete</p>
            </div>
            <div className="flex items-center gap-4">
              <ScoreCard score={sampleOrder.healthScore} label="" size="sm" />
              <span className={`px-2 py-1 rounded text-xs font-bold ${sampleOrder.fannieMaeStatus === 'PASS' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{sampleOrder.fannieMaeStatus}</span>
            </div>
          </div>
          <div className="px-5 py-3 flex gap-3">
            <Link to="/sample-report" className="text-sm font-medium" style={{ color: 'var(--gold)' }}>View Full Report →</Link>
          </div>
        </div>
      )}
      {tab === 'monitoring' && (
        <div className="bg-gray-50 rounded-xl border p-8 text-center">
          <p className="text-gray-500 text-sm mb-3">No monitoring subscriptions yet.</p>
          <p className="text-xs text-gray-400">Add annual monitoring from any completed report for $49/year.</p>
        </div>
      )}
      {tab === 'profile' && (
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Account Settings</h3>
          <p className="text-sm text-gray-600 mb-2">Email: Connect Supabase to manage account.</p>
          <p className="text-xs text-gray-400">Your reports and orders are saved securely in your account.</p>
        </div>
      )}
    </div>
    <Footer /></div>
  );
}
