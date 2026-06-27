---
layout: default
title: "Step by Step Datapack Edition"
---

# Step by Step Datapack Edition

A step by step tutorial that will teach you how to create, edit and load Masterful Machinery blocks / structures / processing recipes into your game.

## [Masterful Machinery](../../minecraft/mc-mods/masterful-machinery/index.html)

1. Add Masterful Machinery to your modpack.
2. Come up with a real use case for the multiblock like do you want a grinder, a smelter, a power gen machine ect.
3. Load your game up once to generate the required MM folders.

---

Working with .json files can be a joy due to their simplicity and human-readable format, allowing for easy customization and configuration. However, they can also be challenging because even a minor syntax error, like a missing comma or bracket, can cause significant issues. By following this tutorial, you'll gain a solid understanding of structuring and editing .json files correctly, leading to a smoother and more enjoyable experience.

### Controller Files

1. Go to your `config` folder inside your modpacks instance.
2. Go to the `MM` folder, then to `controllers` folder.
3. Inside the controllers folder create a new text file and call it the name of your machine you want to create then add .json to end, (make sure the file isn't `blah_name.json.txt`, or `blah_name.txt.json` these will not work).

Make sure your file name is all lower case and if you must have a space to separate your words use a underscore instead `_` like so `drying_rack.json`

1. Open the new file you just created using any sort of text editor, `notepad` works, but we recommend using [Visual Studio Code](../../index.html), or [IntelliJ Community Edition](../../idea/download/__q8b6791ede917/index.html) as these programs will give you syntax highlighting and make it easier to code in json.
2. Paste the following into your new file.

   ```
   {
     "id": "coke_oven",
     "type": "mm:machine",
     "name": "Coke Oven"
   }
   ```

id must be the same as your json files name so if you called the json file sosig\_maker.json, then the id would be sosig\_maker

type we just leave alone as there is no other option for this at the moment

name can be anything you want, this is just a normal string and it can contain spaces, special characters, capitals and lowercase

Now that the controller file is done if you were to load up your game you would see the controller ingame WOOHOO, but alas this is useless without the rest of the files.

---

### Port Files

Next we must create the ports that we want to use, so if it's a solar panel for example we are trying to create then you would only need an RF energy port since we are relying on the power of the sun as an input for our recipe. But if its a furnace then we need a item input / output ports, maybe a energy port.

1. Goto `config/mm/ports` folder and create a new json file with the name styled like so `controller_name_port_type.json` e.g. `coke_oven_fluid.json`, `coke_oven_energy.json`
2. Inside that new json file we have to add some properties that define the port, depending on the port being used we have different properties check out [This Page](../../current/ports) for information about what stuff does + the different types of ports we can create.
3. Inside the port file, we add

   ```
   {
     "id": "coke_oven_item",
     "controllerIds": "mm:coke_oven",
     "name": "C_O Item Hatch -",
     "type": "mm:item",
     "config": {
       "rows": 3,
       "columns": 3
     }
   }
   ```

id must be the same as your json files name so if you called the json file sosig\_maker.json, then the id would be sosig\_maker

controllerIds ties back to the id you put inside your controller file

name can be anything you want, this is just a normal string and it can contain spaces, special characters, capitals and lowercase

type refers to the type of port you will be making, this ranges from item to fluid to even some modded support like mekanism gas, you can find a list of port types [Here](../../current/ports)

config is the config settings for that specific port type, each port type has different config settings so make sure to refer back to the port type wiki page to learn what to put here

Now if we were to load up the game we would see our controller block and our port block/blocks depending on how many you've added.

This is where it gets more complicated, so if you have been struggling this is only going to get harder sorry but ill try and explain everything to make it easier to understand.

---

### Structure Files

Structure files and Processing Recipe files MUST be loaded via datapack, Now we have 2 options here on how we want to load these files, We can either use [Openloader](../../minecraft/mc-mods/open-loader/index.html) or [KubeJS](../../minecraft/mc-mods/KubeJS/index.html), both of these options will have the exact same files but they have different file paths where you must place these files.

`modpackInstance`/`config`/`openloader`/`data`/`datapack_name`/`data`/`modpack_name`/`mm`/`structures`/`structure_file_here.json`

Do note if you use openloader you will need 1 more file for the datapack to work
inside the `datapack_name` folder you need to create a new file called `pack.mcmeta`

```
{
    "pack": {
        "pack_format": 15,
        "description": "Some text here describing this datapack"
    }
}
```

`modpackInstance`/`KubeJS`/`data`/`modpack_name`/`mm`/`structures`/`structure_file_here.json`

datpack\_name and modpack\_name is anything you want as long as it's all lowercase and it has no special characters except for underscores \_ . This is just a name that is unique to your datapack / modpack they can both have the same name if you want.

1. Right once all the folders are set up, load your game up then load into a world.
2. Start making your structure, this can be any block you want, any shape you want, just make sure to place your controller and port blocks into your structure where you want them.
3. Next type the command `/give @p mm:structure_scanner` to give yourself the structure scanner tool this will allow us to quickly make a structure file ready for us to save it in our datapack.
4. Now with the structure scanner tool in hand, right click one of the corners of your structure, then do the opposite corner to create a box around your structure.
5. CONTINUE REST OF STEP BY STEP WHEN THE STRUCTURE TOOL GETS ADDED
   currently I don't know how its going work (its currently not implemented) so I cant tell others how it works...
   If you need help with the structure file please join our discord and we can help further.
   there is an example structure file [Here](../../gallery/coke-oven#structure-file)
   This step will be updated with more info once the tool is released

---

### Processing Recipe Files

`modpackInstance`/`config`/`openloader`/`data`/`datapack_name`/`data`/`modpack_name`/`mm`/`processes`/`recipe_file_here.json`

`modpackInstance`/`KubeJS`/`data`/`modpack_name`/`mm`/`processes`/`recipe_file_here.json`

```
{
  "ticks": 300,
  "structureId": "modpack_name:coke_oven",
  "inputs": [
    {
      "type": "mm:input/consume",
      "ingredient": {
        "type": "mm:item",
        "tag": "minecraft:logs",
        "count": 1
      }
    }
  ],
  "outputs": [
    {
      "type": "mm:output/simple",
      "ingredient": {
        "type": "mm:item",
        "item": "minecraft:charcoal",
        "count": 1
      }
    },
    {
      "type": "mm:output/simple",
      "ingredient": {
        "type": "mm:fluid",
        "fluid": "KubeJS:creosote",
        "amount": 100
      }
    }
  ]
}
```

ticks is the duration that the recipe will process for, this integer is in the standard game speed for minecraft called Ticks, there is 20 ticks per second soo 100 ticks = 5 seconds, 200 ticks = 10 seconds ect

structureId is the path to the structure file you created previously, do note if you placed your structures into a folder inside the structures folder you will need to list that here also, e.g. `modpack_name/mm/structures/tier1/coke_oven.json`
so your structure id would be
`modpack_name:tier1/coke_oven`

inputs is an array `[ ]` of json objects `{ }` you can find more examples [Here](../../current/process-recipes/input-entries)

outputs is very similar to inputs but its slightly different you can fine examples [Here](../../current/process-recipes/output-entries)
