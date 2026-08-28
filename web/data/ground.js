// Soulstice — Ground. The fourth mode, for the evening the work feels
// worthless and there seems to be nowhere to go next.
//
// This is authored as a self-guided worksheet. It runs as branching choice
// cards, exactly like a Passage layer, but it is NOT a Passage layer:
//   - key "ground", arc null. It never appears in data/manifest.js and is
//     never run by the Passage flow in js/app.js.
//   - js/modes/ground.js drives its own cursor over this module, behind an
//     acknowledgement gate, with a crisis-contact panel pinned above every card.
//
// Phases (headers only, never a number spoken to the user):
//   1  separate the event from the verdict      g1-event  -> g1-relation
//   2  evidence: for BEFORE against             g2-for -> g2-against -> g2-date -> g2-version
//   2b the question that has no answer          g2b-morning        (skipped when the
//                                                                   phase-2 rewrite is
//                                                                   "I do not believe them")
//   3  one action today, with a trigger         g3-action -> g3-trigger
//   4  three startable projects                 g4-material -> g4-p1 -> g4-p2 -> g4-p3 -> end
//
// Safety framing (see references/crisis.md, and issue #6):
//   - No claim of comprehension. Every card stands on its own; a beat-two card
//     references the pick just made, never text the user typed.
//   - Arc I (fear / inheritance / role / borrowed voices) is not run here, not
//     even softened.
//   - The one permitted factual sentence about measurement conditions appears
//     once, on g1-event. Phase 2 suspends the "one uncomfortable option" rule;
//     phase 4 restores it.
//   - Options are built in the language of an artist working with projection,
//     light and moving bodies, because that is the person the references use.

export default {
  key: "ground",
  title: "Ground",
  arc: null,
  intro: "",
  entry: "g1-event",
  cards: {
    // ================================================================
    // Phase 1 — separate the event from the verdict
    // ================================================================

    "g1-event": {
      id: "g1-event",
      kind: "single",
      question: "Before the sentence about yourself, something happened. What was the last thing?",
      header: "Event",
      note: "One factual thing before the questions: you are weighing years of work on the worst evening of the month, and a verdict reached now is partly evidence about the evening.",
      options: [
        { id: "a", label: "I sent something out and it has been weeks with no reply.", desc: "Silence, the version with nothing to argue with." },
        { id: "b", label: "Someone whose opinion decides things called the piece pretty.", desc: "A kind word that moved the work out of the category I wanted." },
        { id: "c", label: "I opened a call, read what it wanted, and closed the tab.", desc: "The refusal happened before anyone else could refuse." },
        { id: "d", label: "Nothing happened. An empty week is what set it off.", desc: "No rejection to point at, which is worse than one." }
      ],
      multiSelectHint: false,
      next: { a: "g1-relation", b: "g1-relation", c: "g1-relation", d: "g1-relation", _other: "g1-relation", _default: "g1-relation" }
    },

    "g1-relation": {
      id: "g1-relation",
      kind: "single",
      question: "Two things are on the table now: the event you just marked, and the verdict about yourself. What is the honest relation between them?",
      header: "Relation",
      note: "",
      options: [
        { id: "a", label: "The sentence was already there. The event only let it out.", desc: "Then the event is small and the sentence is old." },
        { id: "b", label: "The event proved the sentence.", desc: "Then it is a claim about the world, and a claim can be checked." },
        { id: "c", label: "The sentence is faster than the event, and I never checked it.", desc: "A second is not long enough to weigh years." },
        { id: "d", label: "They are unrelated. I stapled them together tonight.", desc: "Two separate things, held as one." }
      ],
      multiSelectHint: false,
      next: { a: "g2-for", b: "g2-for", c: "g2-for", d: "g2-for", _other: "g2-for", _default: "g2-for" }
    },

    // ================================================================
    // Phase 2 — evidence. The for-card runs first, on purpose.
    // ================================================================

    "g2-for": {
      id: "g2-for",
      kind: "single",
      question: "The verdict, taken at full strength, in its \"nobody needs it\" form. Make the case for it. What actually supports it?",
      header: "For",
      note: "From here the verdict is the thing under examination, treated as a claim that could be wrong. The case for it comes first.",
      options: [
        { id: "a", label: "Several proposals this year, no replies.", desc: "A pattern, and a pattern is the strongest thing here." },
        { id: "b", label: "The works exist and nothing followed from them.", desc: "Made, shown, and then nothing moved." },
        { id: "c", label: "The people who liked it were being kind, and I could tell.", desc: "Warmth discounted as it arrived." },
        { id: "d", label: "Nobody has come back a second time.", desc: "Repeat interest is the only vote that costs anything." }
      ],
      multiSelectHint: false,
      next: { a: "g2-against", b: "g2-against", c: "g2-against", d: "g2-against", _other: "g2-against", _default: "g2-against" }
    },

    "g2-against": {
      id: "g2-against",
      kind: "multi",
      question: "The other column now, and only things with a date on them. Which of these happened?",
      header: "Against",
      note: "Mark every one that is true. Vague does not count here; each of these is a specific kind of event you could check.",
      options: [
        { id: "a", label: "A dancer kept working in the light after the session had ended.", desc: "Someone stayed in it while nobody was watching." },
        { id: "b", label: "Someone who saw it once wrote to me first, later.", desc: "An approach costs the approacher something." },
        { id: "c", label: "A stranger stood in front of it longer than one full loop.", desc: "The clearest vote available, and it is unpaid." },
        { id: "d", label: "Someone described the piece to a third person, wrongly but with heat.", desc: "It travelled without me in the room." }
      ],
      multiSelectHint: true,
      next: { _default: "g2-date" }
    },

    "g2-date": {
      id: "g2-date",
      kind: "single",
      question: "Take the most recent one you marked. When was it, and what exactly did they say?",
      header: "Their words",
      note: "The verdict is global. This memory is local, and it has a date on it. Local wins.",
      options: [
        { id: "a", label: "They said it did something to them they could not explain.", desc: "An effect they felt and could not file." },
        { id: "b", label: "They asked how it was made, and then asked to see more.", desc: "Curiosity that wanted a next time." },
        { id: "c", label: "They said it stayed with them for days.", desc: "It kept working after they had left." },
        { id: "d", label: "They said almost nothing and kept standing there.", desc: "The response was in how long they stayed." }
      ],
      multiSelectHint: false,
      next: { a: "g2-version", b: "g2-version", c: "g2-version", d: "g2-version", _other: "g2-version", _default: "g2-version" }
    },

    "g2-version": {
      id: "g2-version",
      kind: "single",
      question: "Rewrite the verdict so it holds both columns. Which of these can you sign tonight?",
      header: "Version",
      note: "",
      options: [
        { id: "a", label: "Nobody needs it in the form I have been sending it in.", desc: "Packaging, which is fixable." },
        { id: "b", label: "A few people need it and I cannot find more of them.", desc: "A distribution problem, and it has a name." },
        { id: "c", label: "Some of it was needed and some was filler, and I stopped telling them apart.", desc: "The hardest, and probably the true one." },
        { id: "d", label: "People need it and I do not believe them when they say so.", desc: "Then the problem is belief rather than need." }
      ],
      multiSelectHint: false,
      // "I do not believe them" routes straight past phase 2b to the action work.
      next: { a: "g2b-morning", b: "g2b-morning", c: "g2b-morning", d: "g3-action", _other: "g2b-morning", _default: "g2b-morning" }
    },

    // ================================================================
    // Phase 2b — the question that has no answer.
    // One card. It offers stances, not a resolution. The position behind
    // it (philosophy.md, position 4) is never named.
    // ================================================================

    "g2b-morning": {
      id: "g2b-morning",
      kind: "single",
      question: "Suppose it is true that none of it is needed and nothing changes because of it. The next morning, what do you actually do?",
      header: "Next morning",
      note: "This one has no resolution on offer. The options are only what you do next.",
      options: [
        { id: "a", label: "Open the same file and keep working, with the question left open.", desc: "Continuing without a reason to." },
        { id: "b", label: "Stop for a month and find out whether I come back.", desc: "A real experiment, with a real result." },
        { id: "c", label: "Find a reason that holds, even a borrowed one.", desc: "Relief bought with a story." },
        { id: "d", label: "Keep working, and stay angry about it.", desc: "Anger as fuel, which lasts about two years." }
      ],
      multiSelectHint: false,
      next: { a: "g3-action", b: "g3-action", c: "g3-action", d: "g3-action", _other: "g3-action", _default: "g3-action" }
    },

    // ================================================================
    // Phase 3 — one action today, then a trigger for it.
    // ================================================================

    "g3-action": {
      id: "g3-action",
      kind: "single",
      question: "One action, today or tomorrow morning. Two to four hours, finished when you stop, needing no permission and no reply from anyone. Which one?",
      header: "Today",
      note: "",
      options: [
        { id: "a", label: "Re-cut the 2024 studio footage into ninety seconds, no titles.", desc: "Material already on the drive." },
        { id: "b", label: "Rebuild the light study that broke, at half resolution.", desc: "The version that has to run, rather than the finished one." },
        { id: "c", label: "Write the three sentences that describe the piece I keep failing to describe.", desc: "Words, on the piece that resists them." },
        { id: "d", label: "Set the projector up at home and put something on the wall for an hour.", desc: "The work, on a surface, tonight." }
      ],
      multiSelectHint: false,
      next: { a: "g3-trigger", b: "g3-trigger", c: "g3-trigger", d: "g3-trigger", _other: "g3-trigger", _default: "g3-trigger" }
    },

    "g3-trigger": {
      id: "g3-trigger",
      kind: "single",
      question: "Now fix it to something certain. When X happens tomorrow, you start. Which X?",
      header: "Trigger",
      note: "The doing is the point here, more than the result.",
      options: [
        { id: "a", label: "When the coffee is made, before I open anything else, I start it.", desc: "The first fixed point of the day." },
        { id: "b", label: "When I get back from the thing I already have to do, I start it.", desc: "Attached to an errand that will happen anyway." },
        { id: "c", label: "When it gets dark, I start it.", desc: "A trigger the day brings on its own." },
        { id: "d", label: "When I next sit at the desk, it is the first thing open.", desc: "Before the inbox, before the feed." }
      ],
      multiSelectHint: false,
      next: { a: "g4-material", b: "g4-material", c: "g4-material", d: "g4-material", _other: "g4-material", _default: "g4-material" }
    },

    // ================================================================
    // Phase 4 — three projects. The worksheet cannot synthesise these
    // from anything typed earlier, so it scaffolds the choice of raw
    // material, then hands three open cards with a fixed four-line prompt.
    // buildGround (js/output.js) places whatever is written here verbatim.
    // The "one uncomfortable option" rule is back on for this phase.
    // ================================================================

    "g4-material": {
      id: "g4-material",
      kind: "multi",
      question: "Three projects, each startable this week with what you already own. First mark the material they should come out of.",
      header: "Material",
      note: "Pick roughly three. The next screens ask you to write the projects themselves.",
      options: [
        { id: "a", label: "The footage and studies already on the drive.", desc: "Made, unfinished, in reach." },
        { id: "b", label: "The one piece that landed with a person in the evidence column.", desc: "Something that already worked once." },
        { id: "c", label: "The recurring thing in my work I could not name tonight.", desc: "The obsession under the separate projects." },
        { id: "d", label: "The action I just chose for tomorrow, scaled up past its two hours.", desc: "The small thing as the seed of a large one." },
        { id: "e", label: "A version that needs no venue, no collaborator and no grant.", desc: "The constraint I keep avoiding, taken as the brief." }
      ],
      multiSelectHint: true,
      next: { _default: "g4-p1" }
    },

    "g4-p1": {
      id: "g4-p1",
      kind: "open",
      question: "Project one.",
      header: "Project 1",
      note: "Four lines: what it is; why this one; the smallest version that counts as done; what happens if it works.",
      multiSelectHint: false,
      next: { _default: "g4-p2" }
    },

    "g4-p2": {
      id: "g4-p2",
      kind: "open",
      question: "Project two.",
      header: "Project 2",
      note: "Four lines: what it is; why this one; the smallest version that counts as done; what happens if it works.",
      multiSelectHint: false,
      next: { _default: "g4-p3" }
    },

    "g4-p3": {
      id: "g4-p3",
      kind: "open",
      question: "Project three.",
      header: "Project 3",
      note: "Four lines: what it is; why this one; the smallest version that counts as done; what happens if it works.",
      multiSelectHint: false,
      next: { _default: true, _end: true }
    }
  }
};
