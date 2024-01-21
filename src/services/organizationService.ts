import { Service } from './service'
import {
  OrganizationEvent,
  OrganizationId,
  Organizations
} from '../storages/organizations'
import { OrganizationDto, UserSettings } from '../dto/userInfoResponse'
import { RpcService } from './rpcService'
import { OrganizationImpl } from './organizationImpl'
import { OrganizationsImpl } from './organizationsImpl'

export class OrganizationService extends Service {
  private impl: OrganizationsImpl = new OrganizationsImpl(this)

  get organizations(): Organizations {
    return this.impl
  }

  initFrom(
    settings: UserSettings,
    adminInOrganization: string[],
    organizations: OrganizationDto[]
  ) {
    this.impl.currentOrganizationId = settings.activeOrganizationId
    for (const organization of organizations) {
      const org = new OrganizationImpl(this, this.impl).initFrom(
        organization,
        adminInOrganization.includes(organization.id)
      )
      // add organization to collection
      this.impl.organizations.push(org)

      // dispatch event, organization added
      this.impl.dispatch({
        type: OrganizationEvent.ADDED,
        data: org
      })
    }
  }

  async deleteOrganization(id: OrganizationId): Promise<void> {
    if (id === undefined || id === null) {
      throw new Error('Organization delete, id is undefined or null')
    }
    if (id.length === 0 || id.trim().length === 0) {
      throw new Error('Organization delete, id is empty')
    }
    if (!this.impl.contains(id)) {
      throw new Error(`Organization delete, id: ${id} is not found`)
    }
    const response = await this.resolve(RpcService)
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
    const org = <OrganizationImpl>this.impl.get(id)
    const index = this.impl.organizations.indexOf(org)
    if (index < 0) {
      throw new Error('Organization delete, index is not found')
    }

    // remove organization from collection
    this.impl.organizations.splice(index, 1)

    // dispatch event, organization removed
    this.impl.dispatch({
      type: OrganizationEvent.REMOVED,
      data: org
    })

    // dispose organization
    org.dispose()
  }

  async createOrganization(
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
    const response = await this.resolve(RpcService)
      ?.requestBuilder('api/v1/Organizations')
      .sendPost({
        profile: {
          name: name,
          description: description
        }
      })
    if (!response?.ok) {
      throw new Error('Organization create, response is not ok')
    }
    const content = (await response.json())['organization'] as OrganizationDto

    // create organization and init from content
    const org = new OrganizationImpl(this, this.impl).initFrom(content, true)

    // add organization to collection
    this.impl.organizations.push(org)

    // dispatch event, organization added
    this.impl.dispatch({
      type: OrganizationEvent.ADDED,
      data: org
    })

    return org
  }
}
