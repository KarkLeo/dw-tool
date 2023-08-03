import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { CLASSES, RACES } from 'dw-tool-meta'

import { LightPaper } from 'src/common/LightPaper/LightPaper'
import { TransparentButton } from 'src/common/TransparentButton/TransparentButton'

import s from './RaceSelectionBlock.module.css'

interface RaceSelectionBlockProps {
  races: RACES[]
  value?: RACES
  classValue: CLASSES
  onSelect: (value: RACES) => void
}

export const RaceSelectionBlock: FC<RaceSelectionBlockProps> = ({
  races,
  value,
  classValue,
  onSelect,
}) => {
  const { t } = useTranslation()

  return (
    <LightPaper>
      <div className={s.root}>
        <h3 className='title'>Race:</h3>
        <div className={s.list}>
          {races.map((i) => (
            <div key={i} className={s.item}>
              <div className={s.button}>
                <TransparentButton
                  isActive={i === value}
                  onSelect={() => onSelect(i)}
                >
                  {t(`races:${i}`)}
                </TransparentButton>
              </div>
              <p className='text'>{t(`${classValue}:races.${i}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </LightPaper>
  )
}
