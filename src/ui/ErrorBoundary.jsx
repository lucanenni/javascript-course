import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(p) { super(p); this.state = { err: null }; }
    static getDerivedStateFromError(err) { return { err }; }
    render() {
        if (this.state.err) {
            return (
                <div className="max-w-xl mx-auto my-20 p-6 border" style={{ borderColor: 'var(--border-strong)', background: 'var(--bg-secondary)' }}>
                    <div className="eyebrow mb-3" style={{ color: 'var(--err)' }}>Errore</div>
                    <h1 className="font-sans text-xl font-medium mb-2">Qualcosa è andato storto</h1>
                    <p className="font-serif text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                        Ricarica la pagina. Se il problema resta, azzera i dati salvati dal corso.
                    </p>
                    <pre className="text-xs overflow-auto p-3 font-mono border" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>{String(this.state.err && this.state.err.message)}</pre>
                    <button onClick={() => { try { localStorage.clear(); } catch (e) {} location.reload(); }}
                            className="btn-solid mt-4">Azzera e ricarica</button>
                </div>
            );
        }
        return this.props.children;
    }
}

export { ErrorBoundary };
