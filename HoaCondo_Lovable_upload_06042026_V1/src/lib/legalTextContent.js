import PATENT_CONFIG from './patentConfig.js';

/**
 * HOACONDInsight™ Legal Text Content
 * AI-DRAFTED — REQUIRES FLORIDA-LICENSED ATTORNEY REVIEW BEFORE LIVE DEPLOYMENT
 * Attorney review is Company Rule prerequisite — do not go live without it
 */
export const LEGAL_TEXTS = {
  TERMS: `TERMS OF SERVICE — Hoa Condo Insight LLC
61 N Lakeshore Drive, Hypoluxo, Florida 33462
Effective: June 4, 2026 | Last Updated: June 4, 2026

⚠️ ATTORNEY REVIEW PENDING — This document requires review and approval by a Florida-licensed attorney before deployment to live customers.

1. ACCEPTANCE OF TERMS
By accessing or using HOACONDInsight™, you agree to be bound by these Terms. If you do not agree, do not use the platform.

2. DESCRIPTION OF SERVICE
HOACONDInsight™ provides AI-powered HOA and condominium compliance analysis for informational purposes only. The platform does not provide legal, financial, or regulatory advice.

3. DISCLAIMER OF WARRANTIES
THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. HOACONDINSIGHT DOES NOT WARRANT THAT RESULTS ARE ACCURATE, COMPLETE, OR SUITABLE FOR ANY PARTICULAR PURPOSE.

4. LIMITATION OF LIABILITY
HOACONDINSIGHT'S LIABILITY IS LIMITED TO AMOUNTS PAID IN THE PRIOR 12 MONTHS. IN NO EVENT SHALL HOACONDINSIGHT BE LIABLE FOR CONSEQUENTIAL, INDIRECT, OR PUNITIVE DAMAGES.

5. FANNIE MAE DISCLAIMER
Results do not constitute Fannie Mae or Freddie Mac determinations. Lenders bear sole responsibility for compliance with applicable guidelines.

6. ATTORNEY INDEPENDENCE
Certifying attorneys are independent licensed professionals. HOACONDInsight does not supervise or warrant their opinions.

7. MANDATORY ARBITRATION
ALL DISPUTES SHALL BE RESOLVED BY BINDING ARBITRATION UNDER JAMS RULES IN PALM BEACH COUNTY, FLORIDA. CLASS ACTION WAIVER APPLIES. YOU WAIVE YOUR RIGHT TO A JURY TRIAL AND TO PARTICIPATE IN ANY CLASS ACTION.

8. GOVERNING LAW
These Terms are governed by the laws of the State of Florida.`,

  PRIVACY: `PRIVACY POLICY — Hoa Condo Insight LLC
Effective: June 4, 2026 | Last Updated: June 4, 2026

⚠️ ATTORNEY REVIEW PENDING

1. DATA WE COLLECT
We collect: account information, order details, property addresses, uploaded HOA documents, payment information (processed by Stripe — we do not store card numbers), and usage analytics.

2. HOW WE USE YOUR DATA
To provide analysis services, process payments, send order confirmations and reports, maintain your account, and improve the platform.

3. DATA WE DO NOT SELL
HOACONDInsight does not sell personal data. Company Rule 11 prohibits data monetization without a 5-step legal authorization process.

4. THIRD PARTY SERVICES
We share data only as necessary with: Stripe (payments), Supabase (database), OpenAI (AI analysis), Resend (email delivery), and certifying attorneys (analysis documents only).

5. YOUR RIGHTS (CCPA)
California residents may request: access to data, deletion of data, and opt-out of any future data sale. Contact: privacy@hoacondinsight.com

6. DATA RETENTION
Data retained for 7 years per financial compliance requirements. HOA analysis records retained indefinitely as database asset.

7. SECURITY
Bank-level encryption in transit and at rest. Supabase provides row-level security. No sensitive financial data stored outside Stripe's PCI-compliant environment.`,

  DISCLAIMER: `DISCLAIMER — Hoa Condo Insight LLC

HOACONDInsight™ is an AI-powered informational analysis tool. It is NOT a law firm and does NOT provide legal advice.

ANALYSIS RESULTS ARE INFORMATIONAL ONLY. They do not constitute:
• Legal advice or a legal opinion
• Financial advice or a financial recommendation  
• A Fannie Mae or Freddie Mac eligibility determination
• A guarantee of HOA compliance or loan approval
• A substitute for independent professional review

Attorney certifications are provided by independent licensed attorneys who are solely responsible for their professional opinions. HOACONDInsight does not supervise or warrant attorney opinions.

All results must be independently verified by qualified professionals before any transaction or lending decision.`,

  CANCELLATION: `CANCELLATION & REFUND POLICY — Hoa Condo Insight LLC

INDIVIDUAL REPORTS: Cancellations accepted within 30 minutes of order submission, provided AI analysis has not yet started. Once analysis begins, no refunds are available.

SUBSCRIPTIONS: May be cancelled at any time. No prorated refunds for partial subscription periods. Service continues until end of paid period.

ATTORNEY CERTIFICATION FEE: Non-refundable once attorney assignment has been made.

CONTACT: support@hoacondinsight.com with your order number and reason for cancellation request.`,
};

export const MANDATORY_DISCLAIMER = 'HOACONDInsight™ results are for informational purposes only and do not constitute legal, financial, or regulatory advice. Results do not represent a Fannie Mae or Freddie Mac lending determination.';

export const ARBITRATION_CLAUSE = 'MANDATORY ARBITRATION: Any dispute arising from use of HOACONDInsight™ shall be resolved by binding arbitration under JAMS rules administered in Palm Beach County, Florida. CLASS ACTION WAIVER: You waive the right to participate in any class action. This clause applies to all users and is incorporated into all agreements.';

export const legalTextContent = { name: 'legalTextContent', version: '5.1', pages: Object.keys(LEGAL_TEXTS).length };
export default legalTextContent;
