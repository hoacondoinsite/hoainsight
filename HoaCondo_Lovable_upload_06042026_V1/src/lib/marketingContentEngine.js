/**
 * HOACONDInsight™ Marketing Content Engine
 * 36 asset types across 9 categories. C-Suite approval gate on legal/PR content.
 */
export const ASSET_TYPES = [
  { category: 'Email',     assets: ['Lender outreach','Agent outreach','Title company outreach','Association intro','Buyer nurture sequence'] },
  { category: 'Social',    assets: ['LinkedIn post','LinkedIn article','Twitter/X post','Facebook post','Instagram story'] },
  { category: 'Paid Ads',  assets: ['Google Search ad','LinkedIn ad','Facebook ad','Retargeting ad'] },
  { category: 'PR',        assets: ['Press release','Media pitch','Executive bio','Company fact sheet'] },
  { category: 'Sales',     assets: ['One-pager','Pitch deck slide','Case study','ROI calculator copy','Competitive comparison'] },
  { category: 'Video',     assets: ['Platform overview script','Testimonial script','Demo walkthrough script','How-it-works animation brief'] },
  { category: 'Web',       assets: ['Landing page copy','Blog post','FAQ copy','About page copy'] },
  { category: 'Events',    assets: ['Conference booth copy','Webinar registration page','Speaker bio'] },
  { category: 'Legal',     assets: ['Disclaimer language update','Terms update notice','Regulatory compliance alert'] },
];

export const SAMPLE_ASSETS = {
  lender_email: {
    subject: 'Fannie Mae LL-2026-03 — Your condo loan process just got automated',
    preview: 'Every conventional condo loan now requires Full Review. Here is how HOACONDInsight™ does it in 48 hours.',
    body: `Dear [Name],\n\nFannie Mae Lender Letter LL-2026-03 (effective March 18, 2026) permanently retired the Limited Review pathway for conventional condo loans. Every loan your team originates now requires Full Review.\n\nHOACONDInsight™ automates the entire process:\n• AI document analysis: 30-90 minutes\n• Fannie Mae checklist: automated\n• Form 1076: auto-populated\n• Attorney certification: 48-hour SLA\n\nCost: $39/report or branch licensing from $299/month.\n\nSchedule a 15-minute demo: [LINK]\n\nBest,\n[Name]\nHOACONDInsight™`,
    requiresApproval: false,
  },
  press_release: {
    subject: 'HOACONDInsight™ Launches — Only Automated Fannie Mae Full Review Platform',
    requiresApproval: true,
    approvalNote: 'Legal review required before distribution',
  },
};

export function requiresApproval(assetCategory) {
  return ['Legal', 'PR', 'Paid Ads'].includes(assetCategory);
}

export function getRequiredReviewers(assetCategory) {
  if (assetCategory === 'Legal') return ['csuite', 'legal'];
  if (assetCategory === 'PR') return ['csuite'];
  if (assetCategory === 'Paid Ads') return ['csuite'];
  return [];
}

export function generateAsset(assetType, context = {}) {
  return {
    assetType,
    content: SAMPLE_ASSETS[assetType.toLowerCase().replace(/\s/g, '_')]?.body || `[AI-generated ${assetType} content for HOACONDInsight™. Connect to Living AI engine for full generation.]`,
    requiresApproval: requiresApproval(context.category || ''),
    reviewers: getRequiredReviewers(context.category || ''),
    generatedAt: new Date().toISOString(),
    status: 'draft',
  };
}

export const totalAssetTypes = ASSET_TYPES.reduce((a, c) => a + c.assets.length, 0);
export const marketingContentEngineConfig = { name: 'marketingContentEngine', version: '5.1', categories: ASSET_TYPES.length, totalAssets: totalAssetTypes };
export default marketingContentEngineConfig;
