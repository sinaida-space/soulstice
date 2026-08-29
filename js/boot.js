// Soulstice — MS-DOS-style boot sequence for the welcome screen.
//
// Only runs when there is time to buy: the first welcome view of a session,
// motion allowed, and the hero image not already cached. If the asset comes
// back inside 200 ms (a warm cache) the whole thing is skipped and the page
// reveals at once. Otherwise a short run of cosmic-vibe phrases prints line by
// line over the bare background (no plate — the galaxy shows through), a CRT/VHS
// glitch wipes it, and the welcome panel appears block by block.
//
// Google-Translate safety: nothing here reads visible text; the overlay is
// decorative and removed before the reader interacts.

import { el } from "./dom.js";

const BOOTED_KEY = "soulstice:v1:ui:booted";

// Atmospheric, faintly diagnostic. One is shown per line, prefixed "> ".
const PHRASES = [
  "immersion into the abyss",
  "opening a channel to the void",
  "descending through the deep field",
  "letting the noise settle",
  "tuning to the background hum",
  "aligning the inner horizon",
  "counting photons from the edge",
  "unfolding the star chart",
  "holding position in the dark",
  "listening for a carrier wave",
  "drifting past the last marker",
  "warming the long exposure",
  "crossing the quiet band",
  "reading the cosmic microwave",
  "waiting for the field to clear",
  "casting off from the near shore"
];

const LAST_LINE = "the instrument is awake";

function prefersReduced() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {
    return false;
  }
}

function alreadyBooted() {
  try {
    return sessionStorage.getItem(BOOTED_KEY) === "1";
  } catch (e) {
    return false;
  }
}

function markBooted() {
  try {
    sessionStorage.setItem(BOOTED_KEY, "1");
  } catch (e) {
    /* session flag will not persist; the cache race still guards replays */
  }
}

function sample(arr, k) {
  const pool = arr.slice();
  const out = [];
  while (out.length < k && pool.length) {
    out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  }
  return out;
}

function preloadImage(src) {
  return new Promise(function (resolve) {
    if (!src) return resolve();
    const im = new Image();
    im.onload = function () { resolve(); };
    im.onerror = function () { resolve(); };
    im.src = src;
    if (im.complete) resolve();
  });
}

// Reveal the welcome panel one block at a time. The hero's own lines are
// numbered first so the cascade reads as one continuous feed.
function revealStaggered(root) {
  root.classList.remove("welcome--booting");
  root.classList.add("welcome--revealing");

  const hero = root.querySelector(".welcomehero");
  let base = 0;
  if (hero) {
    const hc = Array.prototype.slice.call(hero.children);
    hc.forEach(function (c, i) { c.style.setProperty("--reveal-i", i); });
    base = hc.length;
  }
  Array.prototype.slice.call(root.children).forEach(function (b, i) {
    if (b === hero) { b.style.setProperty("--reveal-i", 0); return; }
    b.style.setProperty("--reveal-i", base + i);
  });

  window.setTimeout(function () {
    root.classList.remove("welcome--revealing");
    Array.prototype.slice.call(root.querySelectorAll("[style*='--reveal-i']"))
      .forEach(function (n) { n.style.removeProperty("--reveal-i"); });
  }, 1600);
}

export function runBoot(root) {
  if (!root || prefersReduced() || alreadyBooted()) return;

  // Warm the hero image in the background so it does not pop in after the
  // reveal. The boot no longer waits on it — the lines always play once.
  const heroImg = root.querySelector(".welcomehero__img");
  if (heroImg) preloadImage(heroImg.getAttribute("data-src"));

  root.classList.add("welcome--booting");
  document.body.classList.add("is-booting");

  const overlay = el("div", { class: "boot", "data-role": "boot", "aria-hidden": "true" });
  const log = el("pre", { class: "boot__log" });
  const cursor = el("span", { class: "boot__cursor", "aria-hidden": "true" }, "█");
  log.appendChild(cursor);
  overlay.appendChild(log);
  document.body.appendChild(overlay);

  function writeLine(text, first) {
    log.insertBefore(document.createTextNode((first ? "" : "\n") + "> " + text), cursor);
  }

  function teardown() {
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    document.body.classList.remove("is-booting");
    revealStaggered(root);
    markBooted();
  }

  function glitchOut() {
    overlay.classList.add("boot--out");
    window.setTimeout(teardown, 460);
  }

  // Always print the full run, once per session, on every device.
  const lines = sample(PHRASES, 5);
  let i = 0;
  (function step() {
    if (i < lines.length) {
      writeLine(lines[i], i === 0);
      i += 1;
      window.setTimeout(step, 300 + Math.random() * 200);
    } else {
      writeLine(LAST_LINE, false);
      window.setTimeout(glitchOut, 560);
    }
  })();
}

export default { runBoot: runBoot };
