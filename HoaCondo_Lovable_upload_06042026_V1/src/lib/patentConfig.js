/**
 * HOACONDInsight™ Patent & IP Configuration
 * ============================================================
 * SINGLE SOURCE OF TRUTH FOR ALL PATENT AND IP REFERENCES
 * 
 * TO UPDATE TONIGHT: Change SECOND_APP_NUMBER below to your
 * actual application number when you receive it.
 * All platform files reference this object — one edit updates everything.
 * ============================================================
 * Hoa Condo Insight LLC · 61 N Lakeshore Drive · Hypoluxo, Florida 33462
 */

export const PATENT_CONFIG = {

  // ── FIRST APPLICATION (FILED — CONFIRMED) ────────────────────
  FIRST_APP: {
    number:        'U.S. Utility Patent Application No. 64/081,022',
    shortNumber:   '64/081,022',
    filedDate:     'June 2, 2026',
    status:        'Provisional Patent Application Pending',
    deadline:      'June 2, 2027',  // CRITICAL — nonprovisional must be filed before this date
    title:         'System and Method for Artificial Intelligence-Powered Automated Risk Analysis of Homeowners Association and Condominium Association Governing Documents',
    attorney:      'Fish & Richardson P.C.',
    attorneyEmail: 'NewMatters@fr.com',
    attorneyPhone: '617-542-5070',
    confirmed:     true,
  },

  // ── SECOND APPLICATION (UPDATE TONIGHT) ──────────────────────
  // TO UPDATE: Replace the number value below with your actual application number.
  // Example: '64/081,999' or whatever USPTO assigns.
  // Status and dates are already correct from the screenshot.
  SECOND_APP: {
    number:        'U.S. Patent Application No. [UPDATE_TONIGHT]',  // ← CHANGE THIS TONIGHT
    shortNumber:   '[UPDATE_TONIGHT]',                               // ← CHANGE THIS TONIGHT
    filedDate:     'June 4, 2026',
    status:        'Provisional Patent Application Pending',
    deadline:      'June 4, 2027',  // One year from filing date
    title:         'System and Method for Artificial Intelligence-Powered Automated Risk Analysis of Homeowners Association and Condominium Association Governing Documents — Supplemental Disclosure Including Broadened Claims, Multiple Transaction Party Delivery, Structured Report Deliverable, API Platform Integration, FHA Threshold Automation, Sub-Scoring Methodology, and National Benchmarking Database',
    attorney:      'Fish & Richardson P.C.',
    attorneyEmail: 'NewMatters@fr.com',
    attorneyPhone: '617-542-5070',
    confirmed:     false,   // Set to true after you enter the real number
    updateNote:    'Peter — replace [UPDATE_TONIGHT] with your actual USPTO application number. Then set confirmed: true.',
  },

  // ── TRADEMARKS ───────────────────────────────────────────────
  TRADEMARKS: [
    { mark: 'HOACONDInsight™',          status: 'Filed',   class: '42' },
    { mark: 'HOACondoInsight™',          status: 'Filed',   class: '42' },
    { mark: 'Know the Risks Before You Sign™', status: 'Filed', class: '42' },
  ],

  // ── TRADE SECRETS ────────────────────────────────────────────
  TRADE_SECRET_NOTICE: 'This platform, all source code, algorithms, scoring methodologies, legal frameworks, and documentation are trade secrets of Hoa Condo Insight LLC, protected under the Defend Trade Secrets Act (18 U.S.C. § 1836) and the Florida Uniform Trade Secrets Act.',

  // ── HELPER — used by all components ──────────────────────────
  displayBothApps() {
    const a1 = this.FIRST_APP;
    const a2 = this.SECOND_APP;
    return [
      {
        label:   'Primary Application',
        number:  a1.number,
        filed:   a1.filedDate,
        status:  a1.status,
        title:   a1.title,
        pending: false,
      },
      {
        label:   'Second Application',
        number:  a2.confirmed ? a2.number : 'Application No. [Update Tonight — see patent_config.js]',
        filed:   a2.filedDate,
        status:  a2.status,
        title:   a2.title,
        pending: !a2.confirmed,
        updateNote: a2.confirmed ? null : a2.updateNote,
      },
    ];
  },

  // ── FOOTER DISPLAY STRING ────────────────────────────────────
  footerText() {
    const a2num = this.SECOND_APP.confirmed ? this.SECOND_APP.shortNumber : '[Second App — Update Tonight]';
    return `U.S. Patent App. Nos. ${this.FIRST_APP.shortNumber} and ${a2num} · All Rights Reserved`;
  },

  // ── REPORT HEADER STRING ────────────────────────────────────
  reportPatentLine() {
    const a2 = this.SECOND_APP.confirmed
      ? `and ${this.SECOND_APP.shortNumber}`
      : '(second application pending number entry)';
    return `Protected by U.S. Patent Applications ${this.FIRST_APP.shortNumber} ${a2}`;
  },
};

export default PATENT_CONFIG;
