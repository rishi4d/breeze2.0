import React, {useEffect, useRef, useState} from 'react';
import './Widgets.css';
import { useSelector } from 'react-redux';
import { action } from '../store/redux_store';
import Image from './Image';

function Widgets(){

    const widgetData = useSelector((state) => state.widgetData);
    console.log(widgetData);
    const [imageURL, setImageURL] = useState();

    useEffect(() => {
        fetch('https://openweathermap.org/img/wn/11d@2x.png')
        .then((res)=>res.blob())
        .then((res)=>setImageURL(URL.createObjectURL(res)))
    }, []);

    return(
        <div>
            <div className='leftCard'>
                <div className='firHalf'>
                    <Image className='mainIcon' imageURL={'cloud.png'}></Image>
                    <p className='weatherStatus'>{widgetData.weather[0].description}</p>
                </div>
                <div className='secHalf'>
                    <p className='currentTemp'>{Math.floor(widgetData.temp)}<span style={{fontSize: '40px', verticalAlign: 'top', lineHeight: '90px'}}>&deg;</span><span style={{fontSize: '60px'}}>C</span></p>
                    <p className='tempRange'>&#8593; {widgetData.temp_max.toFixed(1)}<span style={{fontSize: '16px'}}>C</span> &nbsp; &#8595; {widgetData.temp_min.toFixed(1)}<span style={{fontSize: '16px'}}>C</span></p>
                    <p className='weatherLocation'>{widgetData.name}, {widgetData.country}</p>
                </div>
            </div>
            <div className='rightCard'>
                <div className='container'>
                    <p>RealFeel <span>{widgetData.feels_like.toFixed(1)}&deg;c</span></p>
                    <p>Humidity <span>{widgetData.humidity}%</span></p>
                    <p>Visibility <span>{(widgetData.visibility/1000).toFixed(1)}km</span></p>
                    <p>Pressure <span>{widgetData.pressure} hPa</span></p>
                    <p>Wind Speed <span>{widgetData.wind.speed.toFixed(1)} km/h</span></p>
                    <p>Cloud Cover <span>{widgetData.cloudcover}%</span></p>
                </div>
            </div>
            <div className='forecastCard'></div>
        </div>
    );
}

export default Widgets;