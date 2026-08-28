// Soulstice — Passage layer 7: Poisons. Last layer of Arc II.
// After: the specific distortions that comparison, envy, resentment, cynicism
// and despair put on her judgement of her own work. This layer is extraction,
// not penance: every named poison must leave it converted into a stated want
// or a stated avoidance. The final card routes to the Arc II break.
//
// Method note folded in: two pieces measuring two different things, one made
// to find something out and one made to be seen finding it out (Two motives /
// Trust which).

export default {
  key: "poisons",
  title: "Poisons",
  arc: 2,
  intro: "",
  entry: "poisons-success",
  cards: {
    "poisons-success": {
      id: "poisons-success",
      kind: "single",
      question: "Somebody’s success is hard to look at. Not the one you admire, the one that stings. What exactly do they have?",
      header: "Stings",
      note: "",
      options: [
        { id: "ease", label: "Ease. It looks like it costs them nothing.", desc: "The work seems to arrive without the struggle yours takes." },
        { id: "access", label: "Access. The right people already know them.", desc: "Doors that are open before they knock." },
        { id: "permission", label: "Permission. They make the obvious thing and nobody calls it obvious.", desc: "They get away with what you would be scolded for." },
        { id: "time", label: "Time. They are not doing three other jobs.", desc: "Whole days for the work that you take in fragments." }
      ],
      multiSelectHint: false,
      next: { _default: "poisons-convert" }
    },

    // The conversion card. Envy is a wanting signal with poor aim; this turns
    // it into a first-person want. No poison leaves this layer unconverted.
    "poisons-convert": {
      id: "poisons-convert",
      kind: "single",
      question: "If that is what they have, what is it pointing at in you? Say it as a want, in the first person.",
      header: "Points at",
      note: "",
      options: [
        { id: "slow", label: "I want to make one thing slowly enough to get it right, without apologising for the time.", desc: "" },
        { id: "room", label: "I want to be in the room where the decisions get made, not hear about them after.", desc: "" },
        { id: "plain", label: "I want to make the plain, direct thing I keep talking myself out of.", desc: "" },
        { id: "named", label: "I want someone with standing to say my name in a room I am not in.", desc: "" }
      ],
      multiSelectHint: false,
      next: { _default: "poisons-abandon" }
    },

    "poisons-abandon": {
      id: "poisons-abandon",
      kind: "single",
      question: "What have you stopped attempting because someone else does it better?",
      header: "Abandoned",
      note: "",
      options: [
        { id: "approach", label: "A whole approach I was good at, that they now own in everyone’s mind.", desc: "You ceded the territory rather than share it." },
        { id: "subject", label: "A subject I care about but will not touch because their version is the reference.", desc: "Their piece became the thing every new one gets measured against." },
        { id: "show", label: "Showing the work at all in the places where they show.", desc: "You withdrew from the rooms instead of competing in them." },
        { id: "quiet", label: "Nothing. I just do it more quietly and tell myself I chose that.", desc: "The attempt continues, with the ambition turned down." }
      ],
      multiSelectHint: false,
      next: { _default: "poisons-contempt" }
    },

    "poisons-contempt": {
      id: "poisons-contempt",
      kind: "single",
      question: "Where does contempt show up in how you talk about your field?",
      header: "Contempt",
      note: "",
      options: [
        { id: "deciders", label: "About the people who decide what gets shown.", desc: "The gatekeepers, and their taste." },
        { id: "cannot", label: "About people who cannot do the technical part.", desc: "The ones you think are getting by on less craft." },
        { id: "beauty", label: "About work that is only beautiful and knows nothing.", desc: "Surface with no argument under it." },
        { id: "promoters", label: "About artists who are better at promoting themselves than at the work.", desc: "The ones whose reach outruns what they make." }
      ],
      multiSelectHint: false,
      next: { _default: "poisons-contempt-save" }
    },

    "poisons-contempt-save": {
      id: "poisons-contempt-save",
      kind: "single",
      question: "What does that contempt save you from trying?",
      header: "Saves me",
      note: "",
      options: [
        { id: "ask", label: "Asking those people for anything, and being turned down.", desc: "If they do not matter, a rejection does not either." },
        { id: "learn", label: "Learning the part I am dismissing, and being a beginner again.", desc: "Contempt is cheaper than the lessons." },
        { id: "beautiful", label: "Making something that is allowed to just be beautiful.", desc: "You keep the exit from that risk closed." },
        { id: "promote", label: "Promoting my own work, and finding out if anyone bites.", desc: "Scorn for self-promotion means you never test your reach." }
      ],
      multiSelectHint: false,
      next: { _default: "poisons-sentence" }
    },

    "poisons-sentence": {
      id: "poisons-sentence",
      kind: "single",
      question: "What do you tell yourself when the work is going nowhere?",
      header: "The sentence",
      note: "",
      options: [
        { id: "lost", label: "I have lost whatever I had, and this is the piece where it shows.", desc: "" },
        { id: "behind", label: "Everyone else this age is further along.", desc: "" },
        { id: "technician", label: "I am a technician who got to call herself an artist for a while.", desc: "" },
        { id: "hard", label: "If it were any good it would not be this hard.", desc: "" }
      ],
      multiSelectHint: false,
      next: { _default: "poisons-sentence-true" }
    },

    "poisons-sentence-true": {
      id: "poisons-sentence-true",
      kind: "single",
      question: "Is it true?",
      header: "True?",
      note: "",
      options: [
        { id: "yes", label: "Yes, and I can point to the evidence.", desc: "You have a case built for it." },
        { id: "sometimes", label: "It is true on the bad days and absurd on the good ones.", desc: "It tracks your mood more than the work." },
        { id: "useful", label: "No, but believing it lets me stop before I can fail properly.", desc: "The sentence is a permission slip to quit early." },
        { id: "unchecked", label: "I do not know, and I have never made myself check.", desc: "It has run unexamined for years." }
      ],
      multiSelectHint: false,
      next: { _default: "poisons-motives" }
    },

    // Two-motives pair. Open for the same reason the works list is open: the
    // options would have to be her own titles, and a model cannot write those.
    "poisons-motives": {
      id: "poisons-motives",
      kind: "open",
      question: "Name two pieces from your list: one you made mostly to find something out for yourself, and one you made mostly so a specific person would see it.",
      header: "Two motives",
      note: "One title for each.",
      options: [],
      multiSelectHint: false,
      next: { _default: "poisons-motives-trust" }
    },

    "poisons-motives-trust": {
      id: "poisons-motives-trust",
      kind: "single",
      question: "Which of the two do you trust more, right now, as a measure of your own judgment?",
      header: "Trust which",
      note: "",
      options: [
        { id: "self", label: "The for-yourself one, always.", desc: "The private measurement is the one you believe." },
        { id: "someone", label: "The for-someone one, when the someone is right.", desc: "An outside eye you rate can be the better gauge." },
        { id: "neither", label: "Neither. Both were compromised in some way I can name.", desc: "You can already say how each one was bent." },
        { id: "didntknow", label: "I did not know until this question which one was which.", desc: "The motive was not visible to you until now." }
      ],
      multiSelectHint: false,
      // Final card of Arc II. Routes to the between-arc break.
      next: { _default: "_arc-break" }
    }
  }
};
