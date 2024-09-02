import { configureStore } from '@reduxjs/toolkit';
import productsSlice from '../slices/productsSlice';
import userSlice from '../slices/userSlice';

export const store = configureStore({
    reducer: {
        userSlice,
        productsSlice
    },
}); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;