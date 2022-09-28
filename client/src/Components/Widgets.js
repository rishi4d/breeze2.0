import React, { useEffect, useRef, useState } from 'react';
import './Widgets.css';
import { useSelector } from 'react-redux';
import { action } from '../store/redux_store';
import Image from './Image';
import ForecastIcon from './ForecastIcon';

function Widgets() {

    const currentWeatherData = useSelector((state) => state.currentWeatherData);
    const forecastData = useSelector((state) => state.forecastData);
    console.log(currentWeatherData);
    const [imageURL, setImageURL] = useState();

    const weatherCode = new Map([
        ['Thunderstorm', ''],
        ['Drizzle', ''],
        ['Rain', ''],
        ['Snow', ''],
        ['Clear', ''],
        ['Clouds', 'cloud.png']
    ]);

    useEffect(() => {
        fetch('https://openweathermap.org/img/wn/11d@2x.png')
            .then((res) => res.blob())
            .then((res) => setImageURL(URL.createObjectURL(res)))

    }, []);

    function convertUTCDateToLocalDate(dateString) {
        console.log(dateString);
        console.log(forecastData.city.timezone);
        let newDate = new Date((dateString+forecastData.city.timezone)*1000);
        var utc =new Date(Date.UTC(newDate.getUTCFullYear(), newDate.getUTCMonth(), newDate.getUTCDate(), newDate.getUTCHours(), newDate.getUTCMinutes(), newDate.getUTCSeconds()));
        console.log(utc);
        return utc;   
    }

    return (
        <div>
            <div className='leftCard'>
                <div className='firHalf'>
                    <Image className='mainIcon' imageURL={require('../assets/'+ `${weatherCode.get('Clouds')}`)}></Image>
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
                {forecastData.list.filter((value, index) => index % 4 === 0).map((value, index) => {
                    let time = convertUTCDateToLocalDate(value.dt).getUTCHours();
                    return (
                        <div className='items' key={value.dt}>
                            {((forecastData.list.length > 1 && forecastData.list[(index + 1) * 4] !== undefined)
                            ?((value.day === forecastData.list[(index + 1) * 4].day) 
                                ?(<p className='daysTransform' style={{ fontWeight: 600 }}>{value.day.substring(0, 3)}</p>) 
                                    :((forecastData.list[(index - 1) * 4] !== undefined) 
                                        ?(<p style={{ fontWeight: 600, visibility: 'hidden' }}>{value.day.substring(0, 3)}</p>) 
                                        :(<p style={{ fontWeight: 600}}>{value.day.substring(0, 3)}</p>)))
                            :((index!==0 && forecastData.list[(index - 1) * 4].day === value.day) 
                                ?(<p style={{ fontWeight: 600, visibility: 'hidden' }}>{value.day.substring(0, 3)}</p>) 
                                :<p style={{ fontWeight: 600 }}>{value.day.substring(0, 3)}</p>))}

                            {/*
                            {(forecastData.list.length > 1 && forecastData.list[(index+1) * 4] != undefined) ?
                            ((value.day === forecastData.list[(index+1) * 4].day) ? 
                            <p style={{ fontWeight: 600, visibility: 'hidden' }}>{value.day.substring(0, 3)}</p> : 
                            <p className='daysTransform' style={{ fontWeight: 600 }}>{value.day.substring(0, 3)}</p>) : 
                            <p style={{ fontWeight: 600 }}>{value.day.substring(0, 3)}</p>}*/}
                            <ForecastIcon className='forecastIcon' imageURL={require('../assets/'+ `${weatherCode.get('Clouds')}`)}></ForecastIcon>
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