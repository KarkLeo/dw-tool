import { IClassConfig } from '../models/types'
import {
  ABILITIES,
  ABILITIES_MODIFIERS,
  ALIGNMENTS,
  CLASSES,
  DICES,
  RACES,
} from '../constants'

const fighter: IClassConfig = {
  name: CLASSES.fighter,
  races: [RACES.dwarf, RACES.elf, RACES.human, RACES.halfling],
  alignments: [ALIGNMENTS.good, ALIGNMENTS.neutral, ALIGNMENTS.evil],
  stats: {
    hp: { base: 10, increase: ABILITIES.constitution },
    damage: { count: 1, dice: DICES.d10 },
    load: { base: 12, increase: ABILITIES_MODIFIERS.str },
  },
}

export default fighter
