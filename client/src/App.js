import React, {useState} from 'react';
import BackdropFilter from 'react-backdrop-filter';
import Blur from "react-blur";

function App() {
  return (
    <div className="App">
      <Blur className="bg" img={process.env.PUBLIC_URL + '/res/images/bg.jpg'} blurRadius={25} enableStyles></Blur>
      <div class="branding">
        <h1 style={{fontSize: 60}}>Breeze</h1>
	    </div>
    </div>
  );
}

export default App;
