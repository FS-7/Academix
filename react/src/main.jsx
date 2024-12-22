import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import axios from 'axios';
import App from './App.jsx'

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true

export const outer_div = "py-4 w-1/2 justify-items-center rounded-xl bg-blue-500"
export const inner_form = "w-4/6 px-2 py-2 border border-black rounded-xl flex flex-col"
export const input_text = "p-2 my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
export const submit = "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='h-full w-full bg-white flex-cols justify-center hidden lowestRes:flex'>
      <App />
    </div>
    <div className='h-full w-full flex justify-center items-center bg-red-700 text-white lowestRes:hidden'>CANNOT DISPLAY IN LOW RESOLUTION</div>
  </StrictMode>,
);
