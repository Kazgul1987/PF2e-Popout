// Fügt Actor-Sheets einen Button hinzu, der das Sheet in einem neuen Fenster öffnet
Hooks.on("renderActorSheet", (app, html, data) => {
  if (!app.popOut) return;

  const popBtn = $(`<a class="popout-window"><i class="fas fa-external-link-alt"></i></a>`);
  popBtn.attr("title", "In neuem Fenster öffnen");
  popBtn.on("click", () => openPopout(app));

  html.closest(".app").find(".window-title").after(popBtn);
});

function openPopout(app) {
  const win = window.open("", "", "width=600,height=800,resizable=yes,scrollbars=yes");
  if (!win) return;

  // Übernimmt CSS/Fonts des Hauptfensters
  win.document.head.innerHTML = document.head.innerHTML;

  // Rendert eine neue Sheet-Instanz im Popout-Fenster
  const popSheet = new app.constructor(app.object, { popOut: false });
  popSheet.render(true, { appendTo: win.document.body });

  // Aufräumen, sobald das Popout-Fenster geschlossen wird
  win.addEventListener("beforeunload", () => popSheet.close({ force: true }));
}
