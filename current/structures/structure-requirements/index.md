---
layout: default
title: "Structure Requirements"
---

# Structure Requirements

Structure `key` entries define which block or port can occupy each non-space character in `layout`. Each example below is one entry in the root `key` object.

## Exact block

```json
"A": {
  "block": "minecraft:glass"
}
```

This requires the block at every `A` position to be glass.

## Specific port

```json
"A": {
  "port": "mm:my_port",
  "input": true
}
```

`port` uses the base port id from `config/mm/ports`, without the generated `_input` or `_output` suffix. The optional `input` flag selects an input (`true`) or output (`false`); omit it to accept either variant.

Add `"anywhere": true` to let this port requirement match any candidate port position in the structure instead of only its layout position:

```json
"I": { "port": "mm:my_port", "input": true, "anywhere": true }
```

## Port type

```json
"I": {
  "portType": "mm:item",
  "input": true,
  "minTier": 1,
  "maxTier": 3
}
```

This matches an item port in the selected tier range. `input` is optional. Tier bounds are optional; the defaults are tier `1` and no upper limit. A port's tier rank comes from its config. `"anywhere": true` applies the same flexible-position behavior as for a specific port.

## Block tag

```json
"A": {
  "tag": "minecraft:wool"
}
```

This matches any block in the vanilla `minecraft:wool` block tag. Structure `tag` requirements match block tags, not item tags.

## Blockstate properties

The `properties` modifier narrows a base block, tag, or state-list requirement. Property values are strings and must be valid for the matched block state.

```json
"A": {
  "block": "minecraft:oak_log",
  "properties": [
    { "property": "axis", "value": "x" }
  ]
}
```

Directional properties rotate with the structure where supported.

## Named state lists

Define reusable alternatives under the structure root's `stateLists` object. Each named state maps to a normal structure-piece requirement; `defaultIgnored` optionally allows blocks not matching any listed state.

```json
{
  "stateLists": {
    "casings": {
      "basic": { "block": "minecraft:bricks" },
      "reinforced": { "tag": "minecraft:wool" },
      "defaultIgnored": false
    }
  },
  "key": {
    "A": { "stateList": "casings", "nameTranslationKey": "block.example.casings" }
  }
}
```

`nameTranslationKey` is optional and changes the displayed name for the state-list requirement. The recognized state names can be used by state-aware integrations and tools.
