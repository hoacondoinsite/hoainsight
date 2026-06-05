import React from 'react';
import Nav from '../../components/Nav.jsx';
import Footer from '../../components/Footer.jsx';
import { LEGAL_TEXTS, ARBITRATION_CLAUSE } from '../../lib/legalTextContent.js';
export default function Terms() {
  return (<div><Nav />
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-8 text-sm text-amber-800 font-medium">⚠️ ATTORNEY REVIEW PENDING — This page requires Florida-licensed attorney review before accepting live customers.</div>
      <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--navy)' }}>Terms of Service</h1>
      <div className="prose max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">{LEGAL_TEXTS.TERMS}</div>
    </div><Footer /></div>);
}
