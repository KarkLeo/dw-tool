import React from 'react'
import { useSelector } from 'react-redux'
import { FrameWindow1 } from 'src/components/common/Frames'
import { PSimple } from 'src/components/common/Texts/Simple'
import { useAppDispatch } from 'src/store/root'
import { logoutThunk } from 'src/store/user/actions/logout'
import { userDataSelector } from 'src/store/user/selectors'

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
        <button onClick={handleLogout}>Logout</button>
      </div>
    </FrameWindow1>
  )
}
