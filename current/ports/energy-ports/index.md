---
layout: default
title: "Energy Ports"
---

# Energy Ports

Energy ports store Forge Energy (`FE`) for recipes. Input energy ports consume FE; output energy ports receive FE.

## Config example

```json
{
  "id": "my_energy_port",
  "controllerIds": "mm:controller_a",
  "name": "My Energy Port",
  "type": "mm:energy",
  "config": {
    "capacity": 100000,
    "maxReceive": 1000,
    "maxExtract": 1000,
    "tierRank": 1
  }
}
```

| Config field | Meaning |
|---|---|
| `capacity` | Stored FE capacity. |
| `maxReceive` | Maximum FE received per transfer. |
| `maxExtract` | Maximum FE extracted per transfer. |
| `tierRank` | Optional. Used by structure `portType` matching with `minTier`/`maxTier`. |

## Ingredient example

```json
{
  "type": "mm:energy",
  "amount": 1000
}
```
