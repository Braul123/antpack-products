// ../components/login/Login.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';
import Login from '../components/login/Login';
import { login } from '../services/login';
import { setUser } from '../interface/stateApp/slices/userSlice';

// Mock del hook useNavigate
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Mock de la función login
jest.mock('../services/login', () => ({
  login: jest.fn(),
}));

// Mock del dispatch
jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

describe('Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Debe mostrar el error si los campos del formulario están vacios', () => {
    render(<Login />);

    fireEvent.click(screen.getByText(/Iniciar sesión/i));

    expect(screen.getByText(/El nombre de usuario es requerido/i)).toBeInTheDocument();
    expect(screen.getByText(/El correo electrónico es requerida/i)).toBeInTheDocument();
    expect(screen.getByText(/La contraseña es requerida/i)).toBeInTheDocument();
  });

  test('Guarda los datos del usuario y se dirige al Home', async () => {
    const mockNavigate = jest.fn();
    const mockDispatch = jest.fn();
    const mockLogin = jest.fn().mockResolvedValue({ user: 'testUser' });

    // Mockear el hook useNavigate para que devuelva el mockNavigate
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    // Mockear la función login
    (login as jest.Mock).mockImplementation(mockLogin);

    // Mockear el hook useDispatch para que devuelva el mockDispatch
    jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(mockDispatch);

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/Antman 123/i), { target: { value: 'Antman 123' } });
    fireEvent.change(screen.getByPlaceholderText(/antman123@gmail.com/i), { target: { value: 'antman123@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), { target: { value: 'password' } });

    fireEvent.click(screen.getByText(/Iniciar sesión/i));
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        userName: 'Antman 123',
        email: 'antman123@gmail.com',
        password: 'password'
      });
    });

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(setUser({ user: 'testUser' }));
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('home');
    });
  });
});
