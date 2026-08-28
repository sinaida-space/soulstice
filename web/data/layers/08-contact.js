// Soulstice — Passage layer 8: Contact.
// After: the actual conditions and bodily state under which good work happens.
// Source: references/layers.md (layer 8). Opening anchors to one remembered
// session, never a routine. The signal cards are somatic and specific; the
// wrong-signal marker is the most portable finding in the instrument.
// Options are art-form-neutral on purpose: this build ships to any artist.

export default {
  key: "contact",
  title: "Contact",
  arc: 3,
  intro: "",
  entry: "contact-c1",
  cards: {
    "contact-c1": {
      id: "contact-c1",
      kind: "single",
      question: "The last time making something went well. What was actually true about those hours?",
      header: "Contact",
      note: "Pick the nearest. The exact version is yours to type.",
      options: [
        { id: "a", label: "It was night or early morning, I was alone, and nobody knew I was working.", desc: "No audience, real or imagined, anywhere near the room." },
        { id: "b", label: "There was a deadline close enough that it burned off everything optional.", desc: "The pressure did the filtering I cannot do calmly." },
        { id: "c", label: "Other people were in the room and I was answering something happening live.", desc: "The work came out of the response in the room." },
        { id: "d", label: "I cannot recall the hours at all, only that the result was right.", desc: "Whatever the state was, it left no memory. Worth noticing." }
      ],
      multiSelectHint: false,
      next: { _other: "contact-c1b", _default: "contact-c1b" }
    },
    "contact-c1b": {
      id: "contact-c1b",
      kind: "single",
      question: "Take that picture apart. Which piece was load-bearing, the one the work does not happen without?",
      header: "Necessary",
      note: "",
      options: [
        { id: "a", label: "Being unobserved. One person knowing about it would have changed what I made.", desc: "The privacy was a hard condition on the work." },
        { id: "b", label: "The time of day, and the specific quiet that comes with it.", desc: "The same hours are not available at noon." },
        { id: "c", label: "The constraint. Without something forcing a cut I keep everything.", desc: "The limit did the deciding." },
        { id: "d", label: "Another body in the room to push against.", desc: "Alone, the work has nothing to answer to." }
      ],
      multiSelectHint: false,
      next: { _other: "contact-c2", _default: "contact-c2" }
    },
    "contact-c2": {
      id: "contact-c2",
      kind: "single",
      question: "How do you know a piece is wrong before you can say why?",
      header: "Wrong",
      note: "",
      options: [
        { id: "a", label: "Something goes tight in the chest and stays tight while I keep working.", desc: "The body calls it before the argument arrives." },
        { id: "b", label: "I start tidying the file, renaming things, sorting the parts instead of deciding.", desc: "Housekeeping as avoidance." },
        { id: "c", label: "I want to show it to someone immediately, before it is finished.", desc: "The urge to get a verdict is the tell." },
        { id: "d", label: "I add one more element, then another, hoping volume will cover the problem.", desc: "Piling on where a cut is needed." }
      ],
      multiSelectHint: false,
      next: { _other: "contact-c3", _default: "contact-c3" }
    },
    "contact-c3": {
      id: "contact-c3",
      kind: "single",
      question: "And when it is right, before you can argue why. What happens in the body?",
      header: "Right",
      note: "",
      options: [
        { id: "a", label: "The shoulders drop and the room goes quiet even when it is not.", desc: "A physical settling." },
        { id: "b", label: "I stop wanting to check it against anyone. The question of what people think just leaves.", desc: "The audience falls away." },
        { id: "c", label: "Time collapses. I look up and hours are gone that I cannot account for.", desc: "No sense of duration passing." },
        { id: "d", label: "I get protective. I do not want to talk about it or show it yet.", desc: "The instinct is to guard it and keep it close." }
      ],
      multiSelectHint: false,
      next: { _other: "contact-c4", _default: "contact-c4" }
    },
    "contact-c4": {
      id: "contact-c4",
      kind: "single",
      question: "What reliably kills that state once it has started?",
      header: "Destroyer",
      note: "",
      options: [
        { id: "a", label: "A message from one particular person landing on my screen.", desc: "You know the name. One specific person." },
        { id: "b", label: "Checking how similar work is doing with other people’s names on it.", desc: "Comparison, mid-session." },
        { id: "c", label: "Being asked, kindly, when it will be finished.", desc: "The question reintroduces the clock." },
        { id: "d", label: "Stopping for one small errand and then not getting back to it.", desc: "The state does not survive the interruption." }
      ],
      multiSelectHint: false,
      next: { _other: "contact-c5", _default: "contact-c5" }
    },
    "contact-c5": {
      id: "contact-c5",
      kind: "single",
      question: "Across a normal week, how much of the practice is thinking about the work rather than having your hands in the material?",
      header: "Ratio",
      note: "",
      options: [
        { id: "a", label: "Nine parts planning, reading and deciding to one part making.", desc: "The making is a thin slice at the end." },
        { id: "b", label: "About half and half, and the thinking half keeps eating the making half.", desc: "Preparation expands to fill the time." },
        { id: "c", label: "Mostly making, and the thinking happens while the hands move.", desc: "Decisions get made in the material." },
        { id: "d", label: "Almost all making. I plan too little and find out the hard way.", desc: "Under-planned, and it costs redos." }
      ],
      multiSelectHint: false,
      next: { _other: "contact-c6", _default: "contact-c6" }
    },
    "contact-c6": {
      id: "contact-c6",
      kind: "single",
      question: "When did you last start something before you knew what it was going to be?",
      header: "No plan",
      note: "",
      options: [
        { id: "a", label: "This week. I start blind more often than not.", desc: "Beginning without a plan is the normal mode." },
        { id: "b", label: "Months ago, and it is rare enough that I remember the piece.", desc: "A rare exception you can date." },
        { id: "c", label: "Not since training. I need the plan settled before I touch anything.", desc: "The plan comes first, always." },
        { id: "d", label: "I do not work that way, and I have stopped treating that as a flaw.", desc: "A real answer in its own right. Treat it as data." }
      ],
      multiSelectHint: false,
      next: { _end: true }
    }
  }
};
