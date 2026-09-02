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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
            <div className="rounded-2xl p-8 md:p-12 mb-12 border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4"
                      style={{ color: 'var(--accent-text)', background: 'var(--accent)' + '1a' }}>Corso interattivo</span>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">JavaScript da Zero</h1>
                <p className="text-lg mb-8 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                    Dieci capitoli per imparare a programmare partendo da zero. Scrivi codice vero fin dalla prima pagina,
                    con esercizi corretti automaticamente. Niente da installare, il tuo progresso resta su questo browser.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="w-full sm:w-1/2">
                        <div className="flex justify-between text-xs mb-2 font-medium" style={{ color: 'var(--text-secondary)' }}>
                            <span>Avanzamento</span><span>{completed.length} / {total} capitoli</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                            <div className="h-full transition-all duration-500" style={{ width: percent + '%', background: 'var(--accent)' }}></div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => onNavigate('chapter', firstTodo.id)}
                                className="px-6 py-3 text-white rounded-lg font-medium hover:opacity-90 transition flex items-center"
                                style={{ background: 'var(--accent)' }}>
                            {percent > 0 ? 'Riprendi' : 'Inizia ora'} <Icon name="arrow" className="w-4 h-4 ml-2" />
                        </button>
                        {percent > 0 && (
                            confirmReset ? (
                                <div className="flex items-center gap-2 text-sm">
                                    <span style={{ color: 'var(--text-secondary)' }}>Azzerare?</span>
                                    <button onClick={() => { resetProgress(); setConfirmReset(false); }}
                                            className="px-3 py-1 rounded-md text-white" style={{ background: 'var(--err)' }}>Sì</button>
                                    <button onClick={() => setConfirmReset(false)}
                                            className="px-3 py-1 rounded-md border" style={{ borderColor: 'var(--border-color)' }}>No</button>
                                </div>
                            ) : (
                                <button onClick={() => setConfirmReset(true)} title="Azzera i progressi"
                                        className="px-4 py-3 border rounded-lg font-medium hover:opacity-80 transition"
                                        style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                                    <Icon name="reset" className="w-4 h-4" />
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-bold tracking-tight mb-6">Programma del corso</h2>
            <div className="space-y-3">
                {COURSE_DATA.map((ch) => {
                    const done = completed.includes(ch.id);
                    return (
                        <button key={ch.id} onClick={() => onNavigate('chapter', ch.id)}
                                className="w-full text-left border rounded-xl p-5 flex items-center transition-all hover:opacity-90"
                                style={{ background: 'var(--bg-secondary)', borderColor: done ? 'var(--accent)' : 'var(--border-color)' }}>
                            <div className="w-11 h-11 rounded-full flex items-center justify-center mr-4 font-bold text-sm flex-shrink-0"
                                 style={done
                                    ? { background: 'var(--accent)', color: '#fff' }
                                    : { background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                                {done ? <Icon name="check" className="w-5 h-5" /> : ch.id}
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="text-xs uppercase tracking-wider font-medium" style={{ color: 'var(--text-secondary)' }}>
                                    {ch.id === 0 ? 'Introduzione' : 'Capitolo ' + ch.id}
                                </span>
                                <h3 className="text-lg font-semibold truncate">{ch.title}</h3>
                                <p className="text-sm truncate" style={{ color: 'var(--text-secondary)' }}>{ch.short}</p>
                            </div>
                            <Icon name="arrow" className="w-5 h-5 ml-4 hidden sm:block" style={{ color: 'var(--text-secondary)' }} />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export { Dashboard };
