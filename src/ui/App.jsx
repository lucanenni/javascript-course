import React from 'react';
import { ThemeProvider } from '../lib/theme.jsx';
import { useCourseProgress } from '../lib/progress.js';
import { useRoute, navigate } from '../lib/router.js';
import { COURSE_DATA } from 'course:data';
import { Navbar } from './Navbar.jsx';
import { Dashboard } from './Dashboard.jsx';
import { ChapterView } from './ChapterView.jsx';
import { ErrorBoundary } from './ErrorBoundary.jsx';
const { useEffect } = React;

const App = () => {
    const route = useRoute();               // { view: 'dashboard' | 'chapter', chapterId }
    const progress = useCourseProgress();

    // Porta in cima quando cambia capitolo/vista (non per gli anchor dell'indice)
    useEffect(() => { window.scrollTo(0, 0); }, [route.view, route.chapterId]);

    return (
        <ThemeProvider>
            <div className="min-h-screen transition-colors duration-300" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
                <Navbar onNavigate={navigate} completedCount={progress.completed.length} total={COURSE_DATA.length} />
                <main>
                    <ErrorBoundary>
                        {route.view === 'chapter'
                            ? <ChapterView key={route.chapterId} chapterId={route.chapterId} onNavigate={navigate} progress={progress} />
                            : <Dashboard onNavigate={navigate} progress={progress} />}
                    </ErrorBoundary>
                </main>
                <footer className="border-t mt-20 py-10 text-center font-mono text-[10.5px] uppercase tracking-[0.14em]"
                        style={{ borderColor: 'var(--border-strong)', color: 'var(--text-secondary)' }}>
                    <p>JavaScript da Zero &nbsp;·&nbsp; {new Date().getFullYear()} &nbsp;·&nbsp; progresso salvato solo su questo browser</p>
                </footer>
            </div>
        </ThemeProvider>
    );
};

export { App };
