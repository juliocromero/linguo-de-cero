import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar/Navbar"
import Homepage from "./pages/Homepage/Homepage"
import Movies from "./pages/Movies/Movies"
import TVSeries from './pages/TVSeries/TVSeries';
import Popular from "./pages/Popular/Popular";
import MyList from './pages/MyList/MyList';
import Auth from "./pages/Auth/Auth";
import Search from "./pages/Search/Search";
import Category from "./pages/Category/Category";
import DetailModal from "./components/DetailModal/DetailModal";
import SideBar from './components/SiderBar/SiderBar'
// import SplashAnimation from "./components/SplashAnimation/SplashAnimation";
import PlayAnimation from "./components/PlayAnimation/PlayAnimation";
import { selectCurrentUser } from './redux/auth/auth.selectors';
import { selectSearchResults } from "./redux/search/search.selectors";
import { checkUserSession } from "./redux/auth/auth.actions";
import LinguooAnimationPlay from "./components/PlayAnimation/LinguooAnimationPlay";
import PlayListContent from "./pages/PlayListContent/PlayListContent";
// import { AudioPlayer } from './components/AudioPlayer/AudioPlayer';
// import { fetchFavouritesAsync } from './redux/favourites/favourites.actions';
import requests from './requests';
import { setDefaultAudioListValuesAsync } from './redux/audioplaying/audioplaying.actions';
import { fetchNarratorsAsync } from './redux/narrators/narrators.actions';
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
/* import Modal from "./components/Modal/Modal"; */
import CheckOut from "./pages/CheckOut/CheckOut";
// import { getLocalStorageCurrentUser } from './shared/localStorage'

const App = () => {

    const currentUser = useSelector(selectCurrentUser);
    // const currentUser = getLocalStorageCurrentUser();
    const searchResults = useSelector(selectSearchResults);
    const dispatch = useDispatch();
    const location = useLocation();

    const [checkout, setCheckOut] = useState(false)
    // dispatch(fetchFavouritesAsync);
    if (currentUser) {
        const urlDefaultAudioValues = requests.fetchTrendingMovies;
        dispatch(setDefaultAudioListValuesAsync(urlDefaultAudioValues));
        const urlNarrators = requests.fetchNarrators;
        dispatch(fetchNarratorsAsync(urlNarrators));
    }

    useEffect(() => {
        dispatch(checkUserSession());
    }, [dispatch])

    useEffect(()=> {
        let check = window.localStorage.getItem('check')
        if(JSON.parse(check)){
            setCheckOut(true)
        }else {
            window.localStorage.setItem('check',false)
            setCheckOut(false)
        }
        /* let checkObj = JSON.parse(check)
        console.log(checkObj,'checkObj') */
        
        /* if(checkObj){
            setCheckOut(checkObj)
        }else {
            setCheckOut(false)
            
        } */
     })
     
     const [openBurger, setopenBurger] = useState(false)
     return (
         <div className="App">
             
             {/* <Modal>
                 <div>asdasd</div>
             </Modal> */}
             
             {currentUser && checkout  && (<SideBar open={openBurger}/>)}
             <div className={currentUser && checkout  ? "container-root" : checkout ? 'container-root--before' : ''} style={{width:"100%", height:"100vh"}}>
                 {currentUser  && checkout  && (
                     <>
                         <Navbar opensiderbar={setopenBurger} sideBar={openBurger}/>
                         <DetailModal />
                     </>
 
                 )}
                <AnimatePresence exitBeforeEnter>

                    <Switch location={location} key={location.pathname}>
                        
                        <Route
                            exact
                            path="/"
                        >
                            <Redirect to="/login" />
                        </Route>
                        <Route
                            path="/play"
                            component={PlayAnimation}
                        />
                        <Route
                            path="/linguooplay/:audioName"
                            component={LinguooAnimationPlay}
                        />
                        <Route
                            path="/search"
                            render={() => currentUser
                                ? (searchResults && <Search results={searchResults} />)
                                : <Redirect to="/login" />}
                        />
                        <Route
                            exact
                            path="/browse"
                            render={() => currentUser
                                ? <Homepage />
                                : <Redirect to="/login" />}
                        />
                        <Route
                            exact
                            path="/browse/:categoryName"
                            render={(props) => currentUser
                                ? <Category {...props} />
                                : <Redirect to="/login" />}
                        />
                        <Route
                            exact
                            path="/playlistcontent"
                            render={() => currentUser
                                ? <PlayListContent />
                                : <Redirect to="/login" />}
                        />
                        <Route
                            exact
                            path="/tvseries"
                            render={() => currentUser ? <TVSeries /> : <Redirect to="/login" />}
                        />
                        <Route
                            exact
                            path="/tvseries/:categoryName"
                            render={(props) => currentUser
                                ? <Category {...props} />
                                : <Redirect to="/login" />}
                        />
                        <Route
                            exact
                            path="/movies"
                            render={() => currentUser ? <Movies /> : <Redirect to="/login" />}
                        />
                        <Route
                            exact
                            path="/movies/:categoryName"
                            render={(props) => currentUser
                                ? <Category {...props} />
                                : <Redirect to="/login" />}
                        />
                        <Route
                            exact
                            path="/popular"
                            render={() => currentUser ? <Popular /> : <Redirect to="/login" />}
                        />
                        <Route
                            exact
                            path="/popular/:categoryName"
                            render={(props) => currentUser
                                ? <Category {...props} />
                                : <Redirect to="/login" />}
                        />
                        <Route
                            exact
                            path="/mylist"
                            render={() => currentUser ? <MyList /> : <Redirect to="/login" />}
                        />
                         <Route
                            exact
                            path="/checkout"
                            render={() => currentUser  ?  <CheckOut to={setCheckOut} check={checkout} /> : <Redirect to="/login" />}
                        />
                        <Route
                            exact
                            path="/login"
                            render={() => currentUser ?  <Redirect to="/checkout" /> :  <Auth /> }
                        />
                        <Route path="*">
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                    <div style={{ position: 'relative', marginTop: '6em' }}></div>
                </AnimatePresence>
            </div>
            {currentUser && checkout && (
                <>
                    <AudioPlayer />
                </>
            )}

        </div>
    )
}

export default App;
