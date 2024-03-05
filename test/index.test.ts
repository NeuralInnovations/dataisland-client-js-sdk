import { version } from "../package.json"
import {
  DataIslandApp,
  BasicCredential,
  dataIslandApp,
  SDK_VERSION,
  DEFAULT_NAME,
  DebugCredential
} from "../src"
import { MiddlewareService } from "../src/services/middlewareService"
import { CredentialService } from "../src/services/credentialService"
import { RpcService } from "../src/services/rpcService"
import { AppBuilder } from "../src"
import { UnitTest, appTest } from "../src/unitTest"
import { HOST, randomHash, newTestUserToken } from "./setup"
import {
  DeleteUserFullCommand
} from "../src/commands/deleteUserFullCommandHandler"

test("SDK_VERSION", () => {
  expect(SDK_VERSION).toBe(version)
})

test("Default SDK", async () => {
  await appTest(UnitTest.DO_NOT_START_SDK, async () => {
    // default
    const app = await dataIslandApp(DEFAULT_NAME, async (builder: AppBuilder) => {
      builder.useHost(HOST)
      builder.useCredential(new DebugCredential(newTestUserToken()))
    })
    expect(app).not.toBeUndefined()
    await app.context.execute(new DeleteUserFullCommand())
  })
})

test("SDK, middleware", async () => {
  await appTest(UnitTest.DO_NOT_START_SDK, async () => {
    const app = await dataIslandApp("test-settings", async (builder: AppBuilder) => {
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
  await appTest(UnitTest.DO_NOT_START_SDK, async () => {
    const app = await dataIslandApp("test-sdk")
    const middlewareService = app.resolve(MiddlewareService)
    expect(middlewareService).not.toBeUndefined()
    expect(app.resolve(MiddlewareService)).toBe(middlewareService)
    expect(app.resolve(CredentialService)).not.toBeUndefined()
    expect(app.resolve(RpcService)).not.toBeUndefined()
    expect(app.resolve(RpcService)).toBeInstanceOf(RpcService)
  })
})

test("SDK, middleware", async () => {
  await appTest(UnitTest.DO_NOT_START_SDK, async () => {
    const app = await dataIslandApp("test-middleware")
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
  await appTest(UnitTest.DO_NOT_START_SDK, async () => {
    // this test is not stable if you run all tests at once
    // because the app is cached all app instances
    // we use a random identifier every time
    const testId = `test-setup-${randomHash()}`
    const promise = dataIslandApp(testId).then(() => {
    })
    await expect(
      dataIslandApp(testId, async () => {
      })
    ).rejects.toThrow()
    await promise
  })
})

test("SDK, setup and get this app", async () => {
  await appTest(UnitTest.DO_NOT_START_SDK, async () => {
    // this test is not stable if you run all tests at once
    // because the app is cached all app instances
    // we use a random identifier every time
    const testId = `test-get-${randomHash()}`
    const promise = dataIslandApp(testId).then(() => {
    })
    await expect(dataIslandApp(testId)).resolves.toBeInstanceOf(DataIslandApp)
    await promise
  })
})
