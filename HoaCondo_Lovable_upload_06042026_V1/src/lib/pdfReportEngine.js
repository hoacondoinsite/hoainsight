import PATENT_CONFIG from './patentConfig.js';
/**
 * HOACONDInsight™ PDF Report Engine
 * Full branded HTML report + browser print-to-PDF
 */
export function generateReportHTML(analysisData) {
  const { healthScore, fannieMaeStatus, factors, propertyAddress, riskFlags = [], recommendations = [] } = analysisData;
  const scoreColor = healthScore >= 80 ? 'var(--green)' : healthScore >= 60 ? '#f59e0b' : '#ef4444';
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>HOACONDInsight™ Report</title>
<style>body{font-family:Arial,sans-serif;margin:40px;color:#1a202c;} h1{color:#0a1628;} .score{font-size:48px;font-weight:bold;color:${scoreColor};} .badge{display:inline-block;padding:4px 12px;border-radius:4px;font-weight:bold;background:${fannieMaeStatus==='PASS'?'#dcfce7':'#fee2e2'};color:${fannieMaeStatus==='PASS'?'#166534':'#991b1b'};} .disclaimer{font-size:11px;color:#6b7280;border-top:1px solid #e5e7eb;margin-top:40px;padding-top:16px;}</style>
</head><body>
<h1>HOACONDInsight™ HOA Health Analysis</h1>
<p><strong>Property:</strong> ${propertyAddress}</p>
<p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
<hr/>
<div class="score">${healthScore}/100</div>
<p>Fannie Mae Status: <span class="badge">${fannieMaeStatus}</span></p>
<h2>Risk Factors</h2>
<ul>${riskFlags.map(f => `<li>${f}</li>`).join('')}</ul>
<h2>Recommendations</h2>
<ul>${recommendations.map(r => `<li>${r}</li>`).join('')}</ul>
<div class="disclaimer">HOACONDInsight™ — Informational only. Not legal or financial advice. Does not constitute a Fannie Mae determination. U.S. Utility Patent ${PATENT_CONFIG.reportPatentLine()}.</div>
</body></html>`;
}
export function downloadReport(analysisData) {
  const html = generateReportHTML(analysisData);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'HOACONDInsight-Report.html'; a.click();
}
export const pdfReportEngineConfig = { name: 'pdfReportEngine', version: '5.0' };
export default pdfReportEngineConfig;
