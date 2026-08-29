// Soulstice — a dithered red-on-transparent image chosen at random from a set.
// Hover (desktop) or tap (mobile) inverts it via a CSS mask XOR: red where the
// dither was clear, clear where it was red.
//
//   renderDitherImage("./assets/path/", 3, { className: "modeselect__img" })
//
// The mask URL is set on the element itself so it resolves against the
// document, not the stylesheet (the app is served from a sub-path on Pages).
// Google-Translate safe: nothing here reads text; the widget is decorative.

import { el } from "./dom.js";

export function renderDitherImage(dir, count, opts) {
  const o = opts || {};
  const n = 1 + Math.floor(Math.random() * count);
  const src = dir + n + ".png";

  const img = el("div", {
    class: "ditherimg" + (o.className ? " " + o.className : ""),
    "data-role": o.role || "dither-image",
    "data-src": src,
    "aria-hidden": "true",
    tabindex: "0",
    role: "button",
    "aria-label": "Invert the image"
  });
  let inverted = false;

  function paint() {
    if (inverted) {
      const m = 'url("' + src + '"), linear-gradient(#000, #000)';
      img.style.webkitMaskImage = m;
      img.style.maskImage = m;
      img.style.webkitMaskComposite = "xor";
      img.style.maskComposite = "exclude";
    } else {
      img.style.webkitMaskImage = 'url("' + src + '")';
      img.style.maskImage = 'url("' + src + '")';
      img.style.webkitMaskComposite = "";
      img.style.maskComposite = "";
    }
  }
  function set(v) { inverted = v; paint(); }

  paint();
  img.addEventListener("pointerenter", function () { set(true); });
  img.addEventListener("pointerleave", function () { set(false); });
  img.addEventListener("click", function () { set(!inverted); });
  img.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      set(!inverted);
    }
  });

  return img;
}

export default { renderDitherImage: renderDitherImage };
