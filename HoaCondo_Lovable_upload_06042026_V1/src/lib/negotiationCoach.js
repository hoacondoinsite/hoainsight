/**
 * HOACONDInsight™ Buyer Protection Report
 * (Formerly: Negotiation Coach — renamed for agent-channel protection)
 *
 * CRITICAL RULE: This product is BUYER-ONLY.
 * - NEVER shown to realtors, agents, lenders, or title companies
 * - Delivered PRIVATELY to buyer's email only
 * - Agent is NEVER notified it was ordered
 * - Only shown when userType is 'buyer', 'current_owner', or 'buyer_attorney'
 */

const BUYER_ROLES = ['buyer', 'current_owner', 'buyer_attorney'];

// Gate: Only show to buyers — never to agents or lenders
export function isBuyerProtectionVisible(userType) {
  return BUYER_ROLES.includes(userType?.toLowerCase());
}

export function showBuyerProtectionInCheckout(userType, referralSource) {
  // Hide if realtor referral code present
  if (referralSource?.startsWith('AGENT-') || referralSource?.startsWith('REALTOR-')) return false;
  return isBuyerProtectionVisible(userType);
}

// Private delivery spec — agent NEVER notified
export function getBuyerProtectionEmailSpec(buyerEmail, analysisData) {
  return {
    to: buyerEmail,
    cc: [], // NEVER include agent
    bcc: [], 
    agentNeverNotified: true,
    subject: 'Your Buyer Protection Report — Private Delivery to You Only',
    deliveryNote: 'This report has been delivered privately to you only. Your agent has not been notified.',
  };
}

// Generate buyer protection tactics from analysis risk flags
export function generateBuyerProtection(analysisData) {
  const tactics = [];
  const { factors, riskFlags, healthScore } = analysisData;

  if (factors?.reserveFundHealth < 70) {
    const deficit = Math.round((70 - factors.reserveFundHealth) / 100 * 15000);
    tactics.push({
      risk: 'Reserve Fund Below Ideal Level',
      severity: 'HIGH',
      yourOptions: [
        `Request a seller credit of approximately $${deficit.toLocaleString()} to offset reserve fund risk`,
        'Ask seller to provide written HOA confirmation of no planned special assessments for 24 months',
        'Request 5-year capital improvement plan from HOA board before closing',
      ]
    });
  }

  if (factors?.financialDelinquency < 75) {
    tactics.push({
      risk: 'HOA Delinquency Rate Above Normal',
      severity: 'MEDIUM',
      yourOptions: [
        'Request 1–2% purchase price reduction based on documented financial risk',
        'Include contract contingency: seller represents no special assessment for delinquency recovery within 24 months',
        'Request current month delinquency report directly from HOA before closing',
      ]
    });
  }

  if (factors?.litigationRisk < 80) {
    tactics.push({
      risk: 'Active or Recent HOA Litigation Detected',
      severity: 'HIGH',
      yourOptions: [
        'Request seller to escrow funds pending litigation resolution',
        'Add contract language: seller represents no special assessment for litigation costs within 36 months',
        'Require seller attorney opinion letter on litigation status before closing',
      ]
    });
  }

  if (factors?.insuranceCoverage < 80) {
    tactics.push({
      risk: 'Insurance Coverage Gap',
      severity: 'HIGH',
      yourOptions: [
        'Request seller obtain written HOA confirmation of full insurance coverage before closing',
        'Request seller credit equal to estimated insurance deductible gap',
        'Make closing contingent on HOA providing certificate of insurance meeting Fannie Mae requirements',
      ]
    });
  }

  if (tactics.length === 0) {
    tactics.push({
      risk: 'No Significant Risk Factors',
      severity: 'INFO',
      yourOptions: ['This HOA is financially healthy. You are buying into a well-managed community. No negotiation levers based on HOA condition.']
    });
  }

  return {
    productName: 'Buyer Protection Report',
    price: 19,
    privateDelivery: true,
    agentNeverNotified: true,
    tactics,
    disclaimer: 'This report is for your personal use only. Strategies are informational and do not constitute legal or financial advice.',
    generatedAt: new Date().toISOString(),
  };
}

export const PRICE = 19;
export const DISPLAY_NAME = 'Buyer Protection Report';
export const ATTACH_RATE_TARGET = 0.40; // 40% of buyer orders

export default { isBuyerProtectionVisible, showBuyerProtectionInCheckout, generateBuyerProtection, PRICE, DISPLAY_NAME };
