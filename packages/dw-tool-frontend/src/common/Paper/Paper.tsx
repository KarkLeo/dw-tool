import React, { FC, ReactNode } from 'react'
import s from './Paper.module.css'

interface PaperProps {
  children?: ReactNode
}

export const Paper: FC<PaperProps> = ({ children }) => {
  return <div className={s.root}>{children}</div>
}
