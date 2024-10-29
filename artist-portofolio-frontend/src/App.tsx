import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import './App.css'

function App() {

  return (
    <div className='app-container'>
      <NavBar />
      <div id="detail">
        <Outlet />
      </div>
    </div>
  )
}

export default App
