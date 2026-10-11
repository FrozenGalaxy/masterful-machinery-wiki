---
layout: default
title: "Ports"
---

# Ports

Ports are the machine blocks that handle recipe inputs and outputs. A formed structure can contain item ports, fluid ports, energy ports, and optional mod-compat ports.

A port can be restricted to one or more controllers. Structures and recipes then reference either a specific port ID or a broader port type.

## Per-side automatic input and output

Open a port and use its side controls to enable automatic transfer on the machine-relative **top, bottom, front, back, left,** or **right** side. The directions are relative to the controller's orientation. Input ports pull compatible contents from neighboring non-MM blocks; output ports push contents into neighboring compatible inventories, tanks, or energy storage. Output ports can also feed adjacent Masterful Machinery input ports to chain machines.

Each port stores its own side settings. For supported output ports, `autoPush` in the port definition sets the initial state; if omitted, `portsAutoExtractByDefault` in `mm-common.toml` is used. Set `portAutoIOInterval` to control how often transfers run (default `10` ticks, range `1..200`). See [Common Config](../common-config/) for the complete setting list.

When linked to a formed machine, compatible ports can show a status light using the machine's state colors. Clients can disable port status lights in their client config.

Fluid and Mekanism chemical port screens also have **Lock** and **Dump** controls. Lock keeps a tank dedicated to its current resource (an empty locked tank adopts the first resource inserted). Dump clears the port contents.

## Output priority

Use the [Priority Setter](../../reference/items-and-commands.html#priority-setter) to assign an output priority from `0` to `10`. Recipe outputs try higher-priority ports first for items, fluids, energy, and Mekanism chemicals; equal-priority recipe destinations use a deterministic order. Output ports with auto-push also serve adjacent Masterful Machinery input ports in descending priority order. Priority `0` is the default.

## Input Gateway

The Input Gateway is a convenience block that routes received items, fluids, FE, and—when Mekanism is installed—gas, infusion, pigment, and slurry to the machine's matching input ports. It stores no contents of its own. It can occupy a casing or glass position in a structure, or sit beside an input port. The gateway exposes a read-only view of the linked machine's inputs for integrations such as AE2 pattern providers.

See [Items and Commands](../../reference/items-and-commands.html#input-gateway) for usage notes.

## AE2 Storage Bus

With Applied Energistics 2 installed, an AE2 Storage Bus can attach directly to an item port and expose that inventory to the ME network. This is separate from the Network Linker, which links a machine's output to an ME network.

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
