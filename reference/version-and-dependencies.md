---
layout: default
title: "Version and Dependencies"
---

# Version and Dependencies

Values below were read from the upstream source.

The feature documentation was checked against upstream source commit `9f4e2e1`, including release `0.1.35.8`. This release fixes JEI recipe and structure sync on dedicated servers and after datapack reloads. The documented features also include flex recipes and count-scaled outputs, optional GeckoLib machine models, and output priority for more port types.

| Property | Value |
|---|---|
| `mod_version` | `3-1.20.1-0.1.35.8` |
| `mc_version` | `1.20.1` |
| `jei_version` | `15.49.0.188` |
| `mekanism_version` | `1.20.1-10.4.16.80` |
| `kubejs_version` | `2001.6.5-build.16` |
| `rhino_version` | `2001.2.3-build.10` |
| `architectury_version` | `9.2.14` |
| `create_version` | `6.0.6-150` |
| `flywheel_version` | `1.0.4` |
| `botania_version` | `1.20.1-450-FORGE` |

The release build also compiles against GeckoLib `4.8.4`; GeckoLib remains optional at runtime and the declared supported range starts at `4.4`. Mystical Agriculture is also optional; MM reads its crop data only when installed for flex recipe essence, crux, and tier templates.

## Notes

* Main mod id: `mm`.
* Minecraft target: `1.20.1`.
* Loader target: Forge.
* JEI, Jade, KubeJS, Create, Mekanism, PneumaticCraft, Botania, GeckoLib, and Mystical Agriculture integration code is present in the source. Optional integrations activate only when their companion mod is loaded.


## Project links

* [Official CurseForge](https://www.curseforge.com/minecraft/mc-mods/masterful-machinery-fork)
* [Latest third-party release / JAR](https://github.com/FrozenGalaxy/MasterfulMachinery/releases/latest)
* [Third-party source and build workflow](https://github.com/FrozenGalaxy/MasterfulMachinery)
* [Original upstream source](https://github.com/BOLTMAGIC/MasterfulMachinery)
