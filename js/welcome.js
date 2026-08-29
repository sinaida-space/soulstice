// Soulstice — welcome screen and consent record.
//
// The welcome screen carries the standfirst, the premise ("The idea"), who it
// is for, the practical sections, a framed disclaimer, the consent control, and
// the about-the-author block. Prose tracks web/CONTENT.md section 1.
//
// Every display string is passed through typo() / typoTitle() at render time,
// so nbsp and glyphs are correct without hand-escaping in the source.
//
// Consent is a single localStorage record:
//   soulstice:v1:consent = {"agreedAt": <ms>, "policyVersion": 1}
// Google-Translate safety: the Begin button keys off the checkbox's `.checked`
// property, never off any text node.

import { el } from "./dom.js";
import { typo, typoTitle } from "./typo.js";
import { renderDitherImage } from "./dither-image.js";
import { runBoot } from "./boot.js";

export const CONSENT_KEY = "soulstice:v1:consent";
export const POLICY_VERSION = 1;

export function readConsent() {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      parsed.policyVersion === POLICY_VERSION &&
      typeof parsed.agreedAt === "number"
    ) {
      return parsed;
    }
    return null;
  } catch (e) {
    return null;
  }
}

function writeConsent() {
  try {
    window.localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ agreedAt: Date.now(), policyVersion: POLICY_VERSION })
    );
  } catch (e) {
    // If storage is blocked the guard will keep asking; nothing else to do.
  }
}

function paragraphs(host, lines) {
  for (const line of lines) host.appendChild(el("p", { class: "welcome__p" }, typo(line)));
}

const HERO_COUNT = 5;

// Hero: the big CRT title, the standfirst, and one dithered image chosen at
// random on load. Hover or tap the image to invert the dither (red <-> clear).
function renderHero() {
  const hero = el("div", { class: "welcomehero", "data-role": "hero" });

  hero.appendChild(
    el(
      "h1",
      { class: "welcomehero__title", "data-text": "Welcome to Soulstice" },
      "Welcome to Soulstice"
    )
  );

  hero.appendChild(
    el(
      "p",
      { class: "welcome__standfirst" },
      typoTitle("A slow, private instrument for looking at your own practice as an artist.")
    )
  );

  hero.appendChild(
    renderDitherImage("./assets/hero/", HERO_COUNT, {
      className: "welcomehero__img",
      role: "hero-img"
    })
  );

  return hero;
}

export function renderWelcome() {
  const root = el("section", { class: "welcome screen-panel", "data-role": "welcome" });

  root.appendChild(renderHero());

  // The premise
  root.appendChild(el("h2", { class: "welcome__h" }, typoTitle("The idea")));
  paragraphs(root, [
    "Sinaida made this because the work you give your life to should make you happy, and that kind of happiness comes from doing work that matters to you. Getting there starts with being able to name your own practice in plain words, and Soulstice is built to help you do that."
  ]);

  // Who it is for
  root.appendChild(el("h2", { class: "welcome__h" }, typoTitle("Who it is for")));
  paragraphs(root, [
    "It is for artists who have been working long enough to feel a distance between the work they make and the work they set out to make: people repeating themselves, people caught between two bodies of work, people who cannot describe their own practice without borrowing someone else's language. For them it slows the questions down, keeps the answers in their own words, and leaves a document they can return to and check against what happens next."
  ]);

  // The instrument
  root.appendChild(el("h2", { class: "welcome__h" }, typoTitle("The instrument")));
  paragraphs(root, [
    "Soulstice asks you a long run of questions about the work you make: the things you avoid, the things you inherited, the parts that are genuinely yours, and the direction you are working toward. You answer by choosing from concrete options or writing your own. At the end it arranges your answers into a document you keep.",
    "It runs entirely in your browser. Nothing you write is sent anywhere. Nothing is stored except on your own device, so you can stop and come back.",
    "A full pass is two to four hours of real thinking. You do not have to do it in one sitting."
  ]);

  // Moving through it
  root.appendChild(el("h2", { class: "welcome__h" }, typoTitle("Moving through it")));
  const list = el("ul", { class: "welcome__list" });
  for (const item of [
    "You move through the questions one card at a time. No scores, no right answers.",
    "Most cards offer written options. You can always write your own instead.",
    "Your progress is saved in this browser only. Close the tab and return whenever.",
    "At the end you get a written document in your own words, organised. Save it as a PDF.",
    "There is a separate short mode, Ground, for low moments. It carries its own note on its limits, and a list of ways to reach a person."
  ]) {
    list.appendChild(el("li", null, typo(item)));
  }
  root.appendChild(list);

  // Disclaimer — framed block directly above the consent control
  const disc = el("aside", { class: "welcome__disclaimer", "data-role": "disclaimer" });
  disc.appendChild(el("span", { class: "card__label" }, "Disclaimer"));
  paragraphs(disc, [
    "Soulstice is a self-reflection instrument. It is not advice.",
    "It gives no career guidance, and it is not medical, psychological, legal, financial, or professional advice of any kind. It does not assess, diagnose, or treat anything. It cannot read what you write and it does not respond to you. It follows a fixed path and arranges your answers at the end.",
    "If you need a professional, this is not a substitute for one."
  ]);
  root.appendChild(disc);

  // Consent control
  const form = el("div", { class: "consent", "data-role": "consent" });
  const row = el("p", { class: "consent__row" });
  const box = el("input", {
    class: "consent__box",
    type: "checkbox",
    id: "consent-box",
    "data-role": "consent-box"
  });
  const label = el(
    "label",
    { class: "consent__label", for: "consent-box" },
    typo("I have read the above. I understand this is a self-reflection tool and not advice, and I want to begin.")
  );
  row.appendChild(box);
  row.appendChild(label);
  form.appendChild(row);

  const begin = el(
    "button",
    { class: "btn", type: "button", "data-action": "begin", disabled: true },
    "Begin"
  );
  box.addEventListener("change", function () {
    begin.disabled = !box.checked;
  });
  begin.addEventListener("click", function () {
    if (!box.checked) return;
    writeConsent();
    window.location.hash = "#/";
  });
  form.appendChild(begin);
  form.appendChild(
    el(
      "p",
      { class: "consent__note" },
      typo("Saved in this browser only. Nothing is sent anywhere. You can erase it from the footer.")
    )
  );
  root.appendChild(form);

  // About the author
  root.appendChild(el("h2", { class: "welcome__h" }, typoTitle("About the author")));
  paragraphs(root, [
    "Soulstice was made by Sinaida Krivchenko, a new-media artist in Prague. She builds interactive projections and visual systems for stages and performances, and now and then a tool like this one. She trained as an engineer before moving to art full time."
  ]);
  const links = el("p", { class: "welcome__authorlinks" });
  links.appendChild(
    el(
      "a",
      { href: "https://sinaida.eu", target: "_blank", rel: "noopener" },
      "sinaida.eu ↗"
    )
  );
  links.appendChild(document.createTextNode(" · "));
  links.appendChild(
    el(
      "a",
      { href: "https://www.instagram.com/sin.ai.da/", target: "_blank", rel: "noopener" },
      "Instagram @sin.ai.da ↗"
    )
  );
  root.appendChild(links);

  // MS-DOS boot sequence — self-decides whether there is any load to cover.
  runBoot(root);

  return root;
}
