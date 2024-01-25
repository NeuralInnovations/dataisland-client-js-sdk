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
import { OrganizationImpl } from "../src/storages/organization.impl"
import * as fs from "fs"

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

test("Create and delete organization, create and delete workspace", async () => {
  const randomName = `org-test-${Math.random().toString(16)}`
  const app = await appSdk(randomName, async builder => {
    builder.useHost(HOST)
    builder.useCredential(new DebugCredential(TOKEN))
  })

  const initLength = app.organizations.collection.length

  const org = await app.organizations.create(
    randomName,
    "this is a unitTest description"
  )

  // check organization
  expect(org).not.toBeUndefined()
  expect(org).not.toBeNull()
  expect(org).toBeInstanceOf(OrganizationImpl)

  expect(org.id).not.toBeUndefined()
  expect(org.id).not.toBeNull()
  expect(org.id.trim()).not.toBe("")

  // check name
  expect(org.name).not.toBeUndefined()
  expect(org.name).not.toBeNull()
  expect(org.name.trim()).not.toBe("")

  // check description
  expect(org.description).not.toBeUndefined()
  expect(org.description).not.toBeNull()
  expect(org.description.trim()).not.toBe("")

  // check organizations
  expect(app.organizations.get(org.id)).toBe(org)
  expect(app.organizations.tryGet(org.id)).toBe(org)
  expect(app.organizations.collection.length).toBe(initLength + 1)

  const initWorkspacesLength = org.workspaces.collection.length

  const wsPromise = org.workspaces.create(
    "test-workspace",
    "test-workspace-description"
  )
  await expect(wsPromise).resolves.not.toThrow()
  const ws = await wsPromise
  expect(ws).not.toBeUndefined()
  expect(ws).not.toBeNull()
  expect(ws.name).toBe("test-workspace")
  expect(ws.description).toBe("test-workspace-description")
  expect(app.organizations.get(org.id).workspaces.collection.length).toBe(
    initWorkspacesLength + 1
  )
  expect(org.workspaces.collection.length).toBe(initWorkspacesLength + 1)
  expect(org.workspaces.get(ws.id)).toBe(ws)
  expect(org.workspaces.tryGet(ws.id)).toBe(ws)
  expect(org.workspaces.contains(ws.id)).toBe(true)

  const buffer = fs.readFileSync("test_file.pdf")
  const file_obj = new File([new Uint8Array(buffer)], "test_file.pdf", {
    type: "text/plain"
  })

  const filePromise = ws.files.upload(file_obj)
  await expect(filePromise).resolves.not.toThrow()
  const file = await filePromise

  expect(file).not.toBeUndefined()
  expect(file).not.toBeNull()
  expect(file.name).toBe("test_file.pdf")

  let status = await file.status()

  expect(status).not.toBeUndefined()
  expect(status).not.toBeNull()
  expect(status.file_id).toBe(file.id)
  expect(status.file_parts_count).toBeGreaterThan(status.completed_parts_count)

  while (
    status.success == true &&
    status.completed_parts_count !== status.file_parts_count
  ) {
    await new Promise(r => setTimeout(r, 1000))
    status = await file.status()
  }

  const queryPromise = ws.files.query("", 0, 20)
  await expect(queryPromise).resolves.not.toThrow()
  const filePage = await queryPromise
  expect(filePage).not.toBeUndefined()
  expect(filePage).not.toBeNull()
  expect(filePage.files.length).toBe(1)
  expect(filePage.pages).toBe(1)

  await expect(ws.files.delete(file.id)).resolves.not.toThrow()

  await expect(org.workspaces.delete(ws.id)).resolves.not.toThrow()

  await expect(app.organizations.delete(org.id)).resolves.not.toThrow()
  expect((<OrganizationImpl>org).isDisposed).toBe(true)
  expect(app.organizations.collection.length).toBe(initLength)
  expect(app.organizations.tryGet(org.id)).toBeUndefined()
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
    const promise = appSdk(`test-setup-${testId}`).then(() => {})
    await expect(
      appSdk(`test-setup-${testId}`, async () => {})
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
    const promise = appSdk(`test-get-${testId}`).then(() => {})
    await expect(appSdk(`test-get-${testId}`)).resolves.toBeInstanceOf(AppSdk)
    await promise
  })
})
