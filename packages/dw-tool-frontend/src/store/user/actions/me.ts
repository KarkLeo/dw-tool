import { createAsyncThunk } from '@reduxjs/toolkit'
import { userServices } from 'src/services/user'
import { setToken } from 'src/utils/auth'
import { IUserData } from 'dw-tool-meta'

export const meThunk = createAsyncThunk<IUserData>(
  'user/me',
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { user },
      } = await userServices.me()

      setToken(user.token)

      return {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
