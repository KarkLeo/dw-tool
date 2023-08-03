import React from 'react'
import { useTranslation } from 'react-i18next'

import { CLASSES, RACES } from 'dw-tool-meta'

import { ButtonWrap } from 'src/common/ButtonWrap/ButtonWrap'
import { FrameButton11 } from 'src/common/Frames'
import { GridItemMedium } from 'src/common/Grid'
import { H2Simple, PSimple } from 'src/common/Texts/Simple'

interface IRaceItemProps {
  value: RACES
  classValue: CLASSES
  onSelect: () => void
  isActive: boolean
}

export const RaceItem: React.FC<IRaceItemProps> = ({
  value,
  classValue,
  isActive,
  onSelect,
}) => {
  const { t } = useTranslation()

  return (
    <GridItemMedium>
      <ButtonWrap isActive={isActive} onSelect={onSelect}>
        <FrameButton11>
          <H2Simple>{t(`races:${value}`)}</H2Simple>
        </FrameButton11>
      </ButtonWrap>
      <PSimple>{t(`${classValue}:races.${value}`)}</PSimple>
    </GridItemMedium>
  )
}
