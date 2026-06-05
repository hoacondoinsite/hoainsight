const RESEND_API_KEY = () => import.meta.env.VITE_RESEND_API_KEY || '';
const FROM = 'HOACONDInsight™ <noreply@hoacondinsight.com>';

export async function sendEmail({ to, subject, html, text }) {
  const key = RESEND_API_KEY();
  if (!key) { console.log('Email (test):', { to, subject }); return { success: true, test: true }; }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to, subject, html, text }),
  });
  return res.json();
}

export const EMAIL_TEMPLATES = {
  orderConfirmation: (data) => ({
    subject: 'Your HOACONDInsight™ Report Order Confirmed',
    html: `<h2>Order Confirmed</h2><p>Your HOA analysis for <strong>${data.address}</strong> has been received.</p><p>Order ID: ${data.orderId}</p><p>Expected delivery: Within 48 hours. You will receive an email when your report is ready.</p>`,
  }),
  reportReady: (data) => ({
    subject: 'Your HOACONDInsight™ Report is Ready',
    html: `<h2>Your Report is Ready</h2><p>Your HOA Health Analysis for <strong>${data.address}</strong> is complete.</p><p>Health Score: <strong>${data.score}/100</strong></p><p>Fannie Mae Status: <strong>${data.status}</strong></p><p><a href="${data.reportUrl}">View Full Report</a></p>`,
  }),
  buyerProtectionDelivery: (data) => ({
    subject: 'Your Buyer Protection Report — PRIVATE DELIVERY',
    html: `<h2>Your Buyer Protection Report</h2><p>This report has been delivered privately to you only. Your agent has not been notified.</p><p>Property: <strong>${data.address}</strong></p>${data.tactics.map(t => `<p><strong>${t.risk}</strong>: ${t.strategy}</p>`).join('')}`,
  }),
  attorneyAssignment: (data) => ({
    subject: 'New HOA Certification Assignment — 48 Hour SLA',
    html: `<h2>New Assignment</h2><p>Attorney ${data.name}, you have a new HOA certification assignment.</p><p>Property: <strong>${data.address}</strong></p><p>Deadline: 48 hours from this email.</p><p>Documents are available in your dashboard.</p>`,
  }),
};
