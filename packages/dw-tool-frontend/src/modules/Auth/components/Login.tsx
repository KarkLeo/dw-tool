import React, { useState } from 'react'
import { ILoginRequest } from 'src/services/user/types'
import { useAppDispatch } from 'src/store/root'
import { loginThunk } from 'src/store/user/actions/login'

export const Login = () => {
  const dispatch = useAppDispatch()

  const [data, setData] = useState<ILoginRequest>({
    email: '',
    password: '',
  })

  const handleSubmit = () => {
    dispatch(loginThunk(data))
  }

  const isValidate = () => data.email && data.password

  return (
    <div>
      <input
        type='email'
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <input
        type='password'
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />

      <button disabled={!isValidate} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )
}
