/**
 * HOACONDInsight™ Deployment Control Engine
 * Controls live website activation/deactivation
 * ONLY Founder or C-Suite can activate or deactivate the live website
 * EVERY activation or deactivation sends immediate notification to Founder AND C-Suite
 * Company Rule 1: Every change requires Founder or C-Suite written approval
 *
 * Legal entity: Hoa Condo Insight LLC (Florida LLC)
 * Brand: HOACONDInsight™
 */

export const DEPLOYMENT_STATES = {
  LIVE:     { id: 'LIVE',     label: 'LIVE — Accepting Orders',    color: 'var(--green)', bg: 'var(--green-light)', textColor: '#166534' },
  OFFLINE:  { id: 'OFFLINE',  label: 'OFFLINE — Not Accepting',    color: '#ef4444', bg: 'var(--red-light)', textColor: '#991b1b' },
  TESTING:  { id: 'TESTING',  label: 'TEST MODE — Test Traffic Only', color: '#f59e0b', bg: 'var(--amber-light)', textColor: '#92400e' },
  READONLY: { id: 'READONLY', label: 'READ ONLY — No Transactions', color: '#6366f1', bg: '#eef2ff', textColor: '#3730a3' },
};

export const AUTHORIZED_ROLES = ['founder', 'csuite'];

export const NOTIFY_ALWAYS = [
  { label: 'Founder (Peter Klein)',   email: 'peterkleinusa@gmail.com' },
  { label: 'Founder Email',           email: 'peter@hoacondinsight.com' },
  { label: 'C-Suite / CEO',           email: 'ceo@hoacondinsight.com' },
  { label: 'Legal',                   email: 'legal@hoacondinsight.com' },
];

export const DEPLOYMENT_WARNINGS = {
  LIVE: [
    '⚠️ GOING LIVE: The website will immediately begin accepting real orders and real payments.',
    '⚠️ STRIPE must be in LIVE mode — not test mode — before activating.',
    '⚠️ Legal pages must have been reviewed by a licensed Florida attorney.',
    '⚠️ Supabase environment variables must be connected.',
    '⚠️ All email templates must be confirmed working.',
    '⚠️ This action notifies Founder and C-Suite immediately.',
  ],
  OFFLINE: [
    '⚠️ GOING OFFLINE: The website will immediately stop accepting all orders.',
    '⚠️ Any in-progress orders will be paused — customers will be notified.',
    '⚠️ This action notifies Founder and C-Suite immediately.',
  ],
  TESTING: [
    '⚠️ ENTERING TEST MODE: Real orders are disabled. Test card only.',
    '⚠️ Test watermark will appear on all reports.',
    '⚠️ This action notifies Founder and C-Suite immediately.',
  ],
  READONLY: [
    '⚠️ ENTERING READ ONLY: All transaction capability disabled.',
    '⚠️ Users can browse but cannot place orders.',
    '⚠️ This action notifies Founder and C-Suite immediately.',
  ],
};

/**
 * Validates whether a user is authorized to change deployment state
 */
export function canChangeDeploymentState(userRole) {
  return AUTHORIZED_ROLES.includes(userRole);
}

/**
 * Generates the notification payload sent to all required contacts
 */
export function generateDeploymentNotification(action, fromState, toState, performedBy, reason) {
  const timestamp = new Date().toISOString();
  const subject = `🚨 HOACONDInsight™ Deployment State Changed — ${toState}`;
  const body = `DEPLOYMENT CHANGE NOTIFICATION
Legal entity: Hoa Condo Insight LLC
Platform: HOACONDInsight™

ACTION: ${fromState} → ${toState}
TIME: ${timestamp}
PERFORMED BY: ${performedBy}
REASON: ${reason || 'No reason provided'}

New state: ${DEPLOYMENT_STATES[toState]?.label || toState}

This notification was sent automatically to all Founder and C-Suite contacts.
If you did not authorize this change, contact the Founder immediately.

peterkleinusa@gmail.com | peter@hoacondinsight.com`;

  return {
    subject,
    body,
    recipients: NOTIFY_ALWAYS,
    timestamp,
    action,
    fromState,
    toState,
    performedBy,
    reason,
    auditId: `DEPLOY-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
  };
}

/**
 * Logs deployment change to Supabase audit table
 * Called server-side via Edge Function
 */
export function generateAuditLogEntry(notification) {
  return {
    table: 'deployment_audit_log',
    data: {
      audit_id: notification.auditId,
      from_state: notification.fromState,
      to_state: notification.toState,
      performed_by: notification.performedBy,
      reason: notification.reason,
      timestamp: notification.timestamp,
      notifications_sent: notification.recipients.map(r => r.email).join(', '),
      permanent: true, // Audit logs are NEVER deleted
    }
  };
}

/**
 * Returns whether the current deployment allows orders
 */
export function isAcceptingOrders(deploymentState) {
  return deploymentState === 'LIVE';
}

/**
 * Returns whether test mode watermark should show
 */
export function isInTestMode(deploymentState) {
  return deploymentState === 'TESTING';
}

/**
 * Get current deployment state from Supabase
 * (Supabase stores the authoritative state — localStorage is display only)
 */
export async function getCurrentDeploymentState(supabaseClient) {
  try {
    const { data } = await supabaseClient
      .from('deployment_config')
      .select('state, updated_at, updated_by')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();
    return data?.state || 'OFFLINE';
  } catch {
    return 'OFFLINE'; // Default to OFFLINE if cannot read — safe default
  }
}

export const deploymentControlEngineVersion = '5.1';
export default {
  DEPLOYMENT_STATES, AUTHORIZED_ROLES, NOTIFY_ALWAYS,
  DEPLOYMENT_WARNINGS, canChangeDeploymentState,
  generateDeploymentNotification, generateAuditLogEntry,
  isAcceptingOrders, isInTestMode, getCurrentDeploymentState,
  version: '5.1',
};
