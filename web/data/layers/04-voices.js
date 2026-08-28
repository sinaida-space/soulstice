// Soulstice — Layer 4: Voices. Wants that arrived from outside and are felt
// as personal desire. Subtractive cards (impulse origin, the ten-year card,
// whose approval) plus the role-model-gap cluster (Career Construction
// Interview, Savickas) and the resonance / frisson cluster (cognitive
// interview retrieval mechanics; frisson as a validated marker). The final
// card routes to "_arc-break" — the between-arc break fires after this layer.
//
// not ported: the "which artist do you check on most often, and what does
//   checking do" card (layers.md L253-256) — overlaps whose-approval; budget.
// not ported: the format / platform card (layers.md L257) — medium-specific
//   by construction, and the resolved fork bans medium-specific options.
// not ported: the good-memory card and its open-text "say more" beat two
//   (layers.md L331-349) — the issue asks for ONE of {resonance, good-memory};
//   resonance / frisson is the stronger diagnostic here.
// not ported: the bridge card (layers.md L350-359) — it connects resonance
//   back to practice, which belongs to Compass assembly (M4), not Arc I.
//
// All options are medium-neutral: kinds of project, categories of person,
// sounds and weather and rooms.

export default {
  key: "voices",
  title: "Voices",
  arc: 1,
  intro: "",
  entry: "voices-c1",
  cards: {
    // ---- Card 1: where the impulse came from -----------------
    "voices-c1": {
      id: "voices-c1",
      kind: "single",
      question: "Your last few decisions about what to make or what to apply for. Where did the impulse actually come from? Pick the one you are least comfortable admitting.",
      header: "Impulse",
      note: "",
      options: [
        { id: "a", label: "I saw something someone else made and wanted to be able to do that.", desc: "The reach was toward their result." },
        { id: "b", label: "An open call had a theme and a deadline, and I shaped myself to fit it.", desc: "The brief set the direction." },
        { id: "c", label: "Someone specific was doing well, and I wanted to be in that conversation.", desc: "Proximity to their moment." },
        { id: "d", label: "It came from the work itself, and nothing outside it.", desc: "If this is the true one, the next card asks for the week it happened." }
      ],
      multiSelectHint: false,
      next: { a: "voices-c1a", b: "voices-c1b", c: "voices-c1c", d: "voices-c1d", _other: "voices-c1b", _default: "voices-c1b" }
    },
    "voices-c1a": {
      id: "voices-c1a",
      kind: "single",
      question: "You wanted to be able to do the thing you saw. What were you actually reaching for?",
      header: "That thing",
      note: "",
      options: [
        { id: "a", label: "The skill itself, cleanly. I wanted the technique in my hands.", desc: "A craft want, straightforwardly." },
        { id: "b", label: "The recognition that came to the person who made it.", desc: "The applause rather than the method." },
        { id: "c", label: "The feeling of being current, of not being left behind.", desc: "Keeping pace with the room." },
        { id: "d", label: "Proof that I could, more than any wish to actually make that.", desc: "A dare to myself." }
      ],
      multiSelectHint: false,
      next: { _default: "voices-c2" }
    },
    "voices-c1b": {
      id: "voices-c1b",
      kind: "single",
      question: "You fitted yourself to a call’s theme. What did that cost the work?",
      header: "The brief",
      note: "",
      options: [
        { id: "a", label: "It became an answer to someone else’s question, well made and hollow.", desc: "Well made, and still not yours." },
        { id: "b", label: "I dropped the thing I was actually circling to hit the deadline.", desc: "A real thread, abandoned." },
        { id: "c", label: "I learned to generate a plausible fit fast, which is its own bad habit.", desc: "A skill you would rather not have." },
        { id: "d", label: "Nothing. The constraint was good for me. I just would not have chosen it.", desc: "Useful, and still external." }
      ],
      multiSelectHint: false,
      next: { _default: "voices-c2" }
    },
    "voices-c1c": {
      id: "voices-c1c",
      kind: "single",
      question: "You wanted into the conversation around someone doing well. What were you after?",
      header: "The talk",
      note: "",
      options: [
        { id: "a", label: "To be seen next to them, so their standing rubbed off.", desc: "Adjacency as a strategy." },
        { id: "b", label: "To prove I belonged at that level, mostly to myself.", desc: "An argument aimed inward." },
        { id: "c", label: "To not be the one left out while peers moved up.", desc: "Fear of the empty chair." },
        { id: "d", label: "Their actual concerns, which I did share, tangled up with the envy.", desc: "A real overlap, contaminated." }
      ],
      multiSelectHint: false,
      next: { _default: "voices-c2" }
    },
    "voices-c1d": {
      id: "voices-c1d",
      kind: "single",
      question: "It came from the work itself. Name the week. What were you doing when the impulse arrived?",
      header: "The work",
      note: "",
      options: [
        { id: "a", label: "Mid-project, and it grew directly out of a problem in the current piece.", desc: "One thing led to the next." },
        { id: "b", label: "In a fallow stretch, not looking for anything, and it surfaced anyway.", desc: "Unbidden, in the quiet." },
        { id: "c", label: "Just after finishing something, in the restless gap before the next thing.", desc: "The itch between projects." },
        { id: "d", label: "I cannot place the week, which makes me less sure it came from where I said.", desc: "No memory to anchor the claim." }
      ],
      multiSelectHint: false,
      next: { _default: "voices-c2" }
    },
    // ---- Card 2: the ten-year card (multi) ------------------
    "voices-c2": {
      id: "voices-c2",
      kind: "multi",
      question: "Which of these would you still make if no one could see the result for ten years? Tick every one that survives that condition.",
      header: "Ten years",
      note: "Whatever you leave unticked is the finding.",
      options: [
        { id: "a", label: "The project I am currently telling people about.", desc: "The one in the elevator pitch." },
        { id: "b", label: "The one I keep almost starting and postponing.", desc: "Deferred again and again." },
        { id: "c", label: "The safe one that I know would do well if I released it.", desc: "A reliable win." },
        { id: "d", label: "The odd one nobody has asked for and I am a little embarrassed by.", desc: "The private, awkward one." },
        { id: "e", label: "The one I would only make to answer someone who doubted me.", desc: "A reply disguised as a project." }
      ],
      multiSelectHint: true,
      next: { _default: "voices-c2x" }
    },
    "voices-c2x": {
      id: "voices-c2x",
      kind: "single",
      question: "Look at what you did not tick. What does leaving it off actually say?",
      header: "Left out",
      note: "",
      options: [
        { id: "a", label: "It only exists for an audience, and without one it has no reason to be made.", desc: "The viewer was the point." },
        { id: "b", label: "I want the credit for it more than I want the thing.", desc: "The byline over the object." },
        { id: "c", label: "It is someone else’s idea of what I should do next.", desc: "A borrowed plan." },
        { id: "d", label: "I would still make it, I just could not admit that on a card like this.", desc: "The condition scared off an honest tick." }
      ],
      multiSelectHint: false,
      next: { _default: "voices-c3" }
    },
    // ---- Card 3: whose approval you wait for ---------------
    "voices-c3": {
      id: "voices-c3",
      kind: "single",
      question: "After you put something out, whose reaction are you actually waiting for?",
      header: "Approval",
      note: "",
      options: [
        { id: "a", label: "One specific person, whose opinion privately decides it for me.", desc: "A single judge with a veto." },
        { id: "b", label: "The small circle of peers who make work near mine.", desc: "The people in the same lane." },
        { id: "c", label: "The people slightly above me who could open a door.", desc: "Watching for the gatekeepers’ nod." },
        { id: "d", label: "A crowd of near-strangers, counted rather than known.", desc: "A number standing in for a verdict." }
      ],
      multiSelectHint: false,
      next: { a: "voices-c3a", b: "voices-c3b", c: "voices-c3c", d: "voices-c3d", _other: "voices-c3a", _default: "voices-c3a" }
    },
    "voices-c3a": {
      id: "voices-c3a",
      kind: "single",
      question: "One person’s reaction decides it. What happens to the work while you wait for them?",
      header: "One person",
      note: "",
      options: [
        { id: "a", label: "I read it through their eyes and pre-edit to their taste.", desc: "Their preferences get in early." },
        { id: "b", label: "I cannot tell if I like it until they respond.", desc: "Your own judgement on hold." },
        { id: "c", label: "Their silence can sink a piece I was sure of the day before.", desc: "One non-reply reverses a verdict." },
        { id: "d", label: "I have been making a version of the work for them for years.", desc: "A long private address." }
      ],
      multiSelectHint: false,
      next: { _default: "voices-c4" }
    },
    "voices-c3b": {
      id: "voices-c3b",
      kind: "single",
      question: "You are waiting on the circle making work near yours. What does that do?",
      header: "The peers",
      note: "",
      options: [
        { id: "a", label: "I drift toward what the group already values.", desc: "Consensus pulls the work in." },
        { id: "b", label: "I keep score, and a peer’s good week can spoil mine.", desc: "Their wins register as your losses." },
        { id: "c", label: "I avoid the moves that would set me apart from them.", desc: "Staying inside the pack." },
        { id: "d", label: "I mistake their approval for the work being good.", desc: "Their yes stands in for quality." }
      ],
      multiSelectHint: false,
      next: { _default: "voices-c4" }
    },
    "voices-c3c": {
      id: "voices-c3c",
      kind: "single",
      question: "You are watching the people who could let you in. How does that shape what you make?",
      header: "The door",
      note: "",
      options: [
        { id: "a", label: "I make things legible to gatekeepers rather than to anyone else.", desc: "Addressed to the committee." },
        { id: "b", label: "I hold back the strange work until I am safely inside, and then never release it.", desc: "A permanent waiting room." },
        { id: "c", label: "I read every non-reply as a verdict.", desc: "Silence gets over-interpreted." },
        { id: "d", label: "I have started to want the door more than the room behind it.", desc: "Access became the goal." }
      ],
      multiSelectHint: false,
      next: { _default: "voices-c4" }
    },
    "voices-c3d": {
      id: "voices-c3d",
      kind: "single",
      question: "It is the number you are waiting on. What does watching the count do to you?",
      header: "The count",
      note: "",
      options: [
        { id: "a", label: "A slow response makes me doubt work I was proud of.", desc: "The tally overrides the memory of making it." },
        { id: "b", label: "I make more of whatever the count rewards, and I can feel it narrowing me.", desc: "Feedback loop closing in." },
        { id: "c", label: "I feel briefly good and then emptier than before I posted.", desc: "A short lift, a longer drop." },
        { id: "d", label: "I have started making things for the count and calling it reach.", desc: "A motive with a nicer name." }
      ],
      multiSelectHint: false,
      next: { _default: "voices-c4" }
    },
    // ---- Card 4: the role-model gap (Savickas, CCI) -------
    "voices-c4": {
      id: "voices-c4",
      kind: "single",
      question: "Before you had a style, someone else’s work made you think: that is what I want to be able to do. Who, and what did they have that you did not?",
      header: "Model",
      note: "",
      options: [
        { id: "a", label: "A specific maker whose technical control I did not have, and still measure myself against.", desc: "A skill gap that never quite closed." },
        { id: "b", label: "Someone whose ease in a room I wanted more than their work itself.", desc: "Their bearing more than their output." },
        { id: "c", label: "A person who was allowed to be difficult and still get shown, which I was not.", desc: "A permission you were denied." },
        { id: "d", label: "Nobody in particular. I built my sense of good from a scene rather than a person.", desc: "A collective standard, no single face." }
      ],
      multiSelectHint: false,
      next: { a: "voices-c5", b: "voices-c5", c: "voices-c5", d: "voices-c5d", _other: "voices-c5", _default: "voices-c5" }
    },
    "voices-c5": {
      id: "voices-c5",
      kind: "single",
      question: "That gap between what they had and what you had. Is it still open, or did you close it and keep chasing the person anyway?",
      header: "Chasing",
      note: "",
      options: [
        { id: "a", label: "Closed, and I still check on them anyway.", desc: "The habit outlived the need." },
        { id: "b", label: "Open, and I have stopped pretending otherwise.", desc: "Named, at least." },
        { id: "c", label: "Closed, and I had not noticed until this question.", desc: "Caught up without registering it." },
        { id: "d", label: "It was never about the gap. It is about being seen by that specific person.", desc: "The audience of one again." }
      ],
      multiSelectHint: false,
      next: { _default: "voices-c6" }
    },
    "voices-c5d": {
      id: "voices-c5d",
      kind: "single",
      question: "Your sense of good came from a scene rather than a person. What did that scene require of you?",
      header: "The scene",
      note: "",
      options: [
        { id: "a", label: "To value what it valued before I knew why.", desc: "Absorbed the taste before choosing it." },
        { id: "b", label: "To be embarrassed by the tastes it was embarrassed by, including some of mine.", desc: "Its shame list became yours." },
        { id: "c", label: "To treat its blind spots as settled questions.", desc: "Its gaps went unexamined." },
        { id: "d", label: "To keep proving I belonged, since no one mentor was there to vouch for me.", desc: "Membership on permanent probation." }
      ],
      multiSelectHint: false,
      next: { _default: "voices-c6" }
    },
    // ---- Card 5: resonance / frisson (run warm) -----------
    "voices-c6": {
      id: "voices-c6",
      kind: "multi",
      question: "Not art with a capital A. A sound, a smell, weather, a stranger’s voice, something in the wrong place. What has actually given you chills, the literal goosebumps kind, in the last year or two?",
      header: "Chills",
      note: "Pick the ones that actually happened, skipping the ones you only like the idea of.",
      options: [
        { id: "a", label: "Music heard outdoors, at the wrong volume, in the wrong season.", desc: "Sound in a setting it did not belong to." },
        { id: "b", label: "A very ordinary domestic sound landing at exactly the right moment.", desc: "Keys, cutlery, someone typing nearby." },
        { id: "c", label: "A voice, where only the register of it mattered, never the words.", desc: "Timbre over content." },
        { id: "d", label: "Weather doing something dramatic while something completely mundane happened next to it.", desc: "A storm over a small ordinary task." }
      ],
      multiSelectHint: true,
      next: { _default: "voices-c7" }
    },
    // ---- Card 6: context reinstatement -> the arc break ---
    "voices-c7": {
      id: "voices-c7",
      kind: "single",
      question: "Take the one that surprised you most. Where were you, actually? What time was it, who else was there, what had just happened?",
      header: "Setting",
      note: "",
      options: [
        { id: "a", label: "Alone, and not expecting it.", desc: "No one to perform the reaction for." },
        { id: "b", label: "In a crowd, and it felt strangely private inside it.", desc: "A pocket of solitude in a room of people." },
        { id: "c", label: "Mid-conversation, so it cut across something else.", desc: "It interrupted, uninvited." },
        { id: "d", label: "In the middle of a boring task that should not have let anything through.", desc: "The guard was down." }
      ],
      multiSelectHint: false,
      next: { _default: "_arc-break" }
    }
  }
};
