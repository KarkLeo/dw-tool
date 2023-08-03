import React, { FC } from 'react'
import { ScoreWithAbilityDescription } from 'src/modules/Character/components/ScoreWithAbilityDescription'
import { ScoreWithDiceDescription } from 'src/modules/Character/components/ScoreWithDiceDescription'
import {
  Abilities,
  calcScoreWithAbility,
  IClassConfigStats,
} from 'dw-tool-meta'

import s from './CharacterStats.module.css'
import { DiceScore } from '../DiceScore'

interface CharacterStatsProps {
  stats: IClassConfigStats
  abilities: Abilities
}

export const CharacterStats: FC<CharacterStatsProps> = ({
  stats,
  abilities,
}) => {
  return (
    <div className={s.root}>
      <div className={s.item}>
        <div className={s.frame}>
          <h3 className={s.label}>HP</h3>
          <span className={s.value}>
            {calcScoreWithAbility(stats.hp, abilities)}
          </span>
        </div>
        <ScoreWithAbilityDescription score={stats.hp} abilities={abilities} />
      </div>
      <div className={s.item}>
        <div className={s.frame}>
          <h3 className={s.label}>Damage</h3>
          <span className={s.value}>
            {Array.isArray(stats.damage) ? (
              stats.damage.map((d, i) => <DiceScore key={i} score={d} />)
            ) : (
              <DiceScore score={stats.damage} />
            )}
          </span>
        </div>

        {Array.isArray(stats.damage) ? (
          stats.damage.map((d, i) => (
            <ScoreWithDiceDescription key={i} score={d} abilities={abilities} />
          ))
        ) : (
          <ScoreWithDiceDescription
            score={stats.damage}
            abilities={abilities}
          />
        )}
      </div>
      <div className={s.item}>
        <div className={s.frame}>
          <h3 className={s.label}>Gear</h3>
          <span className={s.value}>
            {calcScoreWithAbility(stats.load, abilities)}
          </span>
        </div>
        <ScoreWithAbilityDescription score={stats.load} abilities={abilities} />
      </div>
    </div>
  )
}
