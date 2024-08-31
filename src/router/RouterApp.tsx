
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from '../components/login/Login';
import Home from '../components/home/Home';

export default function RouterApp() {

  return (
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
  )
}
