import React, { useState } from 'react';
import Nav from '../../components/Nav.jsx';
import Footer from '../../components/Footer.jsx';
export default function LenderSignup() {
  const [submitted, setSubmitted] = useState(false);
  return (<div><Nav />
    <div className="max-w-xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--navy)' }}>Lender Account Application</h1>
      {submitted ? <div className="text-center py-12"><div className="text-5xl mb-4">✅</div><p className="font-semibold text-lg mb-2">Application Received</p><p className="text-gray-600">Our enterprise team will contact you within 1 business day to complete setup.</p></div> : (
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          {[{l:'Institution Name',p:'First National Bank'},{l:'NMLS ID',p:'12345'},{l:'Primary Contact',p:'Jane Smith'},{l:'Email',p:'jsmith@bank.com'},{l:'Phone',p:'(555) 000-0000'},{l:'Monthly Condo Volume',p:'Estimated # of condo loans/month'}].map((f,i) => <div key={i} className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">{f.l}</label><input type="text" placeholder={f.p} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>)}
          <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">Select Tier</label><select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"><option>Branch — $299/month</option><option>Regional — $999/month</option><option>Enterprise — $2,499/month</option></select></div>
          <button onClick={() => setSubmitted(true)} className="w-full py-3 rounded-xl text-white font-semibold" style={{ background: 'var(--navy)' }}>Submit Application</button>
        </div>
      )}
    </div><Footer /></div>);
}
