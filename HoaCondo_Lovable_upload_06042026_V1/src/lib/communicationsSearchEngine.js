/**
 * HOACONDInsight™ Communications Search & Permanent Record Engine
 * Hoa Condo Insight LLC · 61 N Lakeshore Drive, Hypoluxo, Florida 33462
 *
 * ALL inbound and outbound communications are stored as permanent records
 * PERMANENT = cannot be deleted, edited, or altered — ever
 * SEARCHABLE = C-Suite and above can search by: subject, sender, recipient, date, content, category
 * PRIVATE = each user sees only their own data; C-Suite sees all; Founder data is Founder-only
 * PERMISSION = Founder must explicitly grant access to Founder-level records
 *
 * Fortune 500 standard: every Fortune 500 company stores all email permanently for compliance
 * This system mirrors Goldman Sachs / JPMorgan communications archiving standards
 */

export const ACCESS_LEVELS = {
  founder:  { label: 'Founder',     canSeeAll: true,  canSeeFounderData: true,  canDelete: false, canExport: true,  canSearchAll: true },
  csuite:   { label: 'C-Suite',     canSeeAll: true,  canSeeFounderData: false, canDelete: false, canExport: true,  canSearchAll: true },
  manager:  { label: 'Manager',     canSeeAll: false, canSeeFounderData: false, canDelete: false, canExport: false, canSearchAll: false, seeOwnDept: true },
  user:     { label: 'Team Member', canSeeAll: false, canSeeFounderData: false, canDelete: false, canExport: false, canSearchAll: false, seeOwnOnly: true },
  vendor:   { label: 'Vendor',      canSeeAll: false, canSeeFounderData: false, canDelete: false, canExport: false, canSearchAll: false, seeOwnOnly: true },
  client:   { label: 'Client',      canSeeAll: false, canSeeFounderData: false, canDelete: false, canExport: false, canSearchAll: false, seeOwnOnly: true },
};

export const SEARCH_FIELDS = [
  { field: 'subject',    label: 'Subject',          type: 'text',   example: 'HOA Analysis Report' },
  { field: 'from',       label: 'Sender Email',     type: 'email',  example: 'john@company.com' },
  { field: 'to',         label: 'Recipient Email',  type: 'email',  example: 'support@hoacondinsight.com' },
  { field: 'body_text',  label: 'Message Content',  type: 'text',   example: 'reserve fund' },
  { field: 'category',   label: 'Category',         type: 'select', options: ['enterprise','support','legal','attorneys','whitelabel','partners','press','transactional'] },
  { field: 'direction',  label: 'Direction',        type: 'select', options: ['inbound','outbound'] },
  { field: 'date_from',  label: 'Date From',        type: 'date' },
  { field: 'date_to',    label: 'Date To',          type: 'date' },
  { field: 'has_attachment', label: 'Has Attachment', type: 'boolean' },
  { field: 'platform',   label: 'Platform',         type: 'select', options: ['email','sms','whatsapp','slack','teams','zoom','voip'] },
  { field: 'user_id',    label: 'Specific User',    type: 'text',   csuiteOnly: true },
  { field: 'department', label: 'Department',       type: 'text',   csuiteOnly: true },
];

// ── PERMANENT RECORD RULES (cannot be overridden) ──────────────────
export const PERMANENT_RECORD_RULES = [
  'NO communication record can ever be deleted by any user including the Founder.',
  'NO communication record can be edited after creation — it is immutable.',
  'Records are retained for a minimum of 7 years from creation date.',
  'After 7 years, records move to "archive" status but remain permanently accessible.',
  'All records have a cryptographic hash to detect any tampering attempt.',
  'Any tampering attempt triggers immediate notification to Founder and all C-Suite.',
  'Export of records is logged and requires C-Suite authorization.',
  'Founder records are visible ONLY to the Founder unless Founder explicitly grants access.',
  'Access to any record is logged with timestamp, user, and IP address.',
  'This system mirrors Goldman Sachs / JPMorgan FINRA communications archiving standards.',
];

// ── DATA ISOLATION RULES ───────────────────────────────────────────
export const DATA_ISOLATION = {
  founder: {
    description: 'Founder Peter Klein\'s communications are completely isolated.',
    rule: 'No employee, vendor, or client can access Founder communications without explicit Founder authorization.',
    founderGrants: 'Founder logs in with Founder credentials, opens Admin → Communications → Permissions, and explicitly grants named individual access to specific records or date ranges.',
    revokeAnytime: 'Access can be revoked at any time by Founder.',
    logAllAccess: 'Every access to Founder records is logged permanently.',
  },
  csuite: {
    description: 'C-Suite can see all company communications EXCEPT Founder-private records.',
    rule: 'C-Suite has full search and view access to all employee, vendor, and client communications.',
    canNotSee: 'Any records tagged founder-private unless Founder has explicitly granted access.',
  },
  users: {
    description: 'Users see only their own sent and received communications.',
    rule: 'A user cannot see another user\'s communications.',
    sameExperience: 'Their interface looks and works exactly like their own personal inbox — they have no visibility into the archival or monitoring system.',
  },
};

// ── SUPABASE QUERY BUILDER ─────────────────────────────────────────
export function buildSearchQuery(filters, userRole, userId) {
  const access = ACCESS_LEVELS[userRole];
  let query = { table: 'email_log', conditions: [], orderBy: 'timestamp DESC', limit: 100 };

  // Data isolation enforcement
  if (!access.canSeeAll) {
    query.conditions.push({ field: 'user_id', op: '=', value: userId });
  }
  if (!access.canSeeFounderData) {
    query.conditions.push({ field: 'is_founder_private', op: '=', value: false });
  }

  // Apply user filters
  if (filters.subject)     query.conditions.push({ field: 'subject', op: 'ilike', value: `%${filters.subject}%` });
  if (filters.from)        query.conditions.push({ field: 'from_address', op: 'ilike', value: `%${filters.from}%` });
  if (filters.to)          query.conditions.push({ field: 'to_address', op: 'ilike', value: `%${filters.to}%` });
  if (filters.body_text)   query.conditions.push({ field: 'body_preview', op: 'ilike', value: `%${filters.body_text}%` });
  if (filters.category)    query.conditions.push({ field: 'category', op: '=', value: filters.category });
  if (filters.direction)   query.conditions.push({ field: 'direction', op: '=', value: filters.direction });
  if (filters.date_from)   query.conditions.push({ field: 'timestamp', op: '>=', value: filters.date_from });
  if (filters.date_to)     query.conditions.push({ field: 'timestamp', op: '<=', value: filters.date_to });
  if (filters.has_attachment !== undefined) query.conditions.push({ field: 'has_attachment', op: '=', value: filters.has_attachment });

  // Log the search
  query.accessLog = {
    performed_by: userId,
    role: userRole,
    filters,
    timestamp: new Date().toISOString(),
    permanent: true,
  };

  return query;
}

export function generateSampleRecords() {
  return [
    { id: 'CM-001', direction: 'inbound',  from: 'john.smith@firstnational.com',  to: 'enterprise@hoacondinsight.com', subject: 'Enterprise License Inquiry — 200 files/month', category: 'enterprise', timestamp: '2026-06-05T09:14:00Z', status: 'read',   platform: 'email', has_attachment: false, priority: 'high',   is_founder_private: false, permanent: true },
    { id: 'CM-002', direction: 'outbound', from: 'support@hoacondinsight.com',    to: 'buyer@homebuyer.com',           subject: 'Your HOA Analysis Report — Delivered',      category: 'transactional', timestamp: '2026-06-05T08:45:00Z', status: 'delivered', platform: 'email', has_attachment: true,  priority: 'normal', is_founder_private: false, permanent: true },
    { id: 'CM-003', direction: 'inbound',  from: 'attorney@floridahoa.law',        to: 'attorneys@hoacondinsight.com',  subject: 'Attorney Network Application — FL License',  category: 'attorneys', timestamp: '2026-06-05T08:02:00Z', status: 'read',   platform: 'email', has_attachment: true,  priority: 'normal', is_founder_private: false, permanent: true },
    { id: 'CM-004', direction: 'inbound',  from: 'press@realestatemagazine.com',   to: 'press@hoacondinsight.com',      subject: 'Media Inquiry — HOACONDInsight Launch Coverage', category: 'press', timestamp: '2026-06-04T16:30:00Z', status: 'unread', platform: 'email', has_attachment: false, priority: 'high',   is_founder_private: false, permanent: true },
    { id: 'CM-005', direction: 'outbound', from: 'peter@hoacondinsight.com',       to: 'rich.handler@jefferies.com',    subject: 'Confidential Acquisition Advisory Request',  category: 'enterprise', timestamp: '2026-06-05T07:00:00Z', status: 'delivered', platform: 'email', has_attachment: true,  priority: 'critical', is_founder_private: true, permanent: true },
  ];
}

export const communicationsSearchVersion = '5.1';
export default { ACCESS_LEVELS, SEARCH_FIELDS, PERMANENT_RECORD_RULES, DATA_ISOLATION, buildSearchQuery };
