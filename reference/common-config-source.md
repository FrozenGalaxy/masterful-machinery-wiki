---
layout: default
title: "Common Config Reference"
---

# Common Config Reference

The older public page listed only a subset of `mm-common.toml`. The provided 1.20.1 source defines these options:

```toml
# Enables async structure validation to improve TPS. Disable in case of issues.
asyncValidation = true

# How often controller will check structure. 1 means every tick, 20 means every second.
structureValidationRate = 10

# Enables the Debug Tool Item's functionality.
debugTool = true

# Splits JEI recipe viewer categories by the structure they belong to.
splitRecipesJei = true

# Default value of autoPush when a compatible port omits autoPush.
portsAutoExtractByDefault = false

# Default value of parallelProcessing when not set elsewhere.
parallelProcessingDefault = false

# Global max parallel recipes per controller.
maxParallelRecipes = 5

# Show the max parallel-processing line in JEI structure view.
showJeiMaxParallel = true

[preview_features]
# Enables the experimental blueprint screen.
previewBlueprintScreen = false
```

## Practical recommendations

* `asyncValidation` is defined in the common config, but in the provided source snapshot the directly visible controller timing check uses `structureValidationRate`. Treat `asyncValidation` as experimental unless you verify behavior in your build.
* Increase `structureValidationRate` if you have many controllers and want less frequent structure checks.
* Disable `debugTool` on public servers if players should not generate debug dumps.
* Use `portsAutoExtractByDefault = false` and enable `autoPush` only on ports that need it.
* Keep `maxParallelRecipes` modest. The source clamps relevant max values to the `1..100` or `0..100` range depending on context.
