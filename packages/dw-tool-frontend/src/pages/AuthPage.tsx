import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Auth } from 'src/modules/Auth'
import { useAppDispatch } from 'src/store/root'
import { meThunk } from 'src/store/user/actions/me'
import { userDataSelector } from 'src/store/user/selectors'

import test from 'dw-tool-meta'

export const AuthPage = () => {
  const dispatch = useAppDispatch()


  console.log(test())
  const user = useSelector(userDataSelector)

  useEffect(() => {
    dispatch(meThunk())
  }, [])

  return !user ? (
    <div>
      <Auth />
    </div>
  ) : (
    <Navigate to='/' />
  )
}
