import { IClassConfig } from '../models/types'
import {
  ABILITIES,
  ABILITIES_MODIFIERS,
  ALIGNMENTS,
  CLASSES,
  DICES,
  RACES,
} from '../constants'

const thief: IClassConfig = {
  name: CLASSES.thief,
  races: [RACES.halfling, RACES.human],
  alignments: [ALIGNMENTS.chaotic, ALIGNMENTS.neutral, ALIGNMENTS.evil],
  stats: {
    hp: { base: 6, increase: ABILITIES.constitution },
    damage: { count: 1, dice: DICES.d8 },
    load: { base: 9, increase: ABILITIES_MODIFIERS.str },
  },
}

export default thief
