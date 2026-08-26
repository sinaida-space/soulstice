# Card craft

Every question in this skill is an `AskUserQuestion` card. This file is how to build
one that produces material instead of a shrug. Read it before the first card.

The whole instrument stands or falls here. A card with four generic options is a
personality quiz. A card with four uncomfortable, specific, mutually exclusive answers
is the fastest way into someone's actual material that a text interface allows.

---

## The shape

```
question:    one sentence, second person, no preamble
header:      12 characters or fewer, a noun, in the session language
options:     3 or 4, each an answer, each with a description that sharpens it
multiSelect: true only when the answers genuinely coexist
```

The interface adds "Other" automatically. Never add your own version of it.

---

## Options are answers, not labels

The single rule that matters. An option is a sentence the user could say out loud
about her own life. A label names a class of experiences and ends the conversation,
because there is nothing left to be specific about.

**Labels, which make useless options:**
- Fear of failure
- Impostor syndrome
- Family influence
- Commercial pressure

**Answers, which make working options:**
- They will say it is beautiful and empty, and I will agree with them
- Nobody will say anything, they just will not call a second time
- They will call, and I will not be able to deliver it technically, and it will show
- It will work, and then I will have to do it again, and again

The second set is usable. Someone reading it recognises herself in one line and knows
immediately that the other three are wrong. That recognition is the data.

**The labels are true.** Fear of failure is a real fear. What it cannot do is be
tested, acted on, or written into a Compass, because it is not specific enough to be
proved wrong about anything. So a label never appears as an option you offer, and it
is entirely welcome when she types it herself into "Other". That is the front door.

**When a label arrives, run the ladder.** See `references/unpacking.md`. Never treat
a label as evasion, never sigh at it, never say "can you be more specific". Ask what
it would mean if it happened, four times, one card per rung.

---

## Where options come from

In order of strength:

1. **Her own words from earlier in the session.** Quote her verbatim as an option.
   Nothing else lands as hard. Available from card three onward.
2. **Her context, if you have it.** Her medium, her city, her actual projects, the
   things she has told you before. A card that names her real material is not
   guessable and cannot be answered on autopilot.
3. **The specific and plausible.** Invented but concrete: a named type of person, a
   named room, a named consequence.
4. **Generic.** Never ship this. If you can only produce generic options, the question
   is wrong. Ask a different question or drop to open text.

---

## The four positions

A good four-option card usually covers these, in some order:

- **The respectable answer.** The one she would give in an interview. Include it so
  she can pick it and be moved past it, and so its absence does not look like a trap.
- **The specific one.** Concrete, episode-level, plausible for her in particular.
- **The one she would rather not pick.** Vanity, envy, money, fear of being ordinary,
  wanting to be admired by one specific person. This is the load-bearing option.
- **The inversion.** The opposite of what the question implies. If the question asks
  what she fears, one option is that the good outcome is the frightening one.

Never order them so the uncomfortable one is last by habit. Vary the position.

---

## Descriptions

The `description` field is not a gloss on the label. Use it to add the detail that
makes the option cost something.

    label:       "They will call again and I will not be able to deliver"
    description: "A technical failure in front of witnesses who know the tools better."

A description that only restates the label wastes the strongest part of the card.

---

## The two-beat rhythm

**This is the mechanism that replaces open questions.** Never leave a pick standing.

**Beat one:** the card. She picks.
**Beat two:** a card that attacks the pick.

Beat-two question forms, rotate them:

- "What is inaccurate in that answer?" with options naming different distortions
- "Which part of that is true and which part is what one is supposed to say?"
- "Suppose that happened. What would it mean?" with four candidate meanings. This is
  the downward arrow, and it is the strongest beat two in the skill
- "A sharper version of the same thing: which?" with three escalations of her pick
- "What does that answer let you avoid saying?"

Recognition is cheap; correction is not. Someone who picks an option and is then asked
what is wrong with it will produce, in "Other", the sentence you could never have got
by asking an open question cold. **The purpose of beat one is to give her something to
disagree with.**

Budget: roughly one beat-two card for every beat-one card. A layer is four to six
cards total.

---

## Making the pick expensive

Devices that stop a card being answered on autopilot:

- **Force a ranking.** "Which is worse?" with two bad options is harder than "what
  concerns you" with four.
- **Remove the comfortable exit.** If every option is an admission, she must admit
  something or write her own.
- **Put a real name in it.** Once she has named an artist, a curator, a studio, use
  that name in later options.
- **Make one option flattering and obviously false.** She will reject it, and in
  rejecting it say what is true.
- **Ask about the last time, not about generally.** Put "the last time this happened"
  in the stem, and make each option a different kind of last time.

---

## multiSelect

Use it when the answers stack rather than compete: recurring elements in layer 5,
inherited rules in layer 2, the poisons in layer 7. Do not use it in layer 1 or
layer 11, where the point is to force one choice.

A multiSelect card where she picks everything is a failed card. Prevent it by making
the options mutually costly.

---

## When to use open text instead

Three places only:

1. **Layer 5, the works list.** "List everything you have made in five years." No card
   can substitute. Everything after it is cards built from her list.
2. **The closing question.** "What did you not say in this session?" A card here would
   be obscene.
3. **When you cannot build honest options.** If you have no idea what four plausible
   answers look like, do not fake it with generic ones. Ask plainly and say why you
   are not offering options.

Everywhere else, if you are about to write a bare question, you have broken the skill.

---

## Register

This file covers the shape of a card. `references/rapport.md` covers the voice
around it: rapport before content, mirroring her own words into the next question,
"what" and "how" instead of "why," and why deceptive elicitation tradecraft is
deliberately not part of this skill even though some of its source material comes
from that world. Read it once, then let it inform every stem you write — it is not
layer-specific.

## Language

Cards are written in the session language, headers included. The examples in this file
are English because the skill files are English. None of them ships as it stands, in
any language.

Headers must fit 12 characters. Check the length in the session language before
sending, since a header that is short in English may not be short elsewhere.

Option labels are short where the interface allows, but this skill needs sentences
more than it needs brevity. Put the sentence in the label and let it run long; put the
sharpening detail in the description.

Run the `typography` skill over every card before sending: correct quotes for the
language, non-breaking spaces, no em dash, no "not A, but B".

---

## Worked example

Layer 1, for an artist who makes interactive projection for dance.

**Beat one.** Do not ask what she fears. Put her in the room after it has gone wrong.

> **question:** A studio, a dancer working, your projection running live, and it is
> going badly. What exactly is going badly?
> **header:** Failure

| label | description |
|---|---|
| The choreographer politely says they will try it without the projection | The work turns out to be decoration, and decoration can be removed. |
| The dancer cannot find a way to move with it | You built a system there is no way to enter with a body. |
| Everything works and nobody is moved | Technically flawless and emotionally empty. |
| They invite you back and you cannot do it twice | Success with nothing behind it. |

Note the load-bearing design: no option lets the image itself be the subject, so "it
is an artistic effect" is not available as an answer. Every failure here is social and
has a person in the room.

**Beat two,** after she picks the first option:

> **question:** "We will try it without the projection." Whose voice is that? Who says it?
> **header:** Voice

| label | description |
|---|---|
| A specific choreographer you have already worked with | A real person, a real studio, a real afternoon. |
| One you have not dared write to | A refusal you rehearse in advance so you never have to ask. |
| Someone from your training, saying it about something else | An old sentence fitted onto a new situation. |
| You, a week before the show | You remove the projection first, so that nobody else gets to. |

The last option is load-bearing. If she picks it, layer 1 is half done in two cards.

**Beat three,** the downward arrow, if she picked one of the first three:

> **question:** Suppose they do try it without your projection. What would that mean?
> **header:** Meaning

Four candidate meanings, escalating from the practical ("one job I do not get") to the
identity-level ("I am a technician who was allowed to call herself an artist for a
while"). Whichever she picks, ask the same question again about her answer. See
`references/unpacking.md`.
