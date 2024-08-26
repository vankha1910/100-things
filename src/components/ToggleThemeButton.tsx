import cloud1 from '../assets/cloud_1.svg'
import cloud2 from '../assets/cloud_2.svg'
import cloud3 from '../assets/cloud_3.svg'
import cloud4 from '../assets/cloud_4.svg'
import stars from '../assets/stars.svg'
import { useTheme } from '../contexts/ThemeContext'
const ToggleTheme = () => {
  const { theme, toggleThem } = useTheme()
  // const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <label className='switch' htmlFor='switch'>
      <input
        type='checkbox'
        id='switch'
        checked={theme === 'dark'}
        onChange={toggleThem}
        className='hidden'
      />
      <div className='sunmoon'>
        <div className='darkside'></div>
      </div>
      <div className='border'></div>
      <div className='clouds'>
        <img src={cloud1} alt='' className='cloud cloud-1' />
        <img src={cloud2} alt='' className='cloud cloud-2' />
        <img src={cloud3} alt='' className='cloud cloud-3' />
        <img src={cloud4} alt='' className='cloud cloud-4' />
        <img src={stars} alt='' className='stars' />
      </div>
    </label>
  )
}

export default ToggleTheme
