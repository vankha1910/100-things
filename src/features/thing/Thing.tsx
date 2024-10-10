import { useSelector } from 'react-redux'
import Button from '../../components/Button'
import { Thing as ThingInterface } from './thingSlice'
import useThing from './useThing'
import { RootState } from '../../app/store'
import { formatDate } from '../../utils'
import { FaPlus, FaMinus } from 'react-icons/fa6'
import { IoMdArrowRoundForward } from 'react-icons/io'

const Thing = ({ thing }: { thing: ThingInterface }) => {
  const { completeThing, undoCompleteThing, viewDetail } = useThing()
  const { color } = useSelector((state: RootState) => state.user)
  const handleComplete = () => {
    completeThing(thing.id)
  }
  const handleUndoComplete = () => {
    undoCompleteThing(thing.id)
  }
  const handleViewDetails = () => {
    viewDetail(thing.id)
    // SCROLL TO TOP
    window.scrollTo(0, 0)
  }

  return (
    <>
      <section className='flex w-full flex-col items-center justify-center rounded border-2 border-solid border-black p-4 shadow-[-4px_4px_0_black] dark:border-primaryGray dark:shadow-[-4px_4px_0_#cbd5e1]'>
        <div className='flex w-full justify-end'>
          <p className='text-sm'>
            {thing?.startDate && formatDate(thing?.startDate)} -{' '}
            {thing?.finishedDate && formatDate(thing?.finishedDate)}{' '}
          </p>
        </div>
        <div className='mb-4 flex w-full justify-between'>
          <h3 className='text-xl font-bold'>
            {thing.name}{' '}
            <span className='text-sm font-normal'>{`(${thing.completions.length}/100)`}</span>
          </h3>
        </div>

        <div className='mb-4 flex w-full gap-8'>
          <div
            className={`delay-400 relative h-8 flex-grow overflow-hidden rounded-lg border-2 border-solid border-black bg-transparent shadow-[black_2px_-2px_0px] transition dark:border-primaryGray dark:shadow-[primaryGray_2px_-2px_0px]`}
            // [background:linear-gradient(to_right,_#FFC0B0_80%,_black_80%,_black)_0%_0%/1%_100%_repeat]
            // style={{
            //   background: `linear-gradient(to right, ${color} 80%, black 80%, black) 0% 0% / 1% 100% repeat`
            // }}
            // style={{
            //   background: `${color}`,
            //   width: `${thing.completions.length}%`
            // }}
          >
            <div
              // className='duration-400 h-full transition-all ease-in-out'
              style={{
                background: `${color}`,
                width: `${thing.completions.length}%`,
                height: '100%',
                transition: 'width 0.4s ease-in-out'
              }}
            ></div>
            {/* <div
              className={`absolute bottom-0 right-0 top-0 block bg-white`}
              style={{
                width: `${100 - thing.completions.length}%`
              }}
            ></div> */}
          </div>
          <div className='flex gap-4'>
            <Button
              disabled={thing.completions.length === 100}
              onClick={handleComplete}
            >
              <FaPlus />
            </Button>
            <Button
              disabled={thing.completions.length === 0}
              onClick={handleUndoComplete}
            >
              <FaMinus />
            </Button>
          </div>
        </div>
        <div className='flex w-full justify-end'>
          <p
            className='flex animate-pulse cursor-pointer items-center gap-2 hover:underline'
            onClick={handleViewDetails}
          >
            see more{' '}
            <span>
              <IoMdArrowRoundForward />
            </span>
          </p>
        </div>
      </section>
      {/* <ReactConfetti recycle={showAnimation}></ReactConfetti>
      <audio ref={audioRef} src={audio}></audio> */}
    </>
  )
}

export default Thing
