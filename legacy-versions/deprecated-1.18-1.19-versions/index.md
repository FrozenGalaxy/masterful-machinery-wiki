---
layout: default
title: "Deprecated 1.18-1.19 Versions"
---

# Deprecated 1.18-1.19 Versions

> Note: this version of the documentation has been compiled into a single file for simplicity.

## Config

These files belong in the MM folder inside the configs folder, these files are used to create and define controllers and ports

`modpackInstance\config\mm\`

## Controllers

This file is used to create and define a controller block

## Id

This is the ID of the controller multiblock, this gets used when creating structure files

Example

```
{
  "id": "solar_panel"
}
```

## Name

this can be either `text` or a `translation` key

#### Text

```
  "name": {
    "text": "Cool Controller Name"
  },
```

#### Translation

```
  "name": {
    "translation": "gui.mm.solar_panel_controller"
  },
```

## Type

Not sure why but this must be `"mm:fixed"`

```
{
  "type": "mm:fixed"
}
```

---

## Ports

This file is used to create and define a port block

## Id

This is a unique id for this port, it is used when your outputting/inputting items/fluids/ect from/into specific ports

## Input

Defines if this port is a input port or a output port

## Name

This can be either `text` or a `translation` key

#### Text

```
  "name": {
    "text": "Giant Item Input"
  },
```

#### Translation

```
  "name": {
    "translation": "block.mm.solar_panel_item_input_port"
  },
```

## Port

This defines what type of port this port is

So far these ports are implemented

#### Base Mod

* `mm:item`
* `mm:energy`
* `mm:fluid`

#### Needs Mekanism Mod

* `mm:mekanism_laser`
* `mm:mekanism_gas`
* `mm:mekanism_heat`
* `mm:mekanism_infuse`
* `mm:mekanism_pigment`
* `mm:mekanism_slurry`

#### Needs Create mod

* `mm:create_rotation`

## Capacity

Capacity is used for these ports types

* `mm:energy`
* `mm:fluid`
* `mm:mekanism_gas`
* `mm:mekanism_heat`
* `mm:mekanism_infuse`
* `mm:mekanism_pigment`
* `mm:mekanism_slurry`

Example

```
  "config": {
    "capacity": 20000000
  }
```

## Config

These settings can be used for both input and output ports

## Slots

Slots is used for these ports types

* `mm:item`

`"slotRows"` is used for setting the amount of rows that you will see inside the item port. (Rows is left to right slots) `"slotCols"` is used for setting the amount of columns that you will see inside the item port. (Columns is up to down slots)

A standard chest has 3 rows and 9 columns.

Example

```
  "config": {
    "slotRows": 3,
    "slotCols": 3
  }
```

## Stress

Slots is used for these ports types

* `mm:create_rotation`

Example

```
  "config": {
    "stress": 10
  }
```
