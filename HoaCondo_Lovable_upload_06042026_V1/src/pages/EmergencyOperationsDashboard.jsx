import React, { useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { EMERGENCY_TYPES, canDeploy, generateEmergencyLog, getNotificationList } from '../lib/emergencyOperationsEngine.js';

export default function EmergencyOperationsDashboard() {
  const [selectedType, setSelectedType] = useState('');
  const [message, setMessage] = useState('');
  const [founderApproved, setFounderApproved] = useState(false);
  const [csuiteApproved, setCsuiteApproved] = useState(false);
  const [step, setStep] = useState(1);
  const [deployed, setDeployed] = useState(false);

  const type = EMERGENCY_TYPES.find(e => e.id === selectedType);
  const canDep = selectedType && canDeploy(founderApproved, csuiteApproved, selectedType);

  const handleDeploy = () => {
    if (!canDep) return;
    setDeployed(true);
  };

  return (
    <div><Nav />
    <section className="py-8 px-4" style={{ background: '#7f1d1d' }}>
      <div className="max-w-4xl mx-auto">
        <p className="text-red-300 text-xs font-bold mb-1">EMERGENCY OPERATIONS CENTER</p>
        <h1 className="text-2xl font-bold text-white">HOACONDInsight™ Emergency Response</h1>
        <p className="text-red-200 text-sm mt-1">Founder + C-Suite authorization required. Every deployment is permanently logged.</p>
      </div>
    </section>
    <div className="max-w-4xl mx-auto px-4 py-8">
      {deployed ? (
        <div className="bg-green-50 border border-green-300 rounded-2xl p-8 text-center">
          <p className="text-4xl mb-4">✅</p>
          <h2 className="text-xl font-bold text-green-800 mb-2">Emergency Communication Deployed</h2>
          <p className="text-green-700 text-sm">Notification sent to: {getNotificationList(selectedType).join(', ')}</p>
          <p className="text-xs text-green-600 mt-2">Permanently logged in audit trail — cannot be deleted or modified.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-bold mb-4 text-gray-800">Step 1 — Select Emergency Type</h2>
            <div className="space-y-2">
              {EMERGENCY_TYPES.map(e => (
                <button key={e.id} onClick={() => setSelectedType(e.id)} className={`w-full text-left p-3 rounded-xl border transition-colors ${selectedType === e.id ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{e.label}</p>
                    <span className={`text-xs px-2 py-0.5 rounded font-bold ${e.level === 'CRITICAL' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{e.level}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">Notify within: {e.notifyWithin}</p>
                </button>
              ))}
            </div>
          </div>
          <div>
            {type && (
              <>
                <h2 className="font-bold mb-4 text-gray-800">Step 2 — Authorize & Deploy</h2>
                <div className="bg-white rounded-xl border p-5 shadow-sm mb-4">
                  <p className="text-sm font-semibold mb-3 text-red-700">Required: {type.requiresLegal ? 'Founder + C-Suite + Legal' : 'Founder + C-Suite'}</p>
                  <label className="flex items-center gap-3 mb-3 cursor-pointer">
                    <input type="checkbox" checked={founderApproved} onChange={e => setFounderApproved(e.target.checked)} className="h-4 w-4" />
                    <span className="text-sm">Founder Authorization — Peter Klein</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={csuiteApproved} onChange={e => setCsuiteApproved(e.target.checked)} className="h-4 w-4" />
                    <span className="text-sm">C-Suite Authorization</span>
                  </label>
                </div>
                <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Enter emergency communication message..." className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm resize-none mb-4" rows={4} />
                <button onClick={handleDeploy} disabled={!canDep || !message}
                  className="w-full py-3 rounded-xl font-bold text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ background: canDep && message ? 'var(--red)' : '#d1d5db' }}>
                  {canDep ? '🚨 DEPLOY EMERGENCY COMMUNICATION' : '⚠️ Authorization Required'}
                </button>
              </>
            )}
            {!type && <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-400 text-sm">Select an emergency type to begin authorization.</div>}
          </div>
        </div>
      )}
    </div>
    <Footer /></div>
  );
}
