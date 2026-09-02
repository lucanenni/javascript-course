import React from 'react';
import { COURSE_DATA } from 'course:data';
const { useState, useEffect } = React;

// Routing via hash:
//   #/                -> dashboard
//   #/capitolo/<id>   -> capitolo
// Gli hash che non iniziano con "#/" (es. gli anchor dell'indice, "#istruzioni")
// NON toccano la rotta: restano gestiti dallo scroll nativo del browser.

const parse = () => {
    const h = window.location.hash || '';
    const m = h.match(/^#\/capitolo\/(\d+)/);
    if (m) {
        const id = Number(m[1]);
        if (COURSE_DATA.some(c => c.id === id)) return { view: 'chapter', chapterId: id };
    }
    if (/^#\//.test(h) || h === '' || h === '#') return { view: 'dashboard', chapterId: null };
    return null; // hash "estraneo": non cambiare rotta
};

const useRoute = () => {
    const [route, setRoute] = useState(() => parse() || { view: 'dashboard', chapterId: null });
    useEffect(() => {
        const onHash = () => { const r = parse(); if (r) setRoute(r); };
        window.addEventListener('hashchange', onHash);
        return () => window.removeEventListener('hashchange', onHash);
    }, []);
    return route;
};

// Usato dai componenti al posto del vecchio onNavigate.
const navigate = (target, chapterId = null) => {
    const next = target === 'chapter' && chapterId != null ? `#/capitolo/${chapterId}` : '#/';
    if (window.location.hash === next) {
        window.dispatchEvent(new HashChangeEvent('hashchange')); // forza re-render se già lì
    } else {
        window.location.hash = next;
    }
};

export { useRoute, navigate };
