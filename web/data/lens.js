// Soulstice — Lens section. One existing or planned work, run through the
// eleven layers as ten diagnostic stems (references/outputs.md, Lens section).
// Short by design: one sitting, one card per stem, a blunt verdict at the end.
//
// Shape matches a Passage layer module: { key, title, entry, cards }. The first
// card is kind "open" and is stored as answers["lens-work"]. Every other card is
// kind "single" with four concrete, situational options plus Other. A `diagnostic`
// field on a stem card names which picks leave a question the work has not
// answered; js/modes/secondary.js reads it to fill the verdict's open questions.
// Only one stem carries a beat-two, because Lens has to stay one sitting.

export default {
  key: "lens",
  title: "Lens",
  intro: "",
  entry: "lens-work",
  cards: {
    "lens-work": {
      id: "lens-work",
      kind: "open",
      question: "Name the work, and say in one or two lines what it is for.",
      header: "The work",
      note: "One existing or planned piece. Its title, and the reason it exists.",
      options: [],
      multiSelectHint: false,
      next: { _default: "lens-fear" }
    },

    "lens-fear": {
      id: "lens-fear",
      kind: "single",
      question: "What is the safe version of this piece, and are you making it?",
      header: "Safe version",
      note: "",
      options: [
        { id: "a", label: "There is a safe version, and this is basically it.", desc: "The risk got designed out somewhere along the way." },
        { id: "b", label: "There is a safe version and I can feel myself drifting toward it.", desc: "Each decision so far has been the calmer one." },
        { id: "c", label: "I know the safe version and I am deliberately not making it.", desc: "The harder route is a choice I keep making." },
        { id: "d", label: "There is no safe version of this one. The exposure is the piece.", desc: "You cannot subtract the risk without losing the work." }
      ],
      multiSelectHint: false,
      diagnostic: {
        flagIf: ["a", "b", "_other"],
        question: "If the safe version and this piece look the same from outside, what is the risk you believe you are taking?"
      },
      next: { a: "lens-fear-b", b: "lens-fear-b", c: "lens-inheritance", d: "lens-inheritance", _other: "lens-fear-b", _default: "lens-inheritance" }
    },
    "lens-fear-b": {
      id: "lens-fear-b",
      kind: "open",
      question: "Name the unsafe version in one line. What would it do that this one does not?",
      header: "Unsafe",
      note: "",
      options: [],
      multiSelectHint: false,
      next: { _default: "lens-inheritance" }
    },

    "lens-inheritance": {
      id: "lens-inheritance",
      kind: "single",
      question: "Whose approval is built into this piece?",
      header: "Whose yes",
      note: "",
      options: [
        { id: "a", label: "A specific person or institution whose yes still matters to me.", desc: "You could name them right now." },
        { id: "b", label: "A general audience I picture judging it while I work.", desc: "A composite verdict you keep checking against." },
        { id: "c", label: "A past teacher or peer whose standards I still run it past.", desc: "A voice from the training that never left." },
        { id: "d", label: "No one’s. I would stand behind this with all of them in the room disagreeing.", desc: "The approval is not load-bearing." }
      ],
      multiSelectHint: false,
      diagnostic: {
        flagIf: ["a", "b", "c", "_other"],
        question: "Whose reaction is this piece still being built to survive?"
      },
      next: { _default: "lens-role" }
    },

    "lens-role": {
      id: "lens-role",
      kind: "single",
      question: "When you last described this piece to someone, what did you soften?",
      header: "Softened",
      note: "",
      options: [
        { id: "a", label: "How personal it is.", desc: "You made it sound less about you." },
        { id: "b", label: "How much of a provocation it is.", desc: "You made it sound calmer than it is." },
        { id: "c", label: "How large the claim behind it is.", desc: "You made it sound more modest than you mean it." },
        { id: "d", label: "Nothing. The description matched the piece.", desc: "You said it straight." }
      ],
      multiSelectHint: false,
      diagnostic: {
        flagIf: ["a", "b", "c", "_other"],
        question: "What is the sentence about this piece you keep leaving out when you describe it?"
      },
      next: { _default: "lens-voices" }
    },

    "lens-voices": {
      id: "lens-voices",
      kind: "single",
      question: "Would you still make this if it could not be shown for ten years?",
      header: "Ten years",
      note: "",
      options: [
        { id: "a", label: "Yes, without changing anything.", desc: "The showing is not why it exists." },
        { id: "b", label: "Yes, but it would become a different, smaller piece.", desc: "Some of it is built for the room." },
        { id: "c", label: "Probably not. Being seen is part of the reason it exists.", desc: "Remove the audience and the motive thins out." },
        { id: "d", label: "No. Take away the showing and there is no reason to make it.", desc: "It is addressed outward, first and last." }
      ],
      multiSelectHint: false,
      diagnostic: {
        flagIf: ["c", "d", "_other"],
        question: "Which part of this piece exists for the room it will be shown in rather than for the work itself?"
      },
      next: { _default: "lens-field" }
    },

    "lens-field": {
      id: "lens-field",
      kind: "single",
      question: "Which of your recurring concerns is actually in this piece?",
      header: "Recurrence",
      note: "",
      options: [
        { id: "a", label: "A material or texture I always come back to.", desc: "The thing your hands reach for first." },
        { id: "b", label: "A relation to the viewer’s body or attention I keep working.", desc: "Where a person has to stand or how long they have to wait." },
        { id: "c", label: "A subject I have circled for years.", desc: "The ground you keep returning to." },
        { id: "d", label: "None of them. This piece is outside my usual territory.", desc: "It does not connect to the body of work." }
      ],
      multiSelectHint: false,
      diagnostic: {
        flagIf: ["d", "_other"],
        question: "If none of your recurring concerns are in this piece, what is it for, and why make it now?"
      },
      next: { _default: "lens-standing" }
    },

    "lens-standing": {
      id: "lens-standing",
      kind: "single",
      question: "What do you want people to conclude about you from this piece?",
      header: "Conclude",
      note: "",
      options: [
        { id: "a", label: "That I am rigorous and in control of the craft.", desc: "The finish is the argument." },
        { id: "b", label: "That I take on hard or unfashionable subjects.", desc: "The ground chosen is the argument." },
        { id: "c", label: "That I have a voice you can recognise across works.", desc: "The signature is the argument." },
        { id: "d", label: "Nothing about me. I want them thinking about the work only.", desc: "You are not in the frame." }
      ],
      multiSelectHint: false,
      diagnostic: {
        flagIf: ["a", "b", "c", "_other"],
        question: "What in this piece is doing work on your reputation rather than on its subject?"
      },
      next: { _default: "lens-poisons" }
    },

    "lens-poisons": {
      id: "lens-poisons",
      kind: "single",
      question: "Is anyone specific being answered by this work?",
      header: "Answered",
      note: "",
      options: [
        { id: "a", label: "Yes, one person. I know exactly who.", desc: "A private argument is running underneath it." },
        { id: "b", label: "Yes, a group or a scene I feel outside of.", desc: "It is addressed to a room that did not invite you." },
        { id: "c", label: "A version of myself I am arguing with.", desc: "The opponent is an older or a doubting you." },
        { id: "d", label: "No one. It is not a reply to anything.", desc: "It did not start as a rebuttal." }
      ],
      multiSelectHint: false,
      diagnostic: {
        flagIf: ["a", "b", "_other"],
        question: "What does this piece do to reach that person that it would not otherwise do?"
      },
      next: { _default: "lens-contact" }
    },

    "lens-contact": {
      id: "lens-contact",
      kind: "single",
      question: "Have you touched the material yet, or only the plan?",
      header: "Contact",
      note: "",
      options: [
        { id: "a", label: "Only the plan. Nothing has been made.", desc: "It lives entirely in the description so far." },
        { id: "b", label: "A rough test exists, no more.", desc: "One contact, not enough to argue back." },
        { id: "c", label: "I am in the material now and it is talking back.", desc: "The making is changing the plan." },
        { id: "d", label: "It is nearly finished.", desc: "Most decisions are already behind you." }
      ],
      multiSelectHint: false,
      diagnostic: {
        flagIf: ["a", "_other"],
        question: "What is the smallest piece of this you could make this week to find out whether the plan survives contact?"
      },
      next: { _default: "lens-epoch" }
    },

    "lens-epoch": {
      id: "lens-epoch",
      kind: "single",
      question: "What does this piece know that only now could know?",
      header: "Only now",
      note: "",
      options: [
        { id: "a", label: "Something specific about this moment that dates it on purpose.", desc: "It is meant to be readable as of now." },
        { id: "b", label: "A feeling in the air I could not have named five years ago.", desc: "The present is in it as mood, not as reference." },
        { id: "c", label: "Nothing time-specific. It could have been made any year.", desc: "The present is not part of the work." },
        { id: "d", label: "I am not sure. I have not asked it that question.", desc: "It has not been tested against the moment." }
      ],
      multiSelectHint: false,
      diagnostic: {
        flagIf: ["c", "d", "_other"],
        question: "If nothing about this piece needs the present, what is lost by making it now rather than never?"
      },
      next: { _default: "lens-stakes" }
    },

    "lens-stakes": {
      id: "lens-stakes",
      kind: "single",
      question: "If this is one of your last twenty pieces, does it earn the slot?",
      header: "The slot",
      note: "",
      options: [
        { id: "a", label: "Yes. I would defend spending the time on it.", desc: "It belongs on the short list." },
        { id: "b", label: "Yes, but only if it turns out better than the plan.", desc: "It earns the slot on potential, not yet on fact." },
        { id: "c", label: "Not really. It is a warm-up or an obligation.", desc: "It is clearing space rather than filling it." },
        { id: "d", label: "I do not know, and that is why I am running this.", desc: "The question is live." }
      ],
      multiSelectHint: false,
      diagnostic: {
        flagIf: ["c", "d", "_other"],
        question: "If this piece does not earn one of your last twenty slots, what would, and what stops you making that instead?"
      },
      next: { _end: true }
    }
  }
};
