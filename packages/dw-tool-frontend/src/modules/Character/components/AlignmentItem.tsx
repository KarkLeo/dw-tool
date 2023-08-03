import React from 'react'
import { useTranslation } from 'react-i18next'

import { ALIGNMENTS, CLASSES } from 'dw-tool-meta'

import { ButtonWrap } from 'src/common/ButtonWrap/ButtonWrap'
import { FrameDivider5 } from 'src/common/Frames'
import { GridItemMedium } from 'src/common/Grid'
import { H2Simple, PSimple } from 'src/common/Texts/Simple'

interface IAlignmentItemProps {
  value: ALIGNMENTS
  classValue: CLASSES
  onSelect: () => void
  isActive: boolean
}

export const AlignmentItem: React.FC<IAlignmentItemProps> = ({
  value,
  classValue,
  onSelect,
  isActive,
}) => {
  const { t } = useTranslation()

  return (
    <GridItemMedium>
      <ButtonWrap isActive={isActive} onSelect={onSelect}>
        <FrameDivider5>
          <H2Simple>{t(`alignments:${value}`)}</H2Simple>
        </FrameDivider5>
      </ButtonWrap>
      <PSimple>{t(`${classValue}:alignments.${value}`)}</PSimple>
    </GridItemMedium>
  )
}
