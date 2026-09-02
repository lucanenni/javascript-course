// Esercizi dei capitoli.
//
// - initialCode / solution: template literal, nessun escaping.
// - checks[].assert: espressione JS valutata NELLO STESSO scope del codice
//   dello studente (quindi può leggere le sue variabili/funzioni).
// - solution: una risposta corretta. Serve al self-test (`npm test`) che
//   verifica che la soluzione superi tutti i checks e che initialCode NON li
//   superi già tutti.
// - mode: "dom" -> il playground mostra una mini-pagina invece della sola console.

export const EXERCISES = {

  'c0-prova': {
    initialCode: `// Le righe che iniziano con // sono commenti: il computer le ignora.
// Servono a te per prendere appunti nel codice.

console.log("Il mio primo programma");
console.log("2 + 2 fa", 2 + 2);

// Ora prova a sbagliare di proposito: scrivi la riga qui sotto
// senza le virgolette e guarda che errore compare a destra.
// console.log(ciao)
`,
  },

  'c1-hello': {
    initialCode: `console.log("Ciao, mondo!");
console.log("Sto imparando JavaScript.");

// Aggiungi qui sotto una riga che stampa il tuo nome
// e una che stampa il risultato di 10 * 10
`,
  },

  'c2-es': {
    initialCode: `// Metti la tua città (tra virgolette) e il tuo anno di nascita (numero)
const citta = "";
let annoNascita = 0;

console.log("Vivo a " + citta + ", sono del " + annoNascita);
`,
    solution: `const citta = "Torino";
let annoNascita = 1998;

console.log("Vivo a " + citta + ", sono del " + annoNascita);
`,
    checks: [
      { label: "Esiste una stringa non vuota chiamata 'citta'", assert: "typeof citta === 'string' && citta.length > 0" },
      { label: "Esiste un numero chiamato 'annoNascita' diverso da 0", assert: "typeof annoNascita === 'number' && annoNascita !== 0" },
    ],
    hint: 'Le virgolette servono solo per il testo: <code>const citta = "Torino";</code>. Il numero va senza virgolette: <code>let annoNascita = 1998;</code>.',
  },

  'c3-es': {
    initialCode: `const base = 8;
const altezza = 5;

// 1. Calcola l'area (base per altezza)
const area = 0;

// 2. true se l'area è maggiore di 30, altrimenti false
const grande = false;

console.log("Area:", area, "- Grande?", grande);
`,
    solution: `const base = 8;
const altezza = 5;

const area = base * altezza;
const grande = area > 30;

console.log("Area:", area, "- Grande?", grande);
`,
    checks: [
      { label: "'area' vale 40", assert: "area === 40" },
      { label: "'grande' è true (40 > 30)", assert: "grande === true" },
    ],
    hint: "Per l'area: <code>const area = base * altezza;</code>. Per il confronto puoi scrivere direttamente <code>const grande = area &gt; 30;</code> — il risultato è già un booleano.",
  },

  'c4-es': {
    initialCode: `let voto = 9;
let giudizio = "";

// Scrivi qui la catena if / else if / else che assegna 'giudizio'


console.log("Voto", voto, "->", giudizio);
`,
    solution: `let voto = 9;
let giudizio = "";

if (voto >= 8) {
  giudizio = "ottimo";
} else if (voto >= 6) {
  giudizio = "sufficiente";
} else {
  giudizio = "insufficiente";
}

console.log("Voto", voto, "->", giudizio);
`,
    checks: [
      { label: "'giudizio' è una stringa non vuota", assert: "typeof giudizio === 'string' && giudizio.length > 0" },
      { label: 'Con voto 9, \'giudizio\' vale "ottimo"', assert: "giudizio === 'ottimo'" },
    ],
    hint: '<code>if (voto &gt;= 8) { giudizio = "ottimo"; } else if (voto &gt;= 6) { giudizio = "sufficiente"; } else { giudizio = "insufficiente"; }</code>',
  },

  'c5-es': {
    initialCode: `// 1. Crea 'spesa' con almeno 3 prodotti (stringhe)
const spesa = [];

// 2. Aggiungi "pane" in fondo all'array


// 3. Salva in 'totale' quanti prodotti ci sono adesso
const totale = 0;

console.log(spesa, "->", totale, "prodotti");
`,
    solution: `const spesa = ["latte", "uova", "mele"];

spesa.push("pane");

const totale = spesa.length;

console.log(spesa, "->", totale, "prodotti");
`,
    checks: [
      { label: "'spesa' è un array con almeno 4 elementi", assert: "Array.isArray(spesa) && spesa.length >= 4" },
      { label: '\'spesa\' contiene "pane"', assert: "spesa.includes('pane')" },
      { label: "'totale' è uguale al numero di elementi", assert: "totale === spesa.length" },
    ],
    hint: 'Parti da <code>const spesa = ["latte", "uova", "mele"];</code>, poi <code>spesa.push("pane");</code>, poi <code>const totale = spesa.length;</code>.',
  },

  'c6-es1': {
    initialCode: `// Somma tutti i numeri da 1 a 100 usando un ciclo for
let somma = 0;

for (let i = 1; i <= 100; i++) {
  // aggiungi 'i' a 'somma'
}

console.log("Somma 1..100 =", somma);
`,
    solution: `let somma = 0;

for (let i = 1; i <= 100; i++) {
  somma += i;
}

console.log("Somma 1..100 =", somma);
`,
    checks: [
      { label: "'somma' vale 5050", assert: "somma === 5050" },
    ],
    hint: 'Dentro il ciclo: <code>somma += i;</code>',
  },

  'c6-es2': {
    initialCode: `const numeri = [4, 9, 15, 6, 2, 11, 8];
let quantiGrandi = 0;

// Scorri l'array con un for e conta quanti elementi sono > 7
for (let i = 0; i < numeri.length; i++) {

}

console.log(quantiGrandi, "numeri maggiori di 7");
`,
    solution: `const numeri = [4, 9, 15, 6, 2, 11, 8];
let quantiGrandi = 0;

for (let i = 0; i < numeri.length; i++) {
  if (numeri[i] > 7) {
    quantiGrandi++;
  }
}

console.log(quantiGrandi, "numeri maggiori di 7");
`,
    checks: [
      { label: "'quantiGrandi' vale 4", assert: "quantiGrandi === 4" },
    ],
    hint: 'Dentro il ciclo: <code>if (numeri[i] &gt; 7) { quantiGrandi++; }</code>. I numeri &gt; 7 sono 9, 15, 11, 8.',
  },

  'c7-es1': {
    initialCode: `const libro = {
  titolo: "",
  autore: "",
  anno: 0
};

// 1. Compila titolo e autore con un libro che conosci
// 2. Cambia 'anno' a 2020 usando la notazione con il punto
// 3. Componi in 'scheda' la frase:  "<titolo> di <autore>"
const scheda = "";

console.log(libro);
console.log(scheda);
`,
    solution: `const libro = {
  titolo: "Il nome della rosa",
  autore: "Umberto Eco",
  anno: 0
};

libro.anno = 2020;

const scheda = libro.titolo + " di " + libro.autore;

console.log(libro);
console.log(scheda);
`,
    checks: [
      { label: "'libro' ha titolo e autore non vuoti", assert: "libro.titolo.length > 0 && libro.autore.length > 0" },
      { label: "'libro.anno' vale 2020", assert: "libro.anno === 2020" },
      { label: "'scheda' contiene titolo e autore", assert: "scheda.includes(libro.titolo) && scheda.includes(libro.autore)" },
    ],
    hint: '<code>libro.anno = 2020;</code> e poi <code>const scheda = libro.titolo + " di " + libro.autore;</code>',
  },

  'c7-es2': {
    initialCode: `const studenti = [
  { nome: "Anna",  voto: 8 },
  { nome: "Berto", voto: 5 },
  { nome: "Carla", voto: 6 },
  { nome: "Dino",  voto: 4 }
];

// Riempi 'promossi' con i NOMI di chi ha voto >= 6
const promossi = [];

for (let i = 0; i < studenti.length; i++) {

}

console.log(promossi);
`,
    solution: `const studenti = [
  { nome: "Anna",  voto: 8 },
  { nome: "Berto", voto: 5 },
  { nome: "Carla", voto: 6 },
  { nome: "Dino",  voto: 4 }
];

const promossi = [];

for (let i = 0; i < studenti.length; i++) {
  if (studenti[i].voto >= 6) {
    promossi.push(studenti[i].nome);
  }
}

console.log(promossi);
`,
    checks: [
      { label: '\'promossi\' è esattamente ["Anna", "Carla"]', assert: "JSON.stringify(promossi) === JSON.stringify(['Anna','Carla'])" },
    ],
    hint: 'Dentro il ciclo: <code>if (studenti[i].voto &gt;= 6) { promossi.push(studenti[i].nome); }</code>',
  },

  'c8-es1': {
    initialCode: `// Scrivi la funzione moltiplica(a, b) che RESTITUISCE il prodotto
function moltiplica(a, b) {

}

console.log(moltiplica(6, 7));   // deve stampare 42
console.log(moltiplica(3, 0));   // deve stampare 0
`,
    solution: `function moltiplica(a, b) {
  return a * b;
}

console.log(moltiplica(6, 7));
console.log(moltiplica(3, 0));
`,
    checks: [
      { label: "moltiplica(6, 7) restituisce 42", assert: "moltiplica(6, 7) === 42" },
      { label: "moltiplica(3, 0) restituisce 0", assert: "moltiplica(3, 0) === 0" },
    ],
    hint: 'Dentro le graffe: <code>return a * b;</code>. Ricorda che serve <code>return</code>, non <code>console.log</code>.',
  },

  'c8-es2': {
    initialCode: `// Scrivi un'arrow function saluta(nome)
// che restituisce la stringa:  "Ciao, <nome>!"
const saluta = (nome) => {

};

console.log(saluta("Sara"));   // "Ciao, Sara!"
`,
    solution: `const saluta = (nome) => {
  return "Ciao, " + nome + "!";
};

console.log(saluta("Sara"));
`,
    checks: [
      { label: 'saluta("Sara") restituisce "Ciao, Sara!"', assert: "saluta('Sara') === 'Ciao, Sara!'" },
      { label: 'saluta("Lin") restituisce "Ciao, Lin!"', assert: "saluta('Lin') === 'Ciao, Lin!'" },
    ],
    hint: '<code>return "Ciao, " + nome + "!";</code>',
  },

  'c9-es': {
    mode: 'dom',
    initialCode: `// 1. Cambia il testo di #titolo in "Benvenuto"
const titolo = document.getElementById("titolo");


// 2. Quando si clicca #btn, scrivi "Hai cliccato!" dentro #out
const btn = document.getElementById("btn");

`,
    solution: `const titolo = document.getElementById("titolo");
titolo.textContent = "Benvenuto";

const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  document.getElementById("out").textContent = "Hai cliccato!";
});
`,
    checks: [
      { label: 'Il titolo ora dice "Benvenuto"', assert: "document.getElementById('titolo').textContent === 'Benvenuto'" },
      { label: 'Cliccando il pulsante compare "Hai cliccato!"', assert: "(function(){ document.getElementById('btn').click(); return document.getElementById('out').textContent.trim() === 'Hai cliccato!'; })()" },
    ],
    hint: '<code>titolo.textContent = "Benvenuto";</code> poi <code>btn.addEventListener("click", () =&gt; { document.getElementById("out").textContent = "Hai cliccato!"; });</code>',
  },

};
