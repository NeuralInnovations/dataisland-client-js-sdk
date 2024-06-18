import { AnswerId, StepId } from "../storages/chats/answer"
import { ChatId } from "../storages/chats/chat"
import { UserId } from "../storages/user/userProfile"

export interface SourceDto {
  id: string;
  name: string;
  url: string;
  content: string;
  page: number;
}

export interface AnswerDto {
  id: AnswerId;
  chatId: ChatId;
  question: string;
  context: string;
  sources: SourceDto[];
  timestamp: number;
}

export interface ChatDto {
  id: ChatId;
  name: string;
  createdAt: number;
  modifiedAt: number;
  userId: UserId;
  organizationId: string;
  workspaceIds: string[];
  fileId: string;
  model: string;
  clientContext: string;
  answers: AnswerDto[];
}

export interface ChatListResponse {
  chats: ChatDto[]
}

export enum AnswerStatus {
  RUNNING = 0,
  SUCCESS = 1,
  CANCELED = 2,
  FAIL = 3,
}

export interface AnswerStepDto {
  id: StepId;
  type: StepType;
  status: StepStatus;
  start_at: string;
  end_at: string;
  tokens: string[];
  sources: SourceDto[];
}

export interface FetchAnswerResponse {
  id: AnswerId;
  status: AnswerStatus;
  steps: AnswerStepDto[];
}

export interface FetchTokensResponse {
  id: string;
  step_id: string;
  step_status: number;
  step_tokens: string[];
}

export interface AnswerSourcesResponse {
  chat_uid: string;
  uid: string;
  step_id: string;
  sources: SourceDto[];
}

export enum StepStatus {
  RUNNING = 0,
  SUCCESS = 1,
  FAIL = 2,
  CANCELED = 3,
}

export enum StepType {
  PREPARE = 0,
  SOURCES = 1,
  GENERATE_ANSWER = 6,
  FINALIZE_RESULT = 9,
  DONE = 10,
}

export class StepTypeInfo {
  public static hasTokens(type: StepType): boolean {
    switch (type) {
    case StepType.GENERATE_ANSWER:
    case StepType.DONE:
    case StepType.FINALIZE_RESULT:
      return true
    }
    return false
  }

  public static hasSources(type: StepType): boolean {
    switch (type) {
    case StepType.SOURCES:
      return true
    }
    return false
  }
}
