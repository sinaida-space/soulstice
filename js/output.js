// Soulstice — output assemblers.
//
// Turns a saved `state` (see js/store.js) into a Markdown document for each
// mode. The Passage finale (buildCompass + renderOutputScreen) is wired in
// js/app.js now; the other assemblers are called by their card flows in a
// later milestone and are exercised here only by js/output.test.html.
//
// Rules, from the skill references and issue #5:
//   - Verbatim wins. Prefer `answer.other` / `answer.text` over the label of a
//     picked option. A section filled only from picks carries the caveat line
//     "> (picked, not stated in your words)".
//   - Never invent an insight. Anything the assembler would have to infer goes
//     under "Open questions" as a question.
//   - Contradictions are left standing, stated as pairs, under "Still unresolved".
//   - No praise, no summary of how the session went, no next-steps enthusiasm.
//   - typo() is applied ONLY to strings this file writes, never to a user's
//     verbatim answer.

import { passageLayers } from "../data/manifest.js";
import groundSection from "../data/ground.js";
import { statementSections } from "../data/statement.js";
import { typo, typoTitle } from "./typo.js";
import { el } from "./dom.js";
import { llmKit } from "./llm.js";

// ---- card index (for resolving picked option ids to their labels) ----------

const CARD_INDEX = {};
for (const layer of passageLayers) {
  for (const cid in layer.cards) CARD_INDEX[cid] = layer.cards[cid];
}
for (const cid in groundSection.cards) CARD_INDEX[cid] = groundSection.cards[cid];

function optionLabel(cardId, optId) {
  const card = CARD_INDEX[cardId];
  if (!card || !Array.isArray(card.options)) return String(optId);
  const opt = card.options.find(function (o) { return o.id === optId; });
  return opt ? opt.label : String(optId);
}

// ---- date -----------------------------------------------------------------

export function localDate(d) {
  const dt = d instanceof Date ? d : new Date();
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  return y + "-" + m + "-" + day;
}

// ---- answer accessors ---------------------------------------------------------

function ans(state, id) {
  return state && state.answers && state.answers[id] ? state.answers[id] : null;
}

function text(a) {
  return a && typeof a.text === "string" && a.text.trim() ? a.text.trim() : "";
}

function other(a) {
  return a && typeof a.other === "string" && a.other.trim() ? a.other.trim() : "";
}

function picks(a) {
  if (!a || !Array.isArray(a.picks)) return [];
  return a.picks.filter(function (p) { return p !== "_other"; });
}

// The user's own words for a card, if any: open text, else Other text.
function verbatim(a) {
  return text(a) || other(a);
}

// Verbatim if present; otherwise the label of the first picked option, with a
// flag so the caller can decide whether the section needs a caveat.
function valueFor(state, id) {
  const a = ans(state, id);
  const v = verbatim(a);
  if (v) return { value: v, verbatim: true, empty: false };
  const p = picks(a);
  if (p.length) return { value: optionLabel(id, p[0]), verbatim: false, empty: false };
  return { value: "", verbatim: false, empty: true };
}

function hasAnyPick(state, id, optId) {
  return picks(ans(state, id)).indexOf(optId) !== -1;
}

const CAVEAT = "> (picked, not stated in your words)";

// ---- footnote (CONTENT.md §7) ----------------------------------------------
// Assembler-written, so it runs through typo(). Appended as the final block of
// every generated document: a horizontal rule, then this one line.
const FOOTNOTE = typo(
  "Made with SOULSTICE, an instrument by Sinaida Krivchenko · sinaida.eu"
);

function withFootnote(markdown) {
  const body = String(markdown == null ? "" : markdown).replace(/\s+$/, "");
  return body + "\n\n---\n\n" + FOOTNOTE + "\n";
}

// ---- small text helpers -----------------------------------------------------

// First sentence, capped, for a compact finding phrase. Only ever run on
// strings we then present as our own paraphrase pointer, never as the quote.
function phrase(s, cap) {
  let out = String(s || "").replace(/\s+/g, " ").trim();
  const stop = out.search(/[.!?]\s/);
  if (stop > 20) out = out.slice(0, stop + 1);
  const limit = cap || 120;
  if (out.length > limit) out = out.slice(0, limit - 1).replace(/\s+\S*$/, "") + "…";
  return out;
}

function block(title, lines) {
  const out = ["## " + title, ""];
  for (const ln of lines) out.push(ln);
  out.push("");
  return out;
}

// =====================================================================
// Compass
// =====================================================================

export function buildCompass(state) {
  const date = localDate();
  const s = state || {};
  const lines = [];

  // No typo() on any string that contains the ISO date: its rule for numeric
  // ranges would turn the hyphens into en dashes.
  lines.push("# Compass: " + date);
  lines.push("");

  // ---- 1. What I did not say ----------------------------------------
  {
    const closing = verbatim(ans(s, "stakes-close"));
    lines.push.apply(lines, block("What I did not say",
      closing ? [closing] : ["> (nothing recorded)"]));
  }

  // ---- 2. The question the work keeps asking -----------------------
  {
    const q = valueFor(s, "field-question");
    const body = [];
    if (q.empty) body.push("> (not recorded)");
    else {
      body.push(q.value);
      if (!q.verbatim) body.push(CAVEAT);
    }
    lines.push.apply(lines, block("The question the work keeps asking", body));
  }

  // ---- 3. My vocabulary -------------------------------------------
  {
    const body = [];
    let anyVerbatim = false;

    const repeats = picks(ans(s, "field-repeats"));
    for (const p of repeats) body.push("- " + optionLabel("field-repeats", p));

    const defend = verbatim(ans(s, "field-defend"));
    if (defend) { body.push("- Would still defend in ten years: " + defend); anyVerbatim = true; }

    const fright = verbatim(ans(s, "field-fright"));
    if (fright) { body.push("- Most frightening to make: " + fright); anyVerbatim = true; }

    const embarrass = valueFor(s, "field-embarrass");
    if (!embarrass.empty) body.push("- Comes back, and embarrasses: " + embarrass.value);

    const theft = valueFor(s, "field-theft");
    if (!theft.empty) {
      body.push("- Would hurt to lose: " + theft.value);
      if (theft.verbatim) anyVerbatim = true;
    }

    if (!body.length) body.push("> (not recorded)");
    else if (!anyVerbatim) body.push(CAVEAT);
    lines.push.apply(lines, block("My vocabulary", body));
  }

  // ---- 4. Where I make from --------------------------------------
  {
    const body = [];
    let anyVerbatim = false;
    const rows = [
      ["Signal it is right", "contact-c3"],
      ["Signal it is wrong", "contact-c2"],
      ["Has to be present", "contact-c1b"],
      ["Reliably kills the state", "contact-c4"],
      ["The felt quality of now", "epoch-c1"],
      ["The refusal, and its cost", "epoch-c6"],
      ["What the refusal protects", "epoch-c6b"]
    ];
    for (const [label, id] of rows) {
      const v = valueFor(s, id);
      if (v.empty) continue;
      body.push("- " + label + ": " + v.value);
      if (v.verbatim) anyVerbatim = true;
    }
    if (!body.length) body.push("> (not recorded)");
    else if (!anyVerbatim) body.push(CAVEAT);
    lines.push.apply(lines, block("Where I make from", body));
  }

  // ---- 5. Not mine ---------------------------------------------
  {
    const body = [];
    let anyVerbatim = false;

    for (const p of picks(ans(s, "inheritance-c5"))) {
      body.push("- Inherited standard, never chosen: " + optionLabel("inheritance-c5", p));
    }
    const costs = valueFor(s, "inheritance-c6");
    if (!costs.empty) {
      body.push("- Costs most to put down: " + costs.value);
      if (costs.verbatim) anyVerbatim = true;
    }
    for (const [label, id] of [
      ["Borrowed impulse", "voices-c1"],
      ["What leaving a project off the ten-year list says", "voices-c2x"],
      ["Whose reaction the work waits for", "voices-c3"],
      ["Softened before sending", "role-c2"],
      ["The ambition, said without softening", "role-c3"]
    ]) {
      const v = valueFor(s, id);
      if (v.empty) continue;
      body.push("- " + label + ": " + v.value);
      if (v.verbatim) anyVerbatim = true;
    }
    if (!body.length) body.push("> (not recorded)");
    else if (!anyVerbatim) body.push(CAVEAT);
    lines.push.apply(lines, block("Not mine", body));
  }

  // ---- 6. Still unresolved -----------------------------------
  {
    const pairs = contradictions(s);
    const body = pairs.length ? pairs : ["> (no contradictions surfaced)"];
    lines.push.apply(lines, block("Still unresolved", body));
  }

  // ---- 7. Three directions -----------------------------------
  {
    const body = [];
    const m1 = text(ans(s, "stakes-m1"));
    const m2 = text(ans(s, "stakes-m2"));
    const m3 = text(ans(s, "stakes-m3"));
    if (m1 || m2 || m3) {
      if (m1) body.push("> " + m1);
      if (m2) body.push("> " + m2);
      if (m3) body.push("> " + m3);
      body.push("");
    }

    const synth = synthesisLine(s);
    if (synth) { body.push(synth); body.push(""); }

    const dirs = [
      ["Out of layer 7 (Poisons), a want you already stated in the first person", "poisons-convert"],
      ["Out of layer 11 (Stakes), what you said you would regret not attempting", "stakes-c3"],
      ["Out of layer 5 (Field), the recurrence it would cost you to lose", "field-theft"]
    ];
    let n = 0;
    for (const [lead, id] of dirs) {
      const v = valueFor(s, id);
      if (v.empty) continue;
      n += 1;
      body.push(n + ". " + lead + ": " + v.value);
    }
    if (!n && !(m1 || m2 || m3)) body.push("> (not enough material)");
    lines.push.apply(lines, block("Three directions", body));
  }

  // ---- 8. Stop list ----------------------------------------
  {
    const body = [];
    let anyVerbatim = false;
    for (const [lead, id] of [
      ["what waiting for that reaction does to the work", "voices-c3a"],
      ["what waiting for that reaction does to the work", "voices-c3b"],
      ["what waiting for that reaction does to the work", "voices-c3c"],
      ["what waiting for that reaction does to the work", "voices-c3d"],
      ["the sentence you tell yourself when the work stalls", "poisons-sentence"]
    ]) {
      const v = valueFor(s, id);
      if (v.empty) continue;
      body.push("- Stop: " + v.value + "  (" + lead + ")");
      if (v.verbatim) anyVerbatim = true;
    }
    if (hasAnyPick(s, "standing-ignored", "reread")) {
      body.push("- Stop: rereading the silence after a piece goes out.");
    }
    if (!body.length) body.push("> (not recorded)");
    else if (!anyVerbatim) body.push(CAVEAT);
    lines.push.apply(lines, block("Stop list", body));
  }

  // ---- 9. One test -------------------------------------
  {
    const body = [];
    const rung = valueFor(s, firstAnswered(s, ["fear-c3a", "fear-c3b", "fear-c3c", "fear-c3d"]));
    const seed = valueFor(s, "fear-c3");
    if (!rung.empty) body.push("The belief the downward arrow reached: " + rung.value);
    else if (!seed.empty) body.push("The belief the downward arrow reached: " + seed.value);
    else body.push("> (layer 1 did not reach a stated belief)");

    body.push("");
    body.push(typo(
      "A test would take the form of an implementation intention: " +
      "\"On <a specific trigger this month>, I <a small action I would not take if the belief were true>.\" " +
      "The session did not name the trigger or the action; fill them in yourself, and keep it small enough to be safe and real enough to tell you something."
    ));
    lines.push.apply(lines, block("One test", body));
  }

  // ---- 10. Open questions ------------------------------
  {
    const body = openQuestions(s);
    lines.push.apply(lines, block("Open questions", body.length ? body : ["> (none recorded)"]));
  }

  const markdown = withFootnote(lines.join("\n").replace(/\n{3,}/g, "\n\n").trim());
  persistCompass(date, markdown);
  return { markdown: markdown, title: "Compass: " + date, filename: "compass-" + date + ".md", mode: "passage" };
}

function firstAnswered(state, ids) {
  for (const id of ids) if (ans(state, id)) return id;
  return ids[0];
}

// ---- contradictions (stated as pairs, no resolution) ----------------------

function contradictions(s) {
  const out = [];

  // Independence as a life-value vs a stated ambition for standing.
  if (hasAnyPick(s, "prologue-c4", "a")) {
    const amb = valueFor(s, "role-c3");
    if (!amb.empty) {
      out.push("- You organise your life around not answering to anyone about what you make. You also want: " +
        amb.value + " You did not choose.");
    }
  }

  // Wanting the work seen vs the audience falling away being the signal of right.
  if (hasAnyPick(s, "prologue-c4", "d") || !valueFor(s, "standing-vain").empty) {
    if (hasAnyPick(s, "contact-c3", "b")) {
      out.push("- You want the work seen, and want it to count. You also say a piece is right when the question of what people think just leaves. You did not choose.");
    }
  }

  // Wanting not to need their approval vs still waiting for it.
  if (hasAnyPick(s, "fear-c5", "d")) {
    const wait = valueFor(s, "voices-c3");
    if (!wait.empty) {
      out.push("- Their wanting in still moves you, and that disgusts you. You are also still waiting on: " +
        wait.value + " You did not choose.");
    }
  }

  // A vain conclusion wanted vs admitting the drive was about being seen.
  if (!valueFor(s, "standing-vain").empty && hasAnyPick(s, "standing-secured", "less")) {
    out.push("- You want people to conclude something specific about you from the work. You also say that with your standing secured you would make less, and find out how much of the drive was about being seen. You did not choose.");
  }

  // Ten-year test: a project left off because it only exists for an audience.
  if (hasAnyPick(s, "voices-c2x", "a")) {
    out.push("- You keep a project you would not make if no one could see it for ten years. You also name an audience-free signal for when the work is right. You did not choose.");
  }

  return out;
}

// ---- style-workbook synthesis line --------------------------------------

function armStrength(s, ids) {
  let answered = 0;
  let verbatimCount = 0;
  for (const id of ids) {
    const a = ans(s, id);
    if (!a) continue;
    answered += 1;
    if (verbatim(a)) verbatimCount += 1;
  }
  return { strong: verbatimCount >= 1 || answered >= 3, answered: answered };
}

function synthesisLine(s) {
  // taste = layer 5 (Field); technique = layer 8 (Contact); voice = layers 1 & 6.
  const taste = armStrength(s, ["field-question", "field-defend", "field-repeats", "field-fright", "field-theft"]);
  const technique = armStrength(s, ["contact-c1b", "contact-c2", "contact-c3", "contact-c4", "contact-c5"]);
  const voice = armStrength(s, ["fear-c3", "fear-c6", "standing-vain", "standing-2am", "standing-2am-better"]);
  if (taste.strong && technique.strong && voice.strong) {
    return typo("Where taste (layer 5), technique (layer 8) and voice (layers 1 and 6) meet is the language. All three produced material; the intersection is yours to name from the lines above.");
  }
  return "";
}

// ---- open questions (inferred patterns, phrased as questions) ------------

function openQuestions(s) {
  const out = [];

  if (hasAnyPick(s, "field-first", "never")) {
    out.push("- You said nothing on the list has yet crossed over into being yours. What would have to be true of a piece for it to?");
  }
  if (hasAnyPick(s, "poisons-sentence-true", "unchecked")) {
    out.push("- The sentence you tell yourself when the work stalls has run for years unchecked. Is it true?");
  }
  if (hasAnyPick(s, "epoch-c6b", "d")) {
    out.push("- Is your refusal to be current a protection of something in the work, or a position you like having?");
  }
  if (hasAnyPick(s, "resource-c1", "d") || hasAnyPick(s, "resource-c2", "d")) {
    out.push("- Your real making hours came in under the guess. Which of the directions above does that put out of reach this year?");
  }
  if (hasAnyPick(s, "standing-2am-better", "argument")) {
    out.push("- If the work needs the argument between the statement self and the two a.m. self, what keeps that argument going on purpose?");
  }
  // Thin arc (taste / technique / voice) surfaced as a question rather than a claim.
  const taste = armStrength(s, ["field-question", "field-defend", "field-repeats", "field-fright", "field-theft"]);
  const technique = armStrength(s, ["contact-c1b", "contact-c2", "contact-c3", "contact-c4", "contact-c5"]);
  const voice = armStrength(s, ["fear-c3", "fear-c6", "standing-vain", "standing-2am", "standing-2am-better"]);
  const thin = [];
  if (!taste.strong) thin.push("taste (layer 5)");
  if (!technique.strong) thin.push("technique (layer 8)");
  if (!voice.strong) thin.push("voice (layers 1 and 6)");
  if (thin.length && thin.length < 3) {
    out.push("- The material is thin on " + thin.join(" and ") + ". What is there that a card did not manage to ask for?");
  }

  return out;
}

// ---- Compass persistence -------------------------------------------------

function persistCompass(date, markdown) {
  try {
    window.localStorage.setItem(
      "soulstice:v1:compass:" + date,
      JSON.stringify({ date: date, markdown: markdown })
    );
  } catch (e) {
    // No persistence available; the on-screen document still stands.
  }
}

// =====================================================================
// Lens verdict
// =====================================================================

export function buildLensVerdict(state) {
  const date = localDate();
  const s = state || {};
  const lines = ["# Lens verdict: " + date, ""];

  const said = collectVerbatim(s);
  lines.push("## What the work is actually doing");
  lines.push("");
  if (said.length) {
    for (const item of said) lines.push("- " + item.value);
  } else {
    lines.push("> (no answers recorded for this work yet)");
  }
  lines.push("");
  lines.push("## Questions it has not answered");
  lines.push("");
  lines.push("> (the Lens card flow, milestone 6, fills these from the skipped stems)");
  lines.push("");

  const markdown = withFootnote(lines.join("\n").trim());
  return { markdown: markdown, title: "Lens verdict: " + date, filename: "lens-" + date + ".md", mode: "lens" };
}

function collectVerbatim(s) {
  const out = [];
  const answers = s.answers || {};
  for (const id in answers) {
    const v = verbatim(answers[id]);
    if (v) out.push({ id: id, value: v });
  }
  return out;
}

// =====================================================================
// Statement (three lengths + Provenance + Gaps)
// =====================================================================

// The five authored Statement sections, each with the id of its one mandatory
// open card. A section counts as "covered" when that open card has the user's
// own words in it; an unanswered one lands in Gaps.
const STATEMENT_SECTION_OPENS = statementSections.map(function (sec) {
  return { title: sec.title, openId: sec.openId };
});

export function buildStatement(state) {
  const date = localDate();
  const s = state || {};

  // The log: every sentence the user typed herself, with the question behind it.
  const log = [];
  const answers = s.answers || {};
  for (const id in answers) {
    const v = verbatim(answers[id]);
    if (!v) continue;
    const card = CARD_INDEX[id];
    log.push({ ref: "L" + (log.length + 1), value: v, q: card ? card.question : id });
  }

  const pool = log.map(function (l) { return l.value; });
  const long = pool;
  const mid = pool.slice(0, 6);
  const short = pool.slice(0, 3);

  const lines = ["# Statement: " + date, ""];
  lines.push("> " + typo("These are your own unedited sentences, arranged. The Statement card flow (milestone 6) runs the draft-and-edit loop that turns them into finished prose. Nothing here is invented; if a length looks thin, the material is thin."));
  lines.push("");

  lines.push("## 400 words", "");
  lines.push(long.length ? long.join("\n\n") : "> (not enough material)");
  lines.push("");
  lines.push("## 150 words", "");
  lines.push(mid.length ? mid.join("\n\n") : "> (not enough material)");
  lines.push("");
  lines.push("## 50 words", "");
  lines.push(short.length ? short.join("\n\n") : "> (not enough material)");
  lines.push("");

  // Gaps: one line per section whose mandatory open card was left empty. A
  // section with an answered open card is real material and never listed here,
  // however few sentences it holds.
  lines.push("## Gaps", "");
  const gaps = [];
  for (const sec of STATEMENT_SECTION_OPENS) {
    if (!verbatim(ans(s, sec.openId))) {
      gaps.push("- " + typo(sec.title) + ": left unwritten.");
    }
  }
  if (gaps.length) {
    lines.push.apply(lines, gaps);
  } else if (STATEMENT_SECTION_OPENS.length) {
    lines.push("> (every section has your own words in it)");
  } else {
    lines.push("> (no sections defined)");
  }
  lines.push("");

  lines.push("## Provenance", "");
  if (log.length) {
    for (const l of log) {
      lines.push(l.ref + "  " + JSON.stringify(l.value));
      lines.push("     ← " + typo(phrase(l.q, 160)));
    }
  } else {
    lines.push("> (no typed sentences on record)");
  }
  lines.push("");

  const markdown = withFootnote(lines.join("\n").trim());
  return { markdown: markdown, title: "Statement: " + date, filename: "statement-" + date + ".md", mode: "statement" };
}

// =====================================================================
// Ground
// =====================================================================

export function buildGround(state) {
  const date = localDate();
  const s = state || {};
  const lines = ["# Ground: " + date, ""];

  // The verdict, in her words (the g0-verdict open card).
  const verdict = verbatim(ans(s, "g0-verdict"));
  lines.push("## The verdict she arrived with", "");
  lines.push(verdict || "> (not recorded)");
  lines.push("");

  // The evidence the session actually surfaced: the dated against-items and
  // the exact words she recalled.
  lines.push("## What the evidence actually showed", "");
  const evid = [];
  const againstA = ans(s, "g2-against");
  for (const p of picks(againstA)) evid.push(optionLabel("g2-against", p));
  const againstOther = other(againstA);
  if (againstOther) evid.push(againstOther);
  const dateSaid = valueFor(s, "g2-date");
  if (!dateSaid.empty) evid.push(dateSaid.value);
  if (evid.length) {
    for (const item of evid) lines.push("- " + item);
  } else {
    lines.push("> (not recorded)");
  }
  lines.push("");

  // The rewrite she could sign.
  const version = valueFor(s, "g2-version");
  lines.push("## The version she could sign", "");
  if (version.empty) {
    lines.push("> (not recorded)");
  } else if (version.verbatim) {
    lines.push(version.value);
  } else {
    lines.push(version.value, "", CAVEAT);
  }
  lines.push("");

  // One action, with its trigger.
  lines.push("## One action, today", "");
  const action = valueFor(s, "g3-action");
  const trigger = valueFor(s, "g3-trigger");
  if (action.empty && trigger.empty) {
    lines.push("> (not recorded)");
  } else {
    if (!action.empty) lines.push("- **The action:** " + action.value);
    if (!trigger.empty) lines.push("- **The trigger:** " + trigger.value);
  }
  lines.push("");

  // Three projects, in her words (the g4-p1..p3 open cards).
  lines.push("## Three projects", "");
  const pids = ["g4-p1", "g4-p2", "g4-p3"];
  for (let i = 0; i < pids.length; i++) {
    const t = text(ans(s, pids[i]));
    lines.push("### " + (i + 1) + ".");
    lines.push(t || "> (left blank)");
    lines.push("");
  }

  const markdown = withFootnote(lines.join("\n").trim());
  return { markdown: markdown, title: "Ground: " + date, filename: "ground-" + date + ".md", mode: "ground" };
}

// =====================================================================
// Journal entry
// =====================================================================

export function buildJournalEntry(state) {
  const date = localDate();
  const s = state || {};
  const layerKey = s.cursor && s.cursor.section ? s.cursor.section : (s.completed && s.completed[s.completed.length - 1]) || "";
  const layer = passageLayers.find(function (l) { return l.key === layerKey; });
  const layerName = layer ? layer.title : (layerKey || "Layer");
  const opening = layer && layer.cards[layer.entry] ? layer.cards[layer.entry].question : "";

  const said = collectVerbatim(s);
  const lines = ["---", "", "## " + date + ": " + typoTitle(layerName), ""];
  lines.push("**Asked:** " + (opening ? typo(phrase(opening, 200)) : "> (not recorded)"));
  lines.push("");
  lines.push("**Said:**");
  if (said.length) {
    for (const item of said) lines.push(item.value);
  } else {
    lines.push("> (no answers in your own words this sitting)");
  }
  lines.push("");
  lines.push("**Changed since last time:** " + "—");
  lines.push("");
  lines.push("**Carried forward:** " + "—");
  lines.push("");

  const markdown = withFootnote(lines.join("\n").trim());
  return { markdown: markdown, title: "Journal entry: " + date, filename: "journal-" + date + ".md", mode: "journal" };
}

// =====================================================================
// Drift review (every fifth journal entry)
// =====================================================================

export function buildDriftReview(entries) {
  const date = localDate();
  const list = Array.isArray(entries) ? entries : [];
  const lines = ["---", "", "## " + date + ": Drift review", ""];

  if (list.length) {
    const first = list[0];
    const last = list[list.length - 1];
    const fd = (first && (first.date || first.at)) || "the first entry";
    const ld = (last && (last.date || last.at)) || "the latest entry";
    // No typo() here: the values may be ISO dates and typo() would en-dash them.
    lines.push("Entries under review: " + list.length + ", from " + fd + " to " + ld + ".");
    lines.push("");
  }

  lines.push("- What has moved since the first entry:");
  lines.push("- What recurs untouched across entries, in your own repeated words:");
  lines.push("- What you have stopped mentioning:");
  lines.push("- One question the journal has been avoiding:");
  lines.push("");
  lines.push("> " + typo("This review needs your reading. The instrument holds the entries; it does not decide what they mean."));
  lines.push("");

  const markdown = withFootnote(lines.join("\n").trim());
  return { markdown: markdown, title: "Drift review: " + date, filename: "drift-review-" + date + ".md", mode: "journal" };
}

// =====================================================================
// Return (appended under a dated heading to an existing Compass)
// =====================================================================

export function buildReturn(compassDoc, state) {
  const date = localDate();
  const s = state || {};
  const doc = compassDoc || {};
  const origDate = doc.date || matchCompassDate(doc.markdown) || "";

  const said = collectVerbatim(s);
  const lines = ["---", "", "## Return: " + date, ""];
  lines.push("### What happened to each direction", "");
  if (said.length) {
    for (const item of said) lines.push("- " + item.value);
  } else {
    lines.push("> (not recorded)");
  }
  lines.push("");
  lines.push("### What happened to the one test", "");
  lines.push("> (not recorded)");
  lines.push("");
  lines.push("### What has drifted", "");
  lines.push("> (not recorded)");
  lines.push("");
  lines.push("### Revised directions", "");
  lines.push("> (not recorded)");
  lines.push("");

  const markdown = withFootnote(lines.join("\n").trim());
  const filename = origDate ? "compass-" + origDate + ".md" : "return-" + date + ".md";
  return { markdown: markdown, title: "Return: " + date, filename: filename, mode: "return" };
}

function matchCompassDate(md) {
  const m = String(md || "").match(/Compass:\s*(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : "";
}

// =====================================================================
// Output screen
// =====================================================================

export function renderOutputScreen(doc, mountNode) {
  const d = doc || {};
  const root = el("section", { class: "screen-panel output", id: "output", "data-role": "output" });

  root.appendChild(el("span", { class: "card__label" }, d.title || "Output"));

  const article = el("div", { class: "output-doc", "data-role": "output-doc" });
  article.appendChild(mdToDom(d.markdown || ""));
  // The footnote is the last block of the document markdown (rule + one line).
  // Tag that trailing paragraph so the screen and print.css render it small and
  // greyed, as the final block rather than a running footer.
  const kids = article.children;
  const tail = kids.length ? kids[kids.length - 1] : null;
  if (tail && tail.tagName && tail.tagName.toLowerCase() === "p") {
    tail.className = "output-doc__footnote";
    tail.setAttribute("data-role", "footnote");
  }
  root.appendChild(article);

  const actions = el("div", { class: "output__actions", "data-role": "output-actions" });

  // Save as PDF: prepare nothing extra (the document is already in #output,
  // styled by print.css) and hand off to the browser's print-to-PDF.
  const pdfBtn = el("button", {
    class: "btn btn--pdf", type: "button", "data-role": "save-pdf"
  }, "Save as PDF");
  pdfBtn.addEventListener("click", function () { window.print(); });
  actions.appendChild(pdfBtn);

  // Quiet secondary: copy the plain document text to the clipboard.
  const copied = el("span", {
    class: "output__copied", "data-role": "copied", hidden: true,
    style: "align-self:center;font-size:var(--fs-small);color:var(--red-text)"
  }, "copied");
  const copyBtn = el("button", {
    class: "btn btn--ghost btn--copy", type: "button", "data-role": "copy-text"
  }, "Copy text");
  copyBtn.addEventListener("click", function () {
    copyPlainText(d.markdown || "", function () {
      copied.hidden = false;
      window.setTimeout(function () { copied.hidden = true; }, 2000);
    });
  });
  actions.appendChild(copyBtn);
  actions.appendChild(copied);

  root.appendChild(actions);

  root.appendChild(el("p", {
    class: "output__hint", "data-role": "pdf-hint",
    style: "font-size:var(--fs-small);color:var(--ink-soft);margin:0 0 var(--step)"
  }, typo("In the print dialog, choose \"Save as PDF\" as the destination.")));

  if (d.mode) root.appendChild(renderLlmKit(d.mode, d.markdown || ""));

  if (mountNode) {
    mountNode.replaceChildren(root);
    // Land at the top of the finished document, not wherever the last card left
    // the scroll. Mirrors mountScreen / app.js mount().
    if (!root.hasAttribute("tabindex")) root.setAttribute("tabindex", "-1");
    try {
      root.focus({ preventScroll: true });
    } catch (e) {
      root.focus();
    }
    window.scrollTo(0, 0);
  }
  return root;
}

// ---- the prompt kit: carry the finished document into a language model ------
// Its own framed block, set apart from the red-ruled document. One copy button
// per prompt; each copy joins the prompt to the document so one paste is enough.

function renderLlmKit(mode, markdown) {
  const kit = llmKit(mode);
  const root = el("section", { class: "llm-kit", "data-role": "llm-kit", "data-mode": mode });

  root.appendChild(el("span", { class: "card__label llm-kit__label" }, "Take it further"));
  root.appendChild(el("p", { class: "llm-kit__note", "data-role": "llm-note" }, typo(kit.note)));
  root.appendChild(el("p", { class: "llm-kit__intro" }, typo(kit.intro)));

  const list = el("ol", { class: "llm-kit__list" });
  for (const p of kit.prompts) {
    const item = el("li", { class: "llm-kit__item" });
    item.appendChild(el("span", { class: "llm-kit__name" }, typo(p.label)));

    const box = el("p", { class: "llm-kit__text", "data-role": "llm-prompt" }, typo(p.text));
    item.appendChild(box);

    const done = el("span", {
      class: "llm-kit__copied", "data-role": "llm-copied", hidden: true
    }, "copied");
    const btn = el("button", {
      class: "btn btn--ghost llm-kit__copy", type: "button", "data-role": "llm-copy"
    }, "Copy prompt with document");
    btn.addEventListener("click", function () {
      const joined = typo(p.text) + "\n\n---\n\n" + markdown;
      copyPlainText(joined, function () {
        done.hidden = false;
        window.setTimeout(function () { done.hidden = true; }, 2000);
      });
    });
    item.appendChild(btn);
    item.appendChild(done);
    list.appendChild(item);
  }
  root.appendChild(list);
  return root;
}

// ---- clipboard (event-driven; async API, then a hidden-textarea fallback) ---

function copyPlainText(input, onOk) {
  const txt = String(input == null ? "" : input);
  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard.writeText(txt).then(
        function () { onOk(); },
        function () { legacyCopy(txt, onOk); }
      );
      return;
    }
  } catch (e) {
    // fall through to the legacy path
  }
  legacyCopy(txt, onOk);
}

function legacyCopy(txt, onOk) {
  try {
    const ta = document.createElement("textarea");
    ta.value = txt;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    onOk();
  } catch (e) {
    // Copy is unavailable; the document stays on screen to select by hand.
  }
}

// ---- minimal Markdown -> DOM (headings, rules, quotes, lists, paragraphs) ---

function mdToDom(markdown) {
  const frag = document.createDocumentFragment();
  const src = String(markdown || "").replace(/\r\n/g, "\n").split("\n");
  let list = null;
  let para = [];

  function flushPara() {
    if (!para.length) return;
    frag.appendChild(el("p", null, para.join(" ")));
    para = [];
  }
  function flushList() {
    if (list) { frag.appendChild(list); list = null; }
  }

  for (const raw of src) {
    const line = raw.replace(/\s+$/, "");
    if (!line.trim()) { flushPara(); flushList(); continue; }

    let m;
    if ((m = line.match(/^(#{1,6})\s+(.*)$/))) {
      flushPara(); flushList();
      const level = Math.min(m[1].length, 6);
      frag.appendChild(el("h" + level, null, m[2]));
      continue;
    }
    if (/^---+$/.test(line)) {
      flushPara(); flushList();
      frag.appendChild(el("hr"));
      continue;
    }
    if ((m = line.match(/^>\s?(.*)$/))) {
      flushPara(); flushList();
      frag.appendChild(el("blockquote", null, m[1]));
      continue;
    }
    if ((m = line.match(/^[-*]\s+(.*)$/))) {
      flushPara();
      if (!list) list = el("ul");
      list.appendChild(el("li", null, m[1]));
      continue;
    }
    if ((m = line.match(/^(\d+)\.\s+(.*)$/))) {
      flushPara();
      if (!list || list.tagName.toLowerCase() !== "ol") { flushList(); list = el("ol"); }
      list.appendChild(el("li", null, m[2]));
      continue;
    }
    flushList();
    para.push(line);
  }
  flushPara();
  flushList();
  return frag;
}

export default {
  buildCompass: buildCompass,
  buildLensVerdict: buildLensVerdict,
  buildStatement: buildStatement,
  buildGround: buildGround,
  buildJournalEntry: buildJournalEntry,
  buildDriftReview: buildDriftReview,
  buildReturn: buildReturn,
  renderOutputScreen: renderOutputScreen,
  localDate: localDate
};
