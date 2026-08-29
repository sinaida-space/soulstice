// Soulstice — the six between-session exercises (references/style-workbook.md).
// Journal mode hands out at most one at a time, away from the screen, and records
// what she brings back as its own dated journal entry.
//
// Each exercise: { key, title, instruction, card } where `card` is a single
// kind "open" capture card for what she brings back.

function capture(key, question, header) {
  return {
    id: key + "-cap",
    kind: "open",
    question: question,
    header: header,
    note: "Write it up now, while it is fresh. Your words, unedited.",
    options: [],
    multiSelectHint: false,
    next: { _end: true }
  };
}

export const workbookExercises = [
  {
    key: "museum",
    title: "Museum without a guide",
    instruction:
      "Open a feed with no brief. Save everything that catches you, at least forty images, no justification. " +
      "Lay them out together. Write the three words for what they have in common.",
    card: capture("museum", "The three words for what the collection has in common, and anything you noticed while saving.", "Museum")
  },
  {
    key: "resonance",
    title: "Body resonance scale",
    instruction:
      "Take ten works, yours or other people’s. For each, write a number from one to ten for the physical response, " +
      "not the intellectual one. Mark the ones that scored highest.",
    card: capture("resonance", "The works that scored highest, their numbers, and what those works have in common.", "Resonance")
  },
  {
    key: "genealogy",
    title: "Genealogy map",
    instruction:
      "Draw it. Top: the work you are making now. Below it: five direct influences. Below those: where each of them came from. " +
      "Look for what repeats down the generations, and for where the line starts with you.",
    card: capture("genealogy", "What repeats down the map, and the place where the line starts with you.", "Genealogy")
  },
  {
    key: "critic",
    title: "Letter to the critic",
    instruction:
      "Write a letter to the voice in your head that judges the work. Not a defence, an explanation: what you are making and why. " +
      "Show it to no one. The writing is the whole exercise.",
    card: capture("critic", "Anything from the letter you want to keep, and what surprised you to write.", "Letter")
  },
  {
    key: "objects",
    title: "Three objects",
    instruction:
      "Pick three physical objects from the room that could stand for the work. Do not explain the choice while you make it. " +
      "Then read what the three of them say about the work.",
    card: capture("objects", "The three objects, and what they say about the work that you did not plan to say.", "Objects")
  },
  {
    key: "manifesto",
    title: "One manifesto-project",
    instruction:
      "Make one small piece that breaks one of your own ‘never’ rules. Do not publish it. Notice what the breaking felt like.",
    card: capture("manifesto", "Which rule you broke, what you made, and what breaking it felt like.", "Manifesto")
  }
];

export default workbookExercises;
