import React from 'react'
import { Trans, useTranslation } from 'react-i18next'

const MyComponent: React.FC<{ children?: any }> = ({ children }) => {
  return <strong className={'test_b'}>{children}</strong>
}

const MyComponent2: React.FC<{ children?: any }> = ({ children }) => {
  return <em className={'test_i'}>{children}</em>
}

const Link: React.FC<{ to?: string; type?: any }> = ({ to, type }) => {
  const { t } = useTranslation()

  return (
    <a href={`/${type}/${to}`}>
      {t(`${type}:${to}`)} - ({type})
    </a>
  )
}

const el = { spec: <MyComponent />, label: <MyComponent2 />, ref: <Link /> }

export const Test = () => {
  const { t } = useTranslation()

  console.log(t('test:arr', { returnObjects: true }))

  return (
    <div>
      <h1>{t('races:elf')}</h1>
      <h2>{t('alignments:good')}</h2>
      <br />
      <Trans
        i18nKey='test:test'
        values={{ pr: { a: '___' } }}
        components={el}
      />

      <h2>{t('test:arr', { returnObjects: true })}</h2>
    </div>
  )
}
