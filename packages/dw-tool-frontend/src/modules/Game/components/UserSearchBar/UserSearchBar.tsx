import { FC, useEffect, useState } from 'react'
import { userServices } from '../../../../services/user'
import { debounce } from 'lodash'
import { IUserResponse } from '../../../../services/user/types'
import { useClickOutside } from '../../../../utils/hooks/useClickOutside'
import { useSelector } from 'react-redux'
import { userDataSelector } from '../../../../store/user/selectors'

interface IUserSearchBarProps {
  selectedUsers?: IUserResponse[]
  selectUser?: (user: IUserResponse) => void
}

export const UserSearchBar: FC<IUserSearchBarProps> = ({
  selectedUsers,
  selectUser,
}) => {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState<IUserResponse[]>([])
  const [open, setOpen] = useState(false)
  const currentUser = useSelector(userDataSelector)

  const selectedUserIds =
    selectedUsers?.reduce<Record<string, boolean>>((res, user) => {
      res[user.user.id] = true
      return res
    }, {}) || {}
  const setSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    if (search && search.length > 2) {
      const fetch = debounce(async () => {
        const res = await userServices.search(search)

        setUsers(
          currentUser
            ? res.data.filter((user) => user.user.id !== currentUser.id)
            : res.data
        )
      }, 300)

      fetch()

      return () => {
        fetch.cancel()
      }
    }
  }, [search, setUsers, currentUser])

  const ref = useClickOutside(() => setOpen(false))

  return (
    <div className='relative inline-block text-left' ref={ref}>
      <div className='relative inline-flex justify-end w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm text-right font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'>
        <input
          type='text'
          className='absolute top-0 left-0 right-0 bottom-0 z-10 py-2 px-3 w-full border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Search...'
          value={search}
          onChange={setSearchHandler}
          onFocus={() => setOpen(true)}
        />
        <svg
          className='-mr-1 ml-2 h-5 w-5 relative z-20 pointer-events-none'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </div>

      {open && (
        <div className='origin-top-right absolute right-0 left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
          <div className='p-1 flex flex-col space-y-1'>
            {users.map((user) => (
              <button
                key={user.user.id}
                className='block px-4 py-2 w-full text-sm text-gray-700 text-left rounded-s hover:bg-gray-100 hover:text-gray-900 disabled:text-blue-500'
                disabled={selectedUserIds[user.user.id]}
                type='button'
                onClick={() => selectUser && selectUser(user)}
              >
                {user.user.name} | {user.user.email}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
