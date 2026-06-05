/**
 * HOACONDInsight™ LOS Integration Hub
 * Tier 1: Direct (7 platforms ~75% market), Tier 2: Middleware, Tier 3: Universal Link
 */
export const LOS_PLATFORMS = {
  encompass: { name: 'Encompass/ICE', marketShare: '40%', tier: 1, fieldMap: { loanNumber: 'Loan.LoanNumber', propertyAddress: 'Loan.Subject.Property.Address', borrowerName: 'Loan.Borrower.Name' } },
  calyx: { name: 'Calyx Point', marketShare: '15%', tier: 1, fieldMap: { loanNumber: 'loan_id', propertyAddress: 'property.address' } },
  byte: { name: 'Byte Software', marketShare: '8%', tier: 1, fieldMap: { loanNumber: 'LoanNumber', propertyAddress: 'PropertyAddress' } },
  meridianlink: { name: 'MeridianLink', marketShare: '7%', tier: 1, fieldMap: { loanNumber: 'loan_number', propertyAddress: 'collateral.address' } },
  blend: { name: 'Blend', marketShare: '5%', tier: 1, fieldMap: { loanNumber: 'id', propertyAddress: 'property.streetAddress' } },
  zapier: { name: 'Zapier Middleware', marketShare: '~20% via connectors', tier: 2 },
  universal: { name: 'Universal HOACONDInsight Link (Browser Extension)', marketShare: '100% fallback', tier: 3, note: 'Works in ANY LOS without API agreement' },
};
export function createOrderFromLOS(losData, platform) {
  const map = LOS_PLATFORMS[platform]?.fieldMap || {};
  return { propertyAddress: losData[map.propertyAddress] || losData.propertyAddress, loanNumber: losData[map.loanNumber] || losData.loanNumber, source: platform };
}
export function writeResultsToLOS(analysisResult, platform) {
  return { platform, hoaScore: analysisResult.healthScore, fannieMaeStatus: analysisResult.fannieMaeStatus, writtenAt: new Date().toISOString() };
}
export const losIntegrationConfig = { name: 'losIntegration', version: '5.0', platforms: Object.keys(LOS_PLATFORMS).length };
export default losIntegrationConfig;
