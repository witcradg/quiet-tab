const config = window.QUIET_TAB_CONFIG;
let activeEngine = config.defaultEngine;

const engineRow = document.querySelector("#engine-row");
const linkGrid = document.querySelector("#link-grid");
const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");

function encodeQuery(query) {
  return encodeURIComponent(query.trim());
}

function runSearch(query, engineId = activeEngine) {
  const engine = config.engines.find((item) => item.id === engineId);
  if (!engine || !query.trim()) return;

  const target = engine.url.replace("{query}", encodeQuery(query));
  window.location.href = target;
}

function renderEngines() {
  engineRow.innerHTML = "";

  for (const engine of config.engines) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = engine.label;
    button.className = "engine-button";

    if (engine.id === activeEngine) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      activeEngine = engine.id;
      renderEngines();
      input.focus();
    });

    engineRow.appendChild(button);
  }
}

function renderLinks() {
  linkGrid.innerHTML = "";

  for (const link of config.links) {
    const tile = document.createElement("a");
    tile.href = link.url;
    tile.className = "tile";

    // ponytail: slug = all lowercase ascii letters; anything else is emoji/text
    const isSlug = /^[a-z]+$/.test(link.icon || "");
    const iconHtml = isSlug
      ? `<img src="./icons/${link.icon}.svg" class="tile-icon" alt="">`
      : `<div class="tile-icon">${link.icon || "🔗"}</div>`;
    tile.innerHTML = `<div>${iconHtml}<div class="tile-label">${link.label}</div></div>`;

    linkGrid.appendChild(tile);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const raw = input.value;

  // ponytail: sort by prefix length desc so "cl" beats "c"
  const sorted = [...config.engines].sort((a, b) => (b.prefix || "").length - (a.prefix || "").length);
  for (const engine of sorted) {
    const p = engine.prefix;
    if (p && raw.startsWith(p + " ")) {
      runSearch(raw.slice(p.length + 1), engine.id);
      return;
    }
  }

  runSearch(raw);
});

document.addEventListener("keydown", (event) => {
  const tag = document.activeElement?.tagName;
  const inInput = tag === "INPUT" || tag === "TEXTAREA" || document.activeElement?.isContentEditable;

  if (event.key === "/" && !inInput && !event.altKey && !event.ctrlKey && !event.metaKey) {
    event.preventDefault();
    input.focus();
    return;
  }

  if (!event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  const idx = parseInt(event.key, 10);
  if (idx >= 1 && idx <= 9 && config.links[idx - 1]) {
    event.preventDefault();
    window.location.href = config.links[idx - 1].url;
  }
});

renderEngines();
renderLinks();
