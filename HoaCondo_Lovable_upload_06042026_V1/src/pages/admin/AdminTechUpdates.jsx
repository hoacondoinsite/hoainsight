import React, { useState } from 'react';
import { UPDATE_SCHEDULE, MONITORED_TECH_CATEGORIES, UPDATE_TYPES, getPlainEnglishExplanation } from '../../lib/technologyUpdateEngine.js';

const NAVY = 'var(--navy)'; const GOLD = 'var(--gold)';

export default function AdminTechUpdates() {
  const [tab, setTab] = useState('overview');
  const [sampleUpdates] = useState([
    { type:'security_patch',  tech:'OpenAI SDK',         version:'4.95.1', date:'Today 8:01 PM', category:'ai_models',  reviewed: false },
    { type:'minor_version',   tech:'Resend',             version:'3.2.1',  date:'Today 8:01 PM', category:'email',       reviewed: false },
    { type:'new_feature',     tech:'Supabase',           version:'2.44.0', date:'Today 8:01 PM', category:'database',    reviewed: true },
    { type:'regulatory',      tech:'Fannie Mae',         version:'N/A',    date:'Yesterday',      category:'fannie_mae',  reviewed: false },
    { type:'deprecation',     tech:'Twilio SMS API v1',  version:'v1 EOL', date:'Yesterday',      category:'voip',        reviewed: true },
  ]);

  const priorityColors = { CRITICAL:'bg-red-100 text-red-700', HIGH:'bg-amber-100 text-amber-700', NORMAL:'bg-blue-100 text-blue-700', LOW:'bg-gray-100 text-gray-500' };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1" style={{ color: NAVY }}>🔄 Daily Technology Updates</h2>
      <p className="text-sm text-gray-500 mb-6">Every day at <strong>8:00 PM ET</strong>, AI scans all connected technologies for updates, security patches, and new capabilities. Plain English explanations — no tech degree needed.</p>

      <div className="flex gap-2 mb-6 border-b border-gray-200 flex-wrap">
        {['overview','update log','monitored tech','schedule'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${tab === t ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div>
          <div className="bg-white rounded-2xl border-2 border-yellow-400 p-5 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-lg" style={{ color: NAVY }}>⏰ Next Scan: Tonight at 8:00 PM ET</p>
                <p className="text-sm text-gray-600 mt-1">Daily automated AI scan of all {MONITORED_TECH_CATEGORIES.length} technology categories</p>
                <p className="text-xs text-gray-400 mt-1">Notifications sent to: peter@hoacondinsight.com, ceo@hoacondinsight.com (changes only)</p>
              </div>
              <div className="text-4xl">🤖</div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              {l:'Updates Found Today',v:'5',s:'3 require review',c:'#ef4444'},
              {l:'Last Scan',v:'8:00 PM', s:'All categories checked'},
              {l:'Categories Monitored',v:String(MONITORED_TECH_CATEGORIES.length),s:'From email to AI to Adobe'},
            ].map((k,i)=>(
              <div key={i} className="bg-white rounded-xl border p-4 shadow-sm">
                <p className="text-xs text-gray-500">{k.l}</p>
                <p className="text-2xl font-bold mt-1" style={{ color: k.c || NAVY }}>{k.v}</p>
                <p className="text-xs text-gray-400 mt-1">{k.s}</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="font-bold text-blue-800 text-sm mb-2">📖 How This Works — In Plain English</p>
            <div className="space-y-2 text-sm text-blue-700">
              <p>1. Every night at 8 PM, the AI checks all software and services connected to HOACONDInsight™.</p>
              <p>2. It finds any updates, security fixes, or important changes.</p>
              <p>3. It writes a plain English explanation of what each change means for you.</p>
              <p>4. You get an email only if something important was found.</p>
              <p>5. You review updates here and decide whether to apply them.</p>
              <p>6. <strong>Nothing is ever applied automatically</strong> — you always approve first.</p>
            </div>
          </div>
        </div>
      )}

      {tab === 'update log' && (
        <div className="space-y-3">
          {sampleUpdates.map((u, i) => {
            const typeConfig = UPDATE_TYPES[u.type];
            return (
              <div key={i} className={`bg-white rounded-xl border p-4 shadow-sm ${!u.reviewed ? 'border-l-4 border-l-amber-400' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className={`text-xs px-2 py-0.5 rounded font-bold mr-2 ${priorityColors[typeConfig?.priority] || 'bg-gray-100 text-gray-600'}`}>
                      {typeConfig?.priority}
                    </span>
                    <span className="font-semibold text-sm">{u.tech}</span>
                    <span className="text-xs text-gray-400 ml-2">{u.version} · {u.date}</span>
                  </div>
                  {!u.reviewed && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">Needs Review</span>}
                  {u.reviewed && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Reviewed</span>}
                </div>
                <p className="text-sm text-gray-700 mt-1">{getPlainEnglishExplanation(u.type, u.tech, u.version)}</p>
                {!u.reviewed && (
                  <div className="flex gap-2 mt-3">
                    <button className="text-xs px-3 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50">Mark Reviewed</button>
                    <button className="text-xs px-3 py-1 rounded text-white font-medium" style={{ background: NAVY }}>Apply Update</button>
                    <button className="text-xs px-3 py-1 rounded border border-red-200 text-red-600">Skip This Update</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab === 'monitored tech' && (
        <div className="grid md:grid-cols-2 gap-3">
          {MONITORED_TECH_CATEGORIES.map(cat => (
            <div key={cat.id} className="bg-white rounded-xl border p-4 shadow-sm">
              <p className="font-semibold text-sm" style={{ color: NAVY }}>{cat.label}</p>
              <p className="text-xs text-gray-500 mt-1">{cat.description}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'schedule' && (
        <div className="max-w-lg">
          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="font-bold mb-4">Daily Scan Schedule</h3>
            {Object.entries(UPDATE_SCHEDULE).map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-gray-50 last:border-0 text-sm">
                <span className="text-gray-500 capitalize">{k.replace(/([A-Z])/g,' $1').trim()}</span>
                <span className="font-medium">{Array.isArray(v) ? v.join(', ') : String(v)}</span>
              </div>
            ))}
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 text-xs text-green-700">
              ✅ This system runs from Day 1 through eternity. No manual intervention required for the daily scan.
              New technologies are automatically added to the monitoring list as they become relevant.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
