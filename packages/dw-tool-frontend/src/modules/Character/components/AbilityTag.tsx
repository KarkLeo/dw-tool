import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ABILITIES,
  Abilities,
  ABILITIES_FROM_MODIFIERS,
  ABILITIES_MODIFIERS,
  getAbilityScore,
} from 'dw-tool-meta'

import s from './AbilityTag.module.css'

interface AbilityTagProps {
  ability: ABILITIES | ABILITIES_MODIFIERS
  abilities?: Abilities
}

export const AbilityTag: FC<AbilityTagProps> = ({ ability, abilities }) => {
  const { t } = useTranslation()
  return (
    <span className={s.tag}>
      {Object.keys(ABILITIES_MODIFIERS).includes(ability as string)
        ? t(
            `abilities:modifiers.${
              ABILITIES_FROM_MODIFIERS[ability as ABILITIES_MODIFIERS]
            }`
          )
        : t(`abilities:main.${ability}`)}
      {abilities && (
        <span className={s.value}>
          {' '}
          ({getAbilityScore(ability, abilities)})
        </span>
      )}
    </span>
  )
}
