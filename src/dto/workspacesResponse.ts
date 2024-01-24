import { WorkspaceId } from "../storages/workspaces"
import { FileId } from "../storages/files"

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
  url: string
}

export interface FileProgressDto {
  file_id: FileId
  file_parts_count: number
  completed_parts_count: number
  success: boolean
  error: string
}

export interface FileDto {
  id: string
  createdAt: number
  modifiedAt: number
  name: string
  description: string
  url: string
  hash: string
  organizationId: string
  workspaceId: string
  isProcessedSuccessfully: boolean
}

export interface FileListResponse {
  files: FileDto[]
  totalFilesCount: number
  filesPerPage: number
}
