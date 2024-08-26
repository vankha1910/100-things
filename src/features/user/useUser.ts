import { useDispatch } from 'react-redux'
import { createUser, logout, updateUserInfo } from './userSlice'

const useUser = () => {
  const dispatch = useDispatch()

  return {
    logout: () => dispatch(logout()),
    createUser: (username: string, color: string) =>
      dispatch(createUser({ username, color })),
    updateUser: (username: string, color: string) =>
      dispatch(updateUserInfo({ username, color }))
  }
}

export default useUser
