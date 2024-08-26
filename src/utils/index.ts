import moment from 'moment'
import { KEY_THINGS, KEY_USER } from './constants'

export const formatDate = (timestamp: Date) => {
  return moment(timestamp)?.format('HH:mm DD/MM/YYYY')
}

export const clearLocalStorage = () => {
  localStorage.removeItem(KEY_USER)
  localStorage.removeItem(KEY_THINGS)
}
