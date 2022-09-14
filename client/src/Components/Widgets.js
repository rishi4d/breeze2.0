import React, {useEffect, useRef, useState} from 'react';
import './Widgets.css';
import { useSelector } from 'react-redux';
import { action } from '../store/redux_store';

function Widgets(){
    const widgetData = useSelector((state) => state.widgetData);
    console.log(widgetData);
    let temp = useState(fetch('https://openweathermap.org/img/wn/11d@2x.png')
                .then((a)=>a.blob())
                .then((a)=>URL.createObjectURL(a)));
    

    return(
        <div>
            <div className='leftCard'>
                <img src={temp}></img>
                <Image ref={temp}></Image>
                <p>{widgetData.name}</p>
            </div>
            <div className='rightCard'>

            </div>
            <div className='forecastCard'></div>
        </div>
    );
}

export default Widgets;