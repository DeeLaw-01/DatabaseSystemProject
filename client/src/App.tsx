import './App.css'
import { useEffect } from 'react'
import Home from './Pages/Home/Home.tsx'
import Login from './Pages/Authenticate/Login/Login.tsx'
import Signup from './Pages/Authenticate/SignUp/SignUp.tsx'
import ChatRoom from './Pages/ChatRoom/ChatRoom.tsx'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
function App () {
  const location = useLocation() // Scroll to the top of the page when the route changes

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Navigate to='/' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/chatroom' element={<ChatRoom />} />
      </Routes>
    </>
  )
}

export default App
