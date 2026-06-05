import PATENT_CONFIG from './patentConfig.js';
/**
 * HOACONDInsight™ AI Analysis Engine
 * Patented 6-Factor HOA Health Score Formula
 * U.S. Utility Patent Application No. 64/081,022
 */

const FACTOR_WEIGHTS = {
  reserveFundHealth: 0.35,
  financialDelinquency: 0.20,
  litigationRisk: 0.15,
  insuranceCoverage: 0.15,
  governanceQuality: 0.10,
  physicalCondition: 0.05,
};

const FANNIE_MAE_CHECKS = {
  reserveFunded: { label: 'Reserve Fund ≥ 10%', weight: 'critical' },
  noActiveConviction: { label: 'No Active Litigation', weight: 'critical' },
  insuranceCurrent: { label: 'Insurance Current', weight: 'critical' },
  ownerOccupancy: { label: 'Owner Occupancy ≥ 51%', weight: 'required' },
  hotelConversion: { label: 'No Hotel/Transient Rental Conversion', weight: 'required' },
  singleEntityOwnership: { label: 'Single Entity Owns ≤ 10%', weight: 'required' },
};

export async function analyzeHOA(documents, propertyAddress) {
  // Call OpenAI GPT-4o for document analysis
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey || apiKey === 'test') {
    return getMockAnalysis(propertyAddress);
  }

  try {
    const prompt = buildAnalysisPrompt(documents, propertyAddress);
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        max_tokens: 4000,
      }),
    });
    const data = await response.json();
    return processAIResponse(JSON.parse(data.choices[0].message.content));
  } catch (err) {
    console.error('AI analysis error:', err);
    return getMockAnalysis(propertyAddress);
  }
}

function buildAnalysisPrompt(docs, address) {
  return `You are HOACONDInsight™ AI. Analyze this HOA/condo for Fannie Mae Full Review compliance.
Property: ${address}
Documents: ${docs.map(d => d.name).join(', ')}

Return JSON with: { healthScore (0-100), factors: { reserveFundHealth, financialDelinquency, litigationRisk, insuranceCoverage, governanceQuality, physicalCondition }, fannieMaeStatus ("PASS"|"FAIL"), fannieMaeChecks: { each check result }, predictions: [], riskFlags: [], recommendations: [], documentCompleteness: { score, missing: [] } }`;
}

function processAIResponse(raw) {
  const score = Math.round(
    Object.entries(FACTOR_WEIGHTS).reduce((acc, [factor, weight]) => {
      return acc + ((raw.factors?.[factor] || 50) * weight);
    }, 0)
  );
  return { ...raw, healthScore: score, timestamp: new Date().toISOString(), disclaimer: DISCLAIMER };
}

export function getMockAnalysis(address) {
  return {
    healthScore: 72, fannieMaeStatus: 'PASS', testMode: true,
    factors: { reserveFundHealth: 65, financialDelinquency: 80, litigationRisk: 90, insuranceCoverage: 85, governanceQuality: 70, physicalCondition: 75 },
    fannieMaeChecks: { reserveFunded: true, noActiveConviction: true, insuranceCurrent: true, ownerOccupancy: true, hotelConversion: true, singleEntityOwnership: true },
    predictions: ['Reserve fund may require special assessment within 36 months at current contribution rates.'],
    riskFlags: ['Reserve fund at 65% — below ideal 80% threshold.'],
    recommendations: ['Request 5-year capital improvement plan from HOA board.'],
    documentCompleteness: { score: 85, missing: ['2025 Reserve Study Update'] },
    disclaimer: DISCLAIMER, timestamp: new Date().toISOString(), propertyAddress: address,
  };
}

const DISCLAIMER = "HOACONDInsight™ analysis is for informational purposes only. Results do not constitute legal, financial, or regulatory advice and do not represent a Fannie Mae or Freddie Mac determination. All findings require review by qualified professionals.";

export { FACTOR_WEIGHTS, FANNIE_MAE_CHECKS, DISCLAIMER };
