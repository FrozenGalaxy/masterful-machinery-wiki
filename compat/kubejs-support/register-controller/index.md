---
layout: default
title: "Register Controller"
---

# Register Controller

Register Controllers with Kube JS startup scripts.

### Startup Script

The following JavaScript example goes into the KubeJS `startup_scripts` folder

```
MMEvents.registerControllers(event => {
    event.create("my_controller")
        .name("My Controller")
        .type("mm:machine");
});
```

To register controllers in KubeJS, you can call `MMEvents.registerControllers`.

> Note: all functions will map to the fields of the [Controller Json](../../../current/controllers)

The `create` function takes a string parameter which maps directly to the controller `"id"` field and returns a builder to set the rest of the fields for the controller.

The `name` function takes a string parameter which maps directory to controllers `"name"` field.

the `type` function takes a string parameter which maps directly to the controller `"type"` field.

## Current 1.20.1 builder methods

```js
MMEvents.registerControllers(event => {
  event.create('mm:my_controller')
    .type('mm:machine')
    .name('My Controller')
    .parallelProcessingDefault(false)
    .maxParallelRecipes(-1)
})
```

`maxParallelRecipes(-1)` means unspecified/global default. Non-negative values are clamped to `100`.
