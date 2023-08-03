import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { CLASSES } from 'dw-tool-meta'

import { mapEnum } from 'src/utils/typping'
import { BigButton } from 'src/common/BigButton/BigButton'

import s from './ClassSelectionBlock.module.css'

interface ClassSelectionProps {
  onSelect: (value: CLASSES) => void
}

export const ClassSelectionBlock: FC<ClassSelectionProps> = ({ onSelect }) => {
  const { t } = useTranslation()

  return (
    <div className={s.root}>
      {mapEnum(CLASSES).map((i) => (
        <BigButton key={i} onClick={() => onSelect(i as CLASSES)}>
          {t(`classes:${i}`)}
        </BigButton>
      ))}
    </div>
  )
}
