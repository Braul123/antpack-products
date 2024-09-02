import React, { useEffect } from 'react';
import './App.css';
import Cart from './assets/icons/cart';
import RouterApp from './router/RouterApp';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './interface/stateApp/slices/userSlice';
import { getProductsStorage } from './services/utils';
import { setAllProducts } from './interface/stateApp/slices/productsSlice';

function App() {
  const dispatch = useDispatch();
  const user = localStorage.getItem('user');
  
  useEffect(() => {
    if (user) { 
      dispatch(setUser(JSON.parse(atob(user))));
    }
  }, []);

  useEffect(() => {
    const _products = getProductsStorage();
    if (_products) {
      dispatch(setAllProducts(_products));
    }
  }, []);
  
  return (
    <BrowserRouter>
      <RouterApp />
    </BrowserRouter>
  );
}

export default App;
