/**
 * HOACONDInsight™ Revenue Engine
 * All pricing tiers, projections, exit valuations
 */

export const MONTHLY_COSTS = {
  supabase: 0, stripe: 0, openai: 30, resend: 0, lovable: 50,
  domain: 2, misc: 20, total: 102,
};

export const PRICING = {
  individual_report: { price: 39, margin: 0.85, label: 'Individual Report' },
  starter_plan: { price: 149, margin: 0.80, label: 'Starter Annual Plan', period: 'year' },
  professional_plan: { price: 299, margin: 0.80, label: 'Professional Annual Plan', period: 'year' },
  attorney_review: { price: 149, margin: 0.40, label: 'Attorney Certification' },
  negotiation_coach: { price: 19, margin: 0.90, label: 'Buyer Protection Report' },
  monitoring_basic: { price: 49, margin: 0.90, label: 'HOA Monitoring Basic', period: 'year' },
  monitoring_pro: { price: 99, margin: 0.90, label: 'HOA Monitoring Pro', period: 'year' },
  board_cert_standard: { price: 1200, margin: 0.85, label: 'HOA Board Certification', period: 'year' },
  lender_branch: { price: 299, margin: 0.85, label: 'Lender Branch License', period: 'month' },
  lender_regional: { price: 999, margin: 0.85, label: 'Lender Regional License', period: 'month' },
  lender_enterprise: { price: 2499, margin: 0.85, label: 'Lender Enterprise License', period: 'month' },
  title_api: { price: 35, margin: 0.80, label: 'Title Company API per closing' },
  assoc_tier1: { price: 29, margin: 0.88, label: 'Association 1-50 units/mo' },
  assoc_tier7: { price: 499, margin: 0.88, label: 'Association 2000+ units/mo' },
};

export const REVENUE_SCENARIOS = {
  year1: { revenue: 95900, ebitda: -8100, headcount: 1, valuation: [14000000, 48000000] },
  year2: { revenue: 768000, ebitda: 417900, headcount: 2, valuation: [25000000, 70000000] },
  year3: { revenue: 3840000, ebitda: 2730000, headcount: 5, valuation: [50000000, 120000000] },
  year4: { revenue: 9500000, ebitda: 6930000, headcount: 11, valuation: [95000000, 175000000] },
  year10: { revenue: 70000000, ebitda: 52900000, headcount: 50, valuation: [700000000, 1400000000] },
  year15: { revenue: 200000000, ebitda: 149200000, headcount: 120, valuation: [2000000000, 4000000000] },
};

export const STRATEGIC_ACQUIRERS = [
  { name: 'ICE Mortgage Technology', rangeLow: 55000000, rangeHigh: 160000000, rationale: 'Encompass native integration, 40% US mortgage market' },
  { name: 'CoreLogic', rangeLow: 48000000, rangeHigh: 135000000, rationale: 'HOA data layer, Roostify acquisition parallel' },
  { name: 'First American', rangeLow: 35000000, rangeHigh: 110000000, rationale: 'Closing workflow, 50-state attorney network' },
  { name: 'Rocket Companies', rangeLow: 40000000, rangeHigh: 120000000, rationale: '$36M-$56M annual staff cost elimination' },
  { name: 'Fidelity National', rangeLow: 30000000, rangeHigh: 95000000, rationale: 'ServiceLink and LoanCare ecosystem alignment' },
];

export function calculateBreakeven(monthlyRevenue) {
  return monthlyRevenue >= MONTHLY_COSTS.total;
}

export function projectValuation(annualRevenue, ebitda, multiple = 10) {
  return { low: Math.round(ebitda * multiple * 0.8), high: Math.round(ebitda * multiple * 1.4) };
}

export const revenueEngineConfig = { name: 'revenueEngine', version: '5.0' };
export default revenueEngineConfig;
