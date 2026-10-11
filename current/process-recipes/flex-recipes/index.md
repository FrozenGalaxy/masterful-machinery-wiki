---
layout: default
title: "Flex Recipes and Counted Inputs"
---

# Flex Recipes and Counted Inputs

Flex recipes let one recipe handle many item kinds at once, such as converting any wool color into the matching carpet color. Count inputs let a fixed recipe scale an output by how many matching items are in its input ports.

Normal recipes remain **fixed** by default. Set the recipe root's `"mode": "flex"` to use `mm:input/flex`, `mm:input/flex_match`, or `mm:output/flex`.

## Example: wool to carpet

This is a recipe at `data/mypack/mm/processes/wool_to_carpet.json`:

```json
{
  "structureId": "mypack:my_structure",
  "ticks": 60,
  "mode": "flex",
  "inputs": [
    {
      "type": "mm:input/flex",
      "as": "wool",
      "max_types": 4,
      "ingredient": { "type": "mm:item", "tag": "minecraft:wool", "count": 2 }
    }
  ],
  "outputs": [
    {
      "type": "mm:output/flex",
      "from": "wool",
      "match": "(.+)_wool",
      "item": "minecraft:$1_carpet",
      "count": 3
    }
  ]
}
```

The recipe can process up to four colors in one run. It consumes two of each selected wool color and produces three carpets of the same colors. The `match` regular expression must match the entire input item path (the part after the namespace).

## `mm:input/flex`

This entry scans input item ports and selects each distinct matching item kind for a run. It requires an `mm:item` ingredient using an item ID or item tag. All kinds selected by one entry are handled together.

| Field | Required | Meaning |
|---|---|---|
| `as` | yes | Name for this flex input. Matching outputs and `flex_match` entries refer to it with `from`; its selected kind count can also be used by `scale_by`. |
| `ingredient` | yes | An item ingredient. Its `count` is required for each selected kind. |
| `max_types` | no | Maximum distinct kinds in one run. Defaults to no limit; minimum is `1`. |
| `chance` | no | Chance each selected kind is consumed. Defaults to `1`; `0` keeps each item as a catalyst. |
| `exclude` | no | Item IDs, item tags prefixed with `#`, or namespaces written as `modid:*` that should never be selected. |
| `min_tier`, `max_tier` | no | Inclusive Mystical Agriculture crop tier limits. Non-MA items are excluded when either tier limit is used. |

For example, `"exclude": ["minecraft:golden_apple", "#mypack:seed_blacklist", "othermod:*"]` excludes one item, every item in a tag, and all items from a namespace.

## `mm:input/flex_match`

Add an item that must also be present for each kind selected by a flex input. This is useful for per-item catalysts such as the crux associated with each Mystical Agriculture seed.

```json
{
  "type": "mm:input/flex_match",
  "from": "seed",
  "item": "{ma:crux}",
  "count": 1,
  "chance": 0
}
```

`from` names an `mm:input/flex` entry. `item` uses the same template syntax as a flex output; `match` is optional and defaults to matching the full item path. `count` defaults to `1`, and `chance` defaults to `1`. A matching item with `chance: 0` is required but not consumed. A kind is skipped if its required matching item is absent or cannot be resolved.

## `mm:output/flex`

This creates one item output for each kind selected by the named flex input.

| Field | Required | Meaning |
|---|---|---|
| `from` | yes | The `as` name of an `mm:input/flex` entry. |
| `item` | yes | Item ID template for the output. |
| `match` | no | Regular expression applied to the entire input ID path. Defaults to `(.*)`. |
| `count` | no | Output stack amount per kind. Defaults to `1`. |
| `copy_nbt` | no | Copy the selected input item's NBT to its output. Defaults to `false`. |
| `chance`, `per_tick`, `scale_by` | no | Same behavior as on `mm:output/simple`. |

Template substitutions are `{ns}` for the input namespace, `{path}` for the full input path, and `$1`, `$2`, etc. for regular-expression capture groups. If the template does not match or names an item that is not registered, that input kind is skipped and remains in the port.

`scale_by` can name either an `mm:input/count` entry or an `mm:input/flex` entry. Supported scaled output resources are items, fluids, energy, and Mekanism chemicals.

## Count inputs and `scale_by`

`mm:input/count` counts matching items across the machine's input item ports when a recipe starts. It does not consume them. The ingredient's `count` is the minimum needed to start, and `max` caps the saved count. This entry works in fixed recipes and flex recipes.

```json
{
  "structureId": "mypack:solar_array",
  "ticks": 20,
  "inputs": [
    {
      "type": "mm:input/count",
      "as": "panels",
      "max": 64,
      "ingredient": { "type": "mm:item", "item": "solarflux:sp_1", "count": 1 }
    }
  ],
  "outputs": [
    {
      "type": "mm:output/simple",
      "scale_by": "panels",
      "ingredient": { "type": "mm:energy", "amount": 1000000 }
    }
  ]
}
```

This produces one million FE per counted panel, up to the configured maximum of 64. The count is captured at recipe start; it is not continuously recalculated during the run.

## Cost of other inputs in a flex recipe

Other consumed recipe inputs, such as energy, fluids, and items, are multiplied by the selected number of flex kinds. The default is `LINEAR` (cost multiplied by kind count). Configure it in `mm-common.toml`:

```toml
[flex]
costScaling = "LINEAR" # LINEAR, ONCE, or TABLE
costTable = ["1=1", "4=2", "7=3.5"]
```

`ONCE` charges the other inputs once regardless of kind count. `TABLE` uses the greatest `kinds=multiplier` step not above the selected kind count; in this example, 1–3 kinds cost 1x, 4–6 cost 2x, and 7 or more cost 3.5x. An empty table defaults to `1=1`.

A recipe can override the common setting with `flex_cost`:

```json
"flex_cost": "once"
```

or:

```json
"flex_cost": { "mode": "table", "table": { "1": 1, "4": 2, "7": 3 } }
```

If the machine cannot pay the scaled cost for every selected kind, MM reduces the selected kinds until the other inputs can be paid. A flex run still counts as one recipe for parallel-processing limits.
Scaled input amounts are rounded up to whole resource units.

Before a run starts, MM checks the combined outputs for each selected kind against the output ports. Kinds whose results do not fit are left for a later run; other kinds can still start.

## Mystical Agriculture support

When Mystical Agriculture is installed, flex recipes can use `{ma:essence}` and `{ma:crux}` templates to resolve a seed's actual essence and crux, even when item names do not follow a common pattern. Crops disabled in Mystical Agriculture's config are skipped. `min_tier` and `max_tier` filter by the crop's inclusive tier range. Mystical Agriculture is optional; these tokens require it.

## KubeJS

The `RecipeBuilderJS` convenience methods are available in `MMEvents.createProcesses`:

```js
MMEvents.createProcesses(event => {
  event.create('mypack:wool_to_carpet')
    .structureId('mypack:my_structure')
    .ticks(60)
    .mode('flex')
    .flexInput('wool', { type: 'mm:item', tag: 'minecraft:wool', count: 2 }, 4)
    .flexOutput('wool', '(.+)_wool', 'minecraft:$1_carpet', 3)
})
```

Methods include `.mode('fixed'|'flex')`, `.flexInput(as, ingredient, maxTypes?, chance?)`, `.flexMatch(from, item, count, chance)`, `.flexOutput(from, match, item, count)`, `.flexCost('linear'|'once'|{ mode: 'table', table: {...} })`, and `.countInput(as, ingredient, max)`. The JSON forms remain available through `.input({...})` and `.output({...})` for fields the convenience methods do not expose.

To choose or reject a flex output in script for a specific item, use the server-side `MMEvents.flexOutput` event:

```js
MMEvents.flexOutput('mypack:wool_to_carpet', event => {
  if (event.input.id === 'minecraft:white_wool') {
    event.setOutput('minecraft:white_carpet')
  }
  if (event.input.id === 'mypack:blocked_wool') event.reject()
})
```

The event exposes `recipeId`, `from`, `input`, and the template `output`. `setOutput(itemId)` chooses a different item; the recipe's configured count still applies. `reject()` leaves that kind in its input port. Server-side choices are cached per item kind until the next datapack reload; JEI displays template results.

## JEI

JEI lists accepted item kinds for flex recipes and links each input kind to its corresponding output while cycling through the list. Mystical Agriculture kinds are grouped by crop tier. A slot list is split into pages when it exceeds 100 ingredients. The machine still runs one recipe with the selected kinds together.
