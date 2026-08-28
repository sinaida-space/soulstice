// Soulstice — Return mode data (thin). Return reopens the most recent Compass
// and checks it against what actually happened. This module parses a stored
// Compass markdown for its three directions and its one test; the flow itself
// lives in js/modes/secondary.js.

export const RETURN_DIRECTION_PROMPT = "What happened to this direction?";
export const RETURN_TEST_PROMPT = "The one test from this Compass. Did you run it, and what did it show?";
// Asked once, after every direction and the test have been accounted for.
export const RETURN_DRIFT_PROMPT =
  "Across all three directions and the test: what has drifted from what the Compass set out? What is no longer true?";
export const RETURN_REVISED_PROMPT =
  "Rewrite the directions as they stand now. For each: keep it, drop it, or replace it, and say the new one.";

// Pull the numbered directions and the first line of the one-test section out of
// a Compass document (the shape buildCompass writes in js/output.js).
export function parseCompass(markdown) {
  const lines = String(markdown || "").replace(/\r\n/g, "\n").split("\n");

  function sectionLines(name) {
    const start = lines.findIndex(function (l) { return l.trim() === "## " + name; });
    if (start < 0) return [];
    const out = [];
    for (let i = start + 1; i < lines.length; i++) {
      if (/^##\s/.test(lines[i])) break;
      out.push(lines[i]);
    }
    return out;
  }

  const dirRaw = sectionLines("Three directions").map(function (l) { return l.trim(); });
  let directions = dirRaw
    .filter(function (l) { return /^\d+\.\s+/.test(l); })
    .map(function (l) { return l.replace(/^\d+\.\s+/, "").trim(); });

  if (!directions.length) {
    directions = dirRaw
      .filter(function (l) { return /^>\s+\S/.test(l) && !/not enough material/i.test(l); })
      .map(function (l) { return l.replace(/^>\s+/, "").trim(); });
  }

  const testRaw = sectionLines("One test").map(function (l) { return l.trim(); }).filter(Boolean);
  let test = "";
  for (const l of testRaw) {
    if (/^>/.test(l)) continue;
    if (/^A test would take the form/i.test(l)) continue;
    test = l;
    break;
  }
  if (!test && testRaw.length) test = testRaw[0].replace(/^>\s*/, "");

  return { directions: directions.slice(0, 3), test: test };
}

export default {
  RETURN_DIRECTION_PROMPT: RETURN_DIRECTION_PROMPT,
  RETURN_TEST_PROMPT: RETURN_TEST_PROMPT,
  RETURN_DRIFT_PROMPT: RETURN_DRIFT_PROMPT,
  RETURN_REVISED_PROMPT: RETURN_REVISED_PROMPT,
  parseCompass: parseCompass
};
