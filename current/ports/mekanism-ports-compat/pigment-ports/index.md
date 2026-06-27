---
layout: default
title: "Pigment Ports"
---

# Pigment Ports

Mekanism pigment ports store and transfer Mekanism chemical ingredients for Masterful Machinery recipes.

Requires Mekanism.

## Config example

```json
{
  "id": "my_pigment_port",
  "controllerIds": "mm:controller_a",
  "name": "My Pigment Port Port",
  "type": "mm:mekanism/pigment",
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
  "type": "mm:mekanism/pigment",
  "pigment": "mekanism:blue",
  "amount": 10
}
```
