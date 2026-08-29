// Soulstice — standalone pages: Privacy & storage and the 404 view.
// All prose is verbatim from web/CONTENT.md sections 4 and 6.

import { el } from "./dom.js";

// A playlist to step away to, offered on the 404 and Ground screens. A plain
// outbound link, never an embed, so nothing third-party loads here.
export const UNWIND_PLAYLIST = "https://open.spotify.com/playlist/1lnhhzpja7u0aP2uiccYW2";

function mailto(address) {
  return el("a", { href: "mailto:" + address }, address);
}

function extLink(href, text) {
  return el("a", { href: href, target: "_blank", rel: "noopener" }, text);
}

// ---- Privacy & storage (CONTENT.md section 4) ---------------------------------

export function renderPrivacy() {
  const root = el("article", { class: "page screen-panel", "data-role": "privacy" });

  root.appendChild(el("h1", { class: "page__h1" }, "Privacy and storage"));
  root.appendChild(
    el(
      "p",
      null,
      "SOULSTICE runs entirely in your browser. The whole picture is short."
    )
  );

  root.appendChild(el("h2", { class: "page__h2" }, "What is collected"));
  root.appendChild(
    el(
      "p",
      null,
      "Nothing. SOULSTICE has no accounts, no sign-in, no contact form, no comments, no analytics. It loads no third-party scripts, fonts, or embeds. It sets no cookies. Nothing you type is transmitted anywhere."
    )
  );

  root.appendChild(el("h2", { class: "page__h2" }, "What is stored on your device"));
  root.appendChild(
    el(
      "p",
      null,
      "Your answers, your progress, and the document SOULSTICE generates are saved in this browser's local storage, on your device only, so you can leave and resume. This never leaves your machine and no one else can read it, the author included."
    )
  );
  const removeP = el("p", null, "You can remove all of it at any time with ");
  removeP.appendChild(el("strong", null, "Erase everything on this device"));
  removeP.appendChild(
    document.createTextNode(
      " in the footer, or by clearing this site's data in your browser. Nothing is held anywhere else to delete."
    )
  );
  root.appendChild(removeP);

  root.appendChild(el("h2", { class: "page__h2" }, "Hosting"));
  root.appendChild(
    el(
      "p",
      null,
      "The site is served as static files by GitHub Pages, with Fastly as its content-delivery network. To deliver any web page, a host processes basic technical request data: your IP address, your browser's user-agent string, the file requested, and a timestamp. GitHub and Fastly do this on their own infrastructure, keep it briefly for security and reliability under their own retention schedules, and do not use it to build an advertising profile. The author does not receive or store these logs."
    )
  );
  root.appendChild(
    el(
      "p",
      null,
      "Where GitHub and Fastly process this data outside the EU and EEA, they rely on the safeguards in their own data-processing terms, which incorporate the EU Standard Contractual Clauses. Legal basis: the legitimate interest in delivering the site securely."
    )
  );

  root.appendChild(el("h2", { class: "page__h2" }, "Your rights"));
  root.appendChild(
    el(
      "p",
      null,
      "Under the GDPR you have the right to access, correct, erase, restrict, or object to the processing of your personal data, and the right to data portability. Because SOULSTICE collects and holds no personal data about you, there is nothing here for the author to produce, change, or delete. Your on-device data is already fully under your control."
    )
  );
  const contactP = el("p", null, "For any question, contact ");
  contactP.appendChild(mailto("closest.dilly7p@icloud.com"));
  contactP.appendChild(document.createTextNode("."));
  root.appendChild(contactP);

  const authP = el(
    "p",
    null,
    "You also have the right to complain to a supervisory authority. In the Czech Republic that is the Office for Personal Data Protection (Úřad pro ochranu osobních údajů), "
  );
  authP.appendChild(extLink("https://uoou.gov.cz", "uoou.gov.cz"));
  authP.appendChild(document.createTextNode("."));
  root.appendChild(authP);

  root.appendChild(el("h2", { class: "page__h2" }, "Changes"));
  root.appendChild(
    el(
      "p",
      null,
      "If this policy changes, the new version replaces this page and the date below updates."
    )
  );
  root.appendChild(el("p", { class: "page__meta" }, "Last updated: 29 August 2026."));

  return root;
}

// ---- 404 (CONTENT.md section 6) -------------------------------------------

export function renderNotFound() {
  const root = el("section", { class: "page notfound screen-panel", "data-role": "notfound" });

  root.appendChild(el("span", { class: "card__label" }, "Not found"));
  root.appendChild(
    el("h1", { class: "page__h1" }, "This page is not part of the instrument.")
  );
  root.appendChild(el("p", null, "The page you asked for does not exist here."));

  const unwind = el("p", { class: "notfound__unwind" });
  unwind.appendChild(document.createTextNode("While you are here, "));
  unwind.appendChild(extLink(UNWIND_PLAYLIST, "a playlist to unwind to ↗"));
  unwind.appendChild(document.createTextNode("."));
  root.appendChild(unwind);

  const back = el("p", { class: "notfound__back" });
  back.appendChild(el("a", { href: "#/welcome" }, "Back to the start ↗"));
  root.appendChild(back);

  return root;
}
