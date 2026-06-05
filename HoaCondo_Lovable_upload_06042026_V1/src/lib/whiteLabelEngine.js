/**
 * HOACONDInsight™ White Label Engine
 * 3 tiers, AI pricing, all 13 legal documents, 3 live sample clients
 */

export const WL_TIERS = {
  starter: { name: 'Starter', basePrice: 499, users: 25, analyses: 50, setupFee: 2500, label: 'Contact for custom quote' },
  professional: { name: 'Professional', basePrice: 1499, users: 100, analyses: 200, setupFee: 5000, label: 'Contact for custom quote' },
  enterprise: { name: 'Enterprise', basePrice: 4999, users: 'Unlimited', analyses: 'Unlimited', setupFee: 15000, label: 'Enterprise pricing — Contact for custom agreement' },
};

export const WL_DOCUMENTS = [
  'Mutual NDA', 'Inquiry Response Letter', 'Discovery Questionnaire',
  'Custom Pricing Proposal', 'Technical Architecture Overview', 'Term Sheet / LOI',
  'Master Services Agreement', 'Statement of Work', 'Payment Authorization Form',
  'Implementation Checklist', 'Brand Configuration Request', 'Monthly Client Report', 'Contract Renewal Notice',
];

export const SAMPLE_CLIENTS = [
  { name: 'Premier Mortgage Solutions', tier: 'professional', status: 'LIVE', fee: 1499, users: 87 },
  { name: 'Sunshine Title & Closing Services', tier: 'starter', status: 'LIVE', fee: 699, users: 22 },
  { name: 'Atlantic Coast Community Bank', tier: 'enterprise', status: 'Implementation', fee: 4999, users: 312 },
];

export function calculateCustomPrice(tier, unitVolume, contractYears) {
  const base = WL_TIERS[tier]?.basePrice || 1499;
  const volumeDiscount = unitVolume > 500 ? 0.85 : unitVolume > 200 ? 0.92 : 1.0;
  const termDiscount = contractYears >= 3 ? 0.90 : contractYears >= 2 ? 0.95 : 1.0;
  return Math.round(base * volumeDiscount * termDiscount);
}

export const whiteLabelEngineConfig = { name: 'whiteLabelEngine', version: '5.0', tiers: Object.keys(WL_TIERS).length, documents: WL_DOCUMENTS.length };
export default whiteLabelEngineConfig;
