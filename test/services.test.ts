import { appSdk, BasicCredential, DefaultCredential } from '../src'
import { CredentialService } from '../src/services/credentialService'
import { MiddlewareService } from '../src/services/middlewareService'
import { UnitTest, UnitTestProfile } from '../src/unitTest'

test('CredentialService', async () => {
  await UnitTestProfile.test(UnitTest.DEFAULT, async () => {
    const app = await appSdk('test-services', async builder => {
      builder.env.unitTest = UnitTest.DO_NOT_START
    })
    const credentialService = app.resolve(CredentialService)
    expect(credentialService).not.toBeUndefined()
    expect(app.resolve(CredentialService)).toBe(credentialService)
    expect(app.resolve(CredentialService)).toBeInstanceOf(CredentialService)
    expect(app.credential).not.toBeUndefined()

    const credential = new BasicCredential('email', 'password')
    app.credential = credential
    expect(app.credential).toBe(credential)
    expect(credentialService?.credential).toBe(credential)

    const middleware = app.resolve(MiddlewareService) as MiddlewareService
    const emailPasswordDisposable = middleware.useMiddleware(
      async (req, next) => {
        expect(req.headers.get('Authorization')).toBe('Basic email:password')
        await next(req)
      }
    )
    expect(emailPasswordDisposable).not.toBeUndefined()
    await middleware.process(
      new Request('https://localhost:8080'),
      async () => {
        return new Response('', { status: 200 })
      }
    )
    emailPasswordDisposable?.dispose()

    const credential2 = new DefaultCredential()
    app.credential = credential2
    expect(app.credential).toBe(credential2)
    expect(credentialService?.credential).toBe(credential2)

    const defaultDisposable = middleware.useMiddleware(async (req, next) => {
      expect(req.headers.get('Authorization')).toBeNull()
      await next(req)
    })
    expect(defaultDisposable).not.toBeUndefined()
    await middleware.process(
      new Request('https://localhost:8080'),
      async () => {
        return new Response('', { status: 200 })
      }
    )
    defaultDisposable?.dispose()
  })
})
