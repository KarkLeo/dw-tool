import { createAsyncThunk } from '@reduxjs/toolkit'
import { userServices } from 'src/services/user'
import { ILoginRequest } from 'src/services/user/types'
import { removeToken, setToken } from 'src/utils/auth'
import { IUserData } from 'dw-tool-meta'
import { resetUser } from '../userSlice'

export const loginThunk = createAsyncThunk<IUserData, ILoginRequest>(
  'user/login',
  async (data, { rejectWithValue, dispatch }) => {
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
      dispatch(resetUser)
      removeToken()
      return rejectWithValue(error)
    }
  }
)
