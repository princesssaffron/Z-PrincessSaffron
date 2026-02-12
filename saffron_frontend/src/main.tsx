import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.tsx'
import './index.css'

// Use your actual Google Client ID
const GOOGLE_CLIENT_ID = "654688449170-atvo35tkqf0e81r2ik4i9kr9o90o4c8t.apps.googleusercontent.com";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <App />
        </GoogleOAuthProvider>
    </StrictMode>,
)
