import React, { FC, ReactNode } from 'react'
import { ProfileInfo } from 'src/modules/Profile/ProfileInfo'
import { Background } from 'src/common/Background/Background'

interface AppLayoutProps {
  children?: ReactNode
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <Background>
      <ProfileInfo />
      {children}
    </Background>
  )
}
