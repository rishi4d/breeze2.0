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
                    <p className='weatherStatus'>{widgetData.weather[0].main}</p>
                </div>
                <div className='secHalf'>
                    <p className='currentTemp'>{Math.floor(widgetData.temp)}<span style={{fontSize: '40px', verticalAlign: 'top', lineHeight: '90px'}}>&deg;</span><span style={{fontSize: '60px'}}>C</span></p>
                    <p className='tempRange'>&#8593; {widgetData.temp_max} &nbsp; &#8595; {widgetData.temp_min}</p>
                    <p className='weatherLocation'>{widgetData.name}, {widgetData.country}</p>
                </div>
            </div>
            <div className='rightCard'>

            </div>
            <div className='forecastCard'></div>
        </div>
    );
}

export default Widgets;