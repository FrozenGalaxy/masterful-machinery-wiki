---
layout: default
title: "Fluid Ports"
---

# Fluid Ports

Fluid ports store Forge fluids for recipes. Input fluid ports provide fluid ingredients; output fluid ports receive produced fluids.

## Config example

```json
{
  "id": "my_fluid_port",
  "controllerIds": "mm:controller_a",
  "name": "My Fluid Port",
  "type": "mm:fluid",
  "config": {
    "rows": 3,
    "columns": 3,
    "slotCapacity": 1000,
    "autoPush": true,
    "tierRank": 1
  }
}
```

| Config field | Meaning |
|---|---|
| `rows` | Number of fluid tank rows. |
| `columns` | Number of fluid tank columns. |
| `slotCapacity` | Capacity per tank, in mB. |
| `autoPush` | Optional. Output ports try to push fluids into nearby handlers. |
| `tierRank` | Optional. Used by structure `portType` matching with `minTier`/`maxTier`. |

Total tank count is `rows * columns`.

## Ingredient example

```json
{
  "type": "mm:fluid",
  "fluid": "minecraft:water",
  "amount": 1000
}
```

`amount` is measured in mB; `1000` mB is one bucket.
