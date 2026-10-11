---
layout: default
title: "Common Config"
---

# Common Config

The global config file is `mm-common.toml`. It controls debug tools, JEI display, structure validation, port auto I/O, controller assembly, parallel processing, flex recipe costs, Network Linker behavior, and Structure Builder energy and placement.

```toml
# Enables the Debug Tool Item's functionality. Disable on public servers.
debugTool = true

# Splits JEI recipe categories by the structure they belong to.
splitRecipesJei = true

# Default value for port auto-extraction when a port supports it and does not override it.
portsAutoExtractByDefault = false
portAutoIOInterval = 10
assemblyBlocksPerTick = 2

[flex]
costScaling = "LINEAR"
costTable = ["1=1"]
```

## Common options

| Option | Default | Meaning |
|---|---:|---|
| `debugTool` | `true` | Enables the MM debug tool item. Disable it on servers where players should not use it. |
| `splitRecipesJei` | `true` | When enabled, JEI recipe categories are split by structure instead of being merged into one category. |
| `portsAutoExtractByDefault` | `false` | Default auto-push value for ports that can automatically extract into nearby storage. |
| `portAutoIOInterval` | `10` | Ticks between enabled per-side port transfers. Range `1..200`. |
| `assemblyBlocksPerTick` | `2` | Blocks placed per tick by the controller Assemble action. Range `1..64`. |
| `flex.costScaling` | `LINEAR` | Default cost multiplier for other consumed inputs in flex recipes: `LINEAR`, `ONCE`, or `TABLE`. |
| `flex.costTable` | `["1=1"]` | `kinds=multiplier` steps used when `flex.costScaling = "TABLE"`. |

## Structure Builder and Network Linker options

These settings are in the `[network_link]` and `[tool]` sections of `mm-common.toml`:

| Option | Default | Meaning |
|---|---:|---|
| `network_link.outputInterval` | `20` | Ticks between linked machine output transfers to AE2. Range `1..1200`. |
| `network_link.opBypass` | `true` | Allow operators to open and break any linked machine. |
| `network_link.sendContentsOnRemove` | `true` | Send linked port contents to AE2 if a port is removed. |
| `network_link.controllerSearchRadius` | `16` | Search radius used to find a linked port's controller. Range `4..64`. |
| `tool.energyCapacity` | `1000000` | Structure Builder FE capacity. |
| `tool.energyPerPlacedBlock` | `50` | FE consumed per placed block. |
| `tool.energyPerDismantledBlock` | `25` | FE consumed per dismantled block. |
| `tool.energyReceiveRate` | `10000` | Maximum FE accepted per tick from a charger. |
| `tool.buildRange` | `64` | Maximum Structure Builder targeting and placement distance. Range `5..128`; only loaded chunks are targeted. |
| `tool.buildBlocksPerTick` | `2` | Blocks placed per tick in sequential or layer mode. Range `1..1024`. |
| `tool.buildMode` | `SEQUENTIAL` | Placement mode: `SEQUENTIAL`, `LAYER_BY_LAYER`, or `INSTANT`. |

Operators can edit server settings in-game through the Structure Builder config tab. See [Structure Builder](../structure-builder/) for how placement modes interact with the per-tool instant option.

## 1.20.1 options

Flex-recipe cost options are in their own `[flex]` section:

```toml
[flex]
costScaling = "LINEAR"
costTable = ["1=1", "4=2", "7=3.5"]
```

`LINEAR` multiplies other consumed recipe inputs by the number of kinds processed in a flex run. `ONCE` charges them once. `TABLE` chooses the multiplier at the greatest step not above the kind count. A recipe can override this setting with its `flex_cost` field. See [Flex Recipes](../process-recipes/flex-recipes/) for examples.

The 1.20.1 build also supports these options:

```toml
asyncValidation = true
structureValidationRate = 10
parallelProcessingDefault = false
maxParallelRecipes = 5
showJeiMaxParallel = true

[preview_features]
previewBlueprintScreen = false
```

| Option | Meaning |
|---|---|
| `asyncValidation` | Allows structure validation work to happen asynchronously where supported. |
| `structureValidationRate` | Tick interval between structure validation attempts. Lower values validate more often. |
| `parallelProcessingDefault` | Default parallel-processing behaviour for controllers/structures that do not override it. |
| `maxParallelRecipes` | Global cap for parallel recipes when a controller or structure does not define a more specific cap. Range `1..100`, default `5`. |
| `showJeiMaxParallel` | Shows max-parallel information in JEI when relevant. |
| `previewBlueprintScreen` | Enables the preview blueprint screen feature. |

See [Common Config Reference](../../reference/common-config-source.html) for the combined config reference.

## `maxParallelRecipes` range

Global common config `maxParallelRecipes` is ranged `1..100` and defaults to `5`. Do not use `-1` in `mm-common.toml`; `-1` is only used by individual controller/structure builder/config fields to mean unspecified/fallback.
