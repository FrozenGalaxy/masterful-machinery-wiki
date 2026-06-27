---
layout: default
title: "KubeJS Support"
---

# KubeJS Support

Masterful Machinery can be configured with KubeJS instead of, or alongside, JSON files. Use startup events for generated block definitions and server events for datapack-like content.

All events are exposed through `MMEvents`.

## Event overview

```js
MMEvents.registerControllers(event => {})
MMEvents.registerPorts(event => {})
MMEvents.registerExtraBlocks(event => {})
MMEvents.createStructures(event => {})
MMEvents.createProcesses(event => {})
```

| Event | Script side | Purpose |
|---|---|---|
| `registerControllers` | startup | Register controller blocks. |
| `registerPorts` | startup | Register port blocks. |
| `registerExtraBlocks` | startup | Register decorative/helper blocks. |
| `createStructures` | server | Register structure definitions. |
| `createProcesses` | server | Register process recipes. |

## Pages

* [Register controllers](./register-controller/)
* [Register ports](./register-port/)
* [Register extra blocks](./register-extra-blocks/)
* [Create structures](./create-structures/)
* [Create process recipes](./create-process-recipes/)
