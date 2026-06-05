import PATENT_CONFIG from '../../lib/patentConfig.js';
import React from 'react';
import { Link } from 'react-router-dom';
import { REVENUE_SCENARIOS } from '../../lib/revenueEngine.js';
import { calculatePlatformHealthScore } from '../../lib/riskEngine.js';

export default function AdminOverview() {
  const platformScore = calculatePlatformHealthScore({ analysisSuccessRate:100, attorneyComplianceRate:100, avgTurnaround:24, customerSatisfaction:100, systemUptime:100 });
  const daysLeft = Math.max(0, Math.round((new Date('2027-06-02') - new Date()) / (1000*60*60*24)));

  const kpis = [
    { label:'Platform Health',  value:`${platformScore}`,     unit:'/100',    sub:'All systems nominal',            color:'var(--green)' },
    { label:'Reports Today',    value:'0',                    unit:'',        sub:'Connect Supabase for live data',  color:'var(--navy)' },
    { label:'Revenue MTD',      value:'$0',                   unit:'',        sub:'Target: $95,900 yr 1',            color:'var(--navy)' },
    { label:'Patent Deadline',  value:String(daysLeft),       unit:' days',   sub:'June 2, 2027 — CRITICAL',         color:'var(--amber)' },
  ];

  const actions = [
    { text:'Contact Fish & Richardson — begin utility patent prosecution',  priority:'CRITICAL', href:'mailto:NewMatters@fr.com',  hrefLabel:'Email →' },
    { text:'Attorney review of legal pages before accepting live orders',    priority:'CRITICAL', href:'/legal/terms',               hrefLabel:'Review →' },
    { text:'Activate website in Admin → Deployment (after above complete)', priority:'HIGH',     href:null },
    { text:'Connect VITE_SUPABASE_URL environment variable in Lovable',     priority:'HIGH',     href:null },
    { text:'Switch Stripe from test mode to live mode before launch',       priority:'HIGH',     href:null },
  ];

  const priorityStyle = { CRITICAL: { bg:'var(--red-light)', color:'var(--red)', border:'rgba(220,38,38,0.2)' }, HIGH: { bg:'var(--amber-light)', color:'var(--amber)', border:'rgba(217,119,6,0.2)' }, MEDIUM: { bg:'var(--blue-light)', color:'var(--blue)', border:'rgba(29,78,216,0.2)' } };

  return (
    <div>
      {/* Page title */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'2rem', color:'var(--navy)', letterSpacing:'-0.02em', lineHeight:1.2 }}>
          Command Center
        </h2>
        <p style={{ fontSize:'0.8rem', color:'var(--text-muted)', marginTop:'0.375rem' }}>
          HOACONDInsight™ OS v5.1 · Hoa Condo Insight LLC · {new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'})}
        </p>
      </div>

      {/* KPI Row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'1.5rem' }}>
        {kpis.map((k,i) => (
          <div key={i} className="stat-tile" style={{ borderTop:`3px solid ${k.color}` }}>
            <p className="stat-label">{k.label}</p>
            <p className="stat-value">
              <span style={{ color:k.color }}>{k.value}</span>
              {k.unit && <span style={{ fontSize:'0.875rem', color:'var(--text-muted)', fontWeight:400 }}>{k.unit}</span>}
            </p>
            <p className="stat-sub">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem', marginBottom:'1.25rem' }}>
        {/* Action items */}
        <div className="card">
          <div style={{ padding:'1.25rem 1.5rem', borderBottom:'1px solid var(--border-light)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <h3 style={{ fontWeight:700, fontSize:'0.875rem', color:'var(--navy)' }}>Action Items</h3>
            <span className="badge badge-red">{actions.filter(a=>a.priority==='CRITICAL').length} Critical</span>
          </div>
          {actions.map((a,i) => {
            const p = priorityStyle[a.priority] || priorityStyle.MEDIUM;
            return (
              <div key={i} style={{ padding:'0.875rem 1.5rem', borderBottom:i<actions.length-1?'1px solid var(--border-light)':'none', display:'flex', alignItems:'center', gap:'0.875rem' }}>
                <span style={{ padding:'0.2rem 0.5rem', borderRadius:'6px', fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.04em', background:p.bg, color:p.color, border:`1px solid ${p.border}`, flexShrink:0 }}>
                  {a.priority}
                </span>
                <span style={{ fontSize:'0.825rem', color:'var(--text-secondary)', flex:1, lineHeight:1.5 }}>{a.text}</span>
                {a.href && (
                  <a href={a.href} style={{ fontSize:'0.75rem', fontWeight:600, color:'var(--gold)', textDecoration:'none', flexShrink:0 }}>{a.hrefLabel}</a>
                )}
              </div>
            );
          })}
        </div>

        {/* Revenue trajectory */}
        <div className="card">
          <div style={{ padding:'1.25rem 1.5rem', borderBottom:'1px solid var(--border-light)' }}>
            <h3 style={{ fontWeight:700, fontSize:'0.875rem', color:'var(--navy)' }}>Revenue Trajectory</h3>
          </div>
          <div style={{ padding:'0.5rem 0' }}>
            {Object.entries(REVENUE_SCENARIOS).slice(0,5).map(([yr,data],i) => {
              const pct = Math.min((data.revenue / (REVENUE_SCENARIOS.year5?.revenue||1)) * 100, 100);
              return (
                <div key={yr} style={{ padding:'0.625rem 1.5rem', borderBottom:i<4?'1px solid var(--border-light)':'none' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.375rem' }}>
                    <span style={{ fontSize:'0.75rem', fontWeight:600, color:'var(--navy)', textTransform:'capitalize' }}>{yr.replace('year','Year ')}</span>
                    <div style={{ display:'flex', gap:'1rem' }}>
                      <span style={{ fontSize:'0.75rem', fontWeight:700, color:'var(--navy)' }}>${(data.revenue/1e6).toFixed(2)}M</span>
                      <span style={{ fontSize:'0.75rem', color:data.ebitda>0?'var(--green)':'var(--red)', fontWeight:600 }}>{data.ebitda>0?'+':''}${(data.ebitda/1e3).toFixed(0)}K EBITDA</span>
                    </div>
                  </div>
                  <div style={{ height:3, background:'var(--surface)', borderRadius:'999px', overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${pct}%`, background:'linear-gradient(90deg,var(--navy),var(--gold))', borderRadius:'999px', transition:'width 0.5s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* System health row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.25rem' }}>
        {/* Platform status */}
        <div className="card" style={{ padding:'1.25rem 1.5rem' }}>
          <p className="stat-label" style={{ marginBottom:'1rem' }}>System Status</p>
          {[['AI Engine','operational'],['Attorney Network','operational'],['Database','operational'],['Email Delivery','operational'],['Payment Processing','operational']].map(([sys,status])=>(
            <div key={sys} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.425rem 0', borderBottom:'1px solid var(--border-light)' }}>
              <span style={{ fontSize:'0.775rem', color:'var(--text-secondary)' }}>{sys}</span>
              <span style={{ display:'flex', alignItems:'center', gap:'0.375rem', fontSize:'0.72rem', color:'var(--green)', fontWeight:600 }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--green)', display:'inline-block' }} />{status}
              </span>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="card" style={{ padding:'1.25rem 1.5rem' }}>
          <p className="stat-label" style={{ marginBottom:'1rem' }}>Quick Actions</p>
          {[
            ['/order','Order a Report','Place a test or real order'],
            ['/admin','Deployment Control','Activate or deactivate live site'],
            ['/founder','Founder Dashboard','Alerts and revenue overview'],
            ['/emergency-ops','Emergency Ops','Emergency communications'],
            ['/sample-report','Sample Report','View demo HOA analysis'],
          ].map(([path,label,sub])=>(
            <Link key={path} to={path} style={{ display:'block', padding:'0.5rem 0', borderBottom:'1px solid var(--border-light)', textDecoration:'none' }}>
              <p style={{ fontSize:'0.8rem', fontWeight:600, color:'var(--navy)' }}>{label}</p>
              <p style={{ fontSize:'0.72rem', color:'var(--text-muted)' }}>{sub}</p>
            </Link>
          ))}
        </div>

        {/* Patent countdown */}
        <div className="card-navy" style={{ padding:'1.5rem', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div>
            <p style={{ fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:'0.75rem' }}>Patent Prosecution</p>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'3.5rem', color:'var(--gold)', lineHeight:1, marginBottom:'0.5rem' }}>{daysLeft}</div>
            <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.6)' }}>days until June 2, 2027 deadline</p>
          </div>
          <div style={{ marginTop:'1.5rem' }}>
            <p style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.4)', lineHeight:1.6 }}>U.S. Utility Patent Application No. 64/081,022</p>
            <a href="mailto:NewMatters@fr.com" style={{ marginTop:'0.75rem', display:'inline-flex', alignItems:'center', gap:'0.375rem', fontSize:'0.775rem', fontWeight:700, color:'var(--gold)', textDecoration:'none', background:'rgba(201,168,76,0.12)', padding:'0.5rem 0.875rem', borderRadius:'8px', border:'1px solid rgba(201,168,76,0.25)' }}>
              Contact Fish &amp; Richardson →
            </a>
          </div>
        
      {/* IP & PATENTS CARD */}
      <div style={{ background: 'white', border: '3px solid #c9a84c', borderRadius: 12, padding: '1.5rem', cursor: 'pointer' }}
        onClick={() => window.location.href = '/admin/ip-patents'}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <div style={{ fontSize: '1.4rem' }}>⚖️</div>
          {!PATENT_CONFIG.SECOND_APP.confirmed && (
            <span style={{ background: '#fef3c7', color: '#92400e', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 12, textTransform: 'uppercase' }}>
              Action Required
            </span>
          )}
        </div>
        <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem' }}>IP &amp; Patents</div>
        <div style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.5 }}>
          {PATENT_CONFIG.displayBothApps().length} Applications Filed<br />
          App 1: {PATENT_CONFIG.FIRST_APP.shortNumber}<br />
          App 2: {PATENT_CONFIG.SECOND_APP.confirmed ? PATENT_CONFIG.SECOND_APP.shortNumber : '⚠ Update Tonight'}
        </div>
      </div>
</div>
      </div>
    </div>
  );
}
