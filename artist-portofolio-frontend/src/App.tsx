import { Outlet } from 'react-router-dom'
import AuthProvider from './context/AuthProvider.js'
import './App.css'

function App() {

  return (
    <div className='app-container'>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </div>
  )
}

export default App
