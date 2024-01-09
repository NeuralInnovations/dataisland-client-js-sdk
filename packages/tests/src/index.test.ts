import { version } from '../../../package.json'
import {
  appSdk,
  SDK_VERSION,
  DEFAULT_NAME,
  DEFAULT_HOST
} from 'data-island/dist'
import { BasicCredential } from 'data-island/dist/credentials'
import type { AppBuilder } from 'data-island/dist/appBuilder'
import { MiddlewareService } from 'data-island/dist/services/middlewareService'
import { CredentialService } from 'data-island/dist/services/credentialService'

test('SDK_VERSION', () => {
  expect(SDK_VERSION).toBe(version)
})

test('Default SDK', async () => {
  // default
  const app = await appSdk()
  expect(app.name).toBe(DEFAULT_NAME)
  expect(app.host).toBe(DEFAULT_HOST)
  expect(app.automaticDataCollectionEnabled).toBe(true)
})

test('Custom SDK settings', async () => {
  const app = await appSdk('test', async (builder: AppBuilder) => {
    builder.useHost('https://test.com')
    builder.useAutomaticDataCollectionEnabled(false)
    builder.useCredential(new BasicCredential('email', 'password'))
    builder.addMiddleware(async (req, next) => {
      req.headers.set('X-Test', 'test')
      await next()
    })
  })
  expect(app.name).toBe('test')
  expect(app.host).toBe('https://test.com')
  expect(app.automaticDataCollectionEnabled).toBe(false)
})

test('SDK, services', async () => {
  const app = await appSdk('test')
  const middlewareService = app.resolve(MiddlewareService)
  expect(middlewareService).not.toBeUndefined()
  expect(app.resolve(MiddlewareService)).toBe(middlewareService)
  expect(app.resolve(CredentialService)).not.toBeUndefined()
})
