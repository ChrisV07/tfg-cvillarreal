import Image from 'next/image'
import React from 'react'

export default function Logo() {
  return (
    <div className='flex justify-center mt-5 '>
        <div className='relative w-48 h-48'>
            <Image 
                fill
                alt='Logotipo The Resto'
                src={'/logo.svg'}
            />
        </div>
    </div>
  )
}
