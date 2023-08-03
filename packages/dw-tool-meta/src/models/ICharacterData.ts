import { IUserData } from '.'
import { ALIGNMENTS, CLASSES, RACES } from '../constants'
import { Abilities } from './Abilities'

export interface ICharacterData {
  name?: string
  looks?: Record<number, string>
  race?: RACES
  class?: CLASSES
  alignment?: ALIGNMENTS
  hitPoints?: number
  armorClass?: number
  abilities?: Abilities
  skills?: []
  equipment?: []
  spells?: []
}

export interface ICharacterListData
  extends Pick<ICharacterData, 'name' | 'race' | 'class' | 'alignment'> {
  id: number
  createdAt: string
  updatedAt: string
}
export interface ICharacterFullData {
  id: number
  name: string
  looks: string[]
  class: CLASSES
  race: RACES
  alignment: ALIGNMENTS
  createdAt: string
  updatedAt: string
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
  user: IUserData
}
