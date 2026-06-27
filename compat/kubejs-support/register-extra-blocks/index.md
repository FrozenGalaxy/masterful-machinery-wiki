---
layout: default
title: "Register Extra Blocks"
---

# Register Extra Blocks

Register generated extra blocks with a KubeJS startup script.

## Startup script

```js
MMEvents.registerExtraBlocks(event => {
  event.create('basic_circuit')
    .type('mm:circuit')
    .name('Basic Circuit')
})
```

`event.create(...)` takes the bare MM extra-block id/path. Do **not** include `mm:` here.

Correct:

```js
event.create('basic_circuit')
```

Wrong:

```js
event.create('mm:basic_circuit')
```

The generated block/item id is:

```text
mm:basic_circuit
```

## Builder methods

| Method | Meaning |
|---|---|
| `create(id)` | Bare generated MM id/path. `basic_circuit` becomes `mm:basic_circuit`. |
| `type(id)` | Extra-block type: `mm:circuit`, `mm:gearbox`, or `mm:vent`. |
| `name(text)` | Default display name. |

> **Important:** Startup-generated controllers, ports, and extra blocks use bare ids in `event.create(...)`. Structures and process recipes are datapack/resource ids and should be namespaced.
