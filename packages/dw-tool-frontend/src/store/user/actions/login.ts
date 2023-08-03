import { createAsyncThunk } from '@reduxjs/toolkit'
import { userServices } from 'src/services/user'
import { ILoginRequest } from 'src/services/user/types'
import { setToken } from 'src/utils/auth'
import { IUserData } from 'dw-tool-meta'

export const loginThunk = createAsyncThunk<IUserData, ILoginRequest>(
  'user/login',
  async (data, { rejectWithValue }) => {
    try {
      const {
        data: { user },
      } = await userServices.login(data)

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
