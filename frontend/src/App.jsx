import {Navigate,Routes,Route} from "react-router-dom"
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { useState } from "react"
import RefreshHandler from "./RefreshHandler"

function App() {
  const [IsAuthenticated,setIsAuthenticated]=useState(false)
const PrivateRoute =({element})=>{
        return IsAuthenticated?element:<Navigate to="/login"/>
}
  return (
    <>
      <div>
        <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
        <Routes>
          <Route path='/' element={<Navigate to ="/login"/>}></Route>
          <Route path='/login' element={<Login/>}/>
           <Route path='/signup' element={<Signup/>}/>
            <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
