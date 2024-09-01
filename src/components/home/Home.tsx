
import React, { useState } from 'react'
import Header from '../../layouts/header/Header'
import NotFound from '../../layouts/notFound/notFound';
import AddIcon from '../../assets/icons/addIcon';

export default function Home() {
    const [products, setProducts] = useState([]);


  return (
    <main>
        <Header/>

        <section className='p-8 md:p-16'>

            <div className='flex flex-col gap-5 items-start md:flex-row md:justify-between'>
                <span className="text-2xl font-bold">Tu lista de productos</span>
                <button
                className="flex flex-row gap-x-1 items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-indigo-600">
                Crea un producto
                <AddIcon/>
            </button>
            </div>
            
            {       
                products.length == 0 && <div className='mt-10'><NotFound/></div>
            }
        </section>
    </main>
  )
}
