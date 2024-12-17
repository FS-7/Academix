import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import axios from 'axios';
import App from './App.tsx'

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true
var TOKEN = '';

export function setToken(token: string){
  TOKEN = token
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='relative h-full w-full justify-items-center items-start bg-white lowestRes:flex hidden'>
      
      <App />
    </div>
    <div className='w-auto h-full justify-items-center items-center bg-red-700 text-white lowestRes:hidden'>CANNOT DISPLAY IN LOW RESOLUTION</div>
  </StrictMode>,
);
