---
layout: default
title: "Process Recipes"
---

# Process Recipes

Process recipes define what a formed machine does. A recipe names the structure it belongs to, how long it runs, what it consumes, and what it outputs.

Recipes belong in datapacks under the normal recipe path:

```text
data/<namespace>/recipes/<path>.json
```

## Minimal shape

```json
{
  "type": "mm:process",
  "structureId": "mypack:my_structure",
  "ticks": 60,
  "inputs": [],
  "outputs": []
}
```

| Field | Meaning |
|---|---|
| `type` | Recipe serializer. Use `mm:process` for Masterful Machinery process recipes. |
| `structureId` | ID of the structure that can run this recipe. |
| `ticks` | Recipe duration in game ticks. `20` ticks = 1 second. |
| `inputs` | List of input entries, usually `mm:input/consume`. |
| `outputs` | List of output entries, usually `mm:output/simple`. |
| `conditions` | Optional list of dimension/weather restrictions. |
| `parallelProcessing` | Optional per-recipe parallel-processing override. |

## Parallel processing

```json
{
  "type": "mm:process",
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
