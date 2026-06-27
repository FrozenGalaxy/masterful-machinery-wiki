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
