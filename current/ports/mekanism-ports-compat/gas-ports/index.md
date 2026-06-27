---
layout: default
title: "Gas Ports"
---

# Gas Ports

Mekanism gas ports store and transfer Mekanism chemical ingredients for Masterful Machinery recipes.

Requires Mekanism.

## Config example

```json
{
  "id": "my_gas_port",
  "controllerIds": "mm:controller_a",
  "name": "My Gas Port Port",
  "type": "mm:mekanism/gas",
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
  "type": "mm:mekanism/gas",
  "gas": "mekanism:hydrogen",
  "amount": 10
}
```
