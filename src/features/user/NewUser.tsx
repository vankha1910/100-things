import React, { useState } from 'react'
import useUser from './useUser'
import { useNavigate } from 'react-router-dom'

const NewUser = () => {
  const [username, setUsername] = useState('')
  const [color, setColor] = useState('#ffc0cb')
  const { createUser } = useUser()
  const navigate = useNavigate()
  const handleCreateNewUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createUser(username, color)
    navigate('/')
  }
  return (
    <div className='mx-auto mt-[10%] text-center'>
      <form onSubmit={handleCreateNewUser}>
        <fieldset className='mb-8'>
          <p className='mb-3 text-2xl'>pick a username</p>
          <input
            className='w-52 rounded-lg border-2 border-solid border-black bg-transparent p-2 text-inherit outline-none dark:border-[#cbd5e1]'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-label='username'
          />
        </fieldset>
        <fieldset className='mb-8'>
          <p className='mb-3 text-2xl'>pick a color</p>
          <select
            className='rounded-lg border-2 border-solid border-black bg-transparent p-2 outline-none dark:border-[#cbd5e1]'
            value={color}
            onChange={(e) => setColor(e.target.value)}
            aria-label='color'
          >
            <option className='dark:text-black' value='#ffc0cb'>
              pink
            </option>
            <option className='dark:text-black' value='#C09CFF'>
              purple
            </option>
            <option className='dark:text-black' value='#92BFFF'>
              blue
            </option>
            <option className='dark:text-black' value='#C6F590'>
              green
            </option>
            <option className='dark:text-black' value='#F78D5C'>
              orange
            </option>
            <option className='dark:text-black' value='#FFDF52'>
              yellow
            </option>
          </select>
        </fieldset>
        <button className='mb-2 mt-8 w-52 rounded-lg bg-[#444] p-3 text-xl text-white'>
          Continue
        </button>
        <p className='text-sm font-light underline'>
          don't worry, you can change these later
        </p>
      </form>
    </div>
  )
}

export default NewUser
