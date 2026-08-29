# Output templates

All five modes write to `~/.claude/soulstice/`. Create the directory if it does not
exist. Write in the session language. Run the `typography` skill over the finished file
before saving.

**Rules for every output:**

- The Prologue's profile lives at `~/.claude/soulstice/profile.md`. It is updated,
  never rewritten, at the end of any mode that learned something new about her.
- Quote the user. Their sentences go in verbatim, including the awkward ones. Your job
  is arrangement, not translation.
- **Prefer their "Other" text over their picks.** A picked option is your sentence,
  not theirs. Anything they typed themselves outranks anything they selected, and the
  Compass should be built mostly out of the typed corrections. If a section can only
  be filled with picked options, say so in the section: "this one you only picked,
  never said".
- Never add an insight they did not reach. If a pattern seems obvious to you and they
  did not name it, it goes in the open-questions section as a question.
- Leave contradictions standing and labelled. A tidy document is a failed one.
- No praise, no summary of how well the session went, no next-steps enthusiasm.
- **In the Statement output, "quote the user" is absolute, not preferred.** Every
  sentence in the statement must trace to something she said. A sentence that cannot
  be traced is removed before the file is written, not softened, not kept as a maybe.

---

## Passage → Compass

File: `~/.claude/soulstice/compass-YYYY-MM-DD.md`

```markdown
# Compass: <date>

## What I did not say
<their verbatim answer to the closing question>

## The question the work keeps asking
<their own badly-phrased version from layer 5, verbatim, not improved>

## My vocabulary
<the recurring elements from layer 5, listed. Materials, images, scale, kinds of
attention. Mark the one they said would hurt to lose.>

## Where I make from
<layer 8: the physical signal for right, the signal for wrong, the conditions that
have to be present. Layer 9: the felt quality of the present and the refusal, both
verbatim. From the Arc II break: her verbatim answer to "which part would you keep
doing if no one would ever see it again" — the audience-independent core.>

## What already works
<from the Arc II break: two or three things the body of work already does well, each
tied to a named piece or moment. Her words. Inventory, not praise. If a strength was
absent from the material, that absence is a finding and belongs in "Still
unresolved", not here.>

## Not mine
<what Arc I removed. Inherited rules they chose to drop, borrowed wants, softenings,
the underclaims. One line each, no commentary.>

## Still unresolved
<the contradictions, stated as pairs. "You want X. You also want Y. You did not
choose." No resolution offered.>

## Three directions
<three directions the material actually supports. A direction rather than a project: a way
of going rather than a thing to deliver. Each one names which layers it comes out of.

If the three-sentence manifesto was run (`references/style-workbook.md`), place its
three lines here verbatim, above the directions. If all three arcs produced strong
material, name the taste plus technique plus voice intersection from that file here;
if one of the three is thin, move that observation to "Still unresolved".>

## Stop list
<what to stop doing, from layers 4, 6 and 7. Concrete and small.>

## One test
<a single small real-world test of the identity-level belief the downward arrow
reached in layer 1. Something doable this month that they would not do if the belief
were true, small enough to be safe and real enough to be informative.

Write it as an implementation intention, with a trigger: "on the first Monday after
the render is done, I send it to one choreographer." An intention without a trigger
does not survive the loss of motivation. See `references/unpacking.md`.>

## Open questions
<what the session did not answer. Patterns you noticed and they did not confirm, put
as questions.>
```

Then, once: offer to hand one direction to **for-tee-too** for scoping. Do not push,
and do not do it unasked.

---

## Journal

File: `~/.claude/soulstice/journal.md`, appended.

```markdown
---

## <date>: <layer name>

**Asked:** <the opening question used>

**Said:**
<their answers, verbatim, lightly organised>

**Changed since last time:** <only if something did>

**Carried forward:** <the one thing to sit with>
```

After a layer that ran thin, or when she wants something to do between sittings, offer
one exercise from `references/style-workbook.md` (Museum without a guide, Body
resonance scale, Genealogy map, Letter to the critic, Three objects, One
manifesto-project). One at a time. Record what she brings back as its own dated entry.

Every fifth entry, offer a **drift review** rather than a new layer:

- what has moved since the first entry
- what recurs untouched across entries, in their own repeated words
- what they have stopped mentioning
- one question the journal has been avoiding

Write the drift review into the journal as a dated entry of its own.

---

## Lens

For one specific work. No file needed unless they ask; deliver in the conversation.

Run abbreviated versions of the layers as cards, one card each, skipping any that do
not apply. Options are built from the work itself: its actual materials, its actual
audience, its actual reason for existing. The questions below are the stems; you write
four concrete options for each one out of what she has told you about the piece.

1. Fear: what is the safe version of this piece, and are you making it?
2. Inheritance: whose approval is built into this?
3. Role: what did you soften in the description?
4. Voices: would you make it if it could not be shown for ten years?
5. Field: which of your recurring obsessions is actually in it? If none, why this piece?
6. Standing: what do you want people to conclude about you from it?
7. Poisons: is anyone specific being answered by this work?
8. Contact: have you touched the material yet, or only the plan?
9. Epoch: what does it know that only now could know?
10. Stakes: if this is one of your last twenty pieces, does it earn the slot?

Ten cards is a lot for a short mode. Pick the five that bite hardest for this
particular work and skip the rest.

Output: a verdict paragraph naming what the work is actually doing, whether that
matches what they said it was for, and the two or three questions it has not answered.
Be direct. This mode is short and its value is bluntness.

---

## Ground

Always written, always short. Write it to `~/.claude/soulstice/ground-YYYY-MM-DD.md`
and say the filename, which is the exit gate for the mode in `references/crisis.md`. Keep
it to one screen: a long document is the wrong output for someone in collapse, and the
reason to write it at all is that tomorrow she will not remember what the evidence
showed.

```markdown
# Ground: <date>

## The verdict she arrived with
<quoted, exactly as said>

## What the evidence actually showed
<the counter-evidence gathered in the session, hers, not yours>

## One action, today
<the single action, with its trigger: "on <trigger>, I <action>">

## Three projects

### 1. <name>
- What it is:
- Why this one, given what she said:
- Smallest version that counts as finished:
- How it scales up if it works:

### 2. <name>
- What it is:
- Why this one, given what she said:
- Smallest version that counts as finished:
- How it scales up if it works:

### 3. <name>
- What it is:
- Why this one, given what she said:
- Smallest version that counts as finished:
- How it scales up if it works:
```

Then, once: point to **for-tee-too** to scope whichever of the three she picks. One
pointer, nothing more. This file is short by design and stays that way.

---

## Return

Appended to the Compass file being reopened, under a new dated heading. Do not create
a new file and do not rewrite the original Compass above this heading.

```markdown
---

## Return: <date>

### What happened to each direction
<direction one, direction two, direction three, each with what actually happened to it>

### What happened to the one test
<did she run it, what it showed>

### What has drifted
<named plainly, no softening>

### Revised directions
<the directions rebuilt from the answers above>
```

---

## Statement

File: `~/.claude/soulstice/statement-YYYY-MM-DD.md`. See `references/statement.md`
for how the five sections are drafted and edited; this is the file shape only.

```markdown
# Statement: <date>

## Bio line (about 50 words)
<the shortest version>

## Open call (about 150 words)
<the mid version, for applications with a character limit>

## Website (about 400 words)
<the long version>

## Provenance
<each claim in the three versions above, mapped to the session line it came from.
Quote her, with a rough pointer to when she said it. This appendix stays in the file
and is stripped from any version she actually sends out.>

## Gaps
<any of the five sections, or any claim within one, that was left unwritten for want
of material, named plainly rather than filled in>
```

A PDF is also produced, typeset in her own design system where one is on record at
`~/.claude/soulstice/design-system.md`, through the `sinaida-grid-style` skill when it
is available. See `references/design-system.md`.

---

## Design system

The full record lives at `~/.claude/soulstice/design-system.md`, written and
maintained by `references/design-system.md`, which holds the elicitation method and
the complete template. This file only says where it lands: it is a pointer, read by
the Statement mode when typesetting the PDF and updated by the design-system skill
whenever a decision changes.
