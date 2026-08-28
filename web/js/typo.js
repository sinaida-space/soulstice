// Soulstice — typography helper for OUTPUT ASSEMBLY ONLY.
//
// Apply this to strings the assembler itself writes: section captions,
// connective sentences, dated headings, scaffold lines. NEVER pass it a
// user's verbatim answer (`answer.other` / `answer.text`). Those go into the
// document untouched, awkwardness and all — that is the whole point of the
// Compass.
//
// What it does, and nothing more:
//   - "..."            -> "…"
//   - " — " / " – "    -> ". "   (a spaced dash used as rhetoric becomes a stop)
//   - 10-20            -> 10–20  (en dash for a numeric range)
//   - 3 x 4 / 3x4      -> 3×4    (multiplication sign for dimensions)
//   - straight quotes  -> curly  (’ for apostrophes, “ ” for doubles)
//   - one/two-letter word + space -> word + non-breaking space
//   - typoTitle() also glues the final two words of a heading / list item.

const SHORT_WORD = /\b([A-Za-z]{1,2})[ \t]+/g;

export function typo(input) {
  if (input == null) return "";
  let s = String(input);

  s = s.replace(/\.\.\./g, "…");

  // A spaced em/en dash is rhetorical here; rewrite it to a full stop. Numeric
  // ranges use an unspaced dash and are handled on the next line, so they are
  // untouched by this.
  s = s.replace(/[ \t]+[—–][ \t]+/g, ". ");

  s = s.replace(/(\d)\s*-\s*(\d)/g, "$1–$2");
  s = s.replace(/(\d)\s*[xX]\s*(\d)/g, "$1×$2");

  s = s.replace(/([A-Za-z])'([A-Za-z])/g, "$1’$2");
  s = s.replace(/'/g, "’");
  s = s.replace(/"([^"]*)"/g, "“$1”");
  s = s.replace(/"/g, "”");

  // nbsp after short words; run twice so runs like "a a" both catch.
  s = s.replace(SHORT_WORD, "$1 ");
  s = s.replace(SHORT_WORD, "$1 ");

  return s;
}

// Heading / list-item variant: everything typo() does, plus a non-breaking
// space between the last two words so one word never wraps alone.
export function typoTitle(input) {
  let s = typo(input);
  s = s.replace(/\s+(\S+)\s*$/, " $1");
  return s;
}

export default typo;
