---
layout: default
title: "Infusion Ports"
---

# Infusion Ports

Mekanism infusion ports store and transfer Mekanism chemical ingredients for Masterful Machinery recipes.

Requires Mekanism.

## Config example

```json
{
  "id": "my_infuse_port",
  "controllerIds": "mm:controller_a",
  "name": "My Infusion Port Port",
  "type": "mm:mekanism/infuse",
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
  "type": "mm:mekanism/infuse",
  "infuse": "mekanism:bio",
  "amount": 10
}
```
