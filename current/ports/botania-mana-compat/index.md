---
layout: default
title: "Botania Mana Ports"
---

# Botania Mana Ports

Botania mana ports store mana for recipes. Input ports consume mana; output ports receive mana.

Requires Botania.

## Config example

```json
{
  "id": "my_mana_port",
  "controllerIds": "mm:controller_a",
  "name": "My Mana Port",
  "type": "mm:botania/mana",
  "config": {
    "capacity": 1000
  }
}
```

| Config field | Meaning |
|---|---|
| `capacity` | Maximum stored mana. |

## Ingredient example

```json
{
  "type": "mm:botania/mana",
  "amount": 1000
}
```
