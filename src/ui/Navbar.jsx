import React from 'react';
import { useTheme } from '../lib/theme.jsx';
import { initAudio } from '../lib/audio.js';
import { Icon } from './Icon.jsx';

const Navbar = ({ onNavigate, completedCount, total }) => {
    const { theme, toggleTheme } = useTheme();
    const percent = total ? Math.round((completedCount / total) * 100) : 0;
    return (
        <nav className="sticky top-0 z-40 backdrop-blur-md border-b"
             style={{ background: 'color-mix(in srgb, var(--bg-primary) 82%, transparent)', borderColor: 'var(--border-strong)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 gap-6">
                    <button className="flex items-center gap-2.5 group" onClick={() => onNavigate('dashboard')}>
                        <span className="text-2xl leading-none font-serif italic" style={{ color: 'var(--accent)' }}>ƒ</span>
                        <span className="font-bold text-sm tracking-[0.06em] uppercase hidden sm:block">JavaScript da Zero</span>
                    </button>

                    <div className="hidden md:flex items-center gap-3 flex-1 max-w-[220px]">
                        <div className="relative w-full" style={{ height: '3px', background: 'var(--border-color)' }}>
                            <div className="absolute inset-y-0 left-0 transition-all duration-500" style={{ width: percent + '%', background: 'var(--accent)' }}></div>
                        </div>
                        <span className="text-[11px] font-mono tabular-nums" style={{ color: 'var(--text-secondary)' }}>{String(percent).padStart(2, '0')}%</span>
                    </div>

                    <button onClick={() => { initAudio(); toggleTheme(); }}
                            aria-label={theme === 'light' ? 'Attiva tema scuro' : 'Attiva tema chiaro'}
                            className="p-2 border transition hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                            style={{ borderColor: 'var(--border-strong)' }}>
                        <Icon name={theme === 'light' ? 'moon' : 'sun'} className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export { Navbar };
