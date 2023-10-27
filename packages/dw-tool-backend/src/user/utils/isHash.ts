import { getRounds } from 'bcrypt'

export const isHash = (value: string): boolean => {
  try {
    getRounds(value)
    return true
  } catch (e) {
    return false
  }
}
