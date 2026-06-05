/**
 * HOACONDInsight™ Technology Update Engine
 * Daily 8:00 PM ET automatic AI technology scan and update
 * Hoa Condo Insight LLC · 61 N Lakeshore Drive, Hypoluxo, Florida 33462
 *
 * How it works: Every day at 8:00 PM ET, the system uses AI to scan for:
 * - New versions of all connected software
 * - New communication technologies
 * - Security patches for all dependencies
 * - New integrations that are relevant to our business
 * - Changes to APIs we use (Fannie Mae, etc.)
 *
 * The system is designed to be current from Day 1 through eternity.
 */

export const UPDATE_SCHEDULE = {
  time: '20:00', // 8:00 PM
  timezone: 'America/New_York',
  frequency: 'daily',
  notify: ['peter@hoacondinsight.com', 'ceo@hoacondinsight.com'],
  notifyOnChangesOnly: true,
};

export const MONITORED_TECH_CATEGORIES = [
  { id: 'email',           label: 'Email Platforms & APIs',         description: 'Resend, SendGrid, Mailgun, Postmark — new features and pricing' },
  { id: 'voip',            label: 'VoIP & Voice Technology',        description: 'Twilio, OpenPhone, RingCentral — new capabilities' },
  { id: 'video',           label: 'Video Conferencing',             description: 'Zoom, Teams, Meet, Webex — API changes' },
  { id: 'messaging',       label: 'Messaging Platforms',            description: 'WhatsApp, Slack, Teams — new Business API features' },
  { id: 'ai_models',       label: 'AI Language Models',             description: 'GPT-4o, Claude, Gemini — new models and capabilities' },
  { id: 'document',        label: 'Document Technologies',          description: 'PDF, Word, Excel, PowerPoint — new open-source libraries' },
  { id: 'microsoft',       label: 'Microsoft 365 & Graph API',      description: 'Microsoft Office, Teams, OneDrive — API updates' },
  { id: 'adobe',           label: 'Adobe Products & APIs',          description: 'Adobe Sign, PDF Services, Creative Cloud — API changes' },
  { id: 'security',        label: 'Security Technologies',          description: 'Authentication, encryption, WAF — new standards' },
  { id: 'database',        label: 'Database Technologies',          description: 'Supabase, PostgreSQL — new features and versions' },
  { id: 'fannie_mae',      label: 'Fannie Mae & FHFA',              description: 'Regulatory changes, new forms, compliance updates' },
  { id: 'mobile',          label: 'Mobile Technologies',            description: 'iOS, Android, React Native — new capabilities' },
  { id: 'cloud',           label: 'Cloud Infrastructure',           description: 'AWS, Google Cloud, Azure — new services relevant to us' },
  { id: 'payment',         label: 'Payment Technologies',           description: 'Stripe, PayPal — new features and compliance' },
  { id: 'crm',             label: 'CRM & Sales Tools',              description: 'HubSpot, Salesforce, Close — API and feature updates' },
  { id: 'ecommerce',       label: 'E-commerce & Subscription',      description: 'Stripe billing, Chargebee — subscription management' },
  { id: 'analytics',       label: 'Analytics Tools',                description: 'GA4, PostHog, Mixpanel — new features' },
  { id: 'automation',      label: 'Automation Platforms',           description: 'Zapier, Make, n8n — new triggers and actions' },
  { id: 'esignature',      label: 'E-Signature Technologies',       description: 'DocuSign, HelloSign, DocuSeal — regulatory updates' },
  { id: 'accessibility',   label: 'Accessibility Standards',        description: 'WCAG updates — ensure platform remains accessible' },
];

export const UPDATE_TYPES = {
  security_patch:  { priority: 'CRITICAL', autoApply: false, notifyImmediate: true, label: 'Security Patch' },
  major_version:   { priority: 'HIGH',     autoApply: false, notifyImmediate: true, label: 'Major Version Change' },
  minor_version:   { priority: 'NORMAL',   autoApply: false, notifyImmediate: false, label: 'Minor Update' },
  new_feature:     { priority: 'LOW',      autoApply: false, notifyImmediate: false, label: 'New Feature Available' },
  new_integration: { priority: 'LOW',      autoApply: false, notifyImmediate: false, label: 'New Integration Opportunity' },
  regulatory:      { priority: 'CRITICAL', autoApply: false, notifyImmediate: true, label: 'Regulatory Change' },
  deprecation:     { priority: 'HIGH',     autoApply: false, notifyImmediate: true, label: 'API Deprecation Warning' },
};

// KEY PRINCIPLE: No update is auto-applied without human review
// All updates are queued in Admin → Tech Updates for C-Suite or Founder review
// Security patches trigger immediate notification to Founder and C-Suite
// AI identifies the update, explains it in plain English, and provides a recommended action

export function generateUpdateReport(updates) {
  const critical = updates.filter(u => UPDATE_TYPES[u.type]?.priority === 'CRITICAL');
  const high = updates.filter(u => UPDATE_TYPES[u.type]?.priority === 'HIGH');
  const others = updates.filter(u => !['CRITICAL','HIGH'].includes(UPDATE_TYPES[u.type]?.priority));
  return {
    generatedAt: new Date().toISOString(),
    totalUpdates: updates.length,
    critical: critical.length,
    high: high.length,
    others: others.length,
    updates,
    summary: `Daily Tech Scan: ${updates.length} updates found. ${critical.length} critical, ${high.length} high priority.`,
    notifyNow: critical.length > 0 || high.length > 0,
  };
}

export function getPlainEnglishExplanation(updateType, techName, version) {
  const explanations = {
    security_patch: `🔴 IMPORTANT: ${techName} released a security fix (version ${version}). This protects your system from known vulnerabilities. Your admin team should review and apply this update.`,
    major_version:  `⚠️ ${techName} released a major new version (${version}). Major versions sometimes break existing connections. Review before updating.`,
    minor_version:  `ℹ️ ${techName} has a minor update (${version}). Usually safe improvements — review the changelog before applying.`,
    new_feature:    `✨ ${techName} added new features in version ${version}. Review to see if any improve your platform.`,
    new_integration:`💡 New integration opportunity with ${techName} was identified. Could benefit your platform.`,
    regulatory:     `🚨 REGULATORY CHANGE: ${techName} has updated requirements that may affect your compliance. Review immediately.`,
    deprecation:    `⏰ WARNING: A feature in ${techName} is being discontinued in version ${version}. Action required before cutoff date.`,
  };
  return explanations[updateType] || `Update available for ${techName} (${version}).`;
}

export const technologyUpdateEngineVersion = '5.1';
export default { UPDATE_SCHEDULE, MONITORED_TECH_CATEGORIES, UPDATE_TYPES, generateUpdateReport, getPlainEnglishExplanation };
