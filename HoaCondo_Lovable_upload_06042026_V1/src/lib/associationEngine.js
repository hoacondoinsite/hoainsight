/**
 * HOACONDInsight™ Association Engine
 * HOA + Condo Associations, 7 pricing tiers, 24 document types
 */
export const ASSOC_TIERS = [
  { units: '1-50', price: 29 }, { units: '51-100', price: 59 }, { units: '101-200', price: 99 },
  { units: '201-500', price: 149 }, { units: '501-1000', price: 249 }, { units: '1001-2000', price: 349 }, { units: '2000+', price: 499 },
];
export const REQUIRED_DOCS = [
  'Operating Budget (current year)', 'Reserve Study (within 3 years)', 'Audited Financials (2 years)',
  'Master Insurance Policy', 'Board Meeting Minutes (12 months)', 'HOA Bylaws', "CC&R's",
  'Delinquency Report', 'Pending Litigation Disclosure', 'Management Agreement',
  'Special Assessment History (5 years)', 'Reserve Fund Balance Statement',
  'Owner Roster', 'Rental Restriction Policy', 'Pet Policy', 'Parking Policy',
  'Amendment History', 'Election Records', 'Committee Charters', 'Vendor Contracts',
  'Capital Improvement Plan', 'Insurance Claims History (3 years)', 'Lease Approval Policy', 'FHA Certification (if applicable)',
];
export const MULTI_YEAR_DISCOUNTS = { 1: 0, 2: 0.10, 3: 0.15, 4: 0.20, 5: 0.30 };
export const STATE_HOA_STATUTES = {
  FL: 'Florida HOA Act (§720) and Condo Act (§718)', CA: 'Davis-Stirling Common Interest Development Act',
  TX: 'Texas Property Code Chapter 209 (POAs) and Chapter 82 (Condos)',
  NY: 'New York Real Property Law Article 9-B', IL: 'Illinois Condominium Property Act',
  DEFAULT: 'State-specific HOA statutes apply — consult local counsel',
};
export function getTierForUnits(unitCount) { return ASSOC_TIERS.find(t => { if (t.units.includes('+')) return unitCount >= parseInt(t.units); const [min, max] = t.units.split('-').map(Number); return unitCount >= min && unitCount <= max; }) || ASSOC_TIERS[0]; }
export const associationEngineConfig = { name: 'associationEngine', version: '5.0', tiers: ASSOC_TIERS.length, requiredDocs: REQUIRED_DOCS.length };
export default associationEngineConfig;
