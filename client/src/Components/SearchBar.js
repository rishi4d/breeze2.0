import React from "react";
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import GPSIcon from '@mui/icons-material/NearMe';

function SearchBar({placeholder, data}){
    return (
        <div className="searchBar">
            <div className="searchInputs">
                <input type="text" placeholder={placeholder} />
                <div className="searchButtons">
                    <div className="gpsIcon">
                        <GPSIcon fontSize="large"/>
                    </div>
                    <div className="searchIcon">
                        <SearchIcon fontSize="large"/>
                    </div>
                </div>
            </div>
            <div className="searchResults">

            </div>
        </div>
    );
}

export default SearchBar;