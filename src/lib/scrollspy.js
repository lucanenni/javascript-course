import React from 'react';
const { useState, useEffect } = React;

const useScrollSpy = (ids) => {
    const key = ids.join('|');
    const [activeId, setActiveId] = useState(ids[0] || null);
    useEffect(() => {
        if (!ids.length) return;
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id); });
        }, { rootMargin: '0px 0px -70% 0px', threshold: 0.1 });
        ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
        return () => obs.disconnect();
    }, [key]);
    return activeId;
};

export { useScrollSpy };
