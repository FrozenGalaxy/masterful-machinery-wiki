---
layout: default
title: "KubeJS Support"
---

# KubeJS Support

Masterful Machinery can be configured with KubeJS instead of, or alongside, JSON files. Use startup events for generated block definitions and server events for datapack-like content.

All events are exposed through `MMEvents`.

## Event overview

```js
MMEvents.registerControllers(event => {})
MMEvents.registerPorts(event => {})
MMEvents.registerExtraBlocks(event => {})
MMEvents.createStructures(event => {})
MMEvents.createProcesses(event => {})
MMEvents.builderStructures(event => {})
MMEvents.recipeStarted(event => {})
MMEvents.recipeFinished(event => {})
```

| Event | Script side | Purpose |
|---|---|---|
| `registerControllers` | startup | Register generated controller blocks. |
| `registerPorts` | startup | Register generated input/output port blocks. |
| `registerExtraBlocks` | startup | Register generated decorative/helper blocks. |
| `createStructures` | server | Register datapack-style structure definitions. |
| `createProcesses` | server | Register datapack-style process recipes. |
| `builderStructures` | server | Add or remove non-MM `.nbt` structures in the Structure Builder gallery. |
| `recipeStarted` | server | React when a machine recipe starts. |
| `recipeFinished` | server | React when a machine recipe finishes. |

## ID rule: generated content vs datapack content

Generated startup content and datapack/server content use different `event.create(...)` id rules.

| Context | Event | `event.create(...)` expects | Example | Generated / referenced id |
|---|---|---|---|---|
| Controller | `MMEvents.registerControllers` | bare MM base id/path | `event.create('coke_oven')` | `mm:coke_oven` |
| Extra block | `MMEvents.registerExtraBlocks` | bare MM base id/path | `event.create('basic_circuit')` | `mm:basic_circuit` |
| Port | `MMEvents.registerPorts` | bare MM base id/path | `event.create('item_port')` | `mm:item_port_input`, `mm:item_port_output` |
| Structure | `MMEvents.createStructures` | full resource location | `event.create('expert:coke_oven')` | `expert:coke_oven` |
| Process recipe | `MMEvents.createProcesses` | full resource location | `event.create('expert:coke_oven/charcoal')` | `expert:coke_oven/charcoal` |

> **Important:** `MMEvents.registerControllers`, `MMEvents.registerExtraBlocks`, and `MMEvents.registerPorts` take a bare MM id/path in `event.create(...)`, such as `coke_oven`, not `mm:coke_oven`. Masterful Machinery registers generated blocks/items under the `mm` namespace internally. Passing `mm:coke_oven` here can produce an invalid double namespace like `mm:mm:coke_oven`. Structures and process recipes are different: those are datapack/resource ids and should be namespaced, such as `expert:coke_oven`.

## Pages

* [Register controllers](./register-controller/)
* [Register ports](./register-port/)
* [Register extra blocks](./register-extra-blocks/)
* [Create structures](./create-structures/)
* [Create process recipes](./create-process-recipes/)

## Structure Builder gallery event

```js
MMEvents.builderStructures(event => {
  event.remove('mbtool:some_structure')
  event.removeNamespace('mbtool')
  event.add('mypack:my_structure', 'mypack:structures/my_structure.nbt')
})
```

This server event edits the Structure Builder's list of non-MM multiblocks. `remove` takes one structure ID, `removeNamespace` removes all entries from a namespace, and `add` takes a gallery ID plus a resource location for a vanilla structure `.nbt` file. See [Structure Builder](../../current/structure-builder/) for format and limitations.

The `recipeStarted` and `recipeFinished` events can be filtered by recipe ID. Both expose `recipeId`, `controllerId`, `structureId`, `controller`, `level`, `pos`, and `block`. `recipeStarted` can be cancelled to prevent that recipe from starting; `recipeFinished` runs after completion. For example:

```js
MMEvents.recipeStarted('mypack:my_recipe', event => {
  console.log(`${event.recipeId} started in ${event.structureId}`)
})

MMEvents.recipeFinished(event => {
  console.log(`${event.recipeId} finished at ${event.pos}`)
})
```
