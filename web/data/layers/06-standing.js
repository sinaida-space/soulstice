// Soulstice — Passage layer 6: Standing.
// After: the portion of the work that exists to produce an image of its maker,
// and an honest verdict on whether that is fuel or corrosion. Ask for the vain
// answer directly; permission removes the performance. Reputation motives are
// ordinary and often productive, so no option here apologises for them.
//
// Method note folded in: the presented self against the working self
// (2am self / Better by).

export default {
  key: "standing",
  title: "Standing",
  arc: 2,
  intro: "",
  entry: "standing-vain",
  cards: {
    "standing-vain": {
      id: "standing-vain",
      kind: "single",
      question: "Someone sees your work and concludes something about you. What do you want them to conclude? Take the vain version.",
      header: "Standing",
      note: "The version you would not say at a dinner. That one.",
      options: [
        { id: "tech", label: "That I can do things other people cannot do technically.", desc: "Skill as the headline." },
        { id: "see", label: "That I see something other people do not see.", desc: "Perception as the headline." },
        { id: "serious", label: "That I am serious, and the pretty surface was a test.", desc: "That the charm was bait and they failed to look past it." },
        { id: "ahead", label: "That I am ahead, and they are looking at what comes next.", desc: "That you are early and they are catching up." }
      ],
      multiSelectHint: false,
      next: { _default: "standing-anon" }
    },

    "standing-anon": {
      id: "standing-anon",
      kind: "single",
      question: "The same work is shown without your name on it, and people love it. What is actually missing for you?",
      header: "Anonymous",
      note: "",
      options: [
        { id: "invite", label: "Nobody knows to invite me to make the next one.", desc: "The love does not convert into work." },
        { id: "proof", label: "I cannot point to it later when I need to prove I can do this.", desc: "It is gone from the record you are building." },
        { id: "person", label: "It never reaches the one person I made it for.", desc: "The whole point was that they would know it was you." },
        { id: "nothing", label: "Nothing is missing, and that would surprise me.", desc: "The work is enough on its own, which you did not expect to feel." }
      ],
      multiSelectHint: false,
      next: { _default: "standing-ignored" }
    },

    "standing-ignored": {
      id: "standing-ignored",
      kind: "single",
      question: "The same work is shown with your name on it, and nobody reacts at all. What does that take from you?",
      header: "Ignored",
      note: "",
      options: [
        { id: "evidence", label: "The evidence I was building that this is going somewhere.", desc: "One more data point that says it is not." },
        { id: "story", label: "The story I tell myself about why the last few years were worth it.", desc: "Silence as a verdict on the whole stretch." },
        { id: "reread", label: "Nothing I will admit to, but I will reread the silence for weeks.", desc: "You will treat the absence of response as a message." },
        { id: "reason", label: "A reason to make the next one, which I am ashamed to need.", desc: "The drive was partly the expected reaction, and it did not come." }
      ],
      multiSelectHint: false,
      next: { _default: "standing-rank" }
    },

    // Forced ranking, two options only, deliberately cruel.
    "standing-rank": {
      id: "standing-rank",
      kind: "single",
      question: "Which is worse: being called derivative, or being called minor?",
      header: "Worse",
      note: "",
      options: [
        { id: "derivative", label: "Derivative. It says the work is not even mine.", desc: "The authorship is denied." },
        { id: "minor", label: "Minor. It says the work is mine and it still does not matter.", desc: "The authorship is granted and then dismissed." }
      ],
      multiSelectHint: false,
      next: { _default: "standing-secured" }
    },

    "standing-secured": {
      id: "standing-secured",
      kind: "single",
      question: "Your reputation is already secured. Nothing you make will change how you are seen. What do you make now?",
      header: "If secured",
      note: "",
      options: [
        { id: "same", label: "The same thing. Reputation was never the constraint.", desc: "The work does not change, so this was never about being seen." },
        { id: "slow", label: "The slow, unshowable work I keep postponing until I can afford to.", desc: "The thing that only happens once the pressure to be legible is off." },
        { id: "ugly", label: "Something deliberately ugly or difficult, to see what is left when charm is off the table.", desc: "A test of the work without its surface." },
        { id: "less", label: "Less. I would find out how much of the drive was about being seen.", desc: "The honest answer that the output would shrink." }
      ],
      multiSelectHint: false,
      next: { _default: "standing-2am" }
    },

    // Working-self pair.
    "standing-2am": {
      id: "standing-2am",
      kind: "single",
      question: "Your artist statement describes one person. Who shows up in the studio at two in the morning that the statement does not mention?",
      header: "2am self",
      note: "",
      options: [
        { id: "mechanical", label: "Someone far more mechanical and obsessive about tiny detail than the statement admits.", desc: "Hours of fussing the language calls intuition." },
        { id: "angry", label: "Someone angrier than the calm, poetic voice the statement uses.", desc: "The heat that gets edited out of the public version." },
        { id: "unsure", label: "Someone still improvising and unsure, while the statement claims a method.", desc: "No system, just trying things until one holds." },
        { id: "nogap", label: "No gap. The statement is accurate, which is worth checking twice.", desc: "The two selves match, or you have not caught where they do not." }
      ],
      multiSelectHint: false,
      next: { _default: "standing-2am-better" }
    },

    "standing-2am-better": {
      id: "standing-2am-better",
      kind: "single",
      question: "Which of the two would the work actually be better made by: the statement self, or the two a.m. one?",
      header: "Better by",
      note: "",
      options: [
        { id: "night-cut", label: "The two a.m. one. It would cut the pieces on my list that only exist to look coherent.", desc: "Less polish, fewer works made to hold the story together." },
        { id: "night-cost", label: "The two a.m. one, but it would also abandon things halfway more often.", desc: "More nerve, less finishing." },
        { id: "statement", label: "The statement self. The two a.m. one mistakes intensity for quality.", desc: "The calmer judgement is the better editor." },
        { id: "argument", label: "Neither cleanly. The work needs the argument between them and loses if either wins.", desc: "The tension is the method." }
      ],
      multiSelectHint: false,
      next: { _end: true }
    }
  }
};
