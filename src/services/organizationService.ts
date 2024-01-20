import { Service } from './service'
import { Organization, Organizations } from '../storages/organizations'
import { OrganizationDto, UserSettings } from '../dto/userInfoResponse'

export class OrganizationsImpl extends Organizations {
  get collection(): readonly Organization[] {
    throw new Error('Method not implemented.')
  }

  get current(): string {
    throw new Error('Method not implemented.')
  }

  set current(value: string) {
    throw new Error('Method not implemented.')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get(id: string): Organization {
    throw new Error('Method not implemented.')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(name: string, description: string): Promise<Organization> {
    throw new Error('Method not implemented.')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

export class OrganizationService extends Service {
  private impl: OrganizationsImpl = new OrganizationsImpl()

  get organizations(): Organizations {
    return this.impl
  }

  updateFrom(
    settings: UserSettings,
    adminInOrganization: string[],
    organizations: OrganizationDto[]
  ) {
    console.log(settings)
    console.log(adminInOrganization)
    console.log(organizations)
  }
}
