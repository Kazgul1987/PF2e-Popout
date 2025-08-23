let popout;
const TRUSTED_ORIGIN = window.location.origin;

$('#open-popout').on('click', () => {
  if (!popout || popout.closed) {
    popout = window.open('popout.html', 'pf2ePopout', 'width=600,height=400');
  } else {
    popout.focus();
  }
});

$(window).on('message', (event) => {
  const e = event.originalEvent;
  if (e.origin !== TRUSTED_ORIGIN) return;

  const $log = $('#log');
  if (e.data?.type === 'roll') {
    $log.append(`<p>Roll: ${e.data.result}</p>`);
  } else if (e.data?.type === 'chat') {
    $log.append(`<p>Chat: ${e.data.message}</p>`);
  }
});

$(window).on('beforeunload', () => {
  if (popout && !popout.closed) {
    popout.close();
  }
});
