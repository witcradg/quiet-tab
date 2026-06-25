# Decisions

Short records of non-obvious choices.

---

**Config in files, not `localStorage`**
User-edited JS files are auditable, version-controlled, and portable across
machines. `localStorage` is per-origin and invisible. Decided to keep config
file-only until there's a concrete reason to change.

---

**Three config files instead of one**
`settings.js`, `engines.js`, and `links.js` let a user edit only the part
they care about without scrolling past unrelated config. Load order is fixed
by `index.html` script tags; no bundler needed.

---

**Longest-prefix match for engine routing**
`cl` (Claude) and `c` (ChatGPT) share a prefix. Sorting engines by prefix
length descending before matching means `cl query` correctly routes to Claude
instead of ChatGPT. A prefix map or trie would also work but adds code for
no real gain at this scale.

---

**`/` focuses search, not a slash-command palette**
`/` is the single most common "I want to search now" keystroke. Routing it
to a command palette would add complexity without benefit — there's nothing
to command. Plain focus is the right default.

---

**Alt+1–9 over Ctrl+1–9**
Browsers consume `Ctrl+1`–`Ctrl+8` for tab switching. `Alt+digit` is free
in all major browsers on Linux and Windows. On macOS `Alt+digit` may produce
a special character in some apps, but this page intercepts `keydown` before
any character is inserted so the behavior is correct regardless.

---

**No framework yet**
The page is ~100 lines of JS and one config. A framework would cost more in
build tooling, mental overhead, and dependency surface than it saves. Revisit
when component reuse or state management becomes genuinely painful.
