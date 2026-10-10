---
layout: default
title: "Controllers"
---

# Controllers

Controllers are the machine brains. A placed controller checks the blocks around itself, forms a matching structure, and runs process recipes for that structure.

## How controllers work

1. The controller uses its world position as the origin.
2. It scans known structures that reference that controller ID.
3. If the blocks around it match a structure layout, the controller becomes **formed**.
4. Once formed, it checks matching process recipes.
5. A recipe can run when all inputs exist, all outputs have room, and all conditions pass.

The controller GUI reports whether a structure is formed and which structure was detected.

The GUI also shows machine state, current recipe and progress, structure tier, and parallel limits. Its port-list page shows each connected port and its contents. On wide screens the controller can use a larger layout; the client preference is saved locally. The recipe display rotates through long input/output lists, opens matching JEI recipes on click, and supports a per-controller working-sound mute.

## Creating a controller

Create JSON files in:

```text
config/mm/controllers/
```

Minimal example:

```json
{
  "type": "mm:machine",
  "id": "my_controller",
  "name": "My Controller"
}
```

| Field | Meaning |
|---|---|
| `type` | Controller type. For normal machines use `mm:machine`. |
| `id` | Unique controller path. `my_controller` becomes the generated controller block/item id `mm:my_controller`. |
| `name` | Default English display name. Translation key: `block.mm.<id>`. |

## Parallel-processing fields

Controllers can define default parallel-processing behaviour:

```json
{
  "type": "mm:machine",
  "id": "my_controller",
  "name": "My Controller",
  "parallelProcessingDefault": false,
  "maxParallelRecipes": -1,
  "recipeSelectionMode": "default"
}
```

| Field | Default | Meaning |
|---|---:|---|
| `parallelProcessingDefault` | `false` | Whether recipes for this controller run in parallel by default. |
| `maxParallelRecipes` | `-1` | Controller-level parallel cap. `-1` means use the global config value. Non-negative values are capped internally at `100`. |
| `recipeSelectionMode` | `default` | Recipe scheduling mode used when multiple recipes are runnable. See below. |

## Recipe selection mode

Controllers normally scan matching recipes in their existing order. For machines with many recipes that share one port, such as sieves, a fairer selection mode can stop one input type from dominating the machine.

```json
{
  "type": "mm:machine",
  "id": "big_sieve",
  "name": "Big Sieve",
  "recipeSelectionMode": "round_robin_input_item"
}
```

| Mode | Meaning |
|---|---|
| `default` | Current/default behavior. Recipes are checked in the normal rotating scan order. |
| `avoid_same_recipe` | Prefer not to start the exact same recipe twice in a row when another runnable recipe exists. |
| `round_robin_input_item` | Prefer the least-recently-used consumed item input among currently runnable recipes. Useful for machines where gravel/sand/dust-style inputs should be kept balanced. |

`round_robin_input_item` falls back to any runnable recipe if only one input type is available, so it should not stall a machine just because the next preferred input is missing.

## Redstone control and comparator output

Controllers can be configured to react to redstone through the controller GUI. The GUI's redstone row cycles the operating mode; the current mode is also visible in the machine status. A redstone recipe condition can separately require a powered or unpowered controller.

The controller modes are **Ignore redstone**, **Run with redstone**, and **Run without redstone**. The chosen mode is saved per controller.

Controllers emit comparator output for machine activity: `0` while unformed or idle, and `1..15` while working according to the furthest-running recipe's progress. A recipe that completes within one tick reports `15`.

## Working sounds and particles

Controllers can optionally define `workingSound`, `workingSoundInterval` (ticks, default `40`), and `workingParticle`. These effects play while a recipe runs. KubeJS controller builders support `.workingSound(id)`, `.workingSoundInterval(ticks)`, and `.workingParticle(id)`. A player's client can disable effects in client config; the controller GUI sound button mutes sound for that machine.

Server owners can override these values per controller in `config/mm/working_effects.json`. For example:

```json
{
  "mm:auto_crusher": {
    "sound": "minecraft:block.grindstone.use",
    "interval": 25,
    "particle": "minecraft:smoke"
  }
}
```

Each field is optional; an empty string disables that effect, and changes reload with F3+T.

## Assemble a structure from the controller

The controller screen's **Assemble** button opens a structure and port-tier picker. The default tier choice is the lowest registered tier that fits each required port position; selections are clamped to each position's allowed range. The server places blocks from the player's inventory at the rate set by `assemblyBlocksPerTick` in `mm-common.toml` (default `2`, range `1..64`). It does not replace existing blocks and follows normal placement protection checks. Creative players do not need materials.

See [Structure Builder](../structure-builder/) for the held tool, which can also complete a formed machine.

## ID usage

The generated controller block id is exactly `mm:<id>`. For example, `id: "my_controller"` generates `mm:my_controller`, not `mm:my_controller_controller`.

When another file references this controller, use the full ID:

```json
"controllerIds": "mm:my_controller"
```

or:

```json
"controllerIds": ["mm:my_controller", "mm:another_controller"]
```
