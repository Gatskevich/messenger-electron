
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'

createRoot(document.getElementById('chatApp') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
