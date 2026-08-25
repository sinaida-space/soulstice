<img width="3072" height="384" alt="image" src="https://github.com/user-attachments/assets/39cab377-0065-4cfc-8a25-23cb5ab21ee6" />

# Soulstice

A guided self-inquiry instrument for artists, packaged as a Claude Code skill.

It does not generate ideas, write statements, or plan projects. It asks questions, one
card at a time, about why you make what you make, how much of it is actually yours,
and where the material wants to go next.

Every question arrives as a choice card with three or four concrete answers, each one
a full sentence somebody could actually say about their own life. Then a second card
attacks whatever you picked: what is inaccurate in it, what it leaves out, what the
harder version is. Picking is easy and produces nothing; the correction is where the
real sentence appears, and it appears in your own words because you typed it.

## A Prologue and eleven layers, three arcs

**Prologue.** Who you are, before any layer starts.
**What is not yours.** Fear · Inheritance · Role · Voices
**What is yours.** Field · Standing · Poisons
**Where you make from.** Contact · Epoch · Resource · Stakes

Arc I subtracts: inherited taste, gendered expectation, borrowed wants that arrived
from a feed and got mistaken for desire. Arc II finds what survived the subtraction:
the vocabulary that keeps returning across years, including in the work you dismissed.
Arc III locates the position you actually make from, including your relation to the
present moment and what you actually have to make with: time, money, skill, access,
equipment, health.

## Five modes

| Mode | What it does | Ends in |
|---|---|---|
| **Passage** | The full walk through the Prologue and all eleven layers, over one or several sittings | A written **Compass**: your own words organised, contradictions left standing, three directions, a stop list, one testable assumption |
| **Journal** | One layer per sitting, accumulated over time | A running journal with a drift review every fifth entry |
| **Lens** | One existing or planned work run through the layers as diagnostics | A verdict paragraph and the questions the work has not answered |
| **Ground** | The collapse path, for the moment the verdict is “I am shit, nobody needs this” | Three concrete projects rather than insight |
| **Return** | Reopens an existing Compass and checks it against what actually happened | Revised directions, appended to the same file |

Soulstice never scopes a direction into a project itself. When a Passage, Lens or
Ground session produces one worth building, it hands that direction to the sibling
skill [for-tee-too](https://github.com/sinaida-space/for-tee-too), which turns a
direction into something scoped and buildable.

## Ground

Ground is the mode for the moment the verdict is already in: “I am shit, nobody needs
this, where do I go now.” It is chosen from the mode menu, and it is also entered
automatically from any other mode the instant collapse surfaces, with the switch
always said out loud, never silent.

It never runs Arc I. Arc I subtracts, and subtracting from someone already in
collapse does harm rather than clarity. Instead it gathers evidence against the
verdict she arrived with, lands on one action for today, and ends in three concrete
projects rather than in insight, because insight is not what collapse needs. Scoping
one of the three is, again, a job for
[for-tee-too](https://github.com/sinaida-space/for-tee-too). Soulstice stops one step
short of that.

Its safety floor is narrow, and stated here plainly: despair, worthlessness and
hopelessness are exactly what this mode holds and works with. The only hard stop is a
direct indication of intent to self-harm. That is the one point where the instrument
stops and says plainly that this is past what it can hold.

## Labels are the door

“Fear of failure” is a real fear and a correct answer. What it cannot do is be tested
or acted on, because it is not specific enough to be proved wrong about anything. So
the skill never offers a label as an option, and it never asks you to “be more
specific” when you give one. It runs the downward arrow instead: suppose that
happened, what would it mean? Four rungs, one card each, until the answer stops being
about what happens and starts being about who you are. That last sentence is the one
worth having.

Then the fear gets priced (how likely, what it actually costs, what you would do the
next morning), and the belief underneath it gets one small dateable test with a
trigger attached, because an intention without a trigger does not survive the loss of
motivation.

## Why cards

Producing a self-description from nothing is a hard generative task performed under
evaluation, and it returns the answer you have given before. Judging whether a
specific proposed sentence is true of you is a comparison against actual memory, and
it returns a verdict with a reason attached. So the options are often deliberately
near-misses: four wrong sentences get a better answer out of someone than one open
question does.

Two places keep open text, because no card can substitute: listing everything you have
made in five years, and the closing question, which is “what did you not say?”

## Method

Built from coaching and clinical-interview practice, stripped of its apparatus and
never named in session:

- **Clean Language** (David Grove): ask about the person’s material using only their
  own words, because a paraphrase moves them into your register and loses the thing
- **Immunity to Change** (Kegan & Lahey): stuckness as two committed feet on two
  different pedals, ending in one small real-world test of the hidden assumption
- **Motivational interviewing**: never argue with resistance, ask the person to argue
  with themselves
- **ACT values work**: directions rather than goals, always with a cost attached
- **Narrative externalising**: the block as a thing with habits, and the exceptions
  that disprove the story
- **The downward arrow, threat appraisal and fear-setting**, out of cognitive therapy
  and Stoic practice, for turning a global fear into one testable belief

Grounded in what is known about how self-description works: autobiographical memory is
reconstructive and preferentially returns material that fits the current self-model, so
asking “who are you as an artist” retrieves a rehearsed narrative and asking “the last
time it went well, what was in the room” retrieves the material that narrative was
built from. That distinction is the instrument's core technique.

The epoch layer runs on Agamben's contemporary who does not coincide with their time,
Williams’ structure of feeling, Bourdieu on position in a field, and Terry Smith on
contemporaneity. It is the layer that fails most often, and `references/epoch.md`
exists mostly to name the ways.

A wider set of positions on finding oneself sits behind the epoch and standing layers,
each one converted into a card. Like the clinical and coaching apparatus listed above,
no philosopher's name is ever spoken in session: the position appears as a card, not
as attribution. The unpacking method has also grown a full cognitive-therapy toolkit
beyond the downward arrow: a thought record, a catalogue of distortions that is never
named to the user, behavioural experiments, self-compassion used as an instrumental
move rather than a comfort, and guided discovery.

## Language

The skill files are English. The session runs in whatever language you open in, and
follows you if you switch.

## Install

```bash
git clone https://github.com/sinaida-space/soulstice.git ~/.claude/skills/soulstice
```

Then `/soulstice`, or just ask Claude what your work is really about.

## Not therapy

This is an inquiry tool. Diagnosis, spiritual instruction and care belong elsewhere,
with people. If something surfaces that is past what an instrument can hold, the skill
is instructed to stop and say so.

## License

Apache 2.0.
