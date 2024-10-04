import {
  OrganizationPromptDto
} from "../../dto/userInfoResponse"

export abstract class OrganizationPrompts {

  /**
   * Get all organization prompts
   */
  abstract getPrompts(): Promise<OrganizationPromptDto[]>

  /**
   * Create/Update/Delete new prompt
   * @param key - key of prompt
   * @param value - value of prompt, null|undefined to delete
   */
  abstract updatePrompt(key: string, value: string | undefined | null): Promise<void>

  /**
   * Update prompts in bulk
   * @param prompts - array of prompts (value can be null|undefined to delete)
   */
  abstract updatePrompts(prompts: OrganizationPromptDto[]): Promise<void>

  /**
   * Delete prompt
   * @param key
   */
  abstract deletePrompt(key: string): Promise<void>
}
