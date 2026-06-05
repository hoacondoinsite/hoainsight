/**
 * HOACONDInsight™ Risk Management Foundation
 * THE DEEPEST LAYER — every platform action passes through this before execution
 * Operates as if a seasoned risk manager reviews every action, communication, and contract
 */
export const RISK_QUESTIONS = [
  'Would a prudent risk manager approve this action?',
  'Does this expose the company to legal liability?',
  'Does this conflict with any known regulation or law?',
  'Is this consistent with all 13 Company Rules?',
  'Does this require attorney review before execution?',
  'Does this involve personal data that requires consent?',
  'Does this create financial obligations above authorized limits?',
];

export const ACTION_THRESHOLDS = {
  requiresFounder: ['deleteData','modifyPricing','changeCompanyRule','activateDataSale','majorArchitectureChange'],
  requiresCSuite:  ['toggleIntegration','approveMarketing','approveContract','deployEmergency','modifyLegalText'],
  requiresLegal:   ['publishLegalPage','signContract','respondToLegalDemand','modifyTerms'],
  auto:            ['runAnalysis','sendConfirmationEmail','assignAttorney','calculateCommission','generateReport'],
};

export function evaluateAction(action, context) {
  const flags = [];
  if (ACTION_THRESHOLDS.requiresFounder.includes(action) && context.role !== 'founder') {
    flags.push({ rule: 'Company Rule 1', issue: 'Founder authorization required for this action', severity: 'BLOCK' });
  }
  if (ACTION_THRESHOLDS.requiresCSuite.includes(action) && !['founder','csuite'].includes(context.role)) {
    flags.push({ rule: 'Company Rule 1', issue: 'C-Suite authorization required', severity: 'BLOCK' });
  }
  if (action === 'activateDataSale' && !context.rule11Authorized) {
    flags.push({ rule: 'Company Rule 11', issue: 'Data monetization requires 5-step legal authorization — gate not cleared', severity: 'BLOCK' });
  }
  if (action.includes('contract') && !context.arbitrationClause) {
    flags.push({ rule: 'Company Rule 12', issue: 'Arbitration clause missing from contract', severity: 'BLOCK' });
  }
  if (context.amount > 10000 && !context.csuiteApproved) {
    flags.push({ rule: 'Financial Controls', issue: 'Transactions over $10,000 require C-Suite approval', severity: 'BLOCK' });
  }
  const blocking = flags.filter(f => f.severity === 'BLOCK');
  return {
    approved: blocking.length === 0,
    blocked: blocking.length > 0,
    flags, blocking,
    evaluatedAt: new Date().toISOString(),
    action, role: context.role,
  };
}

export function isAutoApproved(action) {
  return ACTION_THRESHOLDS.auto.includes(action);
}

export const riskManagementFoundationConfig = { name: 'riskManagementFoundation', version: '5.1', riskQuestions: RISK_QUESTIONS.length };
export default riskManagementFoundationConfig;
