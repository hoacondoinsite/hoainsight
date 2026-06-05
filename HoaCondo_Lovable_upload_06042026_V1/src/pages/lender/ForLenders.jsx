import React from 'react';
import Nav from '../../components/Nav.jsx';
import Footer from '../../components/Footer.jsx';
import { Link } from 'react-router-dom';
export default function ForLenders() {
  const tiers = [{name:'Branch',price:'$299/mo',reports:'50/month',users:'5 users',los:'Basic LOS integration'},{name:'Regional',price:'$999/mo',reports:'200/month',users:'20 users',los:'Full LOS + API'},{name:'Enterprise',price:'$2,499/mo',reports:'Unlimited',users:'Unlimited',los:'Native Encompass + all LOS'}];
  return (
    <div><Nav />
    <section className="py-16 px-4" style={{ background: 'var(--navy)' }}>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Enterprise Lender Programs</h1>
        <p className="text-gray-300">Fannie Mae LL-2026-03 requires Full Review on every conventional condo loan. HOACONDInsight™ automates the entire process — 48-hour turnaround, Form 1076 auto-filled, attorney-certified.</p>
      </div>
    </section>
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {tiers.map((t, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border shadow-sm">
            <h3 className="text-xl font-bold mb-2">{t.name}</h3>
            <p className="text-3xl font-bold mb-4" style={{ color: 'var(--gold)' }}>{t.price}</p>
            <ul className="text-sm text-gray-600 space-y-2 mb-6">
              <li>✓ {t.reports}</li><li>✓ {t.users}</li><li>✓ {t.los}</li>
              <li>✓ Form 1076 auto-populated</li><li>✓ Attorney certification</li><li>✓ Full report archive</li>
            </ul>
            <Link to="/contact" className="block text-center py-3 rounded-xl text-white font-semibold" style={{ background: 'var(--navy)' }}>Get Started</Link>
          </div>
        ))}
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
        <h3 className="font-bold text-amber-800 mb-2">Why Lenders Choose HOACONDInsight™</h3>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {['48-hour turnaround vs. 5-10 days manual','Form 1076 auto-populated — ready to submit','All 50 states, licensed attorney network'].map((b, i) => <div key={i} className="bg-white rounded-xl p-3 text-sm text-gray-700">{b}</div>)}
        </div>
      </div>
    </section>
    <Footer /></div>
  );
}
