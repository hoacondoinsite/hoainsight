import React, { useState } from 'react';
import Nav from '../../components/Nav.jsx';
import Footer from '../../components/Footer.jsx';
export default function AttorneyDashboard() {
  const [tab, setTab] = useState('queue');
  const tabs = ['queue','earnings','certifications','profile'];
  return (
    <div><Nav />
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--navy)' }}>Attorney Dashboard</h1>
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {tabs.map(t => <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${tab === t ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>{t}</button>)}
      </div>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {[{l:'Pending Reviews',v:'0',c:'#ef4444'},{l:'Completed (30 days)',v:'0',c:'var(--green)'},{l:'Total Earnings',v:'$0.00',c:'var(--navy)'}].map((k,i) => <div key={i} className="bg-white rounded-xl border p-4"><p className="text-xs text-gray-500">{k.l}</p><p className="text-2xl font-bold mt-1" style={{ color: k.c }}>{k.v}</p></div>)}
      </div>
      <div className="bg-white rounded-xl border p-6 shadow-sm">
        <p className="text-gray-600 text-sm">Connect Supabase to load your review queue, earnings history, and certification archive.</p>
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
          <strong>SLA Reminder:</strong> All analyses must be reviewed and certified within 48 hours of assignment. Missed deadlines are auto-reassigned after 48 hours.
        </div>
      </div>
    </div>
    <Footer /></div>
  );
}
