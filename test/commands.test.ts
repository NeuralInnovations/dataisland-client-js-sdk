import { Command, CommandHandler } from "../src/services/commandService"
import { dataIslandApp } from "../src"
import { appTest, UnitTest } from "../src/unitTest"

class Cmd extends Command {
  constructor(public readonly name: string = "test") {
    super()
  }
}

class CmdHandler extends CommandHandler<Cmd> {
  async execute(message: Cmd): Promise<void> {
    expect(message.name).toBe("test-command")
  }
}

test("Commands test", async () => {
  await appTest(UnitTest.DO_NOT_START_SDK, async () => {
    const app = await dataIslandApp("test-commands", async builder => {
      builder.registerCommand(Cmd, context => new CmdHandler(context))
    })
    expect(app.context.execute(new Cmd("test-command"))).toBeDefined()
  })
})
