export enum UnitTest {
  DO_NOTHING = 0,
  DO_NOT_START = 1 << 0,
  DO_NOT_PRINT_INITIALIZED_LOG = 1 << 1,

  DEFAULT = DO_NOT_START | DO_NOT_PRINT_INITIALIZED_LOG
}

export const isUnitTest = (value: Record<string, any>): boolean => {
  if (value === undefined || value === null) {
    return false
  }
  if (value.unitTest === undefined || value.unitTest === null) {
    return false
  }
  return typeof value.unitTest === 'number'
}

export const isUnitTestMask = (
  value: Record<string, any>,
  mask: UnitTest
): boolean => {
  if (!isUnitTest(value)) {
    return false
  }
  return (value.unitTest & mask) === mask
}

export const isUnitTestDoNotStart = (value: Record<string, any>): boolean => {
  return isUnitTestMask(value, UnitTest.DO_NOT_START)
}
