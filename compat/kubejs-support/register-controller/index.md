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
    .recipeSelectionMode('default')
    .unformedColor('#FF6B5C')
    .idleColor('#5CFF89')
    .workingColor('#FFC94D')
    .geoModel({ model: 'mypack:geo/core.geo.json', texture: 'mypack:textures/block/core.png' })
})
```

| Method | Meaning |
|---|---|
| `create(id)` | Bare generated MM id/path. `coke_oven` becomes `mm:coke_oven`. |
| `type(id)` | Controller type. Normal machines use `mm:machine`. |
| `name(text)` | Default display name. |
| `parallelProcessingDefault(bool)` | Optional controller-level default for recipe parallelism. |
| `maxParallelRecipes(int)` | Optional controller-level cap. `-1` means unspecified/fallback. |
| `recipeSelectionMode(string)` | Optional recipe scheduling mode: `default`, `avoid_same_recipe`, or `round_robin_input_item`. |
| `unformedColor(hex)` | Optional controller screen color while its structure is unformed; accepts `#RRGGBB` or `RRGGBB`. |
| `idleColor(hex)` | Optional controller screen color while formed and idle; accepts `#RRGGBB` or `RRGGBB`. |
| `workingColor(hex)` | Optional controller screen color while a recipe is running; accepts `#RRGGBB` or `RRGGBB`. |
| `geoModel(object)` | Optional GeckoLib model config. GeckoLib must be installed to render it. |

The same three fields can be set in the generated controller JSON. They override the local client defaults in `config/mm-client.toml`; the client option `controller.tintControllerScreen` can disable screen tinting. See [Controllers](../../../current/controllers/) for the JSON example and config details.

For the `geoModel` object fields and resource pack layout, see [GeckoLib Machine Models](../../../current/geckolib-models/).

## Recipe selection mode

`recipeSelectionMode(...)` controls how the controller chooses between multiple runnable recipes. This is most useful for machines that have many valid recipes at once and should not keep consuming the same input type.

```js
MMEvents.registerControllers(event => {
  event.create('big_sieve')
    .type('mm:machine')
    .name('Big Sieve')
    .parallelProcessingDefault(false)
    .maxParallelRecipes(1)
    .recipeSelectionMode('round_robin_input_item')
})
```

Supported values:

| Value | Use when |
|---|---|
| `default` | You want the normal recipe scan behavior. |
| `avoid_same_recipe` | You only want to avoid starting the exact same recipe back-to-back. |
| `round_robin_input_item` | You want the controller to prefer the least-recently-used consumed item input among currently runnable recipes. This is good for sieve-like machines with several input types in one input port. |

Mode strings are forgiving: hyphens/spaces are normalized to underscores, and unknown values fall back to `default`.

> **Important:** Startup-generated controllers, ports, and extra blocks use bare ids in `event.create(...)`. Structures and process recipes are datapack/resource ids and should be namespaced.
