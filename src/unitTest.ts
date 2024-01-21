export enum UnitTest {
  DO_NOTHING = 0,
  DO_NOT_START = 1 << 0,
  DO_NOT_PRINT_INITIALIZED_LOG = 1 << 1,

  DEFAULT = DO_NOT_START | DO_NOT_PRINT_INITIALIZED_LOG
}

export type UnitTestProfileSyncAction = () => void
export type UnitTestProfileAsyncAction = () => Promise<void>

export class UnitTestProfile {
  private static _stack: UnitTest[] = [UnitTest.DO_NOTHING]

  public static get current(): UnitTest {
    return this._stack[this._stack.length - 1]
  }

  public static async test(
    unitTest: UnitTest = UnitTest.DEFAULT,
    func?: UnitTestProfileSyncAction | UnitTestProfileAsyncAction
  ): Promise<void> {
    this._stack.push(unitTest)
    if (func) {
      const result = func()
      if (result) {
        await result
      }
      UnitTestProfile.end()
    }
  }

  private static end(): void {
    if (this._stack.length > 1) {
      this._stack.pop()
    }
  }
}

export const isUnitTest = (mask: UnitTest): boolean => {
  return (UnitTestProfile.current & mask) == mask
}
