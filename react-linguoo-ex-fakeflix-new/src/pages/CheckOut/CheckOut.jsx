import React from 'react'
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './checkOut.scss'
import bg from '../../assests/bg-checkout.jpeg'
import IconLinguo from '../../assests/icon/IconLinguo';
import IconHead from '../../assests/icon/IconHead';
import IconBook from '../../assests/icon/IconBook';
import IconMusic from '../../assests/icon/IconMusic';

export default function CheckOut({to}) {
    
    const history = useHistory()
   
    function handleCheck (){
        to(true)
        window.localStorage.setItem('check', true)
        history.push('/browse')
        
    }
    useEffect(()=> {
        let check = window.localStorage.getItem('check')
        console.log('check',check , 'result', check  )
        
        if(JSON.parse(check)){            
            history.push('/browse')
        }

    },[])
  return (
    <div className='checkout-container'>
        <div >
            <div className='checkout-container__content' >
                
                <img className='checkout-container__img' src={bg} />
                <div className='container'>
                    <div className='checkout-container__title '>
                        <IconLinguo />
                        <h1>Get <span>unlimited</span> access to more than 8,500 nonfiction bestsellers</h1>
                        <p>Listen to the best ideas of the world in 15 minutes or less</p>
                    </div>
                </div>
            </div>
            <div className='container'>
            <div className='flex flex-column align-center justify-center'>
            <div className='row pt-4'>
                <div className='owner'>
                    <IconHead />
                    <p className="pt-2">
                        Discover new tools and learn everywhere with our playlists narrated with love by 100% people. Not robots.
                    </p>
                </div>
                <div className='owner'>
                    <IconBook />
                    <p className="pt-2">Help us to create a better world. We donate all audiobooks to ONGs related to dyslexia and blindness</p>
                </div>
                <div className='owner'>
                    <IconMusic />
                    <p className="pt-2">While you Drink a Coffee or on Your Way To Work, with audiobooks about Tech, Business and More</p>
                </div>
            </div>
            <div>
                <h2 className='title-plan pt-3'>Choose the best plan for you</h2>
            </div>

                <div className='flex justify-center pb-3'>
                    <p className='sub-title-plan pt-3'>What´s included in the Premium Plan
                    With Premium, you get the best of Linguoo—unlimited access to 8,500+ bestselling nonfiction titles, download titles for offline access, and  no ads.
                    </p>
                </div>
                <div className='best-value'>
                    
                    <p className='best-value__orange pt-3 pl-3 pr-3'>
                    Best value - save 33%
                    </p>
                    <p className='p-3'>
                    Premium Yearly 
                    
                    USD 40 annual subscription
                    USD 3.33/month
                    
                    Start your free 7-day trial
                    (Cancel your trial any time before it ends, and you won´t be charged)
                    </p>
                </div>
                <p className='pt-2'>Or</p>
                
                <button className='button-premiun' onClick={()=> handleCheck()} to="/browse">Premium Monthly
</button>
            </div>

            </div>
        </div>
    </div>
  )
}
