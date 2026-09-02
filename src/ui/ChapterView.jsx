import React from 'react';
import { COURSE_DATA } from 'course:data';
import { Icon } from './Icon.jsx';
import { Block } from './Block.jsx';
import { useScrollSpy } from '../lib/scrollspy.js';
import { initAudio, playChime } from '../lib/audio.js';
import { CelebrationOverlay } from './Celebration.jsx';
const { useState, useEffect, useRef, useCallback, useMemo } = React;

const ChapterView = ({ chapterId, onNavigate, progress }) => {
    const chapter = COURSE_DATA.find(c => c.id === chapterId);
    const { completed, completeChapter, uncompleteChapter } = progress;
    const isDone = completed.includes(chapterId);
    const [showCelebration, setShowCelebration] = useState(false);
    const [solved, setSolved] = useState(() => new Set());

    const headings = useMemo(() => chapter.blocks.filter(b => b.type === 'h2').map(b => ({ id: b.id, text: b.text })), [chapterId]);
    const gradedIds = useMemo(() => chapter.blocks.filter(b => b.type === 'play' && b.checks).map(b => b.id), [chapterId]);
    const activeId = useScrollSpy(headings.map(h => h.id));

    const idx = COURSE_DATA.findIndex(c => c.id === chapterId);
    const prev = COURSE_DATA[idx - 1];
    const next = COURSE_DATA[idx + 1];
    const isLast = idx === COURSE_DATA.length - 1;

    const doComplete = useCallback(() => {
        completeChapter(chapterId);
        setShowCelebration(true);
        initAudio(); playChime();
    }, [chapterId, completeChapter]);

    const handleSolved = useCallback((pid) => {
        setSolved(prev => {
            if (prev.has(pid)) return prev;
            const n = new Set(prev); n.add(pid); return n;
        });
    }, []);

    useEffect(() => {
        if (!isDone && gradedIds.length > 0 && gradedIds.every(id => solved.has(id))) doComplete();
    }, [solved, gradedIds, isDone, doComplete]);

    // Indice: scroll morbido senza scrivere nell'hash (non deve toccare la rotta)
    const goToHeading = (e, id) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
            <CelebrationOverlay
                show={showCelebration} isLast={isLast}
                onClose={() => setShowCelebration(false)}
                onNext={() => { setShowCelebration(false); onNavigate('chapter', next.id); }} />

            <button onClick={() => onNavigate('dashboard')}
                    className="text-sm mb-4 flex items-center hover:opacity-70" style={{ color: 'var(--text-secondary)' }}>
                <Icon name="arrow" className="w-4 h-4 mr-2 rotate-180" /> Torna al programma
            </button>

            <div className="grid lg:grid-cols-4 gap-10">
                <aside className="hidden lg:block lg:col-span-1">
                    <div className="sticky top-24">
                        <h2 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-secondary)' }}>In questo capitolo</h2>
                        <nav className="space-y-1 text-sm mb-6">
                            {headings.map(h => (
                                <a key={h.id} href={'#' + h.id} onClick={(e) => goToHeading(e, h.id)}
                                   className={'toc-link ' + (activeId === h.id ? 'active' : '')}
                                   style={activeId === h.id ? {} : { color: 'var(--text-secondary)' }}>{h.text}</a>
                            ))}
                        </nav>
                        <div className="p-4 border rounded-xl text-sm" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                            <div className="flex items-center gap-2 font-medium">
                                <span className="w-5 h-5 rounded-md border flex items-center justify-center"
                                      style={isDone ? { background: 'var(--accent)', borderColor: 'var(--accent)' } : { borderColor: 'var(--border-color)' }}>
                                    {isDone && <Icon name="check" className="w-3 h-3 text-white" />}
                                </span>
                                {isDone ? 'Completato' : 'In corso'}
                            </div>
                            {gradedIds.length > 0 && (
                                <p className="mt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                                    Esercizi risolti: {gradedIds.filter(id => solved.has(id)).length} / {gradedIds.length}
                                </p>
                            )}
                        </div>
                    </div>
                </aside>

                <article className="lg:col-span-3 max-w-3xl">
                    <div className="mb-8 pb-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
                        <span className="text-sm font-semibold" style={{ color: 'var(--accent-text)' }}>
                            {chapterId === 0 ? 'Introduzione' : 'Capitolo ' + chapterId}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-1 mb-2">{chapter.title}</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>{chapter.short}</p>
                    </div>

                    <details className="lg:hidden mb-6 border rounded-lg p-3 text-sm" style={{ borderColor: 'var(--border-color)' }}>
                        <summary className="cursor-pointer font-medium">Indice del capitolo</summary>
                        <nav className="mt-2 space-y-1">
                            {headings.map(h => <a key={h.id} href={'#' + h.id} onClick={(e) => goToHeading(e, h.id)} className="block py-0.5" style={{ color: 'var(--accent-text)' }}>{h.text}</a>)}
                        </nav>
                    </details>

                    <div className="prose-content font-serif" style={{ color: 'var(--text-primary)' }}>
                        {chapter.blocks.map((b, i) => <Block key={i} block={b} onSolved={handleSolved} />)}
                    </div>

                    <div className="mt-12 p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                         style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            {isDone
                                ? 'Capitolo completato.'
                                : gradedIds.length > 0
                                    ? 'Risolvi gli esercizi per completarlo, oppure segnalo manualmente.'
                                    : 'Quando hai finito di leggere, segna il capitolo come completato.'}
                        </div>
                        {isDone
                            ? <button onClick={() => uncompleteChapter(chapterId)}
                                      className="px-4 py-2 border rounded-lg text-sm font-medium hover:opacity-80"
                                      style={{ borderColor: 'var(--border-color)' }}>Segna come da rivedere</button>
                            : <button onClick={doComplete}
                                      className="px-5 py-2.5 text-white rounded-lg text-sm font-semibold hover:opacity-90 flex items-center gap-2"
                                      style={{ background: 'var(--accent)' }}>
                                  <Icon name="check" className="w-4 h-4" /> Segna come completato
                              </button>}
                    </div>

                    <div className="mt-8 pt-6 border-t grid grid-cols-2 gap-3" style={{ borderColor: 'var(--border-color)' }}>
                        {prev ? (
                            <button onClick={() => onNavigate('chapter', prev.id)}
                                    className="p-4 border rounded-xl text-left hover:opacity-90"
                                    style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                                <span className="text-xs flex items-center" style={{ color: 'var(--text-secondary)' }}>
                                    <Icon name="arrow" className="w-3 h-3 mr-1 rotate-180" /> Precedente
                                </span>
                                <span className="font-semibold mt-1 block truncate">{prev.title}</span>
                            </button>
                        ) : <div />}
                        {next ? (
                            <button onClick={() => onNavigate('chapter', next.id)}
                                    className="p-4 border rounded-xl text-right hover:opacity-90"
                                    style={{ background: 'var(--accent)' + '0d', borderColor: 'var(--accent)' + '4d' }}>
                                <span className="text-xs flex items-center justify-end" style={{ color: 'var(--accent-text)' }}>
                                    Prossimo <Icon name="arrow" className="w-3 h-3 ml-1" />
                                </span>
                                <span className="font-semibold mt-1 block truncate" style={{ color: 'var(--accent-text)' }}>{next.title}</span>
                            </button>
                        ) : (
                            <button onClick={() => onNavigate('dashboard')}
                                    className="p-4 text-white rounded-xl text-right hover:opacity-90" style={{ background: 'var(--accent)' }}>
                                <span className="text-xs flex items-center justify-end">Fine corso <Icon name="check" className="w-3 h-3 ml-1" /></span>
                                <span className="font-semibold mt-1 block truncate">Vai al programma</span>
                            </button>
                        )}
                    </div>
                </article>
            </div>
        </div>
    );
};

export { ChapterView };
