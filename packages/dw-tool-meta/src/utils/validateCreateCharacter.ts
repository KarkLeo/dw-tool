import { ICharacterData } from '../models'
import { validateAbility } from './validateAbility'

export const validateCreateCharacter = (data: ICharacterData): boolean => {
  return (
    data.name !== '' &&
    data.class !== undefined &&
    data.race !== undefined &&
    data.alignment !== undefined &&
    Object.values(data.abilities as object).every(validateAbility) &&
    data.looks !== undefined &&
    Object.values(data.looks as object).every((look) => look !== '')
  )
}
