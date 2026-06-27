---
layout: default
title: "Structures"
---

# Structures

Structures define the multiblock layout a controller must detect before recipes can run.

A structure belongs in a datapack path such as:

```text
data/<namespace>/mm/structures/<path>.json
```

The structure ID is the datapack resource location relative to `mm/structures`. For example:

```text
data/mypack/mm/structures/coke_oven.json
```

becomes:

```text
mypack:coke_oven
```

## Example

```json
{
  "name": "My Machine",
  "controllerIds": "mm:controller_a",
  "layout": [
    ["  A  "],
    ["1PCD2"],
    ["1P D2"]
  ],
  "key": {
    "A": { "block": "minecraft:glass" },
    "P": { "block": "mm:my_port_input" },
    "D": { "portType": "mm:item", "input": false },
    "1": { "port": "mm:my_port", "input": true },
    "2": { "port": "mm:my_port", "input": false }
  }
}
```

| Field | Meaning |
|---|---|
| `name` | Display name shown for the formed structure. |
| `controllerIds` | Single controller ID or list of controller IDs that can form this structure. |
| `layout` | 3D character layout, stored as layers of rows. Spaces are ignored. |
| `key` | Maps each layout character to a block, port, tag, or port-type requirement. |

## Layout orientation

Each layer is read row-by-row. The top row is treated as the north-most row. In practice, align the controller position consistently, usually on the south/front side of the layer.

```json
"layout": [
  [
    "BBB",
    "ACB"
  ]
]
```

## `portsAnywhere`

At the structure root, `portsAnywhere: true` allows normal port and port-type pieces to match any candidate port position instead of requiring an exact coordinate. Each required anywhere-port piece still needs a unique matching port.

```json
{
  "portsAnywhere": true,
  "layout": [["III", "ACA", "OOO"]],
  "key": {
    "I": { "portType": "mm:item", "input": true },
    "O": { "portType": "mm:item", "input": false }
  }
}
```

## Port-type pieces

A structure can require any port of a given type instead of a specific port ID:

```json
"I": {
  "portType": "mm:item",
  "input": true,
  "minTier": 1,
  "maxTier": 3
}
```

`input` is optional. If omitted, either input or output may match. `minTier` defaults to `1`; `maxTier` defaults to effectively unlimited.

## Parallel cap

Structures can define their own parallel recipe cap:

```json
"maxParallelRecipes": 5
```

`-1` or an omitted field means the structure does not override the controller/global value.

See [Structure Requirements](./structure-requirements/) for available key-entry formats.
