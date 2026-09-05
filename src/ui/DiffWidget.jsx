import React from 'react';
import { initAudio } from '../lib/audio.js';
const { useState } = React;

const DiffWidget = ({ before, after, label }) => {
    const [showAfter, setShowAfter] = useState(false);
    return (
        <div className="my-8 border" style={{ borderColor: 'var(--border-strong)' }}>
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b"
                 style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-secondary)' }}>{label}</span>
                <button onClick={() => { initAudio(); setShowAfter(v => !v); }} className="btn-line" style={{ padding: '5px 10px' }}>
                    {showAfter ? 'Prima' : 'Dopo'}
                </button>
            </div>
            <pre className="p-4 text-[13px] font-mono overflow-x-auto m-0 leading-relaxed" style={{ background: 'var(--code-bg)' }}>
                <code className="block" style={{ color: showAfter ? 'var(--accent-text)' : 'var(--text-primary)' }}>
                    {showAfter ? after : before}
                </code>
            </pre>
        </div>
    );
};

export { DiffWidget };
