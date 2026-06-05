import React from 'react';
import Nav from '../../components/Nav.jsx';
import Footer from '../../components/Footer.jsx';
import { LEGAL_TEXTS } from '../../lib/legalTextContent.js';
export default function Cancellation() {
  return (<div><Nav />
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--navy)' }}>Cancellation Policy</h1>
      <div className="prose max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">{LEGAL_TEXTS.CANCELLATION}</div>
    </div><Footer /></div>);
}
