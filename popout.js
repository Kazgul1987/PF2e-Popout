const parentWindow = window.opener;

document.getElementById('send-roll').addEventListener('click', () => {
  const result = Math.floor(Math.random() * 20) + 1;
  parentWindow.postMessage({ type: 'roll', result }, '*');
});

document.getElementById('send-chat').addEventListener('click', () => {
  const message = document.getElementById('chat-input').value;
  parentWindow.postMessage({ type: 'chat', message }, '*');
  document.getElementById('chat-input').value = '';
});

window.addEventListener('message', (event) => {
  if (event.data === 'close') {
    window.close();
  }
});

const interval = setInterval(() => {
  if (!parentWindow || parentWindow.closed) {
    window.close();
    clearInterval(interval);
  }
}, 1000);
