import React from 'react';
const { useState, useEffect } = React;

const ThemeContext = React.createContext({ theme: 'light', toggleTheme: () => {} });
const useTheme = () => React.useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        try { return document.documentElement.classList.contains('dark') ? 'dark' : 'light'; }
        catch (e) { return 'light'; }
    });
    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark', theme === 'dark');
        try { localStorage.setItem('jsc:theme', theme); } catch (e) {}
    }, [theme]);
    const toggleTheme = () => setTheme(p => (p === 'light' ? 'dark' : 'light'));
    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, useTheme, ThemeProvider };
