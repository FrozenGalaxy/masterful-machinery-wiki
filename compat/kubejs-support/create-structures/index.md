---
layout: default
title: "Create Structures"
---

# Create Structures

Create Structures with KubeJS Server Scripts

### Server Script

```
MMEvents.createStructures(event => {
    event.create("mm:my_structure")
        .controllerId("mm:controller_a")
        .name("My Machine")
        .layout(a => {
            a.layer([
                "BCB"
            ]).layer([
                "ABA"
            ]).key("A", {
                block: "minecraft:glass"
            }).key("B", {
                block: "minecraft:white_wool"
            })
        })
})
```

To create structures in KubeJS, you can call `MMEvents.createStructures`.

> Note: all functions will map to the fields of the [Structures Json](../../../current/structures)

The `create` function takes a string parameter which is the id of the structure (normally inferred from the location of the json file in a datapack). The function returns a builder to set the rest of the fields for the structure.

The `controllerId` function takes a string parameter which gets added to the structure's `"controllerIds"` field. This function can be called multiple times with different parameter values to allow multiple controllers ids to be set.

The `name` function takes a string parameter which maps directory to structure's `"name"` field.

The `layout` function takes a consumer arrow function as a prameter. This allows you to create the layout as explained below:

The `layer` function in the `layout` callback takes a list of strings, this array is the same format as a list-entry in the structure's `layout` field. This function can be called multiple times to add more layers to the structure.

The `key` function takes in two arguments. The first of which is a single character length string matching a character in the the layers. The second parameter is an object which should match the format of a key entry in the structure json. This should be called for each different character (except `C` and whitespace) to set the requirements for those entries.

## Current 1.20.1 builder methods

```js
MMEvents.createStructures(event => {
  event.create('mypack:my_structure')
    .name('My Structure')
    .controllerId('mm:my_controller')
    .maxParallelRecipes(-1)
    .layout(l => {
      l.layer(['AAA', 'ACA', 'AAA'])
      l.key('A', { block: 'minecraft:bricks' })
      l.key('C', { block: 'mm:my_controller_controller' })
      l.portsAnywhere(false)
    })
})
```

`layer(...)` is added to the builder in a way that preserves top/bottom ordering after build. When in doubt, verify in-game with JEI/blueprint/debug output.
