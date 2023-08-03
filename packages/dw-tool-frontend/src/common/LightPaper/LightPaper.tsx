import React, { FC, ReactNode } from 'react'
import s from './LightPaper.module.css'

interface LightPaperProps {
  children?: ReactNode
}

export const LightPaper: FC<LightPaperProps> = ({ children }) => {
  return <div className={s.root}>{children}</div>
}
