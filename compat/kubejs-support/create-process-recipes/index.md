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
| `input(object)` | Adds an input entry JSON object. |
| `output(object)` | Adds an output entry JSON object. |

The builder stores input/output entries as JSON objects. Any valid JSON recipe entry can be used here.
