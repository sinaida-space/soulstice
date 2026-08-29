// Shared screen mount, used by app.js and every mode module so a mode can
// render without importing app.js (which would be circular).

import { Store } from "./store.js";
import { el } from "./dom.js";

export function screenNode() {
  return document.getElementById("screen");
}

// Move focus to the freshly mounted panel so keyboard and screen-reader users
// land on the new screen. The panel is not a natural tab stop, so it takes a
// programmatic tabindex of -1. preventScroll keeps the focus call from nudging
// the page; the explicit scroll below is what puts every screen at the top.
function focusPanel(node) {
  if (!node || node.nodeType !== 1 || typeof node.focus !== "function") return;
  if (!node.hasAttribute("tabindex")) node.setAttribute("tabindex", "-1");
  try {
    node.focus({ preventScroll: true });
  } catch (e) {
    node.focus();
  }
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
  focusPanel(node);
  // Every screen starts at the top. Without this, advancing a card (or entering
  // a mode) from a scrolled position leaves the new screen mid-page with the
  // footer floating in view.
  window.scrollTo(0, 0);
}

export function goHome() {
  window.location.hash = "#/";
}
