import { IClassConfig } from '../models/types'
import {
  ABILITIES,
  ABILITIES_MODIFIERS,
  ALIGNMENTS,
  CLASSES,
  DICES,
  RACES,
} from '../constants'

const wizard: IClassConfig = {
  name: CLASSES.wizard,
  races: [RACES.elf, RACES.human],
  alignments: [ALIGNMENTS.good, ALIGNMENTS.neutral, ALIGNMENTS.evil],
  stats: {
    hp: { base: 4, increase: ABILITIES.constitution },
    damage: { count: 1, dice: DICES.d4 },
    load: { base: 7, increase: ABILITIES_MODIFIERS.str },
  },
}

export default wizard
