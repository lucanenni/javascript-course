// Entry point. Il bundle finale viene inlineato in CorsoJS.html da build.mjs.
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/neat.css';
import './fonts.css';
import './custom.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './ui/App.jsx';

createRoot(document.getElementById('root')).render(<App />);
