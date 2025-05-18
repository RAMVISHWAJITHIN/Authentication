// App.js
import { Navigate, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { useState } from "react";
import RefreshHandler from "./RefreshHandler";

function App() {
  const [IsAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  const PrivateRoute = ({ children }) => {
    return IsAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <div>
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/home'
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
