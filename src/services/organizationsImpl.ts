import {
  Organization,
  OrganizationsEvent,
  OrganizationId,
  Organizations
} from '../storages/organizations'
import { OrganizationImpl } from './organizationImpl'
import { RpcService } from './rpcService'
import { OrganizationDto, UserSettings } from '../dto/userInfoResponse'
import { Context } from '../context'

export class OrganizationsImpl extends Organizations {
  constructor(public readonly context: Context) {
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
    return this.internalCreateOrganization(name, description)
  }

  delete(id: string): Promise<void> {
    return this.internalDeleteOrganization(id)
  }

  //----------------------------------------------------------------------------
  // INTERNALS
  //----------------------------------------------------------------------------

  async internalDeleteOrganization(id: OrganizationId): Promise<void> {
    if (id === undefined || id === null) {
      throw new Error('Organization delete, id is undefined or null')
    }
    if (id.length === 0 || id.trim().length === 0) {
      throw new Error('Organization delete, id is empty')
    }
    if (!this.contains(id)) {
      throw new Error(`Organization delete, id: ${id} is not found`)
    }
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder('/api/v1/Organizations')
      .searchParam('id', id)
      .sendDelete()
    if (!response?.ok) {
      let text: string = ''
      try {
        text = (await response?.text()) ?? ''
      } catch (e) {
        console.error(e)
      }

      throw new Error(
        `Organization delete, response is not ok, status: ${response?.status},${response?.statusText} ${text}`
      )
    }
    const org = <OrganizationImpl>this.get(id)
    const index = this.organizations.indexOf(org)
    if (index < 0) {
      throw new Error('Organization delete, index is not found')
    }

    // remove organization from collection
    this.organizations.splice(index, 1)

    // dispatch event, organization removed
    this.dispatch({
      type: OrganizationsEvent.REMOVED,
      data: org
    })

    // dispose organization
    org.dispose()
  }

  async internalCreateOrganization(
    name: string,
    description: string
  ): Promise<OrganizationImpl> {
    if (name === undefined || name === null) {
      throw new Error('Organization create, name is undefined or null')
    }
    if (description === undefined || description === null) {
      throw new Error('Organization create, description is undefined or null')
    }
    if (name.length === 0 || name.trim().length === 0) {
      throw new Error('Organization create, name is empty')
    }
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder('api/v1/Organizations')
      .sendPost({
        profile: {
          name: name,
          description: description
        }
      })
    if (!response?.ok) {
      throw new Error(
        `Organization create, response is not ok: ${response?.status}/${response?.statusText}`
      )
    }
    const content = (await response.json())['organization'] as OrganizationDto

    // create organization and init from content
    const org = new OrganizationImpl(this.context).initFrom(content, true)

    // add organization to collection
    this.organizations.push(org)

    // dispatch event, organization added
    this.dispatch({
      type: OrganizationsEvent.ADDED,
      data: org
    })

    return org
  }

  internalInitFrom(
    adminInOrganization: string[],
    organizations: OrganizationDto[],
    settings: UserSettings | null | undefined
  ) {
    this.currentOrganizationId = settings?.activeOrganizationId
    for (const organization of organizations) {
      const org = new OrganizationImpl(this.context).initFrom(
        organization,
        adminInOrganization.includes(organization.id)
      )
      // add organization to collection
      this.organizations.push(org)

      // dispatch event, organization added
      this.dispatch({
        type: OrganizationsEvent.ADDED,
        data: org
      })
    }
  }
}
