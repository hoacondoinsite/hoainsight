import React from 'react';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';

/**
 * PageShell — wraps every public page with Nav + Footer + consistent spacing
 * Applies the Fortune 500 design system automatically
 */
export default function PageShell({ children, heroContent, heroTight = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--off-white)' }}>
      <Nav />
      {heroContent && (
        <section className="hero-gradient" style={{ padding: heroTight ? '3rem 1.5rem' : '4.5rem 1.5rem' }}>
          <div className="section-max" style={{ position: 'relative', zIndex: 1 }}>
            {heroContent}
          </div>
        </section>
      )}
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function PageHero({ eyebrow, title, subtitle, cta }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
      {eyebrow && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '999px', padding: '0.3rem 0.875rem', marginBottom: '1.5rem' }}>
          <span className="label" style={{ color: 'var(--gold)', fontSize: '0.68rem' }}>{eyebrow}</span>
        </div>
      )}
      <h1 className="display-lg animate-fade-up" style={{ color: 'white', marginBottom: '1rem' }}>{title}</h1>
      {subtitle && <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: cta ? '2rem' : 0 }}>{subtitle}</p>}
      {cta && <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>{cta}</div>}
    </div>
  );
}

export function Section({ children, bg = 'white', tight = false }) {
  return (
    <section style={{ padding: tight ? '2.5rem 1.5rem' : '4.5rem 1.5rem', background: bg === 'surface' ? 'var(--surface)' : bg === 'navy' ? 'var(--navy)' : 'white' }}>
      <div className="section-max">{children}</div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, subtitle, center = true }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: '3rem', maxWidth: center ? 600 : 'none', margin: center ? '0 auto 3rem' : '0 0 2.5rem' }}>
      {eyebrow && <p className="label" style={{ color: 'var(--gold)', marginBottom: '0.625rem' }}>{eyebrow}</p>}
      <h2 className="display-md" style={{ color: 'var(--navy)', marginBottom: subtitle ? '0.875rem' : 0 }}>{title}</h2>
      {subtitle && <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginTop: '0.75rem' }}>{subtitle}</p>}
    </div>
  );
}
