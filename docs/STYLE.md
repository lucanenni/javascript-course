# Stile "Field Guide" — guida d'uso

Guida per riprodurre e applicare l'estetica visiva di questo progetto in altre
sessioni / altri file. È autosufficiente: la sezione **Quick start** basta per
partire da zero in una pagina nuova.

Origine: adattamento di un artifact z.ai ("visual field guide" di calculus).
L'idea: un **manuale scientifico inciso** — carta millimetrata, inchiostro blu
notte, un accento ruggine, tipografia da frontespizio. Niente ombre morbide,
niente angoli arrotondati, niente gradienti: solo linee da 1px, spigoli vivi e
molto spazio bianco (anzi, spazio *carta*).

---

## 1. Principi (i "must", in ordine di importanza)

1. **Zero `border-radius`.** Ogni riquadro, bottone, pill, badge è rettangolare.
2. **Bordi da 1px, mai ombre.** La gerarchia si fa con il peso del bordo
   (`--border-color` sottile vs `--border-strong` pieno), non con `box-shadow`.
3. **Tre caratteri, tre ruoli fissi** (mai mescolarli a caso):
   - **Space Grotesk** → display e UI: titoli, bottoni, nav, pill. Tracking stretto.
   - **Newsreader** (serif) → prosa lunga, sottotitoli, testo da leggere. Corsivo per i sottotitoli.
   - **JetBrains Mono** → etichette, metadati, numeri, codice. SEMPRE `UPPERCASE` + `letter-spacing`.
4. **L'occhiello mono.** Ogni sezione si apre con un'etichetta mono maiuscola
   preceduta da un trattino di 28px (`.eyebrow`). È la firma dello stile.
5. **Reticolo millimetrato** fisso dietro tutto il contenuto (`body::before`).
6. **Light-first.** Il tema scuro è la variante "blueprint notturno" e si ottiene
   solo ridefinendo i token dentro `.dark` — nessun colore hard-coded nei componenti.
7. **Un solo accento** (ruggine). Il verde è secondario (successo/OK). Rosso solo per errori.

---

## 2. Quick start (pagina nuova, senza build)

Incolla questo in `<head>`. Usa i Google Fonts via `<link>`; per l'offline vedi §7.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root {
  --paper:#F5EEDC; --paper-white:#FCF9EF; --paper-warm:#EDE3C9;
  --ink:#0B2545; --ink-2:#1A3A5C;
  --bg-primary:var(--paper); --bg-secondary:var(--paper-white); --bg-tertiary:var(--paper-warm);
  --text-primary:var(--ink); --text-secondary:rgba(11,37,69,.62); --text-faint:rgba(11,37,69,.38);
  --border-color:rgba(11,37,69,.30); --border-strong:var(--ink);
  --code-bg:var(--paper-white);
  --accent:#D75C2A; --accent-strong:#A8421A; --accent-text:#A8421A; --accent-soft:rgba(215,92,42,.14);
  --ok:#1F5840; --ok-bright:#2A7553; --err:#B23A2E;
  --grid:rgba(11,37,69,.055); --grid-size:26px;
}
:root.dark {
  --paper:#0B1E33; --paper-white:#0F2740; --paper-warm:#16324F;
  --ink:#F0E9D6; --ink-2:#D9CFB6;
  --text-secondary:rgba(240,233,214,.62); --text-faint:rgba(240,233,214,.38);
  --border-color:rgba(240,233,214,.26); --border-strong:rgba(240,233,214,.85);
  --code-bg:#0C1F36;
  --accent:#E8743A; --accent-strong:#F0975E; --accent-text:#F0975E; --accent-soft:rgba(232,116,58,.16);
  --ok:#3A9572; --ok-bright:#3A9572; --err:#E8877A;
  --grid:rgba(240,233,214,.05);
}
*{box-sizing:border-box}
body{
  margin:0; background:var(--bg-primary); color:var(--text-primary);
  font-family:'Space Grotesk','system-ui',sans-serif;
  transition:background-color .3s ease,color .3s ease;
}
body::before{
  content:''; position:fixed; inset:0; z-index:0; pointer-events:none;
  background-image:
    linear-gradient(var(--grid) 1px,transparent 1px),
    linear-gradient(90deg,var(--grid) 1px,transparent 1px);
  background-size:var(--grid-size) var(--grid-size);
}
main{position:relative; z-index:1}          /* il contenuto sopra il reticolo */
a{color:var(--accent-text); text-underline-offset:3px}
:focus-visible{outline:2px solid var(--accent-text); outline-offset:2px}

/* primitivi — vedi §5 per il markup */
.eyebrow{font-family:'JetBrains Mono',monospace; font-size:11px;
  text-transform:uppercase; letter-spacing:.16em; color:var(--text-secondary);
  display:flex; align-items:center; gap:12px}
.eyebrow::before{content:''; width:28px; height:1px; background:currentColor; flex:none}

.pill{font-family:'Space Grotesk',sans-serif; font-size:10.5px; font-weight:500;
  text-transform:uppercase; letter-spacing:.13em; padding:5px 12px;
  border:1px solid var(--border-strong); display:inline-flex; align-items:center; gap:8px; white-space:nowrap}
.pill .dot{width:6px; height:6px; border-radius:50%; background:var(--ink); flex:none}
.pill.accent{border-color:var(--accent); color:var(--accent-text)} .pill.accent .dot{background:var(--accent)}
.pill.ok{border-color:var(--ok-bright); color:var(--ok)} .pill.ok .dot{background:var(--ok-bright)}

.frame{position:relative; border:1px solid var(--border-strong); background:var(--bg-secondary)}
.frame::before,.frame::after{content:''; position:absolute; width:10px; height:10px; border:1px solid var(--border-strong)}
.frame::before{top:-4px; left:-4px; border-right:none; border-bottom:none}
.frame::after{bottom:-4px; right:-4px; border-left:none; border-top:none}

.btn-line,.btn-solid{font-family:'Space Grotesk',sans-serif; font-size:11px; font-weight:500;
  text-transform:uppercase; letter-spacing:.12em; padding:9px 16px; border:1px solid var(--border-strong);
  display:inline-flex; align-items:center; gap:8px; cursor:pointer;
  transition:background .18s,color .18s,border-color .18s}
.btn-line{background:transparent; color:var(--text-primary)}
.btn-line:hover{background:var(--ink); color:var(--paper)}
.btn-solid{background:var(--accent); border-color:var(--accent); color:#FCF9EF}
.btn-solid:hover{background:var(--accent-strong); border-color:var(--accent-strong)}
</style>
```

E per il tema, prima di qualsiasi render (evita il flash):

```html
<script>
(function(){try{
  var t = localStorage.getItem('theme');
  if(!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  if(t === 'dark') document.documentElement.classList.add('dark');
}catch(e){}})();
</script>
```

---

## 3. Token (tabella di riferimento)

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--paper` / `--bg-primary` | `#F5EEDC` | `#0B1E33` | fondo pagina |
| `--paper-white` / `--bg-secondary` | `#FCF9EF` | `#0F2740` | fondo di card e riquadri |
| `--paper-warm` / `--bg-tertiary` | `#EDE3C9` | `#16324F` | barre header, `code` inline, hover |
| `--ink` / `--text-primary` / `--border-strong` | `#0B2545` | `#F0E9D6` / `rgba(...,.85)` | testo, bordi pieni |
| `--ink-2` | `#1A3A5C` | `#D9CFB6` | sottotitoli, testo enfatico |
| `--text-secondary` | `rgba(ink,.62)` | `rgba(ink,.62)` | metadati, label |
| `--text-faint` | `rgba(ink,.38)` | `rgba(ink,.38)` | placeholder, numeri disattivi |
| `--border-color` | `rgba(ink,.30)` | `rgba(ink,.26)` | divisori sottili |
| `--accent` | `#D75C2A` | `#E8743A` | **sfondi** ruggine (bottoni, tacche) |
| `--accent-text` | `#A8421A` | `#F0975E` | **testo/link** ruggine (contrasto AA) |
| `--accent-soft` | `rgba(rust,.14)` | `rgba(rust,.16)` | hover tenue, fondo "prossimo" |
| `--ok` / `--ok-bright` | `#1F5840` / `#2A7553` | `#3A9572` | successo, "risolto" |
| `--err` | `#B23A2E` | `#E8877A` | errori |
| `--grid` | `rgba(ink,.055)` | `rgba(ink,.05)` | linee del reticolo |

**Regola d'oro:** `--accent` per riempire, `--accent-text` per scrivere. Non
usare mai `--accent` come colore di testo su `--paper` (contrasto insufficiente).

---

## 4. Tipografia

| Ruolo | Font | Impostazioni tipiche |
|---|---|---|
| Titolo hero | Space Grotesk | `font-weight:700`, `letter-spacing:-0.04em`, `line-height:0.9`, `clamp(3rem, 9vw, 5.5rem)` |
| Titolo sezione / `h1` pagina | Space Grotesk | `font-weight:500`, `letter-spacing:-0.03em`, `clamp(2.1rem, 5.5vw, 3.2rem)` |
| `h2` / `h3` nella prosa | Space Grotesk | `font-weight:500`, `letter-spacing:-0.02em`; `h2` con tacca ruggine 30×2px sopra |
| Prosa | Newsreader | `1.06rem`, `line-height:1.72` |
| Sottotitolo / epigrafe | Newsreader **italic** | `var(--ink-2)`, `clamp(1.15rem, 2.4vw, 1.6rem)` |
| Occhiello, label, metadati | JetBrains Mono | `11px`, `UPPERCASE`, `letter-spacing:0.12–0.16em`, `var(--text-secondary)` |
| Codice inline | JetBrains Mono | `0.84em`, fondo `--paper-warm`, bordo 1px, testo `--accent-text` |
| Numeri di lista/capitolo | JetBrains Mono | `tabular-nums`, spesso `String(n).padStart(2,'0')` → `00`, `01`, … |

Un titolo può mescolare i due caratteri per contrasto: parola principale in
Space Grotesk bold, seconda parola in **Newsreader italic color `--accent`**
(es. "JavaScript *da zero*").

---

## 5. Primitivi — markup

### `.eyebrow` — apri ogni sezione così
```html
<div class="eyebrow">Corso interattivo · JavaScript</div>
```

### `.pill` — tag di stato/attributo
```html
<span class="pill"><span class="dot"></span>10 capitoli</span>
<span class="pill accent"><span class="dot"></span>esercizi verificati</span>
<span class="pill ok"><span class="dot"></span>risolto</span>
```

### `.frame` — la card con le squadrette agli angoli
```html
<div class="frame" style="padding:1.5rem">…</div>
```
Le squadrette sporgono di 4px: **non mettere `overflow:hidden`** sul `.frame`
(taglierebbe gli angoli). Va bene su un contenitore esterno con margine ≥ 8px.

### `.btn-line` / `.btn-solid`
```html
<button class="btn-line">Da rivedere</button>
<button class="btn-solid">Completato <svg …/></button>
```
`.btn-line` inverte i colori all'hover (fondo inchiostro, testo carta).
`.btn-solid` è ruggine pieno. Varianti locali con `style="border-color:var(--err); color:var(--err)"`.

### Divisori e liste "da indice"
Elenco di voci: niente card per riga, ma righe con `border-bottom: 1px solid
var(--border-color)`, numero mono a sinistra, titolo Space Grotesk, descrizione
Newsreader. Hover: `background: var(--bg-tertiary)`.

---

## 6. Pattern per costruire nuovi componenti

**Card / pannello** → `.frame` + padding. Header interno opzionale: barra con
`background:var(--bg-tertiary)`, `border-bottom:1px solid var(--border-color)`,
testo `.eyebrow`-like (mono, uppercase).

**Barra di avanzamento** → traccia `height:3–4px; background:var(--border-color)`;
riempimento `position:absolute; inset-y:0; left:0; background:var(--accent)`.
Niente `border-radius`. Percentuale accanto in mono: `00%`, `28%`.

**Callout / nota** → riquadro `border:1px solid var(--border-strong)`, fondo
`--bg-secondary`; in alto una riga: quadratino 9×9px colorato + label mono
uppercase; corpo in Newsreader. Colore per variante: info→`--ink-2`,
tip→`--ok-bright`, warning→`--accent`, analogy→`--accent-text`.

**Pannello di codice** → `.frame` con `background:var(--code-bg)`; header mono
(`nome-file.js` · stato · azione); nell'output il prompt `>` in `--accent`;
riga d'errore in `--err`. Editor CodeMirror: sfondo uniformato a `--code-bg`
(vedi §8), colori della sintassi lasciati al tema `neat`/`dracula`.

**Modale** → overlay `background: color-mix(in srgb, var(--ink) 30%, transparent)`;
dialog = `.frame` con padding generoso, `.eyebrow` come titolo, bottoni in fondo.

**Nav** → `position:sticky; top:0`; fondo
`color-mix(in srgb, var(--bg-primary) 82%, transparent)` + `backdrop-filter:blur(10px)`;
`border-bottom:1px solid var(--border-strong)`. Brand: un glifo (`ƒ`, `∫`, `{ }`)
in `--accent` + wordmark mono uppercase.

**Ritmo verticale** → sezioni con padding `~120px` sopra, separate da
`border-top:1px solid var(--border-color)`. Contenitore centrale
`max-width: 64–80rem`, padding orizzontale `2rem`.

---

## 7. Font: offline (vendorizzati) vs CDN

**CDN (semplice):** il `<link>` di Quick start. Degrada su font di sistema se
la rete manca (metti sempre fallback: `system-ui` / `Georgia` / `monospace`).

**Offline (come in questo repo):** variable font di `@fontsource-variable/*`,
solo subset `latin`, inlineati come data-URI da esbuild.

```bash
npm i @fontsource-variable/space-grotesk @fontsource-variable/newsreader @fontsource-variable/jetbrains-mono
```

`src/fonts.css` — un `@font-face` per faccia, puntando al singolo `.woff2` del
subset latin (es. `.../files/space-grotesk-latin-wght-normal.woff2`); copiare
`unicode-range` dal css del pacchetto. In esbuild:

```js
loader: { '.woff2': 'dataurl' }
```

Le famiglie si chiamano `'Space Grotesk Variable'`, `'Newsreader Variable'`,
`'JetBrains Mono Variable'` — mettile prime nello stack, poi il nome non-variable,
poi il fallback di sistema.

---

## 8. Dark mode — il contratto

- Il tema si commuta con la classe `dark` su `<html>` (`document.documentElement`).
- **Tutti** i colori dei componenti passano da `var(--*)`. Un componente non
  deve mai sapere quale tema è attivo. Se ti serve un colore che non c'è,
  aggiungi un token in **entrambi** i blocchi `:root` e `.dark`.
- `body { transition: background-color .3s }` è voluto (commutazione morbida).
  ⚠️ In debug: `getComputedStyle` durante quei 300ms restituisce valori
  intermedi — misura dopo `>350ms` o disattiva le transition.
- Persistenza: `localStorage['theme']` (`'light'`/`'dark'`); default =
  `prefers-color-scheme`. Lo script no-flash va in `<head>`, prima del CSS.
- CodeMirror: la specificità di `.cm-s-dracula.CodeMirror` batte `.CodeMirror`.
  Per uniformare lo sfondo dell'editor scrivi la regola su
  `.CodeMirror.cm-s-neat, .CodeMirror.cm-s-dracula { background: var(--code-bg) !important }`.

---

## 9. Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Bordi 1px, spigoli vivi | `border-radius`, `box-shadow`, glow |
| Label in JetBrains Mono UPPERCASE con `letter-spacing` | label in maiuscoletto o title-case |
| `--accent` per riempire, `--accent-text` per scrivere | testo `--accent` puro su `--paper` |
| Un accento ruggine, verde solo per "OK" | seconda tinta decorativa, accenti multipli |
| Numeri con `padStart(2,'0')` e `tabular-nums` | `1.`, `2.` non allineati |
| `.eyebrow` all'inizio di ogni sezione | titoli che partono "nudi" |
| Prosa in Newsreader, UI in Space Grotesk | prosa lunga in sans, bottoni in serif |
| Reticolo dietro il contenuto (`z-index` gestito) | reticolo sopra il testo, o assente |

---

## 10. Dove sta cosa (in questo repo)

| File | Contenuto |
|---|---|
| `src/custom.css` | token `:root` / `.dark`, reticolo, primitivi, `.prose-content`, CodeMirror |
| `tailwind.config.js` | mappa `font-sans` / `font-serif` / `font-mono` sui tre caratteri |
| `src/fonts.css` | `@font-face` variable font, subset latin |
| `src/ui/*.jsx` | i componenti usano `className` per i primitivi + `style={{…var(--*)}}` per i colori |
| `src/index.html` | script no-flash del tema |

I componenti React qui usano stili inline con `var(--*)` (perché passati come
prop calcolate). In un progetto nuovo va bene anche fare tutto con classi CSS:
i primitivi di §5 non dipendono da React.
