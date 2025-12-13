import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './componentes/Login'
import Home from './componentes/Home'
import { TemaProvider } from './componentes/Tema/TemaContext'
import './App.css'
import ActivacionUsuario from './componentes/ActivacionUsuario'

function App() {
  const [isAutenticacion, setIsAutenticacion] = useState(false)
  const [usuario, setUsuario] = useState('')
 
  useEffect(() => {
    const savedAuth = localStorage.getItem('isAutenticacion')
    const savedUser = localStorage.getItem('usuario')
    
    if (savedAuth === 'true' && savedUser) {
      setIsAutenticacion(true)
      setUsuario(savedUser)
    }
  }, [])

  const hLogin = (success, userEmail = 'admin@sgs.com') => {
    if (success) {
      setIsAutenticacion(true)
      setUsuario(userEmail)
      localStorage.setItem('isAutenticacion', 'true')
      localStorage.setItem('usuario', userEmail)
    }
  }

  const hLogout = () => {
    setIsAutenticacion(false)
    setUsuario('')
    localStorage.removeItem('isAutenticacion')
    localStorage.removeItem('usuario')
  }

  return (
    <TemaProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route 
                path="/" 
                element={
                  isAutenticacion ? 
                  <Navigate to="/home" replace /> : 
                  <Login onLogin={hLogin} />
                } 
              />
              <Route 
                path="/home" 
                element={
                  isAutenticacion ? 
                  <Home usuario={usuario} onLogout={hLogout} /> : 
                  <Navigate to="/" replace />
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} /> 
              <Route path="/activacion-usuario" element={<ActivacionUsuario />} />

            </Routes>
          </div>
        </Router>
    </TemaProvider>
  )
}

export default App