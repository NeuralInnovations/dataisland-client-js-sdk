import { OrganizationId } from './organizations'
import { Disposable } from '../disposable'
import {
  OrganizationDto,
  OrganizationWorkspaces
} from '../dto/userInfoResponse'
import { Workspaces } from './workspaces'
import { WorkspacesImpl } from './workspaces.impl'
import { Context } from '../context'
import { Organization } from './organization'
import { RpcService } from '../services/rpcService'

export class OrganizationImpl extends Organization implements Disposable {
  private _isDisposed: boolean = false
  private _isAdmin: boolean = false
  private _content?: OrganizationDto
  private readonly _workspaces: WorkspacesImpl

  constructor(private readonly context: Context) {
    super()
    this._workspaces = new WorkspacesImpl(this, this.context)
  }

  public async initFrom(
    content: OrganizationDto,
    isAdmin: boolean
  ): Promise<OrganizationImpl> {
    this._content = content
    this._isAdmin = isAdmin

    // init workspaces from the server's response
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder('api/v1/Organizations')
      .searchParam('id', content.id)
      .sendGet()

    if (!response?.ok) {
      throw new Error(
        `Failed to fetch workspaces. Status: ${response?.status},${response?.statusText}`
      )
    }

    const workspaces = (await response.json()) as OrganizationWorkspaces

    return this
  }

  get isAdmin(): boolean {
    return this._isAdmin
  }

  get isDisposed(): boolean {
    return this._isDisposed
  }

  dispose(): void {
    this._isDisposed = true
  }

  get id(): OrganizationId {
    return <OrganizationId>this._content?.id
  }

  get name(): string {
    return <OrganizationId>this._content?.profile.name
  }

  get description(): string {
    return <OrganizationId>this._content?.profile.description
  }

  get workspaces(): Workspaces {
    return this._workspaces
  }
}
