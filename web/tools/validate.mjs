// Soulstice — data validator. ESM, no dependencies. Run: node web/tools/validate.mjs
//
// Loads every authored card section and asserts, across EVERY card in EVERY
// section:
//   1. card ids are globally unique (collisions report both owners)
//   2. every section `entry` resolves to a card in that section
//   3. every `next` value is a card id in the SAME section, or { _end: true },
//      or the string "_arc-break"
//   4. every kind:"single" card has a route for each option id OR a _default,
//      AND an _other or a _default
//   5. every `header` is <= 12 characters
//
// Exit code 0 means clean; 1 means at least one error was found.

import { passageLayers } from "../data/manifest.js";
import groundSection from "../data/ground.js";
import lensSection from "../data/lens.js";
import { statementSections } from "../data/statement.js";
import { workbookExercises } from "../data/workbook.js";

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

// ---- assemble the list of sections to check ------------------------------

const sections = [];
for (const layer of passageLayers) sections.push({ owner: "passage/" + layer.key, section: layer });
sections.push({ owner: "ground", section: groundSection });
sections.push({ owner: "lens", section: lensSection });
for (const s of statementSections) sections.push({ owner: "statement/" + s.key, section: s });
for (const ex of workbookExercises) {
  const card = ex.card;
  sections.push({
    owner: "workbook/" + ex.key,
    section: { key: "ex-" + ex.key, title: ex.title, entry: card.id, cards: { [card.id]: card } }
  });
}

// ---- 1. global id uniqueness ------------------------------------------------

const idOwner = new Map();
for (const { owner, section } of sections) {
  for (const cid in section.cards) {
    const card = section.cards[cid];
    if (card.id !== cid) {
      err(`[${owner}] card key "${cid}" !== card.id "${card.id}"`);
    }
    if (idOwner.has(cid)) {
      err(`duplicate card id "${cid}" — owned by both [${idOwner.get(cid)}] and [${owner}]`);
    } else {
      idOwner.set(cid, owner);
    }
  }
}

// ---- 2..5 per-section checks ---------------------------------------------

for (const { owner, section } of sections) {
  const ids = new Set(Object.keys(section.cards));

  // 2. entry resolves
  if (!section.entry || !ids.has(section.entry)) {
    err(`[${owner}] entry "${section.entry}" is not a card in this section`);
  }

  for (const cid in section.cards) {
    const card = section.cards[cid];
    const where = `[${owner}] ${cid}`;

    // 5. header length
    if (typeof card.header === "string" && card.header.length > 12) {
      err(`${where}: header "${card.header}" is ${card.header.length} chars (> 12)`);
    }

    // 3. next targets
    const next = card.next || {};
    if (!card.next) {
      err(`${where}: no next map`);
    }
    let hasEndOrArc = next._end === true;
    for (const key of Object.keys(next)) {
      const val = next[key];
      if (key === "_end") {
        if (val !== true) err(`${where}: next._end must be true, got ${JSON.stringify(val)}`);
        continue;
      }
      if (val === true) {
        // acceptable only as a redundant sibling of _end:true (means "end")
        if (next._end !== true) {
          err(`${where}: next.${key} === true but no _end:true alongside it`);
        }
        continue;
      }
      if (val && typeof val === "object" && val._end === true) {
        err(`${where}: next.${key} is a nested { _end: true } object; use next: { _end: true }`);
        continue;
      }
      if (typeof val !== "string") {
        err(`${where}: next.${key} is ${JSON.stringify(val)} (expected a card id string)`);
        continue;
      }
      if (val === "_arc-break") { hasEndOrArc = true; continue; }
      if (!ids.has(val)) {
        err(`${where}: next.${key} -> "${val}" is not a card id in [${owner}]`);
      }
    }

    // 4. single completeness — skip cards that are explicitly terminal
    //    (next: { _end: true }); those legitimately route every pick to
    //    end-of-section.
    if (card.kind === "single" && next._end !== true) {
      const opts = Array.isArray(card.options) ? card.options : [];
      const hasDefault = typeof next._default === "string" || next._default === true;
      for (const o of opts) {
        const routed = Object.prototype.hasOwnProperty.call(next, o.id) || hasDefault;
        if (!routed) err(`${where}: single option "${o.id}" has no route and no _default`);
      }
      const hasOther = Object.prototype.hasOwnProperty.call(next, "_other") || hasDefault;
      if (!hasOther) err(`${where}: single card has neither _other nor _default`);
      if (!opts.length) warn(`${where}: kind "single" with no options`);
    }

    // a card that resolves nowhere: no string targets, no _end, no _arc-break
    const anyStringTarget = Object.keys(next).some(
      (k) => k !== "_end" && typeof next[k] === "string" && next[k] !== "_arc-break"
    );
    if (!anyStringTarget && !hasEndOrArc && next._default !== true) {
      err(`${where}: next has no reachable target and no _end / _arc-break`);
    }
  }
}

// ---- report ------------------------------------------------------------------

const sectionCount = sections.length;
const cardCount = idOwner.size;

for (const w of warnings) console.log("warning: " + w);
for (const e of errors) console.log("ERROR:   " + e);

console.log(
  `\nvalidate: ${sectionCount} sections, ${cardCount} cards, ` +
  `${errors.length} error(s), ${warnings.length} warning(s)`
);

process.exit(errors.length ? 1 : 0);
