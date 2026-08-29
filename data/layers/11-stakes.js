// Soulstice — Passage layer 11: Stakes, plus the three-sentence manifesto and
// the closing move. This is the last layer in the Passage, so a completed
// closing card yields the done state.
// Source: references/layers.md (layer 11, closing move), style-workbook.md
// (the three-sentence manifesto).
//
// The 20-year card is single on purpose: the cut is the point, no multi-select.
// Its options are four broad shapes of a life’s-work outcome plus one that is
// deliberately larger than most would claim; the interface adds Other.
// The real-person card’s last option ("nobody, and that is the honest answer")
// is not framed as a problem; if it is true it stands and goes to the Compass.
//
// Compass, verbatim: the closing answer to stakes-close goes at the very TOP of
// the Compass. The three manifesto completions (stakes-m1, stakes-m2, stakes-m3)
// go into the Compass verbatim, together, as written.

export default {
  key: "stakes",
  title: "Stakes",
  arc: 3,
  intro: "",
  entry: "stakes-c1",
  cards: {
    "stakes-c1": {
      id: "stakes-c1",
      kind: "single",
      question: "Twenty more working years. One of these has to exist by the end of them. Which one, if you can only have one?",
      header: "Twenty years",
      note: "Single choice. The cut is the point.",
      options: [
        { id: "a", label: "A body of work with a through-line a stranger could recognise as one person’s.", desc: "Coherence across the whole span." },
        { id: "b", label: "One piece, or a small handful, that went as far as the idea could actually go.", desc: "Depth over breadth. Everything into a few things." },
        { id: "c", label: "A way of working that other people picked up and carried past me.", desc: "The method outliving the maker." },
        { id: "d", label: "A living made entirely from the work, on my own terms, for the whole span.", desc: "Survival as an artist counted as the outcome." },
        { id: "e", label: "Work that changed how the form is done, so the field is different for my having been in it.", desc: "Larger than most would say out loud. Pick it if it is true." }
      ],
      multiSelectHint: false,
      next: { _other: "stakes-c2", _default: "stakes-c2" }
    },
    "stakes-c2": {
      id: "stakes-c2",
      kind: "single",
      question: "Now five years. Same question, smaller frame. What has to exist by then?",
      header: "Five years",
      note: "",
      options: [
        { id: "a", label: "Three or four pieces I would still defend, made on purpose rather than by accident.", desc: "A small deliberate run." },
        { id: "b", label: "One work bigger and more exposed than anything I have risked so far.", desc: "A single step up in scale." },
        { id: "c", label: "A working rhythm I can sustain without a crisis every time.", desc: "The practice made survivable." },
        { id: "d", label: "Enough income from the work that it stops being the thing I do after everything else.", desc: "A shift in where it sits in the day." }
      ],
      multiSelectHint: false,
      next: { _other: "stakes-c3", _default: "stakes-c3" }
    },
    "stakes-c3": {
      id: "stakes-c3",
      kind: "single",
      question: "What would you regret not attempting more than you would regret attempting badly?",
      header: "Regret",
      note: "",
      options: [
        { id: "a", label: "The large, public, expensive piece that could fail in front of everyone.", desc: "The one with real exposure attached." },
        { id: "b", label: "Asking one particular person to work with me.", desc: "A named collaboration you keep not proposing." },
        { id: "c", label: "The direction that would make people say I had changed, or lost it.", desc: "The turn that costs you your current readership." },
        { id: "d", label: "Putting the work first for one clear stretch, to find out what it does.", desc: "The experiment you have never actually run." }
      ],
      multiSelectHint: false,
      next: { _other: "stakes-c4", _default: "stakes-c4" }
    },
    "stakes-c4": {
      id: "stakes-c4",
      kind: "single",
      question: "Name a real person who needs this work to exist.",
      header: "Needs it",
      note: "",
      options: [
        { id: "a", label: "A specific person I have worked with, who is waiting for the next thing.", desc: "A real name, a real expectation." },
        { id: "b", label: "A stranger in an audience I will never meet, in the state I was in when a work once reached me.", desc: "The person you were making for without knowing them." },
        { id: "c", label: "The version of me at nineteen who needed to see it was possible.", desc: "An earlier self as the addressee." },
        { id: "d", label: "Nobody, and that is the honest answer.", desc: "If it is true, it stands. It goes into the Compass as it is." }
      ],
      multiSelectHint: false,
      next: { _other: "stakes-c5", _default: "stakes-c5" }
    },
    "stakes-c5": {
      id: "stakes-c5",
      kind: "single",
      question: "What are you willing to be worse at in order to be better at this?",
      header: "Worse at",
      note: "",
      options: [
        { id: "a", label: "Money. Earning less, for longer, than people my age expect me to.", desc: "Income traded for room to work." },
        { id: "b", label: "Output. Making fewer things and letting the count look thin.", desc: "Volume traded for depth." },
        { id: "c", label: "A skill I am proud of and known for, if this direction does not need it.", desc: "Letting a strength go quiet." },
        { id: "d", label: "A relationship to a scene. Being around less, current less, liked less.", desc: "Social standing traded for focus." }
      ],
      multiSelectHint: false,
      next: { _other: "stakes-m1", _default: "stakes-m1" }
    },
    "stakes-m1": {
      id: "stakes-m1",
      kind: "open",
      question: "Finish the sentence in your own words. I make work for people who…",
      header: "For people",
      note: "",
      options: [],
      multiSelectHint: false,
      next: { _default: "stakes-m2" }
    },
    "stakes-m2": {
      id: "stakes-m2",
      kind: "open",
      question: "Next line. My work is always about…",
      header: "Always about",
      note: "",
      options: [],
      multiSelectHint: false,
      next: { _default: "stakes-m3" }
    },
    "stakes-m3": {
      id: "stakes-m3",
      kind: "open",
      question: "Last line. My work will never be about…",
      header: "Never about",
      note: "",
      options: [],
      multiSelectHint: false,
      next: { _default: "stakes-close" }
    },
    "stakes-close": {
      id: "stakes-close",
      kind: "open",
      question: "One last thing, and I will not comment on it. What did you not say in this session?",
      header: "Not said",
      note: "",
      options: [],
      multiSelectHint: false,
      next: { _end: true }
    }
  }
};
