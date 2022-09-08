import "./playlistcontent.scss"
import Poster from "../../components/Poster/Poster";
import SkeletonPage from "../../components/SkeletonPage/SkeletonPage";
import SkeletonPoster from "../../components/SkeletonPoster/SkeletonPoster";
import { motion } from "framer-motion";
import { staggerHalf } from "../../motionUtils";
import { useSelector } from "react-redux";
import { selectPlaylistsList, selectPlaylistsTitle } from '../../redux/playlists/playlists.selectors'
import { setDefaultAudioListValuesSuccess } from '../../redux/audioplaying/audioplaying.actions'
// import { useState, useEffect } from 'react';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";

const PlayListContent = () => {
    // const [isLoadedPlaylist, setIsLoadedPlaylist] = useState(false);
    const dispatch = useDispatch();    
    const playlistcontentData = useSelector(selectPlaylistsList);
    const title = useSelector(selectPlaylistsTitle);
    const selectedGenre = {
        loading: false,
        error: '',
        data: playlistcontentData
    }

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    useEffect(()=> {
        //Load playlist into audioplayer as default list
        if(playlistcontentData && playlistcontentData.length > 0){
            const {audio, category, _id, duration } = playlistcontentData[0];
            dispatch(setDefaultAudioListValuesSuccess(audio, category, _id, duration, 0, playlistcontentData));
        }
    },[playlistcontentData]);

    return (
        <div className="PlayListContent">
            {playlistcontentData ? (
                <>
                    <h2 className="PlayListContent__title">{title}</h2>

                    <motion.div
                        className="PlayListContent__wrp"
                        variants={staggerHalf}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        style={{ marginBottom:'5em' }}
                    >
                        {selectedGenre.data && selectedGenre.data.length > 0
                            && selectedGenre.data.map(result => (
                                <Poster
                                    key={result._id}
                                    item={result}
                                    isFavourite={result.isFavourite}
                                    playlistcontentData = {playlistcontentData}                                    
                                    {...result}
                                />
                            ))
                        }
                        {selectedGenre.loading && <div className='PlayListContent__subtitle'><SkeletonPoster /></div>}
                        {selectedGenre.error && <div className='PlayListContent__subtitle'>Oops, an error occurred.</div>}
                    </motion.div>
                </>
            ) : <SkeletonPage />}
        </div>
    )
}

export default PlayListContent
