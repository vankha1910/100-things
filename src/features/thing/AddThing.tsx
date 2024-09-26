import React, { useRef, useState } from 'react'
import Button from '../../components/Button'
import { useDispatch } from 'react-redux'
import { addThing } from './thingSlice'
import { v4 as uuidv4 } from 'uuid'
import useClickOutside from '../../hooks/useClickOutside'
const AddThing = () => {
  const [name, setName] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const dispatch = useDispatch()
  const formRef = useRef(null)
  useClickOutside(formRef, () => setIsAdding(false))
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
    return (
      <Button
        className='fixed bottom-4 right-4 w-fit'
        onClick={() => setIsAdding(true)}
      >
        Add a thing
      </Button>
    )
  }
  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className='dark:border-primaryGray fixed bottom-4 right-4 z-10 flex w-[250px] flex-col gap-4 rounded border-2 border-solid border-black bg-[#f7f9fc] p-4 dark:bg-[#535c72]'
      >
        <input
          autoFocus
          type='text'
          onChange={(e) => setName(e.target.value)}
          required
          className='dark:border-primaryGray h-10 rounded border-[3px] border-black bg-[white] px-2 py-1 leading-none text-black focus:outline-none'
        />
        <div className='flex justify-center gap-4'>
          <Button type='submit'>Add</Button>
          <Button onClick={handleCancel} type='button'>
            Cancel
          </Button>
        </div>
      </form>
      {/* <div className='overlay z-9 fixed inset-0 blur-sm'></div> */}
    </>
  )
}

export default AddThing
