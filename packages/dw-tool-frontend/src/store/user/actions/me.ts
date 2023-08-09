import { createAsyncThunk } from '@reduxjs/toolkit'
import { userServices } from 'src/services/user'
import { removeToken, setToken } from 'src/utils/auth'
import { IUserData } from 'dw-tool-meta'
import { resetUser } from '../userSlice'
import { setRedirect } from '../../redirect/redirectSlice'
import { PATHS } from '../../../routes/config'

export const meThunk = createAsyncThunk<IUserData>(
  'user/me',
  async (_, { rejectWithValue, dispatch }) => {
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
      dispatch(resetUser)
      removeToken()
      dispatch(setRedirect(PATHS.LOGIN))
      return rejectWithValue(error)
    }
  }
)
