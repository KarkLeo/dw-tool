import React, { FC } from 'react'
import s from './HeadLabel.module.css'

interface HeadLabelProps {
  children: React.ReactNode
}

export const HeadLabel: FC<HeadLabelProps> = ({ children }) => {
  return <div className={s.root}>{children}</div>
}
