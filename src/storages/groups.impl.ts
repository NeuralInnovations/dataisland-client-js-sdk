
import { Context } from "../context"
import { Disposable } from "../disposable"
import { AccessGroupDto, PermitsDto } from "../dto/accessGroupResponse"
import { WorkspaceDto } from "../dto/workspacesResponse"
import { Group, GroupId, Groups } from "./groups"
import { OrganizationImpl } from "./organization.impl"

export class GroupImpl extends Group implements Disposable {
  private _isDisposed: boolean = false
  private _content?: AccessGroupDto

  constructor(private readonly context: Context) {
    super()
  }

  public initFrom(data: AccessGroupDto){
    this._content = data
  }

  get id(): GroupId {
    if (this._content){
      return this._content.id
    }
    throw new Error("Access group is not loaded.")
  }
  get group(): AccessGroupDto {
    if (this._content){
      return this._content
    }
    throw new Error("Access group is not loaded.")
  }
  get workspaces(): WorkspaceDto[] {
    throw new Error("Method not implemented.")
  }
  set workspaces(value: WorkspaceDto[]) {
    throw new Error("Method not implemented.")
  }
  set name(value: string) {
    throw new Error("Method not implemented.")
  }
  set permits(value: PermitsDto[]) {
    throw new Error("Method not implemented.")
  }
  set members(value: string[]) {
    throw new Error("Method not implemented.")
  }

  get isDisposed(): boolean {
    return this._isDisposed
  }

  dispose(): void {
    this._isDisposed = true
  }
    

}


export class GroupsImpl extends Groups {

  constructor(
        private readonly organization: OrganizationImpl,
        private readonly context: Context
  ) {
    super()
  }

  create(): Promise<Group> {
    throw new Error("Method not implemented.")
  }
  get(id: string): Promise<Group> {
    throw new Error("Method not implemented.")
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.")
  }
    
}