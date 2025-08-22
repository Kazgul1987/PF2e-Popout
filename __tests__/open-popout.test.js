/** @jest-environment jsdom */

const { openPopout, savePopoutPosition } = require('../popout.js');

beforeEach(() => {
  window.open = jest.fn();
  Object.defineProperty(window, 'screen', {
    value: { availWidth: 3840, availHeight: 2160, availLeft: 0, availTop: 0 },
    configurable: true,
  });
  localStorage.clear();
});

test('uses negative coordinates within bounds', () => {
  savePopoutPosition(-100, 50);
  openPopout('about:blank', { width: 600, height: 400 });
  expect(window.open).toHaveBeenCalledWith(
    'about:blank',
    '',
    'left=-100,top=50,width=600,height=400'
  );
});

test('falls back when coordinates are outside available area', () => {
  savePopoutPosition(5000, 50);
  openPopout('about:blank', { width: 600, height: 400, left: 10, top: 20 });
  expect(window.open).toHaveBeenCalledWith(
    'about:blank',
    '',
    'left=10,top=20,width=600,height=400'
  );
});
