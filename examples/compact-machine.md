---
layout: default
title: "Compact Complete Machine Example"
---

# Compact Complete Machine Example

This example creates a tiny furnace-like multiblock with one controller, one item input/output port, one structure, and one recipe.

## 1. Controller

`config/mm/controllers/tiny_furnace.json`

```json
{
  "type": "mm:machine",
  "id": "tiny_furnace",
  "name": "Tiny Furnace"
}
```

## 2. Item port

`config/mm/ports/tiny_item_port.json`

```json
{
  "id": "tiny_item_port",
  "controllerIds": "mm:tiny_furnace",
  "name": "Tiny Item Port",
  "type": "mm:item",
  "config": {
    "rows": 1,
    "columns": 3,
    "autoPush": false
  }
}
```

This generates input and output variants of the port.

## 3. Structure

`datapacks/tiny_furnace/data/tiny/mm/structures/tiny_furnace.json`

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
    "C": { "block": "mm:tiny_furnace_controller" },
    "I": { "portType": "mm:item", "input": true },
    "O": { "portType": "mm:item", "input": false }
  }
}
```

## 4. Process recipe

`datapacks/tiny_furnace/data/tiny/mm/processes/smelt_stone.json`

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

## 5. Test checklist

1. Start the pack once so MM creates its config folders.
2. Add the controller and port JSON files under `config/mm`.
3. Add the datapack and enable it in the world.
4. Reload with `/reload` or restart.
5. Place the multiblock exactly as the layout describes.
6. Insert cobblestone into an input item port.
7. Confirm stone appears in an output item port after 100 ticks.
