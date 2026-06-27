---
layout: default
title: "Create Process Recipes"
---

# Create Process Recipes

Create process recipes with KubeJS Server Scripts

### Server Script

```
MMEvents.createProcesses(event => {
    event.create("mm:my_process_recipe")
        .structureId("mm:my_structure")
        .ticks(1000)
        .input({
            type: "mm:input/consume",
            ingredient: {
                type: "mm:item",
                item: "minecraft:glass",
                count: 10
            }
        })
        .input({
            type: "mm:input/consume",
            ingredient: {
                type: "mm:fluid",
                fluid: "minecraft:water",
                amount: 1000
            }
        })
        .output({
            type: "mm:output/simple",
            ingredient: {
                type: "mm:energy",
                amount: 1000
            }
        })
})
```

To register controllers in KubeJS, you can call `MMEvents.createProcesses`.

> Note: all functions will map to the fields of the [Process Recipe Json](../../../current/process-recipes)

The `create` function takes a string parameter which is the id of the process recipe (normally inferred from the location of the json file in a datapack). The function returns a builder to set the rest of the fields for the process recipe.

the `structureId` function takes a string parameter which maps directly to the process recipe's `"structureId"` field.

The `ticks` function takes an integer parameter which maps directly to the process recipe's `"ticks"` field.

The `input` function takes an object of an input recipe entry and adds it to the list of object of the process recipe's `"inputs"` array field.

The `output` function takes an object of an output recipe entry and adds it to the list of object of the process recipe's `"outputs"` array field.

## Current 1.20.1 builder methods

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

The builder stores input/output entries as JSON objects. Any valid JSON recipe entry can be used here.
