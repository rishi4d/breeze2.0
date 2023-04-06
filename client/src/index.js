import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SearchBar from './Components/SearchBar';
import Widgets from './Components/Widgets';
import Footer from './Components/Footer';
import { Provider } from 'react-redux';
import store from './store/redux_store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
  <React.StrictMode>
    {
      (() => {
        if (process.env.NODE_ENV !== "development"){
          console.log("Log Level > "+process.env.NODE_ENV);
          console.log = () => {};
        }
      })()
    }
    <App />
    <SearchBar placeholder="Type in your location"/>
    <Widgets />
    <Footer />
  </React.StrictMode>
  </Provider>
);
