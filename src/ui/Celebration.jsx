import React from 'react';
import { Icon } from './Icon.jsx';

const CelebrationOverlay = ({ show, isLast, onClose, onNext }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/25 backdrop-blur-sm animate-fadeIn" onClick={onClose}></div>
            <div className="relative rounded-2xl p-8 shadow-2xl flex flex-col items-center animate-scaleIn max-w-md w-full text-center"
                 style={{ background: 'var(--bg-secondary)' }} role="dialog" aria-modal="true">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: 'var(--accent)' }}>
                    <Icon name="check" className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Capitolo completato!</h3>
                <p className="mt-2 mb-6" style={{ color: 'var(--text-secondary)' }}>
                    {isLast ? "Hai completato l'intero corso. Complimenti!" : "Ottimo lavoro. Sei pronto per il prossimo passo."}
                </p>
                <div className="flex gap-3 w-full">
                    <button onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg text-sm font-medium hover:opacity-80"
                            style={{ borderColor: 'var(--border-color)' }}>Resta qui</button>
                    {!isLast && (
                        <button onClick={onNext} className="flex-1 px-4 py-2 text-white rounded-lg text-sm font-medium hover:opacity-90"
                                style={{ background: 'var(--accent)' }}>Prossimo capitolo</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export { CelebrationOverlay };
