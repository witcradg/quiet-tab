# Philosophy

quiet-tab exists because every other new tab page eventually becomes a dashboard.
Dashboards are the wrong abstraction for a browser start page.

A new tab is a moment of intent: the user is about to do something.
The page should get out of the way as fast as possible.

## What quiet-tab is

- A focused search and routing surface.
- A keyboard-navigable list of frequent destinations.
- A static local file — no server, no build step, no network required to open.

## What quiet-tab is not

- A dashboard.
- A news reader.
- A weather widget.
- A habit tracker.
- A productivity system.
- A browser extension that phones home.

## Constraints we hold deliberately

**No remote assets.** Fonts, icons, and scripts must load from local files or
be inlined. A new tab should open instantly even when offline.

**No telemetry.** The page collects nothing, sends nothing, and stores nothing
outside the browser tab itself.

**No framework yet.** Vanilla HTML, CSS, and JavaScript are sufficient for this
scope. Adding a framework adds a build step, a dependency tree, and a learning
curve — none of which pay off for a page this simple.

**Configuration lives in files, not in the browser.** `localStorage` and
`IndexedDB` are scattered per-origin, hard to audit, and invisible to version
control. A file you can read is a file you can trust.

**Fewest files possible.** Every file is a surface to maintain.
