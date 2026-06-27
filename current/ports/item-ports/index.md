---
layout: default
title: "Item Ports"
---

# Item Ports

Item ports store item stacks for recipes. Input item ports are checked for required ingredients; output item ports receive recipe results.

## Config example

```json
{
  "id": "my_item_port",
  "controllerIds": "mm:controller_a",
  "name": "My Item Port",
  "type": "mm:item",
  "config": {
    "rows": 3,
    "columns": 3,
    "autoPush": true,
    "slotCapacity": 64,
    "tierRank": 1
  }
}
```

| Config field | Meaning |
|---|---|
| `rows` | Number of inventory rows. |
| `columns` | Number of inventory columns. |
| `autoPush` | Optional. Output ports try to push items into nearby inventories. |
| `slotCapacity` | Optional. `0` uses normal item stack size behaviour; very high values are capped internally. |
| `tierRank` | Optional. Used by structure `portType` matching with `minTier`/`maxTier`. |

Total slots are `rows * columns`.

## Ingredient example

```json
{
  "type": "mm:item",
  "tag": "forge:ingots/iron",
  "count": 2,
  "nbt": { "CustomModelData": 1 },
  "nbt_match": "weak"
}
```

Use either `item` for a specific item or `tag` for an item tag. `count` is the required stack count.
