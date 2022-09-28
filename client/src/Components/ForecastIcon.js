import React from 'react';
import './forecastIcon.css';

function ForecastIcon(image){
    return(
        <div className='forecastIcon'>
            <img className='icon' alt='' src={image.imageURL}/>
        </div>
    );
}

export default ForecastIcon;