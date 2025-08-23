const parentWindow = window.opener;
const TRUSTED_ORIGIN = window.location.origin;

if (window.jQuery) {
  const $rollBtn = $('#send-roll');
  if ($rollBtn.length) {
    $rollBtn.on('click', () => {
      const result = Math.floor(Math.random() * 20) + 1;
      parentWindow.postMessage({ type: 'roll', result }, TRUSTED_ORIGIN);
    });
  }

  const $chatBtn = $('#send-chat');
  if ($chatBtn.length) {
    $chatBtn.on('click', () => {
      const message = $('#chat-input').val();
      parentWindow.postMessage({ type: 'chat', message }, TRUSTED_ORIGIN);
      $('#chat-input').val('');
    });
  }

  $(window).on('message', (event) => {
    const e = event.originalEvent;
    if (e.origin !== TRUSTED_ORIGIN) return;

    if (e.data === 'close') {
      window.close();
    }
  });
} else {
  const rollBtn = document.getElementById('send-roll');
  if (rollBtn)
    rollBtn.addEventListener('click', () => {
      const result = Math.floor(Math.random() * 20) + 1;
      parentWindow.postMessage({ type: 'roll', result }, TRUSTED_ORIGIN);
    });

  const chatBtn = document.getElementById('send-chat');
  if (chatBtn)
    chatBtn.addEventListener('click', () => {
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
}

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
function savePopoutPosition(left, top) {
  if (typeof left !== 'number' || typeof top !== 'number') return;
  const data = { left, top };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Open a new window using the stored coordinates. Width and height default to
 * 600x400 when not provided. If the stored coordinates plus the window size
 * exceed the available screen space (e.g. a second monitor is not connected),
 * the window falls back to the provided `left`/`top` options or `0`.
 *
 * @param {string} url - URL to load in the new window.
 * @param {object} [options={}] - Optional additional features for window.open.
 * @param {string} [options.name] - Name of the window.
 * @param {number} [options.width] - Desired width of the window. Defaults to 600.
 * @param {number} [options.height] - Desired height of the window. Defaults to 400.
 * @param {number} [options.left] - Fallback left coordinate.
 * @param {number} [options.top] - Fallback top coordinate.
 * @returns {Window|null} - Reference to the opened window or null on failure.
 */
function openPopout(url, options = {}) {
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
  const availLeft = window.screen?.availLeft ?? 0;
  const availTop = window.screen?.availTop ?? 0;
  const availRight = availLeft + availWidth;
  const availBottom = availTop + availHeight;

  const defaultWidth = 600;
  const defaultHeight = 400;
  const width = options.width ?? defaultWidth;
  const height = options.height ?? defaultHeight;

  if (
    typeof left !== 'number' ||
    typeof top !== 'number' ||
    left + width < availLeft ||
    top + height < availTop ||
    left > availRight ||
    top > availBottom
  ) {
    // Fallback to provided options or origin screen if coordinates are invalid.
    left = options.left ?? availLeft;
    top = options.top ?? availTop;
  }

  const features = [
    `left=${left}`,
    `top=${top}`,
    `width=${width}`,
    `height=${height}`,
  ];

  return window.open(url, options.name ?? '', features.join(','));
}

module.exports = {
  savePopoutPosition,
  openPopout,
};
