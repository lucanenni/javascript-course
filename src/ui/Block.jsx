import React from 'react';
import { Callout } from './Callout.jsx';
import { DiffWidget } from './DiffWidget.jsx';
import { Playground } from './Playground.jsx';

const Block = ({ block, onSolved }) => {
    switch (block.type) {
        case 'h2': return <h2 id={block.id}>{block.text}</h2>;
        case 'h3': return <h3 id={block.id}>{block.text}</h3>;
        case 'p': return <p dangerouslySetInnerHTML={{ __html: block.html }} />;
        case 'ul': return <ul>{block.items.map((it, i) => <li key={i} dangerouslySetInnerHTML={{ __html: it }} />)}</ul>;
        case 'ol': return <ol>{block.items.map((it, i) => <li key={i} dangerouslySetInnerHTML={{ __html: it }} />)}</ol>;
        case 'callout': return <Callout variant={block.variant} title={block.title} html={block.html} />;
        case 'diff': return <DiffWidget label={block.label} before={block.before} after={block.after} />;
        case 'play': return (
            <Playground id={block.id} initialCode={block.initialCode} mode={block.mode}
                        checks={block.checks} hint={block.hint}
                        onSolved={() => onSolved && onSolved(block.id)} />
        );
        default: return null;
    }
};

export { Block };
