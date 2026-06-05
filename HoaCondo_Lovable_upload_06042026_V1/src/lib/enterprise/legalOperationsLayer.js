/**
 * HOACONDInsight™ Legal Operations Layer
 * 50-state attorney routing, vendor management, statute update workflow
 * IMPORTANT: HOACONDInsight is NOT a law firm. Attorneys are independent professionals.
 */
export const ATTORNEY_WORKFLOW = {
  step1: 'Document type detected → specialty matched (HOA law, condo law)',
  step2: 'State identified → licensed attorney in that state identified from vendor roster',
  step3: 'Matter sent with full context, 48-hour SLA set, attorney emailed',
  step4: 'Attorney response received → structured and logged in system',
  step5: 'If statute change flagged → recommendation queued for C-Suite review',
  step6: 'C-Suite reviews → Founder authorizes → platform updated',
  note: 'Attorney recommendations are advisory only. Attorneys cannot modify platform directly.',
};

export const DISCLAIMER = 'HOACONDInsight™ facilitates communication between clients and independent licensed attorneys. Hoa Condo Insight LLC is not a law firm and does not provide legal advice. All attorneys in this system represent the client, not Hoa Condo Insight LLC. Attorney opinions are solely their own professional judgment.';

export function routeToAttorney(documentType, state, clientId, urgency = 'standard') {
  return {
    documentType, state, clientId, urgency,
    routed: true,
    slaDays: urgency === 'urgent' ? 1 : 2,
    disclaimer: DISCLAIMER,
    routedAt: new Date().toISOString(),
    trackingId: `ATT-ROUTE-${Date.now()}`,
  };
}

export function generateAttorneyInvoice(attorneyId, matterId, hoursOrFlat, rate) {
  return {
    invoiceId: `INV-${Date.now()}`,
    attorneyId, matterId,
    amount: typeof hoursOrFlat === 'number' && rate ? hoursOrFlat * rate : hoursOrFlat,
    status: 'pending_approval',
    generatedAt: new Date().toISOString(),
    payableBy: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Net 30
  };
}

export const legalOperationsLayerConfig = { name: 'legalOperationsLayer', version: '5.1' };
export default legalOperationsLayerConfig;
