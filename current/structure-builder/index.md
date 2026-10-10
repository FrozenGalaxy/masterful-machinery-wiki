---
layout: default
title: "Structure Builder"
---

# Structure Builder

The Structure Builder is a rechargeable tool for previewing, building, completing, and dismantling multiblocks. It can place Masterful Machinery structures and supported `.nbt` multiblocks from other mods.

## Choose a structure and inspect materials

Hold the tool and **Shift+use** to open its screen. The **Structures** tab has a searchable gallery, 3D preview, layer controls, size and block count, and port-tier information. The **Materials** tab compares required blocks with the player's inventory and the tool's 54-slot store, plus the linked ME network when enabled; hover an entry for the available/required counts. The store supports up to 512 items per stackable slot.

The Settings tab chooses a preferred tier for each port type. Each structure position still clamps that preference to its allowed tier range. The tool's instant-build preference is saved per item.

## Preview and build

Right-click a block while holding the tool to preview the selected structure at that target. The hologram marks planned blocks and obstructions; rotate with **Shift+scroll**. Right-click again to start building when the structure is clear. The server checks that the tool is still carried, the target is within range and loaded, materials and FE are available, placement is allowed, and the positions are unobstructed.

Press **G** (rebindable) to anchor the current target and facing. You can move away and right-click to place the structure at the saved anchor. Press G again to release the anchor. The anchor is saved on the tool and cleared when a build job is accepted; a rejected build keeps it.

The default target range is 64 blocks. Operators can change `tool.buildRange` from 5 to 128 blocks in the server config. Targeting stops at unloaded terrain.

### Placement speed

Server setting `tool.buildMode` selects `SEQUENTIAL` (default), `LAYER_BY_LAYER` (bottom up, with an MM controller placed first), or `INSTANT` (one server tick). `tool.buildBlocksPerTick` controls sequential and layer placement from 1 to 1024 blocks per tick (default 2). The per-tool **Instant build** option can make sequential placement happen in one tick; an explicit server layer or instant mode takes precedence. All modes still consume blocks and energy and enforce placement protection. Controller Assemble and dismantling use their own speeds.

## Complete or dismantle a machine

Right-click an incomplete MM controller with the tool to finish its selected structure, like the controller's Assemble action. To dismantle a formed MM machine, hold the rebindable **V** key, or **Shift+right-click twice** to confirm. Returned blocks go to tool storage, then the player's inventory, then the ground. Normal block-breaking drops and protection checks apply. Dismantling is available for recognized builder structures too; it requires a complete matching structure and does not require an MM controller.

## Energy and materials

The default tool capacity is 1,000,000 FE. Placing a block costs 50 FE and dismantling one costs 25 FE; creative mode is free. It accepts up to 10,000 FE per tick from a charger. These values are configurable under `[tool]` in `mm-common.toml`. Build materials are taken from tool storage, then player inventory, then (if enabled) the linked ME network.

## Applied Energistics 2

Shift+right-click an AE2 network block, including a Wireless Access Point, to bind the tool to that ME network. In Settings, enable **Use ME network** and optionally **Auto-craft missing**. Builds wait until all required materials are available; with auto-crafting enabled, the tool requests missing blocks with available patterns and shows progress/status above the hotbar. Network access follows AE2/FTB team ownership checks. Refunds return to the player, not to ME storage.

## Other mods' multiblocks

The gallery can load vanilla structure `.nbt` files from datapack paths `data/<namespace>/mm_builder_structures/`, with legacy support for `mbtool_structures/` and `spatial_structures/`. Structures with unavailable blocks are skipped. These structures have no controller or port-tier selection, and block-entity data is ignored; a structure containing blocks with no placeable item cannot be built. The gallery refreshes on login and `/reload`.

Operators can create and manage gallery categories in the **Categories (Admin)** tab. Assign a selected structure with the category controls; assignments persist across restarts and datapack reloads.

KubeJS can modify the non-MM gallery on the server:

```js
MMEvents.builderStructures(event => {
  event.remove('mbtool:woot/woot_tier_1_copper')
  event.removeNamespace('mbtool')
  event.add('pack:my_reactor', 'pack:structures/my_reactor.nbt')
})
```

The first argument to `add` is the gallery structure ID; the second is the resource location of its `.nbt` file. The added file must be available as a datapack resource.

## Config screen

Operators can edit server settings from the tool's Config tab. It includes targeting range, placement speed and mode, energy settings, controller assembly speed, port auto I/O, and other server options. Client visual settings are local to each client. See [Common Config](../common-config/) for defaults and ranges.
