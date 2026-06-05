import React, { useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div><Nav />
    <section className="py-16 px-4" style={{ background: 'var(--navy)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-gray-300">Enterprise inquiries, white label, attorney network, and general support.</p>
      </div>
    </section>
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-bold mb-4">Contact Information</h2>
          <div className="bg-gray-50 rounded-xl p-5 mb-6 text-sm">
            <p className="font-bold text-gray-800 mb-1">Hoa Condo Insight LLC</p>
            <p className="text-gray-600">61 N Lakeshore Drive</p>
            <p className="text-gray-600">Hypoluxo, Florida 33462</p>
          </div>
          <h3 className="font-semibold mb-3 text-gray-700">Department Emails</h3>
          {[
            {l:'Enterprise & Lender',e:'enterprise@hoacondinsight.com'},
            {l:'White Label Program',e:'whitelabel@hoacondinsight.com'},
            {l:'Attorney Network',e:'attorneys@hoacondinsight.com'},
            {l:'General Support',e:'support@hoacondinsight.com'},
            {l:'Legal',e:'legal@hoacondinsight.com'},
            {l:'Founder (Peter Klein)',e:'peter@hoacondinsight.com'},
          ].map((c, i) => (
            <div key={i} className="mb-3">
              <p className="text-sm font-semibold text-gray-700">{c.l}</p>
              <a href={`mailto:${c.e}`} className="text-sm" style={{ color: 'var(--gold)' }}>{c.e}</a>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          {sent ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✅</div>
              <p className="font-semibold">Message sent! We reply within 1 business day.</p>
            </div>
          ) : (
            <div>
              <h3 className="font-bold mb-4">Send a Message</h3>
              {[{l:'Name',t:'text',p:'Your name'},{l:'Email',t:'email',p:'your@email.com'},{l:'Company',t:'text',p:'Company (optional)'}].map((f, i) => (
                <div key={i} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">{f.l}</label>
                  <input type={f.t} placeholder={f.p} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                </div>
              ))}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <button onClick={() => setSent(true)} className="w-full py-3 rounded-xl text-white font-semibold" style={{ background: 'var(--navy)' }}>Send Message</button>
            </div>
          )}
        </div>
      </div>
    </section>
    <Footer /></div>
  );
}
