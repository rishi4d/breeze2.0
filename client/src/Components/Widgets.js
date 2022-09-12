import React, {useEffect} from 'react';
import './Widgets.css';
import { useSelector } from 'react-redux';
import { action } from '../store/redux_store';

function Widgets(){
    const widgetData = useSelector((state) => state.widgetData);

    return(
        <div className='weatherCard'>
            <p>{widgetData.name}</p>
        </div>
    );
}

export default Widgets;