import React, { ReactNode } from 'react'
import s from './ButtonWrap.module.css'

export const ButtonWrap: React.FC<{
  children: ReactNode
  onSelect?: () => void
  isActive?: boolean
}> = ({ children, isActive, onSelect }) => {
  return (
    <button
      className={`${s.root} ${isActive ? s.active : ''}`}
      type='button'
      onClick={onSelect}
    >
      {children}
    </button>
  )
}
