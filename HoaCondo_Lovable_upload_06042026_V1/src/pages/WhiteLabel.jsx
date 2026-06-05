import React from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { WL_TIERS, WL_DOCUMENTS, SAMPLE_CLIENTS } from '../lib/whiteLabelEngine.js';
import { Link } from 'react-router-dom';

export default function WhiteLabel() {
  return (
    <div><Nav />
    <section className="py-16 px-4" style={{ background: 'var(--navy)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-4">White Label Program</h1>
        <p className="text-gray-300 mb-6">Deploy HOACONDInsight™ under your brand. Full platform, your pricing, your clients.</p>
        <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{ background: 'rgba(201,168,76,0.2)', color: 'var(--gold)' }}>Custom pricing upon inquiry — No published rates</div>
      </div>
    </section>
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {Object.entries(WL_TIERS).map(([key, tier]) => (
          <div key={key} className="bg-white rounded-2xl p-6 border shadow-sm text-center">
            <h3 className="text-xl font-bold mb-2 capitalize">{tier.name}</h3>
            <p className="text-2xl font-bold mb-4" style={{ color: 'var(--gold)' }}>{tier.label}</p>
            <ul className="text-sm text-gray-600 space-y-2 mb-6 text-left">
              <li>✓ Up to {tier.users} users</li>
              <li>✓ {tier.analyses} analyses/month</li>
              <li>✓ Your brand, your domain</li>
              <li>✓ All 13 legal documents included</li>
              <li>✓ Full platform access</li>
            </ul>
            <Link to="/contact" className="block py-3 rounded-xl font-semibold text-white" style={{ background: 'var(--navy)' }}>Contact for Pricing</Link>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 rounded-2xl p-6 border mb-8">
        <h2 className="font-bold text-lg mb-4">Live White Label Clients</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {SAMPLE_CLIENTS.map((c, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border">
              <p className="font-semibold text-sm">{c.name}</p>
              <p className="text-xs text-gray-500 capitalize">{c.tier} tier · {c.users} users</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.status === 'LIVE' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{c.status}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 border">
        <h2 className="font-bold text-lg mb-4">13 Legal Documents Included</h2>
        <div className="grid md:grid-cols-2 gap-2">
          {WL_DOCUMENTS.map((d, i) => <div key={i} className="text-sm text-gray-600 flex gap-2"><span className="text-green-500">✓</span>{d}</div>)}
        </div>
      </div>
    </section>
    <Footer /></div>
  );
}
