import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { CLASSES, RACES } from 'src/meta/constants'

interface CharacterNameProps {
  classValue: CLASSES
  race?: RACES
  value: string
  onChange: (value: string) => void
}

export const CharacterName: FC<CharacterNameProps> = ({
  classValue,
  race,
  value,
  onChange,
}) => {
  const { t } = useTranslation()

  const names = race
    ? (t(`${classValue}:names.${race}`, { returnObjects: true }) as string[])
    : []

  return (
    <div>
      <h2>Name</h2>
      <div>
        <input
          className={'text-input'}
          type='text'
          name='name'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <div className={'text-radio-wrap'}>
        {names.map((i) => (
          <label className={'text-radio-item'} key={i}>
            <input
              type='radio'
              name={'prepares-name'}
              value={i}
              onChange={() => onChange(i)}
              checked={value === i}
            />
            <span>{i}</span>{' '}
          </label>
        ))}
      </div>
    </div>
  )
}
