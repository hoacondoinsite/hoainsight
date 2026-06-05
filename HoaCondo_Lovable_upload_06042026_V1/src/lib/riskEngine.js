/**
 * HOACONDInsight™ Risk Engine
 * 10 Early Warning Rules + Platform Health Score
 */

export const EARLY_WARNING_RULES = [
  { id: 1, name: 'Reserve Fund Critical', trigger: 'reserveFunded < 10', severity: 'CRITICAL', action: 'Flag loan, require attorney escalation' },
  { id: 2, name: 'Active Litigation', trigger: 'activeLitigation === true', severity: 'CRITICAL', action: 'Auto-fail Fannie Mae check, notify lender' },
  { id: 3, name: 'Insurance Lapse', trigger: 'insuranceCurrent === false', severity: 'CRITICAL', action: 'Block report delivery, escalate to attorney' },
  { id: 4, name: 'Delinquency Spike', trigger: 'delinquencyRate > 15', severity: 'HIGH', action: 'Add risk flag, recommend buyer protection' },
  { id: 5, name: 'Special Assessment Pending', trigger: 'specialAssessmentPending === true', severity: 'HIGH', action: 'Flag in report, offer negotiation coach' },
  { id: 6, name: 'Owner Occupancy Below Threshold', trigger: 'ownerOccupancy < 51', severity: 'HIGH', action: 'Auto-fail Fannie Mae eligibility check' },
  { id: 7, name: 'Reserve Study Outdated', trigger: 'reserveStudyAge > 3', severity: 'MEDIUM', action: 'Request updated reserve study' },
  { id: 8, name: 'Management Company Change', trigger: 'managementChange === true', severity: 'MEDIUM', action: 'Flag governance risk' },
  { id: 9, name: 'HOA Fee Delinquency Trend', trigger: 'delinquencyTrend === "increasing"', severity: 'MEDIUM', action: 'Add trend analysis to report' },
  { id: 10, name: 'Document Completeness Below 70%', trigger: 'docCompleteness < 70', severity: 'LOW', action: 'Request missing documents before analysis' },
];

export function calculatePlatformHealthScore(metrics) {
  const { analysisSuccessRate = 100, attorneyComplianceRate = 100, avgTurnaround = 24, customerSatisfaction = 100, systemUptime = 100 } = metrics;
  return Math.round(
    (analysisSuccessRate * 0.30) + (attorneyComplianceRate * 0.25) +
    (Math.max(0, 100 - (avgTurnaround - 24) * 2) * 0.20) +
    (customerSatisfaction * 0.15) + (systemUptime * 0.10)
  );
}

export function evaluateRisks(analysisData) {
  const triggered = [];
  EARLY_WARNING_RULES.forEach(rule => {
    const { factors, fannieMaeChecks } = analysisData;
    let fire = false;
    if (rule.id === 1 && factors?.reserveFundHealth < 10) fire = true;
    if (rule.id === 2 && fannieMaeChecks?.noActiveConviction === false) fire = true;
    if (rule.id === 3 && fannieMaeChecks?.insuranceCurrent === false) fire = true;
    if (rule.id === 4 && factors?.financialDelinquency < 85) fire = true;
    if (rule.id === 6 && fannieMaeChecks?.ownerOccupancy === false) fire = true;
    if (fire) triggered.push(rule);
  });
  return triggered;
}

export const riskEngineConfig = { name: 'riskEngine', version: '5.0', rules: EARLY_WARNING_RULES.length };
export default riskEngineConfig;
