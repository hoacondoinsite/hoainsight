import React, { useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import ScoreCard from '../components/ScoreCard.jsx';
import { getMockAnalysis } from '../lib/aiEngine.js';
import { getDisclaimer } from '../lib/disclaimerEngine.js';

export default function SampleReport() {
  const report = getMockAnalysis('456 Seaside Condo, Boca Raton FL 33432');
  const [expanded, setExpanded] = useState(null);
  return (
    <div><Nav />
    <section className="py-12 px-4" style={{ background: 'var(--navy)' }}>
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ background: 'rgba(201,168,76,0.2)', color: 'var(--gold)' }}>SAMPLE REPORT — For Demonstration Only</div>
        <h1 className="text-3xl font-bold text-white mb-2">HOA Health Analysis</h1>
        <p className="text-gray-300 text-sm">{report.propertyAddress}</p>
      </div>
    </section>
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border flex flex-col items-center">
          <ScoreCard score={report.healthScore} label="Health Score" />
        </div>
        <div className="bg-white rounded-2xl p-6 border">
          <h3 className="font-bold mb-3">Fannie Mae Status</h3>
          <div className={`text-2xl font-bold mb-2 ${report.fannieMaeStatus === 'PASS' ? 'text-green-600' : 'text-red-600'}`}>{report.fannieMaeStatus}</div>
          <div className="space-y-2">
            {Object.entries(report.fannieMaeChecks).map(([key, val]) => (
              <div key={key} className="flex items-center gap-2 text-sm">
                <span>{val ? '✅' : '❌'}</span>
                <span className="text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border">
          <h3 className="font-bold mb-3">6-Factor Breakdown</h3>
          {Object.entries(report.factors).map(([k, v]) => (
            <div key={k} className="mb-2">
              <div className="flex justify-between text-xs mb-0.5"><span className="text-gray-500 capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}</span><span className="font-semibold">{v}</span></div>
              <div className="h-1.5 bg-gray-100 rounded-full"><div className="h-1.5 rounded-full" style={{ width: `${v}%`, background: v >= 70 ? 'var(--green)' : v >= 50 ? '#f59e0b' : '#ef4444' }} /></div>
            </div>
          ))}
        </div>
      </div>
      {report.riskFlags.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
          <h3 className="font-bold text-amber-800 mb-3">⚠️ Risk Flags</h3>
          {report.riskFlags.map((f, i) => <p key={i} className="text-sm text-amber-700 mb-1">• {f}</p>)}
        </div>
      )}
      <div className="bg-white rounded-xl border p-5 mb-6">
        <h3 className="font-bold mb-3">Recommendations</h3>
        {report.recommendations.map((r, i) => <p key={i} className="text-sm text-gray-600 mb-2">• {r}</p>)}
      </div>
      <div className="bg-gray-50 border rounded-xl p-4 text-xs text-gray-500">{getDisclaimer('full')}</div>
    </div>
    <Footer /></div>
  );
}
