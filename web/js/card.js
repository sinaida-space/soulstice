// Soulstice — card renderer. FROZEN CONTRACT (see issue #1).
//
//   renderCard(cardObject, savedAnswer | null, { onSubmit }) -> HTMLElement
//     onSubmit(answer) where answer is
//       { picks: [...ids], other: "" }   for kind "single" | "multi"
//       { text: "" }                     for kind "open"
//
//   renderArcBreak(findings, onDone) -> HTMLElement       (Passage only)
//     onDone({ struck: [...ids], choice: "continue" | "break" | "stop" })
//
// The renderer owns: layout, the Other field, the single/multi/open widgets,
// the Continue button, disabling Continue until a valid answer exists, and
// restoring savedAnswer.
//
// Google-Translate safety: every element the app needs is captured by
// reference here at render time and carries a data-* attribute. Nothing in
// this file reads textContent/innerText to decide anything.

import { el } from "./dom.js";

const OTHER_ID = "_other";

export function renderCard(card, saved, opts) {
  const onSubmit = opts && opts.onSubmit ? opts.onSubmit : function () {};

  const root = el("article", {
    class: "card",
    "data-card-id": card.id,
    "data-kind": card.kind
  });

  root.appendChild(el("span", { class: "card__label", "data-role": "header" }, card.header || ""));
  root.appendChild(el("h1", { class: "card__q", "data-role": "question" }, card.question || ""));
  if (card.note) {
    root.appendChild(el("p", { class: "card__note", "data-role": "note" }, card.note));
  }

  const form = el("form", { class: "card__form", "data-card-id": card.id });
  root.appendChild(form);

  const continueBtn = el(
    "button",
    { class: "btn btn--continue", type: "submit", "data-role": "continue" },
    "Continue"
  );
  continueBtn.disabled = true;

  let getAnswer; // () => answer | null   (null means "not valid yet")

  if (card.kind === "open") {
    getAnswer = buildOpen(form, saved);
    form.addEventListener("input", sync);
  } else {
    getAnswer = buildChoices(form, card, saved, sync);
  }

  form.appendChild(continueBtn);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const answer = getAnswer();
    if (!answer) return;
    onSubmit(answer);
  });

  function sync() {
    continueBtn.disabled = !getAnswer();
  }

  sync();
  return root;
}

// ---- open ----------------------------------------------------------------

function buildOpen(form, saved) {
  const ta = el("textarea", {
    class: "field field--open",
    "data-role": "open",
    rows: "6",
    "aria-label": "Your answer"
  });
  if (saved && typeof saved.text === "string") ta.value = saved.text;
  form.appendChild(ta);

  return function () {
    return ta.value.trim() ? { text: ta.value } : null;
  };
}

// ---- single / multi ----------------------------------------------------------

function buildChoices(form, card, saved, sync) {
  const multi = card.kind === "multi";
  const groupName = "opt-" + card.id;
  const list = el("ul", { class: "opts", "data-role": "opts" });

  // { id, input, isOther, textInput? }
  const controls = [];

  const options = Array.isArray(card.options) ? card.options : [];
  for (const opt of options) {
    const inputId = groupName + "-" + opt.id;
    const li = el("li", { class: "opt", "data-opt-id": opt.id });
    const input = el("input", {
      class: "opt__input",
      type: multi ? "checkbox" : "radio",
      name: groupName,
      id: inputId,
      value: opt.id,
      "data-opt-id": opt.id
    });
    const label = el("label", { class: "opt__label", for: inputId });
    label.appendChild(el("span", { class: "opt__text" }, opt.label || ""));
    if (opt.desc) label.appendChild(el("span", { class: "opt__desc" }, opt.desc));
    li.appendChild(input);
    li.appendChild(label);
    list.appendChild(li);
    input.addEventListener("change", sync);
    controls.push({ id: opt.id, input: input, isOther: false });
  }

  // Always an Other control with its own text input.
  const otherInputId = groupName + "-other";
  const otherLi = el("li", { class: "opt opt--other", "data-opt-id": OTHER_ID });
  const otherInput = el("input", {
    class: "opt__input",
    type: multi ? "checkbox" : "radio",
    name: groupName,
    id: otherInputId,
    value: OTHER_ID,
    "data-opt-id": OTHER_ID
  });
  const otherLabel = el("label", { class: "opt__label", for: otherInputId }, "Other");
  const otherText = el("input", {
    class: "field field--other",
    type: "text",
    "data-role": "other",
    "aria-label": "Other answer"
  });
  otherLi.appendChild(otherInput);
  otherLi.appendChild(otherLabel);
  otherLi.appendChild(otherText);
  list.appendChild(otherLi);
  controls.push({ id: OTHER_ID, input: otherInput, isOther: true, textInput: otherText });

  otherInput.addEventListener("change", sync);
  otherText.addEventListener("input", function () {
    if (otherText.value.trim() && !otherInput.checked) otherInput.checked = true;
    sync();
  });

  form.appendChild(list);

  // Restore a saved answer.
  if (saved && Array.isArray(saved.picks)) {
    for (const c of controls) {
      if (saved.picks.indexOf(c.id) !== -1) c.input.checked = true;
    }
    if (typeof saved.other === "string") otherText.value = saved.other;
    if (saved.other && saved.other.trim()) otherInput.checked = true;
  }

  return function () {
    const picks = [];
    let other = "";
    for (const c of controls) {
      if (c.input.checked) {
        picks.push(c.id);
        if (c.isOther) other = c.textInput.value;
      }
    }
    if (picks.length === 0) return null;
    if (picks.indexOf(OTHER_ID) !== -1 && !other.trim()) return null;
    return { picks: picks, other: other };
  };
}

// ---- between-arc break (Passage) -------------------------------------------

export function renderArcBreak(findings, onDone) {
  const done = typeof onDone === "function" ? onDone : function () {};
  const items = Array.isArray(findings) ? findings : [];
  const root = el("section", { class: "arcbreak screen-panel", "data-role": "arc-break" });
  const struck = [];
  let step = 1;

  draw();
  return root;

  function draw() {
    root.replaceChildren();
    root.setAttribute("data-step", String(step));
    if (step === 1) drawStrike();
    else drawChoice();
  }

  function drawStrike() {
    root.appendChild(el("span", { class: "card__label" }, "Arc break"));
    root.appendChild(el("h1", { class: "card__q" }, "Which of these would you argue with?"));
    const list = el("ul", { class: "opts", "data-role": "findings" });
    items.forEach(function (f, i) {
      const id = f && f.id != null ? String(f.id) : String(i);
      const inputId = "arcbreak-" + id;
      const li = el("li", { class: "opt", "data-finding-id": id });
      const input = el("input", {
        class: "opt__input",
        type: "checkbox",
        id: inputId,
        "data-finding-id": id
      });
      const label = el("label", { class: "opt__label", for: inputId },
        (f && (f.label || f.text)) || id);
      li.appendChild(input);
      li.appendChild(label);
      list.appendChild(li);
    });
    root.appendChild(list);

    const next = el("button", { class: "btn btn--block", type: "button", "data-action": "to-choice" }, "Next");
    next.addEventListener("click", function () {
      struck.length = 0;
      list.querySelectorAll("input[data-finding-id]").forEach(function (inp) {
        if (inp.checked) struck.push(inp.getAttribute("data-finding-id"));
      });
      step = 2;
      draw();
    });
    root.appendChild(next);
  }

  function drawChoice() {
    root.appendChild(el("span", { class: "card__label" }, "Arc break"));
    root.appendChild(el("h1", { class: "card__q" }, "Where do you want to take this?"));
    const choices = [
      ["continue", "Continue now"],
      ["break", "Break and come back"],
      ["stop", "Stop here with what we have"]
    ];
    const list = el("ul", { class: "opts", "data-role": "arc-choices" });
    for (const pair of choices) {
      const li = el("li", { class: "opt", "data-choice": pair[0] });
      const btn = el(
        "button",
        { class: "btn btn--block btn--ghost", type: "button", "data-choice": pair[0] },
        pair[1]
      );
      btn.addEventListener("click", function () {
        done({ struck: struck.slice(), choice: pair[0] });
      });
      li.appendChild(btn);
      list.appendChild(li);
    }
    root.appendChild(list);
  }
}
