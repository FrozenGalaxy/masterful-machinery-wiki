(() => {
  const params = new URLSearchParams(window.location.search);
  const query = (params.get("q") || "").trim();
  const status = document.getElementById("search-status");
  const results = document.getElementById("search-results");
  const input = document.getElementById("wiki-search");
  if (input) input.value = query;

  const terms = query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) {
    status.textContent = "Enter a word or phrase to search the wiki.";
    return;
  }

  fetch(window.wikiSearchIndex)
    .then(response => {
      if (!response.ok) throw new Error("Search index could not be loaded");
      return response.json();
    })
    .then(pages => {
      const normalizedQuery = query.toLocaleLowerCase();
      const matches = pages.map(page => {
        const title = page.title.toLocaleLowerCase();
        const content = page.content.toLocaleLowerCase();
        if (!terms.every(term => title.includes(term) || content.includes(term))) return null;

        const score = terms.reduce((total, term) => total + (title.includes(term) ? 5 : 0) + (content.includes(term) ? 1 : 0), 0)
          + (title.includes(normalizedQuery) ? 8 : 0);
        return { ...page, score };
      }).filter(Boolean).sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

      status.textContent = `${matches.length} ${matches.length === 1 ? "page" : "pages"} found for “${query}”.`;
      for (const page of matches) {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = page.url;
        link.textContent = page.title;
        item.append(link);

        const lowerContent = page.content.toLocaleLowerCase();
        const firstTermAt = Math.min(...terms.map(term => {
          const at = lowerContent.indexOf(term);
          return at < 0 ? lowerContent.length : at;
        }));
        const start = Math.max(0, firstTermAt - 90);
        const end = Math.min(page.content.length, firstTermAt + 180);
        const excerpt = document.createElement("p");
        excerpt.textContent = `${start > 0 ? "…" : ""}${page.content.slice(start, end)}${end < page.content.length ? "…" : ""}`;
        item.append(excerpt);
        results.append(item);
      }
    })
    .catch(() => {
      status.textContent = "Search is unavailable right now. Please try again later.";
    });
})();
