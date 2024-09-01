
import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Login from '../components/login/Login';
import Home from '../components/home/Home';
import { useNavigate } from 'react-router-dom'
import CustomProduct from '../components/customProducts/customProduct';

export default function RouterApp() {
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica si el usuario está logueado
    const user = localStorage.getItem('user');
    
    if (!user) {
      // Si hay un usuario logueado, redirige a /home
      navigate('/');
    }
  }, [navigate]);

  return (
    // Define las rutas, como ruta por defecto /home
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/product" element={<CustomProduct />} />
    </Routes>
  )
}
