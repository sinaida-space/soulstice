// Tiny DOM builder shared by the renderer and the app.
// Not part of the frozen contract — an internal helper only.

export function el(tag, attrs, ...children) {
  const node = document.createElement(tag);
  if (attrs) {
    for (const k in attrs) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === "class") node.className = v;
      else node.setAttribute(k, v === true ? "" : String(v));
    }
  }
  for (const c of children) {
    if (c == null || c === false) continue;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return node;
}

// Replace an element's whole subtree with fresh text (write only, never read).
export function setText(node, text) {
  node.replaceChildren(document.createTextNode(text));
}

export function clear(node) {
  node.replaceChildren();
}
