import React from 'react';
import { Icon } from './Icon.jsx';

const CALLOUT = {
    info:    { c: '#3b82f6', icon: 'info', label: 'Nota' },
    tip:     { c: '#10b981', icon: 'bulb', label: 'Consiglio' },
    warning: { c: '#f59e0b', icon: 'warn', label: 'Attenzione' },
    analogy: { c: '#8b5cf6', icon: 'book', label: 'Analogia' }
};
const Callout = ({ variant = 'info', title, html }) => {
    const s = CALLOUT[variant] || CALLOUT.info;
    return (
        <div className="my-6 rounded-xl border p-4 flex gap-3"
             style={{ borderColor: 'var(--border-color)', background: s.c + '14' }}>
            <div className="flex-shrink-0 mt-0.5" style={{ color: s.c }}>
                <Icon name={s.icon} className="w-5 h-5" />
            </div>
            <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: s.c }}>
                    {title || s.label}
                </div>
                <div className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}
                     dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    );
};

export { Callout };
