import { useEffect, useRef, useState } from 'react'
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
  const [notePosition, setNotePosition] = useState({
    top: '20px',
    left: '20px',
    right: ''
  })
  const ref = useRef<HTMLDivElement>(null)
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

  // Tính toán vị trí cho note
  const calculateNotePosition = () => {
    const cell = ref.current

    const clientRef = cell?.getBoundingClientRect()

    if (clientRef && window.innerWidth < clientRef.right) {
      setNotePosition({
        top: '20px',
        right: '20px',
        left: ''
      })
    }
  }

  useEffect(() => {
    if (showNote) {
      // setNotePosition(calculateNotePosition())
      calculateNotePosition()
    }
  }, [showNote])
  return (
    <div className='relative h-[40px] w-[40px]'>
      <div
        onClick={handleClickCell}
        className={`custom-cell h-full rounded border border-solid border-black shadow-[black_-3px_3px_0px]`}
        style={{
          background: index < currentThing.completions.length ? color : 'white'
        }}
      ></div>
      {showNote && (
        <div
          ref={ref}
          className='absolute z-[99] h-auto min-w-[150px] rounded border-2 border-solid border-black bg-white p-2'
          style={{ ...notePosition }}
        >
          <span className='dark:text-zinc-800'>{timeComplete}</span>
          <textarea
            placeholder='type to add text to this note '
            className='mt-1 resize border-none outline-none dark:text-zinc-800'
            value={currentThing.completions[index]?.note}
            onChange={(e) => {
              updateThingNote(currentThing.id, index, e.target.value)
            }}
            // style={{ height: 'auto', overflow: 'hidden' }}
          />
        </div>
      )}
    </div>
  )
}

export default Cell
