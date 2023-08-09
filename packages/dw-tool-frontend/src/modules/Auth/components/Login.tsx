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

  const tStyles = {
    lable: 'flex flex-col',
    span: 'mb-2 font-bold text-lg text-gray-900',
    input:
      'px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
  }

  return (
    <div className='p-4 flex flex-col space-y-6'>
      <label className={tStyles.lable}>
        <span className={tStyles.span}>Email</span>
        <input
          className={tStyles.input}
          type='email'
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
      </label>
      <label className={tStyles.lable}>
        <span className={tStyles.span}>Password</span>
        <input
          className={tStyles.input}
          type='password'
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </label>

      <button
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
        disabled={!isValidate}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  )
}
