import React from 'react'
import { useTranslation } from 'react-i18next'
import { ButtonWrap } from 'src/components/common/ButtonWrap/ButtonWrap'
import { FrameButton6 } from 'src/components/common/Frames'
import { H1Gothic } from 'src/components/common/Texts'
import { CLASSES } from 'src/meta/constants'

interface IClassButtonProps {
  classValue: CLASSES
  onSelect: () => void
  isActive: boolean
}

export const ClassButton: React.FC<IClassButtonProps> = ({
  classValue,
  isActive,
  onSelect,
}) => {
  const { t } = useTranslation()

  return (
    <ButtonWrap isActive={isActive} onSelect={onSelect}>
      <FrameButton6>
        <H1Gothic>{t(`classes:${classValue}`)}</H1Gothic>
      </FrameButton6>
    </ButtonWrap>
  )
}
