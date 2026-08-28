// Soulstice — fixed galaxy + CRT/VHS backdrop.
//
// One <canvas id="backdrop">, position:fixed, below all content, inserted once
// from app.js boot. A drifting parallax starfield (spirit of sinaida.eu) with a
// CRT/VHS overlay on top (scanlines, vignette, chromatic fringe, low-frequency
// flicker/roll, faint noise). All readable text sits on opaque cards, so the
// backdrop is allowed to be clearly present.
//
// State comes only from data-view / data-motion on <html> (set by chrome.js)
// and from prefers-reduced-motion — attributes and .matches, never text.
//
//   data-view="light"    -> canvas hidden by CSS, rAF stopped
//   data-motion="reduced"
//   or prefers-reduced-motion, or the perf watchdog latching
//                        -> one static painted frame (still shows the brighter
//                           starfield + scanlines), no animation
//
// Perf guards: particle count scales with viewport area; devicePixelRatio is
// clamped to <= 2; the rAF loop pauses on document.hidden; if frame time stays
// poor for ~1s it drops to the static render and stays there for the session.

let canvas = null;
let ctx = null;
let started = false;

let W = 0;
let H = 0;
let DPR = 1;

let stars = [];
let nebula = [];
let pal = { ground: "#050505", star: "#f6f6f6", red: "#cd0000" };
let spriteWhite = null;
let spriteRed = null;
let vignette = null;
let scanPattern = null;
let noiseTiles = [];

let rafId = 0;
let running = false;
let lastT = 0;
let slowSince = 0;
let sessionDegraded = false; // latched: stay on the static render for the session

let resizeTimer = 0;

const reduceMQ =
  typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false, addEventListener: function () {}, addListener: function () {} };

const DRIFT_X = -3.4; // px per second at the nearest depth
const DRIFT_Y = 1.1;

// ---- state reads -------------------------------------------------------------

function viewMode() {
  return document.documentElement.getAttribute("data-view") === "light"
    ? "light"
    : "full";
}

function motionReduced() {
  return (
    sessionDegraded ||
    reduceMQ.matches ||
    document.documentElement.getAttribute("data-motion") === "reduced"
  );
}

function readPalette() {
  try {
    const cs = getComputedStyle(document.documentElement);
    const pick = function (name, fb) {
      const v = cs.getPropertyValue(name);
      return v && v.trim() ? v.trim() : fb;
    };
    pal = {
      ground: pick("--void", "#050505"),
      star: pick("--chalk", "#f6f6f6"),
      red: pick("--red", "#cd0000")
    };
  } catch (e) {
    /* keep the defaults */
  }
}

// ---- build buffers ---------------------------------------------------------

// A soft round dot with a feathered edge, pre-rendered once so per-star cost is
// a single drawImage. 1px fillRects vanish at DPR 2 — this does not.
function makeSprite(rgb) {
  const s = 48;
  const c = document.createElement("canvas");
  c.width = s;
  c.height = s;
  const g = c.getContext("2d");
  const rad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  rad.addColorStop(0, "rgba(" + rgb + ",1)");
  rad.addColorStop(0.16, "rgba(" + rgb + ",1)"); // opaque plateau so up-scaling keeps the peak
  rad.addColorStop(0.4, "rgba(" + rgb + ",0.7)");
  rad.addColorStop(0.7, "rgba(" + rgb + ",0.18)");
  rad.addColorStop(1, "rgba(" + rgb + ",0)");
  g.fillStyle = rad;
  g.fillRect(0, 0, s, s);
  return c;
}

function buildSprites() {
  spriteWhite = makeSprite("245,246,248");
  spriteRed = makeSprite("235,60,60");
}

function starCount() {
  const area = W * H;
  return Math.max(120, Math.min(600, Math.round(area / 4500)));
}

function makeStars() {
  const n = starCount();
  stars = new Array(n);
  for (let i = 0; i < n; i++) {
    // skew toward far, faint stars; a minority sit near and bright
    const depth = Math.pow(Math.random(), 1.6); // 0 far .. 1 near
    const bright = Math.random() < 0.15;
    const warm = Math.random() < 0.04;
    stars[i] = {
      x: Math.random() * W,
      y: Math.random() * H,
      z: depth,
      // draw half-size in CSS px (sprite is drawn at 2x this)
      size: bright ? 2.4 + depth * 3.6 : 1.3 + depth * 1.7,
      a: bright ? 0.82 + depth * 0.18 : 0.42 + depth * 0.46,
      tw: Math.random() * Math.PI * 2,
      ts: 0.5 + Math.random() * 1.4,
      bright: bright,
      warm: warm
    };
  }

  // A few prominent white stars planted in the vignette-safe centre band, so
  // the brightest points always peak near white regardless of the RNG.
  const anchors = Math.min(4, stars.length);
  for (let k = 0; k < anchors; k++) {
    const s = stars[k];
    s.x = W * (0.3 + 0.4 * Math.random());
    s.y = H * (0.28 + 0.44 * Math.random());
    s.z = 0.9;
    s.size = 4.2 + Math.random() * 2.2;
    s.a = 1;
    s.bright = true;
    s.warm = false;
  }
}

// A few big, very faint cool-tinted blobs — a whisper of nebula, not a fog.
function buildNebula() {
  nebula = [];
  const tints = [
    "34,44,66", // cool blue
    "26,34,52",
    "44,40,60" // faint violet
  ];
  const count = 3;
  for (let i = 0; i < count; i++) {
    const cx = (0.12 + 0.76 * ((i + 0.35) / count)) * W + (Math.random() - 0.5) * W * 0.2;
    const cy = (0.2 + 0.6 * Math.random()) * H;
    const r = Math.max(W, H) * (0.32 + Math.random() * 0.22);
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    const tint = tints[i % tints.length];
    g.addColorStop(0, "rgba(" + tint + ",0.10)");
    g.addColorStop(0.5, "rgba(" + tint + ",0.045)");
    g.addColorStop(1, "rgba(" + tint + ",0)");
    nebula.push(g);
  }
}

function buildVignette() {
  const cx = W / 2;
  const cy = H / 2;
  const inner = Math.min(W, H) * 0.34;
  const outer = Math.max(W, H) * 0.80;
  const g = ctx.createRadialGradient(cx, cy, inner, cx, cy, outer);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(0.65, "rgba(0,0,0,0.18)");
  g.addColorStop(1, "rgba(0,0,0,0.6)");
  vignette = g;
}

function buildScan() {
  // 3 CSS px period, 1 dark row. Under the DPR transform this is >= 2 device px
  // per line at DPR 2, so the banding actually shows in a screenshot.
  const t = document.createElement("canvas");
  t.width = 1;
  t.height = 3;
  const c = t.getContext("2d");
  c.fillStyle = "rgba(0,0,0,0.42)";
  c.fillRect(0, 0, 1, 1);
  scanPattern = ctx.createPattern(t, "repeat");
}

function buildNoise() {
  noiseTiles = [];
  const size = 200;
  for (let k = 0; k < 2; k++) {
    const t = document.createElement("canvas");
    t.width = size;
    t.height = size;
    const c = t.getContext("2d");
    const img = c.createImageData(size, size);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      d[i] = v;
      d[i + 1] = v;
      d[i + 2] = v;
      d[i + 3] = 24; // faint but perceptible on mid grey
    }
    c.putImageData(img, 0, 0);
    noiseTiles.push(t);
  }
}

// ---- draw ----------------------------------------------------------------

function drawGalaxy(tSec, dt, animate) {
  ctx.globalAlpha = 1;
  ctx.fillStyle = pal.ground;
  ctx.fillRect(0, 0, W, H);

  // a faint cool lift off pure black — gives the scanlines and vignette
  // something to bite on; the vignette pulls the corners back down
  ctx.fillStyle = "rgba(22,26,40,0.6)";
  ctx.fillRect(0, 0, W, H);

  // nebula wash
  for (let i = 0; i < nebula.length; i++) {
    ctx.fillStyle = nebula[i];
    ctx.fillRect(0, 0, W, H);
  }

  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];
    if (animate && dt > 0) {
      s.x += DRIFT_X * s.z * dt;
      s.y += DRIFT_Y * s.z * dt;
      if (s.x < -4) s.x += W + 8;
      else if (s.x > W + 4) s.x -= W + 8;
      if (s.y < -4) s.y += H + 8;
      else if (s.y > H + 4) s.y -= H + 8;
    }

    let alpha = s.a;
    if (animate) alpha *= 0.72 + 0.28 * Math.sin(s.tw + tSec * s.ts);
    if (alpha < 0) alpha = 0;
    else if (alpha > 1) alpha = 1;

    const sprite = s.warm ? spriteRed : spriteWhite;
    const d = s.size * 2;

    if (s.bright) {
      // soft glow halo, then the core
      ctx.globalAlpha = alpha * 0.28;
      const gd = s.size * 5.2;
      ctx.drawImage(sprite, s.x - gd, s.y - gd, gd * 2, gd * 2);
    }
    ctx.globalAlpha = alpha;
    ctx.drawImage(sprite, s.x - d, s.y - d, d * 2, d * 2);

    if (s.bright) {
      // a crisp white centre so the brightest stars actually peak near white,
      // even after the CRT overlay knocks the whole frame down a little
      ctx.globalAlpha = Math.min(1, alpha + 0.15);
      ctx.fillStyle = s.warm ? "rgb(255,150,150)" : "rgb(255,255,255)";
      const cr = Math.max(1.6, s.size * 0.5);
      ctx.beginPath();
      ctx.arc(s.x, s.y, cr, 0, 6.283185);
      ctx.fill();
      // a guaranteed solid pixel block at the very core
      ctx.fillRect(s.x - 1, s.y - 1, 2, 2);
    }
  }
  ctx.globalAlpha = 1;
}

function drawCRT(tSec, animate) {
  // chromatic-aberration fringe — a whisper of red at the left edge, cyan right
  const cw = Math.max(48, W * 0.1);
  ctx.globalCompositeOperation = "screen";
  let lg = ctx.createLinearGradient(0, 0, cw, 0);
  lg.addColorStop(0, "rgba(255,0,64,0.08)");
  lg.addColorStop(1, "rgba(255,0,64,0)");
  ctx.fillStyle = lg;
  ctx.fillRect(0, 0, cw, H);
  let rg = ctx.createLinearGradient(W - cw, 0, W, 0);
  rg.addColorStop(0, "rgba(0,255,255,0)");
  rg.addColorStop(1, "rgba(0,255,255,0.08)");
  ctx.fillStyle = rg;
  ctx.fillRect(W - cw, 0, cw, H);
  ctx.globalCompositeOperation = "source-over";

  // scanlines
  if (scanPattern) {
    ctx.fillStyle = scanPattern;
    ctx.fillRect(0, 0, W, H);
  }

  // vignette
  if (vignette) {
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, W, H);
  }

  // faint noise
  if (noiseTiles.length) {
    const size = noiseTiles[0].width;
    const tile =
      noiseTiles[animate ? Math.floor(tSec * 10) % noiseTiles.length : 0];
    const off = animate ? (tSec * 34) % size : 0;
    ctx.globalAlpha = 0.6;
    for (let y = -size + off; y < H; y += size) {
      for (let x = -size + off; x < W; x += size) {
        ctx.drawImage(tile, x, y);
      }
    }
    ctx.globalAlpha = 1;
  }

  // low-frequency flicker + a slow roll band — animation only
  if (animate) {
    let flick = 0.028 + 0.022 * Math.sin(tSec * 0.7) + 0.014 * Math.sin(tSec * 3.1);
    if (flick < 0) flick = 0;
    ctx.fillStyle = "rgba(0,0,0," + flick.toFixed(3) + ")";
    ctx.fillRect(0, 0, W, H);

    const bandH = Math.max(80, H * 0.22);
    const by = ((tSec * 30) % (H + bandH)) - bandH;
    const bg = ctx.createLinearGradient(0, by, 0, by + bandH);
    bg.addColorStop(0, "rgba(255,255,255,0)");
    bg.addColorStop(0.5, "rgba(255,255,255,0.06)");
    bg.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, by, W, bandH);
  }
}

function render(tSec, dt, animate) {
  if (!ctx) return;
  drawGalaxy(tSec, dt, animate);
  drawCRT(tSec, animate);
}

function renderStatic() {
  render(0, 0, false);
}

// ---- loop --------------------------------------------------------------------

function frame(now) {
  if (!running) return;
  const t = now / 1000;
  let dt = lastT ? t - lastT : 0.016;
  if (dt > 0.1) dt = 0.1; // tab was busy — clamp, do not let the watchdog misfire
  lastT = t;

  render(t, dt, true);

  const ms = dt * 1000;
  if (ms > 24) {
    if (!slowSince) slowSince = now;
    else if (now - slowSince > 1000) {
      sessionDegraded = true;
      stop();
      renderStatic();
      return;
    }
  } else {
    slowSince = 0;
  }

  rafId = requestAnimationFrame(frame);
}

function start() {
  if (running || !ctx) return;
  running = true;
  lastT = 0;
  slowSince = 0;
  rafId = requestAnimationFrame(frame);
}

function stop() {
  running = false;
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
}

// Decide what the backdrop should be doing right now.
function apply() {
  if (!ctx) return;
  if (viewMode() === "light") {
    stop();
    return; // canvas is display:none via CSS
  }
  if (document.hidden) {
    stop();
    return;
  }
  if (motionReduced()) {
    stop();
    renderStatic();
    return;
  }
  start();
}

// ---- sizing --------------------------------------------------------------

function resize() {
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth;
  H = window.innerHeight;

  canvas.width = Math.round(W * DPR);
  canvas.height = Math.round(H * DPR);
  canvas.style.width = W + "px";
  canvas.style.height = H + "px";
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

  readPalette();
  if (!spriteWhite) buildSprites();
  makeStars();
  buildNebula();
  buildVignette();
  buildScan();
  if (!noiseTiles.length) buildNoise();

  apply();
}

function onResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(resize, 150);
}

// ---- init --------------------------------------------------------------------

export function initBackdrop() {
  if (started || typeof document === "undefined") return;
  started = true;

  canvas = document.getElementById("backdrop");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "backdrop";
    canvas.setAttribute("aria-hidden", "true");
    document.body.insertBefore(canvas, document.body.firstChild);
  }

  ctx = canvas.getContext && canvas.getContext("2d");
  if (!ctx) return; // no 2D context: the CSS --void floor stays, nothing else to do

  resize();

  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", apply);

  const mo = new MutationObserver(apply);
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-view", "data-motion"]
  });

  if (reduceMQ.addEventListener) reduceMQ.addEventListener("change", apply);
  else if (reduceMQ.addListener) reduceMQ.addListener(apply);
}
