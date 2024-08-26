import Thing from './Thing.tsx'
import { Thing as ThingInterface } from './thingSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store.ts'
import DetailThing from './DetailThing.tsx'
import AddThing from './AddThing.tsx'
import Button from '../../components/Button.tsx'
import { useNavigate } from 'react-router-dom'

const AllThings = () => {
  const navigate = useNavigate()
  const things = useSelector((state: RootState) => state.thing.things)
  const currentThingId = useSelector(
    (state: RootState) => state.thing.currentThingId
  )

  if (currentThingId) {
    return <DetailThing />
  }

  return (
    <>
      <AddThing />

      {things?.map((thing: ThingInterface) => (
        <Thing key={thing.id} thing={thing} />
      ))}
      <Button
        onClick={() => navigate('/edit-profile')}
        className='fixed bottom-4 left-4 h-10 min-w-[140px]'
      >
        Edit your profile
      </Button>
    </>
  )
}

export default AllThings
