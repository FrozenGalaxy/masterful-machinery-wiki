---
layout: default
title: "Structure Requirements"
---

# Structure Requirements

### Block Requirements

```
"A": {
      "block": "minecraft:glass"
}
```

In this example any placements using the character `A` will be required to be the block `minecraft:glass`

### Port Requirement

```
"A": {
    "port": "mm:my_port",
    "input": true // Optional: Remove for both input & output
}
```

This example will match the input ports which have the port id of `mm:my_port` as defined in the ports config file.

The `"input"` requires the port to be an input if `true` and an output if `false`. The field is optional and can be removed to match both input and output variants of the `mm:my_port` port.

### Port Type Requirement

```
"A": {
    "portType": "mm:item",
    "input": true // Optional: Remove for both input & output
}
```

This example will match any input ports with the port type of `mm:item`.

The `"input"` requires the port to be an input if `true` and an output if `false`. The field is optional and can be removed to match input and output ports of port type `mm:item`

### Block Tag Requirement

```
"A": {
    "tag": "minecraft:wools"
}
```

This example will match any block which can be found in the `minecraft:wools` block tag.

> Note: This only matches Block Tags which are different from Item Tags.
