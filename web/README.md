# Soulstice Web

Live: <https://sinaida-space.github.io/soulstice/> (the repository root redirects
to `web/`, so the app itself is served from `/soulstice/web/`).

## What this is

A static, self-guided version of the Soulstice skill: the same Prologue, eleven
layers and six modes, run as branching choice cards straight in the browser
instead of through Claude. It is English only and carries no translation of its
own, but every branch keys off `data-*` attributes rather than visible text, so
it works through Google Translate. There is no build step, no framework, no
bundler, no npm, no CDN and no external request; it is plain ES modules loaded
with `<script type="module">`, and every answer stays in `localStorage` on the
one device.

## Run it locally

From this `web/` directory:

```
python3 -m http.server 8765
```

Then open `http://localhost:8765/`. Serving over `file://` will not work because
ES module imports need HTTP.

On GitHub Pages the site lives at `/soulstice/web/`, so every asset path stays
relative.

## Layout

```
web/
  index.html          shell, red-rule frame, #screen mount node, <noscript>
  css/tokens.css      custom properties, @font-face, Full / Light view roles
  css/app.css         frame, cards, options, buttons, mode select, panels
  css/backdrop.css    places the fixed galaxy + CRT canvas
  css/print.css       @media print — hides chrome, prints the output doc only
  fonts/              GeistPixel.woff2 (the one typeface)
  js/store.js         localStorage state store (frozen contract)
  js/card.js          card renderer + arc-break renderer (frozen contract)
  js/app.js           hash router, Passage flow, ground toggle
  js/dom.js           small internal DOM builder (not a contract)
  js/output.js        Markdown assemblers for every mode + the output screen
  js/modes/           ground.js, secondary.js (journal/lens/statement/return)
  js/output.test.html standalone harness for the output assemblers
  data/manifest.js    thin, merge-friendly list of Passage layer modules
  data/layers/        Prologue + eleven layers, one file each, arc index files
  data/ground.js data/lens.js data/statement.js data/journal.js data/return.js data/workbook.js
  tools/validate.mjs  node, no deps: checks ids, entries, next targets, headers
```

Run `node tools/validate.mjs` from `web/` after any data edit; it exits non-zero
on a broken `next` target, a duplicate card id, a missing `entry`, or a `header`
over twelve characters.

## Data contract (frozen — later milestones depend on it verbatim)

### Card object

```js
{
  id: "prologue-c1",
  kind: "single" | "multi" | "open",
  question: "One sentence, second person.",
  header: "Known for",          // <= 12 chars, shown as a pixel-face label
  note: "",                     // optional line under the question
  options: [ { id: "a", label: "…", desc: "…" } ],   // omit for kind "open"
  multiSelectHint: false,
  next: {
    "a": "prologue-c2",         // per option id (single)
    "_other": "prologue-c2",    // submitted via Other
    "_default": "prologue-c2",  // fallback / multi + open
    "_end": true                // OR: this card ends the layer
  }
}
```

`next` values are a card id in the same layer, `{ "_end": true }`, or the
string `"_arc-break"` (Passage only).

### Layer / section module

```js
export default {
  key: "fear",
  title: "Fear",
  arc: 1,                       // 1 | 2 | 3 for Passage; null otherwise
  intro: "",
  entry: "fear-c1",
  cards: { "fear-c1": { /* card object */ } }
}
```

`data/manifest.js` imports every module and exports ordered arrays
(`passageLayers`, and siblings added later).

### Store (`js/store.js`)

```js
Store.load(mode)        // -> state object (fresh if none saved)
Store.save(mode, state)
Store.reset(mode)
Store.listSaved()       // -> [{ mode, updatedAt, cursorLabel }]
Store.listCompasses()   // -> [{ date, key }]   (namespace reserved for M4)
```

State shape:

```js
{
  mode: "passage",
  version: 1,
  startedAt: 0,
  updatedAt: 0,
  cursor: { section: "fear", card: "fear-c2a" } | { done: true } | null,
  answers: {
    "fear-c1": { picks: ["a"], other: "", at: 0 },
    "field-works": { text: "…", at: 0 }
  },
  arcBreaks: { "1": { struck: [], choice: "continue" } },
  completed: ["prologue", "fear"]
}
```

localStorage keys: `soulstice:v1:passage`, `:journal`, `:lens`, `:ground`,
`:statement`, `:return`, plus `soulstice:v1:compass:<date>` for stored Compass
docs (written by M4). The chalk/void display toggle uses its own key,
`soulstice:v1:ui:ground`, so it does not collide with the Ground mode session.

Every localStorage access is wrapped in `try/catch`. A blocked store degrades to
an in-memory map and shows a one-line non-blocking notice.

### Card renderer (`js/card.js`)

```js
renderCard(cardObject, savedAnswer | null, { onSubmit })
// onSubmit(answer): { picks: [...], other: "" }  for single | multi
//                   { text: "" }                 for open

renderArcBreak(findings, onDone)
// onDone({ struck: [...ids], choice: "continue" | "break" | "stop" })
```

### Router (`js/app.js`)

Hash routes: `#/`, `#/passage`, `#/journal`, `#/lens`, `#/ground`,
`#/statement`, `#/return`. Non-Passage modes render a later-milestone stub;
their routes and storage namespaces already exist.

Advancing a card:
`target = card.next[pickId] ?? card.next._other ?? card.next._default`.
`"_arc-break"` shows the between-arc break screen. `next._end === true` marks
the layer complete and moves to the next layer in the mode's manifest array.
No next layer yields `{ done: true }` and the "session complete" stub.

## Google-Translate safety (hard requirement)

- `<html lang="en">`, semantic elements, real text nodes.
- JavaScript never reads `textContent` or `innerText` to decide state or route.
  Every branch keys off `data-*` attributes (`data-card-id`, `data-opt-id`,
  `data-mode`, `data-finding-id`, `data-choice`) and off element references
  captured at render time.
- Re-rendering a card fully replaces its container subtree, so a text node
  mutated by Google Translate never feeds back into logic.
