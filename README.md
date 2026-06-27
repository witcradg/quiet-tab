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
