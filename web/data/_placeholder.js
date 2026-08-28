// Soulstice — M0 placeholder layer. Replaced by real Prologue / layer
// content in M1-M3. Shape matches the frozen layer/section module contract.

export default {
  key: "prologue",
  title: "Prologue",
  arc: 1,
  intro: "",
  entry: "prologue-c1",
  cards: {
    "prologue-c1": {
      id: "prologue-c1",
      kind: "single",
      question: "Placeholder: which of these is closest to why you opened this?",
      header: "Why here",
      note: "Placeholder data. Real content arrives in a later milestone.",
      options: [
        { id: "a", label: "I want to understand my own work.", desc: "Placeholder sharpening detail." },
        { id: "b", label: "I am stuck and repeating myself.", desc: "Placeholder sharpening detail." }
      ],
      multiSelectHint: false,
      next: {
        a: "prologue-c2",
        b: "prologue-c2",
        _other: "prologue-c2",
        _default: "prologue-c2"
      }
    },
    "prologue-c2": {
      id: "prologue-c2",
      kind: "open",
      question: "Placeholder: write one true sentence about the work you make.",
      header: "One line",
      note: "",
      options: [],
      multiSelectHint: false,
      next: { _end: true }
    }
  }
};
