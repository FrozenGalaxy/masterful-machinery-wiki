---
layout: default
title: "Compact Reference"
---

# Compact Reference

Dense one-page reference for Masterful Machinery on **Minecraft 1.20.1 Forge**. Use this when you need the whole mental model, file layout, JSON shapes, KubeJS event names, port ids, recipe entry forms, and common debugging checks in one place.

## Identity and scope

* Mod id: `mm`.
* Target in the provided source: Minecraft `1.20.1`, Forge, mod version `3-1.20.1-0.1.33.10`, stability `BETA`.
* Masterful Machinery lets pack authors define generated multiblock machine controllers, ports, extra blocks, structures, and process recipes without writing a custom Java mod per machine.
* Generated blocks are config-driven. Structures and recipes are datapack-driven. KubeJS can register the same concepts through events.
* Main concepts: **controller** = machine brain; **port** = input/output storage or interaction block; **extra block** = generated decorative/helper block; **structure** = multiblock layout; **process recipe** = work performed by a formed structure.


## Downloads and source

* Official CurseForge: https://www.curseforge.com/minecraft/mc-mods/masterful-machinery-fork
* Latest third-party release / JAR: https://github.com/FrozenGalaxy/MasterfulMachinery/releases/latest
* Third-party source and build workflow: https://github.com/FrozenGalaxy/MasterfulMachinery
* Original upstream source: https://github.com/BOLTMAGIC/MasterfulMachinery
* Published wiki: https://frozengalaxy.github.io/masterful-machinery-wiki/

## File layout and ids

```text
.minecraft/config/mm/
├─ controllers/<id>.json       # generated controllers
├─ ports/<id>.json             # generated input/output port variants
└─ extras/<id>.json            # generated extra blocks

<datapack>/pack.mcmeta
<datapack>/data/<namespace>/mm/structures/<path>.json  # structure id <namespace>:<path>
<datapack>/data/<namespace>/mm/processes/<path>.json   # recipe id <namespace>:<path>
```

Example ids:

```text
config/mm/controllers/coke_oven.json                    -> controller id usually mm:coke_oven
data/mypack/mm/structures/coke_oven.json                -> structure id mypack:coke_oven
data/mypack/mm/processes/coke_oven/charcoal.json        -> process id mypack:coke_oven/charcoal
```

Generated controller and port block registry names are normally based on the base id plus generated suffixes, for example a controller like `coke_oven` becomes a controller block such as `mm:coke_oven_controller`. Port JSON creates input and output variants; structures can match a specific generated port or match by port type.

## Common config: `config/mm-common.toml`

```toml
asyncValidation = true                 # experimental async validation toggle
structureValidationRate = 10           # controller structure check interval; 20 = one second
debugTool = true                       # enables Debug Tool behavior
splitRecipesJei = true                 # split JEI categories by structure
portsAutoExtractByDefault = false      # default autoPush/auto-extract fallback
parallelProcessingDefault = false      # global recipe parallel default
maxParallelRecipes = 5                 # global parallel cap
showJeiMaxParallel = true              # show parallel info in JEI structure view
[preview_features]
previewBlueprintScreen = false         # experimental blueprint preview UI
```

Practical defaults: keep `portsAutoExtractByDefault = false`, raise `structureValidationRate` for large packs, keep `maxParallelRecipes` modest, and disable `debugTool` on public servers if debug dumps should not be available to players.

## Controller JSON

Path: `config/mm/controllers/<file>.json`.

```json
{
  "type": "mm:machine",
  "id": "coke_oven",
  "name": "Coke Oven",
  "parallelProcessingDefault": false,
  "maxParallelRecipes": -1
}
```

Fields: `type` required, currently `mm:machine`; `id` required base id; `name` required display name; `parallelProcessingDefault` optional boolean default `false`; `maxParallelRecipes` optional integer, `-1` means use wider/global default, non-negative values clamp up to `100`.

KubeJS startup equivalent:

```js
MMEvents.registerControllers(event => {
  event.create('mm:coke_oven')
    .type('mm:machine')
    .name('Coke Oven')
    .parallelProcessingDefault(false)
    .maxParallelRecipes(-1)
})
```

## Extra block JSON

Path: `config/mm/extras/<file>.json`.

```json
{ "id": "basic_circuit", "name": "Basic Circuit", "type": "mm:circuit" }
```

Supported extra block types: `mm:circuit`, `mm:gearbox`, `mm:vent`.

KubeJS startup equivalent:

```js
MMEvents.registerExtraBlocks(event => {
  event.create('mm:basic_circuit').type('mm:circuit').name('Basic Circuit')
})
```

## Port JSON overview

Path: `config/mm/ports/<file>.json`. A port definition expands into input and output variants.

```json
{
  "id": "item_port",
  "controllerIds": ["mm:coke_oven"],
  "name": "Item Port",
  "type": "mm:item",
  "config": { "rows": 1, "columns": 3, "autoPush": false, "slotCapacity": 64, "tierRank": 1 }
}
```

Common fields: `id` required; `controllerIds` required string or array of controller ids; `name` required; `type` required port type id; `config` required type-specific object. `autoPush` causes compatible output ports to push into adjacent storage. If omitted, base auto-push behavior can fall back to `portsAutoExtractByDefault`. `tierRank` is used by structure `portType` matching with `minTier`/`maxTier`.

KubeJS startup equivalent:

```js
MMEvents.registerPorts(event => {
  event.create('mm:item_port')
    .name('Item Port')
    .controllerId('mm:coke_oven')
    .config('mm:item', c => {
      c.rows(1).columns(3).autoPush(false).slotCapacity(64).tierRank(1)
    })
})
```

## Port types, config fields, ingredient fields

| Port type | Required mod | Config fields | Recipe ingredient fields |
|---|---|---|---|
| `mm:item` | base | `rows`, `columns`, optional `autoPush`, `slotCapacity`, `tierRank` | `item` or `tag`, `count`, optional `nbt`, `nbt_snbt`, `nbt_match` |
| `mm:fluid` | base | `rows`, `columns`, `slotCapacity`, optional `autoPush`, `tierRank` | `fluid`, `amount` in mB |
| `mm:energy` | base | `capacity`, `maxReceive`, `maxExtract`, optional `autoPush`, `tierRank` | `amount` in FE |
| `mm:create/kinetic` | Create | `stress` | `speed` |
| `mm:botania/mana` | Botania | `capacity` | `mana` |
| `mm:pneumaticcraft/air` | PneumaticCraft | `volume`, `danger`, `critical` | `air`, optional `pressure` |
| `mm:mekanism/gas` | Mekanism | `capacity` | `gas`, `amount` |
| `mm:mekanism/slurry` | Mekanism | `capacity` | `slurry`, `amount` |
| `mm:mekanism/pigment` | Mekanism | `capacity` | `pigment`, `amount` |
| `mm:mekanism/infuse` | Mekanism | `capacity` | `infuse`, `amount` |

Port config examples:

```json
{ "type": "mm:item", "config": { "rows": 3, "columns": 3, "autoPush": true, "slotCapacity": 64, "tierRank": 1 } }
{ "type": "mm:fluid", "config": { "rows": 2, "columns": 2, "slotCapacity": 1000, "autoPush": false, "tierRank": 1 } }
{ "type": "mm:energy", "config": { "capacity": 100000, "maxReceive": 1000, "maxExtract": 1000, "autoPush": false, "tierRank": 1 } }
{ "type": "mm:create/kinetic", "config": { "stress": 4 } }
{ "type": "mm:botania/mana", "config": { "capacity": 10000 } }
{ "type": "mm:pneumaticcraft/air", "config": { "volume": 20000, "danger": 11.0, "critical": 12.0 } }
{ "type": "mm:mekanism/gas", "config": { "capacity": 1000 } }
```

Item `slotCapacity`: optional; `0` means normal stack behavior; very high values are internally capped. Fluid units are millibuckets. Energy units are FE. Create kinetic input reads speed and contributes stress impact; output provides speed and stress capacity. PneumaticCraft air uses volume and pressure thresholds.

## Ingredient object examples

```json
{ "type": "mm:item", "item": "minecraft:iron_ingot", "count": 1 }
{ "type": "mm:item", "tag": "forge:ingots/iron", "count": 2 }
{ "type": "mm:fluid", "fluid": "minecraft:water", "amount": 1000 }
{ "type": "mm:energy", "amount": 5000 }
{ "type": "mm:create/kinetic", "speed": 32 }
{ "type": "mm:botania/mana", "mana": 250 }
{ "type": "mm:pneumaticcraft/air", "air": 1000, "pressure": 4.5 }
{ "type": "mm:mekanism/gas", "gas": "mekanism:hydrogen", "amount": 100 }
{ "type": "mm:mekanism/slurry", "slurry": "mekanism:dirty_iron", "amount": 100 }
{ "type": "mm:mekanism/pigment", "pigment": "mekanism:red", "amount": 100 }
{ "type": "mm:mekanism/infuse", "infuse": "mekanism:carbon", "amount": 100 }
```

Item NBT ingredient forms:

```json
{ "type": "mm:item", "item": "minecraft:potion", "count": 1, "nbt": { "Potion": "minecraft:water" }, "nbt_match": "weak" }
{ "type": "mm:item", "item": "minecraft:potion", "count": 1, "nbt_snbt": "{Potion:\"minecraft:water\"}", "nbt_match": "strong" }
```

`weak`/default matching treats the supplied NBT as a subset. `strong` requires stricter matching.

## Structure JSON

Path: `data/<namespace>/mm/structures/<path>.json`.

```json
{
  "name": "Tiny Furnace",
  "controllerIds": "mm:tiny_furnace",
  "portsAnywhere": false,
  "maxParallelRecipes": -1,
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

Fields: `name` required; `controllerIds` required string or array; `layout` required array of layers, each layer is an array of strings; `key` required map from layout character to requirement object; `portsAnywhere` optional boolean; `maxParallelRecipes` optional integer where `-1` means no structure override; `stateLists` optional map of named blockstate lists.

Layout notes: each character in `layout` must have a `key` entry unless it is whitespace. Air/empty space is represented by a space in the layout. Structures are checked from the controller position and support rotations. Directional blockstate properties rotate with the structure; verify rotated structures in-game if using directional properties. Old examples usually use `C` as the controller marker, but it is just a normal key entry unless a builder/tool treats it specially.

Structure key requirement forms:

```json
{ "block": "minecraft:bricks" }
{ "tag": "minecraft:wool" }
{ "port": "mm:item_port", "input": true }
{ "portType": "mm:item", "input": false, "minTier": 1, "maxTier": 3 }
{ "stateList": "casings", "nameTranslationKey": "block.mypack.machine_casing" }
{ "block": "minecraft:oak_log", "properties": [{ "property": "axis", "value": "x" }] }
```

`port` requires a specific port id. `portType` allows any port of a type. `input` may be omitted to accept input or output. `minTier` defaults to `1`; `maxTier` defaults to effectively unlimited; the matched port's config `tierRank` is used. `portsAnywhere: true` lets port/portType pieces match any candidate port positions, still requiring unique matched positions.

KubeJS server equivalent:

```js
MMEvents.createStructures(event => {
  event.create('tiny:tiny_furnace')
    .name('Tiny Furnace')
    .controllerId('mm:tiny_furnace')
    .maxParallelRecipes(-1)
    .layout(l => {
      l.layer(['III', 'ACA', 'OOO'])
      l.key('A', { block: 'minecraft:bricks' })
      l.key('C', { block: 'mm:tiny_furnace_controller' })
      l.key('I', { portType: 'mm:item', input: true })
      l.key('O', { portType: 'mm:item', input: false })
      l.portsAnywhere(false)
    })
})
```

## Process recipe JSON

Path: `data/<namespace>/mm/processes/<path>.json`.

```json
{
  "structureId": "tiny:tiny_furnace",
  "ticks": 100,
  "parallelProcessing": false,
  "inputs": [
    {
      "type": "mm:input/consume",
      "ingredient": { "type": "mm:item", "item": "minecraft:cobblestone", "count": 1 },
      "chance": 1.0,
      "per_tick": false
    }
  ],
  "outputs": [
    {
      "type": "mm:output/simple",
      "ingredient": { "type": "mm:item", "item": "minecraft:stone", "count": 1 },
      "chance": 1.0,
      "per_tick": false
    }
  ],
  "conditions": []
}
```

Fields: `structureId` required; `ticks` required integer, 20 ticks = 1 second; `inputs` required array; `outputs` required array; `conditions` optional array; `parallelProcessing` optional boolean override. A recipe can run only when the controller has a formed structure matching `structureId`, all inputs are available, all outputs have room, and all conditions pass.

Input entry:

```json
{ "type": "mm:input/consume", "ingredient": { "type": "mm:item", "item": "minecraft:iron_ingot", "count": 1 }, "chance": 1.0, "per_tick": false }
```

Output entry:

```json
{ "type": "mm:output/simple", "ingredient": { "type": "mm:item", "item": "minecraft:iron_nugget", "count": 9 }, "chance": 1.0, "per_tick": false }
```

`chance` defaults to `1.0` and is a probability from `0.0` to `1.0`. `per_tick` defaults to `false`; if true, the ingredient is consumed or produced during recipe ticks instead of only at completion. For item outputs, shorthand fields directly on the output entry may be accepted by the source, but the explicit `ingredient` object is recommended.

Conditions:

```json
{ "type": "mm:dimension", "dimension": "minecraft:the_nether" }
{ "type": "mm:weather", "weather": "clear" }
```

Weather values: `clear`, `rain`, `thunder`.

KubeJS server equivalent:

```js
MMEvents.createProcesses(event => {
  event.create('tiny:smelt_stone')
    .structureId('tiny:tiny_furnace')
    .ticks(100)
    .parallelProcessing(false)
    .input({ type: 'mm:input/consume', ingredient: { type: 'mm:item', item: 'minecraft:cobblestone', count: 1 } })
    .output({ type: 'mm:output/simple', ingredient: { type: 'mm:item', item: 'minecraft:stone', count: 1 } })
})
```

## Complete minimal datapack/config example

Controller: `config/mm/controllers/tiny_furnace.json`

```json
{ "type": "mm:machine", "id": "tiny_furnace", "name": "Tiny Furnace" }
```

Port: `config/mm/ports/tiny_item_port.json`

```json
{
  "id": "tiny_item_port",
  "controllerIds": "mm:tiny_furnace",
  "name": "Tiny Item Port",
  "type": "mm:item",
  "config": { "rows": 1, "columns": 3, "autoPush": false }
}
```

Structure: `datapacks/tiny_furnace/data/tiny/mm/structures/tiny_furnace.json`

```json
{
  "name": "Tiny Furnace",
  "controllerIds": "mm:tiny_furnace",
  "layout": [["III", "ACA", "OOO"]],
  "key": {
    "A": { "block": "minecraft:bricks" },
    "C": { "block": "mm:tiny_furnace_controller" },
    "I": { "portType": "mm:item", "input": true },
    "O": { "portType": "mm:item", "input": false }
  }
}
```

Recipe: `datapacks/tiny_furnace/data/tiny/mm/processes/smelt_stone.json`

```json
{
  "structureId": "tiny:tiny_furnace",
  "ticks": 100,
  "inputs": [{ "type": "mm:input/consume", "ingredient": { "type": "mm:item", "item": "minecraft:cobblestone", "count": 1 } }],
  "outputs": [{ "type": "mm:output/simple", "ingredient": { "type": "mm:item", "item": "minecraft:stone", "count": 1 } }]
}
```

## KubeJS event names and placement

```js
// startup_scripts
MMEvents.registerControllers(event => {})
MMEvents.registerPorts(event => {})
MMEvents.registerExtraBlocks(event => {})

// server_scripts
MMEvents.createStructures(event => {})
MMEvents.createProcesses(event => {})
```

Controllers, ports, and extra blocks are startup content. Structures and process recipes are server content.

Common builder method map:

```text
controller: create(id), type(id), name(text), parallelProcessingDefault(bool), maxParallelRecipes(int)
port: create(id), name(text), controllerId(id) repeatable, config(portType, builder => ...)
extra block: create(id), type(id), name(text)
structure: create(id), name(text), controllerId(id) repeatable, maxParallelRecipes(int), layout(builder => ...)
structure layout: layer([rows...]), key(char, object), portsAnywhere(bool)
process: create(id), structureId(id), ticks(int), parallelProcessing(bool), input(object), output(object)
port config builders: item rows/columns/autoPush/slotCapacity/tierRank; fluid rows/columns/slotCapacity/autoPush/tierRank; energy capacity/maxReceive/maxExtract/autoPush/tierRank; kinetic stress; mana capacity; air volume/danger/critical; Mekanism chemical capacity/amount depending builder.
```

## Items and commands

* Blueprint: stores a structure id in NBT and is used by structure-view/preview features.
* Debug Tool: right-click a controller to generate a debug dump when `debugTool = true`.
* Priority Setter: right-click in air cycles priority `0..10`; sneak-right-click air resets to `0`; sneak-right-click output port applies priority; input ports reject priority. Useful when multiple output ports can accept the same output.
* Multiblock Saver: marks two corners and captures a structure region to JSON/JS-style output; source has safety checks including a 50,000-block capture limit and a limit on unique key characters.
* Command: `/mm reform`, permission level 2. Scans loaded chunks around players, finds controller block entities, checks known structures, and reforms matching controllers. Useful after structure edits or migrations.

## Troubleshooting checklist

Structure not forming:

1. Structure file path is `data/<namespace>/mm/structures/` and world/datapack is loaded.
2. `controllerIds` contains the controller id, not a wrong block id.
3. Every non-space layout character has a `key` entry.
4. Air is a space in the layout string; do not define a fake air key.
5. Controller block in the world matches the controller key entry and origin assumptions.
6. `port`/`portType` entries use correct `input: true` for input variants and `input: false` for output variants.
7. `tierRank` satisfies `minTier`/`maxTier` when using `portType` tier matching.
8. Blockstate `properties` exactly match valid placed block properties and account for rotation.

Recipe visible but not running:

1. `structureId` exactly matches the structure id generated from datapack path.
2. Structure is currently formed at the controller.
3. Inputs exist in input ports and outputs have room in output ports.
4. Conditions pass: dimension/weather.
5. Unit amounts are correct: items count, fluid mB, energy FE, chemical amount, mana, air/pressure, Create speed.
6. `per_tick: true` means the port must satisfy the requirement every tick, not just once.
7. Parallel settings do not exceed global/controller/structure caps.

NBT mismatch: prefer `nbt` JSON object or `nbt_snbt` string, start with default/`weak`, use `strong` only for exactness.

Auto-output does nothing: only compatible output ports auto-push; set `autoPush` on the port config or check `portsAutoExtractByDefault`; make sure the adjacent block can accept the capability/resource.

Server cost too high: increase `structureValidationRate`, reduce `maxParallelRecipes`, avoid huge port inventories/tanks, avoid excessive per-tick recipes, and be cautious with experimental async validation.

After changing structures: reload/restart as needed and try `/mm reform` for loaded controllers.

## Quick decision rules

* Define generated blocks in `config/mm`; define world machine behavior in datapacks; use KubeJS only when script-driven registration is preferred.
* Use `portType` in structures when any compatible port should work; use `port` when a specific port id is required.
* Use `portsAnywhere` for flexible port placement; leave it false when exact multiblock shape matters.
* Put long-lived machine examples under datapacks; use KubeJS for pack logic, loops, generated variants, or integration with other scripted changes.
* Keep recipe JSON explicit: always put the actual resource object inside `ingredient` for clarity.
* Keep id namespaces straight: config-generated controller/port ids usually use `mm:*`; datapack structures/processes use the datapack namespace.
