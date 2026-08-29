// Soulstice — Prologue. Establishes who is asking before Arc I begins.
// Six cards, linear: what she has done, training vs. current practice, what
// she believes, what she values, what others say, what she is known for.
// arc: null — the Prologue precedes arc 1 and never triggers an arc break.
// Options are situational and medium-neutral: they must read the same for a
// painter, a poet, a composer, a choreographer.

export default {
  key: "prologue",
  title: "Prologue",
  arc: null,
  intro: "",
  entry: "prologue-c1",
  cards: {
    "prologue-c1": {
      id: "prologue-c1",
      kind: "single",
      question: "Think about the years you have spent making things. What has most of that time actually gone into?",
      header: "So far",
      note: "",
      options: [
        { id: "a", label: "Finishing pieces and getting them in front of people, one after another.", desc: "A body of work exists, whatever its reception was." },
        { id: "b", label: "Long stretches of learning the craft, with less to show than the hours suggest.", desc: "The skill is real; the public record is thin." },
        { id: "c", label: "Starting often and abandoning most of it before anyone saw it.", desc: "A drawer, a hard drive, a shelf of unfinished things." },
        { id: "d", label: "Making to order for other people, with my own work fitted into the gaps.", desc: "Paid work first, the rest whenever it survived." }
      ],
      multiSelectHint: false,
      next: { _default: "prologue-c2" }
    },
    "prologue-c2": {
      id: "prologue-c2",
      kind: "single",
      question: "What you were trained to do and what you actually do now, and how far apart are they?",
      header: "Then / now",
      note: "",
      options: [
        { id: "a", label: "Almost the same. I still work the way I was taught.", desc: "The training took, and it still fits." },
        { id: "b", label: "The training is under everything, but the surface would be unrecognisable to my teachers.", desc: "Same foundation, a method they never showed me." },
        { id: "c", label: "I left most of it behind and taught myself a different way of working.", desc: "A deliberate break, and it cost something." },
        { id: "d", label: "I was never formally trained, so the real question is what I picked up, and from whom.", desc: "No lineage to claim or reject." }
      ],
      multiSelectHint: false,
      next: { _default: "prologue-c3" }
    },
    "prologue-c3": {
      id: "prologue-c3",
      kind: "single",
      question: "When you defend the kind of work you make, what belief are you actually defending?",
      header: "The belief",
      note: "",
      options: [
        { id: "a", label: "That close attention paid to small things is worth someone’s time.", desc: "The case for slowness and scale." },
        { id: "b", label: "That the work should unsettle before it pleases.", desc: "Discomfort first, and no apology for it." },
        { id: "c", label: "That craft and difficulty are their own argument.", desc: "The made thing carries the meaning." },
        { id: "d", label: "That making anything at all, in public, is worth the risk of being wrong.", desc: "Exposure treated as the point itself." }
      ],
      multiSelectHint: false,
      next: { _default: "prologue-c4" }
    },
    "prologue-c4": {
      id: "prologue-c4",
      kind: "single",
      question: "Away from the work itself, what do you actually organise your life around?",
      header: "What counts",
      note: "",
      options: [
        { id: "a", label: "Independence. Not answering to anyone about what I make.", desc: "Freedom priced above most other things." },
        { id: "b", label: "Being close to a few people whose judgement I trust.", desc: "A small room of readers rather than a public." },
        { id: "c", label: "Steadiness. A practice I can keep up for decades without burning out.", desc: "The long game over any single peak." },
        { id: "d", label: "Recognition, honestly. I want the work seen, and I want it to count.", desc: "The want said plainly, without the usual cover." }
      ],
      multiSelectHint: false,
      next: { _default: "prologue-c5" }
    },
    "prologue-c5": {
      id: "prologue-c5",
      kind: "single",
      question: "People who have worked alongside you describe you to someone who has not met you. What do they say you are like to work with?",
      header: "Their words",
      note: "",
      options: [
        { id: "a", label: "Exacting. I hold a standard and it can be hard to be around.", desc: "The rigour reads as friction sometimes." },
        { id: "b", label: "Quiet until it matters, then immovable on the few things I care about.", desc: "Low profile, hard edges where it counts." },
        { id: "c", label: "Generous with time and slow to claim credit.", desc: "Easy to work with, easy to overlook." },
        { id: "d", label: "Hard to pin down. They are not quite sure what I am after.", desc: "The through-line is not visible from outside." }
      ],
      multiSelectHint: false,
      next: { _default: "prologue-c6" }
    },
    "prologue-c6": {
      id: "prologue-c6",
      kind: "single",
      question: "Ask one of them what you are known for, in one line. What would they say?",
      header: "Known for",
      note: "",
      options: [
        { id: "a", label: "A particular texture or atmosphere that shows up in everything I make.", desc: "A recognisable signature, for better or worse." },
        { id: "b", label: "Technical control that other people in the room do not have.", desc: "The one who can actually do the hard part." },
        { id: "c", label: "Taking on subjects other people find too plain or too difficult.", desc: "Known for the ground chosen rather than the finish." },
        { id: "d", label: "Being promising. Always about to arrive, never quite arrived.", desc: "Known for potential, which is its own trap." }
      ],
      multiSelectHint: false,
      next: { _end: true }
    }
  }
};
