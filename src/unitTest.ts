export enum UnitTest {
  DO_NOTHING = 0,
  DO_NOT_START = 1 << 0,
  DO_NOT_PRINT_INITIALIZED_LOG = 1 << 1,

  DO_NOT_START_SDK = DO_NOT_START | DO_NOT_PRINT_INITIALIZED_LOG
}

export type UnitTestProfileSyncAction = () => void
export type UnitTestProfileAsyncAction = () => Promise<void>

class AppSdkUnitTest {
  private static _stack: UnitTest[] = [UnitTest.DO_NOTHING]

  public static get current(): UnitTest {
    return this._stack[this._stack.length - 1]
  }

  public static async test(
    unitTest: UnitTest = UnitTest.DO_NOT_START_SDK,
    func: UnitTestProfileSyncAction | UnitTestProfileAsyncAction
  ): Promise<void> {
    this._stack.push(unitTest)
    if (func) {
      const result = func()
      if (result) {
        await result
      }
      AppSdkUnitTest.end()
    }
  }

  private static end(): void {
    if (this._stack.length > 1) {
      this._stack.pop()
    }
  }
}

export const appTest = async (
  unitTest: UnitTest = UnitTest.DO_NOT_START_SDK,
  func: UnitTestProfileSyncAction | UnitTestProfileAsyncAction
): Promise<void> => {
  await AppSdkUnitTest.test(unitTest, func)
}

export const appTestCurrent = (): UnitTest => {
  return AppSdkUnitTest.current
}

export const isUnitTest = (mask: UnitTest): boolean => {
  return (AppSdkUnitTest.current & mask) == mask
}
