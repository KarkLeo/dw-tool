import React, { FC, ReactNode } from 'react'
import s from './BigButton.module.css'

interface BigButtonProps {
  children?: ReactNode
  onClick?: () => void
  disabled?: boolean
}

export const BigButton: FC<BigButtonProps> = ({
  children,
  onClick,
  disabled,
}) => {
  return (
    <button className={s.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
