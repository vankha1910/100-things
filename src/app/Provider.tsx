import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { KEY_THINGS } from '../utils/constants'
const DataProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    store.subscribe(() => {
      localStorage.setItem(
        KEY_THINGS,
        JSON.stringify(store.getState().thing.things)
      )
    })
  }, [])

  return <Provider store={store}>{children}</Provider>
}

export default DataProvider
