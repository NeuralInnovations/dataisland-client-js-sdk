import { version } from '../../../package.json';
import { DataIsland } from 'data-island/dist';

test('SDK_VERSION', () => {
  expect(DataIsland.SDK_VERSION).toBe(version);
});

test('API', () => {
  DataIsland.app();
});
