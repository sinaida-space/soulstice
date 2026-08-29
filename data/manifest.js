// Soulstice — data manifest. Composed from per-arc index files so parallel
// milestones never edit the same file. Do NOT add layer imports here; add
// them to layers/arc1.js, arc2.js, arc3.js. Non-Passage sections (Ground,
// Lens, Statement, Journal, Return) get their own exports here later.

import { arc1 } from "./layers/arc1.js";
import { arc2 } from "./layers/arc2.js";
import { arc3 } from "./layers/arc3.js";

export const passageLayers = [...arc1, ...arc2, ...arc3];
