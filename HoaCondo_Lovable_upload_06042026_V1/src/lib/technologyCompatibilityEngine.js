/**
 * HOACONDInsight™ Technology Compatibility Engine
 * Self-updating, device-agnostic, graceful degradation
 */

export function initTechnologyCompatibility() {
  const ua = navigator.userAgent;
  const device = detectDevice(ua);
  applyOptimalExperience(device);
  console.log(`[HOACONDInsight] Technology Compatibility: ${device} mode activated`);
}

function detectDevice(ua) {
  if (/iPad|tablet/i.test(ua)) return 'tablet';
  if (/iPhone|Android.*Mobile/i.test(ua)) return 'mobile';
  return 'desktop';
}

function applyOptimalExperience(device) {
  document.documentElement.setAttribute('data-device', device);
  if (device === 'mobile') {
    document.documentElement.style.setProperty('--layout-cols', '1');
  } else if (device === 'tablet') {
    document.documentElement.style.setProperty('--layout-cols', '2');
  } else {
    document.documentElement.style.setProperty('--layout-cols', '3');
  }
}

export function checkFeatureSupport(feature) {
  const supports = { webGL: !!document.createElement('canvas').getContext('webgl'), serviceWorker: 'serviceWorker' in navigator, notifications: 'Notification' in window };
  return supports[feature] || false;
}

export default { initTechnologyCompatibility, checkFeatureSupport };
