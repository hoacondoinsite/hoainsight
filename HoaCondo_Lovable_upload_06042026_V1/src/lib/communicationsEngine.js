/**
 * HOACONDInsight™ Communications Engine
 * Fortune 500-grade unified communications management
 * Hoa Condo Insight LLC · 61 N Lakeshore Drive, Hypoluxo, Florida 33462
 *
 * Handles: Email (inbound + outbound), VoIP, Zoom, WhatsApp, MS Teams,
 * MS Office, Adobe Suite, PDF, PowerPoint, and all future tech via AI daily update
 *
 * Every communication is logged permanently and securely in Supabase
 * SOP-validated before any new vendor integration activates
 */

export const COMPANY_ADDRESS = {
  name:    'Hoa Condo Insight LLC',
  street:  '61 N Lakeshore Drive',
  city:    'Hypoluxo',
  state:   'Florida',
  zip:     '33462',
  full:    '61 N Lakeshore Drive, Hypoluxo, Florida 33462',
  phone:   'support@hoacondinsight.com',
  email:   'peter@hoacondinsight.com',
  website: 'hoacondinsight.com',
};

// ── EMAIL CATEGORIES ─────────────────────────────────────────────
export const EMAIL_CATEGORIES = {
  inbound: {
    support:    { address: 'support@hoacondinsight.com',    label: 'Customer Support',    priority: 'normal',   autoReply: true,  folder: 'Support' },
    enterprise: { address: 'enterprise@hoacondinsight.com', label: 'Enterprise & Lenders', priority: 'high',    autoReply: true,  folder: 'Enterprise' },
    whitelabel: { address: 'whitelabel@hoacondinsight.com', label: 'White Label',          priority: 'high',    autoReply: true,  folder: 'WhiteLabel' },
    attorneys:  { address: 'attorneys@hoacondinsight.com',  label: 'Attorney Network',     priority: 'normal',  autoReply: true,  folder: 'Attorneys' },
    legal:      { address: 'legal@hoacondinsight.com',       label: 'Legal',               priority: 'critical', autoReply: false, folder: 'Legal' },
    peter:      { address: 'peter@hoacondinsight.com',       label: 'Founder Direct',      priority: 'critical', autoReply: false, folder: 'Founder' },
    partners:   { address: 'partners@hoacondinsight.com',    label: 'Partner Program',     priority: 'normal',  autoReply: true,  folder: 'Partners' },
    press:      { address: 'press@hoacondinsight.com',       label: 'Media & Press',       priority: 'high',    autoReply: true,  folder: 'Press' },
  },
  outbound: {
    transactional: { from: 'noreply@hoacondinsight.com',   label: 'Order confirmations, reports, receipts' },
    marketing:     { from: 'hello@hoacondinsight.com',     label: 'Marketing sequences, newsletters' },
    legal:         { from: 'legal@hoacondinsight.com',     label: 'Attorney communications, contracts' },
    enterprise:    { from: 'enterprise@hoacondinsight.com', label: 'Lender and WL client comms' },
    system:        { from: 'system@hoacondinsight.com',    label: 'System alerts, backup notifications, SOP alerts' },
  },
};

// ── SLA RESPONSE TIMES (Fortune 500 standard) ────────────────────
export const EMAIL_SLA = {
  critical: { maxHours: 1,  label: '1 hour',    escalateTo: ['peter@hoacondinsight.com','ceo@hoacondinsight.com'] },
  high:     { maxHours: 4,  label: '4 hours',   escalateTo: ['ceo@hoacondinsight.com'] },
  normal:   { maxHours: 24, label: '1 business day', escalateTo: ['support@hoacondinsight.com'] },
  low:      { maxHours: 72, label: '3 business days', escalateTo: [] },
};

// ── ALL COMMUNICATION PLATFORMS ──────────────────────────────────
export const COMM_PLATFORMS = {
  // EMAIL
  resend:       { name: 'Resend',            category: 'Email Delivery',     free: true,  dayOneActive: true,  requiresSub: false, website: 'resend.com',         description: 'Primary transactional email — 3,000 free/month' },
  gmail_api:    { name: 'Gmail API',         category: 'Email',              free: true,  dayOneActive: true,  requiresSub: false, website: 'console.cloud.google.com', description: 'Inbound email reading and organization via Google API' },
  resend_inbox: { name: 'Resend Inbound',    category: 'Email Inbound',      free: false, dayOneActive: false, requiresSub: true,  website: 'resend.com',         description: 'Receive and log all inbound emails to Supabase' },

  // VOIP
  twilio_voice: { name: 'Twilio Voice',      category: 'VoIP',               free: false, dayOneActive: false, requiresSub: true,  website: 'twilio.com',         description: 'VoIP calls, call recording, call logs, IVR' },
  twilio_sms:   { name: 'Twilio SMS',        category: 'SMS',                free: false, dayOneActive: false, requiresSub: true,  website: 'twilio.com',         description: 'SMS messaging, two-way text communication' },
  openphone:    { name: 'OpenPhone',         category: 'VoIP/SMS',           free: false, dayOneActive: false, requiresSub: true,  website: 'openphone.com',      description: 'Business phone system — VoIP + SMS unified inbox' },

  // VIDEO
  zoom_api:     { name: 'Zoom API',          category: 'Video Conferencing', free: true,  dayOneActive: true,  requiresSub: false, website: 'marketplace.zoom.us', description: 'Schedule and manage Zoom meetings via API. Free tier.' },
  google_meet:  { name: 'Google Meet API',   category: 'Video',              free: true,  dayOneActive: true,  requiresSub: false, website: 'developers.google.com', description: 'Google Meet meeting links via Google Calendar API' },
  ms_teams:     { name: 'Microsoft Teams',   category: 'Video/Chat',         free: true,  dayOneActive: true,  requiresSub: false, website: 'dev.teams.microsoft.com', description: 'Teams meetings and chat via Microsoft Graph API — free tier' },

  // MESSAGING
  whatsapp:     { name: 'WhatsApp Business', category: 'Messaging',          free: false, dayOneActive: false, requiresSub: true,  website: 'business.whatsapp.com', description: '1,000 free conversations/month via Meta Cloud API' },
  slack:        { name: 'Slack',             category: 'Team Chat',          free: true,  dayOneActive: true,  requiresSub: false, website: 'api.slack.com',      description: 'Team communications — free tier 90-day history' },

  // MICROSOFT OFFICE
  ms_outlook:   { name: 'Microsoft Outlook', category: 'Microsoft Office',   free: true,  dayOneActive: true,  requiresSub: false, website: 'dev.outlook.com',    description: 'Email management via Microsoft Graph API — free' },
  ms_word:      { name: 'Microsoft Word',    category: 'Microsoft Office',   free: false, dayOneActive: false, requiresSub: true,  website: 'microsoft.com/microsoft-365', description: 'Word document generation via Office JS SDK' },
  ms_excel:     { name: 'Microsoft Excel',   category: 'Microsoft Office',   free: false, dayOneActive: false, requiresSub: true,  website: 'microsoft.com/microsoft-365', description: 'Spreadsheet generation and data export' },
  ms_powerpoint:{ name: 'Microsoft PowerPoint', category: 'Microsoft Office', free: false, dayOneActive: false, requiresSub: true, website: 'microsoft.com/microsoft-365', description: 'Presentation generation for client reports' },
  ms_sharepoint:{ name: 'SharePoint',        category: 'Microsoft Office',   free: false, dayOneActive: false, requiresSub: true,  website: 'microsoft.com',      description: 'Document management and team collaboration' },
  ms_onedrive:  { name: 'OneDrive API',      category: 'Microsoft Office',   free: true,  dayOneActive: true,  requiresSub: false, website: 'dev.onedrive.com',   description: 'Cloud document storage via Microsoft Graph — free' },
  ms_calendar:  { name: 'Microsoft Calendar', category: 'Microsoft Office',  free: true,  dayOneActive: true,  requiresSub: false, website: 'dev.microsoft.com',  description: 'Calendar and scheduling via Graph API — free' },
  ms_copilot:   { name: 'Microsoft Copilot', category: 'Microsoft AI',       free: false, dayOneActive: false, requiresSub: true,  website: 'copilot.microsoft.com', description: 'AI writing and document assistance' },

  // ADOBE
  adobe_sign:   { name: 'Adobe Sign',        category: 'Adobe',              free: false, dayOneActive: false, requiresSub: true,  website: 'acrobat.adobe.com/sign', description: 'E-signatures — Adobe Acrobat Sign API' },
  adobe_pdf:    { name: 'Adobe PDF API',     category: 'Adobe',              free: true,  dayOneActive: true,  requiresSub: false, website: 'developer.adobe.com/document-services', description: 'PDF creation and manipulation — 500 free/month' },
  adobe_express:{ name: 'Adobe Express API', category: 'Adobe',              free: true,  dayOneActive: false, requiresSub: false, website: 'developer.adobe.com/express', description: 'Image and graphic creation for marketing content' },

  // DOCUMENT HANDLING (Free on Day 1)
  pdf_js:       { name: 'PDF.js (Mozilla)',  category: 'PDF Reading',        free: true,  dayOneActive: true,  requiresSub: false, website: 'mozilla.github.io/pdf.js', description: 'PDF reading and rendering — 100% free, open source' },
  mammoth_js:   { name: 'Mammoth.js',        category: 'Word Docs',          free: true,  dayOneActive: true,  requiresSub: false, website: 'npmjs.com/package/mammoth', description: 'Word .docx reading — free, open source' },
  pptx_js:      { name: 'PPTX.js',           category: 'PowerPoint',         free: true,  dayOneActive: true,  requiresSub: false, website: 'npmjs.com/package/pptxgenjs', description: 'PowerPoint reading + generation — free, open source' },
  xlsx_js:      { name: 'SheetJS',           category: 'Excel/CSV',          free: true,  dayOneActive: true,  requiresSub: false, website: 'sheetjs.com',        description: 'Excel and CSV reading + writing — free community edition' },
  papaparse:    { name: 'PapaParse',         category: 'CSV',                free: true,  dayOneActive: true,  requiresSub: false, website: 'papaparse.com',      description: 'CSV parsing — free, open source' },

  // COLLABORATION
  google_drive: { name: 'Google Drive API',  category: 'Cloud Storage',      free: true,  dayOneActive: true,  requiresSub: false, website: 'developers.google.com/drive', description: 'Cloud document storage and sharing — free 15GB' },
  google_docs:  { name: 'Google Docs API',   category: 'Documents',          free: true,  dayOneActive: true,  requiresSub: false, website: 'developers.google.com', description: 'Document creation and management via API — free' },
  google_sheets:{ name: 'Google Sheets API', category: 'Spreadsheets',       free: true,  dayOneActive: true,  requiresSub: false, website: 'developers.google.com', description: 'Spreadsheet management via API — free' },
  notion:       { name: 'Notion API',        category: 'Knowledge Base',     free: true,  dayOneActive: false, requiresSub: false, website: 'developers.notion.com', description: 'Internal knowledge base and docs — free tier' },
  airtable:     { name: 'Airtable API',      category: 'Database/CRM',       free: true,  dayOneActive: false, requiresSub: false, website: 'airtable.com/developers', description: 'Lightweight CRM and data management — free tier' },

  // AI ASSISTANTS
  openai_chat:  { name: 'OpenAI GPT-4o',     category: 'AI',                 free: false, dayOneActive: true,  requiresSub: true,  website: 'platform.openai.com', description: 'Core AI analysis engine — already integrated' },
  anthropic:    { name: 'Anthropic Claude',  category: 'AI',                 free: false, dayOneActive: false, requiresSub: true,  website: 'console.anthropic.com', description: 'Backup AI for document analysis and compliance review' },
  gemini:       { name: 'Google Gemini',     category: 'AI',                 free: true,  dayOneActive: false, requiresSub: false, website: 'ai.google.dev',      description: 'Alternative AI for email classification — free tier' },

  // CRM/SALES
  hubspot:      { name: 'HubSpot CRM',       category: 'CRM',                free: true,  dayOneActive: true,  requiresSub: false, website: 'hubspot.com',        description: 'Full CRM — free forever plan includes contacts, deals, emails' },
  closeai:      { name: 'Close CRM',         category: 'Sales CRM',          free: false, dayOneActive: false, requiresSub: true,  website: 'close.com',          description: 'Sales-focused CRM with built-in calling' },
  
  // MONITORING
  sentry:       { name: 'Sentry',            category: 'Error Monitoring',   free: true,  dayOneActive: true,  requiresSub: false, website: 'sentry.io',          description: 'Error tracking — free for small volume' },
  uptime_robot: { name: 'UptimeRobot',       category: 'Uptime Monitoring',  free: true,  dayOneActive: true,  requiresSub: false, website: 'uptimerobot.com',    description: 'Website uptime monitoring — free 50 monitors' },
  
  // ESIGNATURE (free alternative)
  docuseal:     { name: 'DocuSeal',          category: 'E-Signature',        free: true,  dayOneActive: true,  requiresSub: false, website: 'docuseal.co',        description: 'Open-source e-signature — free self-hosted alternative to DocuSign' },
  
  // CALENDAR/SCHEDULING
  cal_com:      { name: 'Cal.com',           category: 'Scheduling',         free: true,  dayOneActive: true,  requiresSub: false, website: 'cal.com',            description: 'Meeting scheduling — free plan, Calendly alternative' },
  
  // ANALYTICS
  ga4:          { name: 'Google Analytics 4', category: 'Analytics',         free: true,  dayOneActive: true,  requiresSub: false, website: 'analytics.google.com', description: 'Full website analytics — free forever' },
  posthog:      { name: 'PostHog',           category: 'Product Analytics',  free: true,  dayOneActive: true,  requiresSub: false, website: 'posthog.com',        description: 'Product analytics + session recording — free 1M events/month' },
};

// ── COMMUNICATION RULES (Fortune 500 standard) ───────────────────
export const COMM_RULES = [
  'Every inbound email is logged to Supabase with timestamp, sender, subject, category, and status',
  'Every outbound email is logged with delivery status and any bounce notifications',
  'Response time SLAs are enforced automatically — escalation emails sent if SLA is missed',
  'Legal emails (legal@hoacondinsight.com) are NEVER auto-replied — routed to Founder immediately',
  'All communications are retained for 7 years per legal compliance requirements (7-year retention policy — Company Rule)',
  'Auto-categorization routes emails to the correct department folder automatically',
  'Attachment handling: PDFs, Word, PowerPoint, Excel all read and stored in Supabase',
  'Spam and phishing detection runs on every inbound email before it enters the system',
  'No communication data is ever sold — Company Rule 11 applies to all communication data',
  'All communication logs are read-only after creation — no editing or deletion permitted',
];

// ── AUTO-REPLY TEMPLATES ─────────────────────────────────────────
export const AUTO_REPLY_TEMPLATES = {
  support: {
    subject: 'We received your message — HOACONDInsight™',
    body: `Thank you for contacting HOACONDInsight™.

We have received your message and will respond within 1 business day.

Hoa Condo Insight LLC
61 N Lakeshore Drive, Hypoluxo, Florida 33462
support@hoacondinsight.com | hoacondinsight.com

This is an automated confirmation. Please do not reply to this email.`,
  },
  enterprise: {
    subject: 'Enterprise Inquiry Received — HOACONDInsight™',
    body: `Thank you for your enterprise inquiry.

A member of our enterprise team will contact you within 4 business hours.

Hoa Condo Insight LLC · 61 N Lakeshore Drive, Hypoluxo, Florida 33462`,
  },
};

// ── DOCUMENT READING CAPABILITIES ────────────────────────────────
export const DOCUMENT_READING = {
  pdf:   { engine: 'PDF.js', free: true, autoEnabled: true, accepts: ['.pdf'] },
  docx:  { engine: 'Mammoth.js', free: true, autoEnabled: true, accepts: ['.doc','.docx'] },
  xlsx:  { engine: 'SheetJS', free: true, autoEnabled: true, accepts: ['.xls','.xlsx','.csv'] },
  pptx:  { engine: 'PPTX.js', free: true, autoEnabled: true, accepts: ['.ppt','.pptx'] },
  txt:   { engine: 'Native', free: true, autoEnabled: true, accepts: ['.txt','.md'] },
  image: { engine: 'OpenAI Vision', free: false, autoEnabled: true, accepts: ['.jpg','.jpeg','.png','.webp'] },
};

export function generateEmailLog(direction, from, to, subject, category, hasAttachment = false) {
  return {
    id: `EMAIL-${Date.now()}-${Math.random().toString(36).substr(2,6).toUpperCase()}`,
    direction, from, to, subject, category,
    hasAttachment, status: 'received', read: false,
    timestamp: new Date().toISOString(),
    retainUntil: new Date(Date.now() + 7 * 365 * 24 * 60 * 60 * 1000).toISOString(),
    permanent: true,
  };
}

export function categorizEmail(fromAddress, subject) {
  const subjectLower = subject.toLowerCase();
  if (subjectLower.includes('legal') || subjectLower.includes('lawsuit') || subjectLower.includes('attorney')) return 'legal';
  if (subjectLower.includes('enterprise') || subjectLower.includes('lender')) return 'enterprise';
  if (subjectLower.includes('white label') || subjectLower.includes('whitelabel')) return 'whitelabel';
  if (subjectLower.includes('partner') || subjectLower.includes('referral')) return 'partners';
  if (subjectLower.includes('press') || subjectLower.includes('media') || subjectLower.includes('journalist')) return 'press';
  return 'support';
}

export function getDayOneActiveList() {
  return Object.entries(COMM_PLATFORMS)
    .filter(([, v]) => v.dayOneActive && !v.requiresSub)
    .map(([k, v]) => ({ id: k, ...v }));
}

export function getToggleList() {
  return Object.entries(COMM_PLATFORMS)
    .filter(([, v]) => !v.dayOneActive || v.requiresSub)
    .map(([k, v]) => ({ id: k, ...v }));
}

export const communicationsEngineVersion = '5.1';
export default { COMPANY_ADDRESS, EMAIL_CATEGORIES, COMM_PLATFORMS, COMM_RULES, communicationsEngineVersion };
