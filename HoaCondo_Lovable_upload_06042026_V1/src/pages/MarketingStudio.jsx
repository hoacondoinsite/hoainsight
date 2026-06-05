import React, { useState } from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { ASSET_TYPES, generateAsset, requiresApproval } from '../lib/marketingContentEngine.js';

export default function MarketingStudio() {
  const [selectedCategory, setSelectedCategory] = useState('Email');
  const [selectedAsset, setSelectedAsset] = useState('');
  const [context, setContext] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [approvalQueue, setApprovalQueue] = useState([]);

  const currentCat = ASSET_TYPES.find(a => a.category === selectedCategory);
  const needsApproval = requiresApproval(selectedCategory);

  const handleGenerate = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const asset = generateAsset(selectedAsset, { category: selectedCategory, context });
    if (asset.requiresApproval) {
      setApprovalQueue(prev => [...prev, { ...asset, id: Date.now(), assetName: selectedAsset }]);
    }
    setResult(asset);
    setLoading(false);
  };

  return (
    <div><Nav />
    <section className="py-8 px-4" style={{ background: 'var(--navy)' }}>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-1">Marketing Studio</h1>
        <p className="text-sm" style={{ color: 'var(--gold)' }}>36 asset types · AI generator · C-Suite approval gate for legal/PR content</p>
      </div>
    </section>
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-semibold mb-3 text-sm text-gray-700">Categories</h3>
          {ASSET_TYPES.map(cat => (
            <button key={cat.category} onClick={() => { setSelectedCategory(cat.category); setSelectedAsset(''); setResult(null); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition-colors ${selectedCategory === cat.category ? 'text-white font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
              style={selectedCategory === cat.category ? { background: 'var(--navy)' } : {}}>
              {cat.category}
              {requiresApproval(cat.category) && <span className="ml-2 text-xs text-amber-500">⚠ approval</span>}
            </button>
          ))}
          {approvalQueue.length > 0 && (
            <div className="mt-4 border-t pt-4">
              <p className="text-xs font-semibold text-amber-700 mb-2">Approval Queue ({approvalQueue.length})</p>
              {approvalQueue.map(item => <div key={item.id} className="text-xs text-gray-500 mb-1">• {item.assetName} — Pending C-Suite</div>)}
            </div>
          )}
        </div>
        <div className="md:col-span-2">
          {currentCat && (
            <>
              <h3 className="font-semibold mb-3 text-sm text-gray-700">{selectedCategory} Assets</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {currentCat.assets.map(asset => (
                  <button key={asset} onClick={() => setSelectedAsset(asset)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${selectedAsset === asset ? 'text-white border-transparent' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    style={selectedAsset === asset ? { background: 'var(--gold)' } : {}}>{asset}</button>
                ))}
              </div>
              <textarea value={context} onChange={e => setContext(e.target.value)} placeholder="Additional context (target audience, key message, specific details)..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none mb-3" rows={3} />
              {needsApproval && <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700 mb-3">⚠️ This category requires C-Suite approval before deployment.</div>}
              <button onClick={handleGenerate} disabled={!selectedAsset || loading}
                className="px-6 py-2 rounded-lg text-white text-sm font-semibold disabled:opacity-40" style={{ background: 'var(--navy)' }}>
                {loading ? 'Generating...' : 'Generate Asset'}
              </button>
              {result && (
                <div className="mt-4 bg-white rounded-xl border p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold text-sm">{result.assetType}</p>
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${result.requiresApproval ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                      {result.requiresApproval ? 'Pending C-Suite Approval' : 'Ready to Use'}
                    </span>
                  </div>
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans">{result.content}</pre>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
    <Footer /></div>
  );
}
