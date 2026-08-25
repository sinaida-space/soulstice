# Output templates

All three modes write to `~/.claude/soulstice/`. Create the directory if it does not
exist. Write in the session language. Run the `typography` skill over the finished file
before saving.

**Rules for every output:**

- Quote the user. Their sentences go in verbatim, including the awkward ones. Your job
  is arrangement, not translation.
- Never add an insight they did not reach. If a pattern seems obvious to you and they
  did not name it, it goes in the open-questions section as a question.
- Leave contradictions standing and labelled. A tidy document is a failed one.
- No praise, no summary of how well the session went, no next-steps enthusiasm.

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
verbatim.>

## Not mine
<what Arc I removed. Inherited rules they chose to drop, borrowed wants, softenings,
the underclaims. One line each, no commentary.>

## Still unresolved
<the contradictions, stated as pairs. "You want X. You also want Y. You did not
choose." No resolution offered.>

## Three directions
<three directions the material actually supports. A direction rather than a project: a way
of going rather than a thing to deliver. Each one names which layers it comes out of.>

## Stop list
<what to stop doing, from layers 4, 6 and 7. Concrete and small.>

## One test
<a single small real-world test of one big assumption from layer 1, in the Kegan &
Lahey sense. Something doable this month, that they would not do if the assumption
were true.>

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

Every fifth entry, offer a **drift review** rather than a new layer:

- what has moved since the first entry
- what recurs untouched across entries, in their own repeated words
- what they have stopped mentioning
- one question the journal has been avoiding

Write the drift review into the journal as a dated entry of its own.

---

## Lens

For one specific work. No file needed unless they ask; deliver in the conversation.

Run abbreviated versions of the layers as diagnostics, one question each, skipping any
that do not apply:

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

Output: a verdict paragraph naming what the work is actually doing, whether that
matches what they said it was for, and the two or three questions it has not answered.
Be direct. This mode is short and its value is bluntness.
