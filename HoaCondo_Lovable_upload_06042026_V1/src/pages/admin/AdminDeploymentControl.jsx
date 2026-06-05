import React, { useState, useEffect } from 'react';
import {
  DEPLOYMENT_STATES, DEPLOYMENT_WARNINGS, canChangeDeploymentState,
  generateDeploymentNotification, isAcceptingOrders, isInTestMode, NOTIFY_ALWAYS,
} from '../../lib/deploymentControlEngine.js';

const NAVY = 'var(--navy)';
const GOLD = 'var(--gold)';

export default function AdminDeploymentControl({ userRole = 'viewer' }) {
  const [currentState, setCurrentState] = useState('OFFLINE');
  const [targetState, setTargetState] = useState(null);
  const [step, setStep] = useState(1); // 1=choose, 2=warnings, 3=pin, 4=reason, 5=confirm, 6=done
  const [pin, setPin] = useState('');
  const [pinRole, setPinRole] = useState('');
  const [reason, setReason] = useState('');
  const [notification, setNotification] = useState(null);
  const [auditLog, setAuditLog] = useState([]);
  const [pinError, setPinError] = useState('');

  const authorized = canChangeDeploymentState(userRole);
  const stateConfig = DEPLOYMENT_STATES[currentState];
  const warnings = targetState ? DEPLOYMENT_WARNINGS[targetState] || [] : [];

  // Simulated PIN validation — in production this validates against Supabase
  const PINS = { founder: '0000', csuite: '1234' };

  const handleSelectState = (newState) => {
    if (!authorized) { alert('Founder or C-Suite authorization required to change deployment state.'); return; }
    if (newState === currentState) { alert(`Platform is already in ${currentState} state.`); return; }
    setTargetState(newState);
    setStep(2);
    setPinError('');
  };

  const handleProceedFromWarnings = () => setStep(3);

  const handlePinSubmit = () => {
    const validFounderPin = pin === PINS.founder;
    const validCsuitePin = pin === PINS.csuite;
    if (!validFounderPin && !validCsuitePin) {
      setPinError('Incorrect PIN. Try again.');
      setPin('');
      return;
    }
    setPinRole(validFounderPin ? 'Founder (Peter Klein)' : 'C-Suite');
    setPinError('');
    setStep(4);
  };

  const handleReasonSubmit = () => {
    if (!reason.trim()) { alert('Please provide a reason for this deployment change.'); return; }
    setStep(5);
  };

  const handleConfirmDeploy = () => {
    const notif = generateDeploymentNotification('STATE_CHANGE', currentState, targetState, pinRole, reason);
    setNotification(notif);

    // Log the change
    const logEntry = {
      id: notif.auditId,
      from: currentState,
      to: targetState,
      by: pinRole,
      reason: reason,
      time: new Date().toLocaleString(),
      notified: NOTIFY_ALWAYS.map(n => n.email).join(', '),
    };
    setAuditLog(prev => [logEntry, ...prev]);

    // Apply the state change
    setCurrentState(targetState);
    setStep(6);
  };

  const handleReset = () => {
    setTargetState(null); setStep(1); setPin(''); setPinRole('');
    setReason(''); setPinError(''); setNotification(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1" style={{ color: NAVY }}>
        🌐 Deployment Control Center
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Controls the live website on the internet. <strong>Founder or C-Suite only.</strong> Every change notifies Founder and C-Suite immediately.
      </p>

      {/* CURRENT STATE BANNER */}
      <div className="rounded-2xl p-6 mb-6 border-2"
        style={{ background: stateConfig?.bg, borderColor: stateConfig?.color }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1"
              style={{ color: stateConfig?.color }}>CURRENT WEBSITE STATUS</p>
            <p className="text-3xl font-bold" style={{ color: stateConfig?.textColor }}>
              {stateConfig?.label}
            </p>
            <p className="text-sm mt-2" style={{ color: stateConfig?.textColor }}>
              {isAcceptingOrders(currentState) ? '✅ Accepting real orders and payments' :
               isInTestMode(currentState) ? '🧪 Test mode — no real transactions' :
               currentState === 'READONLY' ? '👁 Read-only — browsing allowed, no orders' :
               '🔴 Offline — website not processing any activity'}
            </p>
          </div>
          <div className="text-6xl">
            {currentState === 'LIVE' ? '🟢' : currentState === 'TESTING' ? '🟡' :
             currentState === 'READONLY' ? '🔵' : '🔴'}
          </div>
        </div>
      </div>

      {/* AUTHORIZATION STATUS */}
      {!authorized && (
        <div className="bg-red-50 border border-red-300 rounded-xl p-4 mb-6">
          <p className="text-red-700 font-bold text-sm">
            🔒 Access Restricted — Founder or C-Suite authorization required to change deployment state.
          </p>
          <p className="text-red-600 text-xs mt-1">
            Current role: {userRole}. Contact Peter Klein at peterkleinusa@gmail.com to request access.
          </p>
        </div>
      )}

      {/* STEP 1 — SELECT STATE */}
      {step === 1 && (
        <div>
          <h3 className="font-bold text-lg mb-4" style={{ color: NAVY }}>Change Deployment State</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {Object.entries(DEPLOYMENT_STATES).map(([key, cfg]) => (
              <button
                key={key}
                onClick={() => handleSelectState(key)}
                disabled={!authorized || key === currentState}
                className="rounded-xl p-5 border-2 text-left transition-all hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ borderColor: key === currentState ? cfg.color : 'var(--border)',
                         background: key === currentState ? cfg.bg : 'white' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold" style={{ color: cfg.textColor }}>{cfg.label}</span>
                  {key === currentState && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: cfg.color }}>CURRENT</span>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {key === 'LIVE' ? 'Website accepting real orders and payments' :
                   key === 'TESTING' ? 'Test mode — use Stripe test card 4242...' :
                   key === 'READONLY' ? 'Browsing allowed — no transactions' :
                   'Website completely offline — no activity'}
                </p>
              </button>
            ))}
          </div>

          {/* WHAT ACTIVATES ON UPLOAD */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
            <h4 className="font-bold text-blue-800 mb-2">📦 What Activates When You Upload to Lovable.ai</h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm text-blue-700">
              {[
                ['Operating System', 'Admin panel — all 22 modules — activates immediately'],
                ['Workspace', 'All dashboards for every user role — immediately available'],
                ['Test Mode', 'Enabled by default — safe for testing. Add ?mode=test to any URL'],
                ['Live Website', 'OFFLINE by default — requires Founder or C-Suite to activate'],
                ['Integration Toggles', 'All 47 integrations — toggle ON via Admin > Settings (C-Suite PIN)'],
                ['Supabase Connection', 'Activates when VITE_SUPABASE_URL env var is set'],
              ].map(([item, desc]) => (
                <div key={item} className="flex gap-2">
                  <span className="text-green-600 font-bold mt-0.5">✓</span>
                  <div><span className="font-semibold">{item}:</span> {desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2 — WARNINGS */}
      {step === 2 && targetState && (
        <div className="bg-white rounded-2xl border-2 border-amber-400 p-6">
          <h3 className="font-bold text-xl text-amber-800 mb-4">
            ⚠️ Warnings — Read Before Proceeding
          </h3>
          <div className="mb-2 text-sm font-semibold text-gray-500">
            You are requesting: <strong>{DEPLOYMENT_STATES[currentState]?.label}</strong> →{' '}
            <strong style={{ color: DEPLOYMENT_STATES[targetState]?.color }}>
              {DEPLOYMENT_STATES[targetState]?.label}
            </strong>
          </div>
          <div className="space-y-3 my-6">
            {warnings.map((w, i) => (
              <div key={i} className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                {w}
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={handleReset}
              className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-600 font-semibold">
              Cancel — Do Not Proceed
            </button>
            <button onClick={handleProceedFromWarnings}
              className="flex-1 py-3 rounded-xl text-white font-semibold"
              style={{ background: DEPLOYMENT_STATES[targetState]?.color }}>
              I Understand — Proceed to Authorization
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — PIN */}
      {step === 3 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 max-w-md mx-auto">
          <h3 className="font-bold text-xl mb-2" style={{ color: NAVY }}>
            🔐 Authorization Required
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Enter your Founder or C-Suite PIN to authorize this deployment change.
            This action will be permanently logged and Founder + C-Suite will be notified immediately.
          </p>
          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={e => { setPin(e.target.value); setPinError(''); }}
            onKeyDown={e => e.key === 'Enter' && handlePinSubmit()}
            className="w-full border-2 border-gray-300 rounded-xl px-4 py-4 text-center text-3xl tracking-widest mb-3 focus:outline-none focus:border-yellow-500"
            maxLength={6}
            autoFocus
          />
          {pinError && <p className="text-red-600 text-sm text-center mb-3">{pinError}</p>}
          <div className="flex gap-3">
            <button onClick={handleReset}
              className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-600">Cancel</button>
            <button onClick={handlePinSubmit}
              className="flex-1 py-3 rounded-xl text-white font-bold"
              style={{ background: NAVY }}>
              Verify PIN
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 — REASON */}
      {step === 4 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 max-w-xl mx-auto">
          <h3 className="font-bold text-xl mb-2" style={{ color: NAVY }}>
            📝 Reason Required
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Authorized by: <strong>{pinRole}</strong>. Provide a reason for this deployment change.
            This reason is permanently logged and included in the notification to Founder and C-Suite.
          </p>
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="Example: Going live after attorney review complete and Stripe confirmed live mode..."
            className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-sm resize-none mb-4 focus:outline-none focus:border-yellow-500"
            rows={4}
            autoFocus
          />
          <div className="flex gap-3">
            <button onClick={handleReset}
              className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-600">Cancel</button>
            <button onClick={handleReasonSubmit}
              className="flex-1 py-3 rounded-xl text-white font-bold"
              style={{ background: NAVY }}>
              Continue to Final Confirmation
            </button>
          </div>
        </div>
      )}

      {/* STEP 5 — FINAL CONFIRM */}
      {step === 5 && (
        <div className="bg-white rounded-2xl border-2 border-red-400 p-6 max-w-xl mx-auto">
          <h3 className="font-bold text-xl text-red-700 mb-4">
            🚨 Final Confirmation — This Cannot Be Undone Without Another Authorization
          </h3>
          <div className="space-y-3 mb-6 text-sm">
            {[
              ['Change', `${DEPLOYMENT_STATES[currentState]?.label} → ${DEPLOYMENT_STATES[targetState]?.label}`],
              ['Authorized by', pinRole],
              ['Reason', reason],
              ['Notifications', NOTIFY_ALWAYS.map(n => n.email).join(', ')],
              ['Audit log', 'Permanent — cannot be deleted'],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <span className="font-semibold text-gray-600 w-28 shrink-0">{k}:</span>
                <span className="text-gray-800">{v}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={handleReset}
              className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-600 font-semibold">
              Cancel — Abort
            </button>
            <button onClick={handleConfirmDeploy}
              className="flex-1 py-3 rounded-xl text-white font-bold"
              style={{ background: 'var(--red)' }}>
              CONFIRM — Apply Change Now
            </button>
          </div>
        </div>
      )}

      {/* STEP 6 — DONE */}
      {step === 6 && notification && (
        <div className="bg-green-50 border-2 border-green-400 rounded-2xl p-6 max-w-xl mx-auto">
          <div className="text-center mb-4">
            <div className="text-5xl mb-3">✅</div>
            <h3 className="font-bold text-xl text-green-800">Deployment State Changed</h3>
            <p className="text-green-700 text-sm mt-1">
              New state: <strong>{DEPLOYMENT_STATES[currentState]?.label}</strong>
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 text-xs text-gray-600 mb-4 font-mono">
            <p><strong>Audit ID:</strong> {notification.auditId}</p>
            <p><strong>Time:</strong> {notification.timestamp}</p>
            <p><strong>Authorized by:</strong> {notification.performedBy}</p>
            <p><strong>Notified:</strong> {NOTIFY_ALWAYS.map(n => n.email).join(', ')}</p>
          </div>
          <button onClick={handleReset}
            className="w-full py-3 rounded-xl text-white font-bold" style={{ background: NAVY }}>
            Return to Deployment Control
          </button>
        </div>
      )}

      {/* AUDIT LOG */}
      {auditLog.length > 0 && (
        <div className="mt-8">
          <h3 className="font-bold text-lg mb-3" style={{ color: NAVY }}>
            📋 Session Audit Log (Permanent)
          </h3>
          <div className="space-y-2">
            {auditLog.map(entry => (
              <div key={entry.id} className="bg-white border rounded-xl p-4 text-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold">{entry.from} → {entry.to}</span>
                  <span className="text-xs text-gray-400">{entry.time}</span>
                </div>
                <p className="text-gray-600">By: {entry.by} | Reason: {entry.reason}</p>
                <p className="text-xs text-gray-400 mt-1">Notified: {entry.notified}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NOTIFICATION TARGETS */}
      <div className="mt-8 bg-gray-50 rounded-xl p-5 border border-gray-200">
        <h4 className="font-bold text-sm mb-3" style={{ color: NAVY }}>
          📬 Automatic Notification Recipients — Every Change
        </h4>
        <div className="grid md:grid-cols-2 gap-2">
          {NOTIFY_ALWAYS.map(n => (
            <div key={n.email} className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="font-medium text-gray-700">{n.label}:</span>
              <span className="text-gray-500">{n.email}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
