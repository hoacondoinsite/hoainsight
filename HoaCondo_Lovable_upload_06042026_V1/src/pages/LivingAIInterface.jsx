import React, { useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { USER_PROFILES, REPORT_TEMPLATES, OUTPUT_FORMATS, generateReport } from '../lib/livingAI.js';

export default function LivingAIInterface({ userRole = 'buyer', embedded = false }) {
  const [question, setQuestion] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('screen');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const profile = USER_PROFILES[userRole] || USER_PROFILES.buyer;
  const suggestedQuestions = {
    founder: ['Create complete investor financial package', 'Generate PE due diligence data room', 'Show monthly accounting summary'],
    csuite: ['Generate board presentation', 'Create compliance summary report'],
    buyer: ['Explain my HOA health score', 'What does my report mean?', 'Should I be concerned about my HOA?'],
    lender: ['Generate Fannie Mae compliance summary', 'Show Form 1076 data', 'List all analyses this month'],
    attorney: ['Show my earnings statement', 'List pending certifications', 'Show my quality score'],
  };

  const handleGenerate = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    const report = selectedTemplate ? generateReport(userRole, selectedTemplate, {}) : { content: `Response to: "${question}"\n\nHOACONDInsight™ Living AI — Connect to Supabase and OpenAI to generate personalized reports from your live data. This interface supports voice input, 9 output formats, and 7 pre-built templates.`, template: 'Custom Query' };
    setResult(report);
    setLoading(false);
  };

  const content = (
    <div className={embedded ? '' : 'max-w-3xl mx-auto px-4 py-10'}>
      {!embedded && <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--navy)' }}>Living AI Interface</h1>}
      {!embedded && <p className="text-gray-600 mb-6 text-sm">Ask anything. Get a report in any format. Works for every role.</p>}
      
      <div className="bg-white rounded-xl border shadow-sm p-5 mb-4">
        <div className="flex gap-2 mb-4">
          {(suggestedQuestions[userRole] || suggestedQuestions.buyer).map((q, i) => (
            <button key={i} onClick={() => setQuestion(q)} className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 whitespace-nowrap">{q}</button>
          ))}
        </div>
        <textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="Type your question or request... e.g. 'Create a complete financial package for my investors'" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2" style={{ '--tw-ring-color': 'var(--gold)' }} rows={3} />
        <div className="flex gap-3 mt-3">
          <select value={selectedTemplate} onChange={e => setSelectedTemplate(e.target.value)} className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 flex-1">
            <option value="">Or choose a template...</option>
            {Object.entries(REPORT_TEMPLATES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
          <select value={selectedFormat} onChange={e => setSelectedFormat(e.target.value)} className="text-xs border border-gray-200 rounded-lg px-3 py-1.5">
            {OUTPUT_FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          <button onClick={handleGenerate} disabled={!question && !selectedTemplate || loading} className="px-4 py-1.5 rounded-lg text-white text-sm font-semibold disabled:opacity-40" style={{ background: 'var(--navy)' }}>
            {loading ? '...' : 'Generate'}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white rounded-xl border shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold" style={{ color: 'var(--navy)' }}>{result.template || 'Response'}</p>
            <span className="text-xs text-gray-400">Format: {selectedFormat}</span>
          </div>
          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{result.content || JSON.stringify(result, null, 2)}</pre>
          <div className="flex gap-2 mt-4">
            {['PDF','Email','Print','CSV'].map(f => <button key={f} className="text-xs px-3 py-1 rounded border text-gray-500 hover:bg-gray-50">{f}</button>)}
          </div>
        </div>
      )}
    </div>
  );

  if (embedded) return content;
  return <div><Nav />{content}<Footer /></div>;
}
