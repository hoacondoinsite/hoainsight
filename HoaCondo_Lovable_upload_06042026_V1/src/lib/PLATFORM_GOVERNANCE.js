/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║         HOACONDInsight™ PLATFORM GOVERNANCE FRAMEWORK               ║
 * ║         Version: 1.0                                                ║
 * ║         Established: June 5, 2026                                   ║
 * ║         Authorized by: Peter Klein, Founder                         ║
 * ║         Legal Entity: Hoa Condo Insight LLC                         ║
 * ║         Location: Hypoluxo, Florida                                 ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 *
 * PURPOSE:
 * This file is the foundational governance document for the HOACONDInsight™
 * platform. Every change made to this platform — at any level — must comply
 * with the rules defined here. These rules exist to protect the platform,
 * the founder, the company, and the value of this asset for any future
 * acquisition, licensing, or legal proceeding.
 *
 * AUTHORITY:
 * Only the Founder (Peter Klein) may modify these governance rules.
 * Any modification requires a new version stamp and written authorization.
 */

// ── RULE 1 — SOP REQUIRED BEFORE ANY CHANGE ─────────────────────────────
/**
 * RULE 1: Standard Operating Procedure Required
 *
 * Before any code change, file modification, or system action is delivered
 * to the Founder for execution, a written SOP must be produced covering:
 *   (1) What we are doing and why
 *   (2) Every step in exact order
 *   (3) What the Founder will see at each step to confirm it worked
 *   (4) What to do if something looks wrong
 *   (5) The rollback plan
 *
 * NO EXCEPTIONS. No change reaches the Founder without a complete SOP.
 */
export const RULE_1_SOP_REQUIRED = {
  id: 'RULE-001',
  name: 'SOP Required Before Any Change',
  authority: 'Founder',
  established: '2026-06-05',
  mandatory: true,
  description: 'Every change requires a written SOP before delivery to Founder.',
};

// ── RULE 2 — VERSION STAMP EVERY FILE CHANGE ────────────────────────────
/**
 * RULE 2: Version Stamp Every File Change
 *
 * Every file that is modified must include a comment at the top showing:
 *   - The date the change was made
 *   - What was changed and why
 *   - Who authorized the change
 *
 * This creates an auditable history of every modification to the platform.
 * Critical for patent prosecution, acquisition due diligence, and legal defense.
 */
export const RULE_2_VERSION_STAMP = {
  id: 'RULE-002',
  name: 'Version Stamp Every File Change',
  authority: 'Founder',
  established: '2026-06-05',
  mandatory: true,
  description: 'Every modified file must carry a dated, attributed change comment.',
};

// ── RULE 3 — ONE CHANGE AT A TIME ───────────────────────────────────────
/**
 * RULE 3: One Change At A Time
 *
 * No session may modify more than one file per step.
 * Each change must be confirmed working before the next change begins.
 *
 * Reason: When multiple files change simultaneously, it becomes impossible
 * to identify which change caused a problem. One change at a time means
 * every issue is immediately traceable and fixable.
 */
export const RULE_3_ONE_CHANGE = {
  id: 'RULE-003',
  name: 'One Change At A Time',
  authority: 'Founder',
  established: '2026-06-05',
  mandatory: true,
  description: 'Never modify more than one file per step. Confirm before proceeding.',
};

// ── RULE 4 — PLAIN ENGLISH CONFIRMATION BEFORE PUSH ─────────────────────
/**
 * RULE 4: Plain English Confirmation Before Any Push
 *
 * Before the Founder executes any code change, a plain English summary
 * must be provided explaining:
 *   - What the code does in everyday language
 *   - What will change on the live platform
 *   - What will NOT change
 *
 * No technical jargon. The Founder must understand exactly what is
 * being pushed before it is pushed.
 */
export const RULE_4_PLAIN_ENGLISH = {
  id: 'RULE-004',
  name: 'Plain English Confirmation Before Push',
  authority: 'Founder',
  established: '2026-06-05',
  mandatory: true,
  description: 'Plain English summary of every change required before Founder executes.',
};

// ── RULE 5 — ROLLBACK PLAN REQUIRED ─────────────────────────────────────
/**
 * RULE 5: Rollback Plan Required
 *
 * Every SOP must include explicit rollback instructions — the exact steps
 * to undo the change if something goes wrong after deployment.
 *
 * The rollback plan must be as simple and clear as the deployment plan.
 * If the Founder cannot execute the rollback alone, the SOP is not complete.
 */
export const RULE_5_ROLLBACK = {
  id: 'RULE-005',
  name: 'Rollback Plan Required',
  authority: 'Founder',
  established: '2026-06-05',
  mandatory: true,
  description: 'Every SOP must include a complete rollback procedure.',
};

// ── RULE 6 — TEST URL CONFIRMATION AFTER EVERY DEPLOY ───────────────────
/**
 * RULE 6: Test URL Confirmation After Every Deploy
 *
 * After every deployment, the Founder must receive:
 *   - The exact URL to check
 *   - The exact visual confirmation of what a successful deploy looks like
 *   - The exact visual signs of a failed deploy
 *
 * No deployment is considered complete until the Founder confirms
 * what they see matches the expected result.
 */
export const RULE_6_TEST_URL = {
  id: 'RULE-006',
  name: 'Test URL Confirmation After Every Deploy',
  authority: 'Founder',
  established: '2026-06-05',
  mandatory: true,
  description: 'Exact URL and visual confirmation required after every deployment.',
};

// ── RULE 7 — SESSION SUMMARY AT END OF EVERY SESSION ────────────────────
/**
 * RULE 7: Session Summary Required
 *
 * At the end of every working session, a written summary must be produced
 * covering:
 *   (1) What was changed this session
 *   (2) What is currently pending or in progress
 *   (3) What the next session should start with — first action, first step
 *
 * This ensures continuity across sessions and prevents work from being
 * lost, repeated, or done out of order.
 */
export const RULE_7_SESSION_SUMMARY = {
  id: 'RULE-007',
  name: 'Session Summary Required',
  authority: 'Founder',
  established: '2026-06-05',
  mandatory: true,
  description: 'Written session summary required: what changed, what is pending, what is next.',
};

// ── GOVERNANCE REGISTRY ──────────────────────────────────────────────────
export const PLATFORM_GOVERNANCE = {
  version: '1.0',
  established: '2026-06-05',
  authorizedBy: 'Peter Klein, Founder — Hoa Condo Insight LLC',
  rules: [
    RULE_1_SOP_REQUIRED,
    RULE_2_VERSION_STAMP,
    RULE_3_ONE_CHANGE,
    RULE_4_PLAIN_ENGLISH,
    RULE_5_ROLLBACK,
    RULE_6_TEST_URL,
    RULE_7_SESSION_SUMMARY,
  ],
  totalRules: 7,
  lastModified: '2026-06-05',
  modifiedBy: 'Peter Klein, Founder',
  note: 'Only the Founder may modify these governance rules. All changes require a new version stamp.',
};

export default PLATFORM_GOVERNANCE;
