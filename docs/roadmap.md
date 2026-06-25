# Roadmap

Items are loose priorities, not commitments. The goal is to stay minimal.

## Done

- Search input with autofocus
- Engine switching (Google, ChatGPT, Claude, Perplexity, Gemini, DuckDuckGo)
- Prefix routing (`g`, `c`, `cl`, `p`, `ge`, `d`) with longest-match
- Configurable shortcut tiles
- Alt+1–9 to open first nine tiles
- `/` to focus search
- Config split into `settings.js`, `engines.js`, `links.js`
- README setup and usage docs

## Likely next

- Keyboard number hints on tiles (show `1`–`9` badge on the first nine)
- Dark/light mode toggle (CSS-only, respects `prefers-color-scheme` already)
- Favicon fetching for tile icons (Google's favicon service or a local fallback)

## Maybe later

- `localStorage` engine persistence (only if re-selecting each open is annoying enough to warrant it)
- Command palette (`?` or `Ctrl+K`) for less-used destinations
- Per-engine keyboard shortcut to switch engine mid-search (e.g. `Tab` cycles)
- Optional clock — if it can be one line of CSS

## Probably never

- News / feeds
- Weather
- Quotes / affirmations
- Animated backgrounds
- Remote config / sync
- Account system
