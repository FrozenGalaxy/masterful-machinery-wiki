---
layout: default
title: "PneumaticCraft Air Ports"
---

# PneumaticCraft Air Ports

PneumaticCraft air ports store and interact with air pressure for recipes.

Requires PneumaticCraft.

## Config example

```json
{
  "id": "my_air_port",
  "controllerIds": "mm:controller_a",
  "name": "My Air Port",
  "type": "mm:pneumaticcraft/air",
  "config": {
    "danger": 11.0,
    "critical": 12.0,
    "volume": 20000
  }
}
```

| Config field | Meaning |
|---|---|
| `volume` | Air volume capacity. |
| `danger` | Pressure threshold for the danger/red zone. |
| `critical` | Pressure threshold where the port can become explosive. |

## Ingredient example

```json
{
  "type": "mm:pneumaticcraft/air",
  "pressure": 0.7,
  "air": 100
}
```
