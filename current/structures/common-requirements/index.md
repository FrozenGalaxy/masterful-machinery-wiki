---
layout: default
title: "Common Requirements"
---

# Common Requirements

The General logic behind Structure Requirements in Masterful Machinery is that they match a possible collection of blocks and some common properties.

### Block State Property Requirement

Block state properties are a built-in feature of vanilla Minecraft and can narrow the requirements of your structure criteria if so desired. All structure requirements can set a list of required block state properties.

```
"A": {
    //...
    "properties": [
        {
            "property": "axis",
            "value": "x"
        }
    ]
}
```

The above example checks that the block state property `axis` matches `x` assuming structure is facing south. certain direction and axis based properties will rotate depending on the rotation of the placed structure.
