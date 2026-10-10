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

## Weighted choice output

Use `mm:output/weighted` when a recipe should produce one result from a weighted list, such as a loot-table roll:

```json
{
  "type": "mm:output/weighted",
  "options": [
    {
      "weight": 3,
      "ingredient": { "type": "mm:item", "item": "minecraft:iron_nugget", "count": 4 }
    },
    {
      "weight": 1,
      "ingredient": { "type": "mm:item", "item": "minecraft:gold_nugget", "count": 1 }
    },
    { "weight": 1, "nothing": true }
  ]
}
```

Exactly one option is selected when the recipe finishes. The relative chance is each option's positive integer `weight` divided by the sum of all weights. An option can use `nothing: true` to represent no output. The entry-level `chance` can also be used to make the entire weighted roll optional.

The controller checks output capacity before it starts consuming a recipe. If outputs become blocked while a recipe is finishing, the completed recipe remains pending until space is available; it does not consume inputs again or discard the result.
