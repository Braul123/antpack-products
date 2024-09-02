import React, { useState } from 'react'
import Cart from '../../assets/icons/cart'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/login'
import { useDispatch } from 'react-redux';
import { setUser } from '../../interface/stateApp/slices/userSlice';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Formulario de inicio de sesión
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    // Inicia sesión
    const onLogin = (event: any) => {
        const validForm = isValidForm();
        // Si el formulario es válido, inicia sesión
        if (validForm) {
            const data = {
                email,
                password,
                userName
            }
            login(data).then((result: any) => {
                dispatch(setUser(data));
                navigate("home");
            }, error => {
                console.error(error);
            });
        }
        event.preventDefault();
    }

    // Valida si los campos del formulario son válidos
    const isValidForm = () => {
        return email && password && userName;
    }
    
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <div className='flex justify-center'>
                        <Cart />
                    </div>

                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Antpack Products
                    </h2>

                    <div className='text-center mt-2'>
                        <span className='text-sm text-center gray'>Inicia sesión para administrar tus prductos</span>
                    </div>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Nombre de usuario
                            </label>
                            <div className="mt-2">
                                <input
                                    placeholder='Hormiga 23'
                                    id="userName"
                                    name="userName"
                                    type="text"
                                    onChange={(event) => setUserName(event.target.value)}
                                    required
                                    autoComplete="text"
                                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Correo electrónico
                            </label>
                            <div className="mt-2">
                                <input
                                    placeholder='antpack@gmail.com'
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                    autoComplete="email"
                                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Contraseña
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder='********'
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                    autoComplete="current-password"
                                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={(event) => onLogin(event)}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Iniciar sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
