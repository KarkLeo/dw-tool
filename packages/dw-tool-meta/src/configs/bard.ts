import { IClassConfig } from '../models/types'
import {
  ABILITIES,
  ABILITIES_MODIFIERS,
  ALIGNMENTS,
  CLASSES,
  DICES,
  RACES,
} from '../constants'

const bard: IClassConfig = {
  name: CLASSES.bard,
  races: [RACES.elf, RACES.human],
  alignments: [ALIGNMENTS.good, ALIGNMENTS.neutral, ALIGNMENTS.chaotic],
  stats: {
    hp: { base: 6, increase: ABILITIES.constitution },
    damage: { count: 1, dice: DICES.d6 },
    load: { base: 9, increase: ABILITIES_MODIFIERS.str },
  },
}

export default bard
