import React from 'react'
import "./modal.scss"

export default function Modal({children}) {
  return (
    <div className='modal'>
        {children}
    </div>
  )
}
