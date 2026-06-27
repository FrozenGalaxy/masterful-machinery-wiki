---
layout: default
title: "Slurry Ports"
---

# Slurry Ports

Mekanism slurry ports store and transfer Mekanism chemical ingredients for Masterful Machinery recipes.

Requires Mekanism.

## Config example

```json
{
  "id": "my_slurry_port",
  "controllerIds": "mm:controller_a",
  "name": "My Slurry Port Port",
  "type": "mm:mekanism/slurry",
  "config": {
    "capacity": 1000
  }
}
```

| Config field | Meaning |
|---|---|
| `capacity` | Stored chemical capacity. |

## Ingredient example

```json
{
  "type": "mm:mekanism/slurry",
  "slurry": "mekanism:clean_tin",
  "amount": 10
}
```
