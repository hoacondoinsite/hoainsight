import React from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { Link } from 'react-router-dom';

export default function Partners() {
  const tiers = [
    { type: 'Real Estate Agent', commission: '25%', per: '$9.75 per report', icon: '🏠', desc: 'Refer buyers ordering individual reports. Earn on every condo transaction.' },
    { type: 'Lender', commission: '15%', per: 'On branch/enterprise subscriptions', icon: '🏦', desc: 'White-glove onboarding, API access, and full LOS integration.' },
    { type: 'Title Company', commission: '15%', per: '$5.25 per API closing', icon: '📋', desc: 'Embed HOACONDInsight™ into your closing workflow via API.' },
    { type: 'HOA Manager', commission: '20%', per: 'On association subscriptions', icon: '🏢', desc: 'Refer associations to the compliance portal. Earn recurring commissions.' },
  ];
  return (
    <div><Nav />
    <section className="py-16 px-4" style={{ background: 'var(--navy)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Partner Program</h1>
        <p className="text-gray-300">Earn commissions on every referral. Paid on the 10th of every month.</p>
      </div>
    </section>
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {tiers.map((t, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border shadow-sm">
            <div className="text-3xl mb-3">{t.icon}</div>
            <h3 className="font-bold text-lg mb-1">{t.type}</h3>
            <div className="text-2xl font-bold mb-1" style={{ color: 'var(--gold)' }}>{t.commission} Commission</div>
            <p className="text-sm text-gray-500 mb-3">{t.per}</p>
            <p className="text-sm text-gray-600">{t.desc}</p>
          </div>
        ))}
      </div>
      <div className="text-center bg-gray-50 rounded-2xl p-8 border">
        <h2 className="text-2xl font-bold mb-4">Ready to Partner?</h2>
        <p className="text-gray-600 mb-6">Get your unique referral code and start earning on every HOA report.</p>
        <Link to="/contact" className="px-8 py-3 rounded-xl text-white font-semibold inline-block" style={{ background: 'var(--gold)' }}>Apply to Partner Program</Link>
      </div>
    </section>
    <Footer /></div>
  );
}
