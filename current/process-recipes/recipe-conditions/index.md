---
layout: default
title: "Recipe Conditions"
---

# Recipe Conditions

Recipe conditions restrict where or when a process recipe can run.

Add a `conditions` array to the recipe root:

```json
{
  "type": "mm:process",
  "structureId": "mypack:my_structure",
  "ticks": 60,
  "conditions": [
    { "type": "mm:dimension", "dimension": "minecraft:overworld" }
  ],
  "inputs": [],
  "outputs": []
}
```

## Dimension condition

```json
{
  "type": "mm:dimension",
  "dimension": "minecraft:overworld"
}
```

The recipe only runs in the listed dimension.

## Biome condition

```json
{ "type": "mm:biome", "biome": "minecraft:plains" }
```

The biome can be a biome ID or a tag prefixed with `#`, such as `#minecraft:is_ocean`.

## Weather condition

```json
{
  "type": "mm:weather",
  "weather": "clear"
}
```

Supported weather values:

| Value | Meaning |
|---|---|
| `clear` | No rain or thunder. |
| `rain` | Raining. |
| `thunder` | Raining and thundering. |

## Time condition

```json
{ "type": "mm:time", "time": "night" }
```

Use `day` or `night`.

## Height condition

```json
{ "type": "mm:height", "minY": 0, "maxY": 64 }
```

Either bound can be omitted. The condition checks the controller's Y coordinate.

## Redstone condition

```json
{ "type": "mm:redstone", "redstone": "powered" }
```

Use `powered` or `unpowered` to require the controller's redstone state.

## Structure tier condition

```json
{ "type": "mm:tier", "minTier": 2, "maxTier": 4 }
```

Either bound can be omitted. The formed structure must meet the requested tier range. Every condition in the recipe's `conditions` array must pass for the recipe to run.
