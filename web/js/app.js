// Soulstice — app shell and router. FROZEN CONTRACT for routing (see issue #1).
//
// Hash routes: #/ (mode select), #/passage, #/journal, #/lens, #/ground,
//              #/statement, #/return
//
// Advancing a card:
//   target = card.next[pickId] ?? card.next._other ?? card.next._default
//   "_arc-break"      -> between-arc break screen (Passage)
//   next._end === true -> layer complete, move to next layer in the manifest array
//   no next layer      -> { done: true } -> "session complete" stub (M4 fills it)
//
// Google-Translate safety: routing and state read only data-* attributes and
// values captured by reference. Nothing here reads textContent/innerText.

import { Store } from "./store.js";
import { renderCard, renderArcBreak } from "./card.js";
import { el, setText } from "./dom.js";
import { passageLayers } from "../data/manifest.js";

const MODE_LAYERS = {
  passage: passageLayers
};

const MODE_META = [
  { id: "passage", label: "Passage", blurb: "The full inquiry, ending in a written Compass.", live: true },
  { id: "journal", label: "Journal", blurb: "A recurring practice, one layer at a time.", live: false },
  { id: "lens", label: "Lens", blurb: "A lens for diagnosing one specific work.", live: false },
  { id: "ground", label: "Ground", blurb: "For the moment the work feels worthless.", live: false },
  { id: "statement", label: "Statement", blurb: "An artist statement from what you have already said.", live: false },
  { id: "return", label: "Return", blurb: "Check an old Compass against what actually happened.", live: false }
];

const KNOWN_MODES = MODE_META.map(function (m) { return m.id; });

function labelFor(id) {
  const m = MODE_META.find(function (x) { return x.id === id; });
  return m ? m.label : id;
}

// ---- ground (chalk/void) toggle -------------------------------------------
// The design toggle needs its own key. soulstice:v1:ground is the Ground
// *mode* session namespace, so the display preference lives under
// soulstice:v1:ui:ground to avoid a collision.

const GROUND_KEY = "soulstice:v1:ui:ground";

function loadGround() {
  try {
    return window.localStorage.getItem(GROUND_KEY) === "void" ? "void" : "chalk";
  } catch (e) {
    return "chalk";
  }
}

function saveGround(value) {
  try {
    window.localStorage.setItem(GROUND_KEY, value);
  } catch (e) {
    // preference simply will not persist; not worth a notice
  }
}

function applyGround(value) {
  document.documentElement.setAttribute("data-ground", value);
  document.body.setAttribute("data-ground", value);
}

function initChrome() {
  applyGround(loadGround());
  const btn = document.querySelector('[data-role="ground-toggle"]');
  if (!btn) return;

  function paint() {
    const current = document.documentElement.getAttribute("data-ground") === "void" ? "void" : "chalk";
    const target = current === "void" ? "chalk" : "void";
    btn.setAttribute("data-ground-target", target);
    setText(btn, target === "void" ? "Dark ground" : "Light ground");
  }

  paint();
  btn.addEventListener("click", function () {
    const target = btn.getAttribute("data-ground-target") === "void" ? "void" : "chalk";
    applyGround(target);
    saveGround(target);
    paint();
  });
}

// ---- mount --------------------------------------------------------------

function screenNode() {
  return document.getElementById("screen");
}

function mount(node) {
  const host = screenNode();
  if (!host) return;
  host.replaceChildren(node);
  if (Store.isDegraded()) host.appendChild(degradedNotice());
}

function degradedNotice() {
  return el(
    "p",
    { class: "card__note", "data-role": "degraded-notice" },
    "This browser is blocking local storage, so this session will not survive a reload."
  );
}

// ---- routing ----------------------------------------------------------------

function router() {
  const raw = (window.location.hash || "#/").replace(/^#/, "");
  const parts = raw.split("/").filter(Boolean);
  const mode = parts[0] || "";

  if (!mode) return renderModeSelect();
  if (mode === "passage") return enterMode("passage");
  if (KNOWN_MODES.indexOf(mode) !== -1) return renderStub(mode);

  window.location.hash = "#/";
}

// ---- mode select ----------------------------------------------------------

function renderModeSelect() {
  const root = el("section", { class: "modeselect screen-panel", "data-role": "mode-select" });
  root.appendChild(el("h1", { class: "modeselect__title" }, "Soulstice"));
  root.appendChild(el("p", { class: "modeselect__sub" }, "A guided self-inquiry instrument for artists."));

  const saved = Store.listSaved();
  if (saved.length) {
    const list = el("ul", { class: "resume-list", "data-role": "resume-list" });
    for (const entry of saved) {
      const li = el("li", { class: "resume-list__item", "data-mode": entry.mode });
      const btn = el(
        "button",
        { class: "btn btn--ghost", type: "button", "data-mode": entry.mode },
        "Resume " + labelFor(entry.mode) + " · " + entry.cursorLabel
      );
      btn.addEventListener("click", function () {
        window.location.hash = "#/" + entry.mode;
      });
      li.appendChild(btn);
      list.appendChild(li);
    }
    root.appendChild(list);
  }

  const modes = el("ul", { class: "modes", "data-role": "modes" });
  for (const meta of MODE_META) {
    const li = el("li", { class: "mode", "data-mode": meta.id, "data-live": meta.live ? "1" : "0" });
    const btn = el("button", { class: "mode__btn", type: "button", "data-mode": meta.id });
    btn.appendChild(el("span", { class: "mode__name" }, meta.label));
    btn.appendChild(el("span", { class: "mode__blurb" }, meta.blurb));
    btn.addEventListener("click", function () {
      window.location.hash = "#/" + meta.id;
    });
    li.appendChild(btn);
    modes.appendChild(li);
  }
  root.appendChild(modes);

  mount(root);
}

// ---- non-Passage stubs --------------------------------------------------

function renderStub(mode) {
  const root = el("section", { class: "screen-panel stub", "data-role": "stub", "data-mode": mode });
  root.appendChild(el("span", { class: "card__label" }, "Later milestone"));
  root.appendChild(el("h1", { class: "card__q" }, labelFor(mode) + " is not built yet."));
  root.appendChild(el("p", { class: "card__note" }, "This mode arrives in a later milestone. Its route and its storage namespace already exist."));
  const home = el("button", { class: "btn btn--block", type: "button", "data-action": "home" }, "Back to start");
  home.addEventListener("click", goHome);
  root.appendChild(home);
  mount(root);
}

// ---- Passage flow -------------------------------------------------------

function enterMode(mode) {
  const layers = MODE_LAYERS[mode];
  if (!layers || !layers.length) return renderStub(mode);

  const state = Store.load(mode);
  const hasSession = state.cursor && (state.cursor.done || state.cursor.card);
  if (hasSession) {
    renderResume(mode, state);
  } else {
    startFresh(mode);
  }
}

function startFresh(mode) {
  Store.reset(mode);
  const state = Store.load(mode);
  const first = MODE_LAYERS[mode][0];
  state.cursor = { section: first.key, card: first.entry };
  Store.save(mode, state);
  renderCurrent(mode, state);
}

function renderResume(mode, state) {
  const root = el("section", { class: "screen-panel resume", "data-role": "resume" });
  root.appendChild(el("span", { class: "card__label" }, "Resume"));
  root.appendChild(el("h1", { class: "card__q" }, "You have a " + labelFor(mode) + " session in progress."));
  const where = state.cursor.done
    ? "It reached the end."
    : "Paused in " + state.cursor.section + ".";
  root.appendChild(el("p", { class: "card__note" }, where));

  const resume = el("button", { class: "btn btn--block", type: "button", "data-action": "resume" }, "Resume");
  resume.addEventListener("click", function () {
    renderCurrent(mode, Store.load(mode));
  });
  const over = el("button", { class: "btn btn--block btn--ghost", type: "button", "data-action": "startover" }, "Start over");
  over.addEventListener("click", function () {
    startFresh(mode);
  });

  root.appendChild(resume);
  root.appendChild(over);
  mount(root);
}

function findLayer(mode, key) {
  return MODE_LAYERS[mode].find(function (l) { return l.key === key; });
}

function renderCurrent(mode, state) {
  if (!state.cursor || state.cursor.done) return renderDone(mode, state);

  const layer = findLayer(mode, state.cursor.section);
  if (!layer) return renderDone(mode, state);
  const card = layer.cards[state.cursor.card];
  if (!card) return renderDone(mode, state);

  const saved = state.answers[card.id] || null;

  const node = renderCard(card, saved, {
    onSubmit: function (answer) {
      recordAnswer(state, card, answer);
      Store.save(mode, state);
      advance(mode, state, layer, card, answer);
    }
  });
  mount(node);
}

function recordAnswer(state, card, answer) {
  if (answer && typeof answer.text === "string") {
    state.answers[card.id] = { text: answer.text, at: Date.now() };
  } else {
    state.answers[card.id] = {
      picks: (answer.picks || []).slice(),
      other: answer.other || "",
      at: Date.now()
    };
  }
}

function resolveNext(card, answer) {
  const next = card.next || {};
  let pickId = null;
  if (answer && Array.isArray(answer.picks) && answer.picks.length === 1) {
    pickId = answer.picks[0];
  }

  let target = pickId != null ? next[pickId] : undefined;
  if (target === undefined) target = next._other;
  if (target === undefined) target = next._default;

  if (target === "_arc-break") return { arcBreak: true };
  if (typeof target === "string") return { card: target };
  if (next._end === true) return { end: true };
  return { end: true }; // nothing resolved: treat as end of layer
}

function advance(mode, state, layer, card, answer) {
  const step = resolveNext(card, answer);

  if (step.card) {
    state.cursor = { section: layer.key, card: step.card };
    Store.save(mode, state);
    return renderCurrent(mode, state);
  }

  if (step.arcBreak) {
    return enterArcBreak(mode, state, layer);
  }

  completeLayerAndAdvance(mode, state, layer);
}

function completeLayerAndAdvance(mode, state, layer) {
  if (state.completed.indexOf(layer.key) === -1) state.completed.push(layer.key);

  const layers = MODE_LAYERS[mode];
  const idx = layers.findIndex(function (l) { return l.key === layer.key; });
  const nextLayer = layers[idx + 1];

  if (nextLayer) {
    state.cursor = { section: nextLayer.key, card: nextLayer.entry };
    Store.save(mode, state);
    return renderCurrent(mode, state);
  }

  state.cursor = { done: true };
  Store.save(mode, state);
  renderDone(mode, state);
}

function enterArcBreak(mode, state, layer) {
  const arc = layer.arc || 1;
  // M0 placeholders. M1-M3 pass the arc's real findings.
  const findings = [
    { id: "f1", label: "Placeholder finding one for arc " + arc + "." },
    { id: "f2", label: "Placeholder finding two for arc " + arc + "." },
    { id: "f3", label: "Placeholder finding three for arc " + arc + "." }
  ];

  const node = renderArcBreak(findings, function (result) {
    state.arcBreaks[String(arc)] = { struck: result.struck, choice: result.choice };
    Store.save(mode, state);

    if (result.choice === "stop") {
      state.cursor = { done: true };
      Store.save(mode, state);
      return renderDone(mode, state);
    }
    completeLayerAndAdvance(mode, state, layer);
  });

  mount(node);
}

function renderDone(mode, state) {
  const root = el("section", { class: "screen-panel done", "data-role": "done" });
  root.appendChild(el("span", { class: "card__label" }, "Session complete"));
  root.appendChild(el("h1", { class: "card__q" }, "Session complete — output goes here."));
  root.appendChild(el("p", { class: "card__note" }, "A later milestone assembles the Compass and offers the artist statement in this panel."));

  const again = el("button", { class: "btn btn--block btn--ghost", type: "button", "data-action": "startover" }, "Start over");
  again.addEventListener("click", function () {
    startFresh(mode);
  });
  const home = el("button", { class: "btn btn--block", type: "button", "data-action": "home" }, "Back to start");
  home.addEventListener("click", goHome);

  root.appendChild(again);
  root.appendChild(home);
  mount(root);
}

function goHome() {
  window.location.hash = "#/";
}

// ---- boot -------------------------------------------------------------------
// Module scripts are deferred, so the DOM is already parsed here.

initChrome();
window.addEventListener("hashchange", router);
router();
