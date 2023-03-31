import React, { useState } from 'react'
import { IUserDataRequest } from 'src/services/user/types'
import { useAppDispatch } from 'src/store/root'
import { authThunk } from 'src/store/user/actions/auth'

export const Register = () => {
  const dispatch = useAppDispatch()

  const [data, setData] = useState<IUserDataRequest>({
    email: '',
    name: '',
    password: '',
  })

  const handleSubmit = () => {
    dispatch(authThunk(data))
  }

  const isValidate = () => data.email && data.password && data.name

  return (
    <div>
      <input
        type='text'
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />
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
