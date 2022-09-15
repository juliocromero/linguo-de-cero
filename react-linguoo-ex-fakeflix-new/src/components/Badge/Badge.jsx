import React from 'react'
import './Badge.scss'

export default function Badge({children}) {
  return (
    <span className='badge'>
        <div className='badge__icon'><div className='badge__icon--children'>{children}</div></div>
    </span>
  )
}
