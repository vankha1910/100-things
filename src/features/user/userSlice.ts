import { createSlice } from '@reduxjs/toolkit'
import { clearLocalStorage } from '../../utils'
import { KEY_USER } from '../../utils/constants'
type UserType = {
  username: string
  color: string
}
const saveStateToLocalStorage = (state: UserType, key: string) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(key, serializedState)
  } catch (error) {
    console.error('Could not save state', error)
  }
}
export const loadStateFromLocalStorage = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (error) {
    console.error('Could not load state', error)
    return undefined
  }
}

const initialState: UserType = loadStateFromLocalStorage(KEY_USER) || {
  username: '',
  color: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.username = action.payload.username
      state.color = action.payload.color
      saveStateToLocalStorage(state, KEY_USER)
    },
    updateUserInfo: (state, action) => {
      state.username = action.payload.username
      state.color = action.payload.color
      saveStateToLocalStorage(state, KEY_USER)
    },
    logout: (state) => {
      state.username = ''
      state.color = ''
      clearLocalStorage()
    }
  }
})

export const { createUser, updateUserInfo, logout } = userSlice.actions

export default userSlice.reducer
