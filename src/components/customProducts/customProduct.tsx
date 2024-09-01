

import React, { useState } from 'react'
import Cart from '../../assets/icons/cart';
import Header from '../../layouts/header/Header';
import RowBack from '../../assets/icons/rowBack';
import { useNavigate } from 'react-router-dom';
import { fetchSaveNewProduct } from '../../services/products';
import { useDispatch } from 'react-redux';
import { saveNewProduct } from '../../interface/stateApp/slices/productsSlice';

export default function CustomProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Estado para el formulario
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
  });
  const [errors, setErrors] = useState<any>({});

  // Manejar cambios en el formulario
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validar formulario
  const validate = () => {
    let formErrors: any = {};

    // Validar nombre
    if (!formData.name) {
      formErrors.name = 'El nombre es requerido';
    }

    // Validar descripción
    if (!formData.description) {
      formErrors.description = 'La descripción es requerida';
    }
    // Validar precio
    if (!formData.price) {
      formErrors.email = 'El precio es requerido';
    }
    // Validar categoría
    if (!formData.category) {
      formErrors.category = 'La categoría es requerida';
    }


    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Enviar formulario
  const handleSubmit = (e: any) => {
    console.log('Formulario enviado');

    e.preventDefault();
    if (validate()) {
      console.log('Formulario completo y válido:', formData);
      createProduct();
      // Aquí puedes enviar los datos al backend o realizar otra acción
    } else {
      console.log('Hay errores en el formulario');
    }
  };

  // Volver al inicio
  const returnBack = () => {
    navigate("/home");
  }

  // Crea el producto
  const createProduct = () => {
      const sendData = formData;
      // Ejecuta la petición para creación de producto
      fetchSaveNewProduct(sendData).then((result: any) => {
        dispatch(saveNewProduct(result));
        returnBack();
      }, err => {
        console.error(err);
      })
  }

  return (
    <>
      <Header />
      <div className="flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8">

        <div onClick={() => returnBack()}
          className='sm:mx-auto sm:w-full sm:max-w-sm flex flex-initial gap-2 flex-row items-center cursor-pointer'>
          <RowBack />
          <span className='block text-sm font-medium leading-6 text-gray-900 hover:text-gray-600'>Volver</span>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Crear producto
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Nombre del producto
              </label>
              <div className="mt-2">
                <input
                  placeholder='Producto 1'
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="text"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Descripción del producto
              </label>
              <div className="mt-2">
                <textarea
                  placeholder="Este producto es..."
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  autoComplete="text"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                  Precio
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  type="number"
                  placeholder='$ 100'
                  value={formData.price}
                  onChange={handleChange}
                  autoComplete="number"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.price && <p className="text-red-500 text-xs italic">{errors.price}</p>}

              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                  Categoría
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="category"
                  name="category"
                  type="text"
                  placeholder='General'
                  value={formData.category}
                  onChange={handleChange}
                  autoComplete="text"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.category && <p className="text-red-500 text-xs italic">{errors.category}</p>}
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>)
}