import React from 'react';
import { Icon } from './Icon.jsx';

const CelebrationOverlay = ({ show, isLast, onClose, onNext }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 animate-fadeIn" style={{ background: 'color-mix(in srgb, var(--ink) 30%, transparent)' }} onClick={onClose}></div>
            <div className="frame relative p-8 flex flex-col items-center animate-scaleIn max-w-md w-full text-center"
                 role="dialog" aria-modal="true">
                <div className="eyebrow mb-5" style={{ color: 'var(--accent-text)' }}>
                    {isLast ? 'Corso completato' : 'Capitolo completato'}
                </div>
                <div className="flex items-center justify-center mb-5" style={{ width: 56, height: 56, background: 'var(--accent)' }}>
                    <Icon name="check" className="w-8 h-8" style={{ color: '#FCF9EF' }} />
                </div>
                <p className="font-serif italic text-lg mb-7" style={{ color: 'var(--ink-2)' }}>
                    {isLast ? "Hai finito l'intero corso. Complimenti." : 'Ottimo lavoro. Avanti col prossimo passo.'}
                </p>
                <div className="flex gap-3 w-full">
                    <button onClick={onClose} className="btn-line flex-1 justify-center">Resta qui</button>
                    {!isLast && <button onClick={onNext} className="btn-solid flex-1 justify-center">Prossimo</button>}
                </div>
            </div>
        </div>
    );
};

export { CelebrationOverlay };
