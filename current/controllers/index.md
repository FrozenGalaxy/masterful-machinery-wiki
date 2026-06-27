---
layout: default
title: "Controllers"
---

# Controllers

Controllers are the machine brains. A placed controller checks the blocks around itself, forms a matching structure, and runs process recipes for that structure.

## How controllers work

1. The controller uses its world position as the origin.
2. It scans known structures that reference that controller ID.
3. If the blocks around it match a structure layout, the controller becomes **formed**.
4. Once formed, it checks matching process recipes.
5. A recipe can run when all inputs exist, all outputs have room, and all conditions pass.

The controller GUI reports whether a structure is formed and which structure was detected.

## Creating a controller

Create JSON files in:

```text
config/mm/controllers/
```

Minimal example:

```json
{
  "type": "mm:machine",
  "id": "my_controller",
  "name": "My Controller"
}
```

| Field | Meaning |
|---|---|
| `type` | Controller type. For normal machines use `mm:machine`. |
| `id` | Unique controller path. `my_controller` becomes the generated controller block/item id `mm:my_controller`. |
| `name` | Default English display name. Translation key: `block.mm.<id>`. |

## Parallel-processing fields

Controllers can define default parallel-processing behaviour:

```json
{
  "type": "mm:machine",
  "id": "my_controller",
  "name": "My Controller",
  "parallelProcessingDefault": false,
  "maxParallelRecipes": -1
}
```

| Field | Default | Meaning |
|---|---:|---|
| `parallelProcessingDefault` | `false` | Whether recipes for this controller run in parallel by default. |
| `maxParallelRecipes` | `-1` | Controller-level parallel cap. `-1` means use the global config value. Non-negative values are capped internally at `100`. |

## ID usage

The generated controller block id is exactly `mm:<id>`. For example, `id: "my_controller"` generates `mm:my_controller`, not `mm:my_controller_controller`.

When another file references this controller, use the full ID:

```json
"controllerIds": "mm:my_controller"
```

or:

```json
"controllerIds": ["mm:my_controller", "mm:another_controller"]
```
