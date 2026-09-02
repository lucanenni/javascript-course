import React from 'react';
import { initAudio } from '../lib/audio.js';
const { useState } = React;

const DiffWidget = ({ before, after, label }) => {
    const [showAfter, setShowAfter] = useState(false);
    return (
        <div className="my-8 rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center justify-between px-4 py-2 border-b"
                 style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
                <span className="text-sm font-semibold">{label}</span>
                <button
                    onClick={() => { initAudio(); setShowAfter(v => !v); }}
                    className="px-3 py-1 text-xs font-medium rounded-md text-white transition"
                    style={{ background: 'var(--accent)' }}>
                    {showAfter ? 'Mostra prima' : 'Mostra dopo'}
                </button>
            </div>
            <pre className="p-4 text-sm font-mono overflow-x-auto m-0" style={{ background: 'var(--code-bg)' }}>
                <code className="block" style={{ color: showAfter ? 'var(--accent-text)' : 'var(--text-primary)' }}>
                    {showAfter ? after : before}
                </code>
            </pre>
        </div>
    );
};

export { DiffWidget };
