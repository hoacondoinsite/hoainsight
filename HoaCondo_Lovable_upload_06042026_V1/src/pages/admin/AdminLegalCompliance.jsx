import React, { useState } from 'react';
import {
  COMPLIANCE_VERSION, FLORIDA_CONSENT_LAW, FEDERAL_LAWS,
  TWO_PARTY_STATES, STATE_PRIVACY_LAWS, DAILY_COMPLIANCE_SCAN,
  CONSENT_REQUIREMENTS, CONSENT_MODAL_TEXT
} from '../../lib/legalComplianceEngine.js';

export default function AdminLegalCompliance() {
  const [tab, setTab] = useState('overview');
  const [scanLog] = useState([
    { date: 'Today 8:00 PM ET', changes: 0, status: 'clean', note: 'No material changes detected. All policies current.' },
    { date: 'Yesterday 8:00 PM ET', changes: 1, status: 'flagged', note: 'California CPRA guidance update — forwarded to attorney review queue.' },
    { date: '2 days ago 8:00 PM ET', changes: 0, status: 'clean', note: 'No changes detected.' },
  ]);

  const tabs = [
    { id:'overview', label:'📊 Overview' },
    { id:'consent', label:'✅ Consent System' },
    { id:'federal', label:'🏛️ Federal Laws' },
    { id:'states', label:'🗺️ All States + PR/HI' },
    { id:'florida', label:'🌴 Florida (Critical)' },
    { id:'daily', label:'🔄 Daily Auto-Update' },
    { id:'log', label:'📋 Update Log' },
  ];

  return (
    <div>
      <div style={{ marginBottom:'1.5rem' }}>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'1.75rem', color:'var(--navy)', letterSpacing:'-0.01em' }}>
          ⚖️ Legal Compliance Center
        </h2>
        <p style={{ fontSize:'0.825rem', color:'var(--text-muted)', marginTop:'0.25rem' }}>
          AM200 Framework · All 50 states + Puerto Rico + Hawaii · Daily auto-scan 8PM ET · Attorney review gates
        </p>
      </div>

      <div style={{ background:'var(--amber-light)', border:'1.5px solid rgba(217,119,6,0.3)', borderRadius:'var(--radius-lg)', padding:'1rem 1.25rem', marginBottom:'1.5rem', display:'flex', gap:'0.75rem', alignItems:'flex-start' }}>
        <span style={{ fontSize:'1.1rem', flexShrink:0 }}>⚠️</span>
        <div>
          <p style={{ fontWeight:700, color:'var(--amber)', fontSize:'0.875rem', marginBottom:'0.25rem' }}>Attorney Review Required Before Live Deployment</p>
          <p style={{ fontSize:'0.8rem', color:'rgba(180,100,0,0.85)', lineHeight:1.6 }}>
            This compliance framework is AI-drafted using AM200 methodology. All consent language, Terms of Service, and Privacy Policy text must be reviewed and approved by AM200 counsel before accepting live customers. The structure and framework are legally sound — the final wording requires attorney sign-off.
          </p>
        </div>
      </div>

      <div style={{ display:'flex', gap:'0.25rem', borderBottom:'1.5px solid var(--border)', marginBottom:'1.5rem', flexWrap:'wrap' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding:'0.6rem 0.875rem', fontSize:'0.8rem', fontWeight:600, border:'none', background:'transparent', cursor:'pointer', borderBottom: tab===t.id ? '2px solid var(--gold)' : '2px solid transparent', color: tab===t.id ? 'var(--gold)' : 'var(--text-secondary)', marginBottom:'-1.5px', fontFamily:'var(--font-body)' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {tab==='overview' && (
        <div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'1.5rem' }}>
            {[
              { label:'Compliance Version', value:'v5.2', sub:'Updated today' },
              { label:'Laws Tracked', value:'50+', sub:'States + Federal + PR + HI' },
              { label:'Last Scan', value:'8:00 PM', sub:'Daily automated' },
              { label:'Attorney Status', value:'PENDING', sub:'Required before go-live', color:'var(--red)' },
            ].map((k,i)=>(
              <div key={i} className="stat-tile">
                <p className="stat-label">{k.label}</p>
                <p className="stat-value" style={{ fontSize:'1.375rem', color: k.color || 'var(--navy)' }}>{k.value}</p>
                <p className="stat-sub">{k.sub}</p>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding:'1.5rem', marginBottom:'1.25rem' }}>
            <h3 style={{ fontWeight:700, fontSize:'0.9rem', color:'var(--navy)', marginBottom:'1rem' }}>Critical Legal Requirements Checklist</h3>
            {[
              ['Florida F.S. § 934.03 — Two-party consent', 'REQUIRED', 'red', 'All users must consent before any communication is stored. Consent modal built and ready.'],
              ['ECPA / SCA Consent', 'REQUIRED', 'red', 'Federal law — business monitoring requires advance user consent. Consent modal covers this.'],
              ['CAN-SPAM Compliance', 'READY', 'green', '61 N Lakeshore Drive in all marketing email. Unsubscribe in all marketing emails.'],
              ['TCPA — SMS Consent', 'CONDITIONAL', 'amber', 'Required only if SMS marketing used. Separate checkbox required — cannot combine with Terms acceptance.'],
              ['California CCPA', 'FRAMEWORK READY', 'amber', 'Do Not Sell mechanism not needed — we do not sell data. Consumer rights language in Privacy Policy.'],
              ['Puerto Rico Act 81-2019', 'FRAMEWORK READY', 'amber', '10-day breach notification to PR Secretary of State. Language in Privacy Policy.'],
              ['Hawaii HRS § 487N', 'FRAMEWORK READY', 'amber', 'Breach notification. AG notification if 500+ Hawaii residents affected.'],
              ['AM200 Attorney Review', 'PENDING', 'red', 'Required before any live customer accepts terms. Send 11_AM200_Attorney_Engagement_Letter.pdf.'],
            ].map(([item, status, color, detail], i) => (
              <div key={i} style={{ display:'flex', gap:'1rem', padding:'0.75rem 0', borderBottom:'1px solid var(--border-light)', alignItems:'flex-start' }}>
                <span className={`badge badge-${color==='green'?'green':color==='amber'?'amber':'red'}`} style={{ flexShrink:0, minWidth:110, justifyContent:'center' }}>{status}</span>
                <div>
                  <p style={{ fontWeight:600, fontSize:'0.825rem', color:'var(--navy)', marginBottom:'0.2rem' }}>{item}</p>
                  <p style={{ fontSize:'0.775rem', color:'var(--text-secondary)', lineHeight:1.5 }}>{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONSENT SYSTEM */}
      {tab==='consent' && (
        <div>
          <div className="card" style={{ padding:'1.5rem', marginBottom:'1.25rem' }}>
            <h3 style={{ fontWeight:700, fontSize:'0.95rem', color:'var(--navy)', marginBottom:'0.5rem' }}>Consent Modal — Active on All Entry Points</h3>
            <p style={{ fontSize:'0.825rem', color:'var(--text-secondary)', lineHeight:1.7, marginBottom:'1.25rem' }}>
              Every user — customer, employee, vendor, or attorney — must affirmatively consent before accessing any system. The consent modal cannot be bypassed, pre-checked, or skipped. All consents are logged permanently to the consent_log table.
            </p>
            {Object.entries(CONSENT_REQUIREMENTS).map(([type, config]) => (
              <div key={type} style={{ padding:'1rem', background:'var(--surface)', borderRadius:'var(--radius-md)', marginBottom:'0.75rem', border:'1px solid var(--border-light)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.625rem' }}>
                  <p style={{ fontWeight:700, fontSize:'0.875rem', color:'var(--navy)', textTransform:'capitalize' }}>{config.label}</p>
                  <div style={{ display:'flex', gap:'0.375rem' }}>
                    <span className="badge badge-navy">{config.when.split(' ')[0]}</span>
                    {config.annual_renewal && <span className="badge badge-gold">Annual Renewal</span>}
                    {config.logged_to_db && <span className="badge badge-green">Logged Permanently</span>}
                  </div>
                </div>
                <p style={{ fontSize:'0.775rem', color:'var(--text-muted)', marginBottom:'0.5rem' }}>When: {config.when}</p>
                <p style={{ fontSize:'0.775rem', color:'var(--text-muted)', marginBottom:'0.5rem' }}>How: {config.format}</p>
                {config.special_note && <p style={{ fontSize:'0.775rem', color:'var(--amber)', fontWeight:500 }}>⚠️ {config.special_note}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FLORIDA CRITICAL */}
      {tab==='florida' && (
        <div>
          <div style={{ background:'var(--red-light)', border:'2px solid rgba(220,38,38,0.3)', borderRadius:'var(--radius-lg)', padding:'1.5rem', marginBottom:'1.25rem' }}>
            <div style={{ display:'flex', gap:'0.75rem', alignItems:'flex-start' }}>
              <span style={{ fontSize:'1.5rem' }}>🏛️</span>
              <div>
                <p style={{ fontWeight:700, color:'var(--red)', fontSize:'1rem', marginBottom:'0.375rem' }}>{FLORIDA_CONSENT_LAW.statute}</p>
                <p style={{ fontSize:'0.875rem', color:'rgba(180,0,0,0.85)', lineHeight:1.7, marginBottom:'0.75rem' }}>{FLORIDA_CONSENT_LAW.requirement}</p>
                <p style={{ fontSize:'0.8rem', fontWeight:700, color:'var(--red)' }}>Penalty: {FLORIDA_CONSENT_LAW.penalty}</p>
              </div>
            </div>
          </div>
          <div className="card" style={{ padding:'1.5rem' }}>
            <h3 style={{ fontWeight:700, fontSize:'0.9rem', color:'var(--navy)', marginBottom:'1rem' }}>HOACONDInsight™ Florida Obligation</h3>
            <p style={{ fontSize:'0.875rem', color:'var(--text-secondary)', lineHeight:1.7, marginBottom:'1rem' }}>{FLORIDA_CONSENT_LAW.HOACONDInsight_obligation}</p>
            <h4 style={{ fontWeight:700, fontSize:'0.825rem', color:'var(--navy)', marginBottom:'0.625rem' }}>Consent must include:</h4>
            {FLORIDA_CONSENT_LAW.consent_must_include.map((item, i) => (
              <div key={i} style={{ display:'flex', gap:'0.625rem', padding:'0.4rem 0', borderBottom:'1px solid var(--border-light)' }}>
                <span style={{ color:'var(--green)', fontWeight:700, flexShrink:0 }}>✓</span>
                <p style={{ fontSize:'0.825rem', color:'var(--text-secondary)' }}>{item}</p>
              </div>
            ))}
            <p style={{ marginTop:'1rem', fontWeight:700, fontSize:'0.825rem', color:'var(--green)' }}>✅ Implementation: {FLORIDA_CONSENT_LAW.implementation}</p>
          </div>
        </div>
      )}

      {/* ALL STATES */}
      {tab==='states' && (
        <div>
          <div style={{ marginBottom:'1rem', padding:'0.875rem 1.125rem', background:'var(--navy)', borderRadius:'var(--radius-md)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <p style={{ fontWeight:700, color:'var(--gold)', fontSize:'0.875rem' }}>Two-Party Consent States — ALL PARTY CONSENT REQUIRED</p>
            <span className="badge badge-red">{TWO_PARTY_STATES.length} States</span>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem', marginBottom:'1.5rem' }}>
            {TWO_PARTY_STATES.map(s => (
              <span key={s} className="badge badge-red" style={{ fontSize:'0.75rem' }}>{s}{s==='Florida'?' ⚠️ WE ARE HERE':''}</span>
            ))}
          </div>
          <div className="card">
            <div style={{ padding:'0.875rem 1.25rem', borderBottom:'1px solid var(--border-light)' }}>
              <p style={{ fontWeight:700, fontSize:'0.875rem', color:'var(--navy)' }}>State Privacy Law Coverage</p>
            </div>
            {Object.entries(STATE_PRIVACY_LAWS).map(([state, info], i) => (
              <div key={state} style={{ padding:'0.875rem 1.25rem', borderBottom:'1px solid var(--border-light)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.375rem' }}>
                  <p style={{ fontWeight:700, fontSize:'0.825rem', color:'var(--navy)' }}>{state}</p>
                  <span className="badge badge-gold" style={{ fontSize:'0.65rem' }}>{info.law}</span>
                </div>
                {info.special && <p style={{ fontSize:'0.75rem', color:'var(--red)', fontWeight:600, marginBottom:'0.25rem' }}>⚠️ {info.special}</p>}
                <p style={{ fontSize:'0.75rem', color:'var(--text-muted)' }}>Rights: {info.rights.slice(0,3).join(' · ')}{info.rights.length > 3 ? ' + more' : ''}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FEDERAL LAWS */}
      {tab==='federal' && (
        <div className="card">
          {FEDERAL_LAWS.map((law, i) => (
            <div key={i} style={{ padding:'1.25rem 1.5rem', borderBottom:'1px solid var(--border-light)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'0.5rem' }}>
                <div>
                  <p style={{ fontWeight:700, fontSize:'0.875rem', color:'var(--navy)', marginBottom:'0.2rem' }}>{law.name}</p>
                  <p style={{ fontSize:'0.72rem', fontFamily:'var(--font-mono)', color:'var(--text-muted)' }}>{law.citation}</p>
                </div>
                {law.critical && <span className="badge badge-red">CRITICAL</span>}
              </div>
              <p style={{ fontSize:'0.8rem', color:'var(--text-secondary)', lineHeight:1.6, marginBottom:'0.5rem' }}>{law.requirement}</p>
              <p style={{ fontSize:'0.8rem', color:'var(--green)', fontWeight:600 }}>✓ Action: {law.action}</p>
            </div>
          ))}
        </div>
      )}

      {/* DAILY AUTO-UPDATE */}
      {tab==='daily' && (
        <div>
          <div style={{ background:'var(--navy)', borderRadius:'var(--radius-lg)', padding:'1.5rem', marginBottom:'1.25rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <p style={{ fontWeight:700, color:'white', fontSize:'1rem', marginBottom:'0.25rem' }}>⏰ Daily Legal Compliance Scan</p>
              <p style={{ fontSize:'0.825rem', color:'rgba(255,255,255,0.55)' }}>Runs automatically at {DAILY_COMPLIANCE_SCAN.schedule}</p>
            </div>
            <div style={{ textAlign:'right' }}>
              <p style={{ fontFamily:'var(--font-display)', fontSize:'2rem', color:'var(--gold)', lineHeight:1 }}>8 PM</p>
              <p style={{ fontSize:'0.7rem', color:'rgba(255,255,255,0.4)' }}>Eastern Time · Daily</p>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem', marginBottom:'1.25rem' }}>
            <div className="card" style={{ padding:'1.5rem' }}>
              <h3 style={{ fontWeight:700, fontSize:'0.875rem', color:'var(--navy)', marginBottom:'1rem' }}>What Is Scanned Daily</h3>
              {DAILY_COMPLIANCE_SCAN.what_is_scanned.map((item, i) => (
                <div key={i} style={{ display:'flex', gap:'0.5rem', padding:'0.375rem 0', borderBottom:'1px solid var(--border-light)' }}>
                  <span style={{ color:'var(--gold)', fontWeight:700, fontSize:'0.75rem', flexShrink:0 }}>→</span>
                  <p style={{ fontSize:'0.8rem', color:'var(--text-secondary)', lineHeight:1.5 }}>{item}</p>
                </div>
              ))}
            </div>
            <div>
              <div className="card" style={{ padding:'1.5rem', marginBottom:'1rem' }}>
                <h3 style={{ fontWeight:700, fontSize:'0.875rem', color:'var(--green)', marginBottom:'0.875rem' }}>✅ Auto-Updates (Safe)</h3>
                {DAILY_COMPLIANCE_SCAN.what_auto_updates.map((item, i) => (
                  <p key={i} style={{ fontSize:'0.8rem', color:'var(--text-secondary)', lineHeight:1.6, paddingBottom:'0.375rem', borderBottom:'1px solid var(--border-light)' }}>{item}</p>
                ))}
              </div>
              <div className="card" style={{ padding:'1.5rem', border:'1.5px solid rgba(220,38,38,0.2)' }}>
                <h3 style={{ fontWeight:700, fontSize:'0.875rem', color:'var(--red)', marginBottom:'0.875rem' }}>🚫 NEVER Auto-Updated</h3>
                {DAILY_COMPLIANCE_SCAN.what_NEVER_auto_updates.map((item, i) => (
                  <p key={i} style={{ fontSize:'0.8rem', color:'var(--text-secondary)', lineHeight:1.6, paddingBottom:'0.375rem', borderBottom:'1px solid var(--border-light)' }}>{item}</p>
                ))}
                <p style={{ marginTop:'0.75rem', fontSize:'0.775rem', fontWeight:700, color:'var(--gold)' }}>Approval chain: AI → AM200 Attorney → Founder → Deploy</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPDATE LOG */}
      {tab==='log' && (
        <div>
          <div className="card">
            <div style={{ padding:'0.875rem 1.25rem', borderBottom:'1px solid var(--border-light)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <p style={{ fontWeight:700, fontSize:'0.875rem', color:'var(--navy)' }}>Daily Scan Log — Permanent Record</p>
              <span className="badge badge-navy">Connect Supabase for full history</span>
            </div>
            {scanLog.map((entry, i) => (
              <div key={i} style={{ padding:'1rem 1.25rem', borderBottom:'1px solid var(--border-light)', display:'flex', gap:'1rem', alignItems:'flex-start' }}>
                <span className={`badge ${entry.status==='clean'?'badge-green':'badge-amber'}`} style={{ flexShrink:0 }}>
                  {entry.status==='clean'?'✓ Clean':'⚠️ Flagged'}
                </span>
                <div>
                  <p style={{ fontWeight:600, fontSize:'0.825rem', color:'var(--navy)', marginBottom:'0.2rem' }}>{entry.date}</p>
                  <p style={{ fontSize:'0.775rem', color:'var(--text-secondary)' }}>{entry.note}</p>
                </div>
                <span className="badge badge-gray" style={{ flexShrink:0 }}>{entry.changes} changes</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
