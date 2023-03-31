import {
  ABILITIES,
  ABILITIES_MODIFIERS,
  ALIGNMENTS,
  CLASSES,
  DICES,
  RACES,
} from 'src/meta/constants'

export interface IClassConfigStats {
  hp: ScoreWithAbility
  damage: ScoreWithDice | ScoreWithDice[]
  load: ScoreWithAbility
}

export interface IClassConfig {
  name: CLASSES
  races: RACES[]
  alignments: ALIGNMENTS[]
  stats?: IClassConfigStats
}

export interface ScoreWithAbility {
  base: number
  increase?: ABILITIES | ABILITIES_MODIFIERS
  decrease?: ABILITIES | ABILITIES_MODIFIERS
}

export interface ScoreWithDice {
  count: number
  dice: DICES
  increase?: ABILITIES | ABILITIES_MODIFIERS | number
  decrease?: ABILITIES | ABILITIES_MODIFIERS | number
}
