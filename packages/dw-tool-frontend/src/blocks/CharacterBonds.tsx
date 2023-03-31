import React, { FC, useContext, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { CLASSES } from 'src/meta/constants'

interface CharacterBondsProps {
  classValue: CLASSES
}

const InputValue = React.createContext<Record<string, string>>({})
const InputChange = React.createContext((value: string, code: string) => {})

const MyInput: FC<{ code?: string }> = ({ code }) => {
  const value = useContext(InputValue)
  const onChange = useContext(InputChange)

  return (
    <input
      className='text-input '
      style={{ fontSize: '1rem', color: 'inherit' }}
      type='text'
      value={(value && (value[code || 'code'] as string)) || ''}
      onChange={(e) => {
        onChange(e.target.value, code || 'code')
      }}
    />
  )
}

const element = {
  input: <MyInput />,
}

export const CharacterBonds: FC<CharacterBondsProps> = ({ classValue }) => {
  const { t } = useTranslation()

  const bonds = t(`${classValue}:bonds`, { returnObjects: true }) as string[]

  const [state, setState] = useState<Record<number, Record<string, string>>>({})

  console.log(state)
  return (
    <div>
      <h2>Bonds</h2>
      {bonds.map((i, index) => {
        let inputNumber = 0
        const current = i.replaceAll('<input', () => {
          const str = `<input code=${inputNumber} `
          inputNumber++
          return str
        })

        let inputNumber2 = 0
        const current2 = i.replaceAll(/<input.*?\/>/gm, () => {
          const str =
            state[index] && state[index][inputNumber2]
              ? state[index][inputNumber2]
              : '________'
          inputNumber2++
          return str
        })

        const isActive =
          state[index] &&
          Object.keys(state[index]).length === inputNumber &&
          Object.values(state[index]).every((i) => i.length > 0)

        return (
          <div
            key={`${index}-${i}`}
            style={{ color: isActive ? 'var(--c-dark)' : 'var(--c-light)' }}
          >
            <InputValue.Provider value={state[index]}>
              <InputChange.Provider
                value={(value: string, code: string) =>
                  setState((s) => ({
                    ...s,
                    [index]: { ...s[index], [code]: value },
                  }))
                }
              >
                <Trans i18nKey={current} components={element} />
              </InputChange.Provider>
            </InputValue.Provider>
          </div>
        )
      })}
    </div>
  )
}
