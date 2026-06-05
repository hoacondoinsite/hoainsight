/**
 * HOACONDInsight™ Test Mode Engine
 * Founder-only activation. No real charges. Watermarked reports.
 * Access: https://www.hoacondinsight.com?mode=test
 */
export const TEST_MODE_URL_PARAM = 'mode=test';
export const TEST_WATERMARK = 'TEST MODE — SAMPLE ONLY — NOT A REAL ANALYSIS';
export const NOTIFY_EMAILS = [
  'peterkleinusa@gmail.com',
  'peter@hoacondinsight.com',
  'legal@hoacondinsight.com',
  'ceo@hoacondinsight.com',
];

export const TEST_STRIPE_CARD = {
  number: '4242 4242 4242 4242',
  expiry: 'Any future date',
  cvv: 'Any 3 digits',
  note: 'This card charges nothing — for testing only',
};

export function isTestMode() {
  try {
    return new URLSearchParams(window.location.search).get('mode') === 'test';
  } catch { return false; }
}

export function getTestWatermark() { return TEST_WATERMARK; }

export function canDisableTestMode(userRole) {
  return userRole === 'founder';
}

export function getTestModeConfig() {
  return {
    active: isTestMode(),
    watermark: TEST_WATERMARK,
    mockData: true,
    stripeTestMode: true,
    notifyOnAccess: NOTIFY_EMAILS,
    testCard: TEST_STRIPE_CARD,
    testUrl: `${typeof window !== 'undefined' ? window.location.origin : 'https://www.hoacondinsight.com'}?mode=test`,
  };
}

export function addWatermarkToReport(reportHTML) {
  const watermarkDiv = `<div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-30deg);font-size:48px;color:rgba(239,68,68,0.15);font-weight:bold;white-space:nowrap;pointer-events:none;z-index:9999;">${TEST_WATERMARK}</div>`;
  return reportHTML.replace('<body>', `<body>${watermarkDiv}`);
}

export const testModeEngineConfig = { name: 'testModeEngine', version: '5.1', notifyEmails: NOTIFY_EMAILS.length };
export default testModeEngineConfig;
