import { IClassConfig } from '../models/types'
import {
  ABILITIES,
  ABILITIES_MODIFIERS,
  ALIGNMENTS,
  CLASSES,
  DICES,
  RACES,
} from '../constants'

const druid: IClassConfig = {
  name: CLASSES.druid,
  races: [RACES.elf, RACES.human, RACES.halfling],
  alignments: [ALIGNMENTS.chaotic, ALIGNMENTS.good, ALIGNMENTS.neutral],
  stats: {
    hp: { base: 6, increase: ABILITIES.constitution },
    damage: { count: 1, dice: DICES.d6 },
    load: { base: 6, increase: ABILITIES_MODIFIERS.str },
  },
}

export default druid
