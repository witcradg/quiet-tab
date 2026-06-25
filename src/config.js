window.QUIET_TAB_CONFIG = {
  defaultEngine: "google",
  engines: [
    {
      id: "google",
      label: "Google",
      url: "https://www.google.com/search?q={query}"
    },
    {
      id: "chatgpt",
      label: "ChatGPT",
      url: "https://chatgpt.com/?q={query}"
    },
    {
      id: "perplexity",
      label: "Perplexity",
      url: "https://www.perplexity.ai/search?q={query}"
    },
    {
      id: "claude",
      label: "Claude",
      url: "https://claude.ai/new?q={query}"
    }
  ],
  links: [
    {
      label: "Gmail",
      url: "https://mail.google.com",
      icon: "✉️"
    },
    {
      label: "Calendar",
      url: "https://calendar.google.com",
      icon: "📅"
    },
    {
      label: "GitHub",
      url: "https://github.com",
      icon: "🐙"
    },
    {
      label: "Vercel",
      url: "https://vercel.com",
      icon: "▲"
    },
    {
      label: "Notion",
      url: "https://notion.so",
      icon: "📝"
    }
  ]
};
