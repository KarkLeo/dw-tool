import React, { useCallback } from 'react'
import { ProfileInfo } from 'src/modules/Profile/ProfileInfo'
import { Background } from '../common/Background/Background'
import { Paper } from '../common/Paper/Paper'
import { Link } from 'react-router-dom'
import { CharacterList } from '../modules/Character/components/CharacterList/CharacterList'
import { useAppDispatch } from '../store/root'
import { setRedirect } from '../store/redirect/redirectSlice'

export const AppPage = () => {
  const dispatch = useAppDispatch()

  const test = useCallback(() => {
    dispatch(setRedirect('/character/create'))
  }, [dispatch])

  return (
    <Background>
      <div>
        <button onClick={test}>test</button>
      </div>
      <ProfileInfo />
      <Paper>
        <Link to={'/character/create'}>Create Character</Link>
        <CharacterList />
      </Paper>
    </Background>
  )
}
