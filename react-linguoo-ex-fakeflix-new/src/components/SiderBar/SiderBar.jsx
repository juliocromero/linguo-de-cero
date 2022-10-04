import "./siderbar.scss";
import React, { useEffect } from "react";
import { LOGO_URL, MOBILE_LOGO_URL} from "../../requests";
import useViewport from "../../hooks/useViewport";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'
import { NavLink , useLocation } from "react-router-dom";
import { Switch } from 'react-switch-input';
import IconHome from "../../assests/icon/iconHome";
import IconPlayslist from "../../assests/icon/iconPlayslist";
import Favorite from "../../assests/icon/iconFavorite";
import IconMeet from "../../assests/icon/iconMeet";
import IconDowloand from "../../assests/icon/iconDowloand"
const routes = [
    {
        path: '/browse',
        name : 'Descubre',
        Icon: IconHome 
    },
    {
        path: '/mylist',
        name : 'Mis Favoritos',
        Icon : Favorite
    },
    {
        path: '/Category',
        name : 'Crear Playlist',
        Icon : IconPlayslist
    },
    {
        path: '/Category',
        href : 'http://linguoo.com/community/',
        name : 'Conocenos',
        Icon : IconMeet
    },
]
const Siderbar = ({open}) =>{
    const { width } = useViewport();
    let location = useLocation()
    useEffect(()=>{
        
    }, [location])
    return <div className={ open ? 'siderbar__main-container siderbar-mobile siderbar-close-after' : 'siderbar__main-container siderbar-close siderbar-mobile'} >
        <motion.div animate ={{width : '250px'}} className="siderbar">
            <div className="siderbar__space">
                   
                    
                   
        <Link to="/browse">
					<img className="siderbar__logo" src={width >= 800 ? LOGO_URL : MOBILE_LOGO_URL} alt="" />
				</Link>
            <section className="siderbar__routes">
                {routes.map(({path , Icon , name , href})=>(
                    href ? <a href={href} target="_blank" rel="noreferrer" className={location.pathname == path ? "siderbar__link-after siderbar__link" : "siderbar__link"}>
                         <div className={location.pathname == path ? "siderbar__icon-radius-after siderbar__icon-radius " : "siderbar__icon-radius"}>
                        <div className={location.pathname == path ? "siderbar__icon-after siderbar__icon" : "siderbar__icon"}><Icon/></div>
                        </div>
                        
                     <div className="siderbar__link_text">{name}</div>
                    </a> :
                    <NavLink to={path} href={href} key={name} className={location.pathname == path ? "siderbar__link-after siderbar__link" : "siderbar__link"}>
                        <div className={location.pathname == path ? "siderbar__icon-radius-after siderbar__icon-radius " : "siderbar__icon-radius"}>
                        <div className={location.pathname == path ? "siderbar__icon-after siderbar__icon" : "siderbar__icon"}><Icon/></div>
                        </div>
                        
                     <div className="siderbar__link_text">{name}</div>
                    </NavLink>
                ))}
                 
            </section>
            <section className="siderbar__routes">
                    <hr className="siderbar__hr" />
                    <NavLink to={'/'} className="siderbar__link">
                        <div className="siderbar__icon-radius ">
                            <div className="siderbar__icon"><IconDowloand/></div>
                        </div>
                        
                     <div className="siderbar__link_text">Descargar app</div>
                    </NavLink>
                    <hr className="siderbar__hr"/>
                    
            </section>
            <section>
            <div className="siderbar__mode ">
              <Switch className="siderbar__Switch" />
              {width >= 800 ? <p className="pl-2">Night Mode</p>: null}
              </div>
            </section>
            </div>
        </motion.div>
    </div>
  ;
};
export default Siderbar;
