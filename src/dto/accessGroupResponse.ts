import { UserDto } from "./userInfoResponse";


export interface PermitsDto {
    isAdmin: boolean;
}

export interface RegulationDto {
    isRegulateOrganization: boolean;
    regulateWorkspaceIds: string[];
}

export interface AccessGroupDto {
    id: string;
    name: string;
    type: number;
    createdAt: number;
    modifiedAt: number;
    organizationId: string;
    permits: PermitsDto;
    regulation: RegulationDto;
    membersCount: number;
}

export interface AccessGroupResponse {
    group: AccessGroupDto;
    members: UserDto[];
}

export interface AccessGroupsResponse {
    groups: AccessGroupDto[];
}



