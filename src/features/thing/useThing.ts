import { useDispatch } from 'react-redux'
import {
  completeThing,
  undoCompleteThing,
  updateThingNote,
  viewDetail,
  removeThing,
  stopAnimation
} from './thingSlice'

const useThing = () => {
  const dispatch = useDispatch()
  return {
    completeThing: (id: string) => dispatch(completeThing(id)),
    undoCompleteThing: (id: string) => dispatch(undoCompleteThing(id)),
    viewDetail: (id: string) => {
      dispatch(viewDetail(id))
    },
    updateThingNote: (id: string, noteIndex: number, note: string) => {
      dispatch(updateThingNote({ id, noteIndex, note }))
    },
    removeThing: (id: string) => {
      dispatch(removeThing(id))
    },
    stopAnimation: () => dispatch(stopAnimation())
  }
}

export default useThing
