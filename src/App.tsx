import React from 'react';
import './App.css';
import Cart from './assets/icons/cart';
import RouterApp from './router/RouterApp';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <RouterApp />
    </BrowserRouter>
  );
}

export default App;
