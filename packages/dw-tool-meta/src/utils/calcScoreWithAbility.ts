import { Abilities, ScoreWithAbility } from '../models'
import { getAbilityScore } from './getAbilityScore'

export const calcScoreWithAbility = (
  score: ScoreWithAbility,
  abilities: Abilities
): number => {
  const { base, increase, decrease } = score

  return (
    base +
    (increase ? getAbilityScore(increase, abilities) : 0) -
    (decrease ? getAbilityScore(decrease, abilities) : 0)
  )
}
