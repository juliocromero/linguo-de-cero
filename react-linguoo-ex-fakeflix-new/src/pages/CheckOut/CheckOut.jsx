import React from 'react'
import { useEffect } from 'react';
import {  } from "react-router-dom";
import './checkOut.scss'

export default function CheckOut({to}) {
    const setT = to()
    function handleCheck (){
        setT(true)
        window.localStorage.setItem('check', true)
        console.log('asdasdasdasdasd')
        
    }
    useEffect(()=> {
        let check = window.localStorage.getItem('check')
        if(check === true) handleCheck()
    },[])
  return (
    <div className='checkout-container'>
        <div className=''>
            <div>asdasdasd</div>
            <button onClick={handleCheck} to="/browse">asd</button>
            
            <img src="" />
        </div>
        <div>
        <div className='flex flex-column align-center justify-center'>
        <div >
            <div>
                <p>
                Discover new tools and learn everywhere with our playlists narrated with love by 100% people. Not robots.

                </p>
            </div>
            <div>
                <p>Help us to create a better world. We donate all audiobooks to ONGs related to dyslexia and blindness</p>
            </div>
            <div>
                <p>While you Drink a Coffee or on Your Way To Work, with audiobooks about Tech, Business and More</p>
            </div>
        </div>
        <div><h2>Choose the best plan for you</h2></div>

        <div><p>What´s included in the Premium Plan
            With Premium, you get the best of Linguoo—unlimited access to 8,500+ bestselling nonfiction titles, download titles for offline access, and  no ads.
            </p></div>
                    <div>Best value - save 33%
            Premium Yearly 
            
            USD 40 annual subscription
            USD 3.33/month
            
            Start your free 7-day trial
            (Cancel your trial any time before it ends, and you won´t be charged)
            </div>
        
    </div>
    </div>
    </div>
  )
}
