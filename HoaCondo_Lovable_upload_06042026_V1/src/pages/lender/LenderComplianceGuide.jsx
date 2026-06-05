import React from 'react';
import Nav from '../../components/Nav.jsx';
import Footer from '../../components/Footer.jsx';
export default function LenderComplianceGuide() {
  const sections = [
    {t:'What Changed (LL-2026-03)',b:'Fannie Mae Lender Letter LL-2026-03, effective March 18, 2026, permanently retired the Limited Review pathway. All conventional condo loans now require Full Review. No grandfather clause. No exceptions.'},
    {t:'Full Review Requirements',b:'You must review: operating budget, reserve study, audited financials (2 years), master insurance, owner delinquency report, pending litigation, owner occupancy (51%+ minimum), hotel conversion disclosure, single-entity ownership (max 10%), and complete Form 1076.'},
    {t:'How HOACONDInsight™ Helps',b:'Upload documents → AI analysis in 30-90 minutes → Fannie Mae checklist auto-completed → Form 1076 auto-populated → attorney certifies within 48 hours → report delivered. Total: 48 hours vs. 5-10 business days manually.'},
    {t:'Form 1076',b:'HOACONDInsight™ auto-populates every required field on Form 1076 from the AI analysis. The certifying attorney reviews and provides their professional certification. You review, approve, and submit — never fill from scratch.'},
    {t:'Attorney Certification',b:'Every report includes certification by a licensed HOA attorney in the property state. 48-hour SLA. Independent professional opinion. Attorney is responsible for their own certification.'},
  ];
  return (<div><Nav />
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-8" style={{ color: 'var(--navy)' }}>Fannie Mae Full Review Compliance Guide</h1>
      <div className="space-y-6">
        {sections.map((s,i) => <div key={i} className="bg-white rounded-xl border p-5 shadow-sm"><h3 className="font-bold mb-2" style={{ color: 'var(--navy)' }}>{s.t}</h3><p className="text-gray-600 text-sm leading-relaxed">{s.b}</p></div>)}
      </div>
    </div><Footer /></div>);
}
