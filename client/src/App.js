import React, { useEffect, useState } from 'react';
//import BackdropFilter from 'react-backdrop-filter';
import Blur from "react-blur";
import { useSelector } from 'react-redux';
//import './App.css';

function App() {
  const currentWeatherData = useSelector((state) => state.currentWeatherData);
  const [imgPath, setImgPath] = useState('bg.png');

  useEffect(() => {
    switch (currentWeatherData.weather[0].main) {
      case "Thunderstorm":
        setImgPath('0.png');
        break;
      case "Drizzle":
        setImgPath('1.png');
        break;
      case "Rain":
        setImgPath('2.png');
        break;
      case "Snow":
        setImgPath('3.png');
        break;
      case "Clear":
        setImgPath('4.png');
        break;
      case "Clouds":
        setImgPath('5.png');
        break;
      case "Mist":
        setImgPath('6.png');
        break;
      case "Haze":
        setImgPath('7.png');
        break;
      case "Fog":
        setImgPath('7.png');
        break;
      default:
        setImgPath('bg.png');
    }
    console.log(imgPath);
  }, [currentWeatherData]);

return (
  <div className="App flex">
    <Blur className="bg" img={require('./assets/backgrounds/' + imgPath)} blurRadius={25} enableStyles></Blur>
    <div class="branding flex items-center">
      <h1 className='text-6xl'>Breeze</h1>
    </div>
  </div>
);
}

export default App;
