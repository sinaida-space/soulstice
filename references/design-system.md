# The design system

Used inside **Statement mode** to build the Form section of the artist statement, and
to typeset the finished document. `references/statement.md` covers the five sections
of the statement itself. This file covers one question underneath the Form section:
what her design system actually is, and how it gets onto the page.

The rule carried over from `references/statement.md` applies here without exception:
**nothing is invented, everything comes from her.** Cards locate and narrow. The
sentences that end up in the document are hers: her own words, chosen or typed by her,
never a description of her style written on her behalf.

---

## Part 1: does a design system already exist

Check before asking anything. Three cases.

**It exists and is documented.** For this user, that system is the `sinaida-grid-style`
skill: red vertical rules on chalk or void, Geist Pixel throughout, a baseline unit,
duotone dithered images. Detect it by checking whether that skill is available, and by
checking `~/.claude/soulstice/profile.md` for a prior note that she uses it or a
different one. If it is there, you are retrieving rather than eliciting. Read
`~/.claude/skills/sinaida-grid-style/SKILL.md`, pull the reasons it already states
(Geist Pixel from the measured CV grid, red as the one accent, duotone dither as the
image treatment), and confirm those reasons with her rather than re-deriving them from
scratch. Part 5 covers the handoff to it.

**It exists but is undocumented.** The common case, for her and for most artists. She
has made consistent choices for years without writing them down. The work of this file
is here: find the pattern in what she has actually done rather than in what she would
say if
asked to describe her own style cold. Part 2.

**It does not exist.** She has never thought about it as a system, and there is
genuinely no consistency yet, because the practice is new or deliberately varied. Treat
this as a first draft rather than an absence: ask how she sees it starting, write the
answer down as a provisional system, and mark it provisional in the record.

---

## Part 2: eliciting an undocumented design system

**Do not ask what her design system is.** Nobody can answer that question well; an
answer given cold describes an identity instead of reporting a decision. Ask instead
about decisions she has already made, repeatedly, on real projects, and let the
system fall out of the pattern. Someone who cannot describe her typography in the
abstract can always say which of two posters is hers.

This is the same card discipline as the rest of Soulstice: options are answers, not
categories, and at least one option costs something to pick. See `references/cards.md`.

Cover, in whatever order the session produces:

- **Typography.** Which faces recur, and why those and not others.
- **Colour.** What is in the palette, and, more useful, what is banned from it.
- **Grid and density.** How much white space, how tight the columns, how dense a page
  or screen is allowed to get.
- **Image treatment.** Photographic, dithered, generative, untouched, cropped how.
- **Motion and timing**, if the work moves: fast cuts or held frames, hard or eased.
- **Sound**, when the work carries any: source, texture, and whether silence itself is
  a used choice.
- **The negative space of it all.** What would never appear under any circumstances,
  the most productive question here. A prohibition draws a line faster than a
  permission, which is compatible with almost anything.

### Worked card: typography

Do not ask “what fonts do you use and why.” Put her in front of a decision she has
already made.

> **question:** Two versions of the same project sheet, one set in a clean grotesque,
> one in a pixel face with visible steps in the curves. Which one is the one you would
> actually send to a curator?
> **header:** Typeface

| label | description |
|---|---|
| The pixel face, because smooth type reads as trying to look expensive | It says the object was made, not bought. |
| The grotesque, because a curator's first read has to be fast and unbothered | Legibility wins over character when someone is deciding in ten seconds. |
| Neither, I would set it in something with no history in my other work | A one-off statement that the system does not actually predict my choices. |
| The pixel face, but only because it is what I always use | The habit is doing the choosing here; there is no reason behind it yet. |

The fourth option is load-bearing. If she picks it, beat two asks whether the habit
still holds or has become a coincidence: the consistency-audit move below, arriving
early.

### Worked card: the banned colour

> **question:** Somebody hands you a finished render of yours with one colour swapped
> in that was never part of your palette. Which swap makes you say immediately that it
> is not yours anymore?
> **header:** Banned hue

| label | description |
|---|---|
| Warm orange anywhere in the frame | It reads as friendly, and the work is not trying to be liked. |
| A second red, slightly different from the one you use | Two reds in one system reads as an unintended mistake, even to nobody but her. |
| Pastel of any kind, even as a small accent | Softness that was not earned by the content. |
| Pure black-and-white with no colour at all | The work needs one wrong colour in it to be hers; total restraint is somebody else's system. |

The fourth option inverts the question: it locates the prohibition in what a colour
would do (resolve the tension) rather than in which hue is used. Her pick goes into
the record under Colour, in her own words rather than in your paraphrase of them.

### The consistency-audit move

Separate from the cards above. Take her actual past work rather than hypotheticals, and
name
what recurs across it without ever having been decided on purpose. Put the pattern to
her as a card she can reject rather than as a finding she has to defend.

> **question:** Across [name three or four actual pieces], the frame is always held
> for longer than feels comfortable before anything moves. That was never a rule you
> stated. Is it one?
> **header:** Held frame

| label | description |
|---|---|
| Yes, and I have never had the word for it until now | Confirmed: it goes into the record as a stated decision with a reason attached. |
| Yes, but only because those three pieces had slow music, not because I plan it | Confirmed for a narrower reason than the pattern first suggested. Record the narrower version. |
| No, that is just what the software defaults to when I do not touch the timing | Rejected. Noted as a coincidence of tooling and dropped from the record. |
| No, and I actually think the newer work should move faster than that | Rejected and reversed: the record should say the opposite, going forward. |

Anything she confirms is written down. Anything she rejects is noted once, as a
coincidence rather than a system, so a later session does not re-propose it as a
finding. Run this audit on at least two candidate patterns before treating the
typography and colour cards above as sufficient: a design system built from two cards
and no audit is a guess with better formatting.

---

## Part 3: writing it down

File: `~/.claude/soulstice/design-system.md`. Create the directory if it does not
exist. Write in the session language, quoting her rather than summarising her, same
discipline as every other Soulstice output.

```markdown
# Design system

## Typography
<the face or faces, and why, in her words>

## Colour
<the palette, and what is banned from it, in her words>

## Grid and density
<how tight, how much white space, and why>

## Image treatment
<how images are made or altered, and why>

## Motion and timing
<if the work moves: the rule and the reason>

## Sound
<if there is sound: the rule and the reason>

## Never
<the negative space, usually the section with the most weight of all of them>

## Confirmed by audit
<patterns found in past work and confirmed as intentional, with the piece named>

## Noted as coincidence
<patterns found and rejected, so they are not re-proposed later>

## Status
<documented | provisional first draft, with the date>
```

A design system with no reason attached to each choice is a style guide, and a style
guide cannot feed a statement. Do not let a card close on the label alone; if she gives
no reason beyond the pick, ask once more.

**This file is updated, never rewritten.** When a new work breaks a rule already on
file, that is not automatically an error in the new work. Ask directly: is this a
change in the system, or is this one piece the exception. A change edits the relevant
section and notes the date; an exception is added under Never or the relevant section,
named as an exception, without deleting the original rule.

---

## Part 4: feeding the Form section

`references/statement.md` builds an artist statement in five sections, one of them
Form. The design-system record above is the raw material for that section, but not all
of it belongs there.

**The test:** a formal choice belongs in the statement's Form section when removing it
would change what the work says. It belongs in a spec sheet instead when removing it
would only change how the work looks.

Worked split, using the cards above:

- “I hold every frame longer than feels comfortable” belongs in Form. Remove it and the
  work no longer makes the argument that attention itself is the subject. It is a claim
  about meaning; the timing setting is only its trace.
- “The pixel face is Geist Pixel, set at the CV’s measured baseline unit” belongs in a
  spec sheet. Which exact typeface file and which exact grid module do not change what
  the work says; a different pixel face at a different scale would say the same thing.
- “No colour may resolve the tension” belongs in Form. It states what the palette is
  for.
- “The red is `cd0000`, chosen against a colour picker’s default” belongs in the spec.

When a design-system entry passes the test, carry the reason into Form in her own
words. Leave the specification detail behind: in `design-system.md`, and, if the
rendering step needs it, in the build content file, never in the statement’s prose.

---

## Part 5: rendering

The statement ships as markdown plus a PDF laid out in her system.

**When `sinaida-grid-style` is available**, hand off to it rather than laying the
document out by hand.

1. Confirm the preset: a finished statement reads closest to `proposal` (2 vertical
   rules, section rules, no sidebar, max 2 columns), continuous prose in five named
   sections. Offer it as default, let her choose otherwise.
2. Write the five sections into a content YAML, from `templates/generic.yaml` if no
   `proposal` template exists yet. Form's prose is what Part 4 produced, already run
   through `typography`, with two or three accent nouns marked in `[square brackets]`.
3. Run `python3 scripts/build.py content.yaml --check` from inside
   `~/.claude/skills/sinaida-grid-style/`. On a fit failure, put the choice to her as
   that skill specifies: drop the type, cut copy, or run to a second page. Never pass
   `--allow-shrink` without her answer.
4. Build, render a PNG preview, read it, verify with `pdftotext` that the text layer
   reads cleanly in order.
5. The result lands as `out.pdf`; rename it to
   `~/.claude/soulstice/statement-YYYY-MM-DD.pdf`, beside the markdown source at
   `~/.claude/soulstice/statement-YYYY-MM-DD.md`.

**With an elicited system but no rendering skill**, state the typographic and colour
decisions from `design-system.md` in a short block above the statement in the same
markdown file, so she can typeset it herself or hand it to a designer without
re-deriving what this session already settled.

**With no system and no rendering skill**, the markdown ships alone. Say once, without
apologising, that no visual system exists yet to typeset it in, and that Part 2 is how
one gets built when she wants it. Do not soften the statement's content to compensate
for the plain formatting.
