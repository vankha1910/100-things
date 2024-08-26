import { configureStore } from '@reduxjs/toolkit'
import thingSlice from '../features/thing/thingSlice'
import userSlice from '../features/user/userSlice'

const store = configureStore({
  reducer: {
    thing: thingSlice,
    user: userSlice
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
