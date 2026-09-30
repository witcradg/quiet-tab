# quiet-tab

A fast, quiet, customizable browser start page for people who just want to get to work.

No ads. No telemetry. No feeds. No animated backgrounds. No framework. Works offline.

## Usage

### Set as your new tab page

Install a redirect extension — e.g. **New Tab Redirect** (Chrome/Firefox) — and point it to the absolute path of `src/index.html`:

```
file:///home/you/quiet-tab/src/index.html
```

No server needed. Everything runs from local files.

### Or serve it on localhost (how Dean's machine runs it)

The new tab page on Dean's machine is `http://localhost:5173/`, served by a systemd
user service that starts at login and restarts itself:

```ini
# ~/.config/systemd/user/quiet-tab.service  (not in this repo)
[Unit]
Description=quiet-tab start page

[Service]
ExecStart=/usr/bin/python3 -m http.server 5173 -d src --bind 127.0.0.1
WorkingDirectory=/home/dean/projects/personal/quiet-tab
Restart=always

[Install]
WantedBy=default.target
```

```bash
systemctl --user start quiet-tab.service    # stop / restart / status work the same way
```

If the service is stopped, the new tab page does not load — and a tab left open shows
old tiles with broken icons for anything added since, because the icons cannot be fetched.

⚠️ Tiles saved in the page (below) are stored per address: the list saved at
`localhost:5173` is not the one saved at `file://`, so switching between the two shows
different tiles.

### Search prefixes

Type a prefix before your query to override the active engine:

| Prefix | Engine |
|--------|--------|
| `g ` | Google |
| `c ` | ChatGPT |
| `cl ` | Claude |
| `p ` | Perplexity |
| `ge ` | Gemini |
| `f ` | Feed |

Example: `cl what is a transformer model` opens Claude with that query.

### Keyboard shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus the search input |
| `Alt+1` – `Alt+9` | Open the first nine shortcut tiles |

### Configuration

Edit the files in `src/config/` — no build step required:

| File | Controls |
|------|----------|
| `src/config/settings.js` | Default engine |
| `src/config/engines.js` | Search engines and prefix mappings |
| `src/config/links.js` | Shortcut tiles |

Configuration lives in plain JS files so it is auditable, version-controllable,
and portable across machines.

⚠️ **`links.js` is ignored once you have added or dragged a tile in the page** — see the
next section. On Dean's machine that has happened, so a tile added only to `links.js`
does not appear. Add it with the `+` tile instead, or add it to the saved list too.

### Adding and reordering tiles in the page

Click the `+` tile to add a shortcut (label, URL, optional emoji icon — leave the
icon blank to use the site's favicon). Drag tiles to reorder them. Right-click a
tile to edit or delete it.

Once you add or drag, the tile list is saved in the browser's `localStorage`
and `src/config/links.js` is no longer read. To go back to the config file,
run this in the browser console:

```js
localStorage.removeItem("links")
```

## Philosophy

quiet-tab is intentionally not a dashboard. A new tab is a moment of intent.
The page should get out of the way as fast as possible.

See [`docs/philosophy.md`](docs/philosophy.md) for the full rationale,
[`docs/roadmap.md`](docs/roadmap.md) for planned work,
and [`docs/decisions.md`](docs/decisions.md) for non-obvious design choices.

## Goals

- No ads
- No telemetry
- No feeds
- No news/weather widgets
- No animated backgrounds
- Works offline from local files
- Large user-controlled shortcut tiles
- Search / AI routing with prefix shortcuts
- Simple file-based configuration
