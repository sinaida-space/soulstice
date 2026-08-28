// Soulstice — Passage layer 9: Epoch.
// After: making from inside this time rather than about it or against it.
// Source: references/epoch.md (this layer has its own method) + layers.md.
// Rules enforced here:
//  - every option in the opening card is a FEELING, never a technology or a
//    named tool; all four are slightly wrong so the correction in Other is hers.
//  - beat two is mandatory: a specific first-person occasion from the last month.
//  - the refusal card is the layer’s main instrument; its beat two carries the
//    costume test ("nothing, it is a position I like having").
//  - no philosopher’s name and no hidden-vocabulary term appears in any visible
//    string. The positions behind this layer stay in epoch.md only.
//
// not ported: the reverse-constraint follow-up from layer 1 / style-workbook.
// It shares an instrument with the refusal card below (epoch-c6 / epoch-c6b);
// only one of the two runs per passage, and this layer keeps it.

export default {
  key: "epoch",
  title: "Epoch",
  arc: 3,
  intro: "",
  entry: "epoch-c1",
  cards: {
    "epoch-c1": {
      id: "epoch-c1",
      kind: "single",
      question: "Something is possible to feel now that was not possible to feel twenty years ago. Which is closest?",
      header: "Epoch",
      note: "None of these will be exact. Pick the nearest and correct it in your own words.",
      options: [
        { id: "a", label: "Being continuously, slightly watched, including by yourself.", desc: "The low hum of it as a mood, felt more than thought about." },
        { id: "b", label: "Grief for people and places you have not actually lost touch with.", desc: "Mourning something that is still technically present." },
        { id: "c", label: "Knowing a catastrophe in full detail and being able to do nothing with the knowledge.", desc: "Full information, no purchase on it." },
        { id: "d", label: "Suspecting that anything you make already exists somewhere, made by someone or by no one.", desc: "The sense of being preceded before you start." }
      ],
      multiSelectHint: false,
      next: { _other: "epoch-c2", _default: "epoch-c2" }
    },
    "epoch-c2": {
      id: "epoch-c2",
      kind: "single",
      question: "One time in the last month you actually felt that. Which occasion?",
      header: "Last month",
      note: "",
      options: [
        { id: "a", label: "Late, mid-scroll, when a stranger’s post landed harder than it had any right to.", desc: "A specific evening, a specific post." },
        { id: "b", label: "In a conversation, when everyone already knew the news I was about to bring.", desc: "The moment you noticed you were last to it." },
        { id: "c", label: "Looking at someone’s new work and feeling it was already mine before I made it.", desc: "A particular piece, a particular week." },
        { id: "d", label: "Alone at work, catching myself performing for a room that was not there.", desc: "One afternoon you can place exactly." }
      ],
      multiSelectHint: false,
      next: { _other: "epoch-c3", _default: "epoch-c3" }
    },
    "epoch-c3": {
      id: "epoch-c3",
      kind: "single",
      question: "What is your generation numb to, that an older person would still flinch at?",
      header: "Numb to",
      note: "",
      options: [
        { id: "a", label: "Bad news at scale. It arrives, it registers, it is gone by lunch.", desc: "The volume stopped landing." },
        { id: "b", label: "Being recorded. The camera stopped being an event a long time ago.", desc: "No longer a threshold worth noticing." },
        { id: "c", label: "Work that asks for two hours of attention. We call it self-indulgent now.", desc: "Length itself reads as a demand." },
        { id: "d", label: "Strangers’ anger. It is weather, and you dress for it.", desc: "Hostility as ambient condition." }
      ],
      multiSelectHint: false,
      next: { _other: "epoch-c4", _default: "epoch-c4" }
    },
    "epoch-c4": {
      id: "epoch-c4",
      kind: "single",
      question: "Name something this time makes easy that ought to be hard.",
      header: "Too easy",
      note: "",
      options: [
        { id: "a", label: "Reaching a large number of people with something I made in an afternoon.", desc: "Distribution with no friction to slow a bad decision." },
        { id: "b", label: "Abandoning a piece the moment it stops being fun, at no cost.", desc: "Quitting is frictionless now." },
        { id: "c", label: "Making something look finished and considered before it is either.", desc: "The surface arrives before the substance." },
        { id: "d", label: "Finding out that six other people had the same idea this week.", desc: "Discouragement, delivered instantly." }
      ],
      multiSelectHint: false,
      next: { _other: "epoch-c4b", _default: "epoch-c4b" }
    },
    "epoch-c4b": {
      id: "epoch-c4b",
      kind: "single",
      question: "And the inverse. Something this time makes hard that ought to be easy.",
      header: "Too hard",
      note: "",
      options: [
        { id: "a", label: "Letting a piece stay small and quiet and unshared without feeling it failed.", desc: "Modesty now reads as failure." },
        { id: "b", label: "Staying with one question for years instead of moving at the speed of the feed.", desc: "Slowness has to be defended." },
        { id: "c", label: "Not knowing what everyone else is doing right now.", desc: "Ignorance of the field takes effort to maintain." },
        { id: "d", label: "Believing the work matters when nothing external confirms it for months.", desc: "Conviction without feedback is expensive." }
      ],
      multiSelectHint: false,
      next: { _other: "epoch-c5", _default: "epoch-c5" }
    },
    "epoch-c5": {
      id: "epoch-c5",
      kind: "single",
      question: "What is being lost right now that nobody is bothering to record?",
      header: "Unrecorded",
      note: "",
      options: [
        { id: "a", label: "The texture of an ordinary week before this. It is going and no one is writing it down.", desc: "The mundane present, undocumented." },
        { id: "b", label: "Skills that were common one generation ago and will be gone in two.", desc: "Knowledge with no one left to hold it." },
        { id: "c", label: "The memory of what an afternoon fully off the grid actually felt like.", desc: "A kind of unreachability, disappearing." },
        { id: "d", label: "The specific quiet of places before they were photographed to exhaustion.", desc: "The version of a place that existed before its image." }
      ],
      multiSelectHint: false,
      next: { _other: "epoch-c6", _default: "epoch-c6" }
    },
    "epoch-c6": {
      id: "epoch-c6",
      kind: "single",
      question: "Where are you deliberately out of step? What do you refuse to be current about?",
      header: "Out of step",
      note: "",
      options: [
        { id: "a", label: "I will not shorten the work to fit how people look at things now, and I lose reach for it.", desc: "A refusal with a measurable cost." },
        { id: "b", label: "I stay off the platform everyone in my field networks on, and I hear about things late.", desc: "Missed rooms, missed openings." },
        { id: "c", label: "I refuse to describe a piece in the language funders want, and applications go badly.", desc: "Money left on the table for it." },
        { id: "d", label: "I work slow on purpose while the field rewards volume, and I look less productive than I am.", desc: "The output count works against you." }
      ],
      multiSelectHint: false,
      next: { _other: "epoch-c6b", _default: "epoch-c6b" }
    },
    "epoch-c6b": {
      id: "epoch-c6b",
      kind: "single",
      question: "That refusal. What does it actually protect?",
      header: "Protects",
      note: "",
      options: [
        { id: "a", label: "The part of the work that only shows up when it is not being rushed or pitched.", desc: "Something concrete is behind the refusal." },
        { id: "b", label: "A kind of attention the current way of working would use up.", desc: "A resource the refusal is guarding." },
        { id: "c", label: "My sense of which ideas are mine, which blurs when I watch everyone else too closely.", desc: "Authorship, protected by distance." },
        { id: "d", label: "Nothing. It is a position I like having.", desc: "If this is the true answer, the refusal is a costume and the layer is not done." }
      ],
      multiSelectHint: false,
      next: { _other: "epoch-c7", _default: "epoch-c7" }
    },
    "epoch-c7": {
      id: "epoch-c7",
      kind: "single",
      question: "Your tools belong to this moment and they have preferences. What do yours quietly push you to make?",
      header: "Tools want",
      note: "",
      options: [
        { id: "a", label: "Things that read fast and reproduce well, whatever I intended.", desc: "The tool optimises for circulation." },
        { id: "b", label: "More of what already worked, because repetition is frictionless.", desc: "The path of least resistance is backward." },
        { id: "c", label: "Work that stays inside the defaults, because leaving them is where it fights back.", desc: "The tool resists its own edges." },
        { id: "d", label: "Output on a schedule, because the tool is built to always be producing.", desc: "The software sets the rhythm and you keep pace with it." }
      ],
      multiSelectHint: false,
      next: { _other: "epoch-c7b", _default: "epoch-c7b" }
    },
    "epoch-c7b": {
      id: "epoch-c7b",
      kind: "single",
      question: "Suppose you make the thing your tools resist. What happens?",
      header: "Resist",
      note: "",
      options: [
        { id: "a", label: "It takes far longer and looks worse before it looks right.", desc: "The resistance shows up as time." },
        { id: "b", label: "I have to build or borrow a way to do it, and that becomes part of the work.", desc: "The workaround turns into method." },
        { id: "c", label: "The result does not travel well, and I have to be at peace with that.", desc: "It costs reach." },
        { id: "d", label: "I find out the resistance was mine all along and the tool was never the problem.", desc: "The limit was a habit wearing the tool’s clothes." }
      ],
      multiSelectHint: false,
      next: { _end: true }
    }
  }
};
