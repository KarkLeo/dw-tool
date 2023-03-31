import React from 'react'
import { useTranslation } from 'react-i18next'
import { ButtonWrap } from 'src/components/common/ButtonWrap/ButtonWrap'
import { FrameButton11 } from 'src/components/common/Frames'
import { GridItemMedium } from 'src/components/common/Grid'
import { H2Simple, PSimple } from 'src/components/common/Texts/Simple'
import { CLASSES, RACES } from 'src/meta/constants'

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
