/* global game */

const HOOKS = [
  'renderActorSheetPF2e',
  'renderCombatTracker',
  'renderJournalSheet',
  'renderJournalPageSheet',
  'renderJournalTextSheet',
];

const ICON_HTML = '<i class="fas fa-tv"></i>';

function addPopoutButton(app, html) {
  const root = html instanceof HTMLElement ? html : html[0];
  const appElement = root?.closest('.app');
  if (!appElement) {
    return;
  }

  const buttonClass = 'popout-header-button';
  const titleElement = appElement.querySelector('header .window-title');
  if (
    !titleElement ||
    titleElement.parentElement.querySelector(`.${buttonClass}`)
  ) {
    return;
  }

  const button = document.createElement('a');
  button.classList.add(buttonClass);
  const label = game.i18n.localize('PF2E.PopOut');
  button.title = label;
  button.setAttribute('aria-label', label);
  button.innerHTML = ICON_HTML;
  button.addEventListener('click', (event) => {
    event.preventDefault();
    if (typeof app.popOut === 'function') {
      app.popOut();
    } else {
      app.render(true, { popout: true, focus: true });
    }
  });

  const headerButtons = appElement.querySelector('header .header-buttons');
  if (headerButtons) {
    headerButtons.prepend(button);
  } else {
    titleElement.parentElement.appendChild(button);
  }
}

HOOKS.forEach((hook) => Hooks.on(hook, addPopoutButton));
