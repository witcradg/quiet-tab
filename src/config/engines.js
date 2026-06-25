window.QUIET_TAB_CONFIG = window.QUIET_TAB_CONFIG || {};

window.QUIET_TAB_CONFIG.engines = [
  { id: "google",     label: "Google",     prefix: "g",  url: "https://www.google.com/search?q={query}" },
  { id: "chatgpt",    label: "ChatGPT",    prefix: "c",  url: "https://chatgpt.com/?q={query}" },
  { id: "claude",     label: "Claude",     prefix: "cl", url: "https://claude.ai/new?q={query}" },
  { id: "perplexity", label: "Perplexity", prefix: "p",  url: "https://www.perplexity.ai/search?q={query}" },
  { id: "gemini",     label: "Gemini",     prefix: "ge", url: "https://gemini.google.com/app?q={query}" },
  { id: "ddg",        label: "DuckDuckGo", prefix: "d",  url: "https://duckduckgo.com/?q={query}" }
];
