import {
  dataIslandApp,
  BasicCredential,
  DefaultCredential,
  Lifetime,
  DisposableContainer,
  Context,
  DebugCredential,
  BearerCredential
} from "../src"
import { Registry } from "../src/internal/registry"
import { CredentialService } from "../src/services/credentialService"
import { MiddlewareService } from "../src/services/middlewareService"
import { RequestBuilder } from "../src/services/requestBuilder"
import { ResponseUtils } from "../src/services/responseUtils"
// import { RpcService } from "../src/services/rpcService"
import { UnitTest, appTest } from "../src/unitTest"

test("CredentialService", async () => {
  await appTest(UnitTest.DEFAULT, async () => {
    const app = await dataIslandApp("test-services", async builder => {
      builder.env.unitTest = UnitTest.DO_NOT_START
    })

    const credentialService = app.resolve(CredentialService)
    expect(credentialService).not.toBeUndefined()
    expect(app.resolve(CredentialService)).toBe(credentialService)
    expect(app.resolve(CredentialService)).toBeInstanceOf(CredentialService)
    expect(app.credential).not.toBeUndefined()

    const credential = new BasicCredential("email", "password")
    const disposableContainer = new DisposableContainer()
    const lifetime = new Lifetime(disposableContainer)
    const context = new Context(new Registry(), lifetime, "TestApp")
    expect(() => credential.onRegister(lifetime, context)).toThrow(
      "MiddlewareService is not registered."
    )

    app.credential = credential
    expect(app.credential).toBe(credential)
    expect(credentialService?.credential).toBe(credential)

    const token = "testToken"
    const debugCredential = new DebugCredential(token)

    expect(() => {
      debugCredential.onRegister(lifetime, context)
    }).toThrow("MiddlewareService is not registered.")

    const bearerCredential = new BearerCredential(token)
    expect(bearerCredential.token).toBe(token)
    expect(() => bearerCredential.onRegister(lifetime, context)).toThrow(
      "MiddlewareService is not registered."
    )

    const middleware = app.resolve(MiddlewareService) as MiddlewareService
    const emailPasswordDisposable = middleware.useMiddleware(
      async (req, next) => {
        expect(req.headers.get("Authorization")).toBe("Basic email:password")
        return await next(req)
      }
    )

    expect(emailPasswordDisposable).not.toBeUndefined()
    await middleware.process(
      new Request("https://localhost:8080"),
      async () => {
        return new Response("", { status: 200 })
      }
    )
    emailPasswordDisposable?.dispose()

    const credential2 = new DefaultCredential()
    app.credential = credential2
    expect(app.credential).toBe(credential2)
    expect(credentialService?.credential).toBe(credential2)

    const defaultDisposable = middleware.useMiddleware(async (req, next) => {
      expect(req.headers.get("Authorization")).toBeNull()
      return await next(req)
    })
    expect(defaultDisposable).not.toBeUndefined()
    await middleware.process(
      new Request("https://localhost:8080"),
      async () => {
        return new Response("", { status: 200 })
      }
    )
    defaultDisposable?.dispose()
  })
})

test("ResponseUtils", async () => {
  const response = new Response("", { status: 200 })
  const result = ResponseUtils.isOk(response)
  const undefinedResponse = undefined
  const nullResponse = null
  const message = "Error message"
  const status = 404
  const statusText = "Not Found"
  const errorBody = "Error Body"

  expect(result).toBe(true)

  expect(ResponseUtils.isOk(undefinedResponse)).toBe(false)
  expect(ResponseUtils.isOk(nullResponse)).toBe(false)

  expect(ResponseUtils.throwError(message, undefined)).rejects.toThrow(
    `${message}. Response is undefined`
  )
  expect(ResponseUtils.throwError(message, null)).rejects.toThrow(
    `${message}. Response is null`
  )

  const response2 = new Response("", {
    status,
    statusText
  })
  response2.text = async () => errorBody

  await expect(ResponseUtils.throwError(message, response2)).rejects.toThrow(
    `${message}. Response fail. Status: ${status},${statusText}, body: ${errorBody}`
  )
})

describe("RequestBuilder", () => {
  const url = new URL("https://example.com")
  const requestFunction = jest.fn()

  beforeEach(() => {
    requestFunction.mockClear()
  })

  describe("header", () => {
    test("sets header correctly", () => {
      const requestBuilder = new RequestBuilder(url, requestFunction)
      requestBuilder.header("Content-Type", "application/json")
      expect(requestBuilder["_headers"].get("Content-Type")).toBe(
        "application/json"
      )
    })
  })

  describe("RequestBuilder", () => {
    const url = new URL("https://example.com")
    const requestFunction = jest.fn()

    beforeEach(() => {
      requestFunction.mockClear()
    })

    describe("headers", () => {
      test("sets headers correctly from object", () => {
        const requestBuilder = new RequestBuilder(url, requestFunction)
        requestBuilder.headers({
          "Content-Type": "application/json",
          "Authorization": "Bearer token"
        })

        expect(requestBuilder["_headers"].get("Content-Type")).toBe(
          "application/json"
        )
        expect(requestBuilder["_headers"].get("Authorization")).toBe(
          "Bearer token"
        )
      })

      test("does not set headers if argument is undefined", () => {
        const requestBuilder = new RequestBuilder(url, requestFunction)
        requestBuilder.headers(undefined)

        expect(requestBuilder["_headers"].get("Content-Type")).toBe(null)
        expect(requestBuilder["_headers"].get("Authorization")).toBe(null)
      })

      test("does not set headers if argument is null", () => {
        const requestBuilder = new RequestBuilder(url, requestFunction)
        requestBuilder.headers(undefined)

        expect(requestBuilder["_headers"].get("Content-Type")).toBe(null)
        expect(requestBuilder["_headers"].get("Authorization")).toBe(null)
      })

      test("sets headers correctly from Headers object", () => {
        const requestBuilder = new RequestBuilder(url, requestFunction)
        const headers = new Headers({
          "Content-Type": "application/json",
          "Authorization": "Bearer token"
        })
        requestBuilder.headers(headers)

        expect(requestBuilder["_headers"].get("Content-Type")).toBe(
          "application/json"
        )
        expect(requestBuilder["_headers"].get("Authorization")).toBe(
          "Bearer token"
        )
      })
    })
  })

  describe("searchParams", () => {
    test("sets search params correctly from Map", () => {
      const requestBuilder = new RequestBuilder(url, requestFunction)
      const searchParams = new Map([
        ["key1", "value1"],
        ["key2", "value2"]
      ])
      requestBuilder.searchParams(searchParams)

      expect(requestBuilder["_searchParams"].get("key1")).toBe("value1")
      expect(requestBuilder["_searchParams"].get("key2")).toBe("value2")
    })

    test("does not set search params if argument is undefined", () => {
      const requestBuilder = new RequestBuilder(url, requestFunction)
      requestBuilder.searchParams(undefined)

      expect(requestBuilder["_searchParams"].get("key1")).toBe(null)
      expect(requestBuilder["_searchParams"].get("key2")).toBe(null)
    })

    test("does not set search params if argument is null", () => {
      const requestBuilder = new RequestBuilder(url, requestFunction)
      requestBuilder.searchParams(undefined)

      expect(requestBuilder["_searchParams"].get("key1")).toBe(null)
      expect(requestBuilder["_searchParams"].get("key2")).toBe(null)
    })
  })
})

