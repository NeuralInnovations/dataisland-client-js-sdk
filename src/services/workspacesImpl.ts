import { Workspace, Workspaces } from '../storages/workspaces'
import { OrganizationImpl } from './organizationImpl'
import { Context } from '../context'

export class WorkspacesImpl extends Workspaces {
  constructor(organization: OrganizationImpl, context: Context) {
    super()
  }

  get collection(): readonly Workspace[] {
    throw new Error('Method not implemented.')
  }
  get(id: string): Workspace {
    throw new Error('Method not implemented.')
  }
  tryGet(id: string): Workspace | undefined {
    throw new Error('Method not implemented.')
  }
  create(name: string, description: string): Promise<Workspace> {
    throw new Error('Method not implemented.')
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
