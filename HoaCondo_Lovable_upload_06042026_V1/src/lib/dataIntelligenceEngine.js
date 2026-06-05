/**
 * HOACONDInsight™ Data Intelligence Engine
 * Company Rule 11: Data NEVER sold without complete 5-step legal authorization
 * Database grows automatically as a byproduct of operations — asset value only
 */
export const DATA_PRODUCTS = [
  { id: 'national_benchmark', name: 'National HOA Benchmark Report', buyers: ['CoreLogic','Black Knight','Fannie Mae'], minHOAs: 50, anonymized: true, estimatedValue: 45 },
  { id: 'mortgage_risk',     name: 'Mortgage Risk Intelligence',    buyers: ['Lenders','Servicers'],                  minHOAs: 100, anonymized: true, estimatedValue: 55 },
  { id: 'insurance_risk',    name: 'Insurance Risk Dataset',        buyers: ['Insurance companies'],                  minHOAs: 50,  anonymized: true, estimatedValue: 35 },
  { id: 'reit_screening',    name: 'REIT Condo Portfolio Screening', buyers: ['REITs','Hedge funds'],                 minHOAs: 200, anonymized: true, estimatedValue: 40 },
  { id: 'municipal_bond',    name: 'Municipal Bond Risk Data',       buyers: ['Municipal bond funds'],                minHOAs: 100, anonymized: true, estimatedValue: 38 },
];

// Rule 11 5-Step Authorization Gate
export const LEGAL_GATE = {
  step1: 'Outside legal counsel written opinion letter (not email — physical letter on firm letterhead)',
  step2: 'C-Suite unanimous written approval (all C-Suite members)',
  step3: 'Founder final written authorization',
  step4: 'Legal opinion letter reference number logged in system',
  step5: 'Only then may product be offered commercially — not discussed, not shown in marketing, not in term sheet',
  status: 'GATE_ACTIVE',
  note: 'This gate cannot be bypassed or overridden by any user including Founder. Sequence is mandatory.',
};

export function canOfferDataProduct(authorizationLog) {
  const required = ['outsideCounselOpinionLetter', 'csuiteUnanimousApproval', 'founderAuthorization', 'opinionLetterReferenceNumber'];
  const missing = required.filter(r => !authorizationLog?.[r]);
  return { allowed: missing.length === 0, missing, gate: LEGAL_GATE };
}

export function anonymizeRecord(hoaRecord) {
  const { id, name, address, managerEmail, managerPhone, ownerEmails, ...safe } = hoaRecord;
  return { ...safe, anonymized: true, anonymizedAt: new Date().toISOString() };
}

export function calculateDatabaseAssetValue(totalRecords) {
  const avgValuePerRecord = 43; // weighted average across all buyer types
  const sellableRecords = Math.max(0, totalRecords - 50); // 50 minimum for anonymization
  return {
    totalRecords,
    sellableRecords,
    grossValue: sellableRecords * avgValuePerRecord,
    netValue: sellableRecords * avgValuePerRecord * 0.70,
    note: 'Asset value only — Rule 11 authorization required before any commercial use',
  };
}

export const dataIntelligenceEngineConfig = { name: 'dataIntelligenceEngine', version: '5.1', products: DATA_PRODUCTS.length, gateActive: true };
export default dataIntelligenceEngineConfig;

// Company Rule 11 enforcement statement
export const RULE_11_STATEMENT = 'Data is never sold. Company Rule 11 prohibits sale without 5-step legal authorization: outside counsel opinion letter, C-Suite unanimous approval, Founder authorization, reference number logged, then offered commercially.';
