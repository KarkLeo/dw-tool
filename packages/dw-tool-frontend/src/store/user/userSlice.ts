import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { authThunk } from 'src/store/user/actions/auth'
import { loginThunk } from 'src/store/user/actions/login'
import { meThunk } from 'src/store/user/actions/me'
import { updateThunk } from 'src/store/user/actions/update'
import { IUserData } from 'dw-tool-meta'

export interface UserState {
  loading: boolean
  loaded: boolean
  user: IUserData | null
}

const initialState: UserState = {
  loading: false,
  loaded: false,
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IUserData>) => {
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

    builder.addCase(meThunk.pending, (state) => {
      state.loading = true
      state.loaded = false
    })

    builder.addCase(meThunk.fulfilled, (state, { payload }) => {
      state.user = payload
      state.loading = false
      state.loaded = true
    })

    builder.addCase(updateThunk.fulfilled, (state, { payload }) => {
      state.user = payload
    })
  },
})

export const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer
