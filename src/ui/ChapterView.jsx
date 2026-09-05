import React from 'react';
import { COURSE_DATA } from 'course:data';
import { Icon } from './Icon.jsx';
import { Block } from './Block.jsx';
import { useScrollSpy } from '../lib/scrollspy.js';
import { initAudio, playChime } from '../lib/audio.js';
import { CelebrationOverlay } from './Celebration.jsx';
const { useState, useEffect, useCallback, useMemo } = React;

const kicker = (id) => (id === 0 ? 'Introduzione' : 'Capitolo ' + String(id).padStart(2, '0'));

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
                    className="font-mono text-[11px] uppercase tracking-[0.12em] mb-6 flex items-center gap-2 hover:opacity-70"
                    style={{ color: 'var(--text-secondary)' }}>
                <Icon name="arrow" className="w-3.5 h-3.5 rotate-180" /> Programma
            </button>

            <div className="grid lg:grid-cols-4 gap-12">
                <aside className="hidden lg:block lg:col-span-1">
                    <div className="sticky top-24">
                        <div className="eyebrow mb-4" style={{ fontSize: '10px' }}>In questo capitolo</div>
                        <nav className="mb-6">
                            {headings.map(h => (
                                <a key={h.id} href={'#' + h.id} onClick={(e) => goToHeading(e, h.id)}
                                   className={'toc-link ' + (activeId === h.id ? 'active' : '')}>{h.text}</a>
                            ))}
                        </nav>
                        <div className="frame p-4">
                            <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.1em]">
                                <span className="flex items-center justify-center border" style={{ width: 16, height: 16, borderColor: 'var(--border-strong)', background: isDone ? 'var(--accent)' : 'transparent' }}>
                                    {isDone && <Icon name="check" className="w-2.5 h-2.5" style={{ color: '#FCF9EF' }} />}
                                </span>
                                <span style={{ color: 'var(--text-primary)' }}>{isDone ? 'Completato' : 'In corso'}</span>
                            </div>
                            {gradedIds.length > 0 && (
                                <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.08em]" style={{ color: 'var(--text-secondary)' }}>
                                    Esercizi {gradedIds.filter(id => solved.has(id)).length}/{gradedIds.length}
                                </p>
                            )}
                        </div>
                    </div>
                </aside>

                <article className="lg:col-span-3 max-w-3xl">
                    <div className="mb-10 pb-7 border-b" style={{ borderColor: 'var(--border-strong)' }}>
                        <div className="eyebrow mb-3">{kicker(chapterId)}</div>
                        <h1 className="font-sans font-medium tracking-[-0.03em] leading-[0.95] mt-1 mb-3"
                            style={{ fontSize: 'clamp(2.1rem, 5.5vw, 3.2rem)' }}>{chapter.title}</h1>
                        <p className="font-serif italic text-lg" style={{ color: 'var(--ink-2)' }}>{chapter.short}</p>
                    </div>

                    <details className="lg:hidden mb-8 border p-3" style={{ borderColor: 'var(--border-color)' }}>
                        <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.1em]">Indice</summary>
                        <nav className="mt-2">
                            {headings.map(h => <a key={h.id} href={'#' + h.id} onClick={(e) => goToHeading(e, h.id)} className="toc-link">{h.text}</a>)}
                        </nav>
                    </details>

                    <div className="prose-content" style={{ color: 'var(--text-primary)' }}>
                        {chapter.blocks.map((b, i) => <Block key={i} block={b} onSolved={handleSolved} />)}
                    </div>

                    <div className="mt-14 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border"
                         style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-strong)' }}>
                        <div className="font-serif text-[0.95rem]" style={{ color: 'var(--text-secondary)' }}>
                            {isDone
                                ? 'Capitolo completato.'
                                : gradedIds.length > 0
                                    ? 'Risolvi gli esercizi per completarlo, oppure segnalo a mano.'
                                    : 'Quando hai finito di leggere, segna il capitolo come completato.'}
                        </div>
                        {isDone
                            ? <button onClick={() => uncompleteChapter(chapterId)} className="btn-line">Da rivedere</button>
                            : <button onClick={doComplete} className="btn-solid"><Icon name="check" className="w-3.5 h-3.5" /> Completato</button>}
                    </div>

                    <div className="mt-8 pt-7 border-t grid grid-cols-2 gap-3" style={{ borderColor: 'var(--border-color)' }}>
                        {prev ? (
                            <button onClick={() => onNavigate('chapter', prev.id)}
                                    className="p-4 border text-left transition-colors hover:bg-[var(--bg-tertiary)]"
                                    style={{ borderColor: 'var(--border-color)' }}>
                                <span className="font-mono text-[10px] uppercase tracking-[0.12em] flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                                    <Icon name="arrow" className="w-3 h-3 rotate-180" /> Precedente
                                </span>
                                <span className="font-sans font-medium mt-1.5 block truncate">{prev.title}</span>
                            </button>
                        ) : <div />}
                        {next ? (
                            <button onClick={() => onNavigate('chapter', next.id)}
                                    className="p-4 border text-right transition-colors hover:bg-[var(--accent-soft)]"
                                    style={{ borderColor: 'var(--accent)' }}>
                                <span className="font-mono text-[10px] uppercase tracking-[0.12em] flex items-center justify-end gap-1.5" style={{ color: 'var(--accent-text)' }}>
                                    Prossimo <Icon name="arrow" className="w-3 h-3" />
                                </span>
                                <span className="font-sans font-medium mt-1.5 block truncate" style={{ color: 'var(--accent-text)' }}>{next.title}</span>
                            </button>
                        ) : (
                            <button onClick={() => onNavigate('dashboard')}
                                    className="p-4 text-right btn-solid justify-end" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                <span className="text-[10px] flex items-center gap-1.5">Fine corso <Icon name="check" className="w-3 h-3" /></span>
                                <span className="font-medium mt-1 block truncate normal-case tracking-normal text-sm">Torna al programma</span>
                            </button>
                        )}
                    </div>
                </article>
            </div>
        </div>
    );
};

export { ChapterView };
