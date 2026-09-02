const RUNNER_JS = `
(function () {
  var logs = [], MAX = 300;
  function fmt(v) {
    if (typeof v === 'string') return v;
    if (v === undefined) return 'undefined';
    if (v === null) return 'null';
    if (typeof v === 'function') return '[Function' + (v.name ? ': ' + v.name : '') + ']';
    if (typeof v === 'bigint') return v.toString() + 'n';
    try { return JSON.stringify(v, null, 2); } catch (e) { return String(v); }
  }
  function add(level, args) {
    if (logs.length < MAX) logs.push({ level: level, text: Array.prototype.map.call(args, fmt).join(' ') });
    else if (logs.length === MAX) logs.push({ level: 'warn', text: '… output troncato (troppe righe)' });
  }
  var C = window.console || {};
  C.log = function () { add('log', arguments); };
  C.info = function () { add('log', arguments); };
  C.debug = function () { add('log', arguments); };
  C.warn = function () { add('warn', arguments); };
  C.error = function () { add('error', arguments); };
  window.console = C;
  function send(status, checks) {
    parent.postMessage({ __pg: true, type: 'result', status: status, logs: logs, checks: checks || null }, '*');
  }
  window.onerror = function (msg) { add('error', [msg]); send('error', null); return true; };
  window.addEventListener('message', function (e) {
    var d = e.data;
    if (!d || d.__pg !== 'run') return;
    var full = String(d.code) + '\\n;';
    if (d.checks && d.checks.length) {
      var parts = [];
      for (var i = 0; i < d.checks.length; i++) {
var c = d.checks[i];
parts.push(
  '(function(){try{return {label:' + JSON.stringify(c.label) +
  ',pass:!!( ' + c.assert + ' )};}catch(err){return {label:' + JSON.stringify(c.label) +
  ',pass:false,error:String((err&&err.message)||err)};}})()'
);
      }
      full += 'window.__pgChecks=[' + parts.join(',') + '];';
    }
    try {
      (0, eval)(full);
      send('ok', window.__pgChecks || null);
    } catch (err) {
      add('error', [(err && err.message) || String(err)]);
      send('error', null);
    }
  });
  parent.postMessage({ __pg: true, type: 'ready' }, '*');
})();
`;

const runnerHTML = (bodyHTML) =>
    '<!doctype html><html><head><meta charset="utf-8"><style>' +
    'body{font:14px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;margin:0;padding:14px;color:#0f172a;background:#fff}' +
    'h1{font-size:20px;margin:.2em 0}h2{font-size:17px}' +
    'button{font:inherit;padding:6px 12px;border:1px solid #cbd5e1;border-radius:6px;background:#f1f5f9;cursor:pointer}' +
    'ul{padding-left:20px}' +
    '</style></head><body>' + (bodyHTML || '') +
    '<' + 'script>' + RUNNER_JS + '<' + '/script></body></html>';

const DOM_STARTER_BODY = `
<h1 id="titolo">Titolo iniziale</h1>
<button id="btn" type="button">Cliccami</button>
<p id="out" style="min-height:1.4em;color:#047857;font-weight:600"></p>
`;

export { RUNNER_JS, runnerHTML, DOM_STARTER_BODY };
