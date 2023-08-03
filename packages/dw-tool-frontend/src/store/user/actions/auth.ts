import { createAsyncThunk } from '@reduxjs/toolkit'
import { userServices } from 'src/services/user'
import { IUserDataRequest } from 'src/services/user/types'
import { setToken } from 'src/utils/auth'
import { IUserData } from 'dw-tool-meta'

export const authThunk = createAsyncThunk<IUserData, IUserDataRequest>(
  'user/auth',
  async (data, { rejectWithValue }) => {
    try {
      const {
        data: { user },
      } = await userServices.auth(data)

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
