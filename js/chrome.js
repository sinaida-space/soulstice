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
import { readConsent } from "./welcome.js";

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

// ---- storage notice -------------------------------------------------------
// Informational only. Soulstice sets no cookies, loads nothing third-party and
// runs no analytics; the localStorage it uses is strictly necessary for a
// stop-and-return tool, so no consent banner is required. This strip just makes
// the on-device storage visible on the first visit. It disappears once the
// visitor dismisses it or completes the welcome consent, which says the same.

const STORAGE_NOTICE_KEY = "soulstice:v1:ui:storage-notice";

export function initStorageNotice() {
  let node = null;
  let bound = false;

  function shouldShow() {
    return !readConsent() && lsGet(STORAGE_NOTICE_KEY) !== "dismissed";
  }
  function dismiss() {
    lsSet(STORAGE_NOTICE_KEY, "dismissed");
    remove();
  }
  function remove() {
    if (node && node.parentNode) node.parentNode.removeChild(node);
    node = null;
    unbind();
  }
  // Any real interaction dismisses the strip: the OK button, a click / tap
  // anywhere, a wheel or touch scroll, or a key. Bound after a short grace so
  // the load-time focus scroll and the reader's first glance do not count.
  // `scroll` is avoided on purpose: it also fires for programmatic and
  // layout scrolls.
  const INTERACT = ["pointerdown", "wheel", "touchmove", "keydown"];
  function bind() {
    if (bound) return;
    bound = true;
    window.setTimeout(function () {
      if (!node) return;
      for (const ev of INTERACT) {
        document.addEventListener(ev, dismiss, { once: true, capture: true, passive: true });
      }
    }, 700);
  }
  function unbind() {
    bound = false;
    for (const ev of INTERACT) {
      document.removeEventListener(ev, dismiss, { capture: true });
    }
  }
  function build() {
    const box = el("aside", { class: "storagenote", "data-role": "storage-notice" });
    box.appendChild(
      el(
        "p",
        { class: "storagenote__text" },
        "This page saves your progress on this device only. Nothing is sent anywhere."
      )
    );
    box.appendChild(el("a", { class: "storagenote__link", href: "#/privacy" }, "Privacy"));
    const ok = el(
      "button",
      { class: "storagenote__ok", type: "button", "data-action": "storage-ok" },
      "OK"
    );
    ok.addEventListener("click", dismiss);
    box.appendChild(ok);
    return box;
  }
  function sync() {
    if (shouldShow()) {
      if (!node) {
        node = build();
        document.body.appendChild(node);
        bind();
      }
    } else {
      remove();
    }
  }

  sync();
  // Completing the welcome consent navigates to "#/"; drop the strip then.
  window.addEventListener("hashchange", sync);
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

// The whole menu: three items, one tone, no active-state colour.
//   Start  -> the consent screen, the very beginning
//   Paths  -> the list of every way through
//   About  -> what the instrument is (same screen as Start; different intent)
const HEADER_LINKS = [
  ["#/welcome", "Start"],
  ["#/", "Paths"],
  ["#/welcome", "About"]
];

const SVG_NS = "http://www.w3.org/2000/svg";

function svgEl(tag, attrs) {
  const n = document.createElementNS(SVG_NS, tag);
  for (const k in attrs) n.setAttribute(k, String(attrs[k]));
  return n;
}

// A plain hamburger: three bars, tight, that fold to an X when open.
function burgerIcon() {
  const svg = svgEl("svg", {
    class: "menu__icon",
    viewBox: "0 0 24 24",
    width: 22,
    height: 22,
    fill: "currentColor",
    "aria-hidden": "true"
  });
  svg.appendChild(svgEl("rect", { class: "menu__bar menu__bar--t", x: 3, y: 6, width: 18, height: 2 }));
  svg.appendChild(svgEl("rect", { class: "menu__bar menu__bar--m", x: 3, y: 11, width: 18, height: 2 }));
  svg.appendChild(svgEl("rect", { class: "menu__bar menu__bar--b", x: 3, y: 16, width: 18, height: 2 }));
  return svg;
}

export function renderHeader() {
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

  // Wordmark, with a CRT/VHS glitch in Full view (data-text drives the layers).
  root.appendChild(
    el(
      "a",
      { class: "siteheader__mark", href: "#/welcome", "data-text": "soulstice" },
      "soulstice"
    )
  );

  // A nav link that still responds when its target is the screen you are on:
  // it re-runs the router (fresh render, scrolled to the top) instead of doing
  // nothing. Start and About both point at the welcome screen, so on that
  // screen two of the three links would otherwise be dead.
  function navLink(cls, href, label, onActivate) {
    const a = el("a", { class: cls, href: href }, label);
    a.addEventListener("click", function (e) {
      if (onActivate) onActivate();
      const cur = window.location.hash || "#/";
      const sameRoute =
        cur === href || (href === "#/" && (cur === "#/" || cur === ""));
      if (sameRoute) {
        e.preventDefault();
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }
    });
    return a;
  }

  // ---- desktop: the three words, inline, all one tone -------------------
  const nav = el("nav", { class: "siteheader__nav", "data-role": "header-nav", "aria-label": "Menu" });
  for (const [href, label] of HEADER_LINKS) {
    nav.appendChild(navLink("siteheader__navlink", href, label));
  }
  root.appendChild(nav);

  // ---- mobile: a hamburger with the same three items -------------------
  const menu = el("details", { class: "menu" });
  const summary = el("summary", { class: "menu__summary", "aria-label": "Menu" });
  summary.appendChild(burgerIcon());
  menu.appendChild(summary);

  const mnav = el("nav", { class: "menu__nav" });
  for (const [href, label] of HEADER_LINKS) {
    mnav.appendChild(
      navLink("menu__link", href, label, function () { menu.open = false; })
    );
  }
  menu.appendChild(mnav);
  root.appendChild(menu);

  return root;
}

// ---- path progress ------------------------------------------------------------
// Sits at the top of the card box during a Passage run: the path name in red
// glowing caps, then one solid red line that fills with the run. The layers
// branch, so the fill counts the current layer as half done. app.js passes the
// label and { done, total }; nothing here reads text.

export function renderPathProgress(label, progress) {
  const total = progress.total || 1;
  const done = Math.max(0, Math.min(progress.done, total));
  const pct = Math.max(3, Math.min(100, ((done + 0.5) / total) * 100));

  const root = el("div", { class: "pathprogress", "data-role": "progress" });
  root.appendChild(el("span", { class: "pathprogress__name" }, label || ""));

  const bar = el("div", {
    class: "progressbar",
    role: "progressbar",
    "aria-label": (label || "Passage") + " progress",
    "aria-valuemin": "0",
    "aria-valuemax": String(total),
    "aria-valuenow": String(done)
  });
  bar.appendChild(
    el("span", {
      class: "progressbar__fill",
      "aria-hidden": "true",
      style: "width:" + pct.toFixed(1) + "%"
    })
  );
  root.appendChild(bar);
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
    { href: "#/privacy", label: "Privacy & storage" }
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
    { class: "ctl", type: "button", "data-action": "erase-start" },
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
    { class: "ctl", type: "button", "data-action": "erase-cancel" },
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
    { class: "ctl", type: "button", "data-action": "erase-start" },
    "Erase everything on this device"
  );
  start.addEventListener("click", function () {
    host.replaceChildren(confirmPanel(host));
  });
  return start;
}
