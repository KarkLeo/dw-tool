import { createAsyncThunk } from '@reduxjs/toolkit'
import { resetUser } from 'src/store/user/userSlice'
import { removeToken } from 'src/utils/auth'

export const logoutThunk = createAsyncThunk(
  'user/login',
  (_, { rejectWithValue, dispatch }) => {
    removeToken()
    dispatch(resetUser())
  }
)
