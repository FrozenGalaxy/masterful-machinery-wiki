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
  "maxParallelRecipes": -1,
  "recipeSelectionMode": "default"
}
```

| Field | Type | Required | Notes |
|---|---:|---:|---|
| `type` | resource location | yes | Currently `mm:machine`. |
| `id` | string | yes | Base controller id. `coke_oven` generates the controller block/item id `mm:coke_oven`. |
| `name` | string | yes | Display name. |
| `parallelProcessingDefault` | boolean | no | Defaults to `false`. Used by recipes unless overridden. |
| `maxParallelRecipes` | integer | no | Controller override. `-1` means unspecified/fallback. Non-negative values clamp up to `100`. Global common config is separate and is ranged `1..100`. |
| `recipeSelectionMode` | string | no | Recipe scheduling mode. Supported values: `default`, `avoid_same_recipe`, `round_robin_input_item`. Unknown values fall back to `default`. |
| `workingSound` | resource location | no | Optional sound played while recipes run. |
| `workingSoundInterval` | integer | no | Ticks between sounds; defaults to `40`. |
| `workingParticle` | resource location | no | Optional simple particle shown while recipes run. |
| `unformedColor` | hex color string | no | Controller screen color while the structure is unformed; accepts `#RRGGBB` or `RRGGBB`. |
| `idleColor` | hex color string | no | Controller screen color while formed and idle. |
| `workingColor` | hex color string | no | Controller screen color while a recipe is running. |
| `geoModel` | object | no | Optional GeckoLib model displayed while the structure is formed. See [GeckoLib Machine Models](../current/geckolib-models/). |

The color fields also have KubeJS builder methods with matching names. They override client defaults in `config/mm-client.toml`; see [Controllers](../current/controllers/) for the defaults and toggle.

### Controller recipe selection modes

`recipeSelectionMode` changes which runnable recipe a formed controller prefers to start. It does not change recipe validity, inputs, outputs, timings, or parallel-processing caps.

| Value | Behavior |
|---|---|
| `default` | Normal rotating recipe scan order. |
| `avoid_same_recipe` | Prefer another runnable recipe instead of starting the exact same recipe as last time. Falls back if only the same recipe can run. |
| `round_robin_input_item` | Prefer the least-recently-used consumed item input among all currently runnable recipes. Falls back if only one input item type can run. |

`round_robin_input_item` is intended for sieve/washer/recycler-style machines where several input items share one input port and should be processed fairly.

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
| `id` | string | yes | Base port id. `item_port` generates `mm:item_port_input` and `mm:item_port_output`. |
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
    "C": { "block": "mm:coke_oven" }
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
| `maxParallelRecipes` | integer | no | Per-structure override. `-1` means unspecified/fallback; non-negative values clamp up to `100`. Global common config is separate and is ranged `1..100`. |
| `stateLists` | object | no | Defines named lists of block states used by `stateList` pieces. |
| `geoModel` | object or string | no | Structure-specific GeckoLib model config, or `"none"` to disable the controller model. |

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


For exact port matching, use the base port id plus the `input` flag:

```json
"I": { "port": "mm:item_port", "input": true }
"O": { "port": "mm:item_port", "input": false }
```

Do not use `port: "mm:item_port_input"` as the normal structure form. Generated block ids include `_input` and `_output`, but the structure `port` requirement is intended to reference the base port id.

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


## KubeJS generated-id rules

For startup-generated config-backed content, `event.create(...)` takes a bare MM base id/path, not a namespaced id:

```js
MMEvents.registerControllers(event => {
  event.create('coke_oven')
    .type('mm:machine')
    .name('Coke Oven')
})

MMEvents.registerExtraBlocks(event => {
  event.create('basic_circuit')
    .type('mm:circuit')
    .name('Basic Circuit')
})

MMEvents.registerPorts(event => {
  event.create('item_port')
    .name('Item Port')
    .controllerId('mm:coke_oven')
    .config('mm:item', c => {
      c.rows(1).columns(3).slotCapacity(64).tierRank(1)
    })
})
```

Wrong:

```js
event.create('mm:coke_oven')
event.create('mm:basic_circuit')
event.create('mm:item_port')
```

Structures and process recipes are different: those are datapack/resource ids and should be namespaced:

```js
MMEvents.createStructures(event => {
  event.create('expert:coke_oven')
    .controllerId('mm:coke_oven')
})

MMEvents.createProcesses(event => {
  event.create('expert:coke_oven/charcoal')
    .structureId('expert:coke_oven')
})
```

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
| `conditions` | array | no | Extra requirements; all entries must pass. Supported types: `mm:dimension`, `mm:biome`, `mm:time`, `mm:weather`, `mm:height`, `mm:redstone`, and `mm:tier`. See [Recipe Conditions](../current/process-recipes/recipe-conditions/). |
| `parallelProcessing` | boolean | no | Overrides global/controller defaults. |
| `structureIds` | array of resource locations | no | Additional structures allowed to run this recipe. `structureId` remains the primary ID. |
| `mode` | string | no | `fixed` (default) or `flex`; flexible entries require `flex`. |
| `flex_cost` | string or object | no | Flex input cost scaling override (`linear`, `once`, or a `table`). Requires `mode: "flex"`. |

### Input entries

In addition to `mm:input/consume`, recipes support `mm:input/count` (a non-consuming item count), `mm:input/flex` (select item kinds for a flex run), and `mm:input/flex_match` (require an item related to each selected kind). Their complete fields are listed in [Flex Recipes and Counted Inputs](../current/process-recipes/flex-recipes/).

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

`mm:output/flex` generates one item output for each selected flex input kind. Simple outputs can also use `scale_by` to multiply an output amount by a count or kind total. See [Flex Recipes and Counted Inputs](../current/process-recipes/flex-recipes/).

```json
{
  "type": "mm:output/simple",
  "ingredient": { "type": "mm:energy", "amount": 1000 },
  "chance": 1.0,
  "per_tick": false
}
```

Output entries use the same optional `chance` and `per_tick` fields. For item outputs, the source also accepts shorthand fields such as `item`, `count`, and NBT fields directly on the output entry, but the full `ingredient` object is clearer and recommended.

Weighted outputs use `mm:output/weighted` and a non-empty `options` array. Each option has a positive integer `weight` (default `1`) and an `ingredient`; an option without an ingredient or item outputs nothing. Relative chances are proportional to weights:

```json
{
  "type": "mm:output/weighted",
  "chance": 1.0,
  "options": [
    { "weight": 3, "ingredient": { "type": "mm:item", "item": "minecraft:iron_nugget", "count": 4 } },
    { "weight": 1, "ingredient": { "type": "mm:item", "item": "minecraft:gold_nugget", "count": 1 } },
    { "weight": 1, "nothing": true }
  ]
}
```

### Conditions

Supported condition types:

```json
{ "type": "mm:dimension", "dimension": "minecraft:the_nether" }
```

```json
{ "type": "mm:biome", "biome": "#minecraft:is_ocean" }
{ "type": "mm:time", "time": "night" }
{ "type": "mm:height", "minY": 0, "maxY": 64 }
{ "type": "mm:redstone", "redstone": "powered" }
{ "type": "mm:tier", "minTier": 2, "maxTier": 4 }
```

```json
{ "type": "mm:weather", "weather": "clear" }
```

Dimension, biome, time (`day`/`night`), weather (`clear`/`rain`/`thunder`), height, redstone (`powered`/`unpowered`), and tier are supported. Biome accepts an ID or a `#`-prefixed biome tag. Height checks the controller's Y coordinate; either height or tier bound may be omitted. Every listed condition must pass.
