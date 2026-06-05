export const COMMISSION_RATES = {
  individual_report: { rate: 0.25, base: 39 },
  starter_plan: { rate: 0.20, base: 149 },
  professional_plan: { rate: 0.20, base: 299 },
  attorney_review: { rate: 0, base: 149, attorneySplit: 0.60 },
  negotiation_coach: { rate: 0.25, base: 19 },
  lender_branch: { rate: 0.15, base: 299 },
  lender_regional: { rate: 0.12, base: 999 },
  lender_enterprise: { rate: 0.10, base: 2499 },
};

export const ATTORNEY_SPLIT = 0.60; // 60% to attorney, 40% to company

export function calculateCommission(productType, partnerCode) {
  const product = COMMISSION_RATES[productType];
  if (!product) return 0;
  return Math.round(product.base * product.rate * 100) / 100;
}

export function calculateAttorneyPayout(analysisRevenue) {
  return Math.round(analysisRevenue * ATTORNEY_SPLIT * 100) / 100;
}

export function generateMonthlyPayouts(analyses) {
  const payouts = {};
  analyses.forEach(a => {
    if (a.attorney_id && a.amount) {
      if (!payouts[a.attorney_id]) payouts[a.attorney_id] = 0;
      payouts[a.attorney_id] += calculateAttorneyPayout(a.amount);
    }
  });
  return payouts;
}
