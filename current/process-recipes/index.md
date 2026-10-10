---
layout: default
title: "Process Recipes"
---

# Process Recipes

Process recipes define what a formed machine does. A recipe names the structure it belongs to, how long it runs, what it consumes, and what it outputs.

Recipes are loaded from Masterful Machinery's custom process directory (not Minecraft's `recipes/` directory):

```text
data/<namespace>/mm/processes/<path>.json
```

The recipe ID is the datapack namespace and path relative to `mm/processes`. The root recipe object has **no** `type` field: the loader selects the recipe model from this directory. `type` fields belong on input entries, output entries, and conditions, where they select the entry/condition parser.

## Minimal shape

```json
{
  "structureId": "mypack:my_structure",
  "ticks": 60,
  "inputs": [],
  "outputs": []
}
```

| Field | Meaning |
|---|---|
| `structureId` | ID of the structure that can run this recipe. |
| `ticks` | Recipe duration in game ticks. `20` ticks = 1 second. |
| `inputs` | List of input entries, usually `mm:input/consume`. |
| `outputs` | List of output entries, usually `mm:output/simple`. |
| `conditions` | Optional list of requirements such as dimension, biome, time, weather, height, redstone, or structure tier. All listed conditions must pass. |
| `parallelProcessing` | Optional per-recipe parallel-processing override. |

## Parallel processing

```json
{
  "structureId": "mypack:my_structure",
  "ticks": 100,
  "parallelProcessing": true,
  "inputs": [],
  "outputs": []
}
```

Recipe-level `parallelProcessing` overrides the structure/controller/global default for that recipe.

## Entry options

Input and output entries support:

```json
"chance": 0.25,
"per_tick": true
```

| Field | Default | Meaning |
|---|---:|---|
| `chance` | `1.0` | Random chance from `0.0` to `1.0`. |
| `per_tick` | `false` | When true, the ingredient is consumed or produced during recipe ticks instead of once at completion. |

## More pages

* [Input entries](./input-entries/)
* [Output entries](./output-entries/)
* [Ingredient configs](./ingredient-configs/)
* [Recipe conditions](./recipe-conditions/)
