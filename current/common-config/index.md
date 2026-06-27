---
layout: default
title: "Common Config"
---

# Common Config

The global config file is `mm-common.toml`. It controls debug tools, JEI display, structure validation, port auto-push defaults, and parallel-processing defaults.

```toml
# Enables the Debug Tool Item's functionality. Disable on public servers.
debugTool = true

# Splits JEI recipe categories by the structure they belong to.
splitRecipesJei = true

# Default value for port auto-extraction when a port supports it and does not override it.
portsAutoExtractByDefault = false
```

## Common options

| Option | Default | Meaning |
|---|---:|---|
| `debugTool` | `true` | Enables the MM debug tool item. Disable it on servers where players should not use it. |
| `splitRecipesJei` | `true` | When enabled, JEI recipe categories are split by structure instead of being merged into one category. |
| `portsAutoExtractByDefault` | `false` | Default auto-push value for ports that can automatically extract into nearby storage. |

## 1.20.1 options

The 1.20.1 build also supports these options:

```toml
asyncValidation = true
structureValidationRate = 10
parallelProcessingDefault = false
maxParallelRecipes = 5
showJeiMaxParallel = true

[preview_features]
previewBlueprintScreen = false
```

| Option | Meaning |
|---|---|
| `asyncValidation` | Allows structure validation work to happen asynchronously where supported. |
| `structureValidationRate` | Tick interval between structure validation attempts. Lower values validate more often. |
| `parallelProcessingDefault` | Default parallel-processing behaviour for controllers/structures that do not override it. |
| `maxParallelRecipes` | Global cap for parallel recipes when a controller or structure does not define a more specific cap. Range `1..100`, default `5`. |
| `showJeiMaxParallel` | Shows max-parallel information in JEI when relevant. |
| `previewBlueprintScreen` | Enables the preview blueprint screen feature. |

See [Common Config Reference](../../reference/common-config-source.html) for the combined config reference.

## `maxParallelRecipes` range

Global common config `maxParallelRecipes` is ranged `1..100` and defaults to `5`. Do not use `-1` in `mm-common.toml`; `-1` is only used by individual controller/structure builder/config fields to mean unspecified/fallback.
