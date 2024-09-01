
import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Login from '../components/login/Login';
import Home from '../components/home/Home';
import { useNavigate } from 'react-router-dom'

export default function RouterApp() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Verifica si el usuario está logueado
    const user = localStorage.getItem('user');
    
    if (user) {
      // Si hay un usuario logueado, redirige a /home
      navigate('/home');
    } else {
      // Si no hay usuario, redirige a la página de login
      navigate('/');
    }
  }, [navigate]);

  return (
    // Define las rutas, como ruta por defecto /home
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}
