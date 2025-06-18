import { ChatbotAccountType, KeyValueItem } from "../src/dto/chatbotAccountResponse"
import { appTest, UnitTest } from "../src/unitTest"
import { testInOrganization } from "./setup"



test.skip("Chatbot", async () => {
  await appTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG, async () => {
    await testInOrganization(async (app, org) => {
      const updatePromise = org.chatbotAccounts.update()

      await expect(updatePromise).resolves.not.toThrow()

      expect(org.chatbotAccounts.collection.length).toBe(0)

      const createPromise = org.chatbotAccounts.add(
        ChatbotAccountType.Messenger,
        "test",
        "password",
        "2fa",
        "",
        [1],
        [new KeyValueItem("test", "test")])

      await expect(createPromise).resolves.not.toThrow()

      expect(org.chatbotAccounts.collection.length).toBe(1)

    })})
})
