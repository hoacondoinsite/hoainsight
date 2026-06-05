import React, { useState } from 'react';
import PATENT_CONFIG from '../../lib/patentConfig.js';

/**
 * Admin IP & Patents Dashboard
 * Shows both patent applications.
 * Peter: to update the second app number tonight, edit patentConfig.js
 * and change: shortNumber: '[UPDATE_TONIGHT]' to your actual number,
 * then set confirmed: true.
 * This page re-reads patentConfig.js automatically on every deploy.
 */
export default function AdminIPPatents() {
  const [copied, setCopied] = useState('');

  const copy = (text, label) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const patents = PATENT_CONFIG.displayBothApps();
  const tms = PATENT_CONFIG.TRADEMARKS;

  const card = (color = '#0a1628') => ({
    background: 'white', borderRadius: 12, padding: '1.5rem',
    border: `3px solid ${color}`, marginBottom: '1.25rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  });

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>

      {/* HEADER */}
      <div style={{ background: '#0a1628', borderRadius: 12, padding: '1.5rem 2rem', marginBottom: '2rem', color: 'white' }}>
        <div style={{ fontSize: '0.8rem', color: '#c9a84c', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
          HOACONDInsight™ Admin
        </div>
        <div style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.4rem' }}>
          Intellectual Property &amp; Patents
        </div>
        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
          Two U.S. patent applications filed. Single source of truth: <code style={{ color: '#c9a84c' }}>src/lib/patentConfig.js</code>
        </div>
      </div>

      {/* UPDATE TONIGHT ALERT */}
      {!PATENT_CONFIG.SECOND_APP.confirmed && (
        <div style={{ background: '#fffbeb', border: '2px solid #f59e0b', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ fontSize: '1.4rem' }}>⚠️</div>
          <div>
            <div style={{ fontWeight: 700, color: '#92400e', marginBottom: '0.3rem' }}>
              ACTION REQUIRED — Update Second Patent Number Tonight
            </div>
            <div style={{ fontSize: '0.85rem', color: '#78350f', lineHeight: 1.6 }}>
              Open <strong>src/lib/patentConfig.js</strong> and replace{' '}
              <code style={{ background: '#fef3c7', padding: '2px 6px', borderRadius: 4 }}>[UPDATE_TONIGHT]</code>{' '}
              with your actual USPTO application number. Then set{' '}
              <code style={{ background: '#fef3c7', padding: '2px 6px', borderRadius: 4 }}>confirmed: true</code>.
              All platform pages update automatically on next Lovable deploy.
            </div>
          </div>
        </div>
      )}

      {/* PATENT APPLICATIONS */}
      <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0a1628', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        Patent Applications ({patents.length})
      </h2>

      {patents.map((app, idx) => (
        <div key={idx} style={card(app.pending ? '#f59e0b' : '#15803d')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <span style={{ background: app.pending ? '#fef3c7' : '#f0fdf4', color: app.pending ? '#92400e' : '#15803d',
                fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {app.pending ? '⚠ Number Pending Entry' : '✓ Confirmed'}
              </span>
              <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
                {app.label}
              </span>
            </div>
            <button
              onClick={() => copy(app.number, `patent-${idx}`)}
              style={{ fontSize: '0.75rem', background: '#0a1628', color: 'white', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>
              {copied === `patent-${idx}` ? '✓ Copied' : 'Copy Number'}
            </button>
          </div>

          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>Application Number</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0a1628', fontFamily: 'monospace' }}>{app.number}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Filed</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{app.filed}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Status</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#15803d' }}>{app.status}</div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.7rem', color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Full Title</div>
            <div style={{ fontSize: '0.8rem', color: '#374151', lineHeight: 1.6, fontStyle: 'italic' }}>{app.title}</div>
          </div>

          {app.pending && (
            <div style={{ marginTop: '1rem', background: '#fffbeb', border: '1px solid #fbbf24', borderRadius: 8, padding: '0.75rem 1rem', fontSize: '0.8rem', color: '#92400e' }}>
              <strong>To update:</strong> Edit <code>src/lib/patentConfig.js</code> → change <code>shortNumber: '[UPDATE_TONIGHT]'</code> to your real number → set <code>confirmed: true</code> → deploy to Lovable.
            </div>
          )}
        </div>
      ))}

      {/* DEADLINES */}
      <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0a1628', margin: '2rem 0 1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        Critical Deadlines
      </h2>
      <div style={card('#dc2626')}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#dc2626', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
              🚨 First App Nonprovisional Deadline
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#dc2626' }}>June 2, 2027</div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.25rem' }}>
              Contact Fish & Richardson before this date.<br />
              <strong>NewMatters@fr.com · 617-542-5070</strong>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#dc2626', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
              🚨 Second App Nonprovisional Deadline
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#dc2626' }}>June 4, 2027</div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.25rem' }}>
              Same attorney — coordinate both filings together.
            </div>
          </div>
        </div>
      </div>

      {/* TRADEMARKS */}
      <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0a1628', margin: '2rem 0 1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        Trademark Filings
      </h2>
      <div style={card('#1d4ed8')}>
        {tms.map((tm, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '0.6rem 0', borderBottom: idx < tms.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{tm.mark}</div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span style={{ background: '#f0fdf4', color: '#15803d', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 12 }}>
                {tm.status}
              </span>
              <span style={{ background: '#eff6ff', color: '#1d4ed8', fontSize: '0.7rem', fontWeight: 600, padding: '2px 8px', borderRadius: 12 }}>
                Class {tm.class}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* TRADE SECRET */}
      <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0a1628', margin: '2rem 0 1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        Trade Secret Notice
      </h2>
      <div style={{ ...card('#6b7280'), background: '#f9fafb' }}>
        <div style={{ fontSize: '0.85rem', color: '#374151', lineHeight: 1.7 }}>
          {PATENT_CONFIG.TRADE_SECRET_NOTICE}
        </div>
      </div>

    </div>
  );
}
