// Soulstice — state store. FROZEN CONTRACT (see issue #1).
//
//   Store.load(mode)      -> state object (fresh if none saved)
//   Store.save(mode, state)
//   Store.reset(mode)
//   Store.listSaved()     -> [{ mode, updatedAt, cursorLabel }]
//   Store.listCompasses() -> [{ date, key }]   (namespace reserved for M4)
//
// All localStorage access is wrapped in try/catch. If the store is unavailable
// (private mode, blocked), it degrades to an in-memory map and Store.isDegraded()
// returns true so the app can show a one-line non-blocking notice.

const NS = "soulstice:v1:";
export const MODES = ["passage", "journal", "lens", "ground", "statement", "return"];
const STATE_VERSION = 1;

const mem = new Map();
let degraded = false;

function lsGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    degraded = true;
    return mem.has(key) ? mem.get(key) : null;
  }
}

function lsSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    degraded = true;
    mem.set(key, value);
  }
}

function lsRemove(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    degraded = true;
    mem.delete(key);
  }
}

function lsKeys() {
  try {
    const out = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      out.push(window.localStorage.key(i));
    }
    return out;
  } catch (e) {
    degraded = true;
    return Array.from(mem.keys());
  }
}

function freshState(mode) {
  const now = Date.now();
  return {
    mode,
    version: STATE_VERSION,
    startedAt: now,
    updatedAt: now,
    cursor: null, // null = not started; app sets { section, card } or { done: true }
    answers: {},
    arcBreaks: {},
    completed: []
  };
}

function cursorLabel(cursor) {
  if (!cursor) return "not started";
  if (cursor.done) return "complete";
  return (cursor.section || "?") + " / " + (cursor.card || "?");
}

export const Store = {
  load(mode) {
    const raw = lsGet(NS + mode);
    if (!raw) return freshState(mode);
    try {
      const s = JSON.parse(raw);
      if (!s || typeof s !== "object" || s.version !== STATE_VERSION) {
        return freshState(mode);
      }
      // Backfill any missing containers so callers never guard for them.
      s.mode = mode;
      s.answers = s.answers || {};
      s.arcBreaks = s.arcBreaks || {};
      s.completed = s.completed || [];
      if (!("cursor" in s)) s.cursor = null;
      return s;
    } catch (e) {
      return freshState(mode);
    }
  },

  save(mode, state) {
    state.mode = mode;
    state.version = STATE_VERSION;
    state.updatedAt = Date.now();
    lsSet(NS + mode, JSON.stringify(state));
    return state;
  },

  reset(mode) {
    lsRemove(NS + mode);
  },

  listSaved() {
    const out = [];
    for (const mode of MODES) {
      const raw = lsGet(NS + mode);
      if (!raw) continue;
      try {
        const s = JSON.parse(raw);
        if (!s || s.version !== STATE_VERSION) continue;
        out.push({
          mode,
          updatedAt: s.updatedAt || s.startedAt || 0,
          cursorLabel: cursorLabel(s.cursor)
        });
      } catch (e) {
        // ignore an unreadable slot
      }
    }
    out.sort((a, b) => b.updatedAt - a.updatedAt);
    return out;
  },

  // M4 writes soulstice:v1:compass:<date> as JSON { date, markdown }.
  // Return them newest-first, carrying the stored markdown for Return mode.
  listCompasses() {
    const prefix = NS + "compass:";
    const out = [];
    for (const k of lsKeys()) {
      if (typeof k !== "string" || k.indexOf(prefix) !== 0) continue;
      const date = k.slice(prefix.length);
      let markdown = "";
      try {
        const doc = JSON.parse(lsGet(k));
        if (doc && typeof doc.markdown === "string") markdown = doc.markdown;
      } catch (e) {
        // an unreadable slot still lists, just without its markdown
      }
      out.push({ date, key: k, markdown });
    }
    out.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
    return out;
  },

  isDegraded() {
    return degraded;
  }
};

export default Store;
