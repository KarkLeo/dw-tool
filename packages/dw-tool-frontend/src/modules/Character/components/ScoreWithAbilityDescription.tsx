import React, { FC } from 'react'
import { AbilityTag } from 'src/modules/Character/components/AbilityTag'
import { Abilities, ScoreWithAbility } from 'dw-tool-meta'

interface ScoreWithAbilityDescriptionProps {
  score: ScoreWithAbility
  abilities?: Abilities
}

export const ScoreWithAbilityDescription: FC<
  ScoreWithAbilityDescriptionProps
> = ({ score, abilities }) => {
  return (
    <span>
      {score.base}
      {score.increase && (
        <>
          {' '}
          + <AbilityTag ability={score.increase} abilities={abilities} />
        </>
      )}
      {score.decrease && (
        <>
          {' '}
          - <AbilityTag ability={score.decrease} abilities={abilities} />
        </>
      )}
    </span>
  )
}
