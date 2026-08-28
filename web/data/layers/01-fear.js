// Soulstice — Layer 1: Fear. Runs the unpacking ladder (downward arrow,
// Burns/Beck) plus threat appraisal (Lazarus & Folkman) and an inversion.
// Six beat-one cards: locate the event, whose voice, two downward-arrow
// rungs, appraisal, inversion, and what the avoidance buys. Each of the
// first cards fans its options to a distinct beat-two attack card.
// The layer ends at _end. The arc break fires after Layer 4 (Voices).
//
// Design rule from references/cards.md: every feared outcome here is social,
// with a person in the room. No option lets the made object itself be the
// subject. All options are medium-neutral situations.

export default {
  key: "fear",
  title: "Fear",
  arc: 1,
  intro: "",
  entry: "fear-c1",
  cards: {
    // ---- Card 1: locate the event -------------------------------------
    "fear-c1": {
      id: "fear-c1",
      kind: "single",
      question: "A room, months of work behind you, the thing you made is finally in front of people, and it is going badly. What exactly is going badly?",
      header: "Failure",
      note: "",
      options: [
        { id: "a", label: "The person whose opinion I most wanted says, kindly, that it does not work.", desc: "A considered verdict from someone who matters, offered without cruelty." },
        { id: "b", label: "Nobody reacts. The room stays polite and moves on.", desc: "No argument, no offence taken, nothing landed." },
        { id: "c", label: "It works, people are moved, and I know I cannot do it again.", desc: "A success I cannot account for or repeat." },
        { id: "d", label: "Someone who knows the craft spots exactly where I could not pull it off.", desc: "The seam shows, and the person seeing it knows what they are looking at." }
      ],
      multiSelectHint: false,
      next: { a: "fear-c1a", b: "fear-c1b", c: "fear-c1c", d: "fear-c1d", _other: "fear-c1b", _default: "fear-c1b" }
    },
    "fear-c1a": {
      id: "fear-c1a",
      kind: "single",
      question: "That one considered no, from the person who matters. Strip out the disappointment. What is left that still stings?",
      header: "The verdict",
      note: "",
      options: [
        { id: "a", label: "That they were right, and I knew it before they said it.", desc: "The no only confirmed a private verdict." },
        { id: "b", label: "That I will not get another chance to show them something better.", desc: "One door, now closed." },
        { id: "c", label: "That their good opinion was holding up more of my sense of myself than I admitted.", desc: "The scaffolding was theirs." },
        { id: "d", label: "That I made it partly for them, and that was the mistake.", desc: "The audience was one person the whole time." }
      ],
      multiSelectHint: false,
      next: { _default: "fear-c2" }
    },
    "fear-c1b": {
      id: "fear-c1b",
      kind: "single",
      question: "The room stays polite and moves on. What do you tell yourself that means?",
      header: "The silence",
      note: "",
      options: [
        { id: "a", label: "That it was competent and forgettable, which is worse than bad.", desc: "Nothing to react to is its own verdict." },
        { id: "b", label: "That I misjudged what would land, and my instincts are off.", desc: "The aim was off, more than the execution." },
        { id: "c", label: "That they were being kind and the real verdict came later, without me.", desc: "The conversation you were not in." },
        { id: "d", label: "That I have been making forgettable things for a while and this made it obvious.", desc: "One instance stands in for a pattern." }
      ],
      multiSelectHint: false,
      next: { _default: "fear-c2" }
    },
    "fear-c1c": {
      id: "fear-c1c",
      kind: "single",
      question: "It landed, and you cannot repeat it. What is frightening in that?",
      header: "It worked",
      note: "",
      options: [
        { id: "a", label: "That the good part was luck, and luck runs out.", desc: "Nothing to stand on for next time." },
        { id: "b", label: "That I will spend years trying to get back to something I never understood.", desc: "Chasing my own accident." },
        { id: "c", label: "That people now expect that from me, and I will disappoint them slowly.", desc: "A standard set by a fluke." },
        { id: "d", label: "That it proves I do not actually know how my own work works.", desc: "No method under the result." }
      ],
      multiSelectHint: false,
      next: { _default: "fear-c2" }
    },
    "fear-c1d": {
      id: "fear-c1d",
      kind: "single",
      question: "Someone who knows the craft sees exactly where you could not do it. What does that expose?",
      header: "The seam",
      note: "",
      options: [
        { id: "a", label: "That I have been working just past my actual skill and hoping nobody checked.", desc: "The gap was always there to be found." },
        { id: "b", label: "That the ambition in the piece was writing cheques the craft could not cover.", desc: "Reach outran grasp, visibly." },
        { id: "c", label: "That the people who praised the rest were not looking closely.", desc: "The praise now feels worthless too." },
        { id: "d", label: "That I am a competent technician who reached above that and got caught.", desc: "An identity-level read of one flaw." }
      ],
      multiSelectHint: false,
      next: { _default: "fear-c2" }
    },
    // ---- Card 2: whose voice ----------------------------------------
    "fear-c2": {
      id: "fear-c2",
      kind: "single",
      question: "That reaction you just pictured. Put it in a specific mouth. Whose voice is saying it?",
      header: "Whose voice",
      note: "",
      options: [
        { id: "a", label: "Someone I have actually worked with, who has said something like it before.", desc: "A real person, a real past occasion." },
        { id: "b", label: "Someone whose work I admire and who I have never dared show anything to.", desc: "A judge I keep at a safe distance." },
        { id: "c", label: "A teacher from years ago, saying it about something else, and it still repeats.", desc: "An old sentence fitted onto a new situation." },
        { id: "d", label: "Mine. A week before it opens, already rehearsing the verdict.", desc: "You say it first, so nobody else gets to." }
      ],
      multiSelectHint: false,
      next: { _default: "fear-c3" }
    },
    // ---- Card 3: downward arrow, rung 1 -----------------------------
    "fear-c3": {
      id: "fear-c3",
      kind: "single",
      question: "Suppose that happens, exactly as you pictured it. What would it actually mean, in plain terms?",
      header: "The meaning",
      note: "",
      options: [
        { id: "a", label: "One opportunity closes and I look for the next one.", desc: "A setback at the practical level." },
        { id: "b", label: "The people who were half-interested stop replying.", desc: "A quiet withdrawal of support." },
        { id: "c", label: "I have to admit I aimed higher than I can currently reach.", desc: "A verdict on my level." },
        { id: "d", label: "The last few years were a hobby I have been calling a career.", desc: "A verdict on the whole enterprise." }
      ],
      multiSelectHint: false,
      next: { a: "fear-c3a", b: "fear-c3b", c: "fear-c3c", d: "fear-c3d", _other: "fear-c3d", _default: "fear-c3c" }
    },
    "fear-c3a": {
      id: "fear-c3a",
      kind: "single",
      question: "You look for the next one. Suppose the next few go the same way. What would that mean about you?",
      header: "And then",
      note: "",
      options: [
        { id: "a", label: "That I had a run of bad luck in a hard field.", desc: "External, temporary." },
        { id: "b", label: "That I am not building the kind of momentum that carries people forward.", desc: "A structural problem rather than a streak." },
        { id: "c", label: "That I picked work the world has no place for.", desc: "A verdict on the work rather than the luck." },
        { id: "d", label: "That I am not good enough at this to make a life of it, and slow to see it.", desc: "An identity-level conclusion." }
      ],
      multiSelectHint: false,
      next: { _default: "fear-c4" }
    },
    "fear-c3b": {
      id: "fear-c3b",
      kind: "single",
      question: "The half-interested people go quiet. Suppose it is permanent. What would it mean?",
      header: "They stop",
      note: "",
      options: [
        { id: "a", label: "That I have to build an audience from nothing, again.", desc: "A workload rather than a wound." },
        { id: "b", label: "That my work only ever held attention out of politeness.", desc: "The past support was hollow." },
        { id: "c", label: "That I am someone people support once and do not come back to.", desc: "A pattern about me." },
        { id: "d", label: "That I mistook encouragement for a real place in the field.", desc: "The place was never there." }
      ],
      multiSelectHint: false,
      next: { _default: "fear-c4" }
    },
    "fear-c3c": {
      id: "fear-c3c",
      kind: "single",
      question: "You aimed higher than you can reach. Suppose that stays true for years. What would it mean?",
      header: "Aimed high",
      note: "",
      options: [
        { id: "a", label: "That I need a long stretch on craft before I try that scale again.", desc: "A plan rather than a verdict." },
        { id: "b", label: "That my taste is ahead of my hands, and the gap is humiliating.", desc: "The distance is the problem." },
        { id: "c", label: "That I should make smaller, safer things and be honest about my level.", desc: "A downward adjustment of ambition." },
        { id: "d", label: "That I am the kind of artist who describes work they will never make.", desc: "An identity built on the gap." }
      ],
      multiSelectHint: false,
      next: { _default: "fear-c4" }
    },
    "fear-c3d": {
      id: "fear-c3d",
      kind: "single",
      question: "Suppose that is exactly true: it has been a hobby with a serious name. What would that mean about you?",
      header: "A hobby",
      note: "",
      options: [
        { id: "a", label: "That I owe some people an honest account of what I have been doing.", desc: "A conversation you have been avoiding." },
        { id: "b", label: "That I left something stable for a story about myself that did not hold.", desc: "A bad trade, now visible." },
        { id: "c", label: "That I mistook wanting to be an artist for being one.", desc: "The want stood in for the work." },
        { id: "d", label: "That I am a person with taste and no body of work to stand on.", desc: "Nothing under the identity." }
      ],
      multiSelectHint: false,
      next: { _default: "fear-c4" }
    },
    // ---- Card 4: appraisal (probability / cost / coping) -----------
    "fear-c4": {
      id: "fear-c4",
      kind: "single",
      question: "Take the exact failure you have been picturing. How often has something like it actually happened to you?",
      header: "How often",
      note: "",
      options: [
        { id: "a", label: "Never yet. I am pricing a thing that has not occurred.", desc: "The dread runs ahead of the record." },
        { id: "b", label: "Once. And I am still here, working.", desc: "Survived, if not enjoyed." },
        { id: "c", label: "Two or three times. A known cost by now, and survivable.", desc: "Recurring weather rather than an ending." },
        { id: "d", label: "Often enough that the fear is just accurate, and that is its own problem.", desc: "The estimate may be right." }
      ],
      multiSelectHint: false,
      next: { a: "fear-c4a", b: "fear-c4b", c: "fear-c4b", d: "fear-c4d", _other: "fear-c4b", _default: "fear-c4b" }
    },
    "fear-c4a": {
      id: "fear-c4a",
      kind: "single",
      question: "It has not happened. What would the first morning after actually look like?",
      header: "Not yet",
      note: "",
      options: [
        { id: "a", label: "I tell two people, feel sick for a day, and open the work again.", desc: "A recovery you have run before." },
        { id: "b", label: "I go quiet for a week and let people assume the worst.", desc: "Withdrawal as damage control." },
        { id: "c", label: "I take on paid work and call it a break.", desc: "A justified way to stop." },
        { id: "d", label: "I draft an angry statement about the field and do not send it.", desc: "Blame pointed outward, then held." }
      ],
      multiSelectHint: false,
      next: { _default: "fear-c5" }
    },
    "fear-c4b": {
      id: "fear-c4b",
      kind: "single",
      question: "Price it honestly. If it happened, what does it actually cost, in months and in people?",
      header: "The cost",
      note: "",
      options: [
        { id: "a", label: "A few months of momentum and two contacts who were lukewarm anyway.", desc: "Recoverable inside a year." },
        { id: "b", label: "Half a year and a collaborator I actually wanted to keep.", desc: "A real loss with a name on it." },
        { id: "c", label: "A year, some savings, and the story I tell about where I am headed.", desc: "Money and narrative, both." },
        { id: "d", label: "Less than the dread suggests, which is uncomfortable to admit.", desc: "The fear was inflated and you know it." }
      ],
      multiSelectHint: false,
      next: { _default: "fear-c5" }
    },
    "fear-c4d": {
      id: "fear-c4d",
      kind: "single",
      question: "Say the fear is just correct. What have you already survived that was close to this?",
      header: "Accurate",
      note: "",
      options: [
        { id: "a", label: "A public flop I was sure would end things, and it did not.", desc: "A survived version of the same event." },
        { id: "b", label: "A long dry stretch where nobody asked for anything.", desc: "Endured once already." },
        { id: "c", label: "A verdict from someone I respected that I have never fully shaken.", desc: "Carried, and still working." },
        { id: "d", label: "A version of this every time I finish something, and I keep finishing things.", desc: "The fear is routine, and so is continuing." }
      ],
      multiSelectHint: false,
      next: { _default: "fear-c5" }
    },
    // ---- Card 5: the inversion -------------------------------------
    "fear-c5": {
      id: "fear-c5",
      kind: "single",
      question: "Now it goes well. Really well. What is unpleasant in that picture?",
      header: "It goes well",
      note: "",
      options: [
        { id: "a", label: "I have to do it again, on purpose, and prove the first time was not a fluke.", desc: "Success becomes a demand." },
        { id: "b", label: "I become known for this one thing and get asked for nothing else.", desc: "A signature that turns into a cage." },
        { id: "c", label: "I owe everyone who helped an encore, and the debt never closes.", desc: "Gratitude as obligation." },
        { id: "d", label: "The people who ignored me suddenly want in, and I am glad, which disgusts me.", desc: "Their approval still moves you." }
      ],
      multiSelectHint: false,
      next: { a: "fear-c5a", b: "fear-c5b", c: "fear-c5c", d: "fear-c5d", _other: "fear-c5b", _default: "fear-c5b" }
    },
    "fear-c5a": {
      id: "fear-c5a",
      kind: "single",
      question: "Having to repeat it is the worst part. What does that say the fear was really about?",
      header: "Again",
      note: "",
      options: [
        { id: "a", label: "Being found out as someone who cannot work to a standard on demand.", desc: "Repeatability as the real test." },
        { id: "b", label: "Losing the freedom to make the next thing badly while I learn it.", desc: "Success removes the room to fumble." },
        { id: "c", label: "Success turning into an obligation I did not agree to.", desc: "A contract nobody showed you." },
        { id: "d", label: "Never getting to rest, because now there is something to protect.", desc: "The win becomes a guard duty." }
      ],
      multiSelectHint: false,
      next: { _default: "fear-c6" }
    },
    "fear-c5b": {
      id: "fear-c5b",
      kind: "single",
      question: "Being known for one thing only. What does that reveal?",
      header: "One thing",
      note: "",
      options: [
        { id: "a", label: "That I want range more than I want a signature.", desc: "The named style is not the goal." },
        { id: "b", label: "That I am afraid of the version of me the audience would fix in place.", desc: "Being pinned down is the fear." },
        { id: "c", label: "That I do not trust the work I have not made yet to be as good.", desc: "Doubt aimed at the future rather than the present." },
        { id: "d", label: "That recognition and freedom feel like a straight trade to me.", desc: "You expect to pay for one with the other." }
      ],
      multiSelectHint: false,
      next: { _default: "fear-c6" }
    },
    "fear-c5c": {
      id: "fear-c5c",
      kind: "single",
      question: "Owing everyone an encore is the sting. What is under that?",
      header: "The encore",
      note: "",
      options: [
        { id: "a", label: "I would rather owe nothing to anyone than be carried and indebted.", desc: "Independence over help, every time." },
        { id: "b", label: "I do not believe I can deliver twice, so being helped once feels like a setup.", desc: "Help raises a bar you expect to miss." },
        { id: "c", label: "Gratitude and resentment sit too close together for me.", desc: "Being helped is uncomfortable in itself." },
        { id: "d", label: "Being visible enough to owe people is the thing I flinch from.", desc: "Owing means being seen owing." }
      ],
      multiSelectHint: false,
      next: { _default: "fear-c6" }
    },
    "fear-c5d": {
      id: "fear-c5d",
      kind: "single",
      question: "The people who ignored you now want in, and your own gladness disgusts you. Why?",
      header: "They want in",
      note: "",
      options: [
        { id: "a", label: "Because it proves how much their approval still runs me.", desc: "The reaction gives the game away." },
        { id: "b", label: "Because I wanted to not need them, and I clearly do.", desc: "A hoped-for independence, exposed." },
        { id: "c", label: "Because I would let them in, and hate the terms.", desc: "You already know you would say yes." },
        { id: "d", label: "Because the work was supposed to be for something better than winning that.", desc: "A cleaner motive, contaminated." }
      ],
      multiSelectHint: false,
      next: { _default: "fear-c6" }
    },
    // ---- Card 6: what does not making it buy you? -----------------
    // Hidden-commitment question (Kegan & Lahey), asked without the vocabulary.
    "fear-c6": {
      id: "fear-c6",
      kind: "single",
      question: "As long as you do not really try this, what do you get to keep?",
      header: "What it buys",
      note: "",
      options: [
        { id: "a", label: "I stay someone with potential, which is safer than someone with results.", desc: "Potential cannot be measured and found short." },
        { id: "b", label: "I never have to find out where my ceiling actually is.", desc: "The limit stays theoretical." },
        { id: "c", label: "The steady work that pays stays justified, because the art is only a side thing.", desc: "The day job keeps its alibi." },
        { id: "d", label: "The idea stays perfect, because nobody has seen it fail.", desc: "Unmade, it cannot disappoint." }
      ],
      multiSelectHint: false,
      next: { a: "fear-c6a", b: "fear-c6b", c: "fear-c6c", d: "fear-c6d", _other: "fear-c6d", _default: "fear-c6a" }
    },
    "fear-c6a": {
      id: "fear-c6a",
      kind: "single",
      question: "You get to stay promising. What does that protect you from having to do?",
      header: "Potential",
      note: "",
      options: [
        { id: "a", label: "Put a finished thing next to the ones I admire and see the distance.", desc: "A comparison you can currently avoid." },
        { id: "b", label: "Drop the story about what I could do and be judged on what I did.", desc: "Trade the pitch for a record." },
        { id: "c", label: "Disappoint the people who have been waiting for me to arrive.", desc: "Arrival risks their disappointment." },
        { id: "d", label: "Find out that promising was the best part.", desc: "The fear that the peak is already behind." }
      ],
      multiSelectHint: false,
      next: { _end: true }
    },
    "fear-c6b": {
      id: "fear-c6b",
      kind: "single",
      question: "You never learn where your ceiling is. What is that worth to you?",
      header: "The ceiling",
      note: "",
      options: [
        { id: "a", label: "I can keep believing it is higher than it probably is.", desc: "A useful illusion, protected." },
        { id: "b", label: "I never have to grieve the artist I am not going to become.", desc: "No loss to mourn if it stays open." },
        { id: "c", label: "I stay in the part of a career that still feels open.", desc: "Before the narrowing." },
        { id: "d", label: "It costs me the actual work, and I know that, and I pay it anyway.", desc: "A price accepted with eyes open." }
      ],
      multiSelectHint: false,
      next: { _end: true }
    },
    "fear-c6c": {
      id: "fear-c6c",
      kind: "single",
      question: "The paying work stays justified because the art stays small. What does keeping it small save you?",
      header: "The day job",
      note: "",
      options: [
        { id: "a", label: "I never have to ask anyone to take it, or me, seriously.", desc: "No claim made, none to defend." },
        { id: "b", label: "I keep an excuse that is real enough to hide behind.", desc: "A true reason doing false work." },
        { id: "c", label: "I avoid the choice between the two, which I do not want to make.", desc: "The fork stays unwalked." },
        { id: "d", label: "It saves me nothing, and the excuse is wearing thin.", desc: "You have stopped believing it." }
      ],
      multiSelectHint: false,
      next: { _end: true }
    },
    "fear-c6d": {
      id: "fear-c6d",
      kind: "single",
      question: "The unmade piece stays perfect. What are you protecting by leaving it unmade?",
      header: "Perfect",
      note: "",
      options: [
        { id: "a", label: "The one idea I am sure is good, in a practice full of doubt.", desc: "A reserve you will not spend." },
        { id: "b", label: "My sense that I have something major in me, untested.", desc: "The belief survives only untested." },
        { id: "c", label: "The pleasure of planning it, which making it would end.", desc: "The plan is the part you enjoy." },
        { id: "d", label: "A reason to keep going that finishing it might take away.", desc: "The carrot has to stay ahead." }
      ],
      multiSelectHint: false,
      next: { _end: true }
    }
  }
};
