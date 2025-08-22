const HOOKS = [
  'renderActorSheetPF2e',
  'renderCombatTracker',
  'renderJournalSheet',
];

const ICON_HTML = '<i class="fas fa-tv"></i>';

function addPopoutButton(app, html) {
  const appElement = html[0] && html[0].closest('.app');
  if (!appElement) {
    return;
  }

  const buttonClass = 'popout-header-button';
  const titleElement = appElement.querySelector('header .window-title');
  if (!titleElement || titleElement.parentElement.querySelector(`.${buttonClass}`)) {
    return;
  }

  const button = document.createElement('a');
  button.classList.add(buttonClass);
  button.title = 'Pop out';
  button.innerHTML = ICON_HTML;
  button.addEventListener('click', event => {
  if (
    titleElement.length === 0 ||
    titleElement.siblings(`.${buttonClass}`).length
  ) {
    return;
  }

  const button = $(
    `<a class="${buttonClass}" title="Pop out">${ICON_HTML}</a>`,
  );
  button.on('click', (event) => {
    event.preventDefault();
    if (typeof app.popOut === 'function') {
      app.popOut();
    } else {
      app.render({ force: true }, { popout: true });
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
