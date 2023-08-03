import { ICharacterFullData } from 'dw-tool-meta'
import { createSlice } from '@reduxjs/toolkit'
import { fetchCharacterThunk } from './actions/fetchCharacter'
import { meThunk } from '../user/actions/me'

export interface CurrentCharacterSliceState {
  loading: boolean
  loaded: boolean
  error: string | null
  data: ICharacterFullData | null
}

export const initialState: CurrentCharacterSliceState = {
  loading: false,
  loaded: false,
  error: null,
  data: null,
}

export const currentCharacterSlice = createSlice({
  name: 'currentCharacter',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false
      state.loaded = false
      state.error = null
      state.data = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(meThunk.pending, (state) => {
      state.loading = true
      state.loaded = false
    })
    builder.addCase(fetchCharacterThunk.fulfilled, (state, { payload }) => {
      state.data = payload
      state.loading = false
      state.loaded = true
    })
  },
})

export const { reset } = currentCharacterSlice.actions

export default currentCharacterSlice.reducer
