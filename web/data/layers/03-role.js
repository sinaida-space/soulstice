// Soulstice — Layer 3: Role. Expectations attached to a category: decorative,
// technical, emerging, foreign, and so on. Uses the downward arrow on
// "it would be immodest" (a label like any other, per unpacking.md).
// Beat-one cards: the category promise, the softening card (real edit moves),
// the immodest-ambition card with a "who would laugh" beat two, the
// different-name card. Layer ends at _end.
// Options are medium-neutral: edit moves, sentences, consequences.

export default {
  key: "role",
  title: "Role",
  arc: 1,
  intro: "",
  entry: "role-c1",
  cards: {
    // ---- Card 1: what the category promises --------------------
    "role-c1": {
      id: "role-c1",
      kind: "single",
      question: "People who have not encountered your work already expect a certain kind of maker. What does the category they put you in promise about you?",
      header: "Category",
      note: "",
      options: [
        { id: "a", label: "Decorative. Pleasant, atmospheric, safe for a room where nobody looks hard.", desc: "Pretty and removable." },
        { id: "b", label: "Support. Someone who handles the craft so a real artist can have the idea.", desc: "The hands rather than the head." },
        { id: "c", label: "Emerging. Permanently promising, never quite arrived.", desc: "Potential as a permanent address." },
        { id: "d", label: "Exotic. Interesting because of where I am from, read through that before anything else.", desc: "Origin first, work second." }
      ],
      multiSelectHint: false,
      next: { a: "role-c1a", b: "role-c1b", c: "role-c1c", d: "role-c1d", _other: "role-c1c", _default: "role-c1c" }
    },
    "role-c1a": {
      id: "role-c1a",
      kind: "single",
      question: "The room files you as decorative. Which part of that have you started to believe yourself?",
      header: "Decorative",
      note: "",
      options: [
        { id: "a", label: "That my strongest instinct, for surface and atmosphere, is a minor gift.", desc: "The talent ranked low by its owner." },
        { id: "b", label: "That if I made something harder to like, it would just be worse.", desc: "Difficulty assumed to be beyond me." },
        { id: "c", label: "That I earn my place by being easy to have around.", desc: "Agreeableness as the fee." },
        { id: "d", label: "That the ceiling for what I do is tasteful, and I am near it.", desc: "A low roof, accepted." }
      ],
      multiSelectHint: false,
      next: { _default: "role-c2" }
    },
    "role-c1b": {
      id: "role-c1b",
      kind: "single",
      question: "You are read as the person who executes someone else’s vision. What of that have you accepted?",
      header: "Support",
      note: "",
      options: [
        { id: "a", label: "I wait to be handed a brief instead of setting my own.", desc: "Authorship deferred by habit." },
        { id: "b", label: "I describe my own projects as experiments so nobody expects a position.", desc: "Framing that lowers the stakes." },
        { id: "c", label: "I let other people be the author when the work is mostly mine.", desc: "Credit passed along quietly." },
        { id: "d", label: "I am more comfortable being indispensable than being credited.", desc: "Safer in the engine room." }
      ],
      multiSelectHint: false,
      next: { _default: "role-c2" }
    },
    "role-c1c": {
      id: "role-c1c",
      kind: "single",
      question: "You are the permanently promising one. How does that suit you?",
      header: "Emerging",
      note: "",
      options: [
        { id: "a", label: "Promising is safe. Nothing finished can be measured against the promise.", desc: "No result, no verdict." },
        { id: "b", label: "I have learned to perform potential better than I make things.", desc: "The pitch outpaces the practice." },
        { id: "c", label: "I resent the label and reach for it when it protects me.", desc: "Both hate it and use it." },
        { id: "d", label: "I am afraid that arriving would show the promise was the best part.", desc: "The fear behind the comfort." }
      ],
      multiSelectHint: false,
      next: { _default: "role-c2" }
    },
    "role-c1d": {
      id: "role-c1d",
      kind: "single",
      question: "Your origin gets read first. Where do you play along with it?",
      header: "Exotic",
      note: "",
      options: [
        { id: "a", label: "I lead with the biography because it opens doors faster than the work.", desc: "The story does the knocking." },
        { id: "b", label: "I have made pieces about where I am from that I did not want to make.", desc: "Answering an expectation rather than a question." },
        { id: "c", label: "I flatten myself into the story people already expect.", desc: "Editing to fit the frame." },
        { id: "d", label: "I am angry about it and still use it when a deadline is close.", desc: "Principle set aside under pressure." }
      ],
      multiSelectHint: false,
      next: { _default: "role-c2" }
    },
    // ---- Card 2: the softening card (real edit moves) --------
    "role-c2": {
      id: "role-c2",
      kind: "single",
      question: "Think about the last message you sent proposing your work to someone. What did you cut or soften before you hit send?",
      header: "Softening",
      note: "",
      options: [
        { id: "a", label: "I dropped the fee, or offered to do the first one for nothing.", desc: "Price lowered pre-emptively." },
        { id: "b", label: "I added “just” and “a little” until the ask sounded smaller.", desc: "Shrinking words on the request." },
        { id: "c", label: "I called it an experiment so it would not be judged as a finished position.", desc: "Lowering what it claims to be." },
        { id: "d", label: "I removed the sentence that said plainly what the work was about.", desc: "The clearest line, cut." }
      ],
      multiSelectHint: false,
      next: { a: "role-c2a", b: "role-c2b", c: "role-c2c", d: "role-c2d", _other: "role-c2d", _default: "role-c2d" }
    },
    "role-c2a": {
      id: "role-c2a",
      kind: "single",
      question: "You dropped the money. What did that protect?",
      header: "The fee",
      note: "",
      options: [
        { id: "a", label: "The chance to be told the work was not worth paying for.", desc: "Free cannot be priced too high." },
        { id: "b", label: "My idea of myself as someone who does it for love and never for the money.", desc: "A self-image maintained at cost." },
        { id: "c", label: "A no. Free is harder to refuse, so I avoid the rejection.", desc: "Buying a yes with the fee." },
        { id: "d", label: "It protects nothing. It just trains people to expect free.", desc: "A habit that works against you." }
      ],
      multiSelectHint: false,
      next: { _default: "role-c3" }
    },
    "role-c2b": {
      id: "role-c2b",
      kind: "single",
      question: "You shrank the ask with softening words. What were you avoiding?",
      header: "“Just”",
      note: "",
      options: [
        { id: "a", label: "Looking like I think my time is worth interrupting someone for.", desc: "The nerve of a direct ask." },
        { id: "b", label: "The silence that follows a direct request.", desc: "An unhedged ask can just hang there." },
        { id: "c", label: "Being seen wanting something badly.", desc: "Visible want feels exposing." },
        { id: "d", label: "Having to hold the line if they pushed back.", desc: "A small ask is easy to abandon." }
      ],
      multiSelectHint: false,
      next: { _default: "role-c3" }
    },
    "role-c2c": {
      id: "role-c2c",
      kind: "single",
      question: "You called it an experiment. What does that framing let you dodge?",
      header: "Experiment",
      note: "",
      options: [
        { id: "a", label: "Standing behind it as a claim I would defend.", desc: "No position, nothing to defend." },
        { id: "b", label: "Being held to it later if it worked.", desc: "Success without a follow-up obligation." },
        { id: "c", label: "The expectation that I have a method, when I am improvising.", desc: "Improvisation relabelled as research." },
        { id: "d", label: "Ownership. An experiment can fail without me failing.", desc: "The result is quarantined from the maker." }
      ],
      multiSelectHint: false,
      next: { _default: "role-c3" }
    },
    "role-c2d": {
      id: "role-c2d",
      kind: "single",
      question: "You cut the line that said what it was about. Why does that line feel dangerous to send?",
      header: "The point",
      note: "",
      options: [
        { id: "a", label: "Stated plainly, it might sound smaller than it feels to me.", desc: "Fear the claim will not survive daylight." },
        { id: "b", label: "It commits me, and I would rather stay able to say it was something else.", desc: "Keeping an exit." },
        { id: "c", label: "It invites the person to disagree with the whole premise.", desc: "A clear claim is a target." },
        { id: "d", label: "It reveals how ambitious the work actually is.", desc: "The scale of the want, exposed." }
      ],
      multiSelectHint: false,
      next: { _default: "role-c3" }
    },
    // ---- Card 3: the immodest ambition card ------------------
    "role-c3": {
      id: "role-c3",
      kind: "single",
      question: "Say the ambition without softening it. Which of these is closest to what you actually want?",
      header: "Ambition",
      note: "",
      options: [
        { id: "a", label: "I want to be the person others in my field quietly measure themselves against.", desc: "A private benchmark for your peers." },
        { id: "b", label: "I want to make one thing that outlives me and gets argued about.", desc: "A work with an afterlife." },
        { id: "c", label: "I want to change how people in my form think it can be done.", desc: "A change in how the form works, beyond one success." },
        { id: "d", label: "I want to be named, eventually, among the few who mattered in this.", desc: "A place in the short history." }
      ],
      multiSelectHint: false,
      next: { a: "role-c3a", b: "role-c3b", c: "role-c3c", d: "role-c3d", _other: "role-c3d", _default: "role-c3d" }
    },
    "role-c3a": {
      id: "role-c3a",
      kind: "single",
      question: "You said you want to be the one others measure against. Picture saying that out loud. Who laughs?",
      header: "Who laughs",
      note: "",
      options: [
        { id: "a", label: "A specific peer who is currently ahead of me.", desc: "The comparison you already lose." },
        { id: "b", label: "A teacher who always framed me as competent and limited.", desc: "An old ceiling, still talking." },
        { id: "c", label: "An older relative who never took the work seriously.", desc: "The family verdict." },
        { id: "d", label: "Me. I am laughing before anyone else gets the chance.", desc: "The first laugh is yours." }
      ],
      multiSelectHint: false,
      next: { _default: "role-c4" }
    },
    "role-c3b": {
      id: "role-c3b",
      kind: "single",
      question: "You want to make one thing that outlives you. Who in your life would find that funny coming from you?",
      header: "Who laughs",
      note: "",
      options: [
        { id: "a", label: "A collaborator who files me under reliable and never visionary.", desc: "Cast as the steady one." },
        { id: "b", label: "The part of my family that measures work in pay slips.", desc: "Legacy does not show on a payslip." },
        { id: "c", label: "A former version of me that promised this and stalled.", desc: "The last time you said it." },
        { id: "d", label: "Me, because saying it feels like tempting fate.", desc: "Superstition doing the mocking." }
      ],
      multiSelectHint: false,
      next: { _default: "role-c4" }
    },
    "role-c3c": {
      id: "role-c3c",
      kind: "single",
      question: "You want to change how the form is done. Whose laugh do you hear first?",
      header: "Who laughs",
      note: "",
      options: [
        { id: "a", label: "The gatekeepers who have not let me far enough in to try.", desc: "Laughed at from inside the door." },
        { id: "b", label: "Peers who would call it arrogance the moment I said it.", desc: "The word waiting for the claim." },
        { id: "c", label: "A mentor who would say learn the rules first.", desc: "Permission withheld." },
        { id: "d", label: "Me, filling the silence before anyone else can.", desc: "Pre-empting the room." }
      ],
      multiSelectHint: false,
      next: { _default: "role-c4" }
    },
    "role-c3d": {
      id: "role-c3d",
      kind: "single",
      question: "You want to be counted among the few who mattered. Who laughs at that?",
      header: "Who laughs",
      note: "",
      options: [
        { id: "a", label: "Almost everyone, on first hearing, which is why I never say it.", desc: "The claim kept fully private." },
        { id: "b", label: "The people closest to me, who know all my unfinished things.", desc: "They have seen the drawer." },
        { id: "c", label: "The field, which has a long list of people who said this and vanished.", desc: "History is not on your side." },
        { id: "d", label: "Me, hardest of all.", desc: "The loudest laugh is internal." }
      ],
      multiSelectHint: false,
      next: { _default: "role-c4" }
    },
    // ---- Card 4: the different-name card --------------------
    "role-c4": {
      id: "role-c4",
      kind: "single",
      question: "The exact same work, signed with a different name, made by someone with more standing than you. What changes?",
      header: "Their name",
      note: "",
      options: [
        { id: "a", label: "It gets read as rigorous rather than merely pretty.", desc: "The seriousness comes with the signature." },
        { id: "b", label: "It is taken as a deliberate position rather than a mood or a phase.", desc: "Intent assumed instead of doubted." },
        { id: "c", label: "It is priced two or three times higher and nobody blinks.", desc: "The number follows the name." },
        { id: "d", label: "Nothing changes, and that is worse, because then the ceiling is the work.", desc: "No one to blame but the piece." }
      ],
      multiSelectHint: false,
      next: { a: "role-c4a", b: "role-c4b", c: "role-c4c", d: "role-c4d", _other: "role-c4a", _default: "role-c4a" }
    },
    "role-c4a": {
      id: "role-c4a",
      kind: "single",
      question: "Under a bigger name it reads as rigorous. What does that tell you to do with your own name?",
      header: "Rigorous",
      note: "",
      options: [
        { id: "a", label: "Stop pre-apologising, and let the work carry the seriousness.", desc: "Remove the hedges and see." },
        { id: "b", label: "Say the intention plainly instead of hiding it under atmosphere.", desc: "State the claim the work makes." },
        { id: "c", label: "Build the standing, slowly, so the reading changes.", desc: "A long project, and a real one." },
        { id: "d", label: "Accept that I have been briefing people to underrate it.", desc: "The framing was mine." }
      ],
      multiSelectHint: false,
      next: { _end: true }
    },
    "role-c4b": {
      id: "role-c4b",
      kind: "single",
      question: "The same work becomes a position with a different signature. What have you been doing to keep it a mood?",
      header: "Position",
      note: "",
      options: [
        { id: "a", label: "Titling everything vaguely so it commits to nothing.", desc: "No title, no thesis." },
        { id: "b", label: "Talking about process and never about stakes.", desc: "How, never why it matters." },
        { id: "c", label: "Letting each piece stand alone so no argument builds across them.", desc: "No accumulation, no line." },
        { id: "d", label: "Refusing to say what I am against.", desc: "A position needs an opponent." }
      ],
      multiSelectHint: false,
      next: { _end: true }
    },
    "role-c4c": {
      id: "role-c4c",
      kind: "single",
      question: "A bigger name triples the price. What does the low price you set actually communicate?",
      header: "Priced up",
      note: "",
      options: [
        { id: "a", label: "That I expect to be talked down and have pre-agreed.", desc: "The discount is built in." },
        { id: "b", label: "That I value being chosen over being paid.", desc: "A trade you keep making." },
        { id: "c", label: "That I do not believe the buyer would pay more, so I never test it.", desc: "An untested assumption running the number." },
        { id: "d", label: "That I am still pricing like the beginner I no longer am.", desc: "The rate did not grow with the work." }
      ],
      multiSelectHint: false,
      next: { _end: true }
    },
    "role-c4d": {
      id: "role-c4d",
      kind: "single",
      question: "You picked the hardest one: nothing would change. If that is true, what follows?",
      header: "No change",
      note: "",
      options: [
        { id: "a", label: "The limit is the work, so I have to make a better thing before a better pitch.", desc: "Back to the material." },
        { id: "b", label: "I have been blaming standing for a problem that is mine to fix.", desc: "The excuse falls away." },
        { id: "c", label: "The category is accurate, and I have to accept it or break it with the next piece.", desc: "A fork in the road rather than a grievance." },
        { id: "d", label: "I would rather it were unfair, because unfair is easier to live with.", desc: "Injustice is more comfortable than a ceiling." }
      ],
      multiSelectHint: false,
      next: { _end: true }
    }
  }
};
