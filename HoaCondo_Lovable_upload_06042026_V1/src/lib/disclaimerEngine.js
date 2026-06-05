/**
 * HOACONDInsight™ Disclaimer Engine
 * Company Rule 8: Every report carries mandatory disclaimers — no exceptions
 */
export const DISCLAIMERS = {
  full: 'HOACONDInsight™ analysis is for informational purposes only and does not constitute legal, financial, or regulatory advice. Results do not represent a Fannie Mae or Freddie Mac lending determination or any regulatory approval. All findings require independent verification by qualified professionals prior to any transaction or lending decision. Hoa Condo Insight LLC is not a law firm and does not provide legal advice. Attorneys who certify analyses are independent licensed professionals whose opinions are their own.',
  short: 'HOACONDInsight™ — Informational only. Not legal or financial advice. Not a Fannie Mae determination.',
  lender: 'This analysis is prepared for informational purposes only. It does not constitute a Fannie Mae Full Review determination, a Freddie Mac eligibility decision, or a lending approval. The lender bears sole responsibility for its underwriting decisions and compliance with applicable guidelines.',
  email: 'HOACONDInsight™ results are for informational purposes only and do not constitute legal, financial, or regulatory advice.',
  pdf_header: 'IMPORTANT: This report is for informational purposes only. It does not constitute legal advice, financial advice, or a regulatory determination. Results must be independently verified before any transaction or lending decision.',
  attorney: 'Attorney certification reflects the independent professional opinion of the certifying attorney. Hoa Condo Insight LLC does not supervise, control, or warrant any attorney opinion. The certifying attorney is solely responsible for their review and conclusions.',
};

export function getDisclaimer(type = 'full') {
  return DISCLAIMERS[type] || DISCLAIMERS.full;
}

export function validateDisclaimerPresent(content) {
  return content.includes('informational') && (content.includes('HOACONDInsight') || content.includes('not constitute'));
}

export function addDisclaimerToReport(reportHTML) {
  const disclaimerHTML = `<div style="border-top:2px solid #e5e7eb;margin-top:40px;padding-top:16px;font-size:11px;color:#6b7280;line-height:1.6;">${DISCLAIMERS.pdf_header}</div>`;
  return reportHTML.replace('</body>', `${disclaimerHTML}</body>`);
}

export const disclaimerEngineConfig = { name: 'disclaimerEngine', version: '5.1', types: Object.keys(DISCLAIMERS).length };
export default disclaimerEngineConfig;
