const HOOKS = [
  'renderActorSheetPF2e',
  'renderCombatTracker',
  'renderJournalSheet',
];

const ICON_HTML = '<i class="fas fa-tv"></i>';

function addPopoutButton(app, html) {
  const titleElement = html.closest('.app').find('header .window-title');
  const buttonClass = 'popout-header-button';
  if (titleElement.length === 0 || titleElement.siblings(`.${buttonClass}`).length) {
    return;
  }

  const button = $(`<a class="${buttonClass}" title="Pop out">${ICON_HTML}</a>`);
  button.on('click', event => {
    event.preventDefault();
    if (typeof app.popOut === 'function') {
      app.popOut();
    } else {
      app.render(true, { popout: true });
    }
  });

  const headerButtons = html.closest('.app').find('header .header-buttons');
  if (headerButtons.length) {
    headerButtons.prepend(button);
  } else {
    titleElement.parent().append(button);
  }
}

HOOKS.forEach(hook => Hooks.on(hook, addPopoutButton));

