import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import redirectReducer from './redirect/redirectSlice'
import userReducer from './user/userSlice'
import newCharacterReducer from './newCharacter/newCharacterSlice'
import listOfCharactersReducer from './listOfCharacters/listOfCharactersSlice'
import currentCharacterReducer from './currentCharacter/currentCharacterSlice'

export const store = configureStore({
  reducer: {
    redirect: redirectReducer,
    user: userReducer,
    newCharacter: newCharacterReducer,
    listOfCharacters: listOfCharactersReducer,
    currentCharacter: currentCharacterReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
