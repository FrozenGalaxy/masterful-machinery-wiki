---
layout: default
title: "Register Extra Blocks"
---

# Register Extra Blocks

Register Extra Blocks with KubeJS Startup Scripts

### Startup Script

```
MMEvents.registerExtraBlocks(event => {
    event.create("my_vent")
        .type("mm:vent")
        .name("My Vent")
})
```

To register extra blocks in KubeJS, you can call `MMEvents.registerExtraBlocks`.

> Note: all functions will map to the fields of the [Extra Blocks Json](../../../current/extra-blocks)

The `create` function takes a string parameter which maps directly to the extra block's `"id"` field and returns a builder to set the rest of the fields for the extra block.

The `type` function takes a string parameter which maps directly to the extra block's `"type"` field.

The `name` function takes a string paramter which maps directly to the extra block's `"name"` field.
