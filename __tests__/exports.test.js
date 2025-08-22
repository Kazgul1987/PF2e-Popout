jest.mock('../popout', () => ({
  savePopoutPosition: jest.fn(),
  openPopout: jest.fn(),
}));

const { savePopoutPosition, openPopout } = require('../src/index');

test('module re-exports helper functions', () => {
  expect(savePopoutPosition).toBeDefined();
  expect(openPopout).toBeDefined();
});

