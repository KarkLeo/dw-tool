import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { CLASSES } from 'src/meta/constants'

interface CharacterLooksProps {
  classValue: CLASSES
  onChange: (index: number, value: string) => void
  value: Record<number, string>
}

export const CharacterLooks: FC<CharacterLooksProps> = ({
  classValue,
  onChange,
  value,
}) => {
  const { t } = useTranslation()

  const looks = t(`${classValue}:looks`, { returnObjects: true }) as string[][]

  return (
    <div>
      <h2>Look</h2>
      <h4>{t('common:choose_one_for_each')}</h4>
      {looks.map((i, rowIndex) => (
        <div className={'text-radio-wrap'} key={i.join()}>
          {i.map((j, index) => {
            const isLast = index === i.length - 1
            const key = `${j}-${index}`

            return (
              <span key={key}>
                {' '}
                {isLast ? t('common:or') + ' ' : ''}
                <label className={'text-radio-item'}>
                  <input
                    type='radio'
                    name={i.join()}
                    value={j}
                    checked={value[rowIndex] === j}
                    onChange={() => onChange(rowIndex, j)}
                  />
                  <span>{j}</span>
                </label>
                {!isLast ? ',' : ';'}
              </span>
            )
          })}
        </div>
      ))}
    </div>
  )
}
