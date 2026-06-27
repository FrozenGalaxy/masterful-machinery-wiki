---
layout: default
title: "Output Entries"
---

# Output Entries

Output entries define what a recipe produces.

## Simple output

```json
{
  "type": "mm:output/simple",
  "per_tick": false,
  "chance": 1.0,
  "ingredient": {
    "type": "mm:item",
    "item": "minecraft:iron_ingot",
    "count": 1
  }
}
```

| Field | Meaning |
|---|---|
| `type` | Use `mm:output/simple` for normal outputs. |
| `per_tick` | Optional. When true, produces the ingredient every recipe tick instead of at completion. |
| `chance` | Optional. Random chance from `0.0` to `1.0`; default is `1.0`. |
| `ingredient` | Ingredient config object. See [Ingredient Configs](../ingredient-configs/). |

If `chance` is `0`, the output is never produced. If `chance` is `1`, it is always produced.
