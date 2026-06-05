/**
 * HOACONDInsight™ Support AI Engine
 * Handles 90% of support questions automatically
 */
export const FAQ_RESPONSES = {
  'what does the score mean': 'The HOACONDInsight™ Health Score (0-100) reflects the overall financial and governance health of the HOA. 80+ = Strong, 60-79 = Adequate, Below 60 = Concerns exist. The score is calculated from 6 weighted factors.',
  'how do i upload documents': 'Go to your Order page and use the document upload area. We accept PDF, JPG, PNG, and DOCX files. Drag and drop or click to browse.',
  'can i get a refund': 'Refunds are available within 30 minutes of ordering if analysis has not started. Once document review begins, no refunds are available. Contact support@hoacondinsight.com.',
  'how long does analysis take': 'Most analyses complete within 24-48 hours. Attorney certification adds up to 48 hours. You will receive an email when your report is ready.',
  'what is fannie mae full review': 'Fannie Mae Lender Letter LL-2026-03 (effective March 18, 2026) requires all conventional condo loans to undergo Full Review of the HOA\'s financial documents. The Limited Review option has been permanently retired.',
  'what documents do i need': `You need: budget, reserve study, audited financials, insurance policy, board minutes, delinquency report, and CC&Rs. We can request these from the HOA manager on your behalf.`,
};
export function getAutoResponse(question) {
  const lower = question.toLowerCase();
  for (const [key, answer] of Object.entries(FAQ_RESPONSES)) {
    if (lower.includes(key.split(' ')[0]) && lower.includes(key.split(' ').pop())) return { answered: true, response: answer, confidence: 0.85 };
  }
  return { answered: false, escalate: true, reason: 'Question requires human review' };
}
export const supportAIConfig = { name: 'supportAI', version: '5.0', faqCount: Object.keys(FAQ_RESPONSES).length };
export default supportAIConfig;
