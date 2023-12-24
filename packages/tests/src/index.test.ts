import { version } from '../../../package.json';
import { DataIsland } from '../../app/src/index.ts'

test('SDK_VERSION', () => {
  expect(DataIsland.SDK_VERSION).toBe(version);
});

test('API', () => {
  DataIsland.app();
});

