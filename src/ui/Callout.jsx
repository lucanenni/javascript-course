import React from 'react';

const CALLOUT = {
    info:    { c: 'var(--ink-2)',       label: 'Nota' },
    tip:     { c: 'var(--ok-bright)',   label: 'Consiglio' },
    warning: { c: 'var(--accent)',      label: 'Attenzione' },
    analogy: { c: 'var(--accent-text)', label: 'Analogia' }
};

const Callout = ({ variant = 'info', title, html }) => {
    const s = CALLOUT[variant] || CALLOUT.info;
    return (
        <div className="my-7 border p-5" style={{ borderColor: 'var(--border-strong)', background: 'var(--bg-secondary)' }}>
            <div className="flex items-center gap-2.5 mb-2.5">
                <span style={{ width: 9, height: 9, background: s.c, flex: 'none' }}></span>
                <span className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.16em]" style={{ color: s.c }}>
                    {title || s.label}
                </span>
            </div>
            <div className="font-serif text-[0.98rem] leading-relaxed" style={{ color: 'var(--text-primary)' }}
                 dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    );
};

export { Callout };
