// Soulstice — Passage layer 10: Resource.
// After: what she actually has to make with. Time, money, skill, access,
// equipment and space, health, as fact rather than aspiration.
// Source: references/layers.md (layer 10). The opening card is built so that
// overstating time is hard: it asks about one week that already happened, and
// its fourth option is the estimate-versus-count gap, which is the finding, not
// an escape hatch. The gap this layer opens between Arc II/III ambitions and the
// inventory is named at Compass time, never closed here.

export default {
  key: "resource",
  title: "Resource",
  arc: 3,
  intro: "",
  entry: "resource-c1",
  cards: {
    "resource-c1": {
      id: "resource-c1",
      kind: "single",
      question: "Take last week, the one that actually happened. After the job, after everyone else’s needs, after the admin, how many hours were left for making anything?",
      header: "Real hours",
      note: "",
      options: [
        { id: "a", label: "Around two, in fragments too small to start anything real in.", desc: "Time that exists on paper and cannot be used." },
        { id: "b", label: "Five to seven, usually one weekend stretch and one weekday evening.", desc: "Enough to keep something ticking over. A leap needs more." },
        { id: "c", label: "Ten to twelve, most of it blocked out and defended in advance.", desc: "Protected time that survives contact with the week." },
        { id: "d", label: "I counted afterward and the number was smaller than I would have guessed.", desc: "The gap between the guess and the count is the finding this card is built to surface." }
      ],
      multiSelectHint: false,
      next: { _other: "resource-c2", _default: "resource-c2" }
    },
    "resource-c2": {
      id: "resource-c2",
      kind: "single",
      question: "Of those hours, how many were actual making, and how many were preparing, admin, or looking at other people’s work?",
      header: "Of those",
      note: "",
      options: [
        { id: "a", label: "Most of it was making. The preparation is fast for me.", desc: "Making-heavy, if it holds up to an honest count." },
        { id: "b", label: "About half making, half getting ready to make.", desc: "Setup takes as long as the work." },
        { id: "c", label: "A third making at best. The rest is files, email, and scrolling.", desc: "The overhead is winning." },
        { id: "d", label: "Almost none was making. I ran out of week before the real work started.", desc: "The making hour keeps getting spent before it arrives." }
      ],
      multiSelectHint: false,
      next: { _other: "resource-c3", _default: "resource-c3" }
    },
    "resource-c3": {
      id: "resource-c3",
      kind: "single",
      question: "What can you actually lose, in money, without it changing your life?",
      header: "Money risk",
      note: "",
      options: [
        { id: "a", label: "A weekend’s freelance fee, if a project produces nothing.", desc: "Recoverable inside a month." },
        { id: "b", label: "A few hundred on materials or a deposit, and I would feel it for a while.", desc: "A real dent, survivable." },
        { id: "c", label: "Nothing. Every amount is assigned before it arrives.", desc: "No slack in the budget at all." },
        { id: "d", label: "More than I would say out loud, because nobody checks what I spend on this.", desc: "Unmonitored spending that has never been added up." }
      ],
      multiSelectHint: false,
      next: { _other: "resource-c4", _default: "resource-c4" }
    },
    "resource-c4": {
      id: "resource-c4",
      kind: "single",
      question: "What can you execute right now with no new learning, against what you would have to stop and learn first?",
      header: "Can do now",
      note: "",
      options: [
        { id: "a", label: "I can do the core of the work cold. The new thing is one specific skill I keep postponing.", desc: "One named gap between you and the next piece." },
        { id: "b", label: "I get most of the way, then hit the same wall I always hand to someone else.", desc: "A recurring dependency on another person." },
        { id: "c", label: "Most of what I want to make now needs a skill I do not have yet.", desc: "The ambition is ahead of the toolkit." },
        { id: "d", label: "I can execute almost anything, which is why I keep making what I already know how to make.", desc: "Fluency as a comfort trap." }
      ],
      multiSelectHint: false,
      next: { _other: "resource-c5", _default: "resource-c5" }
    },
    "resource-c5": {
      id: "resource-c5",
      kind: "single",
      question: "Who already answers your messages, reliably, this month?",
      header: "Answers me",
      note: "",
      options: [
        { id: "a", label: "One specific collaborator. If I write today I hear back this week.", desc: "A live line to a named person." },
        { id: "b", label: "One venue or organisation, at least at the level of a real reply.", desc: "An institutional door that is not shut." },
        { id: "c", label: "Nobody, currently. The lines I had have gone quiet.", desc: "No active route right now." },
        { id: "d", label: "I have not tested it in over a year, so I genuinely do not know.", desc: "Untested is a different thing from closed." }
      ],
      multiSelectHint: false,
      next: { _other: "resource-c6", _default: "resource-c6" }
    },
    "resource-c6": {
      id: "resource-c6",
      kind: "single",
      question: "What space and equipment can you actually put your hands on this week?",
      header: "Hands on it",
      note: "",
      options: [
        { id: "a", label: "A fixed place that is mine, set up and ready.", desc: "Nothing to negotiate before starting." },
        { id: "b", label: "A shared or borrowed space I can get into a few days a month.", desc: "Access exists, on someone else’s schedule." },
        { id: "c", label: "A corner of a room used mainly for other things.", desc: "Working space that has to be cleared first." },
        { id: "d", label: "Nothing beyond what fits in a bag and works on a table.", desc: "Fully portable, fully constrained." }
      ],
      multiSelectHint: false,
      next: { _other: "resource-c7", _default: "resource-c7" }
    },
    "resource-c7": {
      id: "resource-c7",
      kind: "single",
      question: "What caps how much you can actually do in a week, physically?",
      header: "Caps week",
      note: "",
      options: [
        { id: "a", label: "A named condition or pattern I already know the shape of, and plan around.", desc: "State it as fact. It is data. Name it and plan around it." },
        { id: "b", label: "Sleep. Past a point the hours are there and the capacity is not.", desc: "A hard ceiling that ignores the schedule." },
        { id: "c", label: "Caretaking or a day job that takes the energy before the work gets any.", desc: "The tank is low before the making starts." },
        { id: "d", label: "I keep underestimating how long I need to recover, so I overbook and stall.", desc: "The miscalculation of recovery time is itself the constraint." }
      ],
      multiSelectHint: false,
      next: { _end: true }
    }
  }
};
