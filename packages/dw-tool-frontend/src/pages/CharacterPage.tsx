import React, { useEffect } from 'react'
import { AppLayout } from '../common/AppLayout/AppLayout'
import { Paper } from '../common/Paper/Paper'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../store/root'
import { fetchCharacterThunk } from '../store/currentCharacter/actions/fetchCharacter'
import { useSelector } from 'react-redux'
import {
  currentCharacterDataSelector,
  isOwnCurrentCharacterSelector,
} from '../store/currentCharacter/selectors'

export const CharacterPage = () => {
  const dispatch = useAppDispatch()

  const { characterId } = useParams()
  const character = useSelector(currentCharacterDataSelector)
  const isOwnCharacter = useSelector(isOwnCurrentCharacterSelector)

  useEffect(() => {
    characterId && dispatch(fetchCharacterThunk(characterId))
  }, [dispatch, characterId])

  return (
    <AppLayout>
      <Paper>
        <div className='grid-column'>
          {isOwnCharacter && (
            <div>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          )}
          {character && (
            <div>
              <h1>{character.name}</h1>
              <p>Looks: {character.looks.join(', ')}</p>
              <p>Class: {character.class}</p>
              <p>Race: {character.race}</p>
              <p>Alignment: {character.alignment}</p>
              <p>Strength: {character.strength}</p>
              <p>Dexterity: {character.dexterity}</p>
              <p>Constitution: {character.constitution}</p>
              <p>Intelligence: {character.intelligence}</p>
              <p>Wisdom: {character.wisdom}</p>
              <p>Charisma: {character.charisma}</p>
            </div>
          )}
        </div>
      </Paper>
    </AppLayout>
  )
}
