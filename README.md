# Soulstice — web

A static, self-guided build of the Soulstice self-inquiry instrument for artists.
Runs entirely in the browser: no build step, no framework, no bundler, no external
requests. English only, and it works through Google Translate.

**Live:** <https://sinaida-space.github.io/soulstice/>

All six modes are here — Passage (the full inquiry, ending in a written Compass),
Journal, Lens, Ground, Statement, Return. Every answer stays in `localStorage` on the
one device; nothing is ever sent anywhere.

The app lives in [`web/`](web/); the root `index.html` redirects there. See
[`web/README.md`](web/README.md) for how to run it locally and the data contract.

## The skill

Soulstice began as a Claude Code skill. That part now lives in its own repository:
[`sinaida-space/soulstice-skill`](https://github.com/sinaida-space/soulstice-skill).
