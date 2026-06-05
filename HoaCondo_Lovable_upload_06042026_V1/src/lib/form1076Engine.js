/**
 * HOACONDInsight™ Form 1076 Auto-Population Engine
 * Maps AI analysis to Fannie Mae Form 1076 fields
 */
export function populateForm1076(analysisData) {
  const { factors, fannieMaeChecks, propertyAddress } = analysisData;
  return {
    projectName: propertyAddress || '',
    projectAddress: propertyAddress || '',
    projectType: 'Condominium',
    numberOfUnits: analysisData.unitCount || '',
    percentageOwnerOccupied: fannieMaeChecks?.ownerOccupancy ? '51%+' : 'Below 51%',
    reserveFundBalance: factors?.reserveFundHealth >= 10 ? 'Meets minimum' : 'Below minimum',
    specialAssessmentPending: analysisData.riskFlags?.some(f => f.includes('special assessment')) ? 'Yes' : 'No',
    litigationPending: fannieMaeChecks?.noActiveConviction === false ? 'Yes' : 'No',
    insuranceCoverage: fannieMaeChecks?.insuranceCurrent ? 'Current' : 'Lapsed/Gap',
    projectEligibility: analysisData.fannieMaeStatus === 'PASS' ? 'Eligible' : 'Ineligible',
    preparedBy: 'HOACONDInsight™ Automated Analysis',
    preparedDate: new Date().toLocaleDateString(),
    disclaimer: 'This pre-populated form requires lender review and certification. HOACONDInsight does not make final eligibility determinations.',
  };
}
export const form1076EngineConfig = { name: 'form1076Engine', version: '5.0' };
export default form1076EngineConfig;
