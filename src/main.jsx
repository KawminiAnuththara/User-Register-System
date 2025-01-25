import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Users from './Users.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
     <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/users' element={<Users/>}/>
     </Routes>
  </BrowserRouter>
)
