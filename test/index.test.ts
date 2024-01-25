import { version } from "../package.json"
import {
  AppSdk,
  BasicCredential,
  appSdk,
  SDK_VERSION,
  DEFAULT_NAME,
  DebugCredential
} from "../src"
import { MiddlewareService } from "../src/services/middlewareService"
import { CredentialService } from "../src/services/credentialService"
import { RpcService } from "../src/services/rpcService"
import { AppBuilder } from "../src/appBuilder"
import { UnitTest, AppSdkUnitTest } from "../src/unitTest"
import { HOST, TOKEN } from "./setup"

test("SDK_VERSION", () => {
  expect(SDK_VERSION).toBe(version)
})

test("Default SDK", async () => {
  // default
  const app = await appSdk(DEFAULT_NAME, async (builder: AppBuilder) => {
    builder.useHost(HOST)
    builder.useCredential(new DebugCredential(TOKEN))
  })
  expect(app).not.toBeUndefined()
})

test("SDK, middleware", async () => {
  await AppSdkUnitTest.test(UnitTest.DEFAULT, async () => {
    const app = await appSdk("test-settings", async (builder: AppBuilder) => {
      builder.useHost("https://test.com")
      builder.useAutomaticDataCollectionEnabled(false)
      builder.useCredential(new BasicCredential("email", "password"))
      builder.registerMiddleware(async (req, next) => {
        req.headers.set("X-Test", "test")
        return await next(req)
      })
    })
    expect(app.name).toBe("test-settings")
    expect(app.host).toBe("https://test.com")
    expect(app.automaticDataCollectionEnabled).toBe(false)
  })
})

test("SDK, services", async () => {
  await AppSdkUnitTest.test(UnitTest.DEFAULT, async () => {
    const app = await appSdk("test-sdk")
    const middlewareService = app.resolve(MiddlewareService)
    expect(middlewareService).not.toBeUndefined()
    expect(app.resolve(MiddlewareService)).toBe(middlewareService)
    expect(app.resolve(CredentialService)).not.toBeUndefined()
    expect(app.resolve(RpcService)).not.toBeUndefined()
    expect(app.resolve(RpcService)).toBeInstanceOf(RpcService)
  })
})

test("SDK, middleware", async () => {
  await AppSdkUnitTest.test(UnitTest.DEFAULT, async () => {
    const app = await appSdk("test-middleware")
    const middlewareService = app.resolve(MiddlewareService)
    expect(middlewareService).not.toBeUndefined()
    expect(app.resolve(MiddlewareService)).toBe(middlewareService)
    expect(app.resolve(CredentialService)).not.toBeUndefined()

    const response = await middlewareService?.process(
      new Request("http://localhost:8080"),
      async (req: Request): Promise<Response> => {
        const headerXTest = req.headers.get("Custom-Test-Header")
        expect(headerXTest).toBeNull()
        return new Response("", { status: 200 })
      }
    )
    expect(response).not.toBeUndefined()
    expect(response?.status).toBe(200)

    middlewareService?.useMiddleware(async (req, next) => {
      req.headers.set("X-Test", "test-value")
      return await next(req)
    })

    const response2 = await middlewareService?.process(
      new Request("https://localhost:8080"),
      async (req: Request): Promise<Response> => {
        expect(req.headers.get("X-Test")).toBe("test-value")
        return new Response("", { status: 400 })
      }
    )
    expect(response2).not.toBeUndefined()
    expect(response2?.status).toBe(400)
  })
})

test("SDK, it is impossible to setup the same application", async () => {
  await AppSdkUnitTest.test(UnitTest.DEFAULT, async () => {
    // this test is not stable if you run all tests at once
    // because the app is cached all app instances
    // we use a random identifier every time
    const testId = Math.random().toString(16)
    const promise = appSdk(`test-setup-${testId}`).then(() => {
    })
    await expect(
      appSdk(`test-setup-${testId}`, async () => {
      })
    ).rejects.toThrow()
    await promise
  })
})

test("SDK, setup and get this app", async () => {
  await AppSdkUnitTest.test(UnitTest.DEFAULT, async () => {
    // this test is not stable if you run all tests at once
    // because the app is cached all app instances
    // we use a random identifier every time
    const testId = Math.random().toString(16)
    const promise = appSdk(`test-get-${testId}`).then(() => {
    })
    await expect(appSdk(`test-get-${testId}`)).resolves.toBeInstanceOf(AppSdk)
    await promise
  })
})
