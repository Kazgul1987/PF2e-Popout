# PF2e Popout

A minimal demonstration that opens a pop-out window and communicates back to the main window. The pop-out closes automatically when the main window reloads or closes.

## Usage

Open `index.html` in a browser and press **Open Popout**. The pop-out window can send random dice rolls or chat messages via `window.postMessage`. Messages are displayed in the main window. Closing or reloading the main window will also close the pop-out.
