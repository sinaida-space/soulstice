// Soulstice — Journal mode data (thin). The layer picker reuses the Passage
// layer modules verbatim from the manifest; nothing here forks card content.
// This module only exposes the layer list, the running-entry store, and the
// every-fifth-entry drift-review trigger.

import { passageLayers } from "./manifest.js";

// Prologue plus the eleven layers, in Passage order.
export const journalLayers = passageLayers;

// The running-entry log lives in its own sub-namespace. `soulstice:v1:journal`
// itself is reserved by Store for the Journal *mode* session (see web/README.md),
// so the accumulated entries hang off it as `:journal:entries`, the same way
// stored Compass docs hang off `:compass:<date>`.
export const JOURNAL_STORE_KEY = "soulstice:v1:journal:entries";
export const DRIFT_EVERY = 5;

// The store is a plain JSON array of { date, markdown }. Every access is guarded;
// a blocked store just yields an empty history for this sitting.
export function readJournalEntries() {
  try {
    const raw = window.localStorage.getItem(JOURNAL_STORE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    return [];
  }
}

export function appendJournalEntry(entry) {
  const entries = readJournalEntries();
  entries.push(entry);
  try {
    window.localStorage.setItem(JOURNAL_STORE_KEY, JSON.stringify(entries));
  } catch (e) {
    // history will not persist; the on-screen entry still stands
  }
  return entries;
}

// A drift review is offered instead of a new layer once the count is a non-zero
// multiple of five.
export function driftDue(count) {
  return count > 0 && count % DRIFT_EVERY === 0;
}

export default {
  journalLayers: journalLayers,
  JOURNAL_STORE_KEY: JOURNAL_STORE_KEY,
  DRIFT_EVERY: DRIFT_EVERY,
  readJournalEntries: readJournalEntries,
  appendJournalEntry: appendJournalEntry,
  driftDue: driftDue
};
