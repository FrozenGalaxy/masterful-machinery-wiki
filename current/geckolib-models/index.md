---
layout: default
title: "GeckoLib Machine Models"
---

# GeckoLib Machine Models

Masterful Machinery can render an animated GeckoLib model at a controller while its multiblock is formed. GeckoLib is optional and must be installed separately; without it, the machine continues to work and the model is not rendered. The source declares GeckoLib 4.4 or newer as an optional dependency.

## Configure a controller model

Add `geoModel` to a controller JSON in `config/mm/controllers/`:

```json
{
  "type": "mm:machine",
  "id": "my_machine",
  "name": "My Machine",
  "geoModel": {
    "model": "mypack:geo/core.geo.json",
    "texture": "mypack:textures/block/core.png",
    "animations": "mypack:animations/core.animation.json",
    "idle": "animation.core.idle",
    "working": "animation.core.working",
    "offset": [0, 1, 2],
    "scale": 1,
    "rotate": true,
    "glow": false
  }
}
```

| Field | Required | Default | Meaning |
|---|---|---|---|
| `model` | yes | — | GeckoLib geometry resource location. |
| `texture` | yes | — | Texture resource location. |
| `animations` | no | none | Animation resource location. Without it, the model is static. |
| `idle` | no | none | Animation name to loop while formed and idle. |
| `working` | no | none | Animation name to loop while a recipe runs. |
| `offset` | no | `[0, 0, 0]` | `[right, up, inward]` block offsets from the controller's bottom center, viewed from in front of the controller. |
| `scale` | no | `1` | Positive model scale. |
| `rotate` | no | `true` | Rotate model and offset with controller facing. If false, both use fixed world orientation. |
| `glow` | no | `false` | Render at full brightness. |

Only rendered states are formed and idle, and formed and working. The `idle` and `working` animations loop; a missing animation name leaves the model still for that state.

## Structure-specific model

A structure-level `geoModel` replaces the controller model for that structure. Setting it to the string `"none"` disables the model for that structure, even if its controller defines one:

```json
{
  "name": "Core Tier 4",
  "controllerIds": "mm:my_machine",
  "geoModel": "none",
  "layout": [["C"]],
  "key": { "C": { "block": "mm:my_machine" } }
}
```

## KubeJS

Use `.geoModel({...})` in a controller startup registration or in a structure registration. For a structure, `.geoModel('none')` disables an inherited controller model.

```js
MMEvents.registerControllers(event => {
  event.create('my_machine')
    .type('mm:machine')
    .name('My Machine')
    .geoModel({
      model: 'mypack:geo/core.geo.json',
      texture: 'mypack:textures/block/core.png',
      animations: 'mypack:animations/core.animation.json',
      idle: 'animation.core.idle',
      working: 'animation.core.working',
      offset: [0, 1, 2],
      glow: true
    })
})
```

## Resource files

Place GeckoLib resource files in the usual asset folders. For example, with KubeJS:

```text
kubejs/assets/<namespace>/geo/<model>.geo.json
kubejs/assets/<namespace>/animations/<model>.animation.json
kubejs/assets/<namespace>/textures/block/<texture>.png
```

The IDs in `geoModel` use those resource paths, for example `mypack:geo/core.geo.json`. Missing model resources prevent that model from rendering and log a warning. Missing animation resources or names leave it static and log a warning; they do not stop the world from loading.

See the [controller reference](../controllers/) for controller fields and the [version and dependencies page](../../reference/version-and-dependencies.html) for optional dependency details.
