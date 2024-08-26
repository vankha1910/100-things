import { useRef, useState } from 'react'
import { completeThing, Thing } from '../features/thing/thingSlice'
import { useDispatch, useSelector } from 'react-redux'
import useClickOutside from '../hooks/useClickOutside'
import { formatDate } from '../utils'
import useThing from '../features/thing/useThing'
import { RootState } from '../app/store'
interface CellProps {
  currentThing: Thing
  index: number
}
const Cell = ({ currentThing, index }: CellProps) => {
  const { updateThingNote } = useThing()
  const { color } = useSelector((state: RootState) => state.user)
  const [showNote, setShowNote] = useState(false)
  const ref = useRef(null)
  useClickOutside(ref, () => setShowNote(false))
  const dispatch = useDispatch()
  const handleClickCell = () => {
    if (index > currentThing.completions.length) return
    if (index < currentThing.completions.length) {
      setShowNote(!showNote)
      return
    }
    dispatch(completeThing(currentThing.id))
  }
  const timeComplete = formatDate(currentThing.completions[index]?.timestamp)
  return (
    <div className='relative h-[40px] w-[40px]'>
      <div
        onClick={handleClickCell}
        className={`h-full rounded border border-solid border-black shadow-[black_-3px_3px_0px]`}
        style={{
          background: index < currentThing.completions.length ? color : 'white'
        }}
      ></div>
      {showNote && (
        <div
          ref={ref}
          className='absolute left-[20px] top-[20px] z-[99] h-auto min-w-[150px] rounded border-2 border-solid border-black bg-white p-2'
        >
          <span>{timeComplete}</span>
          <textarea
            placeholder='type to add text to this note '
            className='mt-1 resize border-none outline-none'
            value={currentThing.completions[index]?.note}
            onChange={(e) => {
              updateThingNote(currentThing.id, index, e.target.value)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default Cell
