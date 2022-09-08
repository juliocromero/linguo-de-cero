import "./myList.scss"
import Poster from "../../components/Poster/Poster";
// import Credits from "../../components/Credits/Credits";
import { motion } from "framer-motion";
import { staggerHalf, defaultPageFadeInVariants } from "../../motionUtils";
import { useSelector } from "react-redux"
import { selectFavouritesList } from "../../redux/favourites/favourites.selectors"
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setDefaultAudioListValuesSuccess } from '../../redux/audioplaying/audioplaying.actions'
// import { clearSearchInputValue } from "../../redux/search/search.actions";

const MyList = () => {    
    const dispatch = useDispatch();    
    const favs = useSelector(selectFavouritesList);

    //Cleaning search
    // dispatch(clearSearchInputValue());        

    useEffect(()=> {
        //Load playlist into audioplayer as default list
        if(favs && favs.length > 0){
            const {audio, category, _id, duration } = favs[0];
            dispatch(setDefaultAudioListValuesSuccess(audio, category, _id, duration, 0, favs));
        }
    },[favs]);

    return (
        <motion.div
            className="MyList"
            variants={defaultPageFadeInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {favs && favs.length > 0 && (
                <h2 className="MyList__title">My List</h2>
            )}
            <motion.div
                className="MyList__wrp"
                variants={staggerHalf}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                {favs && favs.length > 0
                    ? favs.map(result => (
                        <Poster
                            key={result._id}
                            item={result}
                            {...result}
                        />
                    ))
                    : (
                        <h2 className="MyList__title">
                            Sorry, you don&apos;t have a favourite movie or tv-show yet.
                        </h2>
                    )
                }
            </motion.div>
            {/* <Credits /> */}
        </motion.div>
    )
}

export default MyList