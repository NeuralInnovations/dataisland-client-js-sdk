import { dataIslandApp, DataIslandApp, DebugCredential } from "../src"
import { Organization } from "../src"
import { Workspace } from "../src"

export const HOST = <string>process.env.HOST
export const TOKEN = <string>process.env.TOKEN

export const randomHash = (length: number = 5) => {
  if (length <= 0) length = 1
  return `name-${((Math.random() * Math.pow(10, length)) | 0).toString(16)}`
}

export const testInOrganization = async (func: (app: DataIslandApp, org: Organization) => Promise<void>, config ?: {
    host: string,
    token: string
  }
): Promise<void> => {
  const randomName = `org-name-${randomHash()}`
  const app = await dataIslandApp(randomName, async builder => {
    builder.useHost(config?.host ?? HOST)
    builder.useCredential(new DebugCredential(config?.token ?? TOKEN))
    builder.registerMiddleware(async (req, next) => {
      const url = req.url
      console.log("REQUEST", url, req.method)
      const response = await next(req)
      console.log("RESPONSE", url, response.status)
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
    const workspace = await org.workspaces.create(randomName, `description of ${randomName}`)
    try {
      await func(app, org, workspace)
    } finally {
      if (org.workspaces.tryGet(workspace.id)) {
        await org.workspaces.delete(workspace.id)
      }
    }
  }, config)
}
