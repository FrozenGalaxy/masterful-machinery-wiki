---
layout: default
title: "Create Process Recipes"
---

# Create Process Recipes

Create process recipes with KubeJS server scripts.

## Server script

```js
MMEvents.createProcesses(event => {
  event.create('expert:coke_oven/charcoal')
    .structureId('expert:coke_oven')
    .ticks(1000)
    .input({
      type: 'mm:input/consume',
      ingredient: { type: 'mm:item', item: 'minecraft:oak_log', count: 1 }
    })
    .output({
      type: 'mm:output/simple',
      ingredient: { type: 'mm:item', item: 'minecraft:charcoal', count: 1 }
    })
})
```

Process recipes are datapack/resource ids. `event.create(...)` should use a full resource location such as `expert:coke_oven/charcoal`.

## Builder methods

```js
MMEvents.createProcesses(event => {
  event.create('mypack:my_process')
    .structureId('mypack:my_structure')
    .ticks(100)
    .parallelProcessing(false)
    .input({
      type: 'mm:input/consume',
      ingredient: { type: 'mm:item', item: 'minecraft:iron_ingot', count: 1 }
    })
    .output({
      type: 'mm:output/simple',
      ingredient: { type: 'mm:item', item: 'minecraft:iron_nugget', count: 9 }
    })
})
```

| Method | Meaning |
|---|---|
| `create(id)` | Full process recipe resource location. |
| `structureId(id)` | Full structure id this recipe belongs to. |
| `ticks(int)` | Runtime in game ticks. |
| `parallelProcessing(bool)` | Optional recipe-level override. |
| `mode(string)` | `fixed` (default) or `flex`; flex-specific entries require `flex`. |
| `flexInput(as, ingredient, maxTypes?, chance?)` | Adds an item-kind selector for a flex recipe. |
| `flexMatch(from, item, count, chance)` | Requires a related item per selected flex kind. |
| `flexOutput(from, match, item, count)` | Creates a templated item output per selected kind. |
| `flexCost(value)` | Overrides flex input cost scaling with `linear`, `once`, or a table object. |
| `countInput(as, ingredient, max)` | Counts matching input items without consuming them. |
| `input(object)` | Adds an input entry JSON object. |
| `output(object)` | Adds an output entry JSON object. |
| `structureIds(...ids)` | Lets the recipe run in multiple structures. The first ID becomes the primary structure. |
| `dimension(id)` | Require a dimension, such as `minecraft:the_nether`. |
| `biome(idOrTag)` | Require a biome ID or `#`-prefixed biome tag. |
| `time(value)` | Require `day` or `night`. |
| `weather(value)` | Require `clear`, `rain`, or `thunder`. |
| `minY(y)` / `maxY(y)` | Restrict the controller's Y coordinate. |
| `redstone(value)` | Require `powered` or `unpowered`. |
| `minTier(value)` / `maxTier(value)` | Restrict the formed structure's tier. |

All specified conditions must pass. These methods create the same conditions documented in [Recipe Conditions](../../../current/process-recipes/recipe-conditions/).

For the complete JSON fields, KubeJS examples, cost scaling, item templates, and optional Mystical Agriculture support, see [Flex Recipes and Counted Inputs](../../../current/process-recipes/flex-recipes/).

The builder stores input/output entries as JSON objects. Any valid JSON recipe entry can be used here.
