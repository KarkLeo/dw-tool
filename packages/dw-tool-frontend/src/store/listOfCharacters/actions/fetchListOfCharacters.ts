import { createAsyncThunk } from '@reduxjs/toolkit'
import { ICharacterListData } from 'dw-tool-meta'
import { characterServices } from 'src/services/character'

export const fetchListOfCharactersThunk = createAsyncThunk<
  ICharacterListData[]
>(
  'list-of-characters/fetch-list-of-characters',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await characterServices.getList()
      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
