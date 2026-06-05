/**
 * HOACONDInsight™ SOP Validation Engine
 * FOUNDATIONAL RULE: No addon software from any vendor activates without SOP validation first
 * If SOP fails → notify C-Suite AND vendor immediately
 * If SOP passes → queue for toggle activation in the admin panel
 * Hoa Condo Insight LLC · 61 N Lakeshore Drive, Hypoluxo, Florida 33462
 */

export const SOP_CHECKS = {
  vendor: [
    { id: 'v1', check: 'Vendor has a published Privacy Policy on their website',               category: 'Legal',    critical: true },
    { id: 'v2', check: 'Vendor has published Security documentation or SOC2/ISO27001 report',  category: 'Security', critical: true },
    { id: 'v3', check: 'Vendor has not had a publicly reported data breach in the past 2 years',category: 'Security', critical: true },
    { id: 'v4', check: 'Vendor agreement does not grant rights to sell our data to third parties',category: 'Legal',  critical: true },
    { id: 'v5', check: 'Vendor has published uptime/reliability SLA',                          category: 'Ops',      critical: false },
    { id: 'v6', check: 'Vendor has a support channel (email, chat, or phone)',                  category: 'Ops',      critical: false },
    { id: 'v7', check: 'Vendor pricing is transparent and in writing',                         category: 'Financial',critical: false },
    { id: 'v8', check: 'Vendor contract has a termination clause (can cancel with 30 days notice)', category: 'Legal', critical: false },
  ],
  technical: [
    { id: 't1', check: 'Integration uses API key authentication (not username/password shared)',category: 'Security', critical: true },
    { id: 't2', check: 'API key can be revoked instantly without contacting vendor',            category: 'Security', critical: true },
    { id: 't3', check: 'Data transmitted over HTTPS/TLS only',                                 category: 'Security', critical: true },
    { id: 't4', check: 'Integration does not have access to more data than it needs',          category: 'Security', critical: true },
    { id: 't5', check: 'Integration has been tested in test mode before production',           category: 'Quality',  critical: true },
    { id: 't6', check: 'Integration has error handling (system still works if vendor is down)', category: 'Quality', critical: true },
    { id: 't7', check: 'Integration does not store our API keys on vendor servers',            category: 'Security', critical: true },
    { id: 't8', check: 'Vendor\'s SDK or library does not have known security vulnerabilities (Snyk scan)', category: 'Security', critical: false },
  ],
  approval: [
    { id: 'a1', check: 'C-Suite has reviewed the vendor and approved the integration',         category: 'Governance', critical: true },
    { id: 'a2', check: 'Founder has provided final written authorization',                    category: 'Governance', critical: true },
    { id: 'a3', check: 'Integration is documented in the operating system with a toggle switch', category: 'Ops',    critical: true },
    { id: 'a4', check: 'Notification has been set up for integration failures',               category: 'Ops',      critical: false },
  ],
};

export function runFullSopValidation(vendorName, vendorWebsite, responses = {}) {
  const allChecks = [
    ...SOP_CHECKS.vendor,
    ...SOP_CHECKS.technical,
    ...SOP_CHECKS.approval,
  ];

  const results = allChecks.map(c => ({
    ...c,
    passed: responses[c.id] === true,
    failed: responses[c.id] === false,
    pending: responses[c.id] === undefined,
  }));

  const criticalFails = results.filter(r => r.critical && r.failed);
  const totalFails = results.filter(r => r.failed);
  const passed = criticalFails.length === 0 && totalFails.length === 0;

  return {
    vendor: vendorName,
    website: vendorWebsite,
    timestamp: new Date().toISOString(),
    passed,
    criticalFailures: criticalFails.length,
    totalFailures: totalFails.length,
    results,
    recommendation: passed
      ? '✅ SOP PASSED — Proceed to toggle activation after Founder authorization'
      : '❌ SOP FAILED — Do not activate. Notify C-Suite and vendor.',
    notifyOnFail: ['peterkleinusa@gmail.com','peter@hoacondinsight.com','ceo@hoacondinsight.com'],
    auditId: `SOP-${Date.now()}-${Math.random().toString(36).substr(2,6).toUpperCase()}`,
  };
}

export function generateVendorFailureNotification(vendorName, sopResult) {
  return {
    to: sopResult.notifyOnFail,
    subject: `⚠️ SOP VALIDATION FAILED — ${vendorName} — Do Not Activate`,
    body: `SOP validation failed for: ${vendorName}
    
Failures: ${sopResult.criticalFailures} critical, ${sopResult.totalFailures} total
Audit ID: ${sopResult.auditId}

Failed checks:
${sopResult.results.filter(r => r.failed).map(r => `  ❌ ${r.check}`).join('\n')}

ACTION REQUIRED: Do not activate this integration until all critical checks pass.
The vendor has been notified of the specific issues found.

Hoa Condo Insight LLC — HOACONDInsight™`,
  };
}

export const sopValidationEngineVersion = '5.1';
export default { SOP_CHECKS, runFullSopValidation, generateVendorFailureNotification };
