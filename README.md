# Haptic Song Studio — HAAPS Pattern Composer

Haptic Song Studio is a browser-based composer for **HAAPS-style haptic songs**.  
It lets you build patterns as JSON and paste them directly into your app’s `haaps.registerPatterns` call.

## Features

- Visual segment editor (type, intensity, duration, direction, texture)
- Live JSON output following the `HaapsPattern` schema
- Quick presets (Rising Swell, Heartbeat, Orbit Loop)
- Copy-to-clipboard for easy integration
- No network calls — everything runs locally in the browser

## Usage

1. Open `index.html` in a modern browser.
2. Adjust **Song / Pattern ID**, channel, and description.
3. Add or edit segments:
   - **Type:** `pulse`, `ramp`, or `texture`
   - **Intensity:** `0.0–1.0`
   - **Duration:** milliseconds
   - **Direction:** `left`, `right`, `top`, `bottom`, `center` (optional)
   - **Texture ID:** free-form string (optional)
4. Copy the JSON from the right panel.

Example integration:

```ts
import { haaps } from "@space-leaf/haaps";
import pattern from "./myPattern.json"; // exported from the studio

haaps.registerPatterns("space.leaf.corp.app", [pattern]);


Schema

The JSON output conforms to haaps-schema.json in this repo.

License

Copyright © Space LEAF Corp.


---
