import "./siderbar.scss";
import React , {useEffect }from 'react'
import { motion } from 'framer-motion'
import { NavLink , useLocation } from "react-router-dom";
import {FaHome , FaHeadphonesAlt  , FaRegLaugh , FaDownload , FaRegPlayCircle} from 'react-icons/fa'
const routes = [
    {
        path: '/browse',
        name : 'Descubre',
        icon: <FaHome /> 
    },
    {
        path: '/mylist',
        name : 'Mi Biblioteca',
        icon : <FaHeadphonesAlt />
    },
    {
        path: '/Category',
        name : 'Crear Playlist',
        icon : <FaRegPlayCircle />
    },
    {
        path: '/Category',
        name : 'Conocenos!',
        icon : <FaRegLaugh/>
    },
    {
        path: '/Category',
        name : 'Descargar app',
        spacen : '100%',
        icon : <FaDownload />
    }
]
const Siderbar = () =>{
    let location = useLocation()
   
    useEffect(()=>{
        
    }, [location])
    return <div className='siderbar__main-container'>
        <motion.div animate ={{width : '250px'}} className="siderbar">
            <section className="siderbar__routes">
                {routes.map((route)=>(
                    <NavLink to={route.path} key={route.name} className={location.pathname == route.path ? "siderbar__link-after siderbar__link" : "siderbar__link"}>
                        <div className={location.pathname == route.path ? "siderbar__icon-radius-after siderbar__icon-radius" : "siderbar__icon-radius"}>
                        <div className={location.pathname == route.path ? "siderbar__icon-after siderbar__icon" : "siderbar__icon"}>{route.icon}</div>
                        </div>
                        
                     <div className="siderbar__link_text">{route.name}</div>
                    </NavLink>
                ))}
            </section>
            <section className="siderbar__routes">
                    <hr className="siderbar__hr" />
                    <NavLink to={'/'} className="siderbar__link">
                        <div className="siderbar__icon-radius">
                        <div className="siderbar__icon"><FaDownload /></div>
                        </div>
                        
                     <div className="siderbar__link_text">prueba</div>
                    </NavLink>
                    <hr className="siderbar__hr"/>
            </section>

        </motion.div>
    </div>
}
export default Siderbar