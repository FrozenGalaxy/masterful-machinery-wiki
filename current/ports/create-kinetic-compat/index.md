---
layout: default
title: "Create Kinetic Ports"
---

# Create Kinetic Ports

Create kinetic ports interact with Create rotational networks. Input ports read speed and apply stress impact; output ports provide rotational speed and stress capacity.

Requires the Create mod.

## Config example

```json
{
  "id": "my_kinetic_port",
  "controllerIds": "mm:controller_a",
  "name": "My Create Kinetic Port",
  "type": "mm:create/kinetic",
  "config": {
    "stress": 4
  }
}
```

| Config field | Meaning |
|---|---|
| `stress` | Stress impact for input mode, or stress capacity for output mode. |

## Ingredient example

```json
{
  "type": "mm:create/kinetic",
  "speed": 16
}
```

`speed` is the required or produced rotation speed.
