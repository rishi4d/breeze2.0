import { configureStore, createSlice } from '@reduxjs/toolkit';

const sliceFn = createSlice({
    name: 'reduxState',
    initialState: {searchResults: { items: [] }, searchKeyword: '', widgetData: {        

        coord: {lon: 87.3298, lat: 22.5558},
        temp: 26.41, 
        feels_like: 26.41, 
        temp_min: 26.41, 
        temp_max: 26.41, 
        pressure: 1007, 
        grnd_level: 1002,
        humidity: 91, 
        name: "Medinīpur",
        country: "IN",
        sunrise: 1662681341,
        sunset: 1662726061,
        timezone: 19800,
        visibility: 10000,
        weather: [{main: "Clouds", description: "overcast clouds", icon: "04n"}],
        wind: {speed: 1.86, deg: 134, gust: 2.71}
        
    }},
    reducers: {
        setSearchResults(state, action){
            console.log(action.payload);
            state.searchResults = action.payload;
        },
        setSearchKeyword(state, action){
            console.log('Updating SearchQuery to '+action.payload+' -- reduxState');
            state.searchKeyword = action.payload;
        },
        setWidgetData(state, action){
            console.log(action.payload);
            state.widgetData.coord.lat = action.payload.coord.lat;
            state.widgetData.coord.lon = action.payload.coord.lon;
            state.widgetData.name = action.payload.name;
            state.widgetData.temp = action.payload.main.temp;
            state.widgetData.feels_like = action.payload.main.temp;
            state.widgetData.temp_min = action.payload.main.temp_min;
            state.widgetData.temp_max = action.payload.main.temp_max;
            state.widgetData.pressure = action.payload.main.pressure;
            state.widgetData.grnd_level = action.payload.main.grnd_level;
            state.widgetData.humidity = action.payload.main.humidity;
            state.widgetData.country = action.payload.sys.country;
            state.widgetData.sunrise = action.payload.sys.sunrise;
            state.widgetData.sunset = action.payload.sys.sunset;
            state.widgetData.timezone = action.payload.timezone;
            state.widgetData.visibility = action.payload.visibility;
            state.widgetData.weather = action.payload.weather;
            state.widgetData.wind = action.payload.wind;
        }
    }
});

export const action = sliceFn.actions;

const store = configureStore({
    reducer: sliceFn.reducer
});

export default store;