import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_OAUTHCLIENTID}`}>
      <App />
    </GoogleOAuthProvider>
  </BrowserRouter>
)
