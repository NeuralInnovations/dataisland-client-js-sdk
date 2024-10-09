import {
  dataIslandApp,
  DataIslandApp,
  DebugCredential, FileId,
  FileProcessingStage, FilesEvent, Library,
  UploadFile
} from "../src"
import { Organization } from "../src"
import { Workspace } from "../src"
import { jest } from "@jest/globals"
import fs from "fs"
import { LibrariesService } from "../src/services/librariesService"

export const HOST = <string>process.env.HOST
export const SIGNAL_R_HOST = <string>process.env.SIGNAL_R_HOST
const UNITTEST_TOKEN = <string>process.env.UNITTEST_TOKEN
const UNITTEST_RUNNER_ID = <string>process.env.UNITTEST_RUNNER_ID

let globalIndex = 0
const map = new Set<string>()

const randomInt = (length: number): number => {
  if (length <= 0 || length === undefined || length === null) {
    throw new Error("Invalid length")
  }
  const randomNumber = Math.random()
  const pw = Math.pow(10, length)
  const power = (randomNumber * pw + (++globalIndex))
  const time = new Date().getTime() + jest.now()
  const result = Math.abs(Math.round((power + time)))

  return result
}

export const newTestUserToken = (): string => {
  const filenameSplit = __filename.split("/")
  if (filenameSplit.length < 2) {
    throw new Error("Invalid filename")
  }

  const filename = filenameSplit[filenameSplit.length - 1].replace(".ts", "").replace(".js", "")
  const hash = UNITTEST_RUNNER_ID + filename + Math.abs(new Date().getTime()).toString(16) + randomHash(12)

  const token = "token_" + hash
  const email = "unittest_" + hash + "@ni.solutions"
  const userToken = UNITTEST_TOKEN.replace("{TOKEN}", token).replace("{EMAIL}", email)

  if (map.has(userToken)) {
    throw new Error(`Token already exists ${userToken}`)
  }
  map.add(userToken)
  return userToken
}

export const randomHash = (length: number = 10) => {
  if (length <= 0 || length === undefined || length === null) length = 5
  let hash = `${randomInt(length).toString(16)}`
  if (hash.startsWith("-")) {
    hash = hash.slice(1, hash.length)
  }
  return hash
}

export const uploadTestFile = async (org: Organization, ws: Workspace, filepath: string, format: string): Promise<FileId> => {
  const buffer = fs.readFileSync(filepath)
  const file_obj: UploadFile = new File([new Blob([buffer])], filepath, {
    type: format
  })
  await ws.files.upload([file_obj])

  const files = await ws.files.query("", 0, 10)

  const file = files.files[0]
  let file_loaded = false

  file.subscribe((evt) => {
    if (evt.data.status > FileProcessingStage.PROCESSING) {
      file_loaded = true
    }
  }, FilesEvent.UPDATED)

  while (!file_loaded) {
    await new Promise(f => setTimeout(f, 500))
  }

  return file.id
}

export const testInOrganization = async (func: (app: DataIslandApp, org: Organization) => Promise<void>, config ?: {
    host: string,
    token: string,
    signalRHost: string | null,
  }
): Promise<void> => {
  const randomName = `org-${randomHash(20)}`
  const app = await dataIslandApp(randomName, async builder => {
    builder.useHost(config?.host ?? HOST)
    builder.useSignalRHost(config?.signalRHost ?? SIGNAL_R_HOST)
    builder.useCredential(new DebugCredential(config?.token ?? newTestUserToken()))
    builder.registerMiddleware(async (req, next) => {
      // const url = req.url
      // console.log("REQUEST", url, req.method)
      const response = await next(req)
      // console.log("RESPONSE", url, response.status)
      return response
    })
  })
  const org = await app.organizations.create(
    randomName,
    "this is a unitTest description"
  )
  try {
    await func(app, org)
  } finally {
    if (app
      .organizations.tryGet(org.id)
    ) {
      await app.organizations.delete(org.id)
    }
  }
}

export const testInWorkspace = async (func: (app: DataIslandApp, org: Organization, workspace: Workspace)
  => Promise<void>, config?: {
  host: string,
  token: string,
}): Promise<void> => {
  await testInOrganization(async (app, org) => {
    const randomName = `workspace-${randomHash()}`
    const workspace = await org.workspaces.create(randomName, `description of ${randomName}`, {
      isCreateNewGroup: true,
      newGroupName: `${randomName}_group`
    })
    try {
      await func(app, org, workspace!)
    } finally {
      if (org.workspaces.tryGet(workspace!.id)) {
        await org.workspaces.delete(workspace!.id)
      }
    }
  }, config)
}

export const testInLibrary = async (func: (app: DataIslandApp, org: Organization, workspace: Workspace, library: Library)
  => Promise<void>, config?: {
  host: string,
  token: string,
}): Promise<void> => {
  await testInWorkspace(async (app, org, ws) => {
    const testLibraryName = "test"
    const testLibraryRegion = 0
    const libraryId = await app.libraries.management.createLibrary(testLibraryName, testLibraryRegion, true)
    await app.libraries.management.addOrgToLibrary(libraryId, org.id)
    await expect(ws.share(true)).resolves.not.toThrow()
    await app.resolve(LibrariesService)!.initialize()

    const library = app.libraries.collection.find(lib => lib.id === libraryId)
    try {
      await func(app, org, ws, library!)
    } finally {
      if ((await app.libraries.management.getLibraries()).find(lib => lib.id === library!.id)) {
        await app.libraries.management.deleteOrgFromLibrary(libraryId, org.id)
        await app.libraries.management.deleteLibrary(library!.id)
      }
    }
  }, config)
}
