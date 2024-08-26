import './App.scss'
import DataProvider from './app/Provider'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Things from './pages/Things'
import New from './pages/New'
import EditProfile from './pages/Edit'
import ThemeProvider from './contexts/ThemeContext'
function App() {
  return (
    <DataProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Things />}></Route>
            <Route path='/new' element={<New />}></Route>
            <Route path='/edit-profile' element={<EditProfile />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </DataProvider>
  )
}

export default App
