---
layout: default
title: "File Layout"
---

# File Layout

## Config-generated blocks

Masterful Machinery reads generated controller, port, and extra-block definitions from the instance config folder:

```text
.minecraft/config/mm/
├─ controllers/
│  └─ my_controller.json
├─ ports/
│  └─ my_item_port.json
└─ extras/
   └─ my_circuit.json
```

The config loaders recursively scan those folders and load files ending in `.json`.

## Datapack data

Structures and processes are datapack content:

```text
<datapack>/
├─ pack.mcmeta
└─ data/
   └─ mypack/
      └─ mm/
         ├─ structures/
         │  └─ my_structure.json
         └─ processes/
            └─ my_recipe.json
```

The runtime ids are derived from the datapack namespace and path. For example:

```text
data/mypack/mm/structures/coke_oven.json
```

becomes:

```text
mypack:coke_oven
```

and:

```text
data/mypack/mm/processes/coke_oven/charcoal.json
```

becomes:

```text
mypack:coke_oven/charcoal
```

## KubeJS alternative

If KubeJS is installed, the source exposes the `MMEvents` event group:

```js
MMEvents.registerControllers(event => {}) // startup
MMEvents.registerPorts(event => {})       // startup
MMEvents.registerExtraBlocks(event => {}) // startup
MMEvents.createStructures(event => {})    // server
MMEvents.createProcesses(event => {})     // server
```

Controllers and ports are startup content. Structures and process recipes are server content.
