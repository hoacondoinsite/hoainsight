import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';

const plans = [
  { name:'Individual Report', price:'$39', period:'one-time', highlight:false, tag:'', features:['Full HOA analysis','Health score 0–100','Fannie Mae checklist','48-hour delivery','Email + download'] },
  { name:'Starter Plan', price:'$149', period:'per year', highlight:true, tag:'Most Popular', features:['3 reports per year','HOA monitoring alerts','Priority processing','Attorney certification','PDF download'] },
  { name:'Professional Plan', price:'$299', period:'per year', highlight:false, tag:'', features:['10 reports per year','Attorney certification','Form 1076 auto-filled','HOA monitoring (pro)','API access'] },
];
const enterprise = [
  { name:'Lender Branch', price:'$299/mo', desc:'Up to 50 analyses/month. Full LOS integration. Form 1076 auto-population.' },
  { name:'Lender Regional', price:'$999/mo', desc:'Up to 200/month. All Branch features plus dedicated attorney SLA.' },
  { name:'Lender Enterprise', price:'$2,499/mo', desc:'Unlimited. Full API. White-glove onboarding. Account manager.' },
  { name:'White Label', price:'Custom', desc:'Full platform under your brand. Custom pricing, custom attorney network.' },
];

export default function Pricing() {
  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh', background:'var(--off-white)' }}>
      <Nav />
      <section className="hero-gradient" style={{ padding:'4rem 1.5rem 3rem' }}>
        <div className="section-max" style={{ textAlign:'center', position:'relative', zIndex:1 }}>
          <span className="badge badge-gold" style={{ marginBottom:'1.25rem', display:'inline-flex' }}>Transparent Pricing</span>
          <h1 className="display-lg" style={{ color:'white', marginBottom:'1rem' }}>Simple, Honest Pricing</h1>
          <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'1.05rem', maxWidth:480, margin:'0 auto' }}>No subscriptions required to start. Order a single report for $39 today.</p>
        </div>
      </section>

      <section style={{ padding:'4rem 1.5rem', background:'var(--off-white)' }}>
        <div className="section-max">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.25rem', marginBottom:'3.5rem' }}>
            {plans.map((p,i) => (
              <div key={i} style={{ background:'white', borderRadius:'var(--radius-xl)', border: p.highlight ? '2px solid var(--gold)' : '1px solid var(--border-light)', padding:'2rem', boxShadow: p.highlight ? 'var(--shadow-gold)' : 'var(--shadow-sm)', position:'relative', display:'flex', flexDirection:'column' }}>
                {p.tag && <span className="badge badge-gold" style={{ position:'absolute', top:'1.25rem', right:'1.25rem' }}>{p.tag}</span>}
                <p style={{ fontFamily:'var(--font-display)', fontSize:'1.125rem', color:'var(--navy)', marginBottom:'0.5rem' }}>{p.name}</p>
                <div style={{ display:'flex', alignItems:'baseline', gap:'0.25rem', marginBottom:'0.375rem' }}>
                  <span style={{ fontFamily:'var(--font-display)', fontSize:'2.5rem', color:'var(--navy)', letterSpacing:'-0.03em' }}>{p.price}</span>
                </div>
                <p style={{ fontSize:'0.75rem', color:'var(--text-muted)', marginBottom:'1.75rem' }}>{p.period}</p>
                <ul style={{ flex:1, marginBottom:'2rem' }}>
                  {p.features.map((f,j) => (
                    <li key={j} style={{ display:'flex', gap:'0.625rem', alignItems:'flex-start', fontSize:'0.85rem', color:'var(--text-secondary)', marginBottom:'0.625rem' }}>
                      <span style={{ color:'var(--green)', fontWeight:700, flexShrink:0, lineHeight:1.4 }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link to="/order" className={`btn ${p.highlight ? 'btn-gold' : 'btn-navy'}`} style={{ textAlign:'center', width:'100%' }}>Get Started</Link>
              </div>
            ))}
          </div>

          <div style={{ marginBottom:'0.75rem', paddingBottom:'0.75rem', borderBottom:'1px solid var(--border-light)' }}>
            <p className="label" style={{ color:'var(--gold)', marginBottom:'1.5rem' }}>Enterprise & Professional</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem' }}>
            {enterprise.map((e,i) => (
              <div key={i} style={{ background:'white', borderRadius:'var(--radius-lg)', border:'1px solid var(--border-light)', padding:'1.5rem', boxShadow:'var(--shadow-sm)' }}>
                <p style={{ fontWeight:700, fontSize:'0.9rem', color:'var(--navy)', marginBottom:'0.375rem' }}>{e.name}</p>
                <p style={{ fontFamily:'var(--font-display)', fontSize:'1.375rem', color:'var(--gold)', marginBottom:'0.75rem' }}>{e.price}</p>
                <p style={{ fontSize:'0.8rem', color:'var(--text-secondary)', lineHeight:1.6 }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
