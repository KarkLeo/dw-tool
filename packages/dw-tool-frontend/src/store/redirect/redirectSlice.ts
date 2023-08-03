import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface RedirectState {
  path: string | null
}

const initialState: RedirectState = {
  path: null,
}

export const redirectSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    setRedirect: (state, { payload }: PayloadAction<string>) => {
      state.path = payload
    },
    resetRedirect: (state) => {
      state.path = null
    },
  },
})

export const { setRedirect, resetRedirect } = redirectSlice.actions

export default redirectSlice.reducer
