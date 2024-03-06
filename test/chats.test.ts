import { AnswerStatus, ChatAnswerType } from "../src"
import { AnswerImpl } from "../src/storages/chats/answer.impl"
import { ChatImpl } from "../src/storages/chats/chat.impl"
import { testInOrganization } from "./setup"
import { appTest, UnitTest } from "../src/unitTest"
import { AnswerEvent } from "../src/storages/chats/answer"

test("Chat create, ask question, delete", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
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

      const question = "Hello!"

      const askPromise = chat.ask(question, ChatAnswerType.SHORT)

      // check not throw
      await expect(askPromise).resolves.not.toThrow()

      const answer = await askPromise

      expect(answer.id).toBeTruthy()
      expect(answer.status).toBe(AnswerStatus.RUNNING)
      expect(answer.question).toBe(question)

      let tokens = ""
      let answer_ready = false

      answer.subscribe((event) => {
        if (event.type == AnswerEvent.UPDATED){
          expect(event.data).toBeTruthy()
          expect(event.data.id).not.toBeUndefined()
          expect(event.data.status).not.toBeUndefined()
          
          process.stdout.write(event.data.tokens.substring(tokens.length))

          tokens = event.data.tokens

          if (event.data.status != AnswerStatus.RUNNING){
            answer_ready = true
          }
        }
      })

      while (!answer_ready){
        await new Promise(f => setTimeout(f, 2000))
      }

      // check delete
      await expect(org.chats.delete(chat.id)).resolves.not.toThrow()

    })
  })
})

test("Chat Impl Test", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    await testInOrganization(async (app, org) => {
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

      for (const answer of chatImpl["_answers"]) {
        expect(answer).toBeInstanceOf(AnswerImpl)
        expect(answer["chat"]).toBe(chatImpl)
        expect(answer["context"]).toBe(app.context)
      }

      expect(chatImpl.id).toBe("chat123")
      expect(chatImpl.name).toBe("Chat 1")
      expect(chatImpl.collection.length).toBe(0)

      chatImpl.dispose()

      // Create answer
      await expect(chatImpl.ask("Hello", ChatAnswerType.SHORT)).rejects.toThrow()
    })
  })
})
