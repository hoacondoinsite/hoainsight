import React, { useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { TRAINING_VIDEOS, validateScript } from '../lib/videoTrainingEngine.js';

export default function VideoTrainingDashboard() {
  const [tab, setTab] = useState('library');
  const [filter, setFilter] = useState('all');
  const [newScript, setNewScript] = useState('');
  const [validationResult, setValidationResult] = useState(null);

  const filtered = filter === 'all' ? TRAINING_VIDEOS : TRAINING_VIDEOS.filter(v => v.status === filter || v.level === filter);

  const handleValidate = () => {
    setValidationResult(validateScript(newScript));
  };

  return (
    <div><Nav />
    <section className="py-10 px-4" style={{ background: 'var(--navy)' }}>
      <div className="max-w-5xl mx-auto"><h1 className="text-2xl font-bold text-white mb-1">Video Training Dashboard</h1>
      <p className="text-sm" style={{ color: 'var(--gold)' }}>15 pre-built scripts · AI generator · SOP validation before deployment</p></div>
    </section>
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {['library','required','create'].map(t => <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${tab === t ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500'}`}>{t}</button>)}
      </div>

      {tab === 'library' && (
        <>
          <div className="flex gap-2 mb-4 flex-wrap">
            {['all','approved','pending','founder','admin','lender','buyer','attorney','all_users'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${filter === f ? 'text-white border-transparent' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`} style={filter === f ? { background: 'var(--navy)' } : {}}>{f}</button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map(v => (
              <div key={v.id} className="bg-white rounded-xl border p-4 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-sm">{v.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${v.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{v.status}</span>
                </div>
                <div className="flex gap-3 text-xs text-gray-400">
                  <span>Level: {v.level}</span>
                  <span>Duration: {v.duration}</span>
                </div>
                <button className="mt-3 text-xs px-3 py-1 rounded border border-gray-200 text-gray-500 hover:bg-gray-50">View Script</button>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'create' && (
        <div className="bg-white rounded-xl border p-6 shadow-sm max-w-2xl">
          <h3 className="font-bold mb-4">AI Script Generator + SOP Validator</h3>
          <textarea value={newScript} onChange={e => setNewScript(e.target.value)} placeholder="Paste your video script here or describe what you want to create..." className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm resize-none mb-4 focus:outline-none" rows={8} />
          <button onClick={handleValidate} disabled={!newScript} className="px-6 py-2 rounded-lg text-white font-semibold text-sm mb-4 disabled:opacity-40" style={{ background: 'var(--navy)' }}>Validate Against SOPs</button>
          {validationResult && (
            <div className={`rounded-lg p-4 text-sm ${validationResult.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <p className={`font-bold mb-2 ${validationResult.valid ? 'text-green-700' : 'text-red-700'}`}>
                {validationResult.valid ? '✅ SOP VALIDATED — Ready for C-Suite approval' : '❌ SOP VIOLATIONS FOUND — Fix before submitting'}
              </p>
              {!validationResult.valid && validationResult.violations.map((v, i) => <p key={i} className="text-red-600 text-xs">• {v}</p>)}
            </div>
          )}
        </div>
      )}
    </div>
    <Footer /></div>
  );
}
