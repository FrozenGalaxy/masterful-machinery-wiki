---
layout: default
title: "Step by Step Datapack Edition"
---

# Step by Step Datapack Edition

This guide builds a small machine with a controller, item ports, a structure, and a process recipe. It follows the current file layout and recipe format. For a complete copyable example, see [Compact Complete Machine Example](../../examples/compact-machine.md).

## 1. Generate the config folders

Install Masterful Machinery and launch the game once. The mod creates its config folders under `config/mm/`. Controller and port definitions go in this config directory; structures and process recipes are datapack resources.

## 2. Define a controller

Create `config/mm/controllers/tiny_furnace.json`:

```json
{
  "type": "mm:machine",
  "id": "tiny_furnace",
  "name": "Tiny Furnace"
}
```

The controller `type` is required and is `mm:machine`. The `id` is a bare ID; MM registers the block as `mm:tiny_furnace`.

## 3. Define an item port

Create `config/mm/ports/tiny_item_port.json`:

```json
{
  "id": "tiny_item_port",
  "controllerIds": "mm:tiny_furnace",
  "name": "Tiny Item Port",
  "type": "mm:item",
  "config": {
    "rows": 1,
    "columns": 3
  }
}
```

MM generates input and output blocks, `mm:tiny_item_port_input` and `mm:tiny_item_port_output`. For port-specific settings and other port types, see [Ports](../../current/ports/).

## 4. Add a structure to a datapack

Create a datapack with `pack.mcmeta`, then add `data/tiny/mm/structures/tiny_furnace.json`:

```json
{
  "name": "Tiny Furnace",
  "controllerIds": "mm:tiny_furnace",
  "layout": [
    [
      "III",
      "ACA",
      "OOO"
    ]
  ],
  "key": {
    "A": { "block": "minecraft:bricks" },
    "C": { "block": "mm:tiny_furnace" },
    "I": { "port": "mm:tiny_item_port", "input": true },
    "O": { "port": "mm:tiny_item_port", "input": false }
  }
}
```

The datapack path determines the structure ID: `data/tiny/mm/structures/tiny_furnace.json` becomes `tiny:tiny_furnace`. Every non-space layout character must appear in `key`; spaces represent air. See [Structures](../../current/structures/) for layout and port requirements.

## 5. Add a process recipe

Create `data/tiny/mm/processes/smelt_stone.json` in the same datapack:

```json
{
  "structureId": "tiny:tiny_furnace",
  "ticks": 100,
  "inputs": [
    {
      "type": "mm:input/consume",
      "ingredient": {
        "type": "mm:item",
        "item": "minecraft:cobblestone",
        "count": 1
      }
    }
  ],
  "outputs": [
    {
      "type": "mm:output/simple",
      "ingredient": {
        "type": "mm:item",
        "item": "minecraft:stone",
        "count": 1
      }
    }
  ]
}
```

The `mm/processes` directory is the recipe loader path. Do not add a root `"type": "mm:process"`; MM recipes do not have a root type field. The entry types inside `inputs` and `outputs` are required. See [Process Recipes](../../current/process-recipes/) for the complete schema.

## 6. Load and check it

1. Put the datapack in the world's `datapacks` folder, enable it, and run `/reload` (or restart).
2. Place the controller and ports in the pattern described by the structure layout.
3. Confirm the controller forms, then insert cobblestone into an input port.
4. Leave room in the output port. After 100 ticks, stone should appear there.

Recipes only run when their structure is formed, required inputs are available, outputs can fit, and all recipe conditions pass. If the controller does not form or the recipe does not run, see [Troubleshooting](../../reference/troubleshooting.md).

## Capture a structure in game

The current item is `mm:multiblock_saver`. Right-click one block for corner 1, then right-click another block for corner 2. Shift-right-click a block to reset corner 1. With both corners set, right-click air to save the selection; shift-right-click air clears both corners. The tool writes capture files under the game's `config/mm/structures` area. Review the generated JSON and move or adapt it into your datapack's `data/<namespace>/mm/structures/` folder before relying on it.
