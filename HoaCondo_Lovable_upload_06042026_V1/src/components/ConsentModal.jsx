import React, { useState } from 'react';
import { CONSENT_MODAL_TEXT, FLORIDA_CONSENT_LAW } from '../lib/legalComplianceEngine.js';

/**
 * ConsentModal — Required before any system access
 * Florida two-party consent compliance (F.S. § 934.03)
 * Must be affirmative click — cannot be pre-checked or bypassed
 * Consent logged permanently to Supabase consent_log table
 */
export default function ConsentModal({ onConsent, onDecline, userType = 'customer' }) {
  const [checked, setChecked] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = (e) => {
    const el = e.target;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
      setScrolled(true);
    }
  };

  if (declined) {
    return (
      <div style={{ position:'fixed', inset:0, background:'rgba(6,14,26,0.97)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', padding:'1.5rem' }}>
        <div style={{ background:'white', borderRadius:'var(--radius-xl)', padding:'3rem', maxWidth:480, textAlign:'center' }}>
          <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🔒</div>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', color:'var(--navy)', marginBottom:'1rem' }}>Access Unavailable</h2>
          <p style={{ color:'var(--text-secondary)', fontSize:'0.9rem', lineHeight:1.7, marginBottom:'2rem' }}>{CONSENT_MODAL_TEXT.decline_consequence}</p>
          <button onClick={() => setDeclined(false)} className="btn btn-navy" style={{ marginRight:'0.75rem' }}>← Go Back and Consent</button>
          <a href="/" className="btn btn-ghost">Exit Platform</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(6,14,26,0.95)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem', overflowY:'auto' }}>
      <div style={{ background:'white', borderRadius:'var(--radius-xl)', maxWidth:680, width:'100%', boxShadow:'0 24px 80px rgba(0,0,0,0.4)', margin:'auto' }}>
        
        {/* Header */}
        <div style={{ background:'var(--navy)', borderRadius:'var(--radius-xl) var(--radius-xl) 0 0', padding:'1.75rem 2rem' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.375rem' }}>
            <span style={{ fontSize:'1.25rem' }}>⚖️</span>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:'1.375rem', color:'white' }}>{CONSENT_MODAL_TEXT.title}</h2>
          </div>
          <p style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.5)' }}>Hoa Condo Insight LLC · Hypoluxo, Florida · Required by Florida F.S. § 934.03</p>
        </div>

        {/* Florida notice */}
        <div style={{ background:'var(--amber-light)', border:'1px solid rgba(217,119,6,0.3)', margin:'1.5rem 2rem 0', padding:'0.875rem 1.125rem', borderRadius:'var(--radius-md)', display:'flex', gap:'0.625rem' }}>
          <span style={{ fontSize:'0.9rem', flexShrink:0 }}>🏛️</span>
          <p style={{ fontSize:'0.8rem', color:'var(--amber)', lineHeight:1.6, fontWeight:500 }}>{CONSENT_MODAL_TEXT.florida_notice}</p>
        </div>

        {/* Scrollable consent text */}
        <div style={{ margin:'1.25rem 2rem 0' }}>
          <p style={{ fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'0.5rem' }}>
            Please read carefully — scroll to bottom to enable consent
          </p>
          <div onScroll={handleScroll}
            style={{ height:220, overflowY:'auto', background:'var(--surface)', borderRadius:'var(--radius-md)', border:'1px solid var(--border)', padding:'1rem 1.125rem', fontSize:'0.825rem', color:'var(--text-secondary)', lineHeight:1.75 }}>
            <pre style={{ whiteSpace:'pre-wrap', fontFamily:'var(--font-body)', fontSize:'0.825rem', margin:0 }}>
              {CONSENT_MODAL_TEXT.main_disclosure}
            </pre>
          </div>
          {!scrolled && (
            <p style={{ fontSize:'0.7rem', color:'var(--text-faint)', marginTop:'0.375rem', textAlign:'center' }}>↓ Scroll to read all terms and enable consent</p>
          )}
        </div>

        {/* Checkbox */}
        <div style={{ margin:'1.25rem 2rem', padding:'1rem 1.125rem', background:'var(--surface)', borderRadius:'var(--radius-md)', border:`1.5px solid ${checked ? 'var(--gold)' : 'var(--border)'}`, transition:'border-color 0.15s' }}>
          <label style={{ display:'flex', gap:'0.875rem', alignItems:'flex-start', cursor: scrolled ? 'pointer' : 'not-allowed', opacity: scrolled ? 1 : 0.5 }}>
            <input type="checkbox" checked={checked} onChange={e => scrolled && setChecked(e.target.checked)}
              disabled={!scrolled}
              style={{ width:18, height:18, marginTop:2, accentColor:'var(--gold)', flexShrink:0, cursor: scrolled ? 'pointer' : 'not-allowed' }} />
            <span style={{ fontSize:'0.825rem', color:'var(--text-primary)', lineHeight:1.6 }}>
              <strong>{CONSENT_MODAL_TEXT.checkbox_label}</strong>
            </span>
          </label>
        </div>

        {/* Attorney note */}
        <div style={{ margin:'0 2rem', padding:'0.75rem 1rem', background:'var(--blue-light)', borderRadius:'var(--radius-sm)', fontSize:'0.72rem', color:'var(--blue)' }}>
          {CONSENT_MODAL_TEXT.attorney_note}
        </div>

        {/* Buttons */}
        <div style={{ padding:'1.25rem 2rem 1.75rem', display:'flex', gap:'0.75rem' }}>
          <button
            onClick={onConsent}
            disabled={!checked}
            className="btn btn-gold"
            style={{ flex:1, opacity: checked ? 1 : 0.4, cursor: checked ? 'pointer' : 'not-allowed', fontSize:'0.875rem', padding:'0.875rem' }}>
            {CONSENT_MODAL_TEXT.button_label}
          </button>
          <button onClick={() => setDeclined(true)} className="btn btn-ghost btn-sm" style={{ color:'var(--text-muted)' }}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
