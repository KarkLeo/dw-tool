import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ABILITIES,
  MAX_ABILITY_SCORE,
  MIN_ABILITY_SCORE,
} from 'src/meta/constants'
import { calcAbilityModifier } from 'src/utils/dw-tools'
import { mapEnum } from 'src/utils/typping'

interface IAbilitiesProps {
  abilities?: Record<ABILITIES, number>
  onChange?: (ability: ABILITIES, value: number) => void
}

export const Abilities: FC<IAbilitiesProps> = ({ abilities, onChange }) => {
  const { t } = useTranslation()

  return (
    <div
      style={{
        textAlign: 'left',
      }}
    >
      <h2>Abilities</h2>
      {mapEnum(ABILITIES).map((i) => (
        <label style={{ display: 'block' }} key={i}>
          {t(`abilities:main.${i}`)}
          <input
            className={'text-input'}
            type='number'
            min={MIN_ABILITY_SCORE}
            max={MAX_ABILITY_SCORE}
            onChange={(e) => {
              if (onChange) {
                onChange(i as ABILITIES, Number(e.target.value))
              }
            }}
          />{' '}
          <b
            style={{
              textTransform: 'uppercase',
            }}
          >
            ({t(`abilities:modifiers.${i}`)}:
            {abilities &&
              abilities[i as ABILITIES] &&
              calcAbilityModifier(abilities[i as ABILITIES])}
            )
          </b>
        </label>
      ))}
    </div>
  )
}
