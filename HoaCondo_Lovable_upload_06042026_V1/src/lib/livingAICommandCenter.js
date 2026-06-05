import PATENT_CONFIG from './patentConfig.js';
/**
 * HOACONDInsight™ Living AI Command Center Engine v1.0
 * Hoa Condo Insight LLC · 61 N Lakeshore Drive, Hypoluxo, Florida 33462
 *
 * Allows any user to type or speak a natural language command and receive
 * a complete, fully generated package of everything needed for that task.
 *
 * Examples:
 * "I have a trade show at ABA national meeting — create everything I need for booth and keynote"
 * "Run this month's financial report"
 * "Draft an email to all enterprise lenders about the new Fannie Mae update"
 * "Create an onboarding package for our new VP of Sales"
 *
 * The system identifies the task type, generates all required outputs,
 * presents them for review, and user clicks to select, modify, or approve.
 */

export const COMMAND_CATEGORIES = {
  marketing_event: {
    label: 'Marketing & Events',
    examples: ['trade show', 'conference', 'booth', 'keynote', 'presentation', 'sponsor', 'exhibit'],
    outputs: ['booth_design_specs','speaker_script','sales_deck','brochure_electronic',
              'brochure_print','business_card_design','banner_designs','giveaway_ideas',
              'press_release','social_media_posts','email_blast','follow_up_templates',
              'lead_capture_form','qr_code_content','event_budget'],
    description: 'Generates complete event package — everything from booth specs to speaker script to follow-up emails',
  },
  financial_report: {
    label: 'Financial Reports',
    examples: ['financial report', 'revenue report', 'monthly report', 'quarterly', 'P&L', 'income'],
    outputs: ['revenue_summary','transaction_detail','commission_report','attorney_payouts',
              'referral_payouts','expense_summary','projection_update','board_summary'],
    description: 'Pulls live Supabase data and generates complete financial package',
  },
  communications: {
    label: 'Communications & Outreach',
    examples: ['email', 'letter', 'outreach', 'draft', 'send', 'notify', 'announce'],
    outputs: ['email_draft','letter_pdf','talking_points','faq_document','announcement'],
    description: 'Drafts complete communication package for any audience',
  },
  hr_onboarding: {
    label: 'HR & Onboarding',
    examples: ['onboard', 'hire', 'new employee', 'role', 'job description', 'training'],
    outputs: ['welcome_letter','role_description','access_checklist','training_schedule',
              'policies_summary','first_week_plan','system_access_guide'],
    description: 'Creates complete onboarding package for any new team member',
  },
  legal_compliance: {
    label: 'Legal & Compliance',
    examples: ['compliance', 'legal', 'contract', 'agreement', 'terms', 'policy', 'consent'],
    outputs: ['compliance_summary','action_items','attorney_briefing','policy_draft'],
    description: 'Generates compliance review and required documents',
  },
  sales_outreach: {
    label: 'Sales & Enterprise Outreach',
    examples: ['pitch', 'prospect', 'lender', 'enterprise', 'proposal', 'demo'],
    outputs: ['pitch_deck','one_pager','roi_calculator','demo_script','follow_up_sequence',
              'custom_proposal','reference_sheet'],
    description: 'Builds complete sales package customized for any prospect',
  },
  operational: {
    label: 'Operations & Administration',
    examples: ['report', 'status', 'summary', 'update', 'backup', 'audit', 'review'],
    outputs: ['status_report','audit_log','action_items','executive_summary'],
    description: 'Generates operational reports and administrative documents',
  },
};

export const USER_ROLE_PERMISSIONS = {
  founder: { canAccess: Object.keys(COMMAND_CATEGORIES), canApprove: true, canPublish: true },
  csuite:  { canAccess: ['marketing_event','financial_report','communications','sales_outreach','operational'], canApprove: true, canPublish: false },
  manager: { canAccess: ['communications','operational','hr_onboarding'], canApprove: false, canPublish: false },
  user:    { canAccess: ['communications','operational'], canApprove: false, canPublish: false },
  marketing: { canAccess: ['marketing_event','communications','sales_outreach'], canApprove: false, canPublish: false },
  finance:   { canAccess: ['financial_report','operational'], canApprove: false, canPublish: false },
  legal:     { canAccess: ['legal_compliance','communications'], canApprove: false, canPublish: false },
  sales:     { canAccess: ['sales_outreach','marketing_event','communications'], canApprove: false, canPublish: false },
};

export const VOICE_PROMPT_SYSTEM = {
  enabled: true,
  method: 'Web Speech API (browser native — free, no subscription)',
  fallback: 'Text input always available',
  languages: ['en-US', 'en-GB', 'es-US'],
  activation: 'Click microphone icon or press spacebar on command field',
  processing: 'Transcript sent to OpenAI GPT-4o for intent classification and output generation',
  response_format: 'Structured JSON with all output items ready for user review',
};

export function classifyCommand(commandText) {
  const lower = commandText.toLowerCase();
  for (const [category, config] of Object.entries(COMMAND_CATEGORIES)) {
    if (config.examples.some(ex => lower.includes(ex))) {
      return { category, config, confidence: 'high' };
    }
  }
  return { category: 'operational', config: COMMAND_CATEGORIES.operational, confidence: 'low' };
}

export function buildCommandPrompt(commandText, userRole, userContext) {
  return `You are the HOACONDInsight Living AI Command Center.

User role: ${userRole}
User command: "${commandText}"
Company: Hoa Condo Insight LLC, 61 N Lakeshore Drive, Hypoluxo, Florida 33462
Platform: HOACONDInsight™ — HOA & Condo Compliance Intelligence
Patent: U.S. Utility Patent Application No. 64/081,022

Generate a complete package of EVERYTHING this user needs for their request.
Include today's date on all materials.
Format each output item clearly labeled.
Make everything specific to HOACONDInsight™ — not generic.
Present each deliverable so the user can review, click to select, and modify.

Respond in JSON format with an array of output items, each with:
- type: the kind of document/item
- title: display name
- content: the full generated content
- format: pdf/email/presentation/design_spec/script/etc
- editable: true/false
- date: today's date

Context: ${JSON.stringify(userContext || {})}`;
}

export const LIVING_GUIDE_RULES = [
  'Every output is dated with the current date automatically',
  'All materials include HOACONDInsight™ branding and patent notice',
  'User must review and click Approve before any output is sent externally',
  'All generated materials are saved to the permanent communications log',
  'C-Suite approval required before any external publication',
  'Founder approval required for any materials that include financial projections or valuations',
  'All AI outputs are advisory — human review always required before use',
];

export const livingAICommandCenterVersion = '1.0';
export default { COMMAND_CATEGORIES, USER_ROLE_PERMISSIONS, VOICE_PROMPT_SYSTEM, classifyCommand, buildCommandPrompt };
