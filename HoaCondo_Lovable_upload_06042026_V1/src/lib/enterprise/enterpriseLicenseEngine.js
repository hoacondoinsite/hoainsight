import PATENT_CONFIG from '../patentConfig.js';
/**
 * HOACONDInsight™ Enterprise License Engine
 * $5M platform license for institutional buyers — PennyMac, Chase, major institutions
 */
export const LICENSE_STRUCTURES = {
  full_clean: { label: 'Full Clean Exit', upfront: 5000000, ongoing: 0, description: 'Complete platform transfer. Full IP assignment. No ongoing obligations.' },
  installment: { label: 'Installment Plan', downPayment: 1500000, annual: 700000, years: 5, totalValue: 5000000, description: 'Assignable contract — can be sold to factor or credit fund by HOACONDInsight.' },
  lump_royalty: { label: 'Lump Sum + Perpetual Royalty', upfront: 3500000, royaltyRate: 0.035, royaltyFloor: 750000, description: 'Upfront liquidity + perpetual income. 3.5% of gross revenue in perpetuity. $750K annual floor.' },
};

export const INCLUDED_DELIVERABLES = [
  'Complete source code (97 files, all engines)',
  'All 47 integration configurations and API mappings',
  'Supabase database schema and migration scripts',
  'Patent application assignment (U.S. 64/081,022)',
  'Trademark assignment',
  'All trade secret documentation',
  'Operations Manual v5.1',
  '90-day implementation support from founder',
  'Staff training program (15 video scripts)',
  'All legal document templates (13 WL documents)',
];

export const NO_RESALE_TERMS = {
  clause: 'Licensee may not resell, sublicense, or transfer the platform to any third party without prior written consent of Hoa Condo Insight LLC.',
  exception: 'Licensee may deploy platform under its own brand for internal use only.',
  enforcement: 'Breach triggers immediate license termination plus liquidated damages of $10M.',
};

export function generateLicenseProposal(buyerName, structure) {
  const s = LICENSE_STRUCTURES[structure];
  return {
    buyer: buyerName,
    structure: s.label,
    terms: s,
    deliverables: INCLUDED_DELIVERABLES,
    noResale: NO_RESALE_TERMS,
    arbitration: 'JAMS Palm Beach County, Florida',
    generatedAt: new Date().toISOString(),
    validFor: '90 days from date of issue',
  };
}

export const enterpriseLicenseEngineConfig = { name: 'enterpriseLicenseEngine', version: '5.1', structures: Object.keys(LICENSE_STRUCTURES).length };
export default enterpriseLicenseEngineConfig;
