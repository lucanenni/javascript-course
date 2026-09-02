import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(p) { super(p); this.state = { err: null }; }
    static getDerivedStateFromError(err) { return { err }; }
    render() {
        if (this.state.err) {
            return (
                <div className="max-w-xl mx-auto my-20 p-6 rounded-xl border" style={{ borderColor: 'var(--border-color)' }}>
                    <h1 className="text-xl font-bold mb-2">Qualcosa è andato storto</h1>
                    <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                        Ricarica la pagina. Se il problema resta, prova ad azzerare i dati salvati dal corso.
                    </p>
                    <pre className="text-xs overflow-auto p-3 rounded" style={{ background: 'var(--bg-tertiary)' }}>{String(this.state.err && this.state.err.message)}</pre>
                    <button onClick={() => { try { localStorage.clear(); } catch(e){} location.reload(); }}
                            className="mt-4 px-4 py-2 text-white rounded-lg text-sm" style={{ background: 'var(--accent)' }}>
                        Azzera e ricarica
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export { ErrorBoundary };
