import React from 'react';
import { useTheme } from '../lib/theme.jsx';
import { initAudio } from '../lib/audio.js';
import { Icon } from './Icon.jsx';

const Navbar = ({ onNavigate, completedCount, total }) => {
    const { theme, toggleTheme } = useTheme();
    const percent = total ? Math.round((completedCount / total) * 100) : 0;
    return (
        <nav className="sticky top-0 z-40 backdrop-blur-md border-b"
             style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <button className="flex items-center gap-2" onClick={() => onNavigate('dashboard')}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                             style={{ background: 'var(--accent)' }}>JS</div>
                        <span className="font-bold text-lg tracking-tight hidden sm:block">JavaScript da Zero</span>
                    </button>
                    <div className="hidden md:flex items-center gap-3 flex-1 max-w-xs mx-8">
                        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                            <div className="h-full transition-all duration-500" style={{ width: percent + '%', background: 'var(--accent)' }}></div>
                        </div>
                        <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>{percent}%</span>
                    </div>
                    <button onClick={() => { initAudio(); toggleTheme(); }}
                            aria-label={theme === 'light' ? 'Attiva tema scuro' : 'Attiva tema chiaro'}
                            className="p-2 rounded-lg border hover:opacity-80 transition"
                            style={{ borderColor: 'var(--border-color)' }}>
                        <Icon name={theme === 'light' ? 'moon' : 'sun'} className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export { Navbar };
