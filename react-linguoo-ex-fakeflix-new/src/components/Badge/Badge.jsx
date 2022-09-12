import React from 'react'
import './Badge.scss'

export default function Badge({icon}) {
  return (
    <span className='badge'>
        <div className='badge__icon'>{icon}</div>
    </span>
  )
}
