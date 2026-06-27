# Masterful Machinery Wiki

Documentation for **Masterful Machinery** on Minecraft **1.20.1 Forge**.

The previous public wiki is no longer available, so this repo is a best-effort restoration and expanded replacement. It keeps useful material from the old documentation, removes broken/outdated presentation, and adds details checked against the 1.20.1 source.

## Useful pages

* `index.md` — landing page
* `reference/compact-reference.md` — dense one-page technical reference
* `reference/json-field-reference.md` — complete field/schema reference
* `reference/troubleshooting.md` — practical debugging checklist
* `examples/compact-machine.md` — minimal complete machine example
* `reference/github-pages.md` — hosting notes

## Local preview

For quick reading, open the folder in VS Code and preview `index.md` with `Ctrl+Shift+V`.

For a GitHub Pages-style preview, install Ruby+DevKit, then run:

```bash
bundle install
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

Then open <http://127.0.0.1:4000/>.
