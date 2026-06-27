---
layout: default
title: "Register Port"
---

# Register Port

Register Ports with KubeJS Startup Scripts

### Startup Script

```
MMEvents.registerPorts(event => {
    event.create("my_port")
        .name("My Energy Port")
        .controllerId("mm:my_controller")
        .config("mm:energy", c => {
            c.capacity(1000000)
             .maxReceive(1000)
             .maxExtract(1000);
    })
})
```

To register ports in KubeJS, you can call `MMEvents.registerPorts`.

> Note: all functions will map to the fields of the [Port Json](../../../current/ports)

The `create` function takes a string parameter which maps directly to the ports `"id"` field and returns a builder to set the rest of the fields for the port.

The `name` function takes a string parameter which maps directory to ports `"name"` field.

The `controllerId` function takes a string parameter which gets added to the ports `"controllerIds"` field. This function can be called multiple times with different parameter values to allow multiple controllers ids to be set.

The `config` function takes 2 parameters. First of which is a string which maps directly to the ports `"type"` field. The second parameter is an arrow function (consumer) to build the values inside of the type specific `"config"` object field.

All functions for the `config` function's arrow function consumer, map directly to the port's `"config"` object field values.

See more on the `config` object's fields [here](../../../current/ports#port-types)

## Current 1.20.1 config builder methods

```js
MMEvents.registerPorts(event => {
  event.create('mm:my_item_port')
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

Common config builder methods by type:

| Type | Methods |
|---|---|
| `mm:item` | `rows`, `columns`, `autoPush`, `slotCapacity`, `tierRank` |
| `mm:fluid` | `rows`, `columns`, `slotCapacity`, `autoPush`, `tierRank` |
| `mm:energy` | `capacity`, `maxReceive`, `maxExtract`, `autoPush`, `tierRank` |
| `mm:create/kinetic` | `stress` |
| `mm:botania/mana` | `capacity` |
| `mm:pneumaticcraft/air` | `volume`, `danger`, `critical` |
| Mekanism chemical ports | `capacity` or `amount` |
