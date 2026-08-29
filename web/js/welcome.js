// Soulstice — welcome screen and consent record.
//
// The welcome screen carries the standfirst, "What it is", "How it works",
// a framed disclaimer, the consent control, and the about-the-author block.
// All prose is verbatim from web/CONTENT.md section 1.
//
// Consent is a single localStorage record:
//   soulstice:v1:consent = {"agreedAt": <ms>, "policyVersion": 1}
// Google-Translate safety: the Begin button keys off the checkbox's `.checked`
// property, never off any text node.

import { el } from "./dom.js";

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
  for (const line of lines) host.appendChild(el("p", { class: "welcome__p" }, line));
}

export function renderWelcome() {
  const root = el("section", { class: "welcome screen-panel", "data-role": "welcome" });

  root.appendChild(el("span", { class: "card__label" }, "Welcome"));
  root.appendChild(
    el(
      "p",
      { class: "welcome__standfirst" },
      "A slow, private instrument for looking at your own practice as an artist."
    )
  );

  // What it is
  root.appendChild(el("h2", { class: "welcome__h" }, "What it is"));
  paragraphs(root, [
    "Soulstice asks you a long run of questions about the work you make: what you avoid, what you inherited, what is genuinely yours, and what you are working toward. You answer by choosing from concrete options or writing your own. At the end it arranges what you said into a document you keep.",
    "It runs entirely in your browser. Nothing you write is sent anywhere. Nothing is stored except on your own device, so you can stop and come back.",
    "A full pass is two to four hours of real thinking. You do not have to do it in one sitting."
  ]);

  // How it works
  root.appendChild(el("h2", { class: "welcome__h" }, "How it works"));
  const list = el("ul", { class: "welcome__list" });
  for (const item of [
    "You move through the questions one card at a time. No scores, no right answers.",
    "Most cards offer written options. You can always write your own instead.",
    "Your progress is saved in this browser only. Close the tab and return whenever.",
    "At the end you get a written document in your own words, organised. Save it as a PDF.",
    "There is a separate short mode, Ground, for low moments. It carries its own note on what it is and is not, and a list of ways to reach a person."
  ]) {
    list.appendChild(el("li", null, item));
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
    "I have read the above. I understand this is a self-reflection tool and not advice, and I want to begin."
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
      "Saved in this browser only. Nothing is sent anywhere. You can erase it from the footer."
    )
  );
  root.appendChild(form);

  // About the author
  root.appendChild(el("h2", { class: "welcome__h" }, "About the author"));
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

  return root;
}
