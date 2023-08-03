import { IClassConfig } from '../models/types'
import {
  ABILITIES,
  ABILITIES_MODIFIERS,
  ALIGNMENTS,
  CLASSES,
  DICES,
  RACES,
} from '../constants'

const cleric: IClassConfig = {
  name: CLASSES.cleric,
  races: [RACES.dwarf, RACES.human],
  alignments: [ALIGNMENTS.good, ALIGNMENTS.lawful, ALIGNMENTS.evil],
  stats: {
    hp: { base: 8, increase: ABILITIES.constitution },
    damage: { count: 1, dice: DICES.d6 },
    load: { base: 10, increase: ABILITIES_MODIFIERS.str },
  },
}

export default cleric
