import React, { FC } from 'react'
import { AbilityTag } from 'src/components/AbilityTag'
import { ScoreWithAbility } from 'src/meta/configs/types'
import { Abilities } from 'src/meta/models'

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
