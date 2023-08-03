import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { ALIGNMENTS, CLASSES } from 'dw-tool-meta'

import { LightPaper } from 'src/common/LightPaper/LightPaper'
import { TransparentButton } from 'src/common/TransparentButton/TransparentButton'

import s from './AlignmentSelectionBlock.module.css'

interface AlignmentSelectionBlockProps {
  alignments: ALIGNMENTS[]
  value?: ALIGNMENTS
  classValue: CLASSES
  onSelect: (value: ALIGNMENTS) => void
}

export const AlignmentSelectionBlock: FC<AlignmentSelectionBlockProps> = ({
  alignments,
  value,
  classValue,
  onSelect,
}) => {
  const { t } = useTranslation()

  return (
    <LightPaper>
      <div className={s.root}>
        <h3 className='title'>Alignment:</h3>
        <div className={s.list}>
          {alignments.map((i) => (
            <div key={i} className={s.item}>
              <div className={s.button}>
                <TransparentButton
                  isActive={i === value}
                  onSelect={() => onSelect(i)}
                >
                  {t(`races:${i}`)}
                </TransparentButton>
              </div>
              <p className='text'>{t(`${classValue}:alignments.${i}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </LightPaper>
  )
}
