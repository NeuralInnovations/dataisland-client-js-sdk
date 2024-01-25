import { appSdk, AppSdk, DebugCredential } from "../src"
import { Organization } from "../src/storages/organization"
import { Workspace } from "../src/storages/workspace"

export const HOST = <string>process.env.HOST
export const TOKEN = <string>process.env.TOKEN

export const testInOrganization = async (func: (app: AppSdk, org: Organization) => Promise<void>, config ?: {
    host: string,
    token: string
  }
): Promise<void> => {
  const randomName = `org-name-${Math.random().toString(16)}`
  const app = await appSdk(randomName, async builder => {
    builder.useHost(config?.host ?? HOST)
    builder.useCredential(new DebugCredential(config?.token ?? TOKEN))
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

export const testInWorkspace = async (func: (app: AppSdk, org: Organization, workspace: Workspace)
  => Promise<void>, config?: {
  host: string,
  token: string,
}): Promise<void> => {
  await testInOrganization(async (app, org) => {
    const randomName = `org-${org.name}-workspace-${Math.random().toString(16)}`
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
