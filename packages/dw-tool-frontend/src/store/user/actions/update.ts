import { createAsyncThunk } from '@reduxjs/toolkit'
import { userServices } from 'src/services/user'
import { IUserDataRequest } from 'src/services/user/types'
import { setToken } from 'src/utils/auth'
import { IUser } from '../types'

export const updateThunk = createAsyncThunk<IUser, IUserDataRequest>(
  'user/update',
  async (data, { rejectWithValue }) => {
    try {
      const {
        data: { user },
      } = await userServices.update(data)

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
