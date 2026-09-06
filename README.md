# JavaScript da Zero

Corso interattivo di JavaScript in una singola pagina. 10 capitoli, playground
eseguiti in una sandbox `<iframe>`, esercizi verificati automaticamente,
progressi salvati in `localStorage`, routing per capitoli linkabili.

## Come si usa il corso

Apri **`CorsoJS.html`** in un browser. È un **file unico e autonomo**: font, CSS
e JavaScript sono tutti inlineati, **nessuna risorsa esterna**, funziona offline e
da `file://`.

## Sviluppo

`CorsoJS.html` è **generato**: si modificano i sorgenti in `src/` e si ricompila.

```bash
npm install
npm test      # self-test degli esercizi
npm run build # genera CorsoJS.html  (esegue prima npm test)
npm run dev   # watch + server con live-reload su http://localhost:5173
```

### Struttura

```
src/
  index.html            Template. Segnaposto /*__CSS__*/ e //__APP__ riempiti dal build.
  main.jsx              Entry: importa CSS/font, monta <App>.
  fonts.css            @font-face dei variable font (subset latin, inlineati come data-URI).
  custom.css           CSS non-Tailwind (variabili tema, .CodeMirror, .prose-content, animazioni).
  tailwind.css         Le 3 direttive @tailwind.
  lib/
    router.js          Hash routing (#/capitolo/N), useRoute + navigate.
    theme.jsx          ThemeProvider / useTheme (persiste, rispetta prefers-color-scheme).
    progress.js        useCourseProgress (localStorage).
    audio.js           Chime di completamento.
    sandbox.js         RUNNER_JS + runnerHTML: l'HTML dell'iframe che esegue il codice.
    scrollspy.js       useScrollSpy per evidenziare la voce dell'indice.
  ui/
    App, Navbar, Dashboard, ChapterView, Celebration, ErrorBoundary
    Playground.jsx     Editor CodeMirror + esecuzione in iframe + checks.
    Block.jsx          Rende un blocco di contenuto (h2/p/ul/callout/diff/play).
    Callout, DiffWidget, Icon
  content/
    ch00.md … ch09.md  PROSA dei capitoli, in Markdown.
    exercises.js       Esercizi: initialCode, checks, hint, solution.
    parse.mjs          Markdown -> blocchi (usato solo a build time).
build.mjs              Tailwind CLI + esbuild -> CorsoJS.html.
test/exercises.mjs     Verifica che ogni solution superi i checks e initialCode no.
```

### Scrivere i contenuti

**Prosa** → `src/content/chNN.md`. Markdown normale; `<` `>` `&` sono letterali
(niente escaping). Sintassi extra:

| Sintassi | Effetto |
|---|---|
| `## Titolo` | heading (id = slug, usato dall'indice) |
| `` `code` `` `**bold**` `_corsivo_` `[testo](url)` | inline |
| `::: tip Titolo` … `:::` | callout (`info` \| `tip` \| `warning` \| `analogy`) |
| `::: exercise c2-es` | inserisce l'esercizio con quell'id |
| ` ```diff-demo Etichetta ` … `@@@` … ` ``` ` | blocco prima/dopo |

**Esercizi** → `src/content/exercises.js`. Ogni voce:

```js
'c2-es': {
  mode: 'dom',              // opzionale: mostra una mini-pagina invece della console
  initialCode: `...`,        // template literal, nessun escaping
  solution:    `...`,        // una risposta corretta (serve al self-test)
  checks: [ { label: '...', assert: "espressione JS booleana" } ],
  hint: '...',
}
```

`assert` è valutata nello stesso scope del codice dello studente. Quando tutti i
checks di tutti gli esercizi di un capitolo passano, il capitolo si completa da
solo.

Dopo ogni modifica: `npm run build` (o tienilo aperto con `npm run dev`).

## Aspetto

Estetica "field guide" incisa: fondo carta (parchment), inchiostro blu notte,
accenti ruggine e verde, reticolo millimetrato di sfondo, nessun angolo
arrotondato. Tema chiaro di default; il tema scuro è la variante "blueprint
notturno" (toggle in alto a destra, rispetta `prefers-color-scheme`).

I token (colori, radius) stanno in `src/custom.css` (`:root` e `.dark`); i
caratteri in `tailwind.config.js` + `src/fonts.css`. Primitivi riutilizzabili
in `custom.css`: `.eyebrow`, `.pill`, `.frame` (cornice con squadrette),
`.btn-line` / `.btn-solid`.

**Guida completa allo stile (per riusarlo altrove): [`docs/STYLE.md`](docs/STYLE.md).**

## Note tecniche

- React 18.3.1, ReactDOM e CodeMirror 5 sono **impacchettati** nel file (~670 KB).
- Font: variable font **Space Grotesk** (display/UI) · **Newsreader** (prosa serif)
  · **JetBrains Mono** (codice/etichette), solo subset latino, inlineati come data-URI.
- Il codice dello studente gira in un `<iframe sandbox="allow-scripts">` usa e
  getta, con watchdog di 2 s lato pagina contro i cicli infiniti.
