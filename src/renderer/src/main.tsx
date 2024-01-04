import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/index.css'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'

createRoot(document.getElementById('chatApp') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
