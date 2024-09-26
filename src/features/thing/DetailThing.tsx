import { useSelector } from 'react-redux'
import Button from '../../components/Button'
import Cell from '../../components/Cell'
import { RootState } from '../../app/store'
import { Thing as ThingInterface } from './thingSlice'
import useThing from './useThing'
const A100 = Array.from(Array(100)).map((_, v) => v)

const DetailThing = () => {
  const things = useSelector((state: RootState) => state.thing.things)
  const currentThingId = useSelector(
    (state: RootState) => state.thing.currentThingId
  )
  const currentThing = things.find((t) => t.id === currentThingId)
  if (!currentThing) return null
  return (
    <div className='mx-auto mb-8 w-full'>
      <Header currentThing={currentThing}></Header>
      <h3 className='mb-8 mt-6 text-center text-xl font-bold'>
        {currentThing.name}{' '}
        <span className='font-normal'>{`(${currentThing.completions.length}/100 )`}</span>
      </h3>
      <div className='mx-auto flex h-lvh w-[85%] flex-wrap items-center justify-center gap-4'>
        {A100.map((k) => (
          <Cell currentThing={currentThing} key={k} index={k} />
        ))}
      </div>
    </div>
  )
}

const Header = ({ currentThing }: { currentThing: ThingInterface }) => {
  const { completeThing, undoCompleteThing, viewDetail, removeThing } =
    useThing()

  const handleBack = () => {
    viewDetail('')
  }
  const handleRemove = () => {
    removeThing(currentThing.id)
    viewDetail('')
  }
  return (
    <header className='flex flex-col gap-4'>
      <div className='flex justify-between'>
        <Button onClick={handleBack}> ⬅ back </Button>
        <Button onClick={handleRemove}> 🗑 Remove </Button>
      </div>
      <div className='flex justify-between'>
        <Button
          disabled={currentThing.completions.length === 100}
          onClick={() => completeThing(currentThing.id)}
        >
          ➕ Do
        </Button>
        <Button
          disabled={currentThing.completions.length === 0}
          onClick={() => undoCompleteThing(currentThing.id)}
        >
          ➖ Undo
        </Button>
      </div>
    </header>
  )
}

export default DetailThing
