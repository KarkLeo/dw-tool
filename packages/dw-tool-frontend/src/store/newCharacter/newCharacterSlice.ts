import {
  ABILITIES,
  ALIGNMENTS,
  ICharacterData,
  CLASSES,
  RACES,
} from 'dw-tool-meta'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface NewCharacterState extends ICharacterData {}

export const initialState: NewCharacterState = {
  abilities: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
}

export const newCharacterSlice = createSlice({
  name: 'newCharacter',
  initialState,
  reducers: {
    setClass: (state, { payload }: PayloadAction<CLASSES>) => {
      state.class = payload
    },
    setName: (state, { payload }: PayloadAction<string>) => {
      state.name = payload
    },
    setLooks: (
      state,
      { payload }: PayloadAction<{ index: number; value: string }>
    ) => {
      state.looks = { ...state.looks, [payload.index]: payload.value }
    },
    setRace: (state, { payload }: PayloadAction<RACES>) => {
      state.race = payload
    },
    setAlignment: (state, { payload }: PayloadAction<ALIGNMENTS>) => {
      state.alignment = payload
    },
    setAbility: (
      state,
      { payload }: PayloadAction<{ ability: ABILITIES; value: number }>
    ) => {
      state.abilities = {
        ...state.abilities,
        [payload.ability]: payload.value,
      } as Record<ABILITIES, number>
    },
  },
})

export const {
  setClass,
  setName,
  setLooks,
  setRace,
  setAlignment,
  setAbility,
} = newCharacterSlice.actions

export default newCharacterSlice.reducer
