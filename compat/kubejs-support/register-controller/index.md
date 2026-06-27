---
layout: default
title: "Register Controller"
---

# Register Controller

Register generated controllers with a KubeJS startup script.

## Startup script

The script goes in `kubejs/startup_scripts/`.

```js
MMEvents.registerControllers(event => {
  event.create('my_controller')
    .type('mm:machine')
    .name('My Controller')
})
```

`event.create(...)` takes the bare MM controller id/path. Do **not** include `mm:` here.

Correct:

```js
event.create('coke_oven')
```

Wrong:

```js
event.create('mm:coke_oven')
```

The generated controller block/item/menu/block-entity id is exactly:

```text
mm:coke_oven
```

not:

```text
mm:coke_oven_controller
```

## Builder methods

```js
MMEvents.registerControllers(event => {
  event.create('coke_oven')
    .type('mm:machine')
    .name('Coke Oven')
    .parallelProcessingDefault(false)
    .maxParallelRecipes(-1)
})
```

| Method | Meaning |
|---|---|
| `create(id)` | Bare generated MM id/path. `coke_oven` becomes `mm:coke_oven`. |
| `type(id)` | Controller type. Normal machines use `mm:machine`. |
| `name(text)` | Default display name. |
| `parallelProcessingDefault(bool)` | Optional controller-level default for recipe parallelism. |
| `maxParallelRecipes(int)` | Optional controller-level cap. `-1` means unspecified/fallback. |

> **Important:** Startup-generated controllers, ports, and extra blocks use bare ids in `event.create(...)`. Structures and process recipes are datapack/resource ids and should be namespaced.
