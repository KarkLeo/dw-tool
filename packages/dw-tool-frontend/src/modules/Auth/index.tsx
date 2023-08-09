import React, { useState } from 'react'
import { Login } from './components/Login'
import { Register } from './components/Register'

const tStyles = {
  tab: 'px-4 py-2 bg-gray-200 text-gray-700 rounded-t-lg hover:bg-gray-300',
  activeTab: 'px-4 py-2 bg-blue-500 text-white rounded-t-lg hover:bg-blue-700',
}

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className='container mx-auto font-sans flex flex-col'>
      <div className='flex justify-center space-x-4 mt-4'>
        <button
          className={isLogin ? tStyles.activeTab : tStyles.tab}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={isLogin ? tStyles.tab : tStyles.activeTab}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>
      <div className='border-2 border-blue-500 rounded-b-lg p-3 w-96 mx-auto'>
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  )
}
