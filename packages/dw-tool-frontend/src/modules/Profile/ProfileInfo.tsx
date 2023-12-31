import React from 'react'
import { useSelector } from 'react-redux'
import { FrameWindow1 } from 'src/common/Frames'
import { PSimple } from 'src/common/Texts/Simple'
import { useAppDispatch } from 'src/store/root'
import { logoutThunk } from 'src/store/user/actions/logout'
import { userDataSelector } from 'src/store/user/selectors'
import { Menu } from '../../common/Menu/Menu'

export const ProfileInfo = () => {
  const dispatch = useAppDispatch()

  const user = useSelector(userDataSelector)

  const handleLogout = () => {
    dispatch(logoutThunk())
  }

  return (
    <FrameWindow1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <PSimple>
          {user?.name} ({user?.email})
        </PSimple>
        <Menu />
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </FrameWindow1>
  )
}
