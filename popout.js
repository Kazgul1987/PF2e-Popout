const parentWindow = window.opener;
const TRUSTED_ORIGIN = window.location.origin;

document.getElementById('send-roll').addEventListener('click', () => {
  const result = Math.floor(Math.random() * 20) + 1;
  parentWindow.postMessage({ type: 'roll', result }, TRUSTED_ORIGIN);
});

document.getElementById('send-chat').addEventListener('click', () => {
  const message = document.getElementById('chat-input').value;
  parentWindow.postMessage({ type: 'chat', message }, TRUSTED_ORIGIN);
  document.getElementById('chat-input').value = '';
});

window.addEventListener('message', (event) => {
  if (event.origin !== TRUSTED_ORIGIN) return;

  if (event.data === 'close') {
    window.close();
  }
});

const interval = setInterval(() => {
  if (!parentWindow || parentWindow.closed) {
    window.close();
    clearInterval(interval);
  }
}, 1000);

const STORAGE_KEY = 'pf2e-popout-coordinates';

/**
 * Persist coordinates for where the pop-out window should appear.
 * @param {number} left - The x-coordinate of the window.
 * @param {number} top - The y-coordinate of the window.
 */
export function savePopoutPosition(left, top) {
  if (typeof left !== 'number' || typeof top !== 'number') return;
  const data = { left, top };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Open a new window using the stored coordinates. If the coordinates are
 * outside of the available screen space (e.g. a second monitor is not
 * connected), the window falls back to the primary monitor.
 *
 * @param {string} url - URL to load in the new window.
 * @param {object} [options={}] - Optional additional features for window.open.
 * @param {string} [options.name] - Name of the window.
 * @param {number} [options.width] - Desired width of the window.
 * @param {number} [options.height] - Desired height of the window.
 * @param {number} [options.left] - Fallback left coordinate.
 * @param {number} [options.top] - Fallback top coordinate.
 * @returns {Window|null} - Reference to the opened window or null on failure.
 */
export function openPopout(url, options = {}) {
  const stored = localStorage.getItem(STORAGE_KEY);
  let left, top;
  if (stored) {
    try {
      ({ left, top } = JSON.parse(stored));
    } catch {
      ({ left, top } = {});
    }
  }

  const availWidth = window.screen?.availWidth ?? window.innerWidth;
  const availHeight = window.screen?.availHeight ?? window.innerHeight;

  if (
    typeof left !== 'number' ||
    typeof top !== 'number' ||
    left < 0 ||
    top < 0 ||
    left > availWidth ||
    top > availHeight
  ) {
    // Fallback to provided options or origin screen if coordinates are invalid.
    left = options.left ?? 0;
    top = options.top ?? 0;
  }

  const features = [`left=${left}`, `top=${top}`];
  if (options.width) features.push(`width=${options.width}`);
  if (options.height) features.push(`height=${options.height}`);

  return window.open(url, options.name ?? '', features.join(','));
}
