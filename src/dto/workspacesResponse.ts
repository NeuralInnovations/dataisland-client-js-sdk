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
  isShared: boolean
  profile: WorkspaceProfileDto
}

export interface WorkspacesResponse {
  workspaces: WorkspaceDto[]
}

export interface FileUrlDto {
  url: string,
  previewUrl: string
}

export enum FileProcessingStage {
  None = 0,
  WAITING_CONVERTING = 10,
  CONVERTING = 11,
  WAITING_PROCESSING = 20,
  PROCESSING = 21,
  ERROR = 99,
  DONE = 100
}

export interface FileProgressDto {
  file_id: FileId
  stage: FileProcessingStage
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
  stage: FileProcessingStage
}

export interface FilesBatchFetchResponse {
  progress: FileProgressDto[]
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

export interface IconResponse {
  iconId: string
}

export interface IconDto {
  iconId: string,
  iconUrl: string,
  iconName: string
}

export enum ResourceType {
  None = 0,
  Organization = 1,
  Workspace = 2,
  Chat = 3,
  Group = 4,
  User = 5,
  File = 6
}

