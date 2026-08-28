// Soulstice — Statement sections. Five section groups (references/statement.md).
//
// Card rule, RELAXED for this mode only (SKILL.md item 12): cards may excavate,
// but no card-option phrasing may reach the statement. Each section is authored
// as 0-2 kind "single" cards to loosen material, then ONE mandatory kind "open"
// card. js/modes/secondary.js builds the statement from the open answers ONLY
// (it filters `state.answers` down to the ids in `openId` before calling
// buildStatement), so a picked option can never become a sentence.
//
// Each section object: { key, title, entry, openId, cards }. `openId` is the id
// of that section's mandatory open card.

export const statementSections = [
  // ---- 1. Who the work is for -------------------------------------------
  {
    key: "st-who",
    title: "Who it is for",
    entry: "st-who-1",
    openId: "st-who-open",
    cards: {
      "st-who-1": {
        id: "st-who-1",
        kind: "single",
        question: "When you picture someone in front of your work, who is standing there?",
        header: "In front",
        note: "This locates the section. It does not become text.",
        options: [
          { id: "a", label: "A stranger who did not choose to be there.", desc: "They came across it rather than to it." },
          { id: "b", label: "Someone who came deliberately, already interested.", desc: "They bought the ticket, so to speak." },
          { id: "c", label: "A peer who works in the same field.", desc: "Someone who reads it the way you do." },
          { id: "d", label: "Someone from the world the work came out of.", desc: "They recognise the material from their own life." }
        ],
        multiSelectHint: false,
        next: { _default: "st-who-2" }
      },
      "st-who-2": {
        id: "st-who-2",
        kind: "single",
        question: "What do you want to be true of that person by the time they leave?",
        header: "On leaving",
        note: "",
        options: [
          { id: "a", label: "They were unsettled and cannot quite put it down.", desc: "It follows them out." },
          { id: "b", label: "They noticed something they walk past every day.", desc: "The ordinary thing is visible again." },
          { id: "c", label: "They felt less alone in something.", desc: "A private thing turned out to be shared." },
          { id: "d", label: "They are not sure what happened, and they stay with that.", desc: "The uncertainty is the residue." }
        ],
        multiSelectHint: false,
        next: { _default: "st-who-open" }
      },
      "st-who-open": {
        id: "st-who-open",
        kind: "open",
        question: "Write, for as long as you can, about the person the work is for. Who are they, what are they to you, and what are you doing to them?",
        header: "Say it",
        note: "Your words only. This is what becomes the section.",
        options: [],
        multiSelectHint: false,
        next: { _end: true }
      }
    }
  },

  // ---- 2. What it is about / the recurring question --------------------
  {
    key: "st-about",
    title: "What it is about",
    entry: "st-about-1",
    openId: "st-about-open",
    cards: {
      "st-about-1": {
        id: "st-about-1",
        kind: "multi",
        question: "Across your work, what actually keeps coming back?",
        header: "Repeats",
        note: "Tick what recurs. Direction-finding only.",
        options: [
          { id: "material", label: "The same material or surface." },
          { id: "scale", label: "A scale, small and private or large and public." },
          { id: "body", label: "A relation to a body, yours or the viewer’s." },
          { id: "absence", label: "Something withheld, missing, or kept to the side." },
          { id: "time", label: "A span of time: duration, decay, waiting." },
          { id: "subject", label: "One subject you have circled for years." }
        ],
        multiSelectHint: true,
        next: { _default: "st-about-2" }
      },
      "st-about-2": {
        id: "st-about-2",
        kind: "single",
        question: "The question the work keeps asking, even when you try to make it about something else. Closest?",
        header: "The question",
        note: "",
        options: [
          { id: "a", label: "Whether close attention paid to something small is worth it.", desc: "" },
          { id: "b", label: "What is owed to a person who did not agree to be seen.", desc: "" },
          { id: "c", label: "What is real and what is staged.", desc: "" },
          { id: "d", label: "What is lost when something ends or decays.", desc: "" }
        ],
        multiSelectHint: false,
        next: { _default: "st-about-open" }
      },
      "st-about-open": {
        id: "st-about-open",
        kind: "open",
        question: "In your own words, and badly is fine: what is your work about? What is the question it keeps asking? Do not tidy it.",
        header: "Say it",
        note: "Your words only. This is what becomes the section.",
        options: [],
        multiSelectHint: false,
        next: { _end: true }
      }
    }
  },

  // ---- 3. Form: how it is made and why -------------------------------
  {
    key: "st-form",
    title: "Form",
    entry: "st-form-1",
    openId: "st-form-open",
    cards: {
      "st-form-1": {
        id: "st-form-1",
        kind: "single",
        question: "Name one formal rule you always follow in the making.",
        header: "The rule",
        note: "",
        options: [
          { id: "a", label: "A limit on scale or duration.", desc: "It never gets bigger or longer than a set point." },
          { id: "b", label: "Something you always withhold or leave out.", desc: "A part you refuse to show." },
          { id: "c", label: "A material or process you always use.", desc: "The same way in, every time." },
          { id: "d", label: "A rule about where the viewer is placed.", desc: "How close, how long, from which side." }
        ],
        multiSelectHint: false,
        next: { _default: "st-form-2" }
      },
      "st-form-2": {
        id: "st-form-2",
        kind: "single",
        question: "That rule. What does keeping it do to what the work says?",
        header: "What it says",
        note: "Only a reason that changes the meaning, not the look.",
        options: [
          { id: "a", label: "It keeps the work honest about being made.", desc: "No illusion goes unbroken." },
          { id: "b", label: "It refuses a spectacle the subject would not survive.", desc: "The restraint is a position." },
          { id: "c", label: "It forces the viewer into a position they can feel.", desc: "The body is implicated." },
          { id: "d", label: "It keeps the work close to where it came from.", desc: "It stays tied to its source." }
        ],
        multiSelectHint: false,
        next: { _default: "st-form-open" }
      },
      "st-form-open": {
        id: "st-form-open",
        kind: "open",
        question: "Describe how the work is physically made, and the one or two choices in the making that change its meaning rather than only its look.",
        header: "Say it",
        note: "Your words only. This is what becomes the section.",
        options: [],
        multiSelectHint: false,
        next: { _end: true }
      }
    }
  },

  // ---- 4. Where it sits: time, lineage, refusal --------------------
  {
    key: "st-epoch",
    title: "Where it sits",
    entry: "st-epoch-1",
    openId: "st-epoch-open",
    cards: {
      "st-epoch-1": {
        id: "st-epoch-1",
        kind: "single",
        question: "The felt quality of the present that the work is answering. Closest?",
        header: "Now",
        note: "",
        options: [
          { id: "a", label: "Everything moves too fast to be looked at.", desc: "" },
          { id: "b", label: "Nothing feels solid or verifiable anymore.", desc: "" },
          { id: "c", label: "Attention is bought and sold and everyone knows it.", desc: "" },
          { id: "d", label: "The near future is hard to picture at all.", desc: "" }
        ],
        multiSelectHint: false,
        next: { _default: "st-epoch-2" }
      },
      "st-epoch-2": {
        id: "st-epoch-2",
        kind: "single",
        question: "One thing you refuse to do, whatever the commission or the trend.",
        header: "Refusal",
        note: "",
        options: [
          { id: "a", label: "Refuse to make it faster or shorter to be shared.", desc: "" },
          { id: "b", label: "Refuse to explain it down to a caption.", desc: "" },
          { id: "c", label: "Refuse to pretend it is neutral.", desc: "" },
          { id: "d", label: "Refuse to make it about the technology it uses.", desc: "" }
        ],
        multiSelectHint: false,
        next: { _default: "st-epoch-open" }
      },
      "st-epoch-open": {
        id: "st-epoch-open",
        kind: "open",
        question: "Write about where the work sits in this moment: what it is answering about now, whose work it comes after, and what it refuses.",
        header: "Say it",
        note: "Your words only. This is what becomes the section.",
        options: [],
        multiSelectHint: false,
        next: { _end: true }
      }
    }
  },

  // ---- 5. What is at stake ----------------------------------------
  {
    key: "st-stakes",
    title: "What is at stake",
    entry: "st-stakes-1",
    openId: "st-stakes-open",
    cards: {
      "st-stakes-1": {
        id: "st-stakes-1",
        kind: "single",
        question: "If you stopped making this kind of work, what would be lost, and to whom?",
        header: "The loss",
        note: "",
        options: [
          { id: "a", label: "Something only I am looking at would go unlooked at.", desc: "" },
          { id: "b", label: "A way of working I have spent years on would end.", desc: "" },
          { id: "c", label: "Nothing anyone would notice, and that is part of it.", desc: "" },
          { id: "d", label: "I would lose the one place I am honest.", desc: "" }
        ],
        multiSelectHint: false,
        next: { _default: "st-stakes-open" }
      },
      "st-stakes-open": {
        id: "st-stakes-open",
        kind: "open",
        question: "What is at stake in this work, for you and for anyone else? What would you regret not having attempted?",
        header: "Say it",
        note: "Your words only. This is what becomes the section.",
        options: [],
        multiSelectHint: false,
        next: { _end: true }
      }
    }
  }
];

export default statementSections;
