import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ABILITIES,
  calcAbilityModifier,
  MAX_ABILITY_SCORE,
  MIN_ABILITY_SCORE,
} from 'dw-tool-meta'
import { mapEnum } from 'src/utils/typping'

import s from './CharacterAbilities.module.css'

interface IAbilitiesProps {
  abilities?: Record<ABILITIES, number>
  onChange?: (ability: ABILITIES, value: number) => void
  isNew?: boolean
}

export const CharacterAbilities: FC<IAbilitiesProps> = ({
  abilities,
  onChange,
  isNew,
}) => {
  const { t } = useTranslation()

  return (
    <div className={s.root}>
      {isNew && (
        <h4>
          Assign these scores to your stats: 16(+2), 15(+1), 13(+1), 12(–),
          9(–), 8(-1)
        </h4>
      )}
      <div className={s.grid}>
        {mapEnum(ABILITIES).map((i) => (
          <div className={s.item} key={i}>
            <label className={s.title}>{t(`abilities:main.${i}`)}</label>
            <div className={s.controller}>
              {onChange && (
                <button
                  className={s.decrement}
                  onClick={() => {
                    onChange(i as ABILITIES, abilities ? abilities[i] - 1 : 0)
                  }}
                />
              )}
              <input
                className={s.input}
                type='number'
                min={MIN_ABILITY_SCORE}
                max={MAX_ABILITY_SCORE}
                value={abilities ? abilities[i] : 0}
                onChange={(e) => {
                  if (onChange) {
                    onChange(i as ABILITIES, parseInt(e.target.value))
                  }
                }}
              />
              {onChange && (
                <button
                  className={s.increment}
                  onClick={() => {
                    onChange(i as ABILITIES, abilities ? abilities[i] + 1 : 0)
                  }}
                />
              )}
            </div>

            <span className={s.mod}>{t(`abilities:modifiers.${i}`)}</span>
            <span className={s.modValue}>
              {(abilities &&
                abilities[i as ABILITIES] &&
                calcAbilityModifier(abilities[i as ABILITIES])) ||
                0}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
