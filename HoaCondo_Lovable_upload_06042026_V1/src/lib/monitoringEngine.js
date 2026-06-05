/**
 * HOACONDInsight™ Annual Monitoring Engine
 * $49/yr Basic, $99/yr Pro — 8 alert types
 */
export const ALERT_TYPES = [
  { id: 'scoreDrops', label: 'Health Score drops 10+ points', severity: 'HIGH', tier: 'basic' },
  { id: 'specialAssessment', label: 'Special assessment detected', severity: 'CRITICAL', tier: 'basic' },
  { id: 'reserveCritical', label: 'Reserve fund drops below 10%', severity: 'CRITICAL', tier: 'basic' },
  { id: 'fannieMaeFlip', label: 'Fannie Mae compliance status changes', severity: 'CRITICAL', tier: 'basic' },
  { id: 'litigationNew', label: 'New litigation filed', severity: 'HIGH', tier: 'pro' },
  { id: 'insuranceGap', label: 'Insurance coverage gap detected', severity: 'HIGH', tier: 'pro' },
  { id: 'delinquencySpike', label: 'Delinquency rate spikes above 12%', severity: 'MEDIUM', tier: 'pro' },
  { id: 'regulatoryChange', label: 'New regulation affects HOA compliance', severity: 'HIGH', tier: 'pro' },
];
export const PLANS = {
  basic: { price: 49, period: 'year', alerts: ALERT_TYPES.filter(a => a.tier === 'basic'), reanalysisFreq: 'annual' },
  pro: { price: 99, period: 'year', alerts: ALERT_TYPES, reanalysisFreq: 'quarterly' },
};
export function generateUpsell(analysisId, buyerEmail) {
  return { analysisId, buyerEmail, offerBasic: true, offerPro: true, displayAfterReport: true };
}
export const monitoringEngineConfig = { name: 'monitoringEngine', version: '5.0', plans: Object.keys(PLANS).length, alertTypes: ALERT_TYPES.length };
export default monitoringEngineConfig;
