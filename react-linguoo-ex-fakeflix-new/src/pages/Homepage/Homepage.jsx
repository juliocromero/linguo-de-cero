import "./homepage.scss"
import Row from "../../components/Row/Row"
import { useRetrieveData } from "../../hooks/useRetrieveData";
import { motion } from "framer-motion";
import { defaultPageFadeInVariants } from "../../motionUtils";
// import { useDispatch } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
// import { useState } from 'react'
import { selectContinueListeningData } from '../../redux/listcontinuelistening/listcontinuelistening.selectors'

import { selectTopRatedMovies } from '../../redux/movies/movies.selectors'

import {fetchFavouritesAsync} from '../../redux/favourites/favourites.actions';
// import { useGetCompleteList } from "../../hooks/useGetCompleteList";
// import { useEffect } from "react";
// import { useEffect, useState } from "react";
// import { useState } from "react";
// import { clearSearchInputValue } from "../../redux/search/search.actions";

const Homepage = () => {

    const dispatch = useDispatch();
    dispatch(fetchFavouritesAsync());

    //Cleaning search
    // dispatch(clearSearchInputValue());        

    const primaryrows = useRetrieveData('movies');
    // const rows = useRetrieveData('movies');

    // taking out playlist from this list to avoid repeating
    const rows = primaryrows && primaryrows.length > 0 && primaryrows.filter(r => r.genre !== 'toprated');
    
    /* let ultimos = []
    ultimos = rows.filter(list => list.genre === "latestrecent") */
    
    const preventUndefinedSelector = () => undefined;

    const playListSelector = selectTopRatedMovies ? selectTopRatedMovies : preventUndefinedSelector;
    const rowPlaylists = useSelector(playListSelector);

    const continueListeningSelector = selectContinueListeningData ? selectContinueListeningData : preventUndefinedSelector;
    const rowDataContinueListening = useSelector(continueListeningSelector);
    
    return (
        <motion.div
            className="Homepage"
            variants={defaultPageFadeInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >        
            { rowPlaylists.data && rowPlaylists.data.length > 0 ? 
            <Row 
                key={0}  
                selector={playListSelector} 
                title={'Playlists'} 
                genre={'toprated'} 
                isLarge={false} 
                 /> : null 
            }
            { rowDataContinueListening.data && rowDataContinueListening.data.length > 0 ? 
            <Row 
                key={10}  
                selector={continueListeningSelector} 
                title={'Continue listening'} 
                genre={'continuelistening'} 
                isLarge={false} 
                 /> : null 
            }
            
            {rows && rows.map(props => {
                props.listLastViewed = [1,2,3,4];
                return (
                <Row key={props.id} {...props } />
                )
            })}
        </motion.div>
    )
}

export default Homepage
