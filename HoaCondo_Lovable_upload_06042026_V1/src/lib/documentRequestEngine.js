/**
 * HOACONDInsight™ Document Request Engine
 * Automated email to HOA manager on buyer's behalf — no human intervention
 */
export const REQUIRED_DOCUMENTS = [
  { id: 1, name: 'Current Year Operating Budget', category: 'Financial', updateFreq: 'Annual' },
  { id: 2, name: 'Reserve Study (within 3 years)', category: 'Financial', updateFreq: 'Every 3 years' },
  { id: 3, name: 'Audited Financial Statements (2 years)', category: 'Financial', updateFreq: 'Annual' },
  { id: 4, name: 'Master Insurance Policy', category: 'Insurance', updateFreq: 'Annual' },
  { id: 5, name: 'Board Meeting Minutes (12 months)', category: 'Governance', updateFreq: 'Monthly' },
  { id: 6, name: 'HOA Bylaws', category: 'Governing Docs', updateFreq: 'As amended' },
  { id: 7, name: "CC&R's (Covenants, Conditions & Restrictions)", category: 'Governing Docs', updateFreq: 'As amended' },
  { id: 8, name: 'Owner Delinquency Report (current)', category: 'Financial', updateFreq: 'Monthly' },
  { id: 9, name: 'Pending Litigation Disclosure', category: 'Legal', updateFreq: 'As changes occur' },
  { id: 10, name: 'Management Agreement', category: 'Operations', updateFreq: 'As renewed' },
  { id: 11, name: 'Special Assessment History (5 years)', category: 'Financial', updateFreq: 'As occurs' },
  { id: 12, name: 'Reserve Fund Balance Statement', category: 'Financial', updateFreq: 'Monthly' },
  { id: 13, name: 'Owner Roster / Occupancy Report', category: 'Demographics', updateFreq: 'Quarterly' },
  { id: 14, name: 'Rental Restriction Policy', category: 'Governing Docs', updateFreq: 'As amended' },
  { id: 15, name: 'Pet Policy', category: 'Governing Docs', updateFreq: 'As amended' },
  { id: 16, name: 'Parking Policy', category: 'Governing Docs', updateFreq: 'As amended' },
  { id: 17, name: 'Amendment History', category: 'Governing Docs', updateFreq: 'As occurs' },
  { id: 18, name: 'Election Records (2 years)', category: 'Governance', updateFreq: 'Annual' },
  { id: 19, name: 'Vendor Contracts (major)', category: 'Operations', updateFreq: 'As renewed' },
  { id: 20, name: 'Capital Improvement Plan', category: 'Planning', updateFreq: 'Annual' },
  { id: 21, name: 'Insurance Claims History (3 years)', category: 'Insurance', updateFreq: 'Annual' },
  { id: 22, name: 'Lease Approval Policy', category: 'Governing Docs', updateFreq: 'As amended' },
  { id: 23, name: 'FHA Certification (if applicable)', category: 'Compliance', updateFreq: 'Annual' },
  { id: 24, name: 'Certificate of Insurance (COI)', category: 'Insurance', updateFreq: 'Annual' },
];

export function generateRequestEmail(buyerName, hoaName, managerEmail, propertyAddress) {
  const docList = REQUIRED_DOCUMENTS.map((d, i) => `${i + 1}. ${d.name}`).join('\n');
  return {
    to: managerEmail,
    subject: `HOA Document Request — ${propertyAddress} — Fannie Mae Full Review Required`,
    body: `Dear HOA Manager,\n\nI am writing on behalf of ${buyerName}, who is in contract to purchase a unit at ${propertyAddress} within the ${hoaName} community.\n\nFannie Mae Lender Letter LL-2026-03 (effective March 18, 2026) requires a Full Review of your association's financial and governance documents for conventional mortgage financing. This is a federal compliance requirement.\n\nPlease provide the following documents within 5 business days:\n\n${docList}\n\nDocuments may be uploaded securely at:\nhttps://www.hoacondinsight.com/upload\n\nYour prompt response allows us to complete the review and support a smooth transaction for all parties. All documents are handled with strict confidentiality.\n\nThank you for your cooperation.\n\nHOACONDInsight™ Document Collection\nsupport@hoacondinsight.com\nhoacondinsight.com`,
    sentAt: new Date().toISOString(),
    trackingId: `DOC-REQ-${Date.now()}`,
  };
}

export function calculateDocCompletenessScore(uploadedDocIds) {
  const score = Math.round((uploadedDocIds.length / REQUIRED_DOCUMENTS.length) * 100);
  const missing = REQUIRED_DOCUMENTS.filter(d => !uploadedDocIds.includes(d.id));
  return { score, missing, sufficient: score >= 70 };
}

export const documentRequestEngineConfig = { name: 'documentRequestEngine', version: '5.1', requiredDocs: REQUIRED_DOCUMENTS.length };
export default documentRequestEngineConfig;
