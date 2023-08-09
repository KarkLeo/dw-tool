import { UserSearchBar } from '../UserSearchBar/UserSearchBar'
import { useState } from 'react'
import { IUserResponse } from '../../../../services/user/types'
import { gamesServices } from '../../../../services/games'

const tStyles = {
  lable: 'flex flex-col',
  span: 'mb-2 font-bold text-lg text-gray-900',
  input:
    'px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
}

export const CreateGameForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [users, setUsers] = useState<IUserResponse[]>([])

  const setNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const setDescriptionHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value)
  }

  const setUsersHandler = (user: IUserResponse) => {
    setUsers((prev) => [...prev, user])
  }

  const removeUserHandler = (user: IUserResponse) => () => {
    setUsers((prev) => prev.filter((u) => u.user.id !== user.user.id))
  }

  const isDisabled = !name || !description || !users.length

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const res = await gamesServices.create({
      name,
      description,
      users: users.map((u) => ({ id: u.user.id })),
    })

    console.log(res)
  }

  return (
    <div className='w-96 mx-auto'>
      <form onSubmit={submitHandler} className='p-4 flex flex-col space-y-6'>
        <label className={tStyles.lable}>
          <span className={tStyles.span}>Name:</span>
          <input
            className={tStyles.input}
            type='text'
            name='name'
            value={name}
            onChange={setNameHandler}
          />
        </label>

        <label className={tStyles.lable}>
          <span className={tStyles.span}>Description:</span>
          <textarea
            className={tStyles.input}
            name='description'
            value={description}
            onChange={setDescriptionHandler}
          />
        </label>

        <label className={tStyles.lable}>
          <span className={tStyles.span}>Users:</span>
          <UserSearchBar selectedUsers={users} selectUser={setUsersHandler} />
        </label>
        <div className='flex flex-col space-y-2'>
          {users.map((user) => (
            <div
              key={user.user.id}
              className='flex items-center justify-between bg-blue-100 rounded p-4 space-x-2'
            >
              <span className='font-bold text-blue-700'>
                {user.user.name} | {user.user.email}
              </span>
              <button
                className='bg-red-500 text-white rounded px-2 py-1'
                onClick={removeUserHandler(user)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <hr className='m-y-4' />

        <button
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
          type='submit'
          disabled={isDisabled}
        >
          Create
        </button>
      </form>
    </div>
  )
}
