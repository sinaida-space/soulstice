// Soulstice — per-mode prompt kits.
//
// Every finished document (Compass, Ground note, statement draft, Lens verdict,
// Journal entry, Return review) can be carried into a language model. The point
// is never to have the model do the thinking. It has never seen the work and
// cannot say what it means. It can only press on what is already written and
// hand back sharper questions.
//
// llmKit(mode) -> { note, intro, prompts: [{ label, text }] }
// The output screen (js/output.js) renders this under the document, in its own
// framed block, with a copy button per prompt. Each copy joins the prompt text
// to the document markdown so a single paste is enough.
//
// typo() is applied by the caller to `note`, `intro` and every `label` /
// `text`. Nothing here is a user's verbatim answer.

const NOTE =
  "Use this only to question what you already wrote. The model has never seen your work and cannot tell you what it means. It can point at gaps and press you; the thinking stays yours.";

const INTRO =
  "Open the language model you use and paste one prompt below. Your document is copied with it, so you can paste straight in.";

const KITS = {
  passage: [
    {
      label: "Press the Compass",
      text:
        "Below is a Compass I wrote about my art practice through a long guided self-inquiry. Read it, then ask me eight to ten hard questions, one at a time, waiting for my answer before the next. Look for claims I did not back up, two statements that do not sit together, places where I named a feeling instead of a decision, and anything I seem to be walking around. Do not summarise it back to me and do not give advice."
    },
    {
      label: "Name what is missing",
      text:
        "Below is a Compass about my art practice. List the questions it does not answer about what I make and why I make it. Phrase each as a question I could sit with on my own. Do not guess at the answers."
    },
    {
      label: "Say it back plainly",
      text:
        "Below is a Compass about my art practice. In one short paragraph, tell me what you understand my direction to be, using only what the text says. Then list every point where you had to fill a gap. I will correct you."
    }
  ],
  ground: [
    {
      label: "Sit with one line",
      text:
        "Below is a short note I wrote in a low moment about my work. Pick the one sentence that seems to carry the most weight and ask me a single gentle question about it. Nothing else. No reassurance, no advice, no plan."
    }
  ],
  statement: [
    {
      label: "Test each sentence",
      text:
        "Below is a draft artist statement in my own words. Take it one sentence at a time and ask me what that sentence actually claims, and whether someone who saw my work would recognise it. Do not rewrite anything."
    },
    {
      label: "Mark the filler",
      text:
        "Below is a draft artist statement. Point to every phrase that could belong to any artist, and every word doing no work. List them. Do not rewrite the statement; I will."
    }
  ],
  lens: [
    {
      label: "Question the verdict",
      text:
        "Below is a short assessment I made of one work of mine. Ask me what evidence I have for each judgement in it, and where I might be too kind or too harsh on myself. One question at a time."
    }
  ],
  journal: [
    {
      label: "Follow the thread",
      text:
        "Below is a journal entry about my art practice from today. Ask me three questions that would help me see what this entry is circling. Do not interpret it for me."
    }
  ],
  return: [
    {
      label: "Check it against life",
      text:
        "Below is an old Compass about my art practice and a note on what has happened since. Ask me where the two disagree, and which change I have not admitted to yet. One question at a time."
    }
  ]
};

export function llmKit(mode) {
  const prompts = KITS[mode] || KITS.passage;
  return { note: NOTE, intro: INTRO, prompts: prompts };
}

export default { llmKit: llmKit };
