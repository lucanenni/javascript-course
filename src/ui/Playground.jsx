import React from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/matchbrackets.js';
import { useTheme } from '../lib/theme.jsx';
import { runnerHTML, DOM_STARTER_BODY } from '../lib/sandbox.js';
import { Icon } from './Icon.jsx';
const { useState, useEffect, useRef, useCallback } = React;

const Playground = ({ id, initialCode, mode = 'console', checks = null, hint = null, onSolved }) => {
    const storageKey = 'jsc:code:' + id;
    const readSaved = () => {
        try { const v = localStorage.getItem(storageKey); return v == null ? initialCode : v; }
        catch (e) { return initialCode; }
    };

    const [output, setOutput] = useState([]);
    const [status, setStatus] = useState('idle'); // idle|running|ok|error|timeout
    const [checkResults, setCheckResults] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const { theme } = useTheme();

    const taRef = useRef(null);
    const cmRef = useRef(null);
    const hostRef = useRef(null);       // dove viene montato l'iframe
    const iframeRef = useRef(null);
    const watchdogRef = useRef(null);
    const listenerRef = useRef(null);
    const debounceRef = useRef(null);
    const runSeqRef = useRef(0);
    const mountedRef = useRef(true);
    const solvedRef = useRef(false);
    const onSolvedRef = useRef(onSolved);
    useEffect(() => { onSolvedRef.current = onSolved; });

    const teardown = useCallback(() => {
        if (watchdogRef.current) { clearTimeout(watchdogRef.current); watchdogRef.current = null; }
        if (listenerRef.current) { window.removeEventListener('message', listenerRef.current); listenerRef.current = null; }
        if (iframeRef.current) { iframeRef.current.remove(); iframeRef.current = null; }
    }, []);

    const run = useCallback((code) => {
        if (!hostRef.current) return;
        teardown();
        const seq = ++runSeqRef.current;
        setStatus('running');

        const iframe = document.createElement('iframe');
        iframe.setAttribute('sandbox', 'allow-scripts');
        iframe.setAttribute('title', 'Esecuzione codice');
        iframe.style.cssText = mode === 'dom'
            ? 'width:100%;height:220px;border:0;display:block;background:#fff'
            : 'width:0;height:0;border:0;position:absolute;visibility:hidden';
        iframe.srcdoc = runnerHTML(mode === 'dom' ? DOM_STARTER_BODY : '');

        const onMsg = (e) => {
            if (!iframeRef.current || e.source !== iframeRef.current.contentWindow) return;
            const d = e.data;
            if (!d || !d.__pg) return;
            if (d.type === 'ready') {
                iframeRef.current.contentWindow.postMessage({ __pg: 'run', code, checks }, '*');
                return;
            }
            if (d.type === 'result') {
                if (seq !== runSeqRef.current || !mountedRef.current) return;
                if (watchdogRef.current) { clearTimeout(watchdogRef.current); watchdogRef.current = null; }
                window.removeEventListener('message', onMsg); listenerRef.current = null;
                setOutput(d.logs || []);
                setStatus(d.status === 'error' ? 'error' : 'ok');
                if (d.checks) {
                    setCheckResults(d.checks);
                    if (d.checks.length && d.checks.every(c => c.pass) && !solvedRef.current) {
                        solvedRef.current = true;
                        if (onSolvedRef.current) onSolvedRef.current();
                    }
                } else {
                    setCheckResults(null);
                }
                if (mode !== 'dom') { iframe.remove(); if (iframeRef.current === iframe) iframeRef.current = null; }
            }
        };
        listenerRef.current = onMsg;
        window.addEventListener('message', onMsg);

        watchdogRef.current = setTimeout(() => {
            if (seq !== runSeqRef.current || !mountedRef.current) return;
            window.removeEventListener('message', onMsg); listenerRef.current = null;
            if (iframeRef.current) { iframeRef.current.remove(); iframeRef.current = null; }
            setStatus('timeout');
            setOutput([{ level: 'error', text: '⏱ Esecuzione interrotta dopo 2 secondi. Probabile ciclo infinito: controlla la condizione dei tuoi for / while.' }]);
            setCheckResults(null);
        }, 2000);

        iframeRef.current = iframe;
        hostRef.current.appendChild(iframe);
    }, [checks, mode, teardown]);

    const scheduleRun = useCallback((code) => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => run(code), 500);
    }, [run]);

    // init CodeMirror
    useEffect(() => {
        mountedRef.current = true;
        if (!taRef.current || cmRef.current) return;
        cmRef.current = CodeMirror.fromTextArea(taRef.current, {
            mode: 'javascript',
            theme: document.documentElement.classList.contains('dark') ? 'dracula' : 'neat',
            lineNumbers: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            indentUnit: 2,
            tabSize: 2,
            extraKeys: { Tab: false, 'Shift-Tab': false } // non intrappolare la tastiera
        });
        const initial = readSaved();
        cmRef.current.setValue(initial);
        run(initial);
        cmRef.current.on('change', (inst) => {
            const v = inst.getValue();
            try { localStorage.setItem(storageKey, v); } catch (e) {}
            scheduleRun(v);
        });
        return () => {
            mountedRef.current = false;
            clearTimeout(debounceRef.current);
            teardown();
        };
    }, []);

    useEffect(() => {
        if (cmRef.current) cmRef.current.setOption('theme', theme === 'dark' ? 'dracula' : 'neat');
    }, [theme]);

    const restore = () => {
        try { localStorage.removeItem(storageKey); } catch (e) {}
        solvedRef.current = false;
        if (cmRef.current) cmRef.current.setValue(initialCode);
    };

    const badge = {
        idle:    null,
        running: { t: 'esecuzione…', c: 'var(--text-secondary)' },
        ok:      { t: 'eseguito', c: 'var(--ok)' },
        error:   { t: 'errore', c: 'var(--err)' },
        timeout: { t: 'interrotto', c: '#f59e0b' }
    }[status];

    const allPass = checkResults && checkResults.length && checkResults.every(c => c.pass);

    return (
        <div className="my-8 rounded-xl overflow-hidden border shadow-sm" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center justify-between px-4 py-2 border-b text-xs font-mono"
                 style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span className="w-3 h-3 rounded-full bg-green-400"></span>
                    <span className="ml-2 hidden sm:inline">{mode === 'dom' ? 'pagina.html' : 'playground.js'}</span>
                </div>
                <div className="flex items-center gap-3">
                    {badge && (
                        <span className="flex items-center gap-1.5" style={{ color: badge.c }}>
                            <span className="w-2 h-2 rounded-full" style={{ background: badge.c }}></span>{badge.t}
                        </span>
                    )}
                    <button onClick={restore} className="flex items-center gap-1 hover:opacity-70" title="Ripristina il codice iniziale">
                        <Icon name="reset" className="w-3.5 h-3.5" /> reset
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1" style={{ background: 'var(--code-bg)' }}>
                <div className="border-b md:border-b-0 md:border-r overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
                    <label className="sr-only" htmlFor={'ta-' + id}>Editor di codice JavaScript</label>
                    <textarea id={'ta-' + id} ref={taRef} defaultValue={initialCode}></textarea>
                </div>
                <div style={{ background: 'var(--bg-secondary)' }}>
                    {mode === 'dom' && (
                        <div ref={hostRef} className="border-b" style={{ borderColor: 'var(--border-color)' }} />
                    )}
                    <div className="p-4 font-mono text-sm overflow-auto max-h-[360px] min-h-[150px]" aria-live="polite">
                        {output.length === 0 && <div style={{ color: 'var(--text-secondary)' }}>(nessun output)</div>}
                        {output.map((line, i) => (
                            <div key={i} className="py-0.5 whitespace-pre-wrap break-words"
                                 style={{ color: line.level === 'error' ? 'var(--err)' : line.level === 'warn' ? '#b45309' : 'var(--text-primary)' }}>
                                <span className="mr-2 select-none" style={{ color: 'var(--text-secondary)' }}>&gt;</span>{line.text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {mode !== 'dom' && <div ref={hostRef} aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} />}

            {(checkResults || hint) && (
                <div className="px-4 py-3 border-t text-sm" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}>
                    {checkResults && (
                        <div className="space-y-1.5">
                            {checkResults.map((c, i) => (
                                <div key={i} className="flex items-start gap-2">
                                    <span className="mt-0.5" style={{ color: c.pass ? 'var(--ok)' : 'var(--err)' }}>
                                        <Icon name={c.pass ? 'check' : 'x'} className="w-4 h-4" />
                                    </span>
                                    <span style={{ color: c.pass ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                                        {c.label}{c.error ? ' — ' + c.error : ''}
                                    </span>
                                </div>
                            ))}
                            {allPass && (
                                <div className="mt-2 font-semibold flex items-center gap-2" style={{ color: 'var(--ok)' }}>
                                    <Icon name="check" className="w-4 h-4" /> Esercizio risolto!
                                </div>
                            )}
                        </div>
                    )}
                    {hint && (
                        <div className={checkResults ? 'mt-3' : ''}>
                            <button onClick={() => setShowHint(v => !v)} className="text-xs font-medium underline"
                                    style={{ color: 'var(--accent-text)' }}>
                                {showHint ? 'Nascondi suggerimento' : 'Mostra suggerimento'}
                            </button>
                            {showHint && <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}
                                            dangerouslySetInnerHTML={{ __html: hint }} />}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export { Playground };
