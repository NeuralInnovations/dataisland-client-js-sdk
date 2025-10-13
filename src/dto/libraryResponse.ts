import { FileDto } from "./workspacesResponse"
import { OrganizationId } from "../storages/organizations/organizations"

import { LibraryId } from "../storages/library/libraryId"

export interface LibrariesResponse {
  libraries: LibraryFolderDto[]
}

export interface LibraryFolderDto {
  id: string
  name: string
  description: string
  iconId: string
  createdAt: number
  modifiedAt: number
  isRemote: boolean
  remoteUrl?: string
  remoteLibraryId?: string
}

export interface LibraryPageResponse {
  parentIds: string[]
  totalItemsCount: number
  itemsPerPage: number
  folders: LibraryFolderDto[]
  files: FileDto[]
  isRemote: boolean
  remoteUrl?: string
  remoteLibraryId?: string
}

export interface LibraryFolderResponse {
  folder: LibraryFolderDto
  isRemote: boolean
  remoteUrl?: string
  remoteLibraryId?: string
}

export interface LibraryOrganizationDto {
  id: OrganizationId
  name: string
}

export interface LibraryDto {
  id: LibraryId
  name: string
  region: number
  type: LibararyType
  libraryUrl: string
  remoteLibraryId: string
  isPublic: boolean
  organizations: LibraryOrganizationDto[]
}

export interface LibraryResponse {
  libraries: LibraryDto[]
}

export interface CreateLibraryResponse {
  libraryId: LibraryId
}


export enum LibararyType {
  Local = 0,
  Remote = 1
}