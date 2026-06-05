import PATENT_CONFIG from '../lib/patentConfig.js';
import React, { useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { REVENUE_SCENARIOS } from '../lib/revenueEngine.js';
import { calculatePlatformHealthScore } from '../lib/riskEngine.js';
import { EMERGENCY_TYPES } from '../lib/emergencyOperationsEngine.js';
import { DEPLOYMENT_STATES, NOTIFY_ALWAYS } from '../lib/deploymentControlEngine.js';
import { Link } from 'react-router-dom';

/**
 * FounderDashboard — Peter Klein only
 * Hoa Condo Insight LLC
 */
export default function FounderDashboard() {
  const [tab, setTab] = useState('brief');
  const score = calculatePlatformHealthScore({
    analysisSuccessRate: 100, attorneyComplianceRate: 100,
    avgTurnaround: 24, customerSatisfaction: 100, systemUptime: 100
  });

  // Deployment state is read from Admin > Deployment Control
  // Shown here for visibility — changes MUST go through Admin > Deployment
  const [deploymentNote] = useState('Check Admin → Deployment Control to change site state');

  return (
    <div>
      <Nav />
      <section className="py-8 px-4" style={{ background: 'var(--navy)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-1">FOUNDER DASHBOARD — PETER KLEIN</p>
            <h1 className="text-2xl font-bold text-white">Good morning, Peter.</h1>
            <p className="text-xs text-gray-500 mt-1">Hoa Condo Insight LLC — HOACONDInsight™</p>
            <p className="text-sm mt-1" style={{ color: 'var(--gold)' }}>
              {new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Platform Health</p>
            <p className="text-4xl font-bold text-green-400">{score}</p>
            <p className="text-xs text-gray-400">/ 100</p>
          </div>
        </div>
      </section>

      {/* DEPLOYMENT CONTROL QUICK ACCESS */}
      <div className="max-w-5xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-2xl border-2 border-yellow-400 p-5 shadow-md mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-yellow-700 mb-1">
                🌐 LIVE WEBSITE DEPLOYMENT CONTROL
              </p>
              <p className="font-bold text-lg" style={{ color: 'var(--navy)' }}>
                Founder &amp; C-Suite Access Only
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Activate, deactivate, or change site state. Every change sends immediate notification to all Founder and C-Suite contacts.
              </p>
              <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-500">
                {NOTIFY_ALWAYS.map(n => (
                  <span key={n.email} className="bg-gray-100 px-2 py-0.5 rounded">
                    📧 {n.email}
                  </span>
                ))}
              </div>
            </div>
            <Link to="/admin"
              className="px-5 py-3 rounded-xl text-white font-bold text-sm whitespace-nowrap ml-4"
              style={{ background: 'var(--navy)' }}>
              Open Admin →<br />
              <span className="text-xs font-normal opacity-75">Deployment tab</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {['brief','revenue','alerts','emergency'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${
                tab === t ? 'border-yellow-500 text-yellow-600' : 'border-transparent text-gray-500'
              }`}>{t}</button>
          ))}
        </div>

        {tab === 'brief' && (
          <div>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              {[
                { l: 'Revenue Today', v: '$0', s: 'Connect Supabase', c: null },
                { l: 'Reports MTD', v: '0', s: 'Platform live', c: null },
                { l: 'Pending Actions', v: '3', s: 'See below', c: '#ef4444' },
                { l: 'Patent Deadline', v: '362d', s: 'Jun 2, 2027', c: '#f59e0b' },
              ].map((k, i) => (
                <div key={i} className="bg-white rounded-xl border p-4 shadow-sm">
                  <p className="text-xs text-gray-500">{k.l}</p>
                  <p className="text-2xl font-bold mt-1" style={{ color: k.c || 'var(--navy)' }}>{k.v}</p>
                  <p className="text-xs text-gray-400 mt-1">{k.s}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl border p-5 shadow-sm">
              <h3 className="font-bold mb-3">Action Items</h3>
              {[
                { task: 'Contact Fish & Richardson — begin utility patent prosecution', priority: 'CRITICAL', link: 'mailto:NewMatters@fr.com' },
                { task: 'Attorney review of legal pages before accepting live orders', priority: 'CRITICAL', link: '/legal/terms' },
                { task: 'Activate live website via Admin → Deployment Control (after above are complete)', priority: 'HIGH', link: '/admin' },
                { task: 'Connect Supabase VITE_SUPABASE_URL environment variable', priority: 'HIGH', link: null },
                { task: 'Switch Stripe from test to live mode before going live', priority: 'HIGH', link: null },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0 text-sm">
                  <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                    item.priority === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                    item.priority === 'HIGH' ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>{item.priority}</span>
                  <span className="text-gray-700 flex-1">{item.task}</span>
                  {item.link && <a href={item.link} className="text-xs" style={{ color: 'var(--gold)' }}>→</a>}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'revenue' && (
          <div className="bg-white rounded-xl border p-5 shadow-sm">
            <h3 className="font-bold mb-4">Revenue Milestones</h3>
            {Object.entries(REVENUE_SCENARIOS).slice(0, 4).map(([yr, data]) => (
              <div key={yr} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                <span className="text-sm font-medium text-gray-700">{yr.replace('year', 'Year ')}</span>
                <span className="text-sm font-bold">${(data.revenue / 1000000).toFixed(2)}M revenue</span>
                <span className={`text-sm ${data.ebitda > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  ${(data.ebitda / 1000).toFixed(0)}K EBITDA
                </span>
                <span className="text-xs text-gray-400">{data.headcount} staff</span>
              </div>
            ))}
          </div>
        )}

        {tab === 'alerts' && (
          <div className="bg-white rounded-xl border p-5 shadow-sm space-y-3">
            <h3 className="font-bold mb-1">System Alerts</h3>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              🔴 CRITICAL: Contact Fish &amp; Richardson NOW — U.S. Patent App. ${PATENT_CONFIG.FIRST_APP.shortNumber} requires prosecution.
              NewMatters@fr.com | 617-542-5070
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700">
              ⚠️ Patent utility deadline: June 2, 2027 — 362 days remaining.
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700">
              ⚠️ Website is in TEST MODE. To go live: Admin → Deployment Control (Founder/C-Suite only).
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
              ℹ️ Platform: Development and testing complete. Initial commercial deployment in progress.
            </div>
          </div>
        )}

        {tab === 'emergency' && (
          <div className="bg-white rounded-xl border p-5 shadow-sm">
            <h3 className="font-bold mb-2">Emergency Operations</h3>
            <p className="text-sm text-gray-500 mb-4">
              All emergency deployments require Founder + C-Suite authorization.
              <Link to="/emergency-ops" className="ml-2" style={{ color: 'var(--gold)' }}>
                Open Emergency Dashboard →
              </Link>
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {EMERGENCY_TYPES.slice(0, 6).map(e => (
                <div key={e.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">{e.label}</p>
                    <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                      e.level === 'CRITICAL' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>{e.level}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Notify within: {e.notifyWithin}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
