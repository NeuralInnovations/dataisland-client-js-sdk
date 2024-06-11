import { WorkspaceId } from "../storages/workspaces/workspaces"
import { FileId } from "../storages/files/file"

export interface WorkspaceProfileDto {
  name: string
  description: string
}

export interface WorkspaceDto {
  id: WorkspaceId
  createdAt: number
  modifiedAt: number
  profile: WorkspaceProfileDto
}

export interface WorkspacesResponse {
  workspaces: WorkspaceDto[]
}

export interface FileUrlDto {
  url: string,
  previewUrl: string
}

export interface FileProgressDto {
  file_id: FileId
  file_parts_count: number
  completed_parts_count: number
  success: boolean
  error?: string
}

export interface FileDto {
  id: string
  createdAt: number
  modifiedAt: number
  name: string
  description: string
  fileMetadata: string
  url: string
  previewUrl: string
  hash: string
  organizationId: string
  workspaceId: string
  isProcessedSuccessfully: boolean
}

export class MetadataDto {
  public key: string
  public value: string

  constructor(key: string, value: string){
    this.key = key
    this.value = value
  }
}


export interface FileListResponse {
  files: FileDto[]
  totalFilesCount: number
  filesPerPage: number
}
