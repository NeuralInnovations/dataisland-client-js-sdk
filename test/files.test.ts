import fs from "fs"
import { testInWorkspace } from "./setup"
import { FileImpl } from "../src/storages/files/file.impl"
import { Context, DisposableContainer, FileDto } from "../src"
import { FilesPageImpl } from "../src/storages/files/filesPage.impl"
import { Registry } from "../src/internal/registry"
import { appTest, UnitTest } from "../src/unitTest"

test("Files", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    await testInWorkspace(async (app, org, ws) => {
      expect(app).not.toBeUndefined()
      expect(org).not.toBeUndefined()

      const buffer = fs.readFileSync("test/data/test_file.pdf")

      const file_obj = new File([new Uint8Array(buffer)], "test_file.pdf", {
        type: "application/pdf"
      })

      const file_obj_second = new File([new Uint8Array(buffer)], "test_file_second.pdf", {
        type: "application/pdf"
      })

      const upload_files = [file_obj, file_obj_second]

      const filePromise = ws.files.upload(upload_files)
      await expect(filePromise).resolves.not.toThrow()
      const files = await filePromise

      const queryPromise = ws.files.query("", 0, 20)
      await expect(queryPromise).resolves.not.toThrow()
      const filePage = await queryPromise
      expect(filePage).not.toBeUndefined()
      expect(filePage).not.toBeNull()
      expect(filePage.files.length).toBe(2)
      expect(filePage.pages).toBe(1)

      const ids: string[] = []

      for (const file of files) {
        expect(file).not.toBeUndefined()
        expect(file).not.toBeNull()
        expect(file.createdAt).toBeGreaterThan(0)

        if (!file) {
          console.error("File not found after loading")
          continue
        }

        ids.push(file.id)

        await file.updateStatus()

        expect(file.status).not.toBeUndefined()
        expect(file.status).not.toBeNull()
        if (!file.status.success && file.status.error) {
          console.error(file.status.error)
        }
        expect(file.status.success).toBe(true)
        expect(file.status.file_id).toBe(file.id)
        expect(file.status.file_parts_count).toBeGreaterThanOrEqual(
          file.status.completed_parts_count
        )

        while (
          file.status.success &&
          file.status.completed_parts_count !== file.status.file_parts_count
        ) {
          await new Promise(r => setTimeout(r, 1000))
          await file.updateStatus()
        }

        expect(file.status.success && file.status.completed_parts_count).toBe(
          file.status.file_parts_count
        )
      }

      let filesCount = await ws.filesCount()
      expect(filesCount).toBe(2)

      await expect(ws.files.delete(ids)).resolves.not.toThrow()

      filesCount = await ws.filesCount()
      expect(filesCount).toBe(0)

    })
  })
})

describe("FilesPageImpl", () => {
  let filesPage: FilesPageImpl

  beforeEach(() => {
    filesPage = new FilesPageImpl()
  })

  afterEach(async () => {
    filesPage.dispose()
  })

  test("should be created", () => {
    expect(filesPage).toBeTruthy()
  })

  test("should have initial properties set", () => {
    expect(filesPage.isDisposed).toBeFalsy()
    expect(filesPage.files).toEqual([])
    expect(filesPage.total).toBe(0)
    expect(filesPage.filesPerPage).toBe(0)
    expect(filesPage.page).toBe(0)
  })

  test("should calculate pages correctly", () => {
    filesPage.total = 10
    filesPage.filesPerPage = 5

    expect(filesPage.pages).toBe(2)

    filesPage.total = 15

    expect(filesPage.pages).toBe(3)

    // Add more test cases as needed
  })

  test("should dispose correctly", async () => {
    filesPage.dispose()

    expect(filesPage.isDisposed).toBeTruthy()
  })

  // Add more tests as needed for specific behaviors or edge cases.
})

describe("FileImpl", () => {
  let file: FileImpl
  let contextMock: Context

  beforeEach(() => {
    // Создаем заглушки для зависимостей
    contextMock = {
      resolve: jest.fn(() => ({
        requestBuilder: jest.fn(() => ({
          searchParam: jest.fn(() => ({
            sendGet: jest.fn()
          }))
        }))
      }))
    } as any

    file = new FileImpl(contextMock)
  })

  afterEach(async () => {
    file.dispose()
  })

  it("should be created", () => {
    expect(file).toBeTruthy()
  })

  it("should have initial properties set", () => {
    expect(file.isDisposed).toBeFalsy()
    expect(file.id).toBeUndefined()
    expect(file.name).toBeUndefined()
    expect(file.status).toBeUndefined()
  })

  it("should dispose correctly", async () => {
    file.dispose()

    expect(file.isDisposed).toBeTruthy()
  })

  it("should initialize from FileDto", () => {
    const fileDto: FileDto = {
      id: "fileId",
      name: "fileName",
      createdAt: 0,
      modifiedAt: 0,
      description: "",
      url: "",
      hash: "",
      organizationId: "",
      workspaceId: "",
      isProcessedSuccessfully: false
    }

    file.initFrom(fileDto)

    expect(file.id).toBe(fileDto.id)
    expect(file.name).toBe(fileDto.name)
    // Add assertions for other properties
  })

})

test("FilesPage equals", async () => {
  function createFileImpl(id: string): FileImpl {
    const impl = new FileImpl(new Context(new Registry(), new DisposableContainer().lifetime, "appName"))
    impl.initFrom({
      createdAt: 0,
      description: "",
      hash: "",
      id: id,
      isProcessedSuccessfully: false,
      modifiedAt: 0,
      name: "",
      organizationId: "",
      url: "",
      workspaceId: ""
    })
    return impl
  }

  const v1: FilesPageImpl = new FilesPageImpl()
  v1.files = [createFileImpl("id1")]
  v1.total = 10
  v1.filesPerPage = 5
  v1.page = 1

  const v2: FilesPageImpl = new FilesPageImpl()
  v1.files = [createFileImpl("id1")]
  v2.total = 10
  v2.filesPerPage = 5
  v2.page = 1

  expect(v1.equals(v2)).toBeTruthy()

  const v3: FilesPageImpl = new FilesPageImpl()
  v3.files = [createFileImpl("id2")]
  v3.total = 10
  v3.filesPerPage = 5
  v3.page = 1

  expect(v1.equals(v3)).toBeFalsy()
})
