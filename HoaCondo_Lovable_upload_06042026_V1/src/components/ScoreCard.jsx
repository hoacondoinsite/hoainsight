import React, { useState, useEffect } from 'react';

export default function ScoreCard({ score = 78, label = 'HOA Health Score', size = 'lg' }) {
  const [displayed, setDisplayed] = useState(0);
  
  useEffect(() => {
    let frame = 0;
    const total = 60;
    const timer = setInterval(() => {
      frame++;
      setDisplayed(Math.round((score * frame) / total));
      if (frame >= total) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [score]);

  const color = score >= 80 ? 'var(--green)' : score >= 60 ? '#f59e0b' : '#ef4444';
  const dim = size === 'lg' ? 160 : 120;
  const r = (dim / 2) - 12;
  const circ = 2 * Math.PI * r;
  const offset = circ - (displayed / 100) * circ;

  return (
    <div className="flex flex-col items-center">
      <svg width={dim} height={dim}>
        <circle cx={dim/2} cy={dim/2} r={r} fill="none" stroke="#e2e8f0" strokeWidth="10" />
        <circle cx={dim/2} cy={dim/2} r={r} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" transform={`rotate(-90 ${dim/2} ${dim/2})`}
          style={{ transition: 'stroke-dashoffset 0.05s linear' }} />
        <text x={dim/2} y={dim/2 + 6} textAnchor="middle" fontSize={size === 'lg' ? '28' : '22'} fontWeight="bold" fill={color}>{displayed}</text>
      </svg>
      <p className="text-sm text-gray-600 mt-1 font-medium">{label}</p>
    </div>
  );
}
