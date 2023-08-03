import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { CLASSES } from 'dw-tool-meta'
import { TransparentPaper } from 'src/common/TransparentPaper/TransparentPaper'
import s from './LooksInput.module.css'
import classNames from 'classnames'

interface CharacterLooksProps {
  classValue: CLASSES
  onChange: (index: number, value: string) => void
  value: Record<number, string>
}

export const LooksInput: FC<CharacterLooksProps> = ({
  classValue,
  onChange,
  value,
}) => {
  const { t } = useTranslation()

  const looks = t(`${classValue}:looks`, { returnObjects: true }) as string[][]
  const defaultValue = ''

  return (
    <TransparentPaper>
      <div className={s.root}>
        <div className={s.header}>
          <h2 className='title'>Look</h2>
          <h4 className={s.headerSubtitle}>
            {t('common:choose_one_for_each')}
          </h4>
        </div>
        <div className={s.list}>
          {looks.map((i, index) => (
            <div className={s.listRow} key={i.join()}>
              {i.map((j) => (
                <button
                  key={j}
                  onClick={() => {
                    onChange(index, j)
                  }}
                  className={classNames(s.button, {
                    [s.buttonActive]: value[index] === j,
                  })}
                >
                  {j}
                </button>
              ))}
              or{' '}
              <input
                className={s.input}
                value={
                  i.every((j) => j !== value[index])
                    ? value[index]
                    : defaultValue
                }
                type='text'
                onChange={(e) => {
                  onChange(index, e.target.value)
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </TransparentPaper>
  )
}
