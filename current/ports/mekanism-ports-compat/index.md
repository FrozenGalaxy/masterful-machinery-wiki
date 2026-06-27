---
layout: default
title: "Mekanism Ports"
---

# Mekanism Ports

When Mekanism is installed, Masterful Machinery can generate ports for Mekanism chemical types.

## Supported types

| Page | Port ID | Ingredient key |
|---|---|---|
| [Gas ports](./gas-ports/) | `mm:mekanism/gas` | `gas` |
| [Slurry ports](./slurry-ports/) | `mm:mekanism/slurry` | `slurry` |
| [Pigment ports](./pigment-ports/) | `mm:mekanism/pigment` | `pigment` |
| [Infusion ports](./infusion-ports/) | `mm:mekanism/infuse` | `infuse` |

Each page follows the same basic pattern: define a port in `config/mm/ports`, then use a matching ingredient object in process recipes.
