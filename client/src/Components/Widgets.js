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
                <Image imageURL={'cloud.png'}></Image>
                <p>{widgetData.weather[0].main}</p>
                <p>{widgetData.name}</p>
            </div>
            <div className='rightCard'>

            </div>
            <div className='forecastCard'></div>
        </div>
    );
}

export default Widgets;