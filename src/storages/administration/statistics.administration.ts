import { OrganizationId } from "../organizations/organizations"
import {
  OrganizationMembersStatisticResponse,
  OrganizationStatisticResponse
} from "../../dto/administration"

/**
 * Statistic management, you must have permissions to manage statistics
 */
export abstract class StatisticAdministration {

  /**
   * Get organization statistics
   */
  abstract getOrganizations(dateFrom: number, dateTo: number): Promise<OrganizationStatisticResponse>;

  /**
   * Get organization members statistics
   */
  abstract getOrganizationMembers(organizationId: OrganizationId, dateFrom: number, dateTo: number): Promise<OrganizationMembersStatisticResponse>;
}
