
import React from 'react'
import Cart from '../../assets/icons/cart'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-full">
    <div className="flex flex-col items-center justify-center w-80 h-80  rounded-full">
      {/* <img src={imageSrc} alt="Empty" className="w-24 h-24 mb-4" /> */}
      <Cart/>
      <p className="text-gray-600 text-center">Crea un producto para verlo aquí</p>
    </div>
  </div>
  )
}
