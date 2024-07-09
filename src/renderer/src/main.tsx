
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'
import StoreProvider from './store/StoreProvider';

createRoot(document.getElementById('chatApp') as HTMLElement).render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>
)
