import { ScoreWithAbility } from 'src/meta/configs/types'
import { Abilities } from 'src/meta/models'
import { getAbilityScore } from 'src/utils/dw-tools/getAbilityScore'

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
