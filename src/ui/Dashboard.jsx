import React from 'react';
import { COURSE_DATA } from 'course:data';
import { Icon } from './Icon.jsx';
const { useState } = React;

const Dashboard = ({ onNavigate, progress }) => {
    const { completed, resetProgress } = progress;
    const total = COURSE_DATA.length;
    const percent = Math.round((completed.length / total) * 100);
    const [confirmReset, setConfirmReset] = useState(false);
    const firstTodo = COURSE_DATA.find(c => !completed.includes(c.id)) || COURSE_DATA[0];

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 animate-fadeIn">

            {/* Hero */}
            <header className="mb-16">
                <div className="eyebrow mb-7">Corso interattivo · JavaScript</div>

                <h1 className="font-sans font-bold tracking-[-0.04em] leading-[0.9] mb-5"
                    style={{ fontSize: 'clamp(3rem, 9vw, 5.5rem)' }}>
                    JavaScript<br /><span className="font-serif italic font-normal" style={{ color: 'var(--accent)' }}>da zero</span>
                </h1>

                <p className="font-serif italic mb-8 max-w-xl leading-snug" style={{ fontSize: 'clamp(1.15rem, 2.4vw, 1.6rem)', color: 'var(--ink-2)' }}>
                    Dieci capitoli per imparare a programmare — scrivendo codice vero
                    dalla prima pagina, con esercizi corretti sul momento.
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                    <span className="pill"><span className="dot"></span>{total} capitoli</span>
                    <span className="pill accent"><span className="dot"></span>esercizi verificati</span>
                    <span className="pill"><span className="dot"></span>offline · nessuna installazione</span>
                </div>

                <div className="frame p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                        <div className="w-full sm:max-w-xs">
                            <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.1em] mb-2" style={{ color: 'var(--text-secondary)' }}>
                                <span>Avanzamento</span><span>{String(completed.length).padStart(2, '0')} / {total}</span>
                            </div>
                            <div className="relative w-full" style={{ height: '4px', background: 'var(--border-color)' }}>
                                <div className="absolute inset-y-0 left-0 transition-all duration-500" style={{ width: percent + '%', background: 'var(--accent)' }}></div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => onNavigate('chapter', firstTodo.id)} className="btn-solid">
                                {percent > 0 ? 'Riprendi' : 'Inizia'} <Icon name="arrow" className="w-3.5 h-3.5" />
                            </button>
                            {percent > 0 && (confirmReset ? (
                                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em]">
                                    <span style={{ color: 'var(--text-secondary)' }}>Azzerare?</span>
                                    <button onClick={() => { resetProgress(); setConfirmReset(false); }} className="btn-line" style={{ padding: '6px 10px', borderColor: 'var(--err)', color: 'var(--err)' }}>Sì</button>
                                    <button onClick={() => setConfirmReset(false)} className="btn-line" style={{ padding: '6px 10px' }}>No</button>
                                </div>
                            ) : (
                                <button onClick={() => setConfirmReset(true)} title="Azzera i progressi" className="btn-line" style={{ padding: '9px 11px' }}>
                                    <Icon name="reset" className="w-4 h-4" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* Programma */}
            <div className="eyebrow mb-6">Il programma</div>
            <ol className="border-t" style={{ borderColor: 'var(--border-strong)' }}>
                {COURSE_DATA.map((ch) => {
                    const done = completed.includes(ch.id);
                    return (
                        <li key={ch.id}>
                            <button onClick={() => onNavigate('chapter', ch.id)}
                                    className="group w-full text-left flex items-center gap-5 py-5 border-b transition-colors"
                                    style={{ borderColor: 'var(--border-color)' }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                <span className="font-mono text-[13px] tabular-nums pl-1 w-10 flex-none"
                                      style={{ color: done ? 'var(--accent-text)' : 'var(--text-faint)' }}>
                                    {String(ch.id).padStart(2, '0')}
                                </span>
                                <span className="flex-none w-6 flex items-center justify-center" style={{ color: 'var(--accent)' }}>
                                    {done && <Icon name="check" className="w-4 h-4" />}
                                </span>
                                <span className="flex-1 min-w-0">
                                    <span className="block font-sans font-medium text-[1.05rem] truncate" style={{ color: 'var(--text-primary)' }}>{ch.title}</span>
                                    <span className="block font-serif text-sm truncate" style={{ color: 'var(--text-secondary)' }}>{ch.short}</span>
                                </span>
                                <Icon name="arrow" className="w-4 h-4 flex-none mr-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent-text)' }} />
                            </button>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

export { Dashboard };
