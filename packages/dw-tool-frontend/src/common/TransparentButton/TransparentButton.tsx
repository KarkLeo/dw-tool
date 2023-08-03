import React, { FC, ReactNode } from 'react'
import s from './TransparentButton.module.css'
import classNames from 'classnames'

interface TransparentButtonProps {
  children: ReactNode
  onSelect?: () => void
  isActive?: boolean
}

export const TransparentButton: FC<TransparentButtonProps> = ({
  children,
  isActive,
  onSelect,
}) => {
  return (
    <button
      className={classNames(s.button, { [s.active]: isActive })}
      onClick={onSelect}
    >
      {children}
    </button>
  )
}
