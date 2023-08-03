import { IClassConfig } from '../models/types'
import {
  ABILITIES,
  ABILITIES_MODIFIERS,
  ALIGNMENTS,
  CLASSES,
  DICES,
  RACES,
} from '../constants'

const ranger: IClassConfig = {
  name: CLASSES.ranger,
  races: [RACES.elf, RACES.human],
  alignments: [ALIGNMENTS.chaotic, ALIGNMENTS.good, ALIGNMENTS.neutral],
  stats: {
    hp: { base: 8, increase: ABILITIES.constitution },
    damage: { count: 1, dice: DICES.d8 },
    load: { base: 11, increase: ABILITIES_MODIFIERS.str },
  },
}

export default ranger
