import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { authThunk } from 'src/store/user/actions/auth'
import { loginThunk } from 'src/store/user/actions/login'
import { meThunk } from 'src/store/user/actions/me'
import { updateThunk } from 'src/store/user/actions/update'
import { IUser } from 'src/store/user/types'

export interface UserState {
  user: IUser | null
}

const initialState: UserState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload
    },
    resetUser: (state) => {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      state.user = payload
    })

    builder.addCase(authThunk.fulfilled, (state, { payload }) => {
      state.user = payload
    })

    builder.addCase(meThunk.fulfilled, (state, { payload }) => {
      state.user = payload
    })

    builder.addCase(updateThunk.fulfilled, (state, { payload }) => {
      state.user = payload
    })
  },
})

export const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer
