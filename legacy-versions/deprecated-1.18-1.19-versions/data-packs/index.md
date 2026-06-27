---
layout: default
title: "datapacks"
---

# datapacks

## Processes

A process file is the recipe file that the machine process to produce an output

## Duration

This is the processing length required to complete the process, this is measured in ticks, there is 20 ticks per second

so a duration of...

* 20 = 1 second
* 100 = 5 seconds
* 200 = 10 seconds
* 400 = 20 seconds
* 1200 = 1 minute
* 6000 = 5 minutes

Example

```
"duration": 400
```

## Name

this can be either `text` or a `translation` key

#### Text

```
  "name": {
    "text": "Solar Panel Blockstate Edition"
  },
```

#### Translation

```
  "name": {
    "translation": "gui.mm.solar_panel_recipe"
  },
```

## Structure Id

This is the structure id you set in one of your structure.json files

Do note that the namespace for the structureId is actually the namespace of the folder you put the structures into. so the `namespace` folder in this example `datapackName\data\namespace\mm\recipes\`

```
"structureId": "namespace:drying_rack"
```

Do note if you have your structure files in a folder you will need to write the entire path to them, for example if your structure is in a folder called structure1 `datapackName\data\namespace\mm\structures\structure1\cheese_maker.json` then your structure id is

```
"structureId": "namespace:structure1/cheese_maker"
```

---

## Input / Output Process Entries

## Entry - Port Designated

The `mm:port_designated` recipe entry, simple takes other recipe entries, but only checks and applies them to the designated port of the given id

#### The Recipe Entry Id

```
{
    "type": "mm:port_designated",
    ...
}
```

#### Full Definition

```
{
    "type": "mm:port_designated",
    "portId": "my_funky_port",
    "entry": {
        // another recipe entry goes here
        ...
    }
}
```

#### Common Example

This example (as an input) will consume `10000FE` of energy from the energy port which has been given the id (when defined in the structure) of "my\_funky\_port"

```
{
    "type": "mm:port_designated",
    "portId": "my_funky_port",
    "entry": {
        "type": "mm:simple",
        "ingredient": {
            "type": "mm:energy",
            "amount": 10000
        }
    }
}
```

## Entry - And Gate

If you need to use multiple requirements and processes within a single entry, use the `mm:gate/and` Entry Type.

This can be used inside of an `mm:gate/or` to effectively require "(a group on inputs) OR (an alternate group of inputs)"

This is a recursive recipe entry; meaning, you can effectively put recipe entries inside of recipe entries. Note this can get confusing (remember discord support is always an option. We are happy to help)

#### The Recipe Entry Id

```
{
    "type": "mm:gate/and",
    ...
}
```

#### Full Definition

```
{
    "type": "mm:gate/and",
    "conditions": [
        // list of recipe entry objects
        ...
    ] 
}
```

#### Common Example

```
{
    "type": "mm:gate/and",
    "conditions": [
        {
            "type": "mm:simple",
            "ingredient": {
                "type": "mm:energy",
                "amount": 1000 
            }
        },
        {
            "type": "mm:tick_modifier",
            "newDuration": 10
        }
    ] 
}
```

## Entry - Per Tick

For inputs, `mm:per_tick` will consume the specified ingredient every tick that the recipe is processing for.

For outputs, `mm:per_tick` will output the specified ingredient every tick that the recipe is processing for.

#### The Recipe Entry Id

```
{
    "type": "mm:per_tick",
    ...
}
```

#### Full Definition

```
{
    "type": "mm:per_tick",
    "ingredient": {
        // port type ingredient
        ...
    }
}
```

#### Common Example

```
{
    "type": "mm:per_tick",
    "ingredient": {
        "type": "mm:energy",
        "amount": 1000
    }
}
```

## Entry - Simple

For inputs, the `mm:simple` recipe entry defines a required ingredient with the option to specify a chance of the input being consumed.

For outputs, the `mm:simple` recipe entry defines an output ingredient also with the option to specify a chance of whether the ingredient will be output or not.

#### The Recipe Entry Id

```
{
    "type": "mm:simple",
    ...
}
```

#### Full Definition

```
{
    "type": "mm:simple",
    "chance": <chance between 0 (0% chance) to 1 (100% chance)>,
    "ingredient": {
        // port type ingredient
        ...
    }
}
```

#### Common Example

```
{
    "type": "mm:simple",
    "chance": 0.6,
    "ingredient": {
        "type": "mm:energy",
        "amount": 1000
    }
}
```

---

## Input / Output Ingredient Types

These are the ingredient types inside the input and output sections of a recipe.

## Input

This page defines what type of ingredient you can use as an input for your recipes.

### Base Mod

These types are already implemented into Masterful Machinery no extra addons are required.

**Example**

```
{
  "type": "mm:item",
  "item": "modId:blockId",
  "count": 1
}
```

**Full Example**

```
{
  "type": "mm:simple",
  "ingredient": {
    "type": "mm:item",
    "item": "minecraft:orange_concrete",
    "count": 1
  }
}
```

#### `mm:energy`

This type will allow you to use RF Energy as part of the recipe

**Example**

```
{
  "type": "mm:energy",
  "amount": intNumber
}
```

**Full Example**

```
{
  "type": "mm:simple",
  "ingredient": {
    "type": "mm:energy",
    "amount": 42069
  }
}
```

#### `mm:fluid`

This type will allow you to use liquids in your recipe.

**Example**

```
{
  "type": "mm:fluid",
  "fluid": "modId:fluidId",
  "amount": intNumber
}
```

**Full Example**

```
{
  "type": "mm:simple",
  "ingredient": {
    "type": "mm:fluid",
    "fluid": "minecraft:lava",
    "amount": 100
  }
}
```

#### `mm:dimension`

This type will allow you to limit what dimension your recipe can process in. You can only use this as a input requirement.

**Example**

```
{
  "type": "mm:dimension",
  "dimension": "modId:dimId"
}
```

**Full Example**

```
{
   "type": "mm:dimension",
   "dimension": "minecraft:the_end"
}
```

### Create mod

In order to use these ingredient types you must first have these dependencies

1. Create mod and its dependencies installed in your modpack
2. Created a `create_rotation` capable port inside your `config/ports` folder

#### `mm:create_rotation`

This type will allow you to use creates rotational force in order for your machine to operate.

**Example**

```
{
  "type": "mm:create_rotation",
  "speed": floatNumber
}
```

**Full Example**

```
{
  "type": "mm:simple",
  "ingredient": {
    "type": "mm:create_rotation",
    "speed": 256
  }
}
```

### Mekanism Mod

In order to use these ingredient types you must first have these dependencies

1. Mekanism mod and its dependencies installed in your modpack
2. Created a `mekanism_X` capable port inside your `config/ports` folder

#### `mm:mekanism_laser`

This can onl be used as a `input`, `output` will not work.

This type will accept Mekanism Lasers energy beams as an input for your machine.

**Example**

```
{
  "type": "mm:mekanism_laser",
  "energy": doubleNumber
}
```

**Full Example**

```
{
  "type": "mm:simple",
  "ingredient": {
    "type": "mm:mekansim_laser",
    "energy": 99123456789
  }
}
```

#### `mm:mekanism_gas`

This type will allow mekanism gasses to be used as an input for your machine.

**Example**

```
{
  "type": "mm:mekanism_gas",
  "gas": "modId:gasId",
  "amount": intNumber
}
```

**Full Example**

```
{
  "type": "mm:simple",
  "ingredient": {
    "type": "mm:mekanism_gas",
    "gas": "mekanism:hydrogen",
    "amount": 1000
  }
}
```

#### `mm:mekanism_heat`

This type will allow mekanism heat to be used as an input for your machine.

**Example**

```
{
  "type": "mm:mekanism_heat",
  "amount": intNumber
}
```

**Full Example**

```
{
  "type": "mm:simple",
  "ingredient": {
    "type": "mm:mekanism_heat",
    "amount": 3333
  }
}
```

#### `mm:mekanism_infuse`

This type will allow mekanism infuse types to be used as an input for your machine.

**Example**

```
{
  "type": "mm:mekanism_infuse",
  "infuseType": "modId:infuseId",
  "amount": intNumber
}
```

**Full Example**

```
{
  "type": "mm:simple",
  "ingredient": {
    "type": "mm:mekanism_infuse",
    "infuseType": "mekanism:redstone",
    "amount": 500
  }
}
```

#### `mm:mekanism_pigment`

This type will allow mekanism pigments to be used as an input for your machine.

**Example**

```
{
  "type": "mm:mekanism_pigment",
  "pigment": "modId:pigmentId",
  "amount": intNumber
}
```

**Full Example**

```
{
  "type": "mm:simple",
  "ingredient": {
    "type": "mm:mekanism_pigment",
    "pigment": "mekanism:pink",
    "amount": 500
  }
}
```

#### `mm:mekanism_slurry`

This type will allow mekanism slurries to be used as an input for your machine.

**Example**

```
{
  "type": "mm:mekanism_slurry",
  "slurry": "modId:slurryId",
  "amount": intNumber
}
```

**Full Example**

```
{
  "type": "mm:simple",
  "ingredient": {
    "type": "mm:mekanism_slurry",
    "slurry": "mekanism:dirty_copper",
    "amount": 666
  }
}
```

## Output

This page defines what type of ingredient you can use as an output for your recipes.

### Base Mod

These types are already implemented into Masterful Machinery no extra addons are required.

#### `mm:item`

This type will allow you to use items as part of the recipe, you CANNOT use tags it must be a single item output, though you can have multiple item output entries.

**Example**

```
{
  "type": "mm:item",
  "item": "modId:blockId",
  "count": 1
}
```

**Full Example**

```
{
  "type": "mm:simple",
  "ingredient": {
    "type": "mm:item",
    "item": "minecraft:orange_concrete",
    "count": 1
  }
}
```

#### `mm:energy`

This type will allow you to use RF Energy as part of the recipe

**Example**

```
{
  "type": "mm:energy",
  "amount": intNumber
}
```

**Full Example**

```
{
  "type": "mm:simple",
  "ingredient": {
    "type": "mm:energy",
    "amount": 42069
  }
}
```

#### `mm:fluid`

This type will allow you to use liquids in your recipe.

**Example**

```
{
  "type": "mm:fluid",
  "fluid": "modId:fluidId",
  "amount": intNumber
}
```

**Full Example**

```
{
  "type": "mm:simple",
  "ingredient": {
    "type": "mm:fluid",
    "fluid": "minecraft:lava",
    "amount": 100
  }
}
```

### Create mod

In order to use these ingredient types you must first have these dependencies

1. [Create mod](../../../minecraft/mc-mods/create/index.html) and its dependencies installed in your modpack
2. Created a `create_rotation` capable port inside your `config/ports` folder

#### `mm:create_rotation`

This type will allow you to use creates rotational force in order for your machine to operate.

**Example**

```
{
  "type": "mm:create_rotation",
  "speed": floatNumber
}
```

**Full Example**

```
{
  "type": "mm:simple",
  "ingredient": {
    "type": "mm:create_rotation",
    "speed": 256
  }
}
```

### Mekanism Mod

In order to use these ingredient types you must first have these dependencies

1. [Mekanism mod](../../../minecraft/mc-mods/mekanism/index.html) and its dependencies installed in your modpack
2. Created a `mekanism_X` capable port inside your `config/ports` folder

> Do note you cannot use Mekanism Laser as an output.

#### `mm:mekanism_gas`

This type will allow mekanism gasses to be used as an input for your machine.

**Example**

```
{
  "type": "mm:mekanism_gas",
  "gas": "modId:gasId",
  "amount": intNumber
}
```

**Full Example**

```
{
  "type": "mm:simple",
  "ingredient": {
    "type": "mm:mekanism_gas",
    "gas": "mekanism:hydrogen"
  }
}
```

#### `mm:mekanism_heat`

This type will allow mekanism heat to be used as an input for your machine.

**Example**

```
{
  "type": "mm:mekanism_heat",
  "amount": intNumber
}
```

**Full Example**

```
{
  "type": "mm:simple",
  "ingredient": {
    "type": "mm:mekanism_heat",
    "amount": 1000
  }
}
```

#### `mm:mekanism_infuse`

This type will allow mekanism infuse types to be used as an input for your machine.

**Example**

```
{
  "type": "mm:mekanism_infuse",
  "infuseType": "modId:infuseId",
  "amount": intNumber
}
```

**Full Example**

```
{
  "type": "mm:simple",
  "ingredient": {
    "type": "mm:mekanism_infuse",
    "infuseType": "mekanism:redstone",
    "amount": 1000
  }
}
```

#### `mm:mekanism_pigment`

This type will allow mekanism pigments to be used as an input for your machine.

**Example**

```
{
  "type": "mm:mekanism_pigment",
  "pigment": "modId:pigmentId",
  "amount": intNumber
}
```

**Full Example**

```
{
  "type": "mm:simple",
  "ingredient": {
    "type": "mm:mekanism_pigment",
    "pigment": "mekanism:orange",
    "amount": 125
  }
}
```

#### `mm:mekanism_slurry`

This type will allow mekanism slurries to be used as an input for your machine.

**Example**

```
{
  "type": "mm:mekanism_slurry",
  "slurry": "modId:slurryId",
  "amount": intNumber
}
```

**Full Example**

```
{
  "type": "mm:simple",
  "ingredient": {
    "type": "mm:mekanism_slurry",
    "slurry": "mekanism:dirty_copper",
    "amount": 333
  }
}
```

---

## Structures

structures are the json defined blocks and their placement relative to the controller.

### Define a simple Structure

```
{
    "controllerId": "mm:my_controller",
    "name": {
        "text": "My Structure"
    },
    "layout": [
        // Each array inside of the layout is a new y level for your structure
        // The top array is the heighest y level of your structure
        [
            // You must define uppercase C only once, it tells the structure where the controller will be placed
            // Make sure you put the controller and the structure facing upwards in the file or in other words facing north
            "ACA",
            "BBB",
            "DDD"
        ],
        [
            "EEE",
            "EEE",
            "EEE"
        ]
    ]
    // next you find the key object which defines the structure parts for each letter in your layout
    "key": {
        // this is the structure part, it defines what the character from the layout actually stands for
        "A": {
            "type": "mm:block",
            "block": "minecraft:glass"
        },
        "B": {
            "type": "mm:block",
            "block": "minecraft:sand"
        },
        "D": {
            "type": "mm:tag",
            "tag": "minecraft:wool"
        },
        "E": {
            "type": "mm:block",
            "block": "minecraft:dirt"
        }
    }
}
```

## Controller Id

This is the id you set in the controller file in the config folder

```
"controllerId": "mm:solar_panel"
```

## Layout

These are arrays of strings where each line represents a block layout like you where looking down on a slice of your machine.

The top of the array is `north`, bottom `south`, right is `east`, left is `west`

Each array is a different Y level in your structure, the top layer in the file is the very top layer of your structure

A capital `C` is specifically reserved for the controller, this is automatically defined by setting the `controllerId` at the top of the file

For a structure file to be valid it needs to have a capital `C` in the layout somewhere

The code below is of a 3x3x3 structure, where...

* 1 = cobblestone (Very top layer)
* 2 = stone (Central layer)
* 3 = oak\_log (Very bottom layer)
* C = the controller

```
"layout": [
  [
    "111",
    "111",
    "111"
  ],
  [
    "2C2",
    "222",
    "222"
  ],
  [
    "333",
    "333",
    "333"
  ]
]
```

## Name

this can be either `text` or a `translation` key

#### Text

```
  "name": {
    "text": "Solar Panel Blockstate Edition"
  },
```

#### Translation

```
  "name": {
    "translation": "gui.mm.solar_panel_structure"
  },
```

---

## Structure Part - And

The `mm:and` structure part is quite a cool part, this structure part will make it so the one block space MUST have both of the required properties inorder for it to be correct. e.g. A daylight detector and a specific power level of that daylight detector.

#### The Structure Part Id

```
{
    "type": "mm:and",
    ...
}
```

#### Full Definition

```
"D": {
  "type": "mm:and",
  "parts": [
    {
      "type": "mm:block",
      "block": "<block id>"
    },
    {
      "type": "mm:blockstate",
      "blockstates": {
        "<state>": "<Value>"         <-- All values must be encased in double quotes even integers and booleans
      }
    }
  ]
}
```

#### Full Example

```
"D": {
  "type": "mm:and",
  "parts": [
    {
      "type": "mm:block",
      "block": "minecraft:daylight_detector"
    },
    {
      "type": "mm:blockstate",
      "blockstates": {
        "inverted": "true"
      }
    }
  ]
}
```

## Key

Each key has to be unique and must be one of these characters `a-z`, `A-Z`, `0-9`, `!@#$%^&*`, but not capital `C` as this is reserved for the controller

Note: a-z and A-Z are different characters so having "a" and "A" as 2 keys is perfectly valid

:memo:

You dont have to define the controller in the list of keys, since we put this information in the `controllerId` value at the top, but you still need `C` in the layout

#### What are Structure Parts?

Structure Parts are different types of json objects which can be used in the key of a structure. To define what and where each block goes. You can have and / or gates in this as well.

## Structure Part - Block

The `mm:block` structure part is simply a key for a specific block in a structure.

#### The Structure Part Id

```
{
    "type": "mm:block",
    ...
}
```

#### Full Definition

```
{
    "type": "mm:block",
    "block": "<block id>"
}
```

#### Full Example

```
{
    "type": "mm:block",
    "block": "minecraft:glass"
}
```

## Structure Part - Or

The `mm:or` structure part is quite a cool part, this structure part will make it so the one block space can have EITHER the first entry or the second inorder for it to be correct.

e.g. A daylight detector and a sponge, inorder for it to detect complete one of these 2 blocks must be in the blockspace.

#### The Structure Part Id

```
{
    "type": "mm:or",
    ...
}
```

#### Full Definition

```
"D": {
  "type": "mm:or",
  "parts": [
    {
      "type": "mm:block",
      "block": "<block id>"
    },
    {
      "type": "mm:block",
      "block": "<block id>"
    }
  ]
}
```

#### Full Example

```
"D": {
  "type": "mm:or",
  "parts": [
    {
      "type": "mm:block",
      "block": "minecraft:daylight_detector"
    },
    {
      "type": "mm:block",
      "block": "minecraft:sponge"
    }
  ]
}
```

## Structure Part - Port

The `mm:port` structure part defines a key for a port block as defined in the config jsons

#### The Structure Part Id

```
{
    "type": "mm:port",
    ...
}
```

#### Full Definition

```
{
    "type": "mm:port",
    // the id field is optional, it is used for the mm:port_designated recipe entry to designate specific ports in a structure for an ingredient 
    "id": "<unique id of port in structure>",
    "port": "<port type id>",
    "input": <true|false>
}
```

#### Full Example

```
{
    "type": "mm:port",
    // the id field is optional, it is used for the mm:port_designated recipe entry to designate specific ports in a structure for an ingredient 
    "id": "my_funky_port",
    "port": "mm:item",
    "input": false
}
```

## Structure Part - Port Block

The `mm:block` structure part is simply a key for a specific block in a structure.

#### The Structure Part Id

```
{
    "type": "mm:port_block",
    ...
}
```

#### Full Definition

```
{
    "type": "mm:port_block",
    // the id field is optional, it is used for the mm:port_designated recipe entry to designate specific ports in a structure for an ingredient 
    "id": "<unique id of port in structure>",
    "portId": "<id of the port you created in the config>"
}
```

#### Full Example

```
{
    "type": "mm:port_block",
    // the id field is optional, it is used for the mm:port_designated recipe entry to designate specific ports in a structure for an ingredient 
    "id": "my_funky_port",
    "portId": "mm:large_item_input"
}
```
