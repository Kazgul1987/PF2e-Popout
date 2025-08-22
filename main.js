let popout;

document.getElementById('open-popout').addEventListener('click', () => {
  if (!popout || popout.closed) {
    popout = window.open('popout.html', 'pf2ePopout', 'width=600,height=400');
  } else {
    popout.focus();
  }
});

window.addEventListener('message', (event) => {
  const log = document.getElementById('log');
  if (event.data?.type === 'roll') {
    log.innerHTML += `<p>Roll: ${event.data.result}</p>`;
  } else if (event.data?.type === 'chat') {
    log.innerHTML += `<p>Chat: ${event.data.message}</p>`;
  }
});

window.addEventListener('beforeunload', () => {
  if (popout && !popout.closed) {
    popout.close();
  }
});
