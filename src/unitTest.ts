export enum UnitTest {
  DO_NOTHING = 0,
  DO_NOT_START = 1 << 0,

  DEFAULT = DO_NOT_START
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

export const isUnitTestDoNotStart = (value: Record<string, any>): boolean => {
  if (!isUnitTest(value)) {
    return false
  }
  return (value.unitTest & UnitTest.DO_NOT_START) === UnitTest.DO_NOT_START
}
