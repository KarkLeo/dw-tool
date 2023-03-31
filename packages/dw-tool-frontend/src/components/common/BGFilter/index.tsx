import React, { ReactNode } from 'react'
import s from './BGFilter.module.css'

export const BGFilter: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={s.root}>
      <div className={s.inner}>{children}</div>
    </div>
  )
}
