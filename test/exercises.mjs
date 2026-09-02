/**
 * Self-test degli esercizi (`npm test`).
 * Per ogni esercizio con `checks` verifica che:
 *   1. `solution` superi TUTTI i checks;
 *   2. `initialCode` NON li superi già tutti (altrimenti l'esercizio è banale).
 * Replica la stessa logica della sandbox del browser (codice + check IIFE
 * concatenati ed eseguiti nello stesso scope).
 */
import vm from 'node:vm';
import { EXERCISES } from '../src/content/exercises.js';

function makeDomShim() {
  const make = (id) => ({
    id, textContent: '', innerHTML: '', style: {}, _l: {},
    addEventListener(t, f) { (this._l[t] = this._l[t] || []).push(f); },
    removeEventListener() {},
    click() { (this._l.click || []).forEach((f) => f({ target: this, preventDefault() {} })); },
    appendChild() {}, setAttribute() {}, getAttribute() { return null; },
  });
  const els = { titolo: make('titolo'), btn: make('btn'), out: make('out') };
  return {
    getElementById: (id) => els[id] || null,
    querySelector: (s) => els[s.replace(/^#/, '')] || null,
    createElement: (tag) => make(tag),
    body: { appendChild() {} },
  };
}

function runHarness(code, checks, dom) {
  const sandbox = {
    console: { log() {}, info() {}, warn() {}, error() {}, debug() {} },
    JSON, Math, Array, Object, String, Number, Boolean, Date,
    parseInt, parseFloat, isNaN, isFinite,
  };
  if (dom) sandbox.document = makeDomShim();
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;

  let full = String(code) + '\n;';
  if (checks && checks.length) {
    full += 'window.__pgChecks=[' + checks.map((c) =>
      `(function(){try{return {label:${JSON.stringify(c.label)},pass:!!( ${c.assert} )};}` +
      `catch(e){return {label:${JSON.stringify(c.label)},pass:false,error:String((e&&e.message)||e)};}})()`
    ).join(',') + '];';
  }

  vm.createContext(sandbox);
  try {
    vm.runInContext(full, sandbox, { timeout: 1000 });
  } catch (e) {
    return { threw: (e && e.message) || String(e), results: [] };
  }
  return { threw: null, results: sandbox.__pgChecks || [] };
}

let fail = 0;
let n = 0;
for (const [id, ex] of Object.entries(EXERCISES)) {
  if (!ex.checks) { console.log(`  ·  ${id}  (senza checks)`); continue; }
  n += 1;

  if (!ex.solution) { fail += 1; console.log(`  ✗  ${id} — manca 'solution'`); continue; }

  const dom = ex.mode === 'dom';
  const sol = runHarness(ex.solution, ex.checks, dom);
  const init = runHarness(ex.initialCode, ex.checks, dom);

  const solPass = !sol.threw && sol.results.length === ex.checks.length && sol.results.every((r) => r.pass);
  const initAllPass = !init.threw && init.results.length === ex.checks.length && init.results.every((r) => r.pass);

  if (solPass && !initAllPass) {
    console.log(`  ✓  ${id}`);
  } else {
    fail += 1;
    console.log(`  ✗  ${id}`);
    if (sol.threw) console.log(`        soluzione ha lanciato: ${sol.threw}`);
    for (const r of sol.results) if (!r.pass) console.log(`        check fallito: ${r.label}${r.error ? ' — ' + r.error : ''}`);
    if (initAllPass) console.log('        initialCode supera già tutti i checks');
  }
}

console.log(fail ? `\n✗ ${fail}/${n} esercizi da sistemare` : `\n✓ ${n} esercizi OK`);
process.exit(fail ? 1 : 0);
