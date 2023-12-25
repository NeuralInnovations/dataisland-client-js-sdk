import { version } from '../../../package.json'
import { app, SDK_VERSION } from 'data-island/dist'

test('SDK_VERSION', () => {
  expect(SDK_VERSION).toBe(version)
})

test('API', () => {
  app()
})
