import React, {useEffect, useRef} from "react";
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import GPSIcon from '@mui/icons-material/NearMe';
import { useDispatch, useSelector } from 'react-redux';
import { action } from "../store/redux_store";


function SearchBar({placeholder}){
    const searchResultSet = useSelector((state) => state.searchResults);
    const searchKeyword = useSelector((state) => state.searchKeyword);
    const isRun = useRef(true);
    const dispatch = useDispatch();

    useEffect(()=>{
        let URL = 'https://autocomplete.search.hereapi.com/v1/autocomplete?politicalView=IND&in=countryCode:IND&apiKey=JdBdUE5eNBbyCadwyJyUu0tyeULzwbJ0VsZoOeeJQ9U&types=city&q='+ searchKeyword;

        if(searchKeyword.length > 0)
            fetch(URL)
                .then((response) => response.json())
                .then((resultsObj) => {
                    dispatch(action.setSearchResults(resultsObj));
                    if(resultsObj.items.length === 0){
                        document.querySelector('.searchInputs > input').style.borderRadius = "18px 0 0 18px";
                        document.querySelector('.searchButtons').style.borderRadius = "0 18px 18px 0";
                    }
                    else{
                        document.querySelector('.searchInputs > input').style.borderRadius = "18px 0 0 0";
                        document.querySelector('.searchButtons').style.borderRadius = "0 18px 0 0";
                    }
                    console.log(resultsObj);
                })
                .catch((error) => console.log(error.message));
        else{
                isRun.current = false;
                dispatch(action.setSearchResults({ items: [] })); //erasing searchResults in redux store.
                document.querySelector('.searchInputs > input').style.borderRadius = "18px 0 0 18px";
                document.querySelector('.searchButtons').style.borderRadius = "0 18px 18px 0";
        }

                console.log(searchResultSet);

    }, [searchKeyword]);

    document.body.addEventListener('keydown', (e) => (e.key == 'Escape') && dispatch(action.setSearchKeyword('')) )

    const getGPSLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                document.querySelector('.searchInputs > input').value = 'Please Wait ...';
                fetchWeatherData(position.coords.latitude, position.coords.longitude);
            }, () => alert("Unable to retrieve your location. Please enable/allow location services for your browser."));
        }
        else{
            alert("Geolocation is not supported by your browser.");
        }
    }

    const handleSearchKeyword = (event) => {
        dispatch(action.setSearchKeyword(event.target.value));
    }

    const geocodeLocation = (e, city) => {

        e.preventDefault();
        dispatch(action.setSearchKeyword(''));
        dispatch(action.setSearchResults({ items: [] })); //erasing searchResults in redux store.
        document.querySelector('.searchInputs > input').value = 'Please Wait ...';

        const apiKey = 'WjU2LPBQ7lrHN6GtqwhIbtfEPqr1ASjRLcdm0S7MC9s';
        let URL = 'https://geocode.search.hereapi.com/v1/geocode?q=' + city + '&in=countryCode:IND&types=city&limit=4&apiKey=' + apiKey;
        let lat = 0;
        let lng = 0;

        fetch(URL)
        .then((res) => res.json())
        .then((response) => {
            lat = response.items[0].position.lat;
            lng = response.items[0].position.lng;
            fetchWeatherData(lat, lng);
        });
    }

    const fetchWeatherData = (lat, lng) => {
        const apiKey = '0e7091f685572031515151c75d4d1057';
        let currentWeatherData = {};
        let forecastData = {};

        let URL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&units=metric&appid=' + apiKey;   
        fetch(URL)                          //CurrentWeatherAPI
        .then((res) => res.json())
        .then((response) => {
            console.log(response);
            document.querySelector('.searchInputs > input').value = response.name;
            currentWeatherData = response;
            dispatch(action.setCurrentWeatherData(currentWeatherData));
        })
        
        let URL2 = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ lng +'&units=metric&cnt=40&appid=' + apiKey;
        fetch(URL2)                          //ForecastAPI      
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            forecastData = res;

            /*      Added to implement temp_min, temp_max that is not supported by CurrentWeatherAPI.
            currentWeatherData.main.temp_min = res.list.temp.min;
            currentWeatherData.main.temp_max = res.list.temp.max;
            dispatch(action.setWidgetData(currentWeatherData));
            */
            dispatch(action.setForecastData(forecastData));
        })
    }

    /* This fn was added to hide the searchResults on clicking elsewhere. Doesn't work as intended.
    const handleBlur = (e) => {
        console.log('d');
        if(e.currentTarget.contains(document.activeElement)){
            dispatch(action.setSearchKeyword(''));
            console.log(e);
        };
    }
    */

    return (
        <div className="searchBar">
            <div className="searchInputs">
                <input type="text" placeholder={placeholder} onChange={handleSearchKeyword} />
                <div className="searchButtons">
                    <div className="gpsIcon">
                        <button onClick={getGPSLocation}><GPSIcon fontSize="large"/></button>
                    </div>
                    <div className="searchIcon">
                        <button><SearchIcon fontSize="large"/></button>
                    </div>
                </div>
            </div>
            {typeof searchResultSet.items !== "undefined" && searchResultSet.items.length !== 0 && (
                <div className="searchResults">
                    {searchResultSet.items.slice(0, 10).map((value, key) => {
                        return (
                            <a className="searchDataItem" href="/" onClick={event => geocodeLocation(event, value.address.city)} key={value.id}>
                                <p>{value.address.city}</p>
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default SearchBar;