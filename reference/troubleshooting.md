---
layout: default
title: "Troubleshooting"
---

# Troubleshooting


## Startup crash: `mm:mm:<id>` or `ResourceLocationException`

If startup fails with an error like:

```text
ResourceLocationException: Non [a-z0-9/._-] character in path of location: mm:mm:big_sieve_basic
```

check your KubeJS startup registrations. These events expect a bare MM id/path in `event.create(...)`:

```js
MMEvents.registerControllers(event => event.create('coke_oven'))
MMEvents.registerExtraBlocks(event => event.create('basic_circuit'))
MMEvents.registerPorts(event => event.create('item_port'))
```

Do not pass `mm:coke_oven`, `mm:basic_circuit`, or `mm:item_port` to those startup registration events. The mod registers generated blocks/items under the `mm` namespace internally. Structures and process recipes are different: use full resource ids there, such as `expert:coke_oven` or `expert:coke_oven/charcoal`.

## The controller block exists but the structure will not form

Check these first:

1. The structure file is under `data/<namespace>/mm/structures/`.
2. `controllerIds` contains the controller id, not the block registry name unless those happen to match.
3. Every character used in `layout` has a corresponding entry in `key`.
4. Air is represented by a space character in layout strings, not by a key entry.
5. Port pieces use the correct input/output side. `input: true` requires an input port; `input: false` requires an output port.
6. If using `portType`, confirm the port config `tierRank` satisfies `minTier` and `maxTier`.
7. If using blockstate `properties`, confirm the placed block has exactly those property values.

## Recipes show in JEI but do not run

Check:

1. `structureId` exactly matches the structure id.
2. The structure is currently formed.
3. Inputs are available in input ports.
4. Outputs have room in output ports.
5. Conditions pass, for example dimension/weather.
6. Energy/fluid/chemical units are large enough for the recipe.
7. If `per_tick = true`, the port must satisfy the amount every tick, not just once.

## Item NBT recipe does not match

Use `nbt` as a JSON object or `nbt_snbt` as a string. Start with weak/default matching, then switch to `nbt_match: "strong"` only when you need an exact match.

## Auto-output does nothing

Only compatible ports support `autoPush`. Set it on the port config:

```json
"config": {
  "rows": 3,
  "columns": 3,
  "autoPush": true
}
```

If omitted, the value comes from `portsAutoExtractByDefault` in `mm-common.toml`.

## Too much server cost

Use these config levers:

```toml
structureValidationRate = 10
maxParallelRecipes = 5
```

Increasing `structureValidationRate` makes controllers re-check less often. `asyncValidation` is present in the config file, but verify its behavior against the exact build you are shipping. Reducing parallelism and large recipe throughput can also help.

## After editing structures, old controllers behave weirdly

Try:

```mcfunction
/mm reform
```

This refreshes/reforms controller state for controllers in loaded chunks around players.
