import React, { useState, useMemo } from 'react';
import { ACCESS_LEVELS, SEARCH_FIELDS, PERMANENT_RECORD_RULES, DATA_ISOLATION, generateSampleRecords } from '../../lib/communicationsSearchEngine.js';
import { getDayOneActiveList, getToggleList, DOCUMENT_READING } from '../../lib/communicationsEngine.js';

export default function AdminCommunications({ userRole = 'founder' }) {
  const [tab, setTab] = useState('inbox');
  const [searchTab, setSearchTab] = useState('search');
  const [filters, setFilters] = useState({});
  const [searchActive, setSearchActive] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const records = generateSampleRecords();
  const access = ACCESS_LEVELS[userRole];

  const canSearch = access.canSearchAll;

  const visibleRecords = records.filter(r => {
    if (!access.canSeeAll && r.is_founder_private) return false;
    if (!access.canSeeFounderData && r.is_founder_private) return false;
    return true;
  });

  const filteredRecords = useMemo(() => visibleRecords.filter(r => {
    if (filters.subject && !r.subject.toLowerCase().includes(filters.subject.toLowerCase())) return false;
    if (filters.from && !r.from.toLowerCase().includes(filters.from.toLowerCase())) return false;
    if (filters.to && !r.to.toLowerCase().includes(filters.to.toLowerCase())) return false;
    if (filters.category && r.category !== filters.category) return false;
    if (filters.direction && r.direction !== filters.direction) return false;
    return true;
  }), [filters, visibleRecords]);

  const tabs = [
    { id: 'inbox', label: '📥 All Communications' },
    { id: 'search', label: '🔍 Search Archive', restricted: !canSearch },
    { id: 'platforms', label: '🔗 Platforms' },
    { id: 'permissions', label: '🔐 Permissions', restricted: userRole !== 'founder' },
    { id: 'rules', label: '📋 Compliance Rules' },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--navy)', letterSpacing: '-0.01em' }}>
          Communications Center
        </h2>
        <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          All inbound and outbound communications · Permanent record · C-Suite searchable · Founder data protected
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Total Records', value: String(records.length), sub: 'Permanent — never deleted', color: 'var(--navy)' },
          { label: 'Unread', value: '2', sub: '1 enterprise, 1 press', color: 'var(--red)' },
          { label: 'Today', value: '5', sub: '3 inbound, 2 outbound', color: 'var(--navy)' },
          { label: 'Your Access', value: ACCESS_LEVELS[userRole]?.label, sub: access.canSeeAll ? 'Full archive access' : 'Own records only', color: 'var(--gold)' },
        ].map((s, i) => (
          <div key={i} className="stat-tile">
            <p className="stat-label">{s.label}</p>
            <p className="stat-value" style={{ fontSize: '1.375rem', color: s.color }}>{s.value}</p>
            <p className="stat-sub">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '0.25rem', borderBottom: '1.5px solid var(--border)', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {tabs.map(t => !t.restricted && (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding: '0.6rem 1rem', fontSize: '0.825rem', fontWeight: 600, border: 'none', background: 'transparent', cursor: 'pointer', borderBottom: tab === t.id ? '2px solid var(--gold)' : '2px solid transparent', color: tab === t.id ? 'var(--gold)' : 'var(--text-secondary)', marginBottom: '-1.5px', transition: 'color 0.15s', fontFamily: 'var(--font-body)' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── INBOX TAB ─────────────────────────────────────────── */}
      {tab === 'inbox' && (
        <div>
          {/* Quick filter */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {['All','inbound','outbound','enterprise','legal','press','unread'].map(f => (
              <button key={f} onClick={() => setFilters(f === 'All' ? {} : { direction: ['inbound','outbound'].includes(f) ? f : undefined, category: !['inbound','outbound','All','unread'].includes(f) ? f : undefined })}
                className="btn btn-ghost btn-xs" style={{ background: (f === 'All' && !Object.keys(filters).length) ? 'var(--navy)' : 'var(--surface)', color: (f === 'All' && !Object.keys(filters).length) ? 'white' : 'var(--text-secondary)', borderColor: 'var(--border)' }}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="card">
            {filteredRecords.length === 0 && <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>No records match your filters.</p>}
            {filteredRecords.map((r, i) => (
              <div key={r.id} onClick={() => setSelectedRecord(selectedRecord?.id === r.id ? null : r)}
                style={{ padding: '0.875rem 1.25rem', borderBottom: i < filteredRecords.length - 1 ? '1px solid var(--border-light)' : 'none', display: 'flex', alignItems: 'flex-start', gap: '1rem', cursor: 'pointer', background: selectedRecord?.id === r.id ? 'var(--surface)' : r.status === 'unread' ? 'var(--blue-light)' : 'transparent', transition: 'background 0.12s' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', flexShrink: 0 }}>
                  <span className={`badge ${r.direction === 'inbound' ? 'badge-green' : 'badge-navy'}`}>{r.direction === 'inbound' ? 'IN' : 'OUT'}</span>
                  {r.is_founder_private && <span className="badge badge-amber" style={{ fontSize: '0.55rem' }}>PRIVATE</span>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: r.status === 'unread' ? 700 : 500, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.125rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.subject}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.direction === 'inbound' ? `From: ${r.from}` : `To: ${r.to}`} · {r.platform} · {new Date(r.timestamp).toLocaleString()}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                  <span className={`badge ${r.priority === 'critical' ? 'badge-red' : r.priority === 'high' ? 'badge-amber' : 'badge-gray'}`}>{r.priority}</span>
                  {r.has_attachment && <span style={{ fontSize: '0.75rem' }}>📎</span>}
                  <span className="badge badge-navy">{r.category}</span>
                </div>
              </div>
            ))}
          </div>
          {selectedRecord && (
            <div className="card" style={{ marginTop: '1rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--navy)', marginBottom: '0.375rem' }}>{selectedRecord.subject}</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {selectedRecord.direction === 'inbound' ? `From: ${selectedRecord.from}` : `To: ${selectedRecord.to}`} · {new Date(selectedRecord.timestamp).toLocaleString()}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {selectedRecord.is_founder_private && <span className="badge badge-amber">🔒 Founder Private</span>}
                  <span className="badge badge-navy">Permanent Record · Cannot be deleted</span>
                </div>
              </div>
              <div className="card-inset" style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                [Full message body stored in Supabase email_log table — displayed here when Supabase is connected]
              </div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-faint)', marginTop: '0.75rem' }}>Record ID: {selectedRecord.id} · Permanent · Tamper-proof · {ACCESS_LEVELS[userRole]?.label} access</p>
            </div>
          )}
        </div>
      )}

      {/* ── SEARCH TAB ─────────────────────────────────────────── */}
      {tab === 'search' && access.canSearchAll && (
        <div>
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--navy)', marginBottom: '1.25rem' }}>🔍 Search All Communications — C-Suite Archive</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
              {[
                { id: 'subject', label: 'Subject contains', placeholder: 'e.g. HOA Analysis' },
                { id: 'from',    label: 'Sender email',     placeholder: 'e.g. lender@bank.com' },
                { id: 'to',      label: 'Recipient email',  placeholder: 'e.g. support@...' },
              ].map(f => (
                <div key={f.id}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.375rem' }}>{f.label}</label>
                  <input className="input" placeholder={f.placeholder} value={filters[f.id] || ''} onChange={e => setFilters(p => ({ ...p, [f.id]: e.target.value }))} />
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
              {[
                { id: 'direction', label: 'Direction', options: [['','All'],['inbound','Inbound'],['outbound','Outbound']] },
                { id: 'category',  label: 'Category',  options: [['','All'],['enterprise','Enterprise'],['legal','Legal'],['support','Support'],['press','Press'],['attorneys','Attorneys']] },
              ].map(f => (
                <div key={f.id}>
                  <label style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.375rem' }}>{f.label}</label>
                  <select className="input" value={filters[f.id] || ''} onChange={e => setFilters(p => ({ ...p, [f.id]: e.target.value }))}>
                    {f.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button className="btn btn-navy" onClick={() => setSearchActive(true)} style={{ width: '100%' }}>Search Archive</button>
              </div>
            </div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-faint)' }}>⚠️ All searches are logged permanently with your identity, timestamp, and filters used.</p>
          </div>

          <div className="card">
            <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--navy)' }}>Search Results — {filteredRecords.length} records</p>
              <span className="badge badge-navy">C-Suite Search — {ACCESS_LEVELS[userRole]?.label}</span>
            </div>
            {filteredRecords.map((r, i) => (
              <div key={r.id} style={{ padding: '0.875rem 1.25rem', borderBottom: i < filteredRecords.length - 1 ? '1px solid var(--border-light)' : 'none', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span className={`badge ${r.direction === 'inbound' ? 'badge-green' : 'badge-navy'}`}>{r.direction === 'inbound' ? 'IN' : 'OUT'}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{r.subject}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.from} → {r.to} · {new Date(r.timestamp).toLocaleDateString()}</p>
                </div>
                {r.is_founder_private && <span className="badge badge-amber">🔒 Founder Private</span>}
                <span className="badge badge-gray">{r.category}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PLATFORMS TAB ──────────────────────────────────────── */}
      {tab === 'platforms' && (
        <div>
          <div className="card" style={{ marginBottom: '1.25rem' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="live-dot" />
                <h3 style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy)' }}>Active Day 1 — Free — No Subscription Required</h3>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0' }}>
              {getDayOneActiveList().slice(0, 10).map((p, i) => (
                <div key={p.id} style={{ padding: '1rem 1.25rem', borderBottom: i < 9 ? '1px solid var(--border-light)' : 'none', borderRight: i % 2 === 0 ? '1px solid var(--border-light)' : 'none', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--navy)', marginBottom: '0.125rem' }}>{p.name}</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{p.description}</p>
                  </div>
                  <span className="badge badge-green" style={{ flexShrink: 0 }}>FREE</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card-inset" style={{ padding: '1.25rem 1.5rem' }}>
            <h3 style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--navy)', marginBottom: '0.875rem' }}>Document Reading — All Formats — Active Day 1</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {Object.entries(DOCUMENT_READING).map(([type, info]) => (
                <div key={type} style={{ padding: '0.875rem 1rem', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{type}</p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{info.engine}</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-faint)', marginTop: '0.125rem' }}>{info.accepts.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── PERMISSIONS TAB ─────────────────────────────────────── */}
      {tab === 'permissions' && userRole === 'founder' && (
        <div>
          <div style={{ background: 'var(--amber-light)', border: '1.5px solid rgba(217,119,6,0.3)', borderRadius: 'var(--radius-lg)', padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
            <p style={{ fontWeight: 700, color: 'var(--amber)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>🔐 Founder Private Records</p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(180,100,0,0.85)', lineHeight: 1.6 }}>Records marked "Founder Private" are visible ONLY to you. No employee — not even C-Suite — can see these records unless you explicitly grant access below. Access grants are logged permanently.</p>
          </div>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--navy)', marginBottom: '1.25rem' }}>Grant Access to Founder Records</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.75rem', marginBottom: '1rem', alignItems: 'end' }}>
              <div>
                <label className="stat-label" style={{ marginBottom: '0.375rem' }}>Person to Grant Access</label>
                <input className="input" placeholder="e.g. CFO — jane@hoacondinsight.com" />
              </div>
              <div>
                <label className="stat-label" style={{ marginBottom: '0.375rem' }}>Date Range (optional)</label>
                <input className="input" type="date" />
              </div>
              <button className="btn btn-gold">Grant Access</button>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>All grants are logged permanently. Revoke at any time.</p>
          </div>
          <div className="card" style={{ marginTop: '1rem', padding: '1.5rem' }}>
            <h3 style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy)', marginBottom: '1rem' }}>Access Level Definitions</h3>
            {Object.entries(ACCESS_LEVELS).map(([role, config]) => (
              <div key={role} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.625rem 0', borderBottom: '1px solid var(--border-light)' }}>
                <p style={{ fontWeight: 600, fontSize: '0.825rem', color: 'var(--navy)', textTransform: 'capitalize' }}>{role}</p>
                <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  {config.canSeeAll && <span className="badge badge-navy">See All</span>}
                  {config.canSeeFounderData && <span className="badge badge-amber">Founder Data</span>}
                  {config.canSearchAll && <span className="badge badge-blue">Search All</span>}
                  {!config.canDelete && <span className="badge badge-gray">Cannot Delete</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── RULES TAB ──────────────────────────────────────────── */}
      {tab === 'rules' && (
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--navy)', marginBottom: '1.25rem' }}>Permanent Record Compliance Rules</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.7 }}>These rules mirror Goldman Sachs / JPMorgan FINRA communications archiving standards. They are non-negotiable and cannot be modified by any user.</p>
          {PERMANENT_RECORD_RULES.map((rule, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.875rem', padding: '0.75rem 0', borderBottom: '1px solid var(--border-light)' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--gold)', flexShrink: 0, lineHeight: 1.6 }}>{String(i+1).padStart(2,'0')}.</span>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{rule}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
