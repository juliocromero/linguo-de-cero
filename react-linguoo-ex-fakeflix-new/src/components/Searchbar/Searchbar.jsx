import "./searchbar.scss"
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeSearchInputValue, clearSearchInputValue, fetchSearchResultsAsync } from "../../redux/search/search.actions";
//import { FiSearch } from "react-icons/fi";
//import { RiCloseFill } from "react-icons/ri";
import useOutsideClick from "../../hooks/useOutsideClick";

const Searchbar = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [searchInputToggle, setSearchInputToggle] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const searchbarRef = useRef();
    const searchInputRef = useRef();
    const [valueToSearch, setValueToSearch] = useState("");

    useOutsideClick(searchbarRef, () => {
        if (searchInputToggle) {
            // setSearchInput("");
            setSearchInputToggle(false);
        }
    });

    const handleSearchInputToggle = () => {
        searchInputRef.current.focus();
        setSearchInputToggle(!searchInputToggle);
    };

    const clearSearchInputToggle = () => {
        setSearchInput("");
        dispatch(clearSearchInputValue());
        history.push("/browse");
    };

    // const handleSearchInput = event => {
    //     const { value } = event.target;
    //     setSearchInput(value);
    //     dispatch(changeSearchInputValue(value));

    //     if (value.length > 2) {
    //         history.push(`/search?q=${value}`);
    //         dispatch(fetchSearchResultsAsync(value));
    //     } else history.push("/browse");
    // };

    const handleSearchInput = event => {
        const { value } = event.target;
        setValueToSearch(value);
        setSearchInput(value);
        dispatch(changeSearchInputValue(value));

        // if (value.length > 0) {
        //     history.push(`/search?q=${value}`);
        //     dispatch(fetchSearchResultsAsync(value));
        // } else history.push("/browse");
    };

    const handleKeyPress = event => {
        if(valueToSearch.length > 2 && event.key === "Enter")
        {
            history.push(`/search?q=${valueToSearch}`);
            dispatch(fetchSearchResultsAsync(valueToSearch));
        } else history.push("/browse");
    }

    return (
        <div className="Searchbar" ref={searchbarRef}>
            <input
                type="text"
                placeholder="Buscar"
                value={searchInput}
                onChange={handleSearchInput}
                onKeyPress={handleKeyPress}
                ref={searchInputRef}
                className={`Searchbar--search ${searchInputToggle && "Searchbar--active"}`}
            />
            <div
                className="Searchbar--toggler"
                onClick={handleSearchInputToggle}
            >
                {/* <FiSearch size="1.5em" /> */}
            </div>
            <div
                className={`Searchbar--clear ${searchInputToggle && searchInput.length && "typing"}`}
                onClick={clearSearchInputToggle}
            >
                {/* <RiCloseFill /> */}
            </div>
        </div>
    )
}

export default Searchbar
