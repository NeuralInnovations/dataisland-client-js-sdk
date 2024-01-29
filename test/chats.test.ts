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


    // check delete
    await expect(org.chats.delete(chat.id)).resolves.not.toThrow()
  })
})
