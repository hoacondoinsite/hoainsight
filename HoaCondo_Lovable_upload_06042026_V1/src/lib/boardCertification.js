/**
 * HOACONDInsight™ HOA Board Certification Engine
 * $1,200/$2,400/$4,800 per year — Separate revenue stream
 * Zero competition — unique product for HOA boards
 */
export const CERT_TIERS = {
  standard:   { price: 1200, label: 'HOACONDInsight™ Certified',         badgeColor: '#6366f1', renewal: 'annual', features: ['Annual health analysis','Certified badge embed code','Lender-ready documentation','Basic monitoring'] },
  premium:    { price: 2400, label: 'HOACONDInsight™ Premium Certified',  badgeColor: 'var(--gold)', renewal: 'annual', features: ['Quarterly health analysis','Gold badge embed code','Full Fannie Mae report','Priority monitoring — all 8 alerts','Attorney review summary'] },
  enterprise: { price: 4800, label: 'HOACONDInsight™ Enterprise Certified',badgeColor: 'var(--navy)', renewal: 'annual', features: ['Monthly health analysis','Platinum badge embed code','Full board presentation package','24/7 monitoring','Direct attorney access','Board training video'] },
};

export function generateBadgeCode(hoaName, tier) {
  const cert = CERT_TIERS[tier];
  if (!cert) return '';
  return `<div style="display:inline-flex;align-items:center;gap:8px;background:${cert.badgeColor};color:white;padding:10px 18px;border-radius:8px;font-family:sans-serif;font-size:13px;font-weight:700;box-shadow:0 2px 8px rgba(0,0,0,0.15);">
  <span style="font-size:16px;">✓</span>
  <div>
    <div>${cert.label}</div>
    <div style="font-size:10px;font-weight:400;opacity:0.85;">${hoaName} · ${new Date().getFullYear()}</div>
  </div>
</div>`;
}

export function checkEligibility(analysisData) {
  if (!analysisData) return { eligible: false, reason: 'No analysis data' };
  if (analysisData.healthScore < 70) return { eligible: false, reason: 'Health score below 70 — minimum for certification' };
  if (analysisData.fannieMaeStatus !== 'PASS') return { eligible: false, reason: 'Fannie Mae status must be PASS' };
  return { eligible: true, recommendedTier: analysisData.healthScore >= 90 ? 'enterprise' : analysisData.healthScore >= 80 ? 'premium' : 'standard' };
}

export function generateRenewalNotice(hoaName, tier, expiryDate) {
  return {
    to: `manager@${hoaName.toLowerCase().replace(/\s/g,'')} .com`,
    subject: `HOACONDInsight™ Certification Renewal — ${hoaName}`,
    body: `Your ${CERT_TIERS[tier]?.label} certification for ${hoaName} expires on ${expiryDate}. Renew to maintain your certified badge and lender-ready status.`,
    renewalUrl: `https://www.hoacondinsight.com/board-certification/renew`,
  };
}

export const boardCertificationConfig = { name: 'boardCertification', version: '5.1', tiers: Object.keys(CERT_TIERS).length };
export default boardCertificationConfig;
