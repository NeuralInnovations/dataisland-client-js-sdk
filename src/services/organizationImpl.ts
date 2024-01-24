import { Organization, OrganizationId } from '../storages/organizations'
import { Disposable } from '../disposable'
import { OrganizationDto } from '../dto/userInfoResponse'
import { OrganizationService } from './organizationService'
import { OrganizationsImpl } from './organizationsImpl'
import { Workspaces } from '../storages/workspaces'
import { WorkspacesImpl } from './workspacesImpl'

export class OrganizationImpl extends Organization implements Disposable {
  private _isDisposed: boolean = false
  private _isAdmin: boolean = false
  private _content?: OrganizationDto
  private readonly _workspaces: WorkspacesImpl

  constructor(
    private readonly service: OrganizationService,
    private readonly organizations: OrganizationsImpl
  ) {
    super()
    this._workspaces = new WorkspacesImpl(this, this.service)
  }

  public initFrom(
    content: OrganizationDto,
    isAdmin: boolean
  ): OrganizationImpl {
    this._content = content
    this._isAdmin = isAdmin
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
