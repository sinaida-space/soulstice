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
header:      ≤12 characters, a noun, in the session language
options:     3 or 4, each an answer, each with a description that sharpens it
multiSelect: true only when the answers genuinely coexist
```

The interface adds "Other" automatically. Never add your own version of it.

---

## Options are answers

The single rule that matters. An option is a sentence the user could say out loud
about her own life. It is not a label for a class of sentences.

**Banned (categories):**
- "Страх провала"
- "Синдром самозванца"
- "Влияние семьи"
- "Коммерческое давление"

**Correct (answers):**
- "Скажут, что это красиво и пусто, и я соглашусь"
- "Никто ничего не скажет, просто не позовут второй раз"
- "Позовут, и я не вывезу технически, и это увидят"
- "Получится, и придётся делать это ещё раз, и ещё"

The second set is usable. Someone reading it recognises herself in one line and knows
immediately that the other three are wrong. That recognition is the data.

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

    label:       "Позовут второй раз, и я не вывезу"
    description: "Технический провал при свидетелях, которые разбираются лучше меня."

A description that only restates the label wastes the strongest part of the card.

---

## The two-beat rhythm

**This is the mechanism that replaces open questions.** Never leave a pick standing.

**Beat one:** the card. She picks.
**Beat two:** a card that attacks the pick.

Beat-two question forms, rotate them:

- "Что в этом ответе неточно?" with options that each name a different distortion
- "Какая часть этого правда, а какая то, что положено отвечать?"
- "Более резкая версия того же самого: какая?" with three escalations of her pick
- "Если это правда, что из этого следует?" with three consequences
- "Что этот ответ позволяет не говорить?"

Recognition is cheap; correction is not. Someone who picks an option and is then asked
what is wrong with it will produce, in "Other", the sentence you could never have got
by asking an open question cold. **The purpose of beat one is to give her something to
disagree with.**

Budget: roughly one beat-two card for every beat-one card. A layer is four to six
cards total.

---

## Making the pick expensive

Devices that stop a card being answered on autopilot:

- **Force a ranking.** "Что хуже?" with two bad options is harder than "что тебя
  беспокоит" with four.
- **Remove the comfortable exit.** If every option is an admission, she must admit
  something or write her own.
- **Put a real name in it.** Once she has named an artist, a curator, a studio, use
  that name in later options.
- **Make one option flattering and obviously false.** She will reject it and in
  rejecting it say what is true.
- **Ask about the last time, not about generally.** "В последний раз, когда это было"
  in the question stem, and each option is a different kind of last time.

---

## multiSelect

Use it when the answers stack rather than compete: recurring elements in layer 5,
inherited rules in layer 2, the poisons in layer 7. Do not use it in layer 1 or
layer 10, where the point is to force one choice.

A multiSelect card where she picks everything is a failed card. Prevent it by making
the options mutually costly.

---

## When to use open text instead

Three places only:

1. **Layer 5, the works list.** "Перечисли всё, что ты сделала за пять лет." No card
   can substitute. Everything after it is cards built from her list.
2. **The closing question.** "Что ты не сказала за эту сессию?" A card here would be
   obscene.
3. **When you cannot build honest options.** If you have no idea what four plausible
   answers look like, do not fake it with generic ones. Ask plainly and say why you
   are not offering options.

Everywhere else, if you are about to write a bare question, you have broken the skill.

---

## Language

Cards are written in the session language. Headers too. Examples in this file are in
Russian because that is the most likely session language for this skill's author; they
demonstrate shape, and none of them should be shipped in any language.

Russian headers must fit 12
characters: «Страх», «Наследство» (10), «Роль», «Голоса», «Поле», «Яды», «Эпоха»,
«Ставки», «Контакт», «Признание» (9).

Option labels are 1 to 5 words where the interface allows, but this skill needs
sentences more than it needs brevity. Put the sentence in the label and let it be
long; put the sharpening detail in the description.

Run the `typography` skill over every card before sending: «ёлочки», nbsp, no em dash,
no "not A, but B".

---

## Worked example

Layer 1, for an artist who does interactive projection for dance.

**Beat one**

> question: Представь: студия, танцовщик работает, твоя проекция идёт живьём, и всё
> идёт плохо. Что именно пошло плохо?
> header: Провал

| label | description |
|---|---|
| Хореограф вежливо говорит, что попробует без проекции | Работа оказалась украшением, которое можно снять. |
| Танцовщик не понимает, как с этим взаимодействовать | Ты построила систему, в которую невозможно войти телом. |
| Всё сработало, и это никого не тронуло | Технически безупречно и эмоционально пусто. |
| Тебя зовут дальше, и ты не можешь это повторить | Успех, который нечем поддержать. |

Note what this card does that the open version did not: it forecloses «это
художественный эффект». No option lets the picture be the subject. The failure is
social, and every option names a person in a room.

**Beat two**, after she picks the first option:

> question: «Попробую без проекции». Чей это голос? Кто это говорит?
> header: Голос

| label | description |
|---|---|
| Конкретный хореограф, с которым ты уже работала | Реальный человек, реальная студия. |
| Хореограф, к которому ты ещё не решилась написать | Отказ, который ты проигрываешь заранее, чтобы не просить. |
| Кто-то из твоего образования, кто говорил это про другое | Старая фраза, надетая на новую ситуацию. |
| Ты сама, за неделю до показа | Ты снимаешь проекцию первой, чтобы никто не успел. |

The last option is the load-bearing one. If she picks it, layer 1 is done in two cards.
