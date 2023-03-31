import React, { ReactNode } from 'react'
import styled from 'styled-components'
import s from './Grid.module.css'

export const Grid: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={s.root}>{children}</div>
}

export const GridMedium = styled.div`
  margin: 4rem auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, 22%);
  justify-content: center;
  gap: 2rem;
`

export const GridItemMedium = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`
