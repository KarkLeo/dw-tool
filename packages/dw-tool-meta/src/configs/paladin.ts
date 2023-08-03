import { IClassConfig } from '../models/types'
import {
  ABILITIES,
  ABILITIES_MODIFIERS,
  ALIGNMENTS,
  CLASSES,
  DICES,
  RACES,
} from '../constants'

const paladin: IClassConfig = {
  name: CLASSES.paladin,
  races: [RACES.human],
  alignments: [ALIGNMENTS.lawful, ALIGNMENTS.good],
  stats: {
    hp: { base: 10, increase: ABILITIES.constitution },
    damage: { count: 1, dice: DICES.d10 },
    load: { base: 12, increase: ABILITIES_MODIFIERS.str },
  },
}

export default paladin
