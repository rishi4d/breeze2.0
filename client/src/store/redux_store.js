import { configureStore, createSlice } from '@reduxjs/toolkit';

const sliceFn = createSlice({
    name: 'reduxState',
    initialState: {
        searchResults: { items: [] },
        searchKeyword: '',
        currentWeatherData: {
            coord: { lon: 87.3298, lat: 22.5558 },
            temp: 26,
            feels_like: 26,
            temp_min: 26,
            temp_max: 26,
            pressure: 2600,
            sea_level: 1000,
            grnd_level: 1002,
            humidity: 26,
            name: "Medinīpur",
            country: "IN",
            dt: 940896000,
            sunrise: 1662681341, 
            sunset: 1662726061,
            timezone: 19800,
            visibility: 2600,
            weather: [{ main: "Clear", description: "-", icon: "04n" }],
            wind: { speed: 2.6, deg: 134, gust: 2.71 },
            cloudcover: 26
        },
        forecastData: {
            list: [
                {
                    "dt": 1664118000,
                    "day": "Sunday",
                    "main": {
                        "temp": 27.19,
                        "feels_like": 30.82,
                        "temp_min": 26.15,
                        "temp_max": 27.19,
                        "pressure": 1006,
                        "sea_level": 1006,
                        "grnd_level": 1002,
                        "humidity": 86,
                        "temp_kf": 1.04
                    },
                    "weather": [
                        {
                            "id": 803,
                            "main": "Clouds",
                            "description": "broken clouds",
                            "icon": "04n"
                        }
                    ],
                    "clouds": {
                        "all": 83
                    },
                    "wind": {
                        "speed": 3.24,
                        "deg": 187,
                        "gust": 6.62
                    },
                    "visibility": 10000,
                    "pop": 0,
                    "sys": {
                        "pod": "n"
                    },
                    "dt_txt": "2022-09-25 15:00:00"
                }
            ],
            city: {
                "id": 1263220,
                "name": "Medinīpur",
                "coord": {
                    "lat": 22.5558,
                    "lon": 87.3298
                },
                "country": "IN",
                "population": 153349,
                "timezone": 19800,
                "sunrise": 1664064007,
                "sunset": 1664107492
            }
        }
    },
    reducers: {
        setSearchResults(state, action) {
            console.log(action.payload);
            state.searchResults = action.payload;
        },
        setSearchKeyword(state, action) {
            console.log('Updating SearchQuery to ' + action.payload + ' -- reduxState');
            state.searchKeyword = action.payload;
        },
        setCurrentWeatherData(state, action) {
            console.log(action.payload);
            state.currentWeatherData.coord.lat = action.payload.coord.lat;
            state.currentWeatherData.coord.lon = action.payload.coord.lon;
            state.currentWeatherData.name = action.payload.name;
            state.currentWeatherData.temp = action.payload.main.temp;
            state.currentWeatherData.feels_like = action.payload.main.temp;
            state.currentWeatherData.temp_min = action.payload.main.temp_min;
            state.currentWeatherData.temp_max = action.payload.main.temp_max;
            state.currentWeatherData.pressure = action.payload.main.pressure;
            state.currentWeatherData.grnd_level = action.payload.main.grnd_level;
            state.currentWeatherData.sea_level = action.payload.main.sea_level;
            state.currentWeatherData.humidity = action.payload.main.humidity;
            state.currentWeatherData.country = action.payload.sys.country;
            state.currentWeatherData.dt = action.payload.dt;
            state.currentWeatherData.sunrise = action.payload.sys.sunrise;
            state.currentWeatherData.sunset = action.payload.sys.sunset;
            state.currentWeatherData.timezone = action.payload.timezone;
            state.currentWeatherData.visibility = action.payload.visibility;
            state.currentWeatherData.weather = action.payload.weather;
            state.currentWeatherData.wind = action.payload.wind;
            state.currentWeatherData.cloudcover = action.payload.clouds.all;
        },
        setForecastData(state, action) {
            let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            console.log(action.payload);
            state.forecastData.list = action.payload.list;
            state.forecastData.city = action.payload.city;

            for(let i in state.forecastData.list) {
                state.forecastData.list[i].day = weekDays[new Date(state.forecastData.list[i].dt * 1000).getDay()];
            }
            console.log(state.forecastData);
        }
    }
});

export const action = sliceFn.actions;

const store = configureStore({
    reducer: sliceFn.reducer
});

export default store;