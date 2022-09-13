import "./siderbar.scss";
import React , {useEffect }from 'react'
import { LOGO_URL, MOBILE_LOGO_URL } from "../../requests";
import useViewport from "../../hooks/useViewport";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'
import { NavLink , useLocation } from "react-router-dom";
import { Switch } from 'react-switch-input';
import {BsHouse} from 'react-icons/bs'
import {  FaRegLaugh , FaDownload , FaRegPlayCircle , FaHeart} from 'react-icons/fa'
const routes = [
    {
        path: '/browse',
        name : 'Descubre',
        icon: <BsHouse /> 
    },
    {
        path: '/mylist',
        name : 'Favoritos',
        icon : <FaHeart />
    },
    {
        path: '/Category',
        name : 'Crear Playlist',
        icon : <FaRegPlayCircle />
    },
    {
        path: '/Category',
        name : 'Conocenos',
        icon : <FaRegLaugh/>
    },
]
const Siderbar = () =>{
    const { width } = useViewport();
    let location = useLocation()
   
    useEffect(()=>{
        
    }, [location])
    return <div className='siderbar__main-container'>
              
        <motion.div animate ={{width : '250px'}} className="siderbar">
            <div className="siderbar__space">
                   
                    
                   
        <Link to="/browse">
					<img className="siderbar__logo" src={width >= 800 ? LOGO_URL : MOBILE_LOGO_URL} alt="" />
				</Link>
            <section className="siderbar__routes">
                {routes.map((route)=>(
                    <NavLink to={route.path} key={route.name} className={location.pathname == route.path ? "siderbar__link-after siderbar__link" : "siderbar__link"}>
                        <div className={location.pathname == route.path ? "siderbar__icon-radius-after siderbar__icon-radius " : "siderbar__icon-radius"}>
                        <div className={location.pathname == route.path ? "siderbar__icon-after siderbar__icon" : "siderbar__icon"}>{route.icon}</div>
                        </div>
                        
                     <div className="siderbar__link_text">{route.name}</div>
                    </NavLink>
                ))}
                 
            </section>
            <section className="siderbar__routes">
                    <hr className="siderbar__hr" />
                    <NavLink to={'/'} className="siderbar__link">
                        <div className="siderbar__icon-radius ">
                            <div className="siderbar__icon"><FaDownload color="#ffffff" /></div>
                        </div>
                        
                     <div className="siderbar__link_text">Descargar app</div>
                    </NavLink>
                    <hr className="siderbar__hr"/>
                    
            </section>
            <section>
            <Switch
                    className="siderbar__Switch"
                    /> Night Mode
            </section>
            </div>
        </motion.div>
    </div>
}
export default Siderbar