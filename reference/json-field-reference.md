---
layout: default
title: "Complete JSON Field Reference"
---

# Complete JSON Field Reference

This page consolidates fields from the previous wiki and fields verified against the 1.20.1 source.

## Controllers

Path:

```text
config/mm/controllers/<file>.json
```

Example:

```json
{
  "type": "mm:machine",
  "id": "coke_oven",
  "name": "Coke Oven",
  "parallelProcessingDefault": false,
  "maxParallelRecipes": -1
}
```

| Field | Type | Required | Notes |
|---|---:|---:|---|
| `type` | resource location | yes | Currently `mm:machine`. |
| `id` | string | yes | Base controller id. Used to generate a controller block. |
| `name` | string | yes | Display name. |
| `parallelProcessingDefault` | boolean | no | Defaults to `false`. Used by recipes unless overridden. |
| `maxParallelRecipes` | integer | no | `-1` means use global config. Other values clamp to `0..100`. |

## Ports

Path:

```text
config/mm/ports/<file>.json
```

Every port JSON is expanded into input and output variants.

Common fields:

```json
{
  "id": "item_port",
  "controllerIds": ["mm:coke_oven"],
  "name": "Item Port",
  "type": "mm:item",
  "config": {}
}
```

| Field | Type | Required | Notes |
|---|---:|---:|---|
| `id` | string | yes | Base port id. |
| `controllerIds` | resource location or array | yes | One controller id or a list of ids. |
| `name` | string | yes | Display name. |
| `type` | resource location | yes | See supported port types below. |
| `config` | object | yes | Type-specific storage config. |

### Port config fields

| Port type | Config fields | Recipe ingredient fields |
|---|---|---|
| `mm:item` | `rows`, `columns`, optional `autoPush`, optional `slotCapacity`, optional `tierRank` | `item` or `tag`, `count`, optional `nbt`, optional `nbt_snbt`, optional `nbt_match` |
| `mm:fluid` | `rows`, `columns`, `slotCapacity`, optional `autoPush`, optional `tierRank` | `fluid`, `amount` |
| `mm:energy` | `capacity`, `maxReceive`, `maxExtract`, optional `autoPush`, optional `tierRank` | `amount` |
| `mm:create/kinetic` | `stress` | `speed` |
| `mm:botania/mana` | `capacity` | `mana` |
| `mm:pneumaticcraft/air` | `volume`, `danger`, `critical` | `air`, optional `pressure` |
| `mm:mekanism/gas` | `capacity` | `gas`, `amount` |
| `mm:mekanism/slurry` | `capacity` | `slurry`, `amount` |
| `mm:mekanism/pigment` | `capacity` | `pigment`, `amount` |
| `mm:mekanism/infuse` | `capacity` | `infuse`, `amount` |

### Item NBT matching

Item ingredients support two ways to specify NBT:

```json
{
  "type": "mm:item",
  "item": "minecraft:potion",
  "count": 1,
  "nbt": { "Potion": "minecraft:water" },
  "nbt_match": "weak"
}
```

or:

```json
{
  "type": "mm:item",
  "item": "minecraft:potion",
  "count": 1,
  "nbt_snbt": "{Potion:\"minecraft:water\"}",
  "nbt_match": "strong"
}
```

`weak`/default matching treats the provided NBT as a subset. `strong` requires a stricter match.

## Extra blocks

Path:

```text
config/mm/extras/<file>.json
```

Example:

```json
{
  "id": "basic_circuit",
  "name": "Basic Circuit",
  "type": "mm:circuit"
}
```

Supported types:

* `mm:circuit`
* `mm:gearbox`
* `mm:vent`

## Structures

Path:

```text
data/<namespace>/mm/structures/<path>.json
```

Example:

```json
{
  "name": "Coke Oven",
  "controllerIds": "mm:coke_oven",
  "portsAnywhere": false,
  "maxParallelRecipes": -1,
  "layout": [
    ["AAA", "ACA", "AAA"]
  ],
  "key": {
    "A": { "block": "minecraft:bricks" },
    "C": { "block": "mm:coke_oven_controller" }
  }
}
```

| Field | Type | Required | Notes |
|---|---:|---:|---|
| `name` | string | yes | Display name. |
| `controllerIds` | resource location or array | yes | Controller ids allowed to form this structure. |
| `layout` | array of layers | yes | Layers are arrays of strings. Each character maps to `key`. |
| `key` | object | yes | Character-to-piece definitions. |
| `portsAnywhere` | boolean | no | Lets normal port and portType pieces match any of the candidate port positions in the layout. |
| `maxParallelRecipes` | integer | no | Per-structure override, `-1` means unspecified, non-negative values clamp to `0..100`. |
| `stateLists` | object | no | Defines named lists of block states used by `stateList` pieces. |

### Structure key piece types

A key entry is identified by the field it contains:

```json
"A": { "block": "minecraft:bricks" }
```

| Field | Meaning |
|---|---|
| `block` | Require one exact block. |
| `tag` | Require any block in a block tag. |
| `port` | Require a specific port id. Optional `input: true/false`. Optional `anywhere: true`. |
| `portType` | Require any port of a type. Optional `input`, `minTier`, `maxTier`, `anywhere`. |
| `stateList` | Require one of the named block states from `stateLists`. Optional `nameTranslationKey`. |
| `properties` | Modifier array for blockstate properties, used together with a base piece. |

### Port type matching with tiers

Example:

```json
"I": {
  "portType": "mm:item",
  "input": true,
  "minTier": 2,
  "maxTier": 4
}
```

This matches any input item port whose storage config `tierRank` is between 2 and 4. If a port config has no meaningful tier, it behaves like tier 1 for matching.

## Process recipes

Path:

```text
data/<namespace>/mm/processes/<path>.json
```

Example:

```json
{
  "structureId": "mypack:coke_oven",
  "ticks": 200,
  "parallelProcessing": false,
  "inputs": [
    {
      "type": "mm:input/consume",
      "ingredient": {
        "type": "mm:item",
        "item": "minecraft:oak_log",
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
    }
  ],
  "conditions": []
}
```

| Field | Type | Required | Notes |
|---|---:|---:|---|
| `structureId` | resource location | yes | Structure that can run the recipe. |
| `ticks` | integer | yes | Runtime in game ticks. 20 ticks = 1 second. |
| `inputs` | array | yes | Input entries. |
| `outputs` | array | yes | Output entries. |
| `conditions` | array | no | Extra requirements. |
| `parallelProcessing` | boolean | no | Overrides global/controller defaults. |

### Input entries

```json
{
  "type": "mm:input/consume",
  "ingredient": { "type": "mm:item", "item": "minecraft:iron_ingot", "count": 1 },
  "chance": 1.0,
  "per_tick": false
}
```

| Field | Type | Required | Notes |
|---|---:|---:|---|
| `type` | resource location | yes | Currently `mm:input/consume`. |
| `ingredient` | object | yes | Port ingredient object. |
| `chance` | number | no | Defaults to `1.0`. Chance is checked as a probability. |
| `per_tick` | boolean | no | If `true`, input is consumed every recipe tick rather than once on completion. |

### Output entries

```json
{
  "type": "mm:output/simple",
  "ingredient": { "type": "mm:energy", "amount": 1000 },
  "chance": 1.0,
  "per_tick": false
}
```

Output entries use the same optional `chance` and `per_tick` fields. For item outputs, the source also accepts shorthand fields such as `item`, `count`, and NBT fields directly on the output entry, but the full `ingredient` object is clearer and recommended.

### Conditions

Supported condition types:

```json
{ "type": "mm:dimension", "dimension": "minecraft:the_nether" }
```

```json
{ "type": "mm:weather", "weather": "clear" }
```

Weather values are parsed as enum names. Use lowercase or uppercase variants equivalent to the enum names: `clear`, `rain`, or `thunder`.
