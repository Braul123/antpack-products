
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
import { fetchGetProducts } from '../../services/products';
import RowDown from '../../assets/icons/rowDown';
import DeleteIcon from '../../assets/icons/deleteIcon';
import EditIcon from '../../assets/icons/editIcon';

export default function Home() {
    const [products, setProducts] = useState<any>([]); // Productos para mostrar en pantalla
    const _products = useSelector(selectorProductState); // Productos en el estado
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal); // Modal de confirmación
    const dispatch = useDispatch();
    const [filter, setFilter] = useState(''); // Filtro de productos
    const [typingTimeout, setTypingTimeout] = useState<any>(null);
    // PAGINADOR
    const [skip, setSkip] = useState(0);
    const limit = 4;

    // LLeva a la pagina para crear un producto
    const createProduct = () => {
        console.log('Crear producto');
        navigate("/product");
    }

    // Obtiene los productos del estado y detecta los cambios, si hay nuevos productos
    useEffect(() => {
        if (skip === 0) getProducts();
        setSkip(0);
        getProducts();
    }, [_products]);

    useEffect(() => {
        getProducts();
    }, [skip]);

    useEffect(() => {
        handleChange();
    }, [filter]);

    // Inicia la data del componente
    const getProducts = () => {
        console.log('AQUI FILTER', filter);
        const _search = filter;
        fetchGetProducts(skip, limit, _search).then((result: any) => {
            const actualProducts = products;
            const concat = actualProducts.concat(result);
            setProducts(concat);
        }, err => {
            console.error('ERROR AGREGANDO PRODCUTO', err);
        })
    }

    // Si se deja de escribir en 500msg ejecuta el get de productos
    const handleChange = () => {
        // Limpiar el timeout previo
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Iniciar un nuevo timeout de 2 segundos
        setTypingTimeout(
            setTimeout(() => {
                console.log('Filtra esa wea');
            }, 500)
        );
    };

    // Elimina el producto de la colección
    const actionDeleteProduct = (product: Product) => {
        // Muestra alerta para confirmar la eliminación
        MySwal.fire({
            title: '¿Eliminar el producto?',
            text: "¡No podrás revertir los cambios!",
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

    // Edita el producto
    const onEdit = (product: Product) => {
        console.log('Editar producto', product);
        navigate(`/product/${product.id}`);
    }

    // Pide mas datos para mostrar en la lista
    const moreData = () => {
        const _skip = skip + limit;
        setSkip(_skip);
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

                {/* Input para buscar productos */}
                <div className='mt-5'>
                    <input
                        className="p-2 w-full h-12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type="text"
                        placeholder="Buscar producto"
                        onChange={(event) => setFilter(event.target.value)}
                        value={filter}
                    />
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
                                            onClick={() => onEdit(product)}
                                            className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                            {/* Editar */}
                                            <EditIcon/>
                                        </button>
                                        <button
                                            onClick={() => actionDeleteProduct(product)}
                                            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                            {/* Eliminar */}
                                            <DeleteIcon/>
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                
                    <div className='flex w-full justify-between mt-8 items-center'>
                        <div className='pl-2'>
                            <span className='italic text-sm text-stone-600'>{products.length} de {_products.length}</span>
                        </div>
                        {
                            products.length < _products.length &&
                            <button
                                onClick={() => moreData()}
                                className="flex flex-row gap-x-1 items-center justify-center rounded-md bg-stone-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                                Mostrar más
                                <RowDown/>
                            </button>
                        }
                    </div>
            </section>
        </main>
    )
}
