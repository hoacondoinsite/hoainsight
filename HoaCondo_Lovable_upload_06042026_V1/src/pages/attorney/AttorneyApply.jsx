import React, { useState } from 'react';
import Nav from '../../components/Nav.jsx';
import Footer from '../../components/Footer.jsx';
export default function AttorneyApply() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div><Nav />
    <section className="py-12 px-4" style={{ background: 'var(--navy)' }}>
      <div className="max-w-2xl mx-auto text-center"><h1 className="text-3xl font-bold text-white mb-3">Join the Attorney Network</h1><p className="text-gray-300">Earn $89.40 per HOA certification. 48-hour SLA. Work from any device.</p></div>
    </section>
    <div className="max-w-xl mx-auto px-4 py-12">
      {submitted ? <div className="text-center py-12"><div className="text-6xl mb-4">✅</div><h2 className="text-2xl font-bold mb-2">Application Submitted</h2><p className="text-gray-600">We'll review your application and contact you within 3 business days.</p></div> : (
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h2 className="font-bold text-xl mb-4">Attorney Application</h2>
          {[{l:'Full Name',p:'Jane Smith, Esq.'},{l:'State Bar Number',p:'FL-12345'},{l:'State(s) Licensed',p:'FL, GA'},{l:'Email',p:'attorney@lawfirm.com'},{l:'Phone',p:'(561) 555-0000'},{l:'Years HOA Law Experience',p:'5'}].map((f,i)=>(
            <div key={i} className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">{f.l}</label><input type="text" placeholder={f.p} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          ))}
          <button onClick={() => setSubmitted(true)} className="w-full py-3 rounded-xl text-white font-semibold mt-2" style={{ background: 'var(--navy)' }}>Submit Application</button>
        </div>
      )}
    </div>
    <Footer /></div>
  );
}
