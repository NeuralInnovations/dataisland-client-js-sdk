import {
  Organization,
  OrganizationsEvent,
  OrganizationId,
  Organizations
} from '../storages/organizations'
import { Workspaces } from '../storages/workspaces'
import { OrganizationImpl } from './organizationImpl'
import { OrganizationService } from './organizationService'

export class OrganizationsImpl extends Organizations {
  constructor(public readonly service: OrganizationService) {
    super()
  }

  public organizations: OrganizationImpl[] = []
  public currentOrganizationId?: OrganizationId

  get collection(): readonly Organization[] {
    return this.organizations
  }

  get current(): OrganizationId {
    return <OrganizationId>this.currentOrganizationId
  }

  set current(value: OrganizationId) {
    if (this.currentOrganizationId !== value) {
      const org = this.tryGet(value)
      if (org) {
        this.currentOrganizationId = value
        this.dispatch({
          type: OrganizationsEvent.CURRENT_CHANGED,
          data: org
        })
      } else {
        throw new Error(`Organization ${value} is not found`)
      }
    }
  }

  get(id: OrganizationId): Organization {
    return <Organization>this.tryGet(id)
  }

  tryGet(id: OrganizationId): Organization | undefined {
    return this.organizations.find(organization => organization.id === id)
  }

  contains(id: OrganizationId): boolean {
    return this.organizations.some(organization => organization.id === id)
  }

  async create(name: string, description: string): Promise<Organization> {
    return this.service.createOrganization(name, description)
  }

  delete(id: string): Promise<void> {
    return this.service.deleteOrganization(id)
  }
}
