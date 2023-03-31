import { IClassConfig } from 'src/meta/configs/types'
import {
  ABILITIES,
  ABILITIES_MODIFIERS,
  ALIGNMENTS,
  CLASSES,
  DICES,
  RACES,
} from 'src/meta/constants'

const bard: IClassConfig = {
  name: CLASSES.bard,
  races: [RACES.elf, RACES.human],
  alignments: [ALIGNMENTS.good, ALIGNMENTS.neutral, ALIGNMENTS.chaotic],
  stats: {
    hp: { base: 6, increase: ABILITIES.constitution },
    damage: { count: 1, dice: DICES.d6, increase: ABILITIES_MODIFIERS.cha },
    load: { base: 9, increase: ABILITIES_MODIFIERS.str },
  },
}

export default bard
