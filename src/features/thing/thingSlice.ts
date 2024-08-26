import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { logout } from '../user/userSlice'
import { KEY_THINGS } from '../../utils/constants'

interface Completion {
  id: string
  timestamp: Date // Thời điểm hoàn thành
  note?: string // Ghi chú cho lần hoàn thành này
}
export interface Thing {
  id: string
  name: string
  completions: Completion[]
  startDate?: Date
  finishedDate?: Date
  isFinished?: boolean
}

interface ThingState {
  things: Thing[]
  currentThingId?: string
}

const initialState: ThingState = {
  things: JSON.parse(localStorage.getItem(KEY_THINGS) || '[]'),
  currentThingId: ''
}

const emptyState: ThingState = {
  things: [],
  currentThingId: ''
}

const reducers = {
  addThing: (state: ThingState, action: { payload: Thing }) => {
    state.things.push(action.payload)
  },
  deleteThing: (state: ThingState, action: { payload: string }) => {
    state.things = state.things.filter((thing) => thing.id !== action.payload)
  },
  completeThing: (state: ThingState, action: { payload: string }) => {
    const thing = state.things.find((t) => t.id === action.payload)
    // if (!thing) return

    thing?.completions.push({
      id: uuidv4(),
      timestamp: new Date(),
      note: ''
    })
  },
  undoCompleteThing: (state: ThingState, action: { payload: string }) => {
    const thing = state.things.find((t) => t.id === action.payload)
    if (!thing) return
    thing?.completions.pop()
  },
  viewDetail: (state: ThingState, action: { payload: string }) => {
    state.currentThingId = action.payload
  },
  updateThingNote: (
    state: ThingState,
    action: { payload: { id: string; noteIndex: number; note: string } }
  ) => {
    const { id, noteIndex, note } = action.payload
    const thing = state.things.find((t) => t.id === id)
    if (!thing) return
    thing.completions[noteIndex].note = note
  }
}

const thingSlice = createSlice({
  name: 'thing',
  initialState,
  reducers,
  extraReducers: (builder: ActionReducerMapBuilder<ThingState>) => {
    builder.addCase(logout, () => {
      return emptyState
    })
  }
})
export const {
  addThing,
  deleteThing,
  completeThing,
  undoCompleteThing,
  viewDetail,
  updateThingNote
} = thingSlice.actions

export default thingSlice.reducer
