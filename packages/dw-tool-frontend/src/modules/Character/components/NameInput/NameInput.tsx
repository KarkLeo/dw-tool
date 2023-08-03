import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { CLASSES, RACES } from 'dw-tool-meta'

import s from './NameInput.module.css'
import { TransparentPaper } from '../../../../common/TransparentPaper/TransparentPaper'
import classNames from 'classnames'

interface NameInputProps {
  classValue: CLASSES
  race?: RACES
  value: string
  onChange: (value: string) => void
}

export const NameInput: FC<NameInputProps> = ({
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
    <TransparentPaper>
      <div className={s.root}>
        <h2 className='title'>Name:</h2>
        <div className={s.inputWrap}>
          <input
            className={s.input}
            type='text'
            name='name'
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <div className={s.radioList}>
          {names.map((i) => (
            <button
              key={i}
              className={classNames(s.radioButton, {
                [s.radioButtonActive]: i === value,
              })}
              onClick={() => onChange(i)}
            >
              {i}
            </button>
          ))}
        </div>
      </div>
    </TransparentPaper>
  )
}
