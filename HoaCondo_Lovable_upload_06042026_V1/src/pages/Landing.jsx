import PATENT_CONFIG from '../lib/patentConfig.js';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import ScoreCard from '../components/ScoreCard.jsx';

export default function Landing({ deploymentState }) {
  return (
    <div>
      <Nav />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="hero-gradient" style={{ padding: '5rem 1.5rem 6rem' }}>
        <div className="section-max" style={{ position: 'relative', zIndex: 1 }}>
          <div className="animate-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: '999px', padding: '0.375rem 1rem', marginBottom: '2rem' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
            <span className="label" style={{ color: 'var(--gold)', fontSize: '0.68rem' }}>Fannie Mae LL-2026-03 Mandate — Effective March 18, 2026</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h1 className="display-xl animate-fade-up-delay-1" style={{ color: 'white', marginBottom: '1.5rem' }}>
                The Only Automated<br />
                <span className="gold-shimmer">HOA & Condo</span><br />
                Compliance Platform
              </h1>
              <p className="animate-fade-up-delay-2" style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', maxWidth: 500, lineHeight: 1.7 }}>
                Fannie Mae now requires Full Review for every conventional condo loan.
                HOACONDInsight™ automates the entire process — 48-hour turnaround, all 50 states, attorney-certified.
              </p>
              <div className="animate-fade-up-delay-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/order" className="btn btn-gold btn-lg">
                  Order a Report — $39
                </Link>
                <Link to="/lenders" className="btn btn-ghost btn-lg" style={{ color: 'white', border: '1.5px solid rgba(255,255,255,0.25)' }}>
                  Enterprise Access →
                </Link>
              </div>

              <div style={{ display: 'flex', gap: '2.5rem', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                {[
                  ['499K+', 'Annual mandated transactions'],
                  ['4,400', 'Lenders must comply'],
                  ['48 hrs', 'Average turnaround'],
                  ['50', 'States covered'],
                ].map(([v, l]) => (
                  <div key={l}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--gold)', lineHeight: 1 }}>{v}</p>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.25rem', fontWeight: 500 }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-fade-up-delay-2" style={{ display: 'none' }} className="hidden md:block">
              <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(24px)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 'var(--radius-xl)', padding: '2.5rem 2rem', textAlign: 'center' }}>
                <ScoreCard score={82} label="Sample HOA Health Score" />
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {[
                    ['Reserve Fund', '94%', 'green'],
                    ['Delinquency Rate', '3.2%', 'green'],
                    ['Fannie Mae Status', 'PASS', 'green'],
                  ].map(([label, val, color]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.875rem', background: 'rgba(255,255,255,0.06)', borderRadius: '8px' }}>
                      <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>{label}</span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--green)' }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MANDATE ALERT ─────────────────────────────────────── */}
      <section style={{ background: 'var(--navy)', padding: '1rem 1.5rem' }}>
        <div className="section-max" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
          <span className="badge badge-amber">Federal Mandate</span>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>
            Limited Review is <strong style={{ color: 'white' }}>permanently retired</strong>. All 4,400 U.S. mortgage lenders must conduct Full Review on every conventional condo loan. Effective March 18, 2026.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem', background: 'white' }}>
        <div className="section-max">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="label" style={{ color: 'var(--gold)', marginBottom: '0.75rem', display: 'block' }}>The Process</span>
            <h2 className="display-md" style={{ color: 'var(--navy)' }}>48-Hour Full Review — Fully Automated</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {[
              ['01', 'Upload Documents', 'HOA financials, reserve study, insurance — we request them automatically if needed.'],
              ['02', 'AI Analysis Runs', 'Patent-pending 6-factor scoring runs in 30-90 minutes. Fannie Mae checklist completed.'],
              ['03', 'Attorney Certifies', 'Licensed HOA attorney in your state reviews and certifies within 48 hours.'],
              ['04', 'Report Delivered', 'Certified report with Form 1076 delivered by email. Permanent record created.'],
            ].map(([num, title, desc]) => (
              <div key={num} className="card-inset" style={{ padding: '1.75rem 1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--gold)', opacity: 0.4, lineHeight: 1, marginBottom: '1rem' }}>{num}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ──────────────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--surface)' }}>
        <div className="section-max">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="label" style={{ color: 'var(--gold)', marginBottom: '0.75rem', display: 'block' }}>Built For Everyone</span>
            <h2 className="display-md" style={{ color: 'var(--navy)' }}>Enterprise-Grade. Individual-Accessible.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              { title: 'Mortgage Lenders', tag: 'Enterprise', desc: 'Branch to enterprise licensing. Direct LOS integration with Encompass, Calyx, Byte. Form 1076 auto-populated. Team management.', link: '/lenders', cta: 'Lender Programs' },
              { title: 'Home Buyers & Agents', tag: 'Individual', desc: 'Order a single report for $39. Get a complete HOA health analysis with attorney certification. Private Buyer Protection report included.', link: '/order', cta: 'Order a Report' },
              { title: 'HOA Associations', tag: 'Associations', desc: 'Your own compliance workspace. Gather all required documents, track status, get certified. Display your HOACONDInsight™ certification badge.', link: '/association-portal', cta: 'Association Portal' },
            ].map((c, i) => (
              <div key={i} className="card" style={{ padding: '2rem' }}>
                <span className="badge badge-navy" style={{ marginBottom: '1.25rem' }}>{c.tag}</span>
                <h3 className="heading-lg" style={{ color: 'var(--navy)', marginBottom: '0.75rem' }}>{c.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>{c.desc}</p>
                <Link to={c.link} style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  {c.cta} <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────── */}
      <section style={{ padding: '3.5rem 1.5rem', background: 'var(--navy)' }}>
        <div className="section-max" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          {[
            ['Patent Apps Pending', `${PATENT_CONFIG.FIRST_APP.shortNumber} (June 2) · ${PATENT_CONFIG.SECOND_APP.confirmed ? PATENT_CONFIG.SECOND_APP.shortNumber : '[2nd App — Update Tonight]'} (June 4)`],
            ['50-State Attorney Network', 'Licensed HOA attorneys in every state'],
            ['Form 1076 Auto-Population', 'Complete Fannie Mae form from AI analysis'],
            ['48-Hour Turnaround', '5-10 business days manually — we do it in 48 hours'],
          ].map(([title, sub]) => (
            <div key={title} style={{ textAlign: 'center', padding: '1.5rem 1rem', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem', marginBottom: '0.375rem' }}>{title}</p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem', background: 'white' }}>
        <div className="section-max" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <h2 className="display-md" style={{ color: 'var(--navy)', marginBottom: '1rem' }}>Start Your First Report Today</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Individual report $39 · Enterprise and association programs available · All 50 states · No subscription required.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/order" className="btn btn-gold btn-lg">Order Your Report — $39</Link>
            <Link to="/sample-report" className="btn btn-ghost btn-lg">View Sample Report</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
