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

    tile.innerHTML = `
      <div>
        <div class="tile-icon">${link.icon || "🔗"}</div>
        <div class="tile-label">${link.label}</div>
      </div>
    `;

    linkGrid.appendChild(tile);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  runSearch(input.value);
});

renderEngines();
renderLinks();
