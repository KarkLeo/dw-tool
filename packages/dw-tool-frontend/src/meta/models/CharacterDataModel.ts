import { ALIGNMENTS, CLASSES, RACES } from 'src/meta/constants'
import { Abilities } from 'src/meta/models/Abilities'

export interface CharacterDataModel {
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
