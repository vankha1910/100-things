import React, { useState } from 'react'
import Button from '../../components/Button'
import { useDispatch } from 'react-redux'
import { addThing } from './thingSlice'
import { v4 as uuidv4 } from 'uuid'
const AddThing = () => {
  const [name, setName] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const dispatch = useDispatch()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const thing = {
      id: uuidv4(),
      name: name,
      completions: [],
      startDate: new Date()
    }
    dispatch(addThing(thing))
    setIsAdding(false)
  }
  const handleCancel = () => {
    setName('')
    setIsAdding(false)
  }
  if (!isAdding) {
    return <Button onClick={() => setIsAdding(true)}>Add a thing</Button>
  }
  return (
    <form onSubmit={handleSubmit} className='flex gap-4'>
      <input
        autoFocus
        type='text'
        onChange={(e) => setName(e.target.value)}
        required
        className='rounded border-[3px] border-black bg-transparent px-2 py-1 leading-none shadow-[-2px_2px_0_black] focus:shadow-[-4px_4px_0_black] focus:outline-none dark:border-[#cbd5e1] dark:shadow-[-2px_2px_0_#cbd5e1] dark:focus:shadow-[-4px_4px_0_#cbd5e1]'
      />
      <Button type='submit'>Add</Button>
      <Button onClick={handleCancel} type='button'>
        Cancel
      </Button>
    </form>
  )
}

export default AddThing
