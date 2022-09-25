import React, { useEffect, useRef, useState } from 'react';
import './Widgets.css';
import { useSelector } from 'react-redux';
import { action } from '../store/redux_store';
import Image from './Image';

function Widgets() {

    const currentWeatherData = useSelector((state) => state.currentWeatherData);
    const forecastData = useSelector((state) => state.forecastData);
    console.log(currentWeatherData);
    const [imageURL, setImageURL] = useState();

    useEffect(() => {
        fetch('https://openweathermap.org/img/wn/11d@2x.png')
            .then((res) => res.blob())
            .then((res) => setImageURL(URL.createObjectURL(res)))
    }, []);

    return (
        <div>
            <div className='leftCard'>
                <div className='firHalf'>
                    <Image className='mainIcon' imageURL={'cloud.png'}></Image>
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
                    return (
                        <div className='items'>
                            <p style={{fontWeight:600}}>{(forecastData.list.length > 1) ? value.day.substring(0,3) : forecastData.list[0].day.substring(0, 3)}</p>
                            <p>{new Date(value.dt * 1000).toLocaleString('en-IN', {hour: 'numeric', hour12: 'true'})}</p>
                            <p>{Math.floor(value.main.feels_like)}c</p>
                        </div>
                    );
                })}

            </div>
        </div>
    );
}

export default Widgets;