import React from 'react'
import { useTranslation } from 'react-i18next'
import { ButtonWrap } from 'src/components/common/ButtonWrap/ButtonWrap'
import { FrameDivider5 } from 'src/components/common/Frames'
import { GridItemMedium } from 'src/components/common/Grid'
import { H2Simple, PSimple } from 'src/components/common/Texts/Simple'
import { ALIGNMENTS, CLASSES } from 'src/meta/constants'

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
