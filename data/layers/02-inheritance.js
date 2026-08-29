// Soulstice — Layer 2: Inheritance. Aesthetic and moral defaults installed
// before there was a choice. Aim at the house, not the biography.
// Beat-one cards: what counted as good, what was mocked, the money rule as a
// spoken sentence, the embarrassing-liking card, a multi of standards never
// chosen, and a keep-or-drop close. Layer ends at _end.
// Every option is a medium-neutral situation, rule or sentence.

export default {
  key: "inheritance",
  title: "Inheritance",
  arc: 1,
  intro: "",
  entry: "inheritance-c1",
  cards: {
    // ---- Card 1: what counted as good in the house -----------------
    "inheritance-c1": {
      id: "inheritance-c1",
      kind: "single",
      question: "Before you had any taste of your own, what counted as good in the house you grew up in?",
      header: "House",
      note: "",
      options: [
        { id: "a", label: "Something useful. Making things was fine as long as it could also be a job.", desc: "Value measured by what it earned or served." },
        { id: "b", label: "Something difficult. Effort was the proof that a thing had worth.", desc: "The struggle had to show." },
        { id: "c", label: "Something respectable. Whatever other people would recognise as culture.", desc: "Standing decided by an outside eye." },
        { id: "d", label: "Nothing anyone named. It was never discussed, and that was its own lesson.", desc: "Silence as instruction." }
      ],
      multiSelectHint: false,
      next: { a: "inheritance-c1a", b: "inheritance-c1b", c: "inheritance-c1c", d: "inheritance-c1d", _other: "inheritance-c1a", _default: "inheritance-c1a" }
    },
    "inheritance-c1a": {
      id: "inheritance-c1a",
      kind: "single",
      question: "Good meant useful. What rule about your own work did that leave you carrying?",
      header: "Useful",
      note: "",
      options: [
        { id: "a", label: "If it does not earn or serve, I have to apologise for the time it took.", desc: "Unpaid time needs a defence." },
        { id: "b", label: "Pick projects that can be explained to someone practical in one sentence.", desc: "Legibility as a filter on ideas." },
        { id: "c", label: "Keep a real job so the making never has to justify itself.", desc: "A hedge that became a habit." },
        { id: "d", label: "Anything I make purely because I want to feels like getting away with something.", desc: "Pleasure reads as theft." }
      ],
      multiSelectHint: false,
      next: { _default: "inheritance-c2" }
    },
    "inheritance-c1b": {
      id: "inheritance-c1b",
      kind: "single",
      question: "Good meant hard-won. What rule did that install?",
      header: "Difficult",
      note: "",
      options: [
        { id: "a", label: "If it came easily, it does not count, and I should hide that it was easy.", desc: "Ease has to be concealed." },
        { id: "b", label: "Choose the harder method even when a simpler one is better.", desc: "Difficulty for its own sake." },
        { id: "c", label: "Suffering visible in the work counts as a feature.", desc: "Strain as a selling point." },
        { id: "d", label: "Rest feels like cheating, so I do not stop when I should.", desc: "No permission to pause." }
      ],
      multiSelectHint: false,
      next: { _default: "inheritance-c2" }
    },
    "inheritance-c1c": {
      id: "inheritance-c1c",
      kind: "single",
      question: "Good meant respectable. What rule did that leave?",
      header: "Respectable",
      note: "",
      options: [
        { id: "a", label: "Aim for the forms that read as culture to people who do not look closely.", desc: "Surface respectability first." },
        { id: "b", label: "Never make anything that would embarrass the family at a dinner table.", desc: "An invisible audience of relatives." },
        { id: "c", label: "Credentials and venues matter more than I would ever admit out loud.", desc: "The frame outranks the work." },
        { id: "d", label: "If a stranger would find it strange, soften it before it goes out.", desc: "Pre-emptive normalising." }
      ],
      multiSelectHint: false,
      next: { _default: "inheritance-c2" }
    },
    "inheritance-c1d": {
      id: "inheritance-c1d",
      kind: "single",
      question: "Nobody named what was good. What rule did the silence leave?",
      header: "Unspoken",
      note: "",
      options: [
        { id: "a", label: "I guess at a standard I was never taught and assume I am failing it.", desc: "A test with no printed answer." },
        { id: "b", label: "I over-explain everything, because nothing was modelled as obviously worthwhile.", desc: "Nothing gets to stand on its own." },
        { id: "c", label: "I distrust my own taste, since it was never confirmed by anyone.", desc: "No early yes to build on." },
        { id: "d", label: "I treat any praise as a mistake that will be corrected.", desc: "Good news is provisional." }
      ],
      multiSelectHint: false,
      next: { _default: "inheritance-c2" }
    },
    // ---- Card 2: what was mocked ---------------------------------
    "inheritance-c2": {
      id: "inheritance-c2",
      kind: "single",
      question: "In that house, what got laughed at or dismissed?",
      header: "Mocked",
      note: "",
      options: [
        { id: "a", label: "Pretension. Anyone who acted like their taste made them special.", desc: "Seriousness read as showing off." },
        { id: "b", label: "Idleness. Sitting with a notebook while other people worked.", desc: "Stillness treated as laziness." },
        { id: "c", label: "Anything purely decorative. Pretty with no point to it.", desc: "Beauty without an argument." },
        { id: "d", label: "Anything that needed explaining. If you had to unpack it, it had failed.", desc: "Difficulty read as pretension’s cousin." }
      ],
      multiSelectHint: false,
      next: { a: "inheritance-c2a", b: "inheritance-c2b", c: "inheritance-c2c", d: "inheritance-c2d", _other: "inheritance-c2a", _default: "inheritance-c2a" }
    },
    "inheritance-c2a": {
      id: "inheritance-c2a",
      kind: "single",
      question: "Pretension was the joke. What do you now hold back to avoid being that?",
      header: "Pretension",
      note: "",
      options: [
        { id: "a", label: "I undersell the work so nobody can accuse me of taking myself seriously.", desc: "Deflation as armour." },
        { id: "b", label: "I make ambitious claims only in private, never in a statement or a title.", desc: "The ambition stays off the record." },
        { id: "c", label: "I mock other artists’ seriousness before anyone can mock mine.", desc: "Get the joke in first." },
        { id: "d", label: "I flinch when I catch myself caring this much.", desc: "The caring itself is embarrassing." }
      ],
      multiSelectHint: false,
      next: { _default: "inheritance-c3" }
    },
    "inheritance-c2b": {
      id: "inheritance-c2b",
      kind: "single",
      question: "Being idle was the crime. What does that do to how you work now?",
      header: "Idleness",
      note: "",
      options: [
        { id: "a", label: "I cannot count thinking, reading or looking as work, so I skip it.", desc: "Only visible output counts." },
        { id: "b", label: "I need something finished each session or I feel caught out.", desc: "A daily proof of use." },
        { id: "c", label: "I hide the slow, formless part of making from everyone, including myself.", desc: "The incubation is done in secret." },
        { id: "d", label: "I confuse being busy with being any good.", desc: "Motion mistaken for quality." }
      ],
      multiSelectHint: false,
      next: { _default: "inheritance-c3" }
    },
    "inheritance-c2c": {
      id: "inheritance-c2c",
      kind: "single",
      question: "Decorative was an insult. What does that cost your work now?",
      header: "Decorative",
      note: "",
      options: [
        { id: "a", label: "I bolt a concept onto anything beautiful so it has an alibi.", desc: "Meaning added as cover." },
        { id: "b", label: "I distrust my eye for surface, which is one of my real strengths.", desc: "A gift treated as a liability." },
        { id: "c", label: "I cut the parts that are only pleasurable, and the work gets drier.", desc: "Joy edited out on principle." },
        { id: "d", label: "I cannot enjoy prettiness in my own work without feeling caught.", desc: "Pleasure comes with a wince." }
      ],
      multiSelectHint: false,
      next: { _default: "inheritance-c3" }
    },
    "inheritance-c2d": {
      id: "inheritance-c2d",
      kind: "single",
      question: "If it needed explaining, it had failed. What does that leave you doing?",
      header: "Explaining",
      note: "",
      options: [
        { id: "a", label: "I abandon anything that would take a paragraph to land.", desc: "Slow ideas get dropped early." },
        { id: "b", label: "I make the work more legible than it wants to be, and blunter.", desc: "Over-clarified into flatness." },
        { id: "c", label: "I feel ashamed writing about my own work, as if the writing is an admission.", desc: "The statement feels like a confession of failure." },
        { id: "d", label: "I pick ideas that photograph well and read fast, and call that discipline.", desc: "Speed of reading as a fake virtue." }
      ],
      multiSelectHint: false,
      next: { _default: "inheritance-c3" }
    },
    // ---- Card 3: the money rule, as a spoken sentence -----------
    "inheritance-c3": {
      id: "inheritance-c3",
      kind: "single",
      question: "Money and making things. What is the actual sentence someone in your family said about that?",
      header: "Money rule",
      note: "",
      options: [
        { id: "a", label: "“That is a nice hobby, but you will need something to fall back on.”", desc: "The making filed as a pastime in advance." },
        { id: "b", label: "“People like us do not get to do work like that.”", desc: "A ceiling stated as a fact about your kind." },
        { id: "c", label: "“If it does not pay, it is not serious.”", desc: "Income as the test of legitimacy." },
        { id: "d", label: "“You can do anything you want.” Said once, and never backed with anything.", desc: "A permission with no support under it." }
      ],
      multiSelectHint: false,
      next: { a: "inheritance-c3a", b: "inheritance-c3b", c: "inheritance-c3c", d: "inheritance-c3d", _other: "inheritance-c3a", _default: "inheritance-c3a" }
    },
    "inheritance-c3a": {
      id: "inheritance-c3a",
      kind: "single",
      question: "“Something to fall back on.” Where is that sentence still running your choices?",
      header: "Fall back",
      note: "",
      options: [
        { id: "a", label: "I keep the fallback so well maintained that it has become the main thing.", desc: "The safety net took over." },
        { id: "b", label: "I will not let the making carry any financial risk, so it stays small.", desc: "Risk capped at zero, ambition with it." },
        { id: "c", label: "I treat every unpaid month as evidence I should have listened.", desc: "Lean stretches read as told-you-so." },
        { id: "d", label: "I have out-earned the fear and still decide as if I have not.", desc: "The rule outlived its facts." }
      ],
      multiSelectHint: false,
      next: { _default: "inheritance-c4" }
    },
    "inheritance-c3b": {
      id: "inheritance-c3b",
      kind: "single",
      question: "“People like us do not do that.” What do you still do because of it?",
      header: "Like us",
      note: "",
      options: [
        { id: "a", label: "I apply to less than I am ready for, to spare myself the no.", desc: "Aiming low to stay safe." },
        { id: "b", label: "I feel like a guest in rooms I have every right to be in.", desc: "Belonging that never quite arrives." },
        { id: "c", label: "I over-prepare so nobody can say I did not belong there.", desc: "Earning a seat twice over." },
        { id: "d", label: "I have proven it wrong repeatedly and still hear it first.", desc: "The voice speaks before the evidence." }
      ],
      multiSelectHint: false,
      next: { _default: "inheritance-c4" }
    },
    "inheritance-c3c": {
      id: "inheritance-c3c",
      kind: "single",
      question: "“If it does not pay, it is not serious.” What does that make you do?",
      header: "Not serious",
      note: "",
      options: [
        { id: "a", label: "I chase paid work I do not want, to prove the practice is real.", desc: "Invoices as legitimacy." },
        { id: "b", label: "I dismiss my own unpaid projects before anyone else can.", desc: "Pre-emptive devaluation." },
        { id: "c", label: "I measure a year by income and feel like a fraud in the lean ones.", desc: "The ledger sets the mood." },
        { id: "d", label: "I cannot call myself an artist without adding what I do for money.", desc: "The title needs a chaperone." }
      ],
      multiSelectHint: false,
      next: { _default: "inheritance-c4" }
    },
    "inheritance-c3d": {
      id: "inheritance-c3d",
      kind: "single",
      question: "“You can do anything.” Said once, never backed. What did that leave you with?",
      header: "Told once",
      note: "",
      options: [
        { id: "a", label: "A large permission and no idea how to use it, which felt like my failure.", desc: "Freedom that read as inadequacy." },
        { id: "b", label: "The habit of not asking for help, because help was implied and never came.", desc: "Self-reliance by default." },
        { id: "c", label: "Suspicion of encouragement, since the first big one was hollow.", desc: "Praise now needs collateral." },
        { id: "d", label: "A drive to back my own claims obsessively, so mine are never hollow.", desc: "Over-correcting the empty promise." }
      ],
      multiSelectHint: false,
      next: { _default: "inheritance-c4" }
    },
    // ---- Card 4: the embarrassing-liking card -------------------
    "inheritance-c4": {
      id: "inheritance-c4",
      kind: "single",
      question: "What do you actually like that you would not admit in a room full of people whose taste you respect?",
      header: "Admit it",
      note: "",
      options: [
        { id: "a", label: "Work that is sentimental and manipulative and gets me every time anyway.", desc: "The swelling score, the obvious ending. It works on me." },
        { id: "b", label: "Craft so slick it has no ideas in it at all.", desc: "Pure technical show, and I could watch it for hours." },
        { id: "c", label: "The popular thing everyone in my field is tired of.", desc: "I am not tired of it. I just stopped saying so." },
        { id: "d", label: "My own earliest work, which everyone agrees I have outgrown.", desc: "I go back and look at it and think it was better." }
      ],
      multiSelectHint: false,
      next: { a: "inheritance-c4a", b: "inheritance-c4b", c: "inheritance-c4c", d: "inheritance-c4d", _other: "inheritance-c4a", _default: "inheritance-c4a" }
    },
    "inheritance-c4a": {
      id: "inheritance-c4a",
      kind: "single",
      question: "You like the manipulative, sentimental thing. What happens if you let some of that into your own work on purpose?",
      header: "Sentiment",
      note: "",
      options: [
        { id: "a", label: "People whose approval I want would file me as soft.", desc: "A downgrade in their eyes." },
        { id: "b", label: "I would have to defend feeling as a legitimate aim, out loud.", desc: "An argument you would rather not make." },
        { id: "c", label: "It might be the most alive thing I have made, and that would reorganise everything.", desc: "The upside is the scary part." },
        { id: "d", label: "I would lose the cover that irony has been giving me.", desc: "No more distance to hide in." }
      ],
      multiSelectHint: false,
      next: { _default: "inheritance-c5" }
    },
    "inheritance-c4b": {
      id: "inheritance-c4b",
      kind: "single",
      question: "You love pure craft with no ideas. What does admitting that threaten?",
      header: "Slickness",
      note: "",
      options: [
        { id: "a", label: "My belief that I am in it for the meaning more than the surface.", desc: "A story about my own motives." },
        { id: "b", label: "The concept-first account I give of my practice.", desc: "The public framing would not survive it." },
        { id: "c", label: "It would let me spend a year just getting good at something, guilt-free.", desc: "Permission I have been withholding." },
        { id: "d", label: "It would expose how much of my rigour is fear of being called shallow.", desc: "The seriousness is partly a defence." }
      ],
      multiSelectHint: false,
      next: { _default: "inheritance-c5" }
    },
    "inheritance-c4c": {
      id: "inheritance-c4c",
      kind: "single",
      question: "You still like the thing your field is done with. What does keeping quiet about it cost?",
      header: "The popular",
      note: "",
      options: [
        { id: "a", label: "I make work in dialogue with a consensus I do not actually share.", desc: "Answering a conversation I am not in." },
        { id: "b", label: "I have been steering away from my real interest to stay current.", desc: "Currency bought with direction." },
        { id: "c", label: "Saying it out loud would date me, and I am afraid of being dated.", desc: "The fear is of the timestamp." },
        { id: "d", label: "The work I most want to make is on the other side of that admission.", desc: "The confession is the doorway." }
      ],
      multiSelectHint: false,
      next: { _default: "inheritance-c5" }
    },
    "inheritance-c4d": {
      id: "inheritance-c4d",
      kind: "single",
      question: "You think your outgrown early work was better. What is in it that is missing now?",
      header: "Early work",
      note: "",
      options: [
        { id: "a", label: "Nerve. I made it before I knew what could go wrong.", desc: "Ignorance as fuel." },
        { id: "b", label: "It was not addressed to anyone in particular, so it was not hedged.", desc: "No audience, no flinch." },
        { id: "c", label: "It had a crudeness I have polished out and now miss.", desc: "The rough edge did work." },
        { id: "d", label: "I believed it completely, and I have not managed that since.", desc: "Conviction that has not come back." }
      ],
      multiSelectHint: false,
      next: { _default: "inheritance-c5" }
    },
    // ---- Card 5: multi — standards never chosen ---------------
    "inheritance-c5": {
      id: "inheritance-c5",
      kind: "multi",
      question: "Here are the standards you have been describing. Tick the ones you never actually chose, that were just handed to you.",
      header: "Never chose",
      note: "Tick every one that fits, including the ones that only half-fit.",
      options: [
        { id: "a", label: "That work has to be useful or explainable to count.", desc: "The alibi requirement." },
        { id: "b", label: "That effort has to show, and ease is suspect.", desc: "Visible strain as proof." },
        { id: "c", label: "That taking yourself seriously in public is embarrassing.", desc: "Ambition kept off the record." },
        { id: "d", label: "That a real practice pays for itself or it is a hobby.", desc: "The income test." },
        { id: "e", label: "That the slow, formless part of making does not count as work.", desc: "Only output on the table." }
      ],
      multiSelectHint: true,
      next: { _default: "inheritance-c6" }
    },
    "inheritance-c6": {
      id: "inheritance-c6",
      kind: "single",
      question: "Of the ones you just ticked, which single one would actually cost you something to put down?",
      header: "Keep, drop",
      note: "",
      options: [
        { id: "a", label: "Dropping “it has to be useful” would mean making things with no defence ready.", desc: "Undefended work, in public." },
        { id: "b", label: "Dropping “effort must show” would mean trusting effortless-looking work still counts.", desc: "No visible receipts for the labour." },
        { id: "c", label: "Dropping “seriousness is embarrassing” would mean saying plainly what I am after.", desc: "The claim on the record." },
        { id: "d", label: "Dropping “it must pay” would mean calling myself an artist with no invoice attached.", desc: "The title standing alone." }
      ],
      multiSelectHint: false,
      next: { _end: true }
    }
  }
};
