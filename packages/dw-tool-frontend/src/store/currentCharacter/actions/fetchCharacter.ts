import { createAsyncThunk } from '@reduxjs/toolkit'
import { ICharacterFullData } from 'dw-tool-meta'
import { characterServices } from 'src/services/character'
export const fetchCharacterThunk = createAsyncThunk<
  ICharacterFullData,
  string | number
>('current-characters/fetch-character', async (id, { rejectWithValue }) => {
  try {
    const { data } = await characterServices.get(id)
    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})
