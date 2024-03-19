// check if the object is null or undefined
export const isNullOrUndefined = (object: unknown): object is null | undefined => {
  return object === null || object === undefined
}

export const isEmptyNullOrUndefined = (object: unknown): boolean => {
  return isNullOrUndefined(object) || object === ""
}
