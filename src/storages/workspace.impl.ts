import { Context } from "../context"
import { Files } from "./files"
import { Workspace } from "./workspace"
import { OrganizationImpl } from "./organization.impl"
import { WorkspaceDto } from "../dto/workspacesResponse"

export class WorkspaceImpl extends Workspace {
  private _isMarkAsDeleted: boolean = false

  constructor(
    public readonly organization: OrganizationImpl,
    public readonly context: Context
  ) {
    super()
  }

  get id(): string {
    throw new Error("Method not implemented.")
  }

  get name(): string {
    throw new Error("Method not implemented.")
  }

  get description(): string {
    throw new Error("Method not implemented.")
  }

  get files(): Files {
    throw new Error("Method not implemented.")
  }

  change(name: string, description: string): Promise<void> {
    throw new Error("Method not implemented.")
  }

  async initFrom(workspace: WorkspaceDto) {}

  get isMarkAsDeleted(): boolean {
    return this._isMarkAsDeleted
  }

  markToDelete(): void {
    this._isMarkAsDeleted = true
  }
}
