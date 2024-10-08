import { useEffect } from 'react'
import AllThings from '../features/thing/AllThings'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { useNavigate } from 'react-router-dom'
import ToggleTheme from '../components/ToggleThemeButton'

const Things = () => {
  const navigate = useNavigate()
  const { username } = useSelector((state: RootState) => state.user)
  useEffect(() => {
    if (!username) return navigate('/new')
  }, [])
  return (
    <div className='mx-auto my-8 flex w-[80%] flex-col items-center justify-center gap-8 pb-10 font-rale lg:w-[60%]'>
      <div className='flex w-full justify-end'>
        <ToggleTheme></ToggleTheme>
      </div>
      <h1 className='text-4xl font-bold'>{username}'s things</h1>

      <AllThings />
    </div>
  )
}

export default Things
