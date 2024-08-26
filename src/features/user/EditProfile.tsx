import React, { useState } from 'react'
import useUser from './useUser'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { Link, useNavigate } from 'react-router-dom'

const EditProfile = () => {
  const { username: initialUsername, color: initialColor } = useSelector(
    (state: RootState) => state.user
  )
  const [username, setUsername] = useState(initialUsername)
  const [color, setColor] = useState(initialColor)
  const { updateUser, logout } = useUser()
  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateUser(username, color)
    navigate('/')
  }
  const handleLogout = () => {
    logout()
    navigate('/new')
  }
  return (
    <div className='mx-auto mt-[10%] text-center'>
      <form onSubmit={handleSubmit} className='mb-20'>
        <fieldset className='mb-6'>
          <p className='mb-3 text-2xl'>Edit your profile</p>
          <div className='flex items-center justify-center gap-4'>
            <input
              className='w-52 rounded-lg border-2 border-solid border-black p-2'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className='h-10 rounded-lg border-2 border-solid border-black'
              type='color'
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </div>
        </fieldset>
        <div className='flex justify-center gap-4'>
          <Link
            to={'/'}
            className='mb-2 w-20 rounded-lg bg-[#444] px-1 py-1 text-xl text-white'
          >
            Cancel
          </Link>
          <button
            type='submit'
            className='mb-2 w-20 rounded-lg bg-[#444] px-1 py-1 text-xl text-white'
          >
            Save
          </button>
        </div>
      </form>
      <button
        onClick={handleLogout}
        className='mb-2 mt-8 w-52 rounded-lg bg-[#444] p-3 text-xl text-white'
      >
        Logout
      </button>
      <p className='text-sm font-light underline'>
        This will delete your locally-stored account data.
      </p>
    </div>
  )
}

export default EditProfile
