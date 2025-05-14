/* eslint-disable @next/next/no-img-element */
import React from 'react'

const Banner = () => {
  return (
    <div className="relative w-full h-[400px]" >
      {/* Background Image */}
      <img
        src="https://images.fathomevents.com/image/upload/w_2000,dpr_2,f_auto,q_auto/v1727129056/Events/2024/1965/JW10_EventsBg_1920x1080.jpg.jpg"
        alt="Banner"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Welcome to Our Store
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
          Explore a universe of books — curated for curious minds and passionate readers.
          </p>
         
        </div>
      </div>
    </div>
  )
}

export default Banner