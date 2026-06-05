import React from 'react';
import { Link } from 'react-router-dom';
import PATENT_CONFIG from '../lib/patentConfig.js';

export default function Footer() {
  const patents = PATENT_CONFIG.displayBothApps();
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--navy)', color: 'rgba(255,255,255,0.6)', padding: '3rem 1.5rem 2rem' }}>
      <div className="section-max">

        {/* TOP ROW */}
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '3rem', marginBottom: '2rem', alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'white', marginBottom: '0.4rem' }}>
              HOACONDInsight™
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
              Powered by Hoa Condo Insight LLC
            </div>
            <div style={{ fontSize: '0.7rem', lineHeight: 1.6, maxWidth: 280 }}>
              61 N Lakeshore Drive<br />
              Hypoluxo, Florida 33462<br />
              peter@hoacondinsight.com<br />
              hoacondinsight.com
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem' }}>
            <div>
              <div style={{ color: 'var(--gold)', fontSize: '0.7rem', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Platform</div>
              {[['/', 'Home'], ['/order', 'Order Report'], ['/features', 'Features'], ['/how-it-works', 'How It Works'], ['/pricing', 'Pricing']].map(([to, label]) => (
                <Link key={to} to={to} style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', textDecoration: 'none', marginBottom: '0.4rem' }}>{label}</Link>
              ))}
            </div>
            <div>
              <div style={{ color: 'var(--gold)', fontSize: '0.7rem', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Enterprise</div>
              {[['/lenders', 'For Lenders'], ['/partners', 'Partner Program'], ['/white-label', 'White Label'], ['/association-portal', 'Association Portal'], ['/attorneys/apply', 'Join Attorney Network']].map(([to, label]) => (
                <Link key={to} to={to} style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', textDecoration: 'none', marginBottom: '0.4rem' }}>{label}</Link>
              ))}
            </div>
            <div>
              <div style={{ color: 'var(--gold)', fontSize: '0.7rem', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Legal</div>
              {[['/legal/terms', 'Terms of Service'], ['/legal/privacy', 'Privacy Policy'], ['/legal/disclaimer', 'Disclaimer'], ['/legal/cancellation', 'Cancellation Policy'], ['/status', 'Platform Status']].map(([to, label]) => (
                <Link key={to} to={to} style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', textDecoration: 'none', marginBottom: '0.4rem' }}>{label}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* PATENT SECTION — shows both applications */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.25rem', marginBottom: '1.25rem' }}>
          <div style={{ color: 'var(--gold)', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
            Intellectual Property — Patent Applications Pending
          </div>

          {patents.map((app, idx) => (
            <div key={idx} style={{ marginBottom: '0.6rem', paddingLeft: '0.75rem', borderLeft: '2px solid rgba(201,168,76,0.35)' }}>
              <div style={{ fontSize: '0.7rem', color: 'white', fontWeight: 600 }}>
                {app.label}: {app.number}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, marginTop: '0.15rem' }}>
                Filed: {app.filed} &nbsp;|&nbsp; Status: {app.status}
              </div>
              <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.1rem', fontStyle: 'italic' }}>
                {app.title}
              </div>
              {app.pending && (
                <div style={{ fontSize: '0.6rem', color: '#f59e0b', marginTop: '0.15rem', fontWeight: 600 }}>
                  ⚠ Update patent number tonight in patentConfig.js
                </div>
              )}
            </div>
          ))}

          <div style={{ fontSize: '0.65rem', marginTop: '0.5rem', color: 'rgba(255,255,255,0.45)' }}>
            {PATENT_CONFIG.TRADEMARKS.map(t => t.mark).join(' · ')} — Trademarks Filed
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ fontSize: '0.7rem' }}>
            © {year} Hoa Condo Insight LLC. All rights reserved. {PATENT_CONFIG.TRADE_SECRET_NOTICE.substring(0, 80)}...
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--gold)' }}>
            {PATENT_CONFIG.footerText()}
          </div>
        </div>

      </div>
    </footer>
  );
}
