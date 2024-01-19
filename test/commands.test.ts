import { Command, CommandHandler } from '../src/services/commandService'
import { appSdk } from '../src'

class Cmd extends Command {
  constructor(public readonly name: string = 'test') {
    super()
  }
}

class CmdHandler extends CommandHandler<Cmd> {
  async execute(message: Cmd): Promise<void> {
    expect(message.name).toBe('test-command')
  }
}

test('Commands test', async () => {
  const app = await appSdk('test-commands', async builder => {
    builder.registerCommand(Cmd, context => new CmdHandler(context))
  })
  expect(app.context.execute(new Cmd('test-command'))).toBeDefined()
})
