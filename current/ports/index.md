---
layout: default
title: "Ports"
---

# Ports

Ports are the machine blocks that handle recipe inputs and outputs. A formed structure can contain item ports, fluid ports, energy ports, and optional mod-compat ports.

A port can be restricted to one or more controllers. Structures and recipes then reference either a specific port ID or a broader port type.

## Creating a port

Create JSON files in:

```text
config/mm/ports/
```

Common fields:

```json
{
  "id": "my_port",
  "controllerIds": "mm:my_controller",
  "name": "My Port",
  "type": "mm:item",
  "config": {}
}
```

| Field | Meaning |
|---|---|
| `id` | Unique port path. `my_port` becomes `mm:my_port`. |
| `controllerIds` | Single controller ID or array of controller IDs this port may be used with. |
| `name` | Default English display name. Translation key: `block.mm.<id>`. |
| `type` | Port type ID. Determines which config fields and ingredient type the port supports. |
| `config` | Type-specific settings such as rows, columns, capacity, stress, or tier rank. |

Multiple controllers:

```json
"controllerIds": [
  "mm:my_controller",
  "mm:my_other_controller"
]
```

## Supported port types

| Port ID | Required mod | Purpose |
|---|---|---|
| `mm:item` | base | Item storage/input/output. |
| `mm:fluid` | base | Forge fluid storage/input/output. |
| `mm:energy` | base | Forge Energy storage/input/output. |
| `mm:create/kinetic` | Create | Kinetic speed/stress interaction. |
| `mm:pneumaticcraft/air` | PneumaticCraft | Air/pressure interaction. |
| `mm:botania/mana` | Botania | Mana storage/input/output. |
| `mm:mekanism/gas` | Mekanism | Gas storage/input/output. |
| `mm:mekanism/slurry` | Mekanism | Slurry storage/input/output. |
| `mm:mekanism/pigment` | Mekanism | Pigment storage/input/output. |
| `mm:mekanism/infuse` | Mekanism | Infuse-type storage/input/output. |

## Tier matching

Item, fluid, and energy ports support `tierRank`. Structures can then match any port of a type within a tier range:

```json
"I": {
  "portType": "mm:item",
  "input": true,
  "minTier": 1,
  "maxTier": 3
}
```

Use this when several ports should satisfy the same structure slot, such as basic/advanced/elite item inputs.

## Port pages

* [Item ports](./item-ports/)
* [Fluid ports](./fluid-ports/)
* [Energy ports](./energy-ports/)
* [Create kinetic ports](./create-kinetic-compat/)
* [PneumaticCraft air ports](./pneumaticcraft-air-compat/)
* [Botania mana ports](./botania-mana-compat/)
* [Mekanism ports](./mekanism-ports-compat/)
