// Soulstice — Journal, Lens, Statement and Return modes (milestone M6).
//
// Each export is { id, enter }. `enter()` renders the mode into #screen. The
// four are registered in secondary.reg.js and picked up by the router in app.js.
//
// Shared machinery:
//   - stepFlow() runs an ordered list of "sections" (Passage layer modules for
//     Journal, authored section modules for Lens and Statement, a generated
//     section for Return) one card at a time, persisting to Store, resolving
//     card.next exactly as app.js does, and calling onDone when the last card of
//     the last section is answered.
//   - The output assemblers in js/output.js are frozen. Where an assembler still
//     carries a milestone-6 placeholder line, the mode fills it by string
//     replacement on the returned markdown, never by touching output.js.
//
// Google-Translate safety: every branch keys off card ids and captured element
// references, never textContent.

import { Store } from "../store.js";
import { renderCard } from "../card.js";
import { el } from "../dom.js";
import { screenNode, mountScreen, goHome } from "../screen.js";
import { typo } from "../typo.js";
import { renderPathNav, pushTrail } from "../pathnav.js";
import {
  buildLensVerdict,
  buildStatement,
  buildJournalEntry,
  buildDriftReview,
  buildReturn,
  renderOutputScreen,
  localDate
} from "../output.js";

import lensSection from "../../data/lens.js";
import { statementSections } from "../../data/statement.js";
import { workbookExercises } from "../../data/workbook.js";
import {
  journalLayers,
  readJournalEntries,
  appendJournalEntry,
  driftDue
} from "../../data/journal.js";
import {
  parseCompass,
  RETURN_DIRECTION_PROMPT,
  RETURN_TEST_PROMPT,
  RETURN_DRIFT_PROMPT,
  RETURN_REVISED_PROMPT
} from "../../data/return.js";

// ---- net-new CSS, injected once -------------------------------------------

function injectStyles() {
  if (document.getElementById("secondary-styles")) return;
  const style = document.createElement("style");
  style.id = "secondary-styles";
  style.textContent = [
    ".sec-preview{border-left:2px solid var(--red);padding:0.2rem 0 0.2rem 0.9rem;margin:0 0 var(--step);}",
    ".sec-preview h2{font-size:1rem;margin:var(--step) 0 0.3rem;}",
    ".sec-preview ol,.sec-preview p{margin:0 0 0.4rem;}",
    ".sec-sub{display:block;margin-top:calc(var(--step) * 2);}",
    '[data-role="thin-note"]{border-left:2px solid var(--red);padding-left:0.9rem;}'
  ].join("\n");
  document.head.appendChild(style);
}

// ---- flow machinery ------------------------------------------------------

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

// Resolve card.next to a card id in the same section, or null (end of section).
function resolveNext(card, answer) {
  const next = card.next || {};
  let pick = null;
  if (answer && Array.isArray(answer.picks) && answer.picks.length === 1) {
    pick = answer.picks[0];
  }
  let t = pick != null ? next[pick] : undefined;
  if (t === undefined) t = next._other;
  if (t === undefined) t = next._default;
  return typeof t === "string" && t !== "_arc-break" ? t : null;
}

function sectionIndex(sections, state) {
  if (!state.cursor || !state.cursor.section) return 0;
  const i = sections.findIndex(function (s) { return s.key === state.cursor.section; });
  return i < 0 ? 0 : i;
}

function stepFlow(mode, sections, state, onDone) {
  if (state.cursor && state.cursor.done) { onDone(state); return; }

  const idx = sectionIndex(sections, state);
  const section = sections[idx];
  let cardId = state.cursor && state.cursor.card;
  if (!cardId || !section.cards[cardId]) cardId = section.entry;
  const card = section.cards[cardId];

  function advance(answer) {
    const nextId = resolveNext(card, answer);
    if (nextId && section.cards[nextId]) {
      pushTrail(state);
      state.cursor = { section: section.key, card: nextId };
      Store.save(mode, state);
      return stepFlow(mode, sections, state, onDone);
    }
    const nextSection = sections[idx + 1];
    if (nextSection) {
      pushTrail(state);
      state.cursor = { section: nextSection.key, card: nextSection.entry };
      Store.save(mode, state);
      return stepFlow(mode, sections, state, onDone);
    }
    state.cursor = { done: true };
    Store.save(mode, state);
    onDone(state);
  }

  const saved = state.answers[card.id] || null;
  const node = renderCard(card, saved, {
    onSubmit: function (answer) {
      recordAnswer(state, card, answer);
      Store.save(mode, state);
      advance(answer);
    }
  });

  node.appendChild(
    renderPathNav({
      canBack: !!(state.trail && state.trail.length),
      onBack: function () {
        state.cursor = state.trail.pop();
        Store.save(mode, state);
        stepFlow(mode, sections, state, onDone);
      },
      onSkip: function () {
        delete state.answers[card.id];
        Store.save(mode, state);
        advance({ picks: [], other: "" });
      },
      onFinish: function () {
        pushTrail(state);
        state.cursor = { done: true };
        Store.save(mode, state);
        onDone(state);
      }
    })
  );

  mountScreen(node);
}

// ---- small UI helpers --------------------------------------------------

function panel(labelText, titleText, noteText) {
  const root = el("section", { class: "screen-panel", "data-role": "secondary" });
  root.appendChild(el("span", { class: "card__label" }, labelText));
  root.appendChild(el("h1", { class: "card__q" }, titleText));
  if (noteText) root.appendChild(el("p", { class: "card__note" }, noteText));
  return root;
}

function actionButton(label, fn, ghost) {
  const b = el(
    "button",
    { class: "btn btn--block" + (ghost ? " btn--ghost" : ""), type: "button" },
    label
  );
  b.addEventListener("click", fn);
  return b;
}

function withNav(root, buttons) {
  (buttons || []).forEach(function (b) { root.appendChild(b); });
  const home = el(
    "button",
    { class: "btn btn--block btn--ghost", type: "button", "data-action": "home" },
    "Back to start"
  );
  home.addEventListener("click", goHome);
  root.appendChild(home);
  return root;
}

function menuList(items) {
  const ul = el("ul", { class: "modes", "data-role": "sec-menu" });
  for (const it of items) {
    const li = el("li", { class: "mode" });
    const btn = el("button", { class: "mode__btn", type: "button" });
    btn.appendChild(el("span", { class: "mode__name" }, it.label));
    if (it.blurb) btn.appendChild(el("span", { class: "mode__blurb" }, it.blurb));
    btn.addEventListener("click", it.onClick);
    li.appendChild(btn);
    ul.appendChild(li);
  }
  return ul;
}

function countVerbatim(state) {
  let n = 0;
  const a = state.answers || {};
  for (const id in a) {
    const x = a[id];
    if (x && ((typeof x.text === "string" && x.text.trim()) ||
              (typeof x.other === "string" && x.other.trim()))) {
      n += 1;
    }
  }
  return n;
}

// =====================================================================
// Lens
// =====================================================================

export const lensMode = {
  id: "lens",
  enter: function () {
    injectStyles();
    const mode = "lens";
    const state = Store.load(mode);

    if (state.cursor && (state.cursor.card || state.cursor.done)) {
      return runLens(mode, state);
    }

    const root = panel(
      "Lens",
      "Diagnose one piece.",
      "Ten short questions about one existing or planned work, then a blunt verdict. One sitting."
    );
    root.appendChild(actionButton("Begin", function () {
      Store.reset(mode);
      const s = Store.load(mode);
      s.cursor = { section: lensSection.key, card: lensSection.entry };
      Store.save(mode, s);
      runLens(mode, s);
    }));
    withNav(root, []);
    mountScreen(root);
  }
};

function runLens(mode, state) {
  stepFlow(mode, [lensSection], state, function (s) {
    const doc = buildLensVerdict(s);
    doc.markdown = fillLensQuestions(doc.markdown, s);
    const root = renderOutputScreen(doc, screenNode());
    withNav(root, [
      actionButton("Run another", function () { Store.reset(mode); lensMode.enter(); }, true)
    ]);
  });
}

// buildLensVerdict leaves a placeholder for "questions it has not answered".
// Fill it from the stems whose pick (or absence) the card flagged as unresolved.
function fillLensQuestions(md, state) {
  const marker = "> (the Lens card flow, milestone 6, fills these from the skipped stems)";
  const qs = [];
  for (const cid in lensSection.cards) {
    const c = lensSection.cards[cid];
    if (!c.diagnostic) continue;
    const a = state.answers[cid];
    const picks = a && Array.isArray(a.picks) ? a.picks : [];
    const flagged = !a || c.diagnostic.flagIf.some(function (f) { return picks.indexOf(f) !== -1; });
    if (flagged) qs.push("- " + typo(c.diagnostic.question));
    if (qs.length >= 3) break;
  }
  const replacement = qs.length
    ? qs.join("\n")
    : "> Every stem you ran got an answer from the work.";
  return md.indexOf(marker) !== -1 ? md.replace(marker, replacement) : md + "\n\n" + replacement + "\n";
}

// =====================================================================
// Statement
// =====================================================================

const STMT_OPEN_IDS = statementSections.map(function (s) { return s.openId; });
const STMT_Q_BY_ID = {};
statementSections.forEach(function (s) {
  for (const cid in s.cards) STMT_Q_BY_ID[cid] = s.cards[cid].question;
});

export const statementMode = {
  id: "statement",
  enter: function () {
    injectStyles();
    const mode = "statement";
    const state = Store.load(mode);

    if (state.cursor && (state.cursor.card || state.cursor.done)) {
      return runStatement(mode, state);
    }

    const root = panel(
      "Statement",
      "An artist statement from your own sentences.",
      "Five sections. A few cards to loosen the material, then one long open answer per section. " +
      "Only what you write in the open answers becomes the statement. If a section is thin, it stays thin."
    );
    root.appendChild(actionButton("Begin", function () {
      Store.reset(mode);
      const s = Store.load(mode);
      const first = statementSections[0];
      s.cursor = { section: first.key, card: first.entry };
      Store.save(mode, s);
      // TODO(passage-finale): when Statement is entered as the finale of a
      // Passage, the Compass already exists. Seed the provenance log from the
      // Compass state (buildCompass) per references/statement.md "Entry path 2"
      // and run only the short new-material pass instead of all five sections.
      // The standalone path below is the one built now.
      runStatement(mode, s);
    }));
    withNav(root, []);
    mountScreen(root);
  }
};

function runStatement(mode, state) {
  stepFlow(mode, statementSections, state, function (s) {
    // Only the mandatory open answers may feed the statement. Filtering here is
    // what makes "no card-option phrasing reaches the prose" structural.
    const answers = {};
    for (const id in s.answers) {
      if (STMT_OPEN_IDS.indexOf(id) !== -1) answers[id] = s.answers[id];
    }
    const doc = buildStatement(Object.assign({}, s, { answers: answers }));
    doc.markdown = relabelProvenance(doc.markdown);
    const root = renderOutputScreen(doc, screenNode());
    withNav(root, [
      actionButton("Start over", function () { Store.reset(mode); statementMode.enter(); }, true)
    ]);
  });
}

// buildStatement has no index for these non-Passage cards, so Provenance points
// at the bare card id. Swap in the real question text.
function relabelProvenance(md) {
  return md.replace(/←\s+(st-[\w-]+)/g, function (m, id) {
    return "← " + (STMT_Q_BY_ID[id] ? typo(STMT_Q_BY_ID[id]) : id);
  });
}

// =====================================================================
// Journal
// =====================================================================

export const journalMode = {
  id: "journal",
  enter: function () {
    injectStyles();
    const mode = "journal";
    const state = Store.load(mode);
    const j = state.journal;

    if (state.cursor && state.cursor.card && j && j.kind) {
      return resumeJournalFlow(mode, state);
    }
    renderJournalMenu(mode);
  }
};

function firstQuestion(layer) {
  const c = layer.cards[layer.entry];
  return c ? c.question : "";
}

function renderJournalMenu(mode) {
  Store.reset(mode);
  const entries = readJournalEntries();
  const count = entries.length;

  const root = panel(
    "Journal",
    "One layer per sitting.",
    count
      ? count + (count === 1 ? " entry" : " entries") + " on this device so far."
      : "Pick a layer to work through. Your answers append to a running journal on this device."
  );

  if (driftDue(count)) {
    root.appendChild(el(
      "p",
      { class: "card__note" },
      "You are at " + count + " entries. A drift review is offered in place of a new layer."
    ));
    root.appendChild(actionButton("Drift review", function () { runDrift(mode); }));
  }

  root.appendChild(menuList(journalLayers.map(function (layer) {
    return {
      label: layer.title,
      blurb: firstQuestion(layer),
      onClick: function () { startJournalLayer(mode, layer.key); }
    };
  })));

  root.appendChild(el("span", { class: "card__label sec-sub" }, "Between sittings"));
  root.appendChild(el("p", { class: "card__note" }, "One exercise to do away from the screen and bring back."));
  root.appendChild(menuList(workbookExercises.map(function (ex) {
    return {
      label: ex.title,
      blurb: ex.instruction,
      onClick: function () { startJournalExercise(mode, ex.key); }
    };
  })));

  withNav(root, []);
  mountScreen(root);
}

function startJournalLayer(mode, layerKey) {
  const layer = journalLayers.find(function (l) { return l.key === layerKey; });
  if (!layer) return;
  Store.reset(mode);
  const state = Store.load(mode);
  state.journal = { kind: "layer", key: layerKey };
  state.cursor = { section: layer.key, card: layer.entry };
  Store.save(mode, state);
  stepFlow(mode, [layer], state, function (s) { finishJournalLayer(mode, s, layer); });
}

function finishJournalLayer(mode, state, layer) {
  // buildJournalEntry reads cursor.section to find the layer; give it that.
  state.cursor = { section: layer.key };
  const doc = buildJournalEntry(state);
  const thin = countVerbatim(state) < 2;
  const entries = appendJournalEntry({ date: localDate(), markdown: doc.markdown });
  Store.reset(mode);
  showJournalResult(mode, doc, { thin: thin, count: entries.length });
}

function exerciseSection(ex) {
  const cards = {};
  cards[ex.card.id] = ex.card;
  return { key: "ex-" + ex.key, title: ex.title, entry: ex.card.id, cards: cards };
}

function startJournalExercise(mode, exKey) {
  const ex = workbookExercises.find(function (e) { return e.key === exKey; });
  if (!ex) return;

  const root = panel("Exercise", ex.title, ex.instruction);
  root.appendChild(actionButton("I have done it. Write it up.", function () {
    Store.reset(mode);
    const state = Store.load(mode);
    state.journal = { kind: "exercise", key: exKey };
    const sec = exerciseSection(ex);
    state.cursor = { section: sec.key, card: sec.entry };
    Store.save(mode, state);
    stepFlow(mode, [sec], state, function (s) { finishJournalExercise(mode, s, ex); });
  }));
  withNav(root, []);
  mountScreen(root);
}

function finishJournalExercise(mode, state, ex) {
  // No matching Passage layer: buildJournalEntry falls back to the section string
  // for the heading and writes "> (not recorded)" for the opening question.
  state.cursor = { section: ex.title };
  const doc = buildJournalEntry(state);
  doc.markdown = doc.markdown.replace(
    "**Asked:** > (not recorded)",
    "**Asked:** " + typo(ex.title + ". " + ex.card.question)
  );
  const entries = appendJournalEntry({ date: localDate(), markdown: doc.markdown });
  Store.reset(mode);
  showJournalResult(mode, doc, { thin: false, count: entries.length });
}

function showJournalResult(mode, doc, meta) {
  const root = renderOutputScreen(doc, screenNode());

  if (meta.thin) {
    const note = el(
      "p",
      { class: "card__note", "data-role": "thin-note" },
      "That layer ran thin. An exercise between sittings can bring back more material."
    );
    const actions = root.querySelector('[data-role="output-actions"]');
    if (actions) root.insertBefore(note, actions);
    else root.appendChild(note);
  }

  const btns = [];
  if (driftDue(meta.count)) {
    btns.push(actionButton("Drift review", function () { runDrift(mode); }));
  }
  btns.push(actionButton("Back to the journal", function () { journalMode.enter(); }, true));
  withNav(root, btns);
}

function runDrift(mode) {
  const entries = readJournalEntries();
  const doc = buildDriftReview(entries);
  appendJournalEntry({ date: localDate(), markdown: doc.markdown });
  Store.reset(mode);
  const root = renderOutputScreen(doc, screenNode());
  withNav(root, [
    actionButton("Back to the journal", function () { journalMode.enter(); }, true)
  ]);
}

function resumeJournalFlow(mode, state) {
  const j = state.journal;
  if (j.kind === "layer") {
    const layer = journalLayers.find(function (l) { return l.key === j.key; });
    if (!layer) return renderJournalMenu(mode);
    return stepFlow(mode, [layer], state, function (s) { finishJournalLayer(mode, s, layer); });
  }
  if (j.kind === "exercise") {
    const ex = workbookExercises.find(function (e) { return e.key === j.key; });
    if (!ex) return renderJournalMenu(mode);
    return stepFlow(mode, [exerciseSection(ex)], state, function (s) {
      finishJournalExercise(mode, s, ex);
    });
  }
  renderJournalMenu(mode);
}

// =====================================================================
// Return
// =====================================================================

export const returnMode = {
  id: "return",
  enter: function () {
    injectStyles();
    const mode = "return";
    const compasses = Store.listCompasses();

    if (!compasses.length) {
      const root = panel(
        "Return",
        "No Compass to return to.",
        "Return checks a finished Passage against what actually happened. There is no Compass on this device yet."
      );
      root.appendChild(actionButton("Start a Passage", function () { window.location.hash = "#/passage"; }));
      withNav(root, []);
      mountScreen(root);
      return;
    }

    const state = Store.load(mode);
    if (state.cursor && state.cursor.card && state.return && state.return.compassKey) {
      return runReturn(mode, state);
    }

    const c = compasses[0];
    const parsed = parseCompass(c.markdown);

    const root = panel(
      "Return",
      "Compass of " + c.date + ".",
      "Its directions and its one test are below. You will say what happened to each."
    );

    const pre = el("div", { class: "sec-preview", "data-role": "compass-preview" });
    if (parsed.directions.length) {
      pre.appendChild(el("h2", null, "Three directions"));
      const ol = el("ol");
      parsed.directions.forEach(function (d) { ol.appendChild(el("li", null, d)); });
      pre.appendChild(ol);
    }
    pre.appendChild(el("h2", null, "One test"));
    pre.appendChild(el("p", null, parsed.test || "(no test recorded in this Compass)"));
    root.appendChild(pre);

    root.appendChild(actionButton("Begin", function () {
      Store.reset(mode);
      const s = Store.load(mode);
      s.return = {
        compassKey: c.key,
        compassDate: c.date,
        compassMarkdown: c.markdown,
        directions: parsed.directions,
        test: parsed.test
      };
      const sec = returnSection(parsed);
      s.cursor = { section: sec.key, card: sec.entry };
      Store.save(mode, s);
      runReturn(mode, s);
    }));
    withNav(root, []);
    mountScreen(root);
  }
};

// One open card per direction, then the test, then two reflection cards that
// feed "What has drifted" and "Revised directions" in the assembled document.
function returnSection(parsed) {
  const dirs = (parsed && parsed.directions) || [];
  const cards = {};
  const ids = dirs.map(function (d, i) { return "ret-d" + (i + 1); });
  ids.push("ret-test");

  dirs.forEach(function (d, i) {
    const id = "ret-d" + (i + 1);
    cards[id] = {
      id: id,
      kind: "open",
      question: RETURN_DIRECTION_PROMPT,
      header: "Direction " + (i + 1),
      note: d,
      options: [],
      multiSelectHint: false,
      next: { _default: ids[i + 1] }
    };
  });

  cards["ret-test"] = {
    id: "ret-test",
    kind: "open",
    question: RETURN_TEST_PROMPT,
    header: "The test",
    note: (parsed && parsed.test) || "",
    options: [],
    multiSelectHint: false,
    next: { _default: "ret-drift" }
  };

  cards["ret-drift"] = {
    id: "ret-drift",
    kind: "open",
    question: RETURN_DRIFT_PROMPT,
    header: "Drifted",
    note: "",
    options: [],
    multiSelectHint: false,
    next: { _default: "ret-revised" }
  };

  cards["ret-revised"] = {
    id: "ret-revised",
    kind: "open",
    question: RETURN_REVISED_PROMPT,
    header: "Revised",
    note: "",
    options: [],
    multiSelectHint: false,
    next: { _end: true }
  };

  return {
    key: "return",
    title: "Return",
    entry: dirs.length ? "ret-d1" : "ret-test",
    cards: cards
  };
}

function runReturn(mode, state) {
  const parsed = {
    directions: (state.return && state.return.directions) || [],
    test: (state.return && state.return.test) || ""
  };
  stepFlow(mode, [returnSection(parsed)], state, function (s) { finishReturn(mode, s); });
}

function finishReturn(mode, state) {
  const r = state.return;

  // Only the per-direction answers feed buildReturn's directions list. The
  // test, drift and revised answers are placed by hand into their own sections.
  const HANDLED = { "ret-test": 1, "ret-drift": 1, "ret-revised": 1 };
  const dirAnswers = {};
  for (const id in state.answers) {
    if (!HANDLED[id]) dirAnswers[id] = state.answers[id];
  }

  const doc = buildReturn(
    { date: r.compassDate, markdown: r.compassMarkdown },
    Object.assign({}, state, { answers: dirAnswers })
  );

  function answerText(id) {
    const a = state.answers[id];
    return a && typeof a.text === "string" ? a.text.trim() : "";
  }

  let section = doc.markdown;
  const testText = answerText("ret-test");
  if (testText) {
    section = section.replace(
      "### What happened to the one test\n\n> (not recorded)",
      "### What happened to the one test\n\n" + testText
    );
  }
  const driftText = answerText("ret-drift");
  if (driftText) {
    section = section.replace(
      "### What has drifted\n\n> (not recorded)",
      "### What has drifted\n\n" + driftText
    );
  }
  const revisedText = answerText("ret-revised");
  if (revisedText) {
    section = section.replace(
      "### Revised directions\n\n> (not recorded)",
      "### Revised directions\n\n" + revisedText
    );
  }

  // Append under the existing Compass without rewriting anything above.
  const base = String(r.compassMarkdown || "").replace(/\s*$/, "");
  const full = base + "\n\n" + section.replace(/^\s*/, "");

  try {
    window.localStorage.setItem(
      r.compassKey,
      JSON.stringify({ date: r.compassDate, markdown: full })
    );
  } catch (e) {
    // the on-screen document still stands
  }

  Store.reset(mode);

  const shown = {
    markdown: full,
    title: "Compass " + r.compassDate + ", with Return",
    filename: "compass-" + r.compassDate + ".md"
  };
  const root = renderOutputScreen(shown, screenNode());
  withNav(root, []);
}

export default {
  lensMode: lensMode,
  statementMode: statementMode,
  journalMode: journalMode,
  returnMode: returnMode
};
