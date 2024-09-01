
import React, { useEffect, useState } from 'react'
import Header from '../../layouts/header/Header'
import NotFound from '../../layouts/notFound/notFound';
import AddIcon from '../../assets/icons/addIcon';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectorProductState } from '../../interface/stateApp/selectors/selectorsAll';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { deleteProduct } from '../../interface/stateApp/slices/productsSlice';
import { Product } from '../../interface/models/interface';

export default function Home() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const _products = useSelector(selectorProductState);
    const MySwal = withReactContent(Swal);
    const dispatch = useDispatch();

    // LLeva a la pagina para crear un producto
    const createProduct = () => {
        console.log('Crear producto');
        navigate("/product");
    }

    useEffect(() => {
        console.log('Productos', _products);
        setProducts(_products);
    }, [_products]);


  // Elimina el producto de la colección
  const actionDeleteProduct = (product: Product) => {
    // Muestra alerta para confirmar la eliminación
    MySwal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4f46e5',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '¡Eliminado!',
            'El producto ha sido eliminado.',
            'success'
          );
          dispatch(deleteProduct(product));
        }
      });
  }

    return (
        <main>
            <Header />

            <section className='p-8 md:p-16'>

                <div className='flex flex-col gap-5 items-start md:flex-row md:justify-between'>
                    <span className="text-2xl font-bold">Tu lista de productos</span>
                    <button
                        onClick={() => createProduct()}
                        className="flex flex-row gap-x-1 items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-indigo-600">
                        Crea un producto
                        <AddIcon />
                    </button>
                </div>

                {
                    products.length == 0 && <div className='mt-10'><NotFound /></div>
                }

                <div className='grid grid-cols-1 gap-5 mt-5'>
                    {
                        products.map((product: any) => {
                            return (
                                <div key={`product_${product.id}`} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm space-y-4 sm:space-y-0 sm:space-x-4">
                                <div>
                                  <p className="text-sm text-gray-500">ID: {product.id}</p>
                                  <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                                  <p className="text-xl text-gray-700">${product.price}</p>
                                </div>
                                <div className="flex space-x-2">
                                  <button
                                    // onClick={onEdit}
                                    className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                  >
                                    Editar
                                  </button>
                                  <button
                                    onClick={() => actionDeleteProduct(product)}
                                    className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </div>
                            )
                        })
                    } 

                    
                </div>
            </section>
        </main>
    )
}
