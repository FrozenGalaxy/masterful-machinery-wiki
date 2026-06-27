---
layout: default
title: "Extra Blocks"
---

# Extra Blocks

Extra blocks are simple generated helper/decorative blocks. They are useful for machine casings, internals, and visual detail without needing a separate block-adding mod.

Supported extra block types:

| Type | Purpose |
|---|---|
| `mm:circuit` | Circuit-style decorative block. |
| `mm:gearbox` | Gearbox-style decorative block. |
| `mm:vent` | Vent-style decorative block. |

Create JSON files in:

```text
config/mm/extras/
```

## Examples

Circuit:

```json
{
  "id": "my_circuit",
  "name": "My Circuit",
  "type": "mm:circuit"
}
```

Gearbox:

```json
{
  "id": "my_gears",
  "name": "My Gears",
  "type": "mm:gearbox"
}
```

Vent:

```json
{
  "id": "my_vent",
  "name": "My Vent",
  "type": "mm:vent"
}
```

`id` is the generated block path and is prefixed with `mm:` in game. For example, `my_vent` becomes `mm:my_vent`. `name` is the default English display name.
