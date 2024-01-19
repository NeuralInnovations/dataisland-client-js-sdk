import { version } from '../package.json'
import {
  AppSdk,
  BasicCredential,
  appSdk,
  SDK_VERSION,
  DEFAULT_NAME,
  DEFAULT_HOST
} from '../src'
import { MiddlewareService } from '../src/services/middlewareService'
import { CredentialService } from '../src/services/credentialService'
import { RpcService } from '../src/services/rpcService'
import { AppBuilder } from '../src/appBuilder'

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
      await next(req)
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
  expect(app.resolve(RpcService)).not.toBeUndefined()
  expect(app.resolve(RpcService)).toBeInstanceOf(RpcService)
})

test('SDK, middleware', async () => {
  const app = await appSdk('test')
  const middlewareService = app.resolve(MiddlewareService)
  expect(middlewareService).not.toBeUndefined()
  expect(app.resolve(MiddlewareService)).toBe(middlewareService)
  expect(app.resolve(CredentialService)).not.toBeUndefined()

  const response = await middlewareService?.process(
    new Request('http://localhost:8080'),
    async (req: Request): Promise<Response> => {
      const headerXTest = req.headers.get('Custom-Test-Header')
      expect(headerXTest).toBeNull()
      return new Response('', { status: 200 })
    }
  )
  expect(response).not.toBeUndefined()
  expect(response?.status).toBe(200)

  middlewareService?.useMiddleware(async (req, next) => {
    req.headers.set('X-Test', 'test-value')
    await next(req)
  })

  const response2 = await middlewareService?.process(
    new Request('https://localhost:8080'),
    async (req: Request): Promise<Response> => {
      expect(req.headers.get('X-Test')).toBe('test-value')
      return new Response('', { status: 400 })
    }
  )
  expect(response2).not.toBeUndefined()
  expect(response2?.status).toBe(400)
})

test('SDK, it is impossible to setup the same application', async () => {
  // this test is not stable if you run all tests at once
  // because the app is cached all app instances
  // we use a random identifier every time
  const testId = Math.random().toString(16)
  appSdk(`test_${testId}`, async () => {}).then(() => {})
  await expect(appSdk(`test_${testId}`, async () => {})).rejects.toThrow()
})

test('SDK, setup and get this app', async () => {
  // this test is not stable if you run all tests at once
  // because the app is cached all app instances
  // we use a random identifier every time
  const testId = Math.random().toString(16)
  appSdk(`test_${testId}`, async () => {}).then(() => {})
  await expect(appSdk(`test_${testId}`)).resolves.toBeInstanceOf(AppSdk)
})
