import {
  OrganizationPromptDto
} from "../../dto/userInfoResponse"

export abstract class OrganizationPrompts {

  /**
   * @returns list of source names
   * @example ["chat", "quiz"]
   */
  get sourceNames(): string[] {
    return ["chat", "quiz"]
  }

  /**
   * Get default organization prompts
   * @param sourceName - service source of prompts, possible options "chat" or "quiz"
   */
  abstract getDefaultPrompts(sourceName: "chat" | "quiz"): Promise<OrganizationPromptDto[]>

  /**
   * Get all organization prompts
   * @param sourceName - service source of prompts, possible options "chat" or "quiz"
   */
  abstract getPrompts(sourceName: "chat" | "quiz"): Promise<OrganizationPromptDto[]>

  /**
   * Create/Update/Delete new prompt
   * @param sourceName - service source of prompts, possible options "chat" or "quiz"
   * @param key - key of prompt
   * @param value - value of prompt, null|undefined to delete
   */
  abstract updatePrompt(sourceName: "chat" | "quiz", key: string, value: string | undefined | null): Promise<void>

  /**
   * Update prompts in bulk
   * @param sourceName - service source of prompts, possible options "chat" or "quiz"
   * @param prompts - array of prompts (value can be null|undefined to delete)
   */
  abstract updatePrompts(sourceName: "chat" | "quiz", prompts: OrganizationPromptDto[]): Promise<void>

  /**
   * Delete prompt
   * @param sourceName
   * @param key
   */
  abstract deletePrompt(sourceName: "chat" | "quiz", key: string): Promise<void>

  /**
   * Delete prompt
   * @param sourceName
   * @param keys
   */
  abstract deletePrompts(sourceName: "chat" | "quiz", keys: string[]): Promise<void>
}
