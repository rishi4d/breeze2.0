import React, { useEffect, useState } from 'react';
import './Widgets.css';
import { useSelector } from 'react-redux';
//import { action } from '../store/redux_store';
import Image from './Image';
import ForecastIcon from './ForecastIcon';

function Widgets() {

    const currentWeatherData = useSelector((state) => state.currentWeatherData);
    const forecastData = useSelector((state) => state.forecastData);
    console.log(currentWeatherData);
    console.log(forecastData);
    //const [imageURL, setImageURL] = useState();
    //let time = convertUTCDateToLocalDate(forecastData.list[0].dt).getUTCHours() - 3;

    //let currentTime = convertUTCDateToLocalDate(currentWeatherData.dt).getUTCHours() + convertUTCDateToLocalDate(currentWeatherData.dt).getUTCMinutes;

    const weatherCode = new Map([
        ['Thunderstorm', ['storm.png', 'storm.png']],
        ['Drizzle', ['lightrain.png', 'lightrain.png']],
        ['Rain', ['rainy.png', 'rain.png']],
        ['Snow', ['snowflake.png', 'snowflake.png']],
        ['Clear', ['sun.png', 'night1.png']],
        ['Clouds', ['clouds.png', 'cloudy.png']],
        ['Mist', ['mist.png', 'mist.png']],
        ['Haze', ['haze.png', 'haze.png']],
        ['Fog', ['fog.png', 'fog.png']],
        ['Smoke', ['fog2.png', 'fog2.png']],
        ['Dust', ['wind.png', 'wind.png']],
    ]);

    /*
    useEffect(() => {
        fetch('https://openweathermap.org/img/wn/11d@2x.png')
            .then((res) => res.blob())
            .then((res) => setImageURL(URL.createObjectURL(res)))

    }, []);
    */

    function convertUTCDateToLocalDate(dateString) {
        //console.log(dateString);
        //console.log(forecastData.city.timezone);
        let newDate = new Date((dateString + forecastData.city.timezone) * 1000);
        var utc = new Date(Date.UTC(newDate.getUTCFullYear(), newDate.getUTCMonth(), newDate.getUTCDate(), newDate.getUTCHours(), newDate.getUTCMinutes(), newDate.getUTCSeconds()));
        //console.log(utc);
        return utc;
    }

    return (
        <div>
            <div className='leftCard'>
                <div className='firHalf'>

                    <Image className='mainIcon' imageURL={require('../assets/icons/' + `${weatherCode.get(currentWeatherData.weather[0].main)[(currentWeatherData.dt >= currentWeatherData.sunrise && currentWeatherData.dt <= currentWeatherData.sunset) ? 0 : 1]}`)}></Image>

                    <p className='weatherStatus'>{currentWeatherData.weather[0].description}</p>
                </div>
                <div className='secHalf'>
                    <p className='currentTemp'>{Math.floor(currentWeatherData.temp)}<span style={{ fontSize: '40px', verticalAlign: 'top', lineHeight: '90px' }}>&deg;</span><span style={{ fontSize: '60px' }}>C</span></p>
                    <p className='tempRange'><span className='arrow'>&#8673;</span> {currentWeatherData.temp_max.toFixed(1)}<span style={{ fontSize: '16px' }}>C</span> &nbsp; &#8675; {currentWeatherData.temp_min.toFixed(1)}<span style={{ fontSize: '16px' }}>C</span></p>
                    <p className='weatherLocation'>{currentWeatherData.name}, {currentWeatherData.country}</p>
                </div>
            </div>
            <div className='rightCard'>
                <div className='container'>
                    <p>RealFeel <span>{currentWeatherData.feels_like.toFixed(1)}<span className='units'>&deg;c</span></span></p>
                    <p>Humidity <span>{currentWeatherData.humidity}<span className='units'>%</span></span></p>
                    <p>Visibility <span>{(currentWeatherData.visibility / 1000).toFixed(1)}<span className='units'> km</span></span></p>
                    <p>Pressure <span>{currentWeatherData.pressure}<span className='units'> hPa</span></span></p>
                    <p>Wind Speed <span>{currentWeatherData.wind.speed.toFixed(1)}<span className='units'> km/h</span></span></p>
                    <p>Cloud Cover <span>{currentWeatherData.cloudcover}<span className='units'>%</span></span></p>
                </div>
            </div>
            <div className='forecastCard'>
                {forecastData.list.length > 1 && forecastData.list.filter((value, index) => index % 4 === 0).map((value, index) => {
                    let time = convertUTCDateToLocalDate(value.dt).getUTCHours();
                    return (
                        <div className='items' key={value.dt}>
                            {((forecastData.list.length > 1 && forecastData.list[(index + 1) * 4] !== undefined)
                                ? ((value.day === forecastData.list[(index + 1) * 4].day)
                                    ? (<p className='daysTransform' style={{ fontWeight: 600 }}>{value.day.substring(0, 3)}</p>)
                                    : ((forecastData.list[(index - 1) * 4] !== undefined)
                                        ? (<p className='forecastDays' style={{ fontWeight: 600, visibility: 'hidden' }}>{value.day.substring(0, 3)}</p>)
                                        : (<p className='forecastDays' style={{ fontWeight: 600 }}>{value.day.substring(0, 3)}</p>)))
                                : ((index !== 0 && forecastData.list[(index - 1) * 4].day === value.day)
                                    ? (<p className='forecastDays' style={{ fontWeight: 600, visibility: 'hidden' }}>{value.day.substring(0, 3)}</p>)
                                    : <p className='forecastDays' style={{ fontWeight: 600 }}>{value.day.substring(0, 3)}</p>))}

                            {/*
                            {(forecastData.list.length > 1 && forecastData.list[(index+1) * 4] != undefined) ?
                            ((value.day === forecastData.list[(index+1) * 4].day) ? 
                            <p style={{ fontWeight: 600, visibility: 'hidden' }}>{value.day.substring(0, 3)}</p> : 
                            <p className='daysTransform' style={{ fontWeight: 600 }}>{value.day.substring(0, 3)}</p>) : 
                            <p style={{ fontWeight: 600 }}>{value.day.substring(0, 3)}</p>}*/}
                            <ForecastIcon className='forecastIcon' imageURL={require('../assets/icons/' + `${weatherCode.get(value.weather[0].main)[(time >= 6 && time < 18) ? 0 : 1]}`)}></ForecastIcon>
                            <p>{time % 12 || '12'} {(time / 12 <= 1) ? 'AM' : 'PM'}</p>
                            <p>{Math.floor(value.main.feels_like)}&deg;c</p>
                        </div>
                    );
                })}

            </div>
        </div>
    );
}

export default Widgets;