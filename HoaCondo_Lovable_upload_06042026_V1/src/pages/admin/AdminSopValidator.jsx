import React, { useState } from 'react';
import { SOP_CHECKS, runFullSopValidation } from '../../lib/sopValidationEngine.js';

const NAVY = 'var(--navy)'; const GOLD = 'var(--gold)';

export default function AdminSopValidator() {
  const [vendorName, setVendorName] = useState('');
  const [vendorWebsite, setVendorWebsite] = useState('');
  const [responses, setResponses] = useState({});
  const [result, setResult] = useState(null);
  const [step, setStep] = useState(1);
  const allChecks = [...SOP_CHECKS.vendor, ...SOP_CHECKS.technical, ...SOP_CHECKS.approval];

  const handleResponse = (checkId, value) => {
    setResponses(prev => ({ ...prev, [checkId]: value }));
  };

  const handleRun = () => {
    const r = runFullSopValidation(vendorName, vendorWebsite, responses);
    setResult(r);
    setStep(3);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1" style={{ color: NAVY }}>✅ SOP Validator</h2>
      <p className="text-sm text-gray-500 mb-6">
        <strong>Foundational Rule:</strong> No addon software from any vendor activates without passing SOP validation first.
        If it fails, C-Suite and the vendor are notified immediately. If it passes, it gets a toggle switch.
      </p>

      {step === 1 && (
        <div className="max-w-lg">
          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="font-bold mb-4">Step 1 — Enter Vendor Information</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Vendor / Software Name</label>
              <input type="text" value={vendorName} onChange={e => setVendorName(e.target.value)} placeholder="e.g. Twilio, DocuSign, HubSpot" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Website</label>
              <input type="text" value={vendorWebsite} onChange={e => setVendorWebsite(e.target.value)} placeholder="e.g. twilio.com" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
            <button onClick={() => { if (vendorName && vendorWebsite) setStep(2); else alert('Enter vendor name and website.'); }}
              className="w-full py-3 rounded-xl text-white font-semibold" style={{ background: NAVY }}>
              Start SOP Validation →
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
            <p className="font-bold text-amber-800">Validating: <strong>{vendorName}</strong> ({vendorWebsite})</p>
            <p className="text-amber-700 text-sm mt-1">Answer each question below. Critical questions must pass. If any critical question fails, the software cannot be activated.</p>
          </div>
          {['Vendor Requirements', 'Technical Requirements', 'Approval Requirements'].map((section, si) => {
            const checks = [SOP_CHECKS.vendor, SOP_CHECKS.technical, SOP_CHECKS.approval][si];
            return (
              <div key={section} className="bg-white rounded-xl border p-5 shadow-sm mb-4">
                <h3 className="font-bold mb-3 text-sm" style={{ color: NAVY }}>{section}</h3>
                {checks.map(c => (
                  <div key={c.id} className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
                    <div className="flex-1">
                      <p className="text-sm">{c.check}</p>
                      {c.critical && <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded mt-1 inline-block">CRITICAL — must pass</span>}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => handleResponse(c.id, true)}
                        className={`text-xs px-3 py-1 rounded border font-medium ${responses[c.id] === true ? 'bg-green-500 text-white border-green-500' : 'border-gray-200 text-gray-600 hover:bg-green-50'}`}>
                        ✓ Yes
                      </button>
                      <button onClick={() => handleResponse(c.id, false)}
                        className={`text-xs px-3 py-1 rounded border font-medium ${responses[c.id] === false ? 'bg-red-500 text-white border-red-500' : 'border-gray-200 text-gray-600 hover:bg-red-50'}`}>
                        ✗ No
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="px-6 py-3 rounded-xl border text-gray-600">← Back</button>
            <button onClick={handleRun}
              disabled={Object.keys(responses).length < allChecks.length}
              className="flex-1 py-3 rounded-xl text-white font-bold disabled:opacity-40"
              style={{ background: NAVY }}>
              Run SOP Validation ({Object.keys(responses).length}/{allChecks.length} answered)
            </button>
          </div>
        </div>
      )}

      {step === 3 && result && (
        <div>
          <div className={`rounded-2xl border-2 p-6 mb-6 ${result.passed ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
            <div className="text-4xl mb-3">{result.passed ? '✅' : '❌'}</div>
            <h3 className={`font-bold text-xl mb-2 ${result.passed ? 'text-green-800' : 'text-red-800'}`}>
              {result.passed ? 'SOP PASSED — Ready for Toggle Activation' : 'SOP FAILED — Do Not Activate'}
            </h3>
            <p className={`text-sm ${result.passed ? 'text-green-700' : 'text-red-700'}`}>{result.recommendation}</p>
            <p className="text-xs text-gray-500 mt-2">Audit ID: {result.auditId} · Checked: {new Date(result.timestamp).toLocaleString()}</p>
          </div>
          {!result.passed && (
            <div className="bg-white rounded-xl border p-5 shadow-sm mb-4">
              <h4 className="font-bold text-red-700 mb-3">Failed Checks ({result.totalFailures})</h4>
              {result.results.filter(r => r.failed).map(r => (
                <div key={r.id} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0 text-sm">
                  <span className="text-red-500 font-bold">✗</span>
                  <div><span className="text-gray-800">{r.check}</span>
                  {r.critical && <span className="ml-2 text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">CRITICAL</span>}</div>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={() => { setStep(1); setVendorName(''); setVendorWebsite(''); setResponses({}); setResult(null); }}
              className="px-6 py-3 rounded-xl border text-gray-600">Start New Validation</button>
            {result.passed && (
              <button className="flex-1 py-3 rounded-xl text-white font-bold" style={{ background: NAVY }}>
                Add to Integration Toggles →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
