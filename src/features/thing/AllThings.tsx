import Thing from './Thing.tsx'
import { Thing as ThingInterface } from './thingSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store.ts'
import DetailThing from './DetailThing.tsx'
import AddThing from './AddThing.tsx'
import Button from '../../components/Button.tsx'
import { useNavigate } from 'react-router-dom'
import ReactConfetti from 'react-confetti'
import { useEffect, useRef } from 'react'
import useThing from './useThing.ts'
import audio from '../../assets/audio/applause.mp3'
import useWindowSize from '../../hooks/useWindownSize.ts'

const AllThings = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const windowSize = useWindowSize()
  const navigate = useNavigate()
  const things = useSelector((state: RootState) => state.thing.things)
  const { stopAnimation } = useThing()
  const showAnimation = useSelector(
    (state: RootState) => state.thing.showAnimation
  )
  const currentThingId = useSelector(
    (state: RootState) => state.thing.currentThingId
  )
  console.log(windowSize)
  useEffect(() => {
    if (showAnimation) {
      audioRef?.current?.play()
      setTimeout(() => {
        stopAnimation()
      }, 5000)
    }
  }, [showAnimation, stopAnimation])

  return (
    <>
      {currentThingId ? (
        <DetailThing />
      ) : (
        <>
          {' '}
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
      )}

      <ReactConfetti
        width={windowSize.width - 20}
        recycle={showAnimation}
      ></ReactConfetti>
      <audio ref={audioRef} src={audio}></audio>
    </>
  )
}

export default AllThings
