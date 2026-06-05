/**
 * HOACONDInsight™ Living AI Engine
 * Universal knowledge interface — 8 user roles, 9 output formats
 */
export const USER_PROFILES = {
  founder: { access: 'all', label: 'Founder', templates: ['investor_package', 'pe_data_room', 'board_presentation', 'monthly_accounting'] },
  csuite: { access: 'all', label: 'C-Suite', templates: ['board_presentation', 'monthly_accounting', 'compliance_summary'] },
  finance: { access: ['finance', 'analytics'], label: 'Finance', templates: ['monthly_accounting', 'investor_package'] },
  legal: { access: ['legal', 'compliance'], label: 'Legal', templates: ['compliance_summary', 'attorney_earnings'] },
  marketing: { access: ['marketing', 'analytics'], label: 'Marketing', templates: ['marketing_report'] },
  lender: { access: ['analyses', 'reports'], label: 'Lender', templates: ['lender_compliance'] },
  buyer: { access: ['own_reports'], label: 'Buyer', templates: ['buyer_summary'] },
  attorney: { access: ['assigned_analyses'], label: 'Attorney', templates: ['attorney_earnings'] },
};
export const OUTPUT_FORMATS = ['screen', 'PDF', 'email', 'print', 'Word', 'CSV', 'share_link', 'presentation', 'voice'];
export const REPORT_TEMPLATES = {
  investor_package: { label: 'Complete Investor Financial Package', sections: ['Executive Summary', 'Revenue Model', 'Projections', 'Exit Strategy', 'IP Status'] },
  pe_data_room: { label: 'PE Due Diligence Data Room', sections: ['Platform Capabilities', 'Financial Performance', 'IP Portfolio', 'Market Position', 'Team'] },
  monthly_accounting: { label: 'Monthly Accounting Package', sections: ['Revenue Summary', 'Cost Breakdown', 'Commission Payouts', 'Cash Position'] },
  buyer_summary: { label: 'Buyer Plain-English Summary', sections: ['Health Score Explained', 'Key Risks', 'Recommendations', 'Next Steps'] },
  lender_compliance: { label: 'Lender Compliance Summary', sections: ['Fannie Mae Status', 'Full Review Checklist', 'Form 1076', 'Attorney Certification'] },
};
export function generateReport(userRole, templateId, liveData) {
  const template = REPORT_TEMPLATES[templateId];
  const profile = USER_PROFILES[userRole];
  if (!template) return { error: 'Template not found' };
  return { template: template.label, sections: template.sections, generatedAt: new Date().toISOString(), userRole, data: liveData || {} };
}
export const livingAIConfig = { name: 'livingAI', version: '5.0', userProfiles: Object.keys(USER_PROFILES).length, outputFormats: OUTPUT_FORMATS.length };
export default livingAIConfig;
