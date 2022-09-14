import React from 'react';
import './Image.css';

function Image(image){
    return(
        <div className='weatherIcon'>
            <img className='icon' src={image.imageURL}/>
        </div>
    );
}

export default Image;