import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';

const features = [
  { cat:'Compliance', icon:'⊙', name:'Fannie Mae Full Review Automation', desc:'Complete automation of LL-2026-03 Full Review requirements. Every document checked, every field verified, every checklist item confirmed.' },
  { cat:'Intelligence', icon:'◈', name:'Patent-Pending 6-Factor Scoring', desc:'Proprietary HOA health score 0–100. Factors: reserve fund adequacy, delinquency rate, litigation exposure, insurance coverage, financial stability, owner-occupancy.' },
  { cat:'Legal', icon:'⊛', name:'50-State Attorney Certification', desc:'Licensed HOA attorney in the property state reviews and certifies every analysis. Bar number and license on every certification. 48-hour SLA.' },
  { cat:'Documents', icon:'◇', name:'Form 1076 Auto-Population', desc:'Fannie Mae Form 1076 (Project Analysis Report) automatically completed from analysis results. Ready for lender submission.' },
  { cat:'Integration', icon:'◎', name:'LOS Integration', desc:'Direct integration with Encompass (ICE), Calyx Point, Byte Pro, MeridianLink, and major loan origination systems. Auto-routes to order queue.' },
  { cat:'Privacy', icon:'⊘', name:'Buyer Protection Report', desc:'Private analysis delivered only to the buyer — never visible to the listing agent or seller. Protects buyer negotiating position. Cannot be disabled.' },
  { cat:'Monitoring', icon:'↺', name:'HOA Monitoring Subscriptions', desc:'Annual monitoring plan alerts you when reserve fund drops, litigation is filed, special assessments are announced, or compliance status changes.' },
  { cat:'Enterprise', icon:'◰', name:'White Label Deployment', desc:'Full platform under your brand. Enterprise lenders and title companies deploy HOACONDInsight™ as their own compliance solution.' },
];

export default function Features() {
  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh', background:'var(--off-white)' }}>
      <Nav />
      <section className="hero-gradient" style={{ padding:'4rem 1.5rem 3rem' }}>
        <div className="section-max" style={{ textAlign:'center', position:'relative', zIndex:1 }}>
          <span className="badge badge-gold" style={{ marginBottom:'1.25rem', display:'inline-flex' }}>Full Feature Set</span>
          <h1 className="display-lg animate-fade-up" style={{ color:'white', marginBottom:'1rem' }}>Everything You Need. Built In.</h1>
          <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'1.05rem', maxWidth:520, margin:'0 auto' }}>Every tool for HOA compliance is in a single platform. No add-ons. No integrations to configure.</p>
        </div>
      </section>

      <section style={{ padding:'4.5rem 1.5rem', background:'white' }}>
        <div className="section-max">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1.25rem' }}>
            {features.map((f,i) => (
              <div key={i} style={{ background:'var(--off-white)', borderRadius:'var(--radius-lg)', border:'1px solid var(--border-light)', padding:'1.75rem', display:'flex', gap:'1.25rem' }}>
                <div style={{ width:44, height:44, borderRadius:'var(--radius-md)', background:'var(--navy)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:'1rem', color:'var(--gold)', fontFamily:'monospace' }}>
                  {f.icon}
                </div>
                <div>
                  <span className="label" style={{ color:'var(--gold)', display:'block', marginBottom:'0.375rem', fontSize:'0.62rem' }}>{f.cat}</span>
                  <h3 style={{ fontWeight:700, fontSize:'0.95rem', color:'var(--navy)', marginBottom:'0.5rem', letterSpacing:'-0.01em' }}>{f.name}</h3>
                  <p style={{ fontSize:'0.825rem', color:'var(--text-secondary)', lineHeight:1.7 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding:'4rem 1.5rem', background:'var(--navy)' }}>
        <div className="section-max" style={{ textAlign:'center' }}>
          <h2 className="display-md" style={{ color:'white', marginBottom:'1rem' }}>See It In Action</h2>
          <p style={{ color:'rgba(255,255,255,0.55)', marginBottom:'2rem' }}>View a sample report or order your first analysis.</p>
          <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/sample-report" className="btn btn-gold btn-lg">View Sample Report</Link>
            <Link to="/order" className="btn btn-ghost btn-lg" style={{ color:'white', borderColor:'rgba(255,255,255,0.25)' }}>Order a Report — $39</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
