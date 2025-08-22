const { popout } = require('../src/index');

test('popout returns message', () => {
  expect(popout('example')).toBe('Popout created for example');
});
