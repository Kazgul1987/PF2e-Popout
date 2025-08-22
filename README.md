
# PF2e-Popout

A minimal utility demonstrating pop-out behaviour along with linting,
formatting, and testing setup.

## Installation

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Use `npm test` to run tests. Ensure dependencies are installed first by running `npm install`.
4. Use `npm run lint` to lint the code and `npm run format` to apply Prettier formatting.
5. For Foundry VTT, install the module by pointing Foundry to the [manifest file](https://raw.githubusercontent.com/yourname/PF2e-Popout/main/module.json).

## Functionality

- Exports `savePopoutPosition` and `openPopout` from `src/index.js`. These helpers
  store preferred window coordinates and open new windows using those saved
  positions.

## Known Limitations

- Only basic functionality is provided at this stage.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Releases

Published releases include `module.json` so Foundry can install the module directly from the manifest URL above.


# PF2e Popout

A minimal demonstration that opens a pop-out window and communicates back to the main window. The pop-out closes automatically when the main window reloads or closes.

## Usage

Open `index.html` in a browser and press **Open Popout**. The pop-out window can send random dice rolls or chat messages via `window.postMessage`. Messages are displayed in the main window. Closing or reloading the main window will also close the pop-out.

# PF2e-Popout

Adds a monitor icon button to PF2e actor sheets, the combat tracker, and journal sheets.
Clicking the button pops the sheet out into a separate window.
Helpers for opening browser windows at user-defined screen coordinates.

## Usage

```javascript
import { savePopoutPosition, openPopout } from 'pf2e-popout';

// Store preferred coordinates, e.g. on a second monitor.
savePopoutPosition(1920, 100);

// Open the window using the saved coordinates with automatic fallback.
openPopout('https://example.com', { width: 600, height: 400 });
```

`openPopout` verifies that the saved `left`/`top` fall within the overall
available desktop space, allowing negative or large coordinates for monitors
positioned to the left, right, above, or below the primary display. If the
target monitor is not connected, the window falls back to the primary screen.

