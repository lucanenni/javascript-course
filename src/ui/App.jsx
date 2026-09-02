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
                <footer className="border-t mt-16 py-8 text-center text-sm" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                    <p>JavaScript da Zero &middot; {new Date().getFullYear()} &middot; Il tuo progresso è salvato solo su questo browser.</p>
                </footer>
            </div>
        </ThemeProvider>
    );
};

export { App };
