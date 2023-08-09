import { createAsyncThunk } from '@reduxjs/toolkit'
import { createNewCharacterNameThunk } from '../utils'
import { characterServices } from 'src/services/character'
import { newCharacterSelector } from '../selectors'
import { RootState } from '../../root'
import { setRedirect } from '../../redirect/redirectSlice'
import { PATHS } from '../../../routes/config'

export const saveNewCharacterThunk = createAsyncThunk<
  any,
  undefined,
  { state: RootState }
>(
  createNewCharacterNameThunk('new-character/save'),
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const data = newCharacterSelector(getState())
      const res = await characterServices.create(data)

      dispatch(setRedirect(PATHS.APP))

      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
