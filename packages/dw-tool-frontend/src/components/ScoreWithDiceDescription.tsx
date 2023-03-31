import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { AbilityTag } from 'src/components/AbilityTag'
import { ScoreWithDice } from 'src/meta/configs/types'
import { Abilities } from 'src/meta/models'

interface ScoreWithDiceDescriptionProps {
  score: ScoreWithDice
  abilities?: Abilities
}

export const ScoreWithDiceDescription: FC<ScoreWithDiceDescriptionProps> = ({
  score,
  abilities,
}) => {
  const { t } = useTranslation()

  return (
    <span>
      {score.count}
      {t(`dices:${score.dice}`)}
      {score.increase ? (
        typeof score.increase === 'number' ? (
          score.increase
        ) : (
          <>
            {' '}
            +{' '}
            <AbilityTag ability={score.increase as any} abilities={abilities} />
          </>
        )
      ) : null}
      {score.decrease ? (
        typeof score.decrease === 'number' ? (
          score.decrease
        ) : (
          <>
            {' '}
            -{' '}
            <AbilityTag ability={score.decrease as any} abilities={abilities} />
          </>
        )
      ) : null}
    </span>
  )
}
