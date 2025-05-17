import {Navigate,Routes,Route} from "react-router-dom"
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

function App() {
  

  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Navigate to ="/login"/>}></Route>
          <Route path='/login' element={<Login/>}/>
           <Route path='/signup' element={<Signup/>}/>
            <Route path='/home' element={<Home/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
