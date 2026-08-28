// Soulstice — persistent header and footer.
//
// renderHeader(modeLabel) and renderFooter() each return a single element that
// app.js drops into #site-header / #site-footer on every route change, so the
// mode label and the ground toggle stay current.
//
// Google-Translate safety: every control keys off element references and
// data-* attributes captured at render time, never off text nodes. Re-rendering
// replaces the whole subtree.

import { el, setText } from "./dom.js";

// ---- ground (chalk / void) display toggle --------------------------------
// Superseded by M9's Full / Light control; kept working here under its own key.

const GROUND_KEY = "soulstice:v1:ui:ground";

function loadGround() {
  try {
    return window.localStorage.getItem(GROUND_KEY) === "void" ? "void" : "chalk";
  } catch (e) {
    return "chalk";
  }
}

function saveGround(value) {
  try {
    window.localStorage.setItem(GROUND_KEY, value);
  } catch (e) {
    // preference simply will not persist
  }
}

function applyGround(value) {
  document.documentElement.setAttribute("data-ground", value);
  document.body.setAttribute("data-ground", value);
}

export function initGround() {
  applyGround(loadGround());
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

  // ground toggle (M9 replaces this with Full / Light)
  const gbtn = el("button", {
    class: "siteheader__ground",
    type: "button",
    "data-role": "ground-toggle"
  });
  function paintGround() {
    const current =
      document.documentElement.getAttribute("data-ground") === "void" ? "void" : "chalk";
    const target = current === "void" ? "chalk" : "void";
    gbtn.setAttribute("data-ground-target", target);
    setText(gbtn, target === "void" ? "Dark ground" : "Light ground");
  }
  paintGround();
  gbtn.addEventListener("click", function () {
    const target =
      gbtn.getAttribute("data-ground-target") === "void" ? "void" : "chalk";
    applyGround(target);
    saveGround(target);
    paintGround();
  });
  tail.appendChild(gbtn);

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
    { href: "https://www.instagram.com/sin.ai.da/", label: "Instagram ↗" },
    { href: "https://github.com/sinaida-space/soulstice", label: "Source on GitHub ↗" }
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

  // M9 wires these two. Rendered here as labelled, disabled stubs.
  controls.appendChild(
    el(
      "button",
      { class: "ctl-stub", type: "button", disabled: true, "data-ctl": "view" },
      "View: Full / Light"
    )
  );
  controls.appendChild(
    el(
      "button",
      { class: "ctl-stub", type: "button", disabled: true, "data-ctl": "motion" },
      "Reduce effects"
    )
  );

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
