export const isValueInEnum = <T extends object>(
  value: string,
  enumData: T
): boolean => Object.values(enumData).includes(value)
