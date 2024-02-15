import { ChatAnswerType } from "../src"
import { AnswerStatus, StepType } from "../src/dto/chatResponse"
import { AnswerImpl } from "../src/storages/chats/answer.impl"
import { ChatImpl } from "../src/storages/chats/chat.impl"
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

    const chatDto = {
      id: "chat123",
      name: "Chat 1",
      createdAt: 1234567890,
      modifiedAt: 1234567890,
      userId: "user123",
      organizationId: "org123",
      workspaceId: "workspace123",
      answers: []
    }
    
    const chatImpl = new ChatImpl(app.context, org)

    await chatImpl.initFrom(chatDto)

    expect(() => {
      chatImpl.initFrom(chatDto)
    }).not.toThrow()

    for (const answer of chat["_answers"]) {
      expect(answer).toBeInstanceOf(AnswerImpl)
      expect(answer["chat"]).toBe(chat)
      expect(answer["context"]).toBe(app.context)
    }

    expect(chatImpl.id).toBe("chat123")
    expect(chatImpl.name).toBe("Chat 1")
    expect(chatImpl.collection.length).toBe(0)

    chatImpl.dispose()

    await expect(chatImpl.ask("Hello", ChatAnswerType.SHORT)).rejects.toThrow()

    // Create answer

    const question = "Hello!"

    const askPromise = chat.ask(question, ChatAnswerType.SHORT)

    // check not throw
    await expect(chatPromise).resolves.not.toThrow()

    const answer = await askPromise

    expect(answer.id).toBeTruthy()
    expect(answer.status).toBe(AnswerStatus.RUNNING)

    while (answer.status !== AnswerStatus.SUCCESS) {
      await new Promise(r => setTimeout(r, 300))
      await answer.fetch()
    }

    expect(answer).toBeTruthy()
    expect(answer.id).not.toBeUndefined()
    expect(answer.status).not.toBeUndefined()

    const tokens = await answer.fetchTokens(StepType.DONE, 0)

    expect(tokens.step_tokens.length).toBeGreaterThan(0)

    await expect(answer.fetchTokens(StepType.PREPARE, 0)).rejects.toThrow(`Step with type ${StepType.PREPARE} is not found`)


    await expect(chatImpl.ask("Hello", ChatAnswerType.SHORT)).rejects.toThrow()


    const askPromise2 = chat.ask(question, ChatAnswerType.SHORT)
    const answer2 = await askPromise2

    await expect(answer2.cancel()).rejects.toThrow()

    const answerImpl = new AnswerImpl(chat, app.context)
    const type = StepType.SOURCES

    const answerDto = {
      id: answer.id,
      sources: [],
      chatId: chat.id,
      question: question,
      context: app.name,
      timestamp: 123,
    }
   
    await answerImpl.initFromData(answerDto)
    expect(answer.id).toBe(answer.id)

    const wrongStepTpe = StepType.PREPARE
    const sources = []

    await expect(answer.sources(wrongStepTpe)).rejects.toThrow(`Step with type ${wrongStepTpe} is not found, answer: ${answer.id}, organization: ${chat.organization.id}`)

    const fetchSpy = jest.spyOn(answer, "fetch").mockResolvedValueOnce()
    const result = await answer.sources(type)


    expect(fetchSpy).toHaveBeenCalled()
    expect(result).toEqual(sources)

    // check delete
    await expect(org.chats.delete(chat.id)).resolves.not.toThrow()
  })
})
