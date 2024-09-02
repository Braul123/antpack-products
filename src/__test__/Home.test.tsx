
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../components/home/Home';
import { fetchGetProducts } from '../services/products';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Mock the imports
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../services/products', () => ({
  fetchGetProducts: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Create a type that mimics dispatch
type MockDispatch = jest.Mocked<typeof useDispatch>;

describe('Home Component', () => {
  const dispatchMock = jest.fn() as unknown as MockDispatch;
  const navigateMock = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock as MockDispatch);
    (useSelector as unknown as jest.Mock<unknown>).mockReturnValue([]);
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    jest.clearAllMocks();
  });

  it('Crea un producto y obtiene el listado', async () => {
    const productsMock = [{ id: 1, name: 'Nuevo producto' }];
    (fetchGetProducts as jest.Mock).mockResolvedValue(productsMock);

    render(<Home />);

    // Espera el render y hace la peticion de los productos fetchGetProducts(*skipt, *limit, *search)
    await waitFor(() => {
      expect(fetchGetProducts).toHaveBeenCalledWith(0, 4, "");
      expect(screen.queryByText('Nuevo producto')).toBeInTheDocument();
    });
  });

  it('Ejecuta el campo de búsqueda y obtiene los productos', async () => {
    const productsMock = [{ id: 2, name: 'Buscar este producto' }];
    (fetchGetProducts as jest.Mock).mockResolvedValue(productsMock);

    render(<Home />);
    
    const input = screen.getByPlaceholderText('Buscar producto');
    fireEvent.change(input, { target: { value: 'Buscar este' } });

    // Obtiene los productos enviando el valor del input
    await waitFor(() => {
      expect(fetchGetProducts).toHaveBeenCalledWith(0, 4, 'Buscar este');
      expect(screen.queryByText('Buscar este producto')).toBeInTheDocument();
    });
  });
});
