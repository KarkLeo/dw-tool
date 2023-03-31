import React, { FC } from 'react'
import { ScoreWithAbilityDescription } from 'src/components/ScoreWithAbilityDescription'
import { ScoreWithDiceDescription } from 'src/components/ScoreWithDiceDescription'
import { IClassConfigStats } from 'src/meta/configs/types'
import { Abilities } from 'src/meta/models'
import { calcScoreWithAbility } from 'src/utils/dw-tools/calcScoreWithAbility'

interface CharacterStatsProps {
  stats: IClassConfigStats
  abilities: Abilities
}

export const CharacterStats: FC<CharacterStatsProps> = ({
  stats,
  abilities,
}) => {
  return (
    <div>
      <h2>Stats</h2>
      <p style={{ marginBottom: 2 }}>
        HP: {calcScoreWithAbility(stats.hp, abilities)}
      </p>
      <p style={{ fontSize: '0.7rem', margin: 0 }}>
        <ScoreWithAbilityDescription score={stats.hp} abilities={abilities} />
      </p>
      <p>
        Damage:{' '}
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
      </p>
      <p>Armor:</p>
      <p style={{ marginBottom: 2 }}>
        Load: {calcScoreWithAbility(stats.load, abilities)}
      </p>
      <p style={{ fontSize: '0.7rem', margin: 0 }}>
        <ScoreWithAbilityDescription score={stats.load} abilities={abilities} />
      </p>
    </div>
  )
}
