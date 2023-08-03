import { ICharacterListData } from 'dw-tool-meta'
import { createSlice } from '@reduxjs/toolkit'
import { fetchListOfCharactersThunk } from './actions/fetchListOfCharacters'

export interface ListOfCharactersState {
  loading: boolean
  loaded: boolean
  error: string | null
  list: ICharacterListData[] | null
}

export const initialState: ListOfCharactersState = {
  loading: false,
  loaded: false,
  error: null,
  list: null,
}

export const listOfCharactersSlice = createSlice({
  name: 'listOfCharacters',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false
      state.loaded = false
      state.error = null
      state.list = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchListOfCharactersThunk.pending,
      (state, { payload }) => {
        state.loading = true
        state.loaded = false
      }
    )
    builder.addCase(
      fetchListOfCharactersThunk.fulfilled,
      (state, { payload }) => {
        state.list = payload
        state.loading = false
        state.loaded = true
      }
    )
  },
})

export const { reset } = listOfCharactersSlice.actions

export default listOfCharactersSlice.reducer
