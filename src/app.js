const config = window.QUIET_TAB_CONFIG;
let activeEngine = config.defaultEngine;

// ponytail: once the user adds or reorders a tile, localStorage owns the list.
// Reset with: localStorage.removeItem("links")
let links = JSON.parse(localStorage.getItem("links") || "null") || config.links;
const saveLinks = () => localStorage.setItem("links", JSON.stringify(links));

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

function iconHtml(icon) {
  // ponytail: slug = lowercase letters, optional ".ext" (default .svg); http = remote; anything else is emoji/text
  if (/^https?:/.test(icon || "")) return `<img src="${icon}" class="tile-icon" alt="">`;
  if (/^[a-z]+(\.[a-z]+)?$/.test(icon || "")) {
    const file = icon.includes(".") ? icon : `${icon}.svg`;
    return `<img src="./icons/${file}" class="tile-icon" alt="">`;
  }
  return `<div class="tile-icon">${icon || "🔗"}</div>`;
}

function renderLinks() {
  linkGrid.innerHTML = "";

  links.forEach((link, i) => {
    const tile = document.createElement("a");
    tile.href = link.url;
    tile.className = "tile";
    tile.draggable = true;
    tile.dataset.index = i;
    tile.innerHTML = `<div>${iconHtml(link.icon)}<div class="tile-label"></div></div>`;
    tile.querySelector(".tile-label").textContent = link.label;
    tile.title = "Right-click to edit or delete";
    // ponytail: right-click = edit; no hover buttons, no long-press
    tile.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      openDialog(i);
    });
    linkGrid.appendChild(tile);
  });

  const add = document.createElement("button");
  add.type = "button";
  add.className = "tile tile-add";
  add.title = "Add shortcut";
  add.textContent = "+";
  add.addEventListener("click", () => openDialog(null));
  linkGrid.appendChild(add);
}

// --- add / edit / delete tile (one dialog; editing = index or null for add) ---
const addDialog = document.querySelector("#add-dialog");
const addForm = document.querySelector("#add-form");
const deleteButton = document.querySelector("#add-delete");
let editing = null;

function openDialog(index) {
  editing = index;
  const link = index === null ? {} : links[index];
  addForm.label.value = link.label || "";
  addForm.url.value = link.url || "";
  addForm.icon.value = link.icon || "";
  deleteButton.hidden = index === null;
  document.querySelector("#add-submit").textContent = index === null ? "Add" : "Save";
  addDialog.showModal();
}

document.querySelector("#add-cancel").addEventListener("click", () => addDialog.close());

deleteButton.addEventListener("click", () => {
  links.splice(editing, 1);
  saveLinks();
  addDialog.close();
  renderLinks();
});

addForm.addEventListener("submit", () => {
  const data = new FormData(addForm);
  const url = data.get("url").trim();
  // ponytail: no icon given → DuckDuckGo favicon service (bigger icons than Google's); needs network
  const icon = data.get("icon").trim()
    || `https://icons.duckduckgo.com/ip3/${new URL(url).hostname}.ico`;
  const link = { label: data.get("label").trim(), url, icon };
  if (editing === null) links.push(link);
  else links[editing] = link;
  saveLinks();
  renderLinks();
});

// --- drag to reorder (native HTML5 DnD; tiles move live, order saved on drop) ---
let dragged = null;

linkGrid.addEventListener("dragstart", (event) => {
  dragged = event.target.closest("a.tile");
  if (!dragged) return;
  event.dataTransfer.effectAllowed = "move";
  dragged.classList.add("dragging");
});

linkGrid.addEventListener("dragover", (event) => {
  const over = event.target.closest("a.tile");
  if (!dragged || !over || over === dragged) return;
  event.preventDefault();
  const r = over.getBoundingClientRect();
  const before = event.clientX < r.left + r.width / 2;
  over.parentNode.insertBefore(dragged, before ? over : over.nextSibling);
});

linkGrid.addEventListener("drop", (event) => event.preventDefault());

linkGrid.addEventListener("dragend", () => {
  if (!dragged) return;
  dragged.classList.remove("dragging");
  const order = [...linkGrid.querySelectorAll("a.tile")].map((t) => links[t.dataset.index]);
  dragged = null;
  if (order.some((l, i) => l !== links[i])) {
    links = order;
    saveLinks();
  }
  renderLinks();
});

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
  if (idx >= 1 && idx <= 9 && links[idx - 1]) {
    event.preventDefault();
    window.location.href = links[idx - 1].url;
  }
});

renderEngines();
renderLinks();
