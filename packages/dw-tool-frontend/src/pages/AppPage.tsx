import React from 'react'
import { ProfileInfo } from 'src/modules/Profile/ProfileInfo'
import { Background } from '../common/Background/Background'
import { Paper } from '../common/Paper/Paper'
import { Link } from 'react-router-dom'
import { CharacterList } from '../modules/Character/components/CharacterList/CharacterList'
import { useTestSocket } from '../services/notificationSocket/useTestSocket'

export const AppPage = () => {
  useTestSocket()

  return (
    <Background>
      <ProfileInfo />
      <Paper>
        <Link to={'/character/create'}>Create Character</Link>
        <CharacterList />
      </Paper>
    </Background>
  )
}
