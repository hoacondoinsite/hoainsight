import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  const isActive = (p) => loc.pathname === p;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav className="topnav" style={{ background: scrolled ? 'rgba(6,14,26,0.97)' : 'var(--navy-deep)', backdropFilter: 'blur(16px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: '0.1rem' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--gold)', letterSpacing: '-0.02em' }}>HOACOND</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', fontWeight: 700, color: 'white', letterSpacing: '0.04em' }}>Insight™</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden md:flex">
          {[
            ['/how-it-works','How It Works'],
            ['/features','Features'],
            ['/pricing','Pricing'],
            ['/lenders','Lenders'],
            ['/partners','Partners'],
            ['/white-label','White Label'],
            ['/association-portal','Associations'],
          ].map(([path, label]) => (
            <Link key={path} to={path}
              className={`topnav-link${isActive(path) ? ' active' : ''}`}
              style={{ padding: '0.4rem 0.75rem', borderRadius: '8px', textDecoration: 'none',
                background: isActive(path) ? 'rgba(201,168,76,0.1)' : 'transparent' }}>
              {label}
            </Link>
          ))}
          <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.12)', margin: '0 0.5rem' }} />
          <Link to="/order" className="btn btn-gold btn-sm">
            Order Report — $39
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }} className="flex md:hidden">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[0,1,2].map(i => <span key={i} style={{ width: 22, height: 2, background: 'white', display: 'block', transition: 'all 0.2s',
              transform: open ? (i===0 ? 'rotate(45deg) translateY(6px)' : i===2 ? 'rotate(-45deg) translateY(-6px)' : 'scaleX(0)') : 'none' }} />)}
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'var(--navy-deep)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '1rem 1.5rem 1.5rem' }}>
          {[['/how-it-works','How It Works'],['/features','Features'],['/pricing','Pricing'],['/lenders','Lenders'],['/white-label','White Label'],['/association-portal','Associations']].map(([path,label]) => (
            <Link key={path} to={path} onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '0.625rem 0', color: 'rgba(255,255,255,0.75)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
              {label}
            </Link>
          ))}
          <Link to="/order" onClick={() => setOpen(false)} className="btn btn-gold" style={{ marginTop: '1rem', width: '100%' }}>
            Order Report — $39
          </Link>
        </div>
      )}
    </nav>
  );
}
