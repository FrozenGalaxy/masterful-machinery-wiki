---
layout: default
title: "Custom Textures"
---

# Custom Textures

Masterful Machinery generates blocks from JSON IDs. You can replace their textures with a resource pack in the same way you would replace any other block texture.

## Basic workflow

1. Find the generated block ID, for example `mm:my_controller`.
2. Create a resource pack.
3. Add blockstate/model/texture files for that block ID.
4. Load the resource pack above the modpack's default resources.

## Translation keys

Generated blocks use translation keys like:

```text
block.mm.<id>
```

For example, `mm:my_controller` uses:

```text
block.mm.my_controller
```

Use normal resource pack language files to override display names.
