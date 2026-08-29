// Soulstice — Ground mode module (milestone M5).
//
//   export const groundMode = { id: "ground", enter }
//
// Ground is reframed OUT LOUD as a self-guided worksheet, not a presence:
//   1. An acknowledgement gate is shown first, every session. It states, in
//      plain language, that the worksheet cannot read or answer what you type,
//      that it is the wrong tool if there is any thought of self-harm, that a
//      person should be contacted today, and that the worksheet keeps.
//   2. A crisis-contact panel is rendered ONCE, above the card mount, so it
//      survives every phase change. It carries the same persistent line, a
//      region selector, and real lines as tel: links plus text/chat lines.
//   3. There is NO text scanning of any kind. The safety layer is the gate
//      plus the panel, and nothing else.
//
// The module drives its own cursor through Store under mode key "ground"
// (localStorage soulstice:v1:ground), renders phase cards with the frozen
// renderCard, and on completion assembles the document with M4's buildGround
// and renderOutputScreen.
//
// Google-Translate safety: routing keys off card ids and off the region
// <select>'s value attribute, never off textContent.

import { Store } from "../store.js";
import { el } from "../dom.js";
import { renderCard } from "../card.js";
import { mountScreen, goHome } from "../screen.js";
import { buildGround, renderOutputScreen } from "../output.js";
import { UNWIND_PLAYLIST } from "../pages.js";
import { renderPathNav, pushTrail } from "../pathnav.js";
import groundSection from "../../data/ground.js";

const MODE = "ground";

// A slower breathing space, offered at the end of Ground. Sinaida's own tool.
const ETHEREAL_PATH = "https://sinaida-space.github.io/ethereal-path/";

// Per session, not persisted: the gate is re-shown after any reload, and the
// end-of-Ground Passage line is offered at most once per load.
let acknowledged = false;
let passageOffered = false;

// ---- persistent copy ------------------------------------------------------

const PERSISTENT_LINE =
  "This is a worksheet you work through alone. It cannot read what you type or reply to it. " +
  "If you are thinking of harming yourself, this is the wrong tool for tonight: contact one of " +
  "the people or lines below today. The worksheet will still be here later.";

const GATE_BODY = [
  "You work through this by yourself. It shows a fixed set of questions and writes your answers " +
  "into a short document at the end. It cannot read what you type, it cannot respond to it, and " +
  "nothing you write leaves this browser.",
  "It is built for the evening when the work feels worthless and there seems to be nowhere to go " +
  "next. It holds that. It does not hold everything.",
  "If there is any thought of harming yourself, or of not being here, this is the wrong tool for " +
  "right now. Contact a person today: someone you know, or one of the lines below. This worksheet " +
  "will still be here later, and it keeps."
];

// ---- crisis-contact lines -----------------------------------------------
// Short, and only lines that can be stood behind. Each entry is either
//   { tel: "116123", label: "…" }   -> rendered as a tel: link
//   { text: "…" }                   -> rendered as plain text (SMS / directory)

const REGIONS = [
  { value: "intl", label: "International" },
  { value: "uk", label: "United Kingdom & Ireland" },
  { value: "us", label: "United States" },
  { value: "eu", label: "EU (generic)" },
  { value: "other", label: "Somewhere else" }
];

const LINES = {
  intl: [
    { text: "findahelpline.com lists a service for most countries." },
    { text: "If you are in immediate danger, call your local emergency number." }
  ],
  uk: [
    { tel: "116123", label: "Samaritans, day or night: 116 123" },
    { text: "Shout: text the word SHOUT to 85258" }
  ],
  us: [
    { tel: "988", label: "988 Suicide & Crisis Lifeline: call or text 988" },
    { text: "Crisis Text Line: text HOME to 741741" }
  ],
  eu: [
    { tel: "112", label: "Emergency services, anywhere in the EU: 112" },
    { tel: "116123", label: "Emotional support line, where it runs: 116 123" }
  ],
  other: [
    { text: "Call your local emergency number." },
    { text: "findahelpline.com finds a line in your country." }
  ]
};

const DEFAULT_REGION = "intl";

// =======================================================================
// styles (idempotent injection)
// =======================================================================

function injectStyles() {
  if (document.getElementById("ground-styles")) return;
  const style = document.createElement("style");
  style.id = "ground-styles";
  style.textContent = [
    ".ground__safety{border:var(--rule-w) solid var(--rule);padding:var(--step);margin-bottom:calc(var(--step) * 1.5)}",
    ".ground__line{font-size:var(--fs-small);color:var(--ink);margin:0 0 var(--step);line-height:1.45}",
    ".crisis__head{font-family:var(--font-display);font-weight:400;font-size:var(--fs-small);letter-spacing:.1em;text-transform:uppercase;color:var(--red-text);margin:0 0 .5rem}",
    ".crisis__region{display:block;font-size:var(--fs-small);color:var(--ink-soft);margin:0 0 .4rem}",
    ".crisis__select{font-family:var(--font-body);font-weight:300;font-size:var(--fs-small);color:var(--ink);background:var(--field-bg);border:var(--rule-w) solid var(--field-border);padding:.4rem .5rem;width:100%}",
    ".crisis__select:focus{outline:2px solid var(--red);outline-offset:1px}",
    ".crisis__lines{list-style:none;margin:.6rem 0 0;padding:0}",
    ".crisis__lines li{font-size:var(--fs-small);color:var(--ink);padding:.35rem 0;border-top:var(--rule-w) solid var(--field-border)}",
    ".crisis__lines li:first-child{border-top:0}",
    ".crisis__lines a{color:var(--red-text);text-decoration:none}",
    ".crisis__lines a:hover{text-decoration:underline}",
    ".crisis__fallback{font-size:var(--fs-small);color:var(--ink-soft);margin:.6rem 0 0;padding-top:.5rem;border-top:var(--rule-w) solid var(--field-border)}",
    ".ground__gate-body p{margin:0 0 var(--step)}",
    ".ground__progress{font-family:var(--font-display);font-weight:400;font-size:var(--fs-small);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-soft);margin:0 0 var(--step)}",
    ".ground__passage{font-size:var(--fs-small);color:var(--ink-soft);border-top:var(--rule-w) solid var(--field-border);padding-top:var(--step);margin-top:var(--step)}",
    ".ground__passage a{color:var(--red-text)}",
    ".ground__soft{font-size:var(--fs-small);color:var(--ink-soft);border-top:var(--rule-w) solid var(--field-border);padding-top:var(--step);margin-top:var(--step)}",
    ".ground__soft-head{font-family:var(--font-display);font-weight:400;font-size:var(--fs-small);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-soft);margin:0 0 .5rem}",
    ".ground__soft p{margin:.3rem 0}",
    ".ground__soft a{color:var(--red-text);text-decoration:none}",
    ".ground__soft a:hover{text-decoration:underline}",
    "@media print{.ground__safety,.ground__progress,.ground__passage,.ground__soft{display:none !important}}"
  ].join("\n");
  document.head.appendChild(style);
}

// =======================================================================
// crisis panel (rendered once, reused across phases)
// =======================================================================

function renderSafetyRegion() {
  const box = el("aside", { class: "ground__safety", "data-role": "ground-safety" });

  box.appendChild(el("p", { class: "ground__line", "data-role": "ground-line" }, PERSISTENT_LINE));

  box.appendChild(el("p", { class: "crisis__head", "data-role": "crisis-head" }, "If you need a person now"));

  const regionId = "crisis-region";
  box.appendChild(el("label", { class: "crisis__region", for: regionId }, "Region"));

  const select = el("select", { class: "crisis__select", id: regionId, "data-role": "crisis-region-select" });
  for (const r of REGIONS) {
    const opt = el("option", { value: r.value }, r.label);
    if (r.value === DEFAULT_REGION) opt.selected = true;
    select.appendChild(opt);
  }
  box.appendChild(select);

  const linesEl = el("ul", { class: "crisis__lines", "data-role": "crisis-lines" });
  box.appendChild(linesEl);

  box.appendChild(el("p", { class: "crisis__fallback", "data-role": "crisis-fallback" },
    "Anywhere: findahelpline.com"));

  drawLines(select.value, linesEl);
  select.addEventListener("change", function () {
    drawLines(select.value, linesEl);
  });

  return box;
}

function drawLines(region, linesEl) {
  const set = LINES[region] || LINES[DEFAULT_REGION];
  linesEl.replaceChildren();
  for (const line of set) {
    const li = el("li", null);
    if (line.tel) {
      li.appendChild(el("a", { href: "tel:" + line.tel }, line.label));
    } else {
      li.appendChild(document.createTextNode(line.text));
    }
    linesEl.appendChild(li);
  }
}

// =======================================================================
// gate
// =======================================================================

function renderGate() {
  const root = el("section", { class: "screen-panel ground ground--gate", "data-role": "ground-gate" });

  root.appendChild(el("span", { class: "card__label" }, "Before you begin"));
  root.appendChild(el("h1", { class: "card__q" }, "This is a worksheet. It does not listen."));

  const body = el("div", { class: "ground__gate-body", "data-role": "ground-gate-body" });
  for (const para of GATE_BODY) body.appendChild(el("p", null, para));
  root.appendChild(body);

  root.appendChild(renderSafetyRegion());

  const go = el("button",
    { class: "btn btn--block", type: "button", "data-role": "ground-ack", "data-action": "acknowledge" },
    "I understand, continue");
  go.addEventListener("click", function () {
    acknowledged = true;
    runFlow();
  });
  root.appendChild(go);

  mountScreen(root);
}

// =======================================================================
// flow
// =======================================================================

function enter() {
  injectStyles();
  if (!acknowledged) {
    renderGate();
    return;
  }
  runFlow();
}

function runFlow() {
  const state = Store.load(MODE);

  const fresh = !state.cursor || (!state.cursor.card && !state.cursor.done);
  if (fresh) {
    state.startedAt = state.startedAt || Date.now();
    state.cursor = { section: "ground", card: groundSection.entry };
    Store.save(MODE, state);
  }

  const root = el("section", { class: "screen-panel ground", "data-role": "ground" });
  root.appendChild(renderSafetyRegion());
  const cardMount = el("div", { class: "ground__card", "data-role": "ground-card-mount" });
  root.appendChild(cardMount);
  mountScreen(root);

  renderStep(state, cardMount);
}

function phaseLabel(cardId) {
  if (cardId.indexOf("g1-") === 0) return "Phase 1 · the event and the verdict";
  if (cardId.indexOf("g2b-") === 0) return "Phase 2b · the question with no answer";
  if (cardId.indexOf("g2-") === 0) return "Phase 2 · evidence";
  if (cardId.indexOf("g3-") === 0) return "Phase 3 · one action today";
  if (cardId.indexOf("g4-") === 0) return "Phase 4 · three projects";
  return "";
}

function renderStep(state, cardMount) {
  if (!state.cursor || state.cursor.done) {
    finish(state, cardMount);
    return;
  }

  const card = groundSection.cards[state.cursor.card];
  if (!card) {
    finish(state, cardMount);
    return;
  }

  function advance(answer) {
    pushTrail(state);
    const step = resolveNext(card, answer);
    state.cursor = step.card
      ? { section: "ground", card: step.card }
      : { done: true };
    Store.save(MODE, state);
    renderStep(state, cardMount);
  }

  const saved = state.answers[card.id] || null;

  const node = renderCard(card, saved, {
    onSubmit: function (answer) {
      recordAnswer(state, card, answer);
      Store.save(MODE, state);
      advance(answer);
    }
  });

  const nav = renderPathNav({
    canBack: !!(state.trail && state.trail.length),
    onBack: function () {
      state.cursor = state.trail.pop();
      Store.save(MODE, state);
      renderStep(state, cardMount);
    },
    onSkip: function () {
      delete state.answers[card.id];
      Store.save(MODE, state);
      advance({ picks: [], other: "" });
    },
    onFinish: function () {
      state.cursor = { done: true };
      Store.save(MODE, state);
      renderStep(state, cardMount);
    }
  });

  const label = phaseLabel(card.id);
  const wrap = document.createDocumentFragment();
  if (label) wrap.appendChild(el("p", { class: "ground__progress", "data-role": "ground-progress" }, label));
  wrap.appendChild(node);
  wrap.appendChild(nav);
  cardMount.replaceChildren(wrap);
}

function recordAnswer(state, card, answer) {
  if (answer && typeof answer.text === "string") {
    state.answers[card.id] = { text: answer.text, at: Date.now() };
  } else {
    state.answers[card.id] = {
      picks: (answer && answer.picks ? answer.picks : []).slice(),
      other: (answer && answer.other) || "",
      at: Date.now()
    };
  }
}

// Same resolution order as js/app.js, plus a _end / true target meaning "done".
function resolveNext(card, answer) {
  const next = card.next || {};

  let pickId = null;
  if (answer && Array.isArray(answer.picks) && answer.picks.length === 1) {
    pickId = answer.picks[0];
  }

  let target = pickId != null ? next[pickId] : undefined;
  if (target === undefined) target = next._other;
  if (target === undefined) target = next._default;

  if (target === true) return { done: true };
  if (typeof target === "string") return { card: target };
  if (next._end === true) return { done: true };
  return { done: true };
}

function finish(state, cardMount) {
  let doc;
  try {
    doc = buildGround(state);
  } catch (e) {
    doc = { markdown: "# Ground\n\n> (the document could not be assembled)\n", title: "Ground", filename: "ground.md" };
  }

  renderOutputScreen(doc, cardMount);

  if (!passageOffered) {
    passageOffered = true;
    const p = el("p", { class: "ground__passage", "data-role": "ground-passage" });
    p.appendChild(document.createTextNode(
      "When this is further away, there is a longer version of this instrument that asks why you make what you make. "
    ));
    p.appendChild(el("a", { href: "#/passage", "data-role": "ground-passage-link" }, "It is a bad idea today and a reasonable one in a few weeks."));
    cardMount.appendChild(p);
  }

  const soft = el("div", { class: "ground__soft", "data-role": "ground-soft" });
  soft.appendChild(el("p", { class: "ground__soft-head" }, "If you would rather step away from words"));
  const s1 = el("p", null);
  s1.appendChild(el("a", { href: UNWIND_PLAYLIST, target: "_blank", rel: "noopener" }, "A playlist to sit with ↗"));
  soft.appendChild(s1);
  const s2 = el("p", null);
  s2.appendChild(el("a", { href: ETHEREAL_PATH, target: "_blank", rel: "noopener" }, "Ethereal Path, a slower breathing space ↗"));
  soft.appendChild(s2);
  cardMount.appendChild(soft);

  const over = el("button",
    { class: "btn btn--block btn--ghost", type: "button", "data-action": "startover" },
    "Start over");
  over.addEventListener("click", function () {
    Store.reset(MODE);
    runFlow();
  });
  cardMount.appendChild(over);

  const home = el("button",
    { class: "btn btn--block", type: "button", "data-action": "home" },
    "Back to start");
  home.addEventListener("click", goHome);
  cardMount.appendChild(home);
}

export const groundMode = { id: "ground", enter: enter };

export default groundMode;
