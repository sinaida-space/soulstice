// Soulstice — Passage layer 5: Field. Arc II opens here.
// After: the actual recurring vocabulary. The most important layer in the
// instrument. Everything past the works list is built from the person's own
// list, so the authored options here are deliberately generic-but-concrete
// recurrence CATEGORIES she maps onto her own titles through Other. There is
// no list parser; the mapping is her job.
//
// Method notes folded in: means-end climb (Why that / One more) and the
// self-defining-memory pair (First yours / After that).
//
// not ported (pool alternatives, kept for a later pass): the opposition-scale
// card (three pole axes, defend the placement) and the director card (which
// film director your body of work is). Use either only when the recurrences
// are named but their character is still vague.

export default {
  key: "field",
  title: "Field",
  arc: 2,
  intro: "",
  entry: "field-works",
  cards: {
    // The works list. One of the three open-text exceptions in the skill.
    // Saved verbatim to answers["field-works"].text and quoted back by the
    // Compass. The renderer submits { text: "" } for kind "open".
    "field-works": {
      id: "field-works",
      kind: "open",
      question: "List everything you have made in the last five years: the finished, the abandoned, the paid, the failed.",
      header: "Works",
      note: "Titles or one line each. No judgement, no editing for a reader.",
      options: [],
      multiSelectHint: false,
      next: { _default: "field-repeats" }
    },

    "field-repeats": {
      id: "field-repeats",
      kind: "multi",
      question: "Looking at that list, what actually repeats across the work?",
      header: "Repeats",
      note: "Tick the ones you can see more than twice. One of these is here because I am not sure it fits.",
      options: [
        { id: "material", label: "The same material or surface, coming back again and again.", desc: "The thing you reach for before you have decided anything." },
        { id: "scale", label: "A scale I keep returning to, either small and private or large and public.", desc: "The size the work wants to be, whatever the brief says." },
        { id: "speed", label: "A speed: something very slow, or something that rushes past.", desc: "How fast the work asks to be taken in." },
        { id: "light", label: "A kind of light or sound I reach for without thinking.", desc: "A texture that turns up whether or not it was planned." },
        { id: "body", label: "A relation to a body, mine or the viewer’s, and I am not always easy about which.", desc: "Where a person has to stand, move, or hold still for the work to happen." },
        { id: "time", label: "A time span: duration, decay, waiting, things that take as long as they take.", desc: "Work that will not be hurried and makes that the point." },
        { id: "absence", label: "A kind of absence: something withheld, missing, or kept off to the side.", desc: "The part you deliberately do not show." }
      ],
      multiSelectHint: true,
      next: { _default: "field-defend" }
    },

    // Open for fidelity: she names her own titles, no model-written options.
    "field-defend": {
      id: "field-defend",
      kind: "open",
      question: "Which two or three of these would you still defend in ten years?",
      header: "Defend",
      note: "Name them by their own titles.",
      options: [],
      multiSelectHint: false,
      next: { _default: "field-fright" }
    },

    "field-fright": {
      id: "field-fright",
      kind: "open",
      question: "Which one was the most frightening to make?",
      header: "Frightening",
      note: "One title is enough.",
      options: [],
      multiSelectHint: false,
      next: { _default: "field-fright-how" }
    },

    // Beat two on the frightening pick.
    "field-fright-how": {
      id: "field-fright-how",
      kind: "single",
      question: "Frightening how?",
      header: "How",
      note: "",
      options: [
        { id: "tech", label: "Technically. I was not sure I could actually pull it off.", desc: "The fear that the execution would fall short in front of people who would notice." },
        { id: "said", label: "Because of what it said, and who would see me having said it.", desc: "What frightened you was the content and who would read it." },
        { id: "stand", label: "Because it worked, and then I would have to stand behind it.", desc: "Success meant no more hiding behind the fact that it was a trial run." },
        { id: "let", label: "Because it showed how little I decided and how much I let happen.", desc: "The fear that someone would see it was not really authored." }
      ],
      multiSelectHint: false,
      next: { _default: "field-embarrass" }
    },

    "field-embarrass": {
      id: "field-embarrass",
      kind: "single",
      question: "Something on this list keeps coming back and you find it a little embarrassing. Which kind of thing?",
      header: "Embarrassing",
      note: "",
      options: [
        { id: "soft", label: "A soft, pretty move I reach for whenever a piece is not working.", desc: "The reliable charm you use to rescue a dead work." },
        { id: "personal", label: "A subject I keep circling that feels too personal to put in a statement.", desc: "The thing the work is really about, that you describe as something else in public." },
        { id: "borrowed", label: "A borrowed gesture from an artist I admire that I have never fully shaken.", desc: "A tic that is still theirs, years after you took it." },
        { id: "easy", label: "A format I return to because it is easy to finish, whatever it costs the work.", desc: "The shape you can always complete, chosen for that reason." }
      ],
      multiSelectHint: false,
      next: { _default: "field-theft" }
    },

    "field-theft": {
      id: "field-theft",
      kind: "single",
      question: "Someone takes one of your obsessions and does it better than you ever have. Which one would actually hurt?",
      header: "Theft",
      note: "Answer for the recurrence, not the single piece.",
      options: [
        { id: "slow", label: "If someone made the slow, waiting thing better than I do, and everyone knew it.", desc: "Your patience, out-patienced in public." },
        { id: "material", label: "If someone used the same material and made it look inevitable, where mine looks like a habit.", desc: "The same surface, suddenly reading as a choice instead of a default." },
        { id: "withheld", label: "If someone took the thing I withhold and made the withholding land harder.", desc: "Your restraint, done with more nerve." },
        { id: "body", label: "If someone put a body in it the way I keep trying to and finally got it right.", desc: "The relation you keep missing, hit cleanly by someone else." }
      ],
      multiSelectHint: false,
      next: { _default: "field-question" }
    },

    // The question card. All four formulations are deliberately clumsy,
    // non-curatorial and slightly wrong, so the real question arrives as her
    // correction in Other. The Compass takes that Other text verbatim.
    "field-question": {
      id: "field-question",
      kind: "single",
      question: "Your work keeps asking one question. None of these will be right. Pick the nearest and put it in your own words.",
      header: "The question",
      note: "",
      options: [
        { id: "disappear", label: "Is it about how long a thing takes to disappear?", desc: "A rough stab at the time obsession." },
        { id: "room", label: "Is it about what a room does to a person who did not choose to be in it?", desc: "A rough stab at the body and the setting." },
        { id: "attention", label: "Is it about whether paying attention to something counts as touching it?", desc: "A rough stab at the viewer’s part." },
        { id: "before", label: "Is it about the moment just before something is understood?", desc: "A rough stab at what the work withholds." }
      ],
      multiSelectHint: false,
      next: { _default: "field-ladder1" }
    },

    // Means-end climb, rung one.
    "field-ladder1": {
      id: "field-ladder1",
      kind: "single",
      question: "You keep returning to one of these. What does that return give you that nothing else does?",
      header: "Why that",
      note: "",
      options: [
        { id: "time", label: "It is the only way I know to make time visible to someone standing still.", desc: "A capacity you have found nowhere else in your practice." },
        { id: "hide", label: "It hides how little I decided and how much I let happen.", desc: "Cover for the parts you did not author." },
        { id: "only", label: "It is the one thing I can do that nobody else in the room does as well.", desc: "The move that makes you not replaceable on that job." },
        { id: "dead", label: "I do not know yet. I only know that when it is missing, the piece is dead.", desc: "A necessity you can feel but not yet name." }
      ],
      multiSelectHint: false,
      next: { _default: "field-ladder2" }
    },

    // Means-end climb, one rung further, toward a value that is not about the work.
    "field-ladder2": {
      id: "field-ladder2",
      kind: "single",
      question: "Suppose that is true. What does it actually give you, in a sentence that is not about the work at all?",
      header: "One more",
      note: "",
      options: [
        { id: "control", label: "Control. One place in my life where I still get to decide what counts.", desc: "" },
        { id: "irreplace", label: "The sense that I cannot be swapped for someone faster or cheaper.", desc: "" },
        { id: "permission", label: "Permission to stop pretending I planned it.", desc: "" },
        { id: "witnessed", label: "Proof to one person that I am not who I used to be.", desc: "" }
      ],
      multiSelectHint: false,
      next: { _default: "field-first" }
    },

    // Self-defining-memory pair. If she picks "still haven’t", that is the
    // finding, not a gap to fix; the Compass takes it as stated and the beat
    // two is answered through Other.
    "field-first": {
      id: "field-first",
      kind: "single",
      question: "Of everything on your list, when did something first feel like it was actually yours, not an exercise or an assignment? What was different about it?",
      header: "First yours",
      note: "",
      options: [
        { id: "unasked", label: "Nobody had asked for it and I made it anyway.", desc: "It existed with no brief, no client, no deadline behind it." },
        { id: "broke", label: "I broke a rule from my training and it did not collapse.", desc: "The thing you were told never to do, and the work survived it." },
        { id: "stopped", label: "I stopped explaining it in the statement and it still worked.", desc: "It held up without the paragraph that used to prop it." },
        { id: "never", label: "I still have not had that moment, and this list is proof.", desc: "Nothing here has crossed over into being yours yet." }
      ],
      multiSelectHint: false,
      next: { _default: "field-first-after" }
    },

    "field-first-after": {
      id: "field-first-after",
      kind: "single",
      question: "What did you do right after you noticed that?",
      header: "After that",
      note: "",
      options: [
        { id: "trusted", label: "Trusted it and kept going.", desc: "You let it set the direction from then on." },
        { id: "hid", label: "Hid it, and did the expected thing again next.", desc: "You noticed, then went back to what was safe." },
        { id: "once", label: "Repeated it once, on purpose, then stopped.", desc: "One deliberate echo, and then you let it drop." },
        { id: "built", label: "Built the last few years on it, and had not said so until now.", desc: "It has been the spine of the work without being named." }
      ],
      multiSelectHint: false,
      next: { _end: true }
    }
  }
};
