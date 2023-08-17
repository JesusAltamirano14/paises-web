import { Routes,Route,BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Favorite from './pages/Favorite'
import SideBar from './sidebar'
function App() {

  return (
    <BrowserRouter>
    <div className='flex justify-start w-screen h-screen'>
      <div className='w-3/12 h-screen lg:w-2/12'>
        <SideBar/>
      </div>
      <div className='w-9/12 h-screen lg:w-10/12'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/favorite' element={<Favorite/>}/>
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  )
}

export default App
