const { savePopoutPosition, openPopout } = require('../popout');

module.exports = {
  /** Store preferred pop-out window coordinates. */
  savePopoutPosition,
  /** Open a window using stored coordinates with fallback logic. */
  openPopout,
};

