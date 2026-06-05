import React, { useState } from 'react';

/**
 * AdminMarketing — HOACONDInsight™ OS v5.1
 * Hoa Condo Insight LLC · 61 N Lakeshore Drive, Hypoluxo, Florida 33462
 */
export default function AdminMarketing() {
  const kpis = [('Campaigns', '0', 'Active'), ('Visitors', '0', 'Connect GA4'), ('Conversions', '0', 'Orders from marketing'), ('Brand Assets', 'Ready', 'All approved')];

  return (
    <div>
      <div style={{ marginBottom:'1.5rem' }}>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'1.75rem', color:'var(--navy)', letterSpacing:'-0.01em' }}>
          ◇ Marketing
        </h2>
        <p style={{ fontSize:'0.825rem', color:'var(--text-muted)', marginTop:'0.25rem' }}>Content, campaigns, SEO, and brand assets.</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'1.5rem' }}>
        {kpis.map((k,i) => (
          <div key={i} className="stat-tile">
            <p className="stat-label">{k[0]}</p>
            <p className="stat-value" style={{ fontSize:'1.5rem' }}>{k[1]}</p>
            <p className="stat-sub">{k[2]}</p>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding:'2rem' }}>
        <div style={{ textAlign:'center', padding:'2.5rem 0', color:'var(--text-muted)' }}>
          <p style={{ fontSize:'2.5rem', marginBottom:'0.875rem', opacity:0.25 }}>◇</p>
          <p style={{ fontWeight:700, color:'var(--navy)', marginBottom:'0.5rem', fontSize:'1rem' }}>Connect Supabase to populate Marketing</p>
          <p style={{ fontSize:'0.825rem', lineHeight:1.75, maxWidth:420, margin:'0 auto' }}>
            All Marketing data is stored in Supabase and displayed here in real time.<br />
            Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Lovable environment variables to activate.
          </p>
        </div>
      </div>
    </div>
  );
}
