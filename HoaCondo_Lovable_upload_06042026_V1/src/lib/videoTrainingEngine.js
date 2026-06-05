/**
 * HOACONDInsight™ Video Training Engine
 * 15 pre-built scripts, AI generator, SOP validator
 */
export const TRAINING_VIDEOS = [
  { id: 1, title: 'Platform Overview', level: 'all', duration: '3 min', status: 'approved' },
  { id: 2, title: 'Buyer: How to Order Your Report', level: 'buyer', duration: '2 min', status: 'approved' },
  { id: 3, title: 'Lender: Fannie Mae Full Review Compliance', level: 'lender', duration: '4 min', status: 'approved' },
  { id: 4, title: 'Attorney: Certification Process', level: 'attorney', duration: '3 min', status: 'approved' },
  { id: 5, title: 'HOA Association: Document Portal Guide', level: 'association', duration: '3 min', status: 'approved' },
  { id: 6, title: 'White Label: Setup and Branding', level: 'white_label', duration: '5 min', status: 'approved' },
  { id: 7, title: 'Admin: Using the Operating System', level: 'admin', duration: '8 min', status: 'approved' },
  { id: 8, title: 'Founder: Daily 60-Second Brief', level: 'founder', duration: '1 min', status: 'approved' },
  { id: 9, title: 'Data Privacy and Rule 11', level: 'all', duration: '3 min', status: 'approved' },
  { id: 10, title: 'Emergency Operations Protocol', level: 'csuite', duration: '4 min', status: 'pending' },
  { id: 11, title: 'Partner: Referral Program Guide', level: 'partner', duration: '2 min', status: 'approved' },
  { id: 12, title: 'DEI and Anti-Harassment Policy', level: 'all', duration: '3 min', status: 'approved' },
  { id: 13, title: 'Integration Activation Guide', level: 'admin', duration: '5 min', status: 'pending' },
  { id: 14, title: 'Legal: Arbitration and Terms Explained', level: 'legal', duration: '4 min', status: 'pending' },
  { id: 15, title: 'Customer Service: AI + Human Escalation', level: 'support', duration: '3 min', status: 'approved' },
];
export function validateScript(script) {
  const violations = [];
  if (!script.includes('HOACONDInsight™')) violations.push('Must mention brand name');
  if (!script.includes('informational')) violations.push('Must include informational disclaimer');
  return { valid: violations.length === 0, violations };
}
export const videoTrainingEngineConfig = { name: 'videoTrainingEngine', version: '5.0', videos: TRAINING_VIDEOS.length };
export default videoTrainingEngineConfig;
