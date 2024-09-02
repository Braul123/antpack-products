
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, UseSelector } from 'react-redux';
import { selectorUserState } from '../../interface/stateApp/selectors/selectorsAll';
import ArrowBack from '../../assets/icons/arrowBack';
import { useNavigate } from 'react-router-dom';
import { fetchLogout } from '../../services/login';
import { setAllProducts } from '../../interface/stateApp/slices/productsSlice';

export default function Header() {
    const dispatch = useDispatch();
    const user = useSelector(selectorUserState);
    const [userName, setUserName] = useState<string>('');
    const navigate = useNavigate();

    // Obtiene el usuario en el estado
    useEffect(() => {
        if (user) {
            setUserName(user.userName);
        }
    }, [user]);

    // Cierra sesión
    const onLogout = async () => {
        await fetchLogout();
        dispatch(setAllProducts([]));
        navigate("/");
    }

    return (
        <header className="bg-white text-black p-4 flex justify-between items-center shadow-md">
            <h1 className="text-lg font-bold">Hola, {userName}</h1>
            <button
                onClick={onLogout}
                className="flex flex-row gap-x-1 items-center justify-center rounded-md bg-stone-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                Abandonar
                <ArrowBack />
            </button>
        </header>
    );
}
