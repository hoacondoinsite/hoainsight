/**
 * HOACONDInsight™ Marketing Engine
 * 3 email sequences: Lender (5-email), Agent, Title
 */

export const EMAIL_SEQUENCES = {
  lender: {
    name: 'Enterprise Lender Sequence',
    emails: [
      { day: 0, subject: 'Fannie Mae LL-2026-03 — How HOACONDInsight™ solves it for your team', preview: 'The Limited Review pathway is gone. Here is the automated solution.' },
      { day: 3, subject: 'Your lenders are spending 5-10 days per condo file. We cut it to 48 hours.', preview: 'Real numbers from the Full Review process.' },
      { day: 7, subject: 'Branch license: $299/month. Time savings: 80 hours per loan officer per year.', preview: 'The ROI calculation your CFO will approve.' },
      { day: 14, subject: 'Form 1076 auto-populated. Attorney-certified. Fannie Mae compliant.', preview: 'See exactly what your team receives on every analysis.' },
      { day: 21, subject: 'One question before I stop reaching out', preview: 'Is condo compliance a challenge your team is actively solving right now?' },
    ]
  },
  agent: {
    name: 'Real Estate Agent Sequence',
    emails: [
      { day: 0, subject: 'Your condo buyers need HOA health reports. Here is why.', preview: 'Fannie Mae now requires Full Review on every conventional condo loan.' },
      { day: 5, subject: 'Offer this to every condo buyer: $39, 48 hours, attorney-certified', preview: 'A competitive advantage your buyers will thank you for.' },
      { day: 12, subject: 'Join our partner program: earn 25% on every report you refer', preview: 'Passive income on every condo transaction. Takes 5 minutes to set up.' },
    ]
  },
  title: {
    name: 'Title Company Sequence',
    emails: [
      { day: 0, subject: 'Add HOA compliance to your closing workflow — $35 per file', preview: 'HOACONDInsight™ API integrates directly into your closing process.' },
      { day: 7, subject: 'Your lender clients need Full Review on every condo closing', preview: 'Be the title company that already has this solved.' },
    ]
  }
};

export function getSequenceForRole(role) {
  const map = { lender: 'lender', realtor: 'agent', title: 'title' };
  return EMAIL_SEQUENCES[map[role]] || EMAIL_SEQUENCES.lender;
}

export const marketingEngineConfig = { name: 'marketingEngine', version: '5.0', sequences: Object.keys(EMAIL_SEQUENCES).length };
export default marketingEngineConfig;
