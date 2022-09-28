import React, {useState} from 'react';
import BackdropFilter from 'react-backdrop-filter';
import Blur from "react-blur";
import image from './assets/res/images/bg-1.jpg';

function App() {

  return (
    <div className="App">
      <Blur className="bg" img={image} blurRadius={25} enableStyles></Blur>
      <div class="branding">
        <h1 style={{fontSize: 60}}>Breeze</h1>
	    </div>
    </div>
  );
}

export default App;
