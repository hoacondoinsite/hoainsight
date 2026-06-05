import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';

const steps = [
  { num:'01', title:'You Order a Report', sub:'For your condo address', desc:'Go to hoacondinsight.com/order. Select your user type (Home Buyer, Realtor, Lender, or Association). Enter the condo address. Select any add-ons. Pay $39 by credit card.', time:'5 minutes' },
  { num:'02', title:'We Collect HOA Documents', sub:'Automatically', desc:'Our system automatically contacts the HOA management company requesting all 24 required documents — budget, reserve study, financials, insurance, delinquency report, litigation disclosure, and more. You do nothing.', time:'1–4 hours' },
  { num:'03', title:'AI Analysis Runs', sub:'Patent-pending scoring', desc:'Our proprietary 6-factor AI model analyzes every document against Fannie Mae LL-2026-03 requirements. Form 1076 is auto-populated. The 10 Early Warning Rules are checked. A health score from 0–100 is calculated.', time:'30–90 minutes' },
  { num:'04', title:'Attorney Reviews and Certifies', sub:'Licensed in your state', desc:'A licensed HOA attorney in the property\'s state reviews the AI analysis and certifies the findings. Every certification includes the attorney\'s bar number and state license. This is the legal certification Fannie Mae requires.', time:'4–24 hours' },
  { num:'05', title:'Report Delivered to You', sub:'With full documentation', desc:'Your certified report is delivered by email with a PDF download. The report includes the health score, full Fannie Mae checklist, completed Form 1076, attorney certification, and any red-flag findings highlighted in plain English.', time:'Total: 48 hours' },
];

export default function HowItWorks() {
  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh', background:'var(--off-white)' }}>
      <Nav />
      <section className="hero-gradient" style={{ padding:'4rem 1.5rem 3rem' }}>
        <div className="section-max" style={{ textAlign:'center', position:'relative', zIndex:1 }}>
          <h1 className="display-lg animate-fade-up" style={{ color:'white', marginBottom:'1rem' }}>How HOACONDInsight™ Works</h1>
          <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'1.05rem', maxWidth:520, margin:'0 auto' }}>From order to certified report in 48 hours. Fully automated. Attorney-certified. All 50 states.</p>
        </div>
      </section>

      <section style={{ padding:'5rem 1.5rem', background:'white' }}>
        <div className="section-max" style={{ maxWidth:800, margin:'0 auto' }}>
          {steps.map((s,i) => (
            <div key={i} style={{ display:'flex', gap:'2rem', marginBottom:'3rem', paddingBottom:'3rem', borderBottom: i<steps.length-1 ? '1px solid var(--border-light)' : 'none' }}>
              <div style={{ flexShrink:0 }}>
                <div style={{ width:56, height:56, borderRadius:'var(--radius-md)', background:'var(--surface)', border:'2px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', color:'var(--gold)' }}>{s.num}</span>
                </div>
                <div style={{ width:2, height:'calc(100% - 56px)', background:'var(--border-light)', margin:'0.5rem auto 0', display: i<steps.length-1 ? 'block' : 'none', width:1 }} />
              </div>
              <div style={{ flex:1, paddingTop:'0.25rem' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.5rem' }}>
                  <div>
                    <h2 style={{ fontFamily:'var(--font-display)', fontSize:'1.375rem', color:'var(--navy)', marginBottom:'0.125rem' }}>{s.title}</h2>
                    <p style={{ fontSize:'0.8rem', color:'var(--gold)', fontWeight:600 }}>{s.sub}</p>
                  </div>
                  <span className="badge badge-gold">{s.time}</span>
                </div>
                <p style={{ fontSize:'0.9rem', color:'var(--text-secondary)', lineHeight:1.75 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding:'4rem 1.5rem', background:'var(--navy)' }}>
        <div className="section-max" style={{ textAlign:'center' }}>
          <h2 className="display-md" style={{ color:'white', marginBottom:'1rem' }}>Ready to order your report?</h2>
          <p style={{ color:'rgba(255,255,255,0.55)', marginBottom:'2rem' }}>Individual report $39 · All 50 states · Attorney-certified</p>
          <Link to="/order" className="btn btn-gold btn-lg">Order Your Report — $39</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
