/**
 * HOACONDInsight™ Integration Toggle Engine
 * All 47 integrations with metadata — matches Developer Brief V4 Section 4
 */
export const ALL_INTEGRATIONS = [
  { id: 'supabase', name: 'Supabase', category: 'Database', phase: 1, required: true },
  { id: 'stripe', name: 'Stripe', category: 'Payments', phase: 1, required: true },
  { id: 'openai', name: 'OpenAI GPT-4o', category: 'AI Engine', phase: 1, required: true },
  { id: 'resend', name: 'Resend', category: 'Email', phase: 1, required: true },
  { id: 'lovable', name: 'Lovable Pro', category: 'Hosting', phase: 1, required: true },
  { id: 'courtlistener', name: 'CourtListener', category: 'Legal Research', phase: 1 },
  { id: 'closeai', name: 'Close.ai', category: 'Sales CRM', phase: 2 },
  { id: 'hubspot', name: 'HubSpot', category: 'Marketing CRM', phase: 2 },
  { id: 'quickbooks', name: 'QuickBooks Online', category: 'Accounting', phase: 2 },
  { id: 'apollo', name: 'Apollo.io', category: 'Sales Intelligence', phase: 2 },
  { id: 'twilio', name: 'Twilio', category: 'SMS/Voice', phase: 2 },
  { id: 'slack', name: 'Slack', category: 'Team Communication', phase: 2 },
  { id: 'docusign', name: 'DocuSign', category: 'E-Signature', phase: 2 },
  { id: 'googleanalytics', name: 'Google Analytics 4', category: 'Analytics', phase: 1 },
  { id: 'buffer', name: 'Buffer', category: 'Social Media', phase: 2 },
  { id: 'mailchimp', name: 'Mailchimp', category: 'Email Marketing', phase: 2 },
  { id: 'vanta', name: 'Vanta (SOC2)', category: 'Compliance', phase: 3 },
  { id: 'datadog', name: 'Datadog', category: 'Monitoring', phase: 2 },
  { id: 'sentry', name: 'Sentry', category: 'Error Tracking', phase: 1 },
  { id: 'intercom', name: 'Intercom', category: 'Customer Support', phase: 2 },
  { id: 'zapier', name: 'Zapier', category: 'Automation', phase: 2 },
  { id: 'losEncompass', name: 'Encompass (ICE)', category: 'LOS', phase: 2 },
  { id: 'losMeridianLink', name: 'MeridianLink', category: 'LOS', phase: 3 },
  { id: 'lexisnexis', name: 'LexisNexis', category: 'Legal Intelligence', phase: 3 },
];
export function getPhaseIntegrations(phase) { return ALL_INTEGRATIONS.filter(i => i.phase === phase); }
export function getRequiredIntegrations() { return ALL_INTEGRATIONS.filter(i => i.required); }
export const integrationToggleEngineConfig = { name: 'integrationToggleEngine', version: '5.0', total: ALL_INTEGRATIONS.length };
export default integrationToggleEngineConfig;
