export const mapEnum = <T extends object>(enumData: T): Array<keyof T> =>
  Object.keys(enumData) as Array<keyof T>
