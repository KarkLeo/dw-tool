import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { ScoreWithDice } from 'dw-tool-meta'

interface DiceScoreProps {
  score: ScoreWithDice
}

export const DiceScore: FC<DiceScoreProps> = ({ score }) => {
  const { t } = useTranslation()

  return (
    <span>
      {score.count}
      {t(`dices:${score.dice}`)}
    </span>
  )
}
