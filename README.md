# SOULSTICE

<img width="3072" height="384" alt="image" src="https://github.com/user-attachments/assets/ccf34d63-4214-4c69-8870-4d68ded4e166" />

A static, self-guided build of the SOULSTICE self-inquiry instrument for artists.
Runs entirely in the browser: no build step, no framework, no bundler, no external
requests. English only, and it works through Google&nbsp;Translate.

**Live:** <https://soulstice.pages.dev/>
&nbsp;·&nbsp; **Claude Code skill:** [`sinaida-space/soulstice-skill`](https://github.com/sinaida-space/soulstice-skill)

All six modes are here: Passage (the full inquiry, ending in a written Compass),
Journal, Lens, Ground, Statement, Return. Every answer stays in `localStorage` on
the one device; nothing is ever sent anywhere. Passage ends in a Compass you save
as a PDF, with a set of prompts for taking it into a language model to question
what you wrote.

## Run it locally

From the repository root:

```
python3 -m http.server 8765
```

Then open `http://localhost:8765/`. Serving over `file://` will not work because
ES module imports need HTTP.

The site is served from the repository root on GitHub&nbsp;Pages, so every asset
path stays relative and the app lives at `/soulstice/`.

## Layout

```
index.html          shell, red-rule frame, #screen mount node, <noscript>
css/tokens.css      custom properties, @font-face, Full / Light view roles
css/app.css         frame, cards, options, buttons, mode select, panels, output
css/chrome.css      header, footer, progress bar, welcome and standalone pages
css/backdrop.css    places the fixed galaxy + CRT canvas
css/print.css       @media print: hides chrome, prints the output doc only
fonts/              GeistPixel.woff2 (the one typeface)
js/store.js         localStorage state store (frozen contract)
js/card.js          card renderer + arc-break renderer (frozen contract)
js/app.js           hash router, consent gate, Passage flow, progress
js/chrome.js        persistent header + footer + Passage progress bar
js/welcome.js       welcome screen + consent record
js/pages.js         privacy & 404 views
js/backdrop.js      galaxy + CRT canvas renderer
js/dom.js           small internal DOM builder (not a contract)
js/output.js        Markdown assemblers for every mode + the output screen
js/llm.js           per-mode prompt kits shown under the finished document
js/modes/           ground.js, secondary.js (journal/lens/statement/return)
data/manifest.js    thin, merge-friendly list of Passage layer modules
data/layers/        Prologue + eleven layers, one file each, arc index files
tools/validate.mjs  node, no deps: checks ids, entries, next targets, headers
```

Run `node tools/validate.mjs` from the repository root after any data edit; it
exits non-zero on a broken `next` target, a duplicate card id, a missing `entry`,
or a `header` over twelve characters.

## The skill

SOULSTICE began as a Claude Code skill. That part now lives in its own repository:
[`sinaida-space/soulstice-skill`](https://github.com/sinaida-space/soulstice-skill).

## Data contract

The card object, layer module, `Store` API and router contract are unchanged from
the earlier `web/` layout. See the module headers in `js/store.js`, `js/card.js`
and `js/app.js`, which carry the frozen contracts verbatim.

## Google-Translate safety (hard requirement)

- `<html lang="en">`, semantic elements, real text nodes.
- JavaScript never reads `textContent` or `innerText` to decide state or route.
  Every branch keys off `data-*` attributes and off element references captured
  at render time.
- Re-rendering a card fully replaces its container subtree, so a text node
  mutated by Google Translate never feeds back into logic.
