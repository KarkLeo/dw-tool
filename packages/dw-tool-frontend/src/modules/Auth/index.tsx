import React, { useState } from 'react'
import { Login } from './components/Login'
import { Register } from './components/Register'

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div>
      <div>
        <button onClick={() => setIsLogin(true)}>Login</button>
        <button onClick={() => setIsLogin(false)}>Register</button>
      </div>

      {isLogin ? <Login /> : <Register />}
    </div>
  )
}
