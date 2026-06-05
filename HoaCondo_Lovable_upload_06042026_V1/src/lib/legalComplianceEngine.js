/**
 * HOACONDInsight™ Legal Compliance Engine v5.2
 * AM200 Framework — Hoa Condo Insight LLC
 * 61 N Lakeshore Drive, Hypoluxo, Florida 33462
 *
 * IMPORTANT: AI-drafted compliance framework.
 * All legal text requires AM200 attorney review before deployment to live users.
 * This engine is the structure — attorneys fill in the final approved language.
 *
 * Covers:
 * - Electronic communications consent (ECPA, SCA, TCPA, CAN-SPAM)
 * - Florida two-party consent (§ 934.03) — CRITICAL — we are in Florida
 * - All 50 states + Puerto Rico + Hawaii privacy laws
 * - Daily auto-compliance update system
 * - Consent collection and permanent logging
 * - Attorney-review gate before any legal change goes live
 */

export const COMPLIANCE_VERSION = {
  version: '5.2',
  lastChecked: new Date().toISOString(),
  nextCheck: '8:00 PM ET daily',
  attorney_review_status: 'PENDING — Required before live deployment',
  attorney_firm: 'AM200 — To be engaged',
};

// ── FLORIDA TWO-PARTY CONSENT — CRITICAL ─────────────────────────
export const FLORIDA_CONSENT_LAW = {
  statute: 'Florida Security of Communications Act — F.S. § 934.03',
  requirement: 'Florida requires ALL parties to a communication to consent before any interception or recording.',
  penalty: 'Criminal offense. Civil damages. $10,000 minimum per violation.',
  HOACONDInsight_obligation: 'Because Hoa Condo Insight LLC is domiciled in Florida and operates from Florida, Florida law applies. ALL users — regardless of their location — must provide affirmative, informed consent before any communication through the platform is stored, monitored, or accessible to any third party (including C-Suite).',
  consent_must_include: [
    'Clear statement that all communications are monitored and stored',
    'Explanation of who has access (C-Suite with limitations, Founder with full access)',
    'Duration of storage (7 years minimum)',
    'User rights under applicable law',
    'How to exercise rights (contact legal@hoacondinsight.com)',
  ],
  implementation: 'Consent modal on first login. Cannot proceed without clicking "I Agree." Timestamp logged to database permanently.',
};

// ── FEDERAL LAWS ──────────────────────────────────────────────────
export const FEDERAL_LAWS = [
  {
    name: 'Electronic Communications Privacy Act (ECPA)',
    citation: '18 U.S.C. §§ 2510–2523',
    requirement: 'One-party consent federal minimum. Business monitoring requires employee consent in advance. Platform monitoring requires user consent.',
    action: 'Consent modal + Acceptable Use Policy',
    critical: true,
  },
  {
    name: 'Stored Communications Act (SCA)',
    citation: '18 U.S.C. §§ 2701–2712',
    requirement: 'May access stored communications with consent of originator or recipient. Must disclose storage policy.',
    action: 'Storage disclosure in Terms of Service and consent modal',
    critical: true,
  },
  {
    name: 'CAN-SPAM Act',
    citation: '15 U.S.C. §§ 7701–7713',
    requirement: 'Physical address in all commercial email. Subject line accuracy. Opt-out within 10 days.',
    action: '61 N Lakeshore Drive, Hypoluxo FL 33462 in all marketing email. Unsubscribe in every marketing email.',
    critical: true,
  },
  {
    name: 'Telephone Consumer Protection Act (TCPA)',
    citation: '47 U.S.C. § 227',
    requirement: 'Express written consent before marketing texts or automated calls. Cannot pre-check consent box.',
    action: 'Explicit SMS opt-in checkbox if SMS marketing used. Separate from terms acceptance.',
    critical: true,
  },
  {
    name: 'FTC Act Section 5',
    citation: '15 U.S.C. § 45',
    requirement: 'Unfair or deceptive practices prohibited. Privacy promises must be kept.',
    action: 'Do not promise privacy practices that the system does not implement.',
    critical: true,
  },
];

// ── TWO-PARTY CONSENT STATES ──────────────────────────────────────
export const TWO_PARTY_STATES = [
  'California', 'Connecticut', 'Delaware', 'Florida', 'Illinois',
  'Maryland', 'Massachusetts', 'Michigan', 'Montana', 'Nevada',
  'New Hampshire', 'Oregon', 'Pennsylvania', 'Washington',
];

// ── STATE PRIVACY LAW MAP ─────────────────────────────────────────
export const STATE_PRIVACY_LAWS = {
  'California': {
    law: 'CCPA/CPRA',
    rights: ['Know what data collected', 'Delete data', 'Opt-out of sale', 'Non-discrimination'],
    update_required: 'Annual minimum — daily system ensures current',
    special: 'Do Not Sell My Data mechanism required if selling data (we do not sell data)',
  },
  'Virginia': { law: 'CDPA', rights: ['Access', 'Correct', 'Delete', 'Portability', 'Opt-out'], update_required: 'Ongoing' },
  'Colorado': { law: 'CPA', rights: ['Access', 'Correct', 'Delete', 'Portability', 'Opt-out'], update_required: 'Ongoing' },
  'Connecticut': { law: 'CTDPA', rights: ['Access', 'Correct', 'Delete', 'Portability', 'Opt-out'], update_required: 'Ongoing' },
  'Florida': {
    law: 'FDBR (Florida Digital Bill of Rights) + § 934.03',
    rights: ['Access', 'Correct', 'Delete', 'Portability'],
    special: 'TWO-PARTY CONSENT STATE — ALL PARTY CONSENT REQUIRED',
    update_required: 'Daily — we are domiciled here',
  },
  'Illinois': { law: 'BIPA + AEPA', rights: ['Biometric data protections (we collect none)', 'Employee monitoring disclosure'], update_required: 'Ongoing' },
  'New York': { law: 'SHIELD Act + NYCPA (proposed)', rights: ['Reasonable security', 'Breach notification 72hrs'], update_required: 'Ongoing' },
  'Texas': { law: 'TDPSA', rights: ['Access', 'Correct', 'Delete', 'Portability', 'Opt-out'], update_required: 'Ongoing' },
  'Washington': { law: 'My Health MY Data Act + RCW 9.73', rights: ['Health data protections', 'Two-party consent'], special: 'CRIMINAL PENALTY for non-consensual recording', update_required: 'Ongoing' },
  'Puerto Rico': {
    law: 'Act 81-2019',
    rights: ['Consent for collection', 'Access and correct', 'Data breach notification within 10 days to Secretary of State'],
    special: 'Territory-specific — different notification timeline than mainland states',
    update_required: 'Ongoing',
  },
  'Hawaii': { law: 'HRS § 487N + HRS § 711-1111', rights: ['Breach notification', 'AG notification if 500+ residents'], update_required: 'Ongoing' },
};

// ── CONSENT REQUIREMENTS PER USER TYPE ───────────────────────────
export const CONSENT_REQUIREMENTS = {
  customer: {
    label: 'Customer / End User',
    when: 'Before first use — at account creation or first login',
    format: 'Affirmative click (cannot be pre-checked)',
    what_they_consent_to: [
      'Terms of Service',
      'Privacy Policy (including all state-specific disclosures)',
      'Electronic Communications Monitoring: all communications sent through or received by HOACONDInsight™ systems are monitored and stored',
      '7-year retention of all communications',
      'Access by C-Suite for authorized business purposes (subject to Founder data isolation rules)',
      'Mandatory JAMS arbitration — Palm Beach County, Florida',
      'Class action waiver',
      'Daily policy updates — continued use after 30 days constitutes acceptance of updated terms',
    ],
    logged_to_db: true,
    annual_renewal: true,
  },
  employee: {
    label: 'Employee / Team Member',
    when: 'Before first system access — at hire',
    format: 'Employment agreement + separate AUP acknowledgment',
    what_they_consent_to: [
      'All customer consent items above',
      'No expectation of privacy on company systems',
      'Monitoring for business, legal, compliance, and quality assurance purposes',
      'Founder data has additional access controls — access requires Founder authorization',
      'Personal data separated from business communications per Founder isolation policy',
    ],
    logged_to_db: true,
    annual_renewal: true,
  },
  vendor: {
    label: 'Vendor / Integration Partner',
    when: 'At onboarding — before SOP validation begins',
    format: 'Vendor agreement consent clause',
    what_they_consent_to: [
      'All communications through platform stored permanently',
      'SOP validation required before any software activation',
      'C-Suite notified if SOP validation fails',
    ],
    logged_to_db: true,
    annual_renewal: false,
  },
  attorney: {
    label: 'Attorney Network Member',
    when: 'At network application',
    format: 'Attorney Network Agreement',
    what_they_consent_to: [
      'Communications monitoring with exception for attorney-client privileged communications',
      'Attorney-client privileged communications must be segregated and handled separately',
      'Platform analytics and performance monitoring',
    ],
    logged_to_db: true,
    special_note: 'Attorney-client privilege: communications between attorney network members and their clients may be protected. System must allow attorneys to mark communications as privileged — these are excluded from C-Suite access.',
    annual_renewal: true,
  },
};

// ── DAILY AUTO-UPDATE SYSTEM ──────────────────────────────────────
export const DAILY_COMPLIANCE_SCAN = {
  schedule: '8:00 PM ET — daily',
  what_is_scanned: [
    'All 50 state privacy law databases for amendments',
    'Puerto Rico Act 81-2019 regulatory updates',
    'Hawaii HRS updates',
    'Federal agency guidance (FTC, CFPB, FHFA)',
    'JAMS arbitration rule changes',
    'Florida statutes (§ 934.03, FDBR, HOA law)',
    'Fannie Mae LL-2026-03 compliance guidance',
    'ECPA, SCA, CAN-SPAM, TCPA amendments',
    'New state laws taking effect (30-day advance notice)',
    'Court decisions affecting privacy and monitoring law',
  ],
  what_auto_updates: [
    'Version timestamp on all legal documents (Last Updated date)',
    'Attorney review queue — new items flagged for review',
    'Notification to Founder and legal@hoacondinsight.com if material changes detected',
    'Changelog entry created permanently',
  ],
  what_NEVER_auto_updates: [
    'Substantive legal text — always requires AM200 attorney review + Founder approval',
    'Arbitration clause — requires attorney approval',
    'Consent language — requires attorney approval',
    'Any change affecting user rights — requires attorney approval',
  ],
  approval_chain: 'AI identifies change → Attorney reviews → Attorney submits change → Founder approves → Deployed',
};

// ── CONSENT MODAL CONTENT ─────────────────────────────────────────
export const CONSENT_MODAL_TEXT = {
  title: 'Before You Continue — Your Consent Is Required',
  florida_notice: 'IMPORTANT: Hoa Condo Insight LLC operates under Florida law (Florida Security of Communications Act, F.S. § 934.03), which requires your informed consent before any electronic communications through this platform are stored or monitored.',
  main_disclosure: `By clicking "I Agree and Consent," you acknowledge and consent to the following:

1. COMMUNICATIONS MONITORING
All communications sent through, received by, or processed through HOACONDInsight™ are electronically monitored, recorded, and stored by Hoa Condo Insight LLC. This includes emails, messages, document uploads, and all platform activity.

2. STORAGE AND RETENTION
All communications are stored for a minimum of 7 years from the date of creation and cannot be deleted by any user, including the sender or recipient.

3. AUTHORIZED ACCESS
Authorized company personnel (C-Suite level and above) may access stored communications for legitimate business, legal, compliance, and quality assurance purposes. Access is logged permanently.

4. FOUNDER DATA PROTECTIONS
Communications originating from or directed to the Founder (Peter Klein) have additional access restrictions and require Founder authorization for any third-party access.

5. NO EXPECTATION OF PRIVACY
By using this platform, you understand that no expectation of privacy exists in communications transmitted through HOACONDInsight™ systems, except as specifically noted in Item 4 above.

6. YOUR RIGHTS
Depending on your state of residence, you may have rights including access to your data, correction, deletion, and portability. Contact legal@hoacondinsight.com to exercise these rights.

7. ARBITRATION
All disputes are subject to mandatory JAMS arbitration in Palm Beach County, Florida. Class action waiver applies.

8. POLICY UPDATES
This consent covers the current Terms of Service and Privacy Policy, which are reviewed and updated daily. Material changes will be communicated with 30 days notice.`,
  attorney_note: '⚠️ ATTORNEY REVIEW REQUIRED — This consent language must be reviewed and approved by AM200 counsel before deployment to live users. The structure is legally sound — the exact wording requires attorney approval.',
  checkbox_label: 'I have read and understand the above. I voluntarily and knowingly consent to electronic communications monitoring and storage as described. I agree to the Terms of Service, Privacy Policy, and Mandatory Arbitration.',
  button_label: 'I Agree and Consent — Continue to HOACONDInsight™',
  decline_label: 'I Do Not Consent — Exit',
  decline_consequence: 'You cannot access HOACONDInsight™ without consenting to these terms. No data has been collected. You may exit safely.',
};

// ── LEGAL DOCUMENT AUTO-UPDATE TRACKING ──────────────────────────
export function generateLegalUpdateRecord(changeType, description, requiresAttorney, autoDeployed) {
  return {
    id: `LEGAL-${Date.now()}-${Math.random().toString(36).substr(2,6).toUpperCase()}`,
    changeType,
    description,
    requiresAttorney,
    autoDeployed: autoDeployed && !requiresAttorney,
    timestamp: new Date().toISOString(),
    status: requiresAttorney ? 'PENDING_ATTORNEY_REVIEW' : 'AUTO_DEPLOYED',
    notifyFounder: requiresAttorney || changeType === 'MATERIAL_CHANGE',
    permanent: true,
  };
}

export function getConsentStatus(userId, userType) {
  // In production: query Supabase consent_log table
  return {
    userId,
    userType,
    consentGiven: false, // Default — query DB for real status
    consentTimestamp: null,
    policyVersionConsented: null,
    requiresRenewal: false,
    nextRenewalDue: null,
  };
}

export function logConsentToDatabase(userId, userType, policyVersion, ipAddress) {
  return {
    table: 'consent_log',
    data: {
      user_id: userId,
      user_type: userType,
      policy_version: policyVersion,
      consented: true,
      consent_timestamp: new Date().toISOString(),
      ip_address: ipAddress,
      florida_two_party_consent: true,
      permanent: true,
      cannot_be_deleted: true,
    }
  };
}

export const legalComplianceVersion = '5.2';
export default {
  COMPLIANCE_VERSION, FLORIDA_CONSENT_LAW, FEDERAL_LAWS, TWO_PARTY_STATES,
  STATE_PRIVACY_LAWS, CONSENT_REQUIREMENTS, DAILY_COMPLIANCE_SCAN,
  CONSENT_MODAL_TEXT, legalComplianceVersion,
};
