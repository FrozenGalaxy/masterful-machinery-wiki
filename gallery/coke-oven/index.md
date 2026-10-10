---
layout: default
title: "Coke Oven"
---

# Coke Oven

MasterSloth1's Structure - Coke Oven, it consumes a single item from the minecraft:logs tag to produce charcoal and a custom fluid from KubeJS called creosote

## Controller files

coke\_oven.json

```
{
  "id": "coke_oven",
  "type": "mm:machine",
  "name": "Coke Oven"
}
```

---

## Port files

coke\_oven\_fluid.json

```
{
  "id": "coke_oven_fluid",
  "controllerIds": "mm:coke_oven",
  "name": "C_O Fluid Hatch -",
  "type": "mm:fluid",
  "config": {
    "rows": 1,
    "columns": 1,
    "slotCapacity": 32000
  }
}
```

coke\_oven\_item.json

```
{
  "id": "coke_oven_item",
  "controllerIds": "mm:coke_oven",
  "name": "C_O Item Hatch -",
  "type": "mm:item",
  "config": {
    "rows": 3,
    "columns": 3
  }
}
```

---

## Structure File

data/firmaland2/mm/structures/coke\_oven.json

```
{
  "name": "Coke Oven structure",
  "controllerIds": "mm:coke_oven",
  "layout": [
    [
      "111",
      "111",
      "111"
    ],
    [
      "111",
      "111",
      "111"
    ],
    [
      "141",
      "213",
      "1C1"
    ],
    [
      "111",
      "111",
      "111"
    ]
  ],
  "key": {
    "1": {
      "block": "tfc:fire_bricks"
    },
    "2": {
      "block": "mm:coke_oven_item_input"
    },
    "3": {
      "block": "mm:coke_oven_item_output"
    },
    "4": {
      "block": "mm:coke_oven_fluid_output"
    }
  }
}
```

---

## Processing Recipes

data/firmaland2/mm/processes/coke\_oven/charcoal.json

```
{
  "ticks": 300,
  "structureId": "firmaland2:coke_oven",
  "inputs": [
    {
      "type": "mm:input/consume",
      "ingredient": {
        "type": "mm:item",
        "tag": "minecraft:logs",
        "count": 1
      }
    }
  ],
  "outputs": [
    {
      "type": "mm:output/simple",
      "ingredient": {
        "type": "mm:item",
        "item": "minecraft:charcoal",
        "count": 1
      }
    },
    {
      "type": "mm:output/simple",
      "ingredient": {
        "type": "mm:fluid",
        "fluid": "kubejs:creosote",
        "amount": 100
      }
    }
  ]
}
```

---

This example requires TFC's `tfc:fire_bricks` block and a KubeJS fluid registered as `kubejs:creosote`. Resource IDs must be lowercase; uppercase namespace characters are invalid.
