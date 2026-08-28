// Shared screen mount, used by app.js and every mode module so a mode can
// render without importing app.js (which would be circular).

import { Store } from "./store.js";
import { el } from "./dom.js";

export function screenNode() {
  return document.getElementById("screen");
}

export function mountScreen(node) {
  const host = screenNode();
  if (!host) return;
  host.replaceChildren(node);
  if (Store.isDegraded && Store.isDegraded()) {
    host.appendChild(
      el(
        "p",
        { class: "card__note", "data-role": "degraded-notice" },
        "This browser is blocking local storage, so this session will not survive a reload."
      )
    );
  }
}

export function goHome() {
  window.location.hash = "#/";
}
