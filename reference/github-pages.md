---
layout: default
title: "Hosting on GitHub Pages"
---

# Hosting on GitHub Pages

This repo is ready to upload to GitHub and publish with GitHub Pages.

## Fast setup

1. Create a GitHub repository, for example `masterful-machinery-wiki`.
2. Put the contents of this ZIP in the repository root.
3. Commit and push.
4. In GitHub, open **Settings → Pages**.
5. Set source to **Deploy from a branch**.
6. Select the default branch and root folder.
7. Wait for the Pages build to finish.

## Local preview

You can preview the pages directly in GitHub, or run a local Pages-style preview if you want to check the full site locally:

```bash
bundle install
bundle exec jekyll serve
```

A minimal `_config.yml` is included. The site intentionally avoids non-default plugins so it remains easy to host.

## Editing rules

* Keep pages as Markdown.
* Prefer relative links.
* Put new examples under `examples/`.
* Put schema/reference details under `reference/`.
* Keep the site simple: Markdown pages, relative links, and minimal theme/layout changes.
