---
layout: default
title: "Input Entries"
---

# Input Entries

Input entries define what a recipe checks for and consumes.

## Consume input

```json
{
  "type": "mm:input/consume",
  "per_tick": true,
  "chance": 0.5,
  "ingredient": {
    "type": "mm:item",
    "item": "minecraft:iron_ingot",
    "count": 1
  }
}
```

| Field | Meaning |
|---|---|
| `type` | Use `mm:input/consume` for normal consumed inputs. |
| `per_tick` | Optional. When true, consumes the ingredient every recipe tick instead of at completion. |
| `chance` | Optional. Random chance from `0.0` to `1.0`; default is `1.0`. |
| `ingredient` | Ingredient config object. See [Ingredient Configs](../ingredient-configs/). |

If `chance` is `0`, the input is never consumed. If `chance` is `1`, it is always consumed.
