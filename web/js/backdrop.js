// Soulstice — fixed galaxy + CRT/VHS backdrop.
//
// One <canvas id="backdrop">, position:fixed, below all content, inserted once
// from app.js boot. A drifting parallax starfield (spirit of sinaida.eu) with a
// subtle CRT/VHS overlay on top (scanlines, vignette, chromatic fringe,
// low-frequency flicker/roll, faint noise).
//
// State comes only from data-view / data-motion on <html> (set by chrome.js)
// and from prefers-reduced-motion — attributes and .matches, never text, so
// Google Translate can never break it.
//
//   data-view="light"    -> canvas hidden by CSS, rAF stopped
//   data-motion="reduced"
//   or prefers-reduced-motion, or the perf watchdog latching
//                        -> one static painted frame, no animation
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
let pal = { ground: "#050505", star: "#f6f6f6", red: "#cd0000" };
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

function starCount() {
  const area = W * H;
  return Math.max(60, Math.min(260, Math.round(area / 9000)));
}

function makeStars() {
  const n = starCount();
  stars = new Array(n);
  for (let i = 0; i < n; i++) {
    const depth = Math.random(); // 0 far .. 1 near
    stars[i] = {
      x: Math.random() * W,
      y: Math.random() * H,
      z: depth,
      r: 0.5 + depth * 1.1,
      a: 0.22 + depth * 0.5,
      tw: Math.random() * Math.PI * 2,
      ts: 0.5 + Math.random() * 1.4,
      bright: Math.random() < 0.08,
      warm: Math.random() < 0.05
    };
  }
}

function buildVignette() {
  const cx = W / 2;
  const cy = H / 2;
  const inner = Math.min(W, H) * 0.34;
  const outer = Math.max(W, H) * 0.78;
  const g = ctx.createRadialGradient(cx, cy, inner, cx, cy, outer);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, "rgba(0,0,0,0.55)");
  vignette = g;
}

function buildScan() {
  const t = document.createElement("canvas");
  t.width = 1;
  t.height = 3;
  const c = t.getContext("2d");
  c.fillStyle = "rgba(0,0,0,0.16)";
  c.fillRect(0, 0, 1, 1); // one dark row in every three
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
      d[i + 3] = 16; // faint
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

  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];
    if (animate && dt > 0) {
      s.x += DRIFT_X * s.z * dt;
      s.y += DRIFT_Y * s.z * dt;
      if (s.x < -2) s.x += W + 4;
      else if (s.x > W + 2) s.x -= W + 4;
      if (s.y < -2) s.y += H + 4;
      else if (s.y > H + 2) s.y -= H + 4;
    }

    let alpha = s.a;
    if (animate) alpha *= 0.7 + 0.3 * Math.sin(s.tw + tSec * s.ts);
    if (alpha < 0) alpha = 0;
    else if (alpha > 1) alpha = 1;

    ctx.globalAlpha = alpha;
    ctx.fillStyle = s.warm ? pal.red : pal.star;

    if (s.bright) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r + 1.0, 0, 6.283185);
      ctx.fill();
      ctx.globalAlpha = alpha * 0.16;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r + 4.5, 0, 6.283185);
      ctx.fill();
    } else {
      ctx.fillRect(s.x, s.y, s.r, s.r);
    }
  }
  ctx.globalAlpha = 1;
}

function drawCRT(tSec, animate) {
  // chromatic-aberration fringe — a whisper of red at the left edge, cyan right
  const cw = Math.max(40, W * 0.08);
  ctx.globalCompositeOperation = "screen";
  let lg = ctx.createLinearGradient(0, 0, cw, 0);
  lg.addColorStop(0, "rgba(255,0,64,0.06)");
  lg.addColorStop(1, "rgba(255,0,64,0)");
  ctx.fillStyle = lg;
  ctx.fillRect(0, 0, cw, H);
  let rg = ctx.createLinearGradient(W - cw, 0, W, 0);
  rg.addColorStop(0, "rgba(0,255,255,0)");
  rg.addColorStop(1, "rgba(0,255,255,0.06)");
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
    for (let y = -size + off; y < H; y += size) {
      for (let x = -size + off; x < W; x += size) {
        ctx.drawImage(tile, x, y);
      }
    }
  }

  // low-frequency flicker + a slow roll band — animation only
  if (animate) {
    let flick = 0.03 + 0.02 * Math.sin(tSec * 0.7) + 0.012 * Math.sin(tSec * 3.1);
    if (flick < 0) flick = 0;
    ctx.fillStyle = "rgba(0,0,0," + flick.toFixed(3) + ")";
    ctx.fillRect(0, 0, W, H);

    const bandH = Math.max(60, H * 0.18);
    const by = ((tSec * 24) % (H + bandH)) - bandH;
    const bg = ctx.createLinearGradient(0, by, 0, by + bandH);
    bg.addColorStop(0, "rgba(255,255,255,0)");
    bg.addColorStop(0.5, "rgba(255,255,255,0.035)");
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
  makeStars();
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
