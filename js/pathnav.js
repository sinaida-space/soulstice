// Soulstice — the quiet Back / Skip / Finish / Paths row at the foot of every
// step, in every mode. Not accented: a way through, not a call to action.
//
//   renderPathNav({ canBack, onBack, onSkip, onFinish })
//
// Omit onSkip / onFinish to leave those buttons out (e.g. a screen whose own
// controls already cover them). "Paths" always shows and returns to the mode
// selection at "#/".

import { el } from "./dom.js";

export function renderPathNav(opts) {
  const o = opts || {};
  const nav = el("div", { class: "pathnav", "data-role": "pathnav" });

  const back = el(
    "button",
    { class: "pathnav__btn", type: "button", "data-action": "back" },
    "Back"
  );
  if (!o.canBack) back.hidden = true;
  back.addEventListener("click", function () {
    if (o.canBack && o.onBack) o.onBack();
  });
  nav.appendChild(back);

  if (o.onSkip) {
    const skip = el(
      "button",
      { class: "pathnav__btn", type: "button", "data-action": "skip" },
      "Skip"
    );
    skip.addEventListener("click", function () { o.onSkip(); });
    nav.appendChild(skip);
  }

  if (o.onFinish) {
    const finish = el(
      "button",
      { class: "pathnav__btn", type: "button", "data-action": "finish" },
      "Finish"
    );
    finish.addEventListener("click", function () { o.onFinish(); });
    nav.appendChild(finish);
  }

  const paths = el(
    "button",
    { class: "pathnav__btn", type: "button", "data-action": "paths" },
    "Paths"
  );
  paths.addEventListener("click", function () {
    window.location.hash = "#/";
  });
  nav.appendChild(paths);

  return nav;
}

// A breadcrumb of visited cursors so "Back" can step to the previous card.
// Shared shape across modes: state.trail = [{ section, card }, ...].
export function pushTrail(state) {
  if (!state.trail) state.trail = [];
  if (state.cursor && state.cursor.card) {
    state.trail.push({ section: state.cursor.section, card: state.cursor.card });
    if (state.trail.length > 300) state.trail.shift();
  }
}

export default { renderPathNav: renderPathNav, pushTrail: pushTrail };
