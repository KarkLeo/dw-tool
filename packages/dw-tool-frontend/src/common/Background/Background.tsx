import React, { FC, ReactNode } from 'react'
import s from './Background.module.css'

interface BackgroundProps {
  children?: ReactNode
}

export const Background: FC<BackgroundProps> = ({ children }) => {
  return (
    <div className={s.root}>
      <div className={s.inner}>{children}</div>
    </div>
  )
}
