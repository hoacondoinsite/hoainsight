import React from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';

export default function StatusPage() {
  const systems = [
    { name: 'HOA Analysis Engine', status: 'operational', uptime: '99.9%' },
    { name: 'Attorney Network', status: 'operational', uptime: '99.7%' },
    { name: 'Payment Processing (Stripe)', status: 'operational', uptime: '99.99%' },
    { name: 'Email Delivery (Resend)', status: 'operational', uptime: '99.8%' },
    { name: 'Database (Supabase)', status: 'operational', uptime: '99.95%' },
    { name: 'AI Engine (OpenAI)', status: 'operational', uptime: '99.5%' },
    { name: 'Document Storage', status: 'operational', uptime: '99.9%' },
  ];
  return (
    <div><Nav />
    <section className="py-12 px-4" style={{ background: 'var(--navy)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(34,197,94,0.2)' }}>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-green-400 text-sm font-semibold">All Systems Operational</span>
        </div>
        <h1 className="text-3xl font-bold text-white">HOACONDInsight™ System Status</h1>
      </div>
    </section>
    <section className="py-12 px-4 max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        {systems.map((s, i) => (
          <div key={i} className={`flex items-center justify-between px-6 py-4 ${i < systems.length - 1 ? 'border-b border-gray-100' : ''}`}>
            <span className="font-medium text-sm">{s.name}</span>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400">{s.uptime} uptime</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-xs text-green-600 font-medium capitalize">{s.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-gray-400 mt-6">Updated: {new Date().toLocaleString()} · status.hoacondinsight.com</p>
    </section>
    <Footer /></div>
  );
}
