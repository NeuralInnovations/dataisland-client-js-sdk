import {
  AnswerEvent,
  AnswerStatus,
  ChatAnswerType, ChatType
} from "../src"
import {AnswerImpl} from "../src/storages/chats/answer.impl"
import {ChatImpl} from "../src/storages/chats/chat.impl"
import {
  testInLibrary,
  testInOrganization,
  testInWorkspace,
  uploadTestFile
} from "./setup"
import {appTest, UnitTest} from "../src/unitTest"

test("Chat create, ask question, delete", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    await testInOrganization(async (app, org) => {
      const chatPromise = org.chats.create("search", "Test user")

      // check not throw
      await expect(chatPromise).resolves.not.toThrow()

      // get chat
      const chat = await chatPromise

      // check exists
      expect(chat).not.toBeUndefined()

      // check exists
      expect(chat).not.toBeNull()

      // check get
      expect(org.chats.get(chat!.id)).toBe(chat)
      expect(chat?.model).toBe("search")
      expect(chat?.clientContext).toBe("Test user")

      const chatResource = org.chats.get(chat!.id).resource
      expect(chatResource.chatType).toBe(ChatType.Organization)

      const question = "Hello!"

      const askPromise = chat!.ask(question, ChatAnswerType.SHORT)

      // check not throw
      await expect(askPromise).resolves.not.toThrow()

      const answer = await askPromise

      expect(answer!.id).toBeTruthy()
      expect(answer!.status).toBe(AnswerStatus.RUNNING)
      expect(answer!.question).toBe(question)

      let tokens = ""
      let answer_ready = false

      answer!.subscribe((event) => {
        if (event.type === AnswerEvent.UPDATED) {
          expect(event.data).toBeTruthy()
          expect(event.data.id).not.toBeUndefined()
          expect(event.data.status).not.toBeUndefined()

          process.stdout.write(event.data.tokens.substring(tokens.length))

          tokens = event.data.tokens

          if (event.data.status != AnswerStatus.RUNNING) {
            answer_ready = true
          }
        }
      })

      while (!answer_ready) {
        await new Promise(f => setTimeout(f, 500))
      }

      await new Promise(f => setTimeout(f, 1000))
      // check delete
      await expect(org.chats.delete(chat!.id)).resolves.not.toThrow()
    })
  })
})

test("Chat create with file, ask and delete", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    await testInWorkspace(async (app, org, ws) => {
      const file = await uploadTestFile(org, ws,"test/data/test_file.pdf", "application/pdf")

      const chatPromise = org.chats.createWithFile(file)

      // check not throw
      await expect(chatPromise).resolves.not.toThrow()

      // get chat
      const chat = await chatPromise

      // check exists
      expect(chat).not.toBeUndefined()

      // check exists
      expect(chat).not.toBeNull()

      // check get
      expect(org.chats.get(chat!.id)).toBe(chat)

      const chatResource = org.chats.get(chat!.id).resource
      expect(chatResource.chatType).toBe(ChatType.File)
      expect(chatResource.fileId).toBe(file)

      const question = "Хто учасники навчального проекту?"

      const askPromise = chat!.ask(question, ChatAnswerType.SHORT)

      // check not throw
      await expect(askPromise).resolves.not.toThrow()

      const answer = await askPromise

      expect(answer!.id).toBeTruthy()
      expect(answer!.status).toBe(AnswerStatus.RUNNING)
      expect(answer!.question).toBe(question)

      let tokens = ""
      let answer_ready = false

      answer!.subscribe((event) => {
        if (event.type === AnswerEvent.UPDATED) {
          expect(event.data).toBeTruthy()
          expect(event.data.id).not.toBeUndefined()
          expect(event.data.status).not.toBeUndefined()

          process.stdout.write(event.data.tokens.substring(tokens.length))

          tokens = event.data.tokens

          if (event.data.status !== AnswerStatus.RUNNING) {
            answer_ready = true
          }
        }
      })

      while (!answer_ready) {
        await new Promise(f => setTimeout(f, 500))
      }

      for (const source of answer!.sources) {
        await expect(source.id).toBe(file)
      }


      const askCancelPromise = chat!.ask(question, ChatAnswerType.SHORT)

      // check not throw
      await expect(askCancelPromise).resolves.not.toThrow()

      const cancelAnswer = await askCancelPromise

      await expect(cancelAnswer!.cancel()).resolves.not.toThrow()

      await new Promise(f => setTimeout(f, 1000))
      // check delete
      await expect(org.chats.delete(chat!.id)).resolves.not.toThrow()

      await ws.files.delete([file])
    })
  })
})

test("Chat create with workspace, ask and delete", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    await testInWorkspace(async (app, org, ws) => {
      const file = await uploadTestFile(org, ws,"test/data/test_file.pdf", "application/pdf")

      const chatPromise = org.chats.createWithWorkspace([ws.id], "Test user")

      // check not throw
      await expect(chatPromise).resolves.not.toThrow()

      // get chat
      const chat = await chatPromise

      // check exists
      expect(chat).not.toBeUndefined()

      // check exists
      expect(chat).not.toBeNull()

      // check get
      expect(org.chats.get(chat!.id)).toBe(chat)

      const chatResource = org.chats.get(chat!.id).resource
      expect(chatResource.chatType).toBe(ChatType.Workspaces)
      expect(chatResource.workspaceIds[0]).toBe(ws.id)

      const question = "Хто учасники навчального проекту?"

      const askPromise = chat!.ask(question, ChatAnswerType.SHORT)

      // check not throw
      await expect(askPromise).resolves.not.toThrow()

      const answer = await askPromise

      expect(answer!.id).toBeTruthy()
      expect(answer!.status).toBe(AnswerStatus.RUNNING)
      expect(answer!.question).toBe(question)

      let tokens = ""
      let answer_ready = false

      answer!.subscribe((event) => {
        if (event.type === AnswerEvent.UPDATED) {
          expect(event.data).toBeTruthy()
          expect(event.data.id).not.toBeUndefined()
          expect(event.data.status).not.toBeUndefined()

          process.stdout.write(event.data.tokens.substring(tokens.length))

          tokens = event.data.tokens

          if (event.data.status !== AnswerStatus.RUNNING) {
            answer_ready = true
          }
        }
      })

      while (!answer_ready) {
        await new Promise(f => setTimeout(f, 500))
      }

      for (const source of answer!.sources) {
        await expect(source.id).toBe(file)
      }

      await new Promise(f => setTimeout(f, 1000))
      // check delete
      await expect(org.chats.delete(chat!.id)).resolves.not.toThrow()

      await ws.files.delete([file])
    })
  })
})

test("Chat create with library", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    await testInLibrary(async (app, org, ws, lib) => {
      const file = await uploadTestFile(org, ws,"test/data/test_file.pdf", "application/pdf")

      const chatPromise = org.chats.createWithLibraryFolder(lib.id, [ws.id])

      // check not throw
      await expect(chatPromise).resolves.not.toThrow()

      // get chat
      const chat = await chatPromise

      // check exists
      expect(chat).not.toBeUndefined()

      // check exists
      expect(chat).not.toBeNull()

      // check get
      expect(org.chats.get(chat!.id)).toBe(chat)

      const chatResource = org.chats.get(chat!.id).resource
      expect(chatResource.chatType).toBe(ChatType.LibraryWorkspaces)
      expect(chatResource.workspaceIds).toStrictEqual([ws.id])


      const question = "Хто учасники навчального проекту?"

      const askPromise = chat!.ask(question, ChatAnswerType.SHORT)

      // check not throw
      await expect(askPromise).resolves.not.toThrow()

      const answer = await askPromise

      expect(answer!.id).toBeTruthy()
      expect(answer!.status).toBe(AnswerStatus.RUNNING)
      expect(answer!.question).toBe(question)

      let tokens = ""
      let answer_ready = false

      answer!.subscribe((event) => {
        if (event.type === AnswerEvent.UPDATED) {
          expect(event.data).toBeTruthy()
          expect(event.data.id).not.toBeUndefined()
          expect(event.data.status).not.toBeUndefined()

          process.stdout.write(event.data.tokens.substring(tokens.length))

          tokens = event.data.tokens

          if (event.data.status !== AnswerStatus.RUNNING) {
            answer_ready = true
          }
        }
      })

      while (!answer_ready) {
        await new Promise(f => setTimeout(f, 500))
      }

      for (const source of answer!.sources) {
        await expect(source.id).toBe(file)
      }

      await new Promise(f => setTimeout(f, 1000))
      // check delete
      await expect(org.chats.delete(chat!.id)).resolves.not.toThrow()

      await ws.files.delete([file])
    })
  })
})

test("Chat create with library file", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    await testInLibrary(async (app, org, ws, lib) => {
      const file = await uploadTestFile(org, ws,"test/data/test_file.pdf", "application/pdf")

      const chatPromise = org.chats.createWithLibraryFile(lib.id, file)

      // check not throw
      await expect(chatPromise).resolves.not.toThrow()

      // get chat
      const chat = await chatPromise

      // check exists
      expect(chat).not.toBeUndefined()

      // check exists
      expect(chat).not.toBeNull()

      // check get
      expect(org.chats.get(chat!.id)).toBe(chat)

      const chatResource = org.chats.get(chat!.id).resource
      expect(chatResource.chatType).toBe(ChatType.LibraryFile)
      expect(chatResource.fileId).toBe(file)

      const question = "Хто учасники навчального проекту?"

      const askPromise = chat!.ask(question, ChatAnswerType.SHORT)

      // check not throw
      await expect(askPromise).resolves.not.toThrow()

      const answer = await askPromise

      expect(answer!.id).toBeTruthy()
      expect(answer!.status).toBe(AnswerStatus.RUNNING)
      expect(answer!.question).toBe(question)

      let tokens = ""
      let answer_ready = false

      answer!.subscribe((event) => {
        if (event.type === AnswerEvent.UPDATED) {
          expect(event.data).toBeTruthy()
          expect(event.data.id).not.toBeUndefined()
          expect(event.data.status).not.toBeUndefined()

          process.stdout.write(event.data.tokens.substring(tokens.length))

          tokens = event.data.tokens

          if (event.data.status !== AnswerStatus.RUNNING) {
            answer_ready = true
          }
        }
      })

      while (!answer_ready) {
        await new Promise(f => setTimeout(f, 500))
      }

      for (const source of answer!.sources) {
        await expect(source.id).toBe(file)
      }

      await new Promise(f => setTimeout(f, 1000))
      // check delete
      await expect(org.chats.delete(chat!.id)).resolves.not.toThrow()

      await ws.files.delete([file])
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
        userId: "",
        resources: {
          chatType: ChatType.Organization,
          libraryId: "",
          organizationId: "",
          workspaceIds: [""],
          fileId: ""
        },
        model: "search",
        clientContext: "",
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
