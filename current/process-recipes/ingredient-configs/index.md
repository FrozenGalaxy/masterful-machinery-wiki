---
layout: default
title: "Ingredient Configs"
---

# Ingredient Configs

Ingredient configs are shared by inputs and outputs. The `type` field decides which port type can provide or receive the ingredient.

## Item ingredient

Specific item:

```json
{
  "type": "mm:item",
  "item": "minecraft:string",
  "count": 5
}
```

Item tag:

```json
{
  "type": "mm:item",
  "tag": "forge:ingots",
  "count": 5
}
```

Optional NBT matching:

```json
{
  "type": "mm:item",
  "item": "minecraft:stick",
  "count": 1,
  "nbt": { "CustomModelData": 1 },
  "nbt_match": "weak"
}
```

## Fluid ingredient

```json
{
  "type": "mm:fluid",
  "fluid": "minecraft:water",
  "amount": 1000
}
```

`1000` mB is one bucket.

## Energy ingredient

```json
{
  "type": "mm:energy",
  "amount": 1000
}
```

`amount` is Forge Energy (`FE`).

## Mekanism ingredients

Gas:

```json
{
  "type": "mm:mekanism/gas",
  "gas": "mekanism:hydrogen",
  "amount": 10
}
```

Slurry:

```json
{
  "type": "mm:mekanism/slurry",
  "slurry": "mekanism:clean_tin",
  "amount": 10
}
```

Pigment:

```json
{
  "type": "mm:mekanism/pigment",
  "pigment": "mekanism:blue",
  "amount": 20
}
```

Infusion:

```json
{
  "type": "mm:mekanism/infuse",
  "infuse": "mekanism:bio",
  "amount": 20
}
```

## Create kinetic ingredient

```json
{
  "type": "mm:create/kinetic",
  "speed": 16
}
```

## PneumaticCraft air ingredient

```json
{
  "type": "mm:pneumaticcraft/air",
  "pressure": 0.7,
  "air": 100
}
```

## Botania mana ingredient

```json
{
  "type": "mm:botania/mana",
  "amount": 1000
}
```

## Summary table

| Type | Main fields |
|---|---|
| `mm:item` | `item` or `tag`, `count`, optional `nbt`, optional `nbt_match` |
| `mm:fluid` | `fluid`, `amount` |
| `mm:energy` | `amount` |
| `mm:create/kinetic` | `speed` |
| `mm:pneumaticcraft/air` | `pressure`, `air` |
| `mm:botania/mana` | `amount` |
| `mm:mekanism/gas` | `gas`, `amount` |
| `mm:mekanism/slurry` | `slurry`, `amount` |
| `mm:mekanism/pigment` | `pigment`, `amount` |
| `mm:mekanism/infuse` | `infuse`, `amount` |
