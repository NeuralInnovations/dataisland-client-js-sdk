import { Service } from './service'
import { Organizations } from '../storages/organizations'
import { OrganizationDto, UserSettings } from '../dto/userInfoResponse'
import { OrganizationsImpl } from './organizationsImpl'

export class OrganizationService extends Service {
  private _impl?: OrganizationsImpl

  private get impl(): OrganizationsImpl {
    return this._impl ?? (this._impl = new OrganizationsImpl(this.context))
  }

  get organizations(): Organizations {
    return this.impl
  }

  initFrom(
    adminInOrganization: string[],
    organizations: OrganizationDto[],
    settings?: UserSettings | null
  ) {
    this.impl.internalInitFrom(adminInOrganization, organizations, settings)
  }
}
