/**
 * HOACONDInsight™ Backup Validation Engine
 * Company Rule 13: Every backup validated against Master File Manifest before distribution
 */
export const MASTER_MANIFEST = {
  root: ['index.html','package.json','vite.config.js','LOVABLE_README.md','BACKUP_VALIDATION.md'],
  app: ['src/main.jsx','src/App.jsx','src/index.css'],
  components: ['src/components/Nav.jsx','src/components/Footer.jsx','src/components/ScoreCard.jsx'],
  lib: [
    'src/lib/COMPANY_DESIGN_PRINCIPLE.js','src/lib/aiEngine.js','src/lib/supabase.js',
    'src/lib/commissions.js','src/lib/emails.js','src/lib/legalTextContent.js',
    'src/lib/riskEngine.js','src/lib/revenueEngine.js','src/lib/marketingEngine.js',
    'src/lib/whiteLabelEngine.js','src/lib/systemUpdateEngine.js','src/lib/disclaimerEngine.js',
    'src/lib/form1076Engine.js','src/lib/monitoringEngine.js','src/lib/boardCertification.js',
    'src/lib/documentRequestEngine.js','src/lib/dealRoomEngine.js','src/lib/regulatoryIntelligence.js',
    'src/lib/supportAI.js','src/lib/livingAI.js','src/lib/testModeEngine.js',
    'src/lib/backupValidationEngine.js','src/lib/technologyCompatibilityEngine.js',
    'src/lib/negotiationCoach.js','src/lib/integrationDataPushEngine.js',
    'src/lib/integrationToggleEngine.js','src/lib/losIntegration.js',
    'src/lib/dataIntelligenceEngine.js','src/lib/edgeFunctions.js','src/lib/pdfReportEngine.js',
    'src/lib/videoTrainingEngine.js','src/lib/emergencyOperationsEngine.js',
    'src/lib/associationEngine.js','src/lib/marketingContentEngine.js',
  ],
  enterprise: [
    'src/lib/enterprise/enterpriseLicenseEngine.js',
    'src/lib/enterprise/legalOperationsLayer.js',
    'src/lib/enterprise/riskManagementFoundation.js',
  ],
};

export function validateBackup(fileList) {
  const all = Object.values(MASTER_MANIFEST).flat();
  const missing = all.filter(f => !fileList.some(fl => fl.includes(f.split('/').pop())));
  const extra = fileList.filter(f => !all.some(m => f.includes(m.split('/').pop())));
  return {
    passed: missing.length === 0,
    missing, extra,
    total: all.length,
    found: all.length - missing.length,
    report: missing.length === 0 ? 'BACKUP ACCEPTED — All files present.' : `BACKUP REJECTED — ${missing.length} files missing.`,
  };
}

export function generateValidationReport(fileList) {
  const result = validateBackup(fileList);
  return {
    ...result,
    timestamp: new Date().toISOString(),
    version: '5.1',
    rule: 'Company Rule 13: Zero missing files policy',
  };
}

export function quickCheck(fileList) {
  return validateBackup(fileList).passed;
}

export function getManifestCount() {
  return Object.values(MASTER_MANIFEST).flat().length;
}

export const backupValidationEngineConfig = { name: 'backupValidationEngine', version: '5.1', manifestFiles: getManifestCount() };
export default backupValidationEngineConfig;
