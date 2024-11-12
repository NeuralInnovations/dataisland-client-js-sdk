import {
  OrganizationPromptDto
} from "../../dto/userInfoResponse"

export abstract class OrganizationPrompts {

  /**
   * Get default organization prompts
   * @param sourceName - service source of prompts, possible options "chat" or "quiz"
   */
  abstract getDefaultPrompts(sourceName: string): Promise<OrganizationPromptDto[]>

  /**
   * Get all organization prompts
   * @param sourceName - service source of prompts, possible options "chat" or "quiz"
   */
  abstract getPrompts(sourceName: string): Promise<OrganizationPromptDto[]>

  /**
   * Create/Update/Delete new prompt
   * @param sourceName - service source of prompts, possible options "chat" or "quiz"
   * @param key - key of prompt
   * @param value - value of prompt, null|undefined to delete
   */
  abstract updatePrompt(sourceName: string, key: string, value: string | undefined | null): Promise<void>

  /**
   * Update prompts in bulk
   * @param sourceName - service source of prompts, possible options "chat" or "quiz"
   * @param prompts - array of prompts (value can be null|undefined to delete)
   */
  abstract updatePrompts(sourceName: string, prompts: OrganizationPromptDto[]): Promise<void>

  /**
   * Delete prompt
   * @param sourceName
   * @param key
   */
  abstract deletePrompt(sourceName: string, key: string): Promise<void>

  /**
   * Delete prompt
   * @param sourceName
   * @param keys
   */
  abstract deletePrompts(sourceName: string, keys: string[]): Promise<void>
}
