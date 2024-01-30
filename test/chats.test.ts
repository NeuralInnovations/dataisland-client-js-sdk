import { ChatAnswerType } from "../src"
import { AnswerStatus, StepType } from "../src/dto/chatResponse"
import { testInOrganization } from "./setup"

test("Chat create, ask question, delete", async () => {
  await testInOrganization(async (app, org) => {

    const chatPromise = org.chats.create()
    
    // check not throw
    await expect(chatPromise).resolves.not.toThrow()

    // get chat
    const chat = await chatPromise

    // check exists
    expect(chat).not.toBeUndefined()

    // check exists
    expect(chat).not.toBeNull()


    // check get
    expect(org.chats.get(chat.id)).toBe(chat)

    // Create answer

    const askPromise = chat.ask("Hello!", ChatAnswerType.SHORT)

    // check not throw
    await expect(chatPromise).resolves.not.toThrow()

    const answer = await askPromise

    await expect(answer.status).toBe(AnswerStatus.RUNNING)

    while (answer.status !== AnswerStatus.SUCCESS){
      await answer.fetch()
    }

    const tokens = await answer.fetch_tokens(StepType.DONE, 0)

    await expect(tokens.step_tokens.length).toBeGreaterThan(0)

    // check delete
    await expect(org.chats.delete(chat.id)).resolves.not.toThrow()
  })
})
