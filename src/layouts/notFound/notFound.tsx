
import React from 'react'
import Cart from '../../assets/icons/cart'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-full">
    <div className="flex flex-col items-center justify-center w-64 h-64 bg-gray-100 rounded-full">
      {/* <img src={imageSrc} alt="Empty" className="w-24 h-24 mb-4" /> */}
      <Cart/>
      <p className="text-gray-600 text-center">No hay datos para mostrar</p>
    </div>
  </div>
  )
}
