import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { redirectPathSelector } from '../store/redirect/selectors'
import { useAppDispatch } from '../store/root'
import { resetRedirect } from '../store/redirect/redirectSlice'

export const useStateRedirect = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const redirectPath = useSelector(redirectPathSelector)

  useEffect(() => {
    if (redirectPath) {
      navigate(redirectPath)
    }
    return () => {
      if (redirectPath) {
        dispatch(resetRedirect())
      }
    }
  }, [redirectPath, navigate])
}
