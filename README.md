# PF2e-Popout

Adds a monitor icon button to PF2e actor sheets, the combat tracker, and journal sheets.
Clicking the button pops the sheet out into a separate window.
Helpers for opening browser windows at user-defined screen coordinates.

## Usage

```javascript
import { savePopoutPosition, openPopout } from './popout.js';

// Store preferred coordinates, e.g. on a second monitor.
savePopoutPosition(1920, 100);

// Open the window using the saved coordinates with automatic fallback.
openPopout('https://example.com', { width: 600, height: 400 });
```

`openPopout` verifies that the saved `left`/`top` fit within the current
available screen space. If the target monitor is not connected, the window
falls back to the primary screen.

