import './App.css'
import { useEffect, Component, ErrorInfo } from 'react'
import Home from './Pages/Home/Home.tsx'
import Login from './Pages/Authenticate/Login/Login.tsx'
import Signup from './Pages/Authenticate/SignUp/SignUp.tsx'
import ChatRoom from './Pages/ChatRoom/ChatRoom.tsx'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Footer from './Components/Footer.tsx'
import Header from './Components/Header.tsx'
import { Toaster } from './Components/ui/toaster.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AuthStore from './ZustandStore/AuthStore.tsx'

function App () {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const noHeaderFooterPaths = ['/login', '/signup', '/chatroom']
  const user = AuthStore(state => state.user)
  return (
    <GoogleOAuthProvider clientId={import.meta.env.REACT_APP_GOOGLE_CLIENT_ID}>
      {!noHeaderFooterPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Navigate to='/' />} />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
        <Route
          path='/signup'
          element={user ? <Navigate to='/' /> : <Signup />}
        />
        <Route
          path='/chatroom'
          element={user ? <ChatRoom /> : <Navigate to='/login' />}
        />
      </Routes>
      {!noHeaderFooterPaths.includes(location.pathname) && <Footer />}
      <Toaster />
    </GoogleOAuthProvider>
  )
}

export default App
