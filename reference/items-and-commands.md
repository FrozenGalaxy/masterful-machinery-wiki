---
layout: default
title: "Items and Commands"
---

# Items and Commands

## Items

| Item | Purpose |
|---|---|
| Blueprint | Stores a structure id in NBT and shows the structure name in the tooltip. Used by structure-view UI features. |
| Debug Tool | Right-click a machine controller to generate a debug dump, when `debugTool = true`. |
| Priority Setter | Cycles an output priority value from `0` to `10` and applies it to output ports while sneaking. |
| Multiblock Saver | Marks two corners and writes captured structure files. |

## Priority Setter

* Right-click in air: cycles the priority stored on the item.
* Sneak + right-click in air: resets the stored priority to `0`.
* Sneak + right-click an output port: applies the stored priority to that output port.
* Input ports reject priority application.

Output priority is useful when several output ports could accept the same result and you want one port preferred.

## Multiblock Saver

The source contains a multiblock saver item that marks two corners and captures a structure region.

Basic behavior:

1. Right-click a block to set corner 1.
2. Right-click another block to set corner 2.
3. Right-click in air to capture and save.
4. Sneak actions clear or explicitly set corner 1 depending on whether you click air or a block.

The capture helper writes JSON and JS-style output paths and has internal safety checks such as a 50,000-block capture limit and a limit on unique key characters.

## `/mm reform`

The 1.20.1 build supports:

```mcfunction
/mm reform
```

It requires permission level 2. It scans loaded chunks around players, finds machine controller block entities, checks whether they match known structures, and reforms matching controllers. This is useful after changes to structures or after migration where controller state needs to be refreshed.

## Debug dumps

With `debugTool = true`, right-clicking a controller with the Debug Tool writes a debug dump and sends a clickable path to the player. Use this when a structure will not form or a recipe will not run.
