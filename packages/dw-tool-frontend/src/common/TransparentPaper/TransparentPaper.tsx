import React, { FC, ReactNode } from 'react'
import s from './TransparentPaper.module.css'

interface TransparentPaperProps {
  children?: ReactNode
}

export const TransparentPaper: FC<TransparentPaperProps> = ({ children }) => {
  return <div className={s.root}>{children}</div>
}
