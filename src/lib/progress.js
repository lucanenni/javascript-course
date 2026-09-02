import React from 'react';
const { useState, useCallback } = React;

const useCourseProgress = () => {
    const [completed, setCompleted] = useState(() => {
        try {
            const saved = localStorage.getItem('jsc:progress');
            const arr = saved ? JSON.parse(saved) : [];
            return Array.isArray(arr) ? arr : [];
        } catch (e) { return []; }
    });
    const persist = (arr) => { try { localStorage.setItem('jsc:progress', JSON.stringify(arr)); } catch (e) {} };
    const completeChapter = useCallback((id) => {
        setCompleted(prev => {
            if (prev.includes(id)) return prev;
            const next = [...prev, id];
            persist(next);
            return next;
        });
    }, []);
    const uncompleteChapter = useCallback((id) => {
        setCompleted(prev => {
            const next = prev.filter(x => x !== id);
            persist(next);
            return next;
        });
    }, []);
    const resetProgress = useCallback(() => {
        try { localStorage.removeItem('jsc:progress'); } catch (e) {}
        setCompleted([]);
    }, []);
    return { completed, completeChapter, uncompleteChapter, resetProgress };
};

export { useCourseProgress };
