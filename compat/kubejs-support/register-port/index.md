---
layout: default
title: "Register Port"
---

# Register Port

Register generated ports with a KubeJS startup script.

## Startup script

```js
MMEvents.registerPorts(event => {
  event.create('item_port')
    .name('Item Port')
    .controllerId('mm:coke_oven')
    .config('mm:item', c => {
      c.rows(1).columns(3).slotCapacity(64).tierRank(1)
    })
})
```

`event.create(...)` takes the bare MM base port id/path. Do **not** include `mm:` here.

Correct:

```js
event.create('item_port')
```

Wrong:

```js
event.create('mm:item_port')
```

The generated block/item ids are:

```text
mm:item_port_input
mm:item_port_output
```

## Structure references

For exact port matching in structures, use the base port id plus the `input` flag:

```js
l.key('I', { port: 'mm:item_port', input: true })
l.key('O', { port: 'mm:item_port', input: false })
```

Port-type matching is often cleaner:

```js
l.key('I', { portType: 'mm:item', input: true, minTier: 1, maxTier: 1 })
l.key('E', { portType: 'mm:energy', input: true, minTier: 1, maxTier: 1 })
```

## Builder methods

```js
MMEvents.registerPorts(event => {
  event.create('my_item_port')
    .name('My Item Port')
    .controllerId('mm:my_controller')
    .config('mm:item', c => {
      c.rows(3)
      c.columns(3)
      c.autoPush(false)
      c.slotCapacity(64)
      c.tierRank(1)
    })
})
```

| Method | Meaning |
|---|---|
| `create(id)` | Bare generated MM base port id/path. Input/output suffixes are added by the mod. |
| `name(text)` | Default display name. |
| `controllerId(id)` | Full controller id, for example `mm:coke_oven`. Can be called more than once. |
| `config(portType, builder => ...)` | Port type id plus type-specific config builder. |

Common config builder methods by type:

| Type | Methods |
|---|---|
| `mm:item` | `rows`, `columns`, `autoPush`, `slotCapacity`, `tierRank` |
| `mm:fluid` | `rows`, `columns`, `slotCapacity`, `autoPush`, `tierRank` |
| `mm:energy` | `capacity`, `maxReceive`, `maxExtract`, `autoPush`, `tierRank` |
| `mm:create/kinetic` | `stress` |
| `mm:botania/mana` | `capacity` |
| `mm:pneumaticcraft/air` | `volume`, `danger`, `critical` |
| `mm:mekanism/gas` | `capacity` or `amount`, depending on builder/source version |
| `mm:mekanism/slurry` | `capacity` or `amount`, depending on builder/source version |
| `mm:mekanism/pigment` | `capacity` or `amount`, depending on builder/source version |
| `mm:mekanism/infuse` | `capacity` or `amount`, depending on builder/source version |

> **Important:** Startup-generated controllers, ports, and extra blocks use bare ids in `event.create(...)`. Structures and process recipes are datapack/resource ids and should be namespaced.
