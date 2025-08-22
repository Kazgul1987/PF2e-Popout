/** @jest-environment jsdom */

const en = require('../lang/en.json');
const de = require('../lang/de.json');

let addPopoutButton;

global.Hooks = { on: (hook, cb) => { addPopoutButton = cb; } };

require('../src/popout-buttons.js');

describe.each([
  ['en', en['PF2E.PopOut']],
  ['de', de['PF2E.PopOut']],
])('addPopoutButton localization %s', (lang, label) => {
  beforeEach(() => {
    document.body.innerHTML =
      '<div class="app"><header><h1 class="window-title"></h1><div class="header-buttons"></div></header></div>';
    global.game = { i18n: { localize: () => label } };
  });

  test(`uses localized label for ${lang}`, () => {
    const app = { popOut: jest.fn() };
    const html = [document.querySelector('.app')];

    addPopoutButton(app, html);

    const button = document.querySelector('header .header-buttons a');
    expect(button.title).toBe(label);
    expect(button.getAttribute('aria-label')).toBe(label);
  });
});
