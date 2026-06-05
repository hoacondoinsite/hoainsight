/**
 * HOACONDInsight™ Company Design Principle
 * Foundational Rule — All Development Must Follow This
 * Version: 5.2 | Updated: June 4, 2026
 * 
 * PATENT UPDATE: Now references patentConfig.js as single source of truth.
 * To update second patent number tonight: edit patentConfig.js ONLY.
 */

import PATENT_CONFIG from './patentConfig.js';

export const COMPANY_DESIGN_PRINCIPLE = {
  statement: "Our software, operating system, and all user dashboards are designed with all the tools necessary — included in their dashboard — so simple and easy to understand and implement.",
  
  rules: [
    { id: 1, rule: "Every feature change requires Founder or C-Suite written approval before implementation." },
    { id: 2, rule: "All updates are additive only — no existing functionality may be removed without explicit Founder authorization." },
    { id: 3, rule: "Every dashboard includes all tools the user needs. No feature requires leaving the dashboard." },
    { id: 4, rule: "The system self-updates legally and operationally. No human is required for routine maintenance." },
    { id: 5, rule: "Every integration activates via toggle. No code changes required to add or remove integrations." },
    { id: 6, rule: "All AI outputs are advisory only. No AI decision is final without human review for core business actions." },
    { id: 7, rule: "The Risk Management AI reviews every action before execution. Red flags pause and escalate." },
    { id: 8, rule: "Every report includes mandatory legal disclaimers. No report is delivered without them." },
    { id: 9, rule: "Attorney recommendations are advisory only. No attorney modifies the platform directly." },
    { id: 10, rule: "The platform is technology-agnostic. It adapts to every device, every browser, every future technology." },
    { id: 11, rule: "Company data is never sold. The 5-step legal authorization path is the only exception: (1) outside legal counsel written opinion letter, (2) C-Suite unanimous approval, (3) Founder final authorization, (4) legal opinion letter reference number logged, (5) data monetization product offered. No shortcuts." },
    { id: 12, rule: "Mandatory arbitration clause (JAMS, Palm Beach County, FL) auto-inserts into every contract, agreement, and user-facing legal document. Class action waiver applies." },
    { id: 13, rule: "Every backup is validated against the Master File Manifest before distribution. Zero missing files allowed." },
  ],
  
  // Patent applications — managed in patentConfig.js (single source of truth)
  patents: PATENT_CONFIG.displayBothApps(),
  trademarks: PATENT_CONFIG.TRADEMARKS,
  tradeSecretNotice: PATENT_CONFIG.TRADE_SECRET_NOTICE,
  
  version: "5.2",
  effectiveDate: "June 4, 2026",
};

export function validateAction(action, role) {
  const requiresFounder = ['deleteData', 'modifyPricing', 'changeCompanyRule', 'sellData', 'majorUpdate'];
  const requiresCSuite = ['toggleIntegration', 'approveMarketing', 'approveContract', 'emergencyAction'];
  if (requiresFounder.includes(action) && role !== 'founder') return { allowed: false, reason: 'Founder authorization required.' };
  if (requiresCSuite.includes(action) && !['founder', 'csuite'].includes(role)) return { allowed: false, reason: 'C-Suite authorization required.' };
  return { allowed: true };
}

export { PATENT_CONFIG };
export default COMPANY_DESIGN_PRINCIPLE;
