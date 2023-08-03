import React, { useCallback } from 'react'
import { AppLayout } from '../common/AppLayout/AppLayout'
import { Paper } from '../common/Paper/Paper'
import { useSelector } from 'react-redux'
import {
  newCharacterClassConfigSelector,
  newCharacterIsValidSelector,
  newCharacterSelector,
} from '../store/newCharacter/selectors'
import { HeadLabel } from '../common/HeadLabel/HeadLable'
import { ABILITIES, ALIGNMENTS, CLASSES, RACES } from 'dw-tool-meta'
import { ClassSelectionBlock } from '../modules/Character/components/ClassSelectionBlock/ClassSelectionBlock'
import {
  setAbility,
  setAlignment,
  setClass,
  setLooks,
  setName,
  setRace,
} from '../store/newCharacter/newCharacterSlice'
import { useAppDispatch } from '../store/root'
import { RaceSelectionBlock } from '../modules/Character/components/RaceSelectionBlock/RaceSelectionBlock'
import { AlignmentSelectionBlock } from '../modules/Character/components/AlignmentSelectionBlock/AlignmentSelectionBlock'
import { NameInput } from '../modules/Character/components/NameInput/NameInput'
import { CharacterStats } from '../modules/Character/components/CharacterStats/CharactrStats'
import { LooksInput } from '../modules/Character/components/LooksInput/LooksInput'
import { CharacterAbilities } from '../modules/Character/components/CharacterAbilities/CharacterAbilities'
import { BigButton } from '../common/BigButton/BigButton'
import { saveNewCharacterThunk } from '../store/newCharacter/actions/saveNewCharacter'

export const CreateCharacterPage = () => {
  const dispatch = useAppDispatch()

  const classConfig = useSelector(newCharacterClassConfigSelector)
  const character = useSelector(newCharacterSelector)
  const isValid = useSelector(newCharacterIsValidSelector)

  const setClassHandler = useCallback(
    (value: CLASSES) => {
      dispatch(setClass(value))
    },
    [dispatch]
  )

  const setCharacterRaceHandler = useCallback(
    (value: RACES) => {
      dispatch(setRace(value))
    },
    [dispatch]
  )

  const setCharacterAlignmentHandler = useCallback(
    (value: ALIGNMENTS) => {
      dispatch(setAlignment(value))
    },
    [dispatch]
  )

  const setCharacterNameHandler = useCallback(
    (value: string) => {
      dispatch(setName(value))
    },
    [dispatch]
  )

  const setCharacterLooksHandler = useCallback(
    (index: number, value: string) => {
      dispatch(setLooks({ index, value }))
    },
    [dispatch]
  )

  const setCharacterAbilityHandler = useCallback(
    (ability: ABILITIES, value: number) => {
      dispatch(setAbility({ ability, value }))
    },
    [dispatch]
  )

  const saveCharacterHandler = useCallback(() => {
    dispatch(saveNewCharacterThunk())
  }, [dispatch])

  return (
    <AppLayout>
      <Paper>
        <div className='grid-column'>
          {classConfig ? (
            <HeadLabel>
              {CLASSES[character.class as CLASSES].toUpperCase()}
            </HeadLabel>
          ) : (
            <ClassSelectionBlock onSelect={setClassHandler} />
          )}

          {classConfig && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 3fr',
                gap: '2rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  gap: '2rem',
                  flexDirection: 'column',
                }}
              >
                <RaceSelectionBlock
                  races={classConfig.races}
                  classValue={classConfig.name}
                  value={character.race}
                  onSelect={setCharacterRaceHandler}
                />
                <AlignmentSelectionBlock
                  alignments={classConfig.alignments}
                  classValue={classConfig.name}
                  value={character.alignment}
                  onSelect={setCharacterAlignmentHandler}
                />
              </div>
              <div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: '2rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2rem',
                    }}
                  >
                    <NameInput
                      classValue={classConfig.name}
                      race={character.race}
                      value={character.name || ''}
                      onChange={setCharacterNameHandler}
                    />
                    {classConfig.stats && character.abilities && (
                      <CharacterStats
                        stats={classConfig.stats}
                        abilities={character.abilities}
                      />
                    )}
                  </div>

                  <LooksInput
                    classValue={classConfig.name}
                    value={character.looks || {}}
                    onChange={setCharacterLooksHandler}
                  />
                </div>
                <div>
                  <CharacterAbilities
                    isNew
                    abilities={character.abilities}
                    onChange={setCharacterAbilityHandler}
                  />
                </div>
                <div>
                  <BigButton disabled={!isValid} onClick={saveCharacterHandler}>
                    Save
                  </BigButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </Paper>
    </AppLayout>
  )
}
