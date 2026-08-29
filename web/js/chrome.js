// Soulstice — persistent header and footer.
//
// renderHeader(modeLabel) and renderFooter() each return a single element that
// app.js drops into #site-header / #site-footer on every route change, so the
// mode label and the ground toggle stay current.
//
// Google-Translate safety: every control keys off element references and
// data-* attributes captured at render time, never off text nodes. Re-rendering
// replaces the whole subtree.

import { el } from "./dom.js";

// ---- view (Full / Light) + reduce-effects state ------------------------------
// Full  = void ground + galaxy + CRT behind opaque cards (default).
// Light = plain chalk ground, no backdrop, no CRT.
// Reduce effects is independent of Full / Light and is also forced on whenever
// the browser asks for reduced motion. State is applied as data-view /
// data-motion on <html>; CSS and backdrop.js react. Nothing here reads text.

const VIEW_KEY = "soulstice:v1:ui:view"; // "full" | "light"
const MOTION_KEY = "soulstice:v1:ui:motion"; // "full" | "reduced"
const OLD_GROUND_KEY = "soulstice:v1:ui:ground"; // migrated then removed

const reduceMQ =
  typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false, addEventListener: function () {}, addListener: function () {} };

function lsGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function lsSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    /* preference will not persist */
  }
}

function lsRemove(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    /* nothing to do */
  }
}

// Stored view, migrating the old chalk/void ground key on first load.
function readView() {
  const v = lsGet(VIEW_KEY);
  if (v === "full" || v === "light") return v;

  const old = lsGet(OLD_GROUND_KEY);
  if (old === "void" || old === "chalk") {
    const migrated = old === "void" ? "full" : "light";
    lsSet(VIEW_KEY, migrated);
    lsRemove(OLD_GROUND_KEY);
    return migrated;
  }
  return "full";
}

function prefersReduced() {
  return !!reduceMQ.matches;
}

// Effective motion: the OS request always wins toward "reduced".
function effectiveMotion() {
  if (prefersReduced()) return "reduced";
  return lsGet(MOTION_KEY) === "reduced" ? "reduced" : "full";
}

function applyView(value) {
  document.documentElement.setAttribute("data-view", value);
}

function applyMotion(value) {
  document.documentElement.setAttribute("data-motion", value);
}

function currentView() {
  return document.documentElement.getAttribute("data-view") === "light"
    ? "light"
    : "full";
}

function setView(value) {
  const v = value === "light" ? "light" : "full";
  lsSet(VIEW_KEY, v);
  applyView(v);
  refreshFooter();
}

function setMotion(value) {
  // Only meaningful when the OS is not already forcing reduced motion.
  lsSet(MOTION_KEY, value === "reduced" ? "reduced" : "full");
  applyMotion(effectiveMotion());
  refreshFooter();
}

function refreshFooter() {
  const footer = document.getElementById("site-footer");
  if (footer) footer.replaceChildren(renderFooter());
}

export function initView() {
  applyView(readView());
  applyMotion(effectiveMotion());
  // Follow the OS reduced-motion setting live; keep the stored preference as is.
  const onMQ = function () {
    applyMotion(effectiveMotion());
    refreshFooter();
  };
  if (reduceMQ.addEventListener) reduceMQ.addEventListener("change", onMQ);
  else if (reduceMQ.addListener) reduceMQ.addListener(onMQ);
}

// ---- erase everything ----------------------------------------------------

function eraseSoulsticeKeys() {
  try {
    const keys = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.indexOf("soulstice:") === 0) keys.push(k);
    }
    for (const k of keys) {
      try {
        window.localStorage.removeItem(k);
      } catch (e) {
        /* skip this key */
      }
    }
  } catch (e) {
    // storage unavailable: nothing persisted to erase
  }
}

// ---- header ------------------------------------------------------------------

export function renderHeader(modeLabel) {
  const root = el("div", { class: "siteheader__inner" });

  const skip = el("a", { class: "skip-link", href: "#screen" }, "Skip to content");
  skip.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.getElementById("screen");
    if (target) {
      target.focus();
      target.scrollIntoView();
    }
  });
  root.appendChild(skip);

  root.appendChild(
    el("a", { class: "siteheader__mark", href: "#/welcome" }, "soulstice")
  );

  if (modeLabel) {
    root.appendChild(
      el("span", { class: "siteheader__mode", "data-role": "mode-label" }, modeLabel)
    );
  }

  const tail = el("div", { class: "siteheader__tail" });

  // The Full / Light and Reduce-effects controls live in the footer (M9).

  // disclosure menu
  const menu = el("details", { class: "menu" });
  const summary = el("summary", { class: "menu__summary" }, "Menu");
  menu.appendChild(summary);
  const nav = el("nav", { class: "menu__nav" });
  for (const item of [
    { href: "#/", label: "Start over" },
    { href: "#/welcome", label: "About" },
    { href: "#/privacy", label: "Privacy" }
  ]) {
    const a = el("a", { class: "menu__link", href: item.href }, item.label);
    a.addEventListener("click", function () {
      menu.open = false;
    });
    nav.appendChild(a);
  }
  menu.appendChild(nav);
  tail.appendChild(menu);

  root.appendChild(tail);
  return root;
}

// ---- footer ----------------------------------------------------------------

export function renderFooter() {
  const root = el("div", { class: "sitefooter__inner" });

  root.appendChild(
    el(
      "p",
      { class: "sitefooter__credit" },
      "Soulstice — an instrument by Sinaida Krivchenko"
    )
  );

  const links = el("nav", { class: "sitefooter__links" });
  const internal = [
    { href: "#/welcome", label: "About" },
    { href: "#/privacy", label: "Privacy & storage" },
    { href: "#/imprint", label: "Imprint" }
  ];
  const external = [
    { href: "https://sinaida.eu", label: "sinaida.eu ↗" },
    { href: "https://www.instagram.com/sin.ai.da/", label: "Instagram ↗" }
  ];
  for (const item of internal) {
    links.appendChild(el("a", { class: "sitefooter__link", href: item.href }, item.label));
  }
  for (const item of external) {
    links.appendChild(
      el(
        "a",
        { class: "sitefooter__link", href: item.href, target: "_blank", rel: "noopener" },
        item.label
      )
    );
  }
  root.appendChild(links);

  const controls = el("div", { class: "sitefooter__controls" });

  // View: Full / Light. aria-label names the state the click produces
  // (sinaida.eu pattern). Visible text is fixed per CONTENT.md section 3.
  const view = currentView();
  const viewTarget = view === "light" ? "full" : "light";
  const viewBtn = el(
    "button",
    {
      class: "ctl",
      type: "button",
      "data-ctl": "view",
      "aria-pressed": view === "light" ? "true" : "false",
      "aria-label":
        "Switch to " + viewTarget + " view (currently " + view + ")"
    },
    "View: Full / Light"
  );
  viewBtn.addEventListener("click", function () {
    setView(currentView() === "light" ? "full" : "light");
  });
  controls.appendChild(viewBtn);

  // Reduce effects. Reflects the effective state; when the OS forces reduced
  // motion the button stays pressed and toggling has no visible effect.
  const reduced = effectiveMotion() === "reduced";
  const motionBtn = el(
    "button",
    {
      class: "ctl",
      type: "button",
      "data-ctl": "motion",
      "aria-pressed": reduced ? "true" : "false",
      "aria-label": reduced
        ? "Restore effects (effects currently reduced)"
        : "Reduce effects (effects currently on)"
    },
    "Reduce effects"
  );
  motionBtn.addEventListener("click", function () {
    setMotion(effectiveMotion() === "reduced" ? "full" : "reduced");
  });
  controls.appendChild(motionBtn);

  // Erase everything, with an inline confirm step (never window.confirm).
  const erase = el("div", { class: "erase", "data-role": "erase" });
  const start = el(
    "button",
    { class: "btn btn--ghost", type: "button", "data-action": "erase-start" },
    "Erase everything on this device"
  );
  start.addEventListener("click", function () {
    erase.replaceChildren(confirmPanel(erase));
  });
  erase.appendChild(start);
  controls.appendChild(erase);

  root.appendChild(controls);
  return root;
}

function confirmPanel(host) {
  const panel = el("div", { class: "erase__confirm", "data-role": "erase-confirm" });
  panel.appendChild(
    el(
      "p",
      { class: "erase__q" },
      "Erase all Soulstice data from this browser? This cannot be undone."
    )
  );
  const yes = el(
    "button",
    { class: "btn", type: "button", "data-action": "erase-confirm" },
    "Yes, erase"
  );
  yes.addEventListener("click", function () {
    eraseSoulsticeKeys();
    window.location.hash = "#/welcome";
    // app.js re-renders chrome + screen on hashchange; if already at
    // #/welcome, prod the router directly.
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  const no = el(
    "button",
    { class: "btn btn--ghost", type: "button", "data-action": "erase-cancel" },
    "Cancel"
  );
  no.addEventListener("click", function () {
    host.replaceChildren(restartButton(host));
  });
  panel.appendChild(yes);
  panel.appendChild(no);
  return panel;
}

function restartButton(host) {
  const start = el(
    "button",
    { class: "btn btn--ghost", type: "button", "data-action": "erase-start" },
    "Erase everything on this device"
  );
  start.addEventListener("click", function () {
    host.replaceChildren(confirmPanel(host));
  });
  return start;
}
