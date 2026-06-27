# Masterful Machinery Wiki

Documentation for **Masterful Machinery** on Minecraft **1.20.1 Forge**.

The previous public wiki is no longer available, so this repo is a best-effort restoration and expanded replacement. It keeps useful material from the old documentation, removes broken/outdated presentation, and adds details checked against the 1.20.1 source.

## Project links

* Official CurseForge: https://www.curseforge.com/minecraft/mc-mods/masterful-machinery-fork
* Latest third-party release / JAR: https://github.com/FrozenGalaxy/MasterfulMachinery/releases/latest
* Third-party source and build workflow: https://github.com/FrozenGalaxy/MasterfulMachinery
* Original upstream source: https://github.com/BOLTMAGIC/MasterfulMachinery
* Published wiki: https://frozengalaxy.github.io/masterful-machinery-wiki/

## Useful pages

* `index.md` — landing page
* `reference/downloads-and-source.md` — download, source, and project links
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
