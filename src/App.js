import React, {useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import Search from './components/Search';
import FutureWeather from './components/FutureWeather';
import TodayWeather from './components/TodayWeather';
import Loader from './components/Loader';
import config from './config/config';
import './App.css';

const App = () => {
  const today = moment();
  console.log(today.format('Y-MM-DD HH:mm'));
  const [weather, setWeather] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [isError, setIsError] = useState(null);
  const [showDate, setShowDate] = useState(today);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState('Chicago');

  const handleUpdateLocation = (loc) => {
    setCurrentLocation(loc);
  }

  useEffect(() => {
    setIsLoading(true);
    setIsError(null);
    setWeather(null);
    const weatherForecast = axios.get(`${config.apiUrl}/forecast?q=${currentLocation}&appid=${config.apiKey}`);
    const weatherToday = axios.get(`${config.apiUrl}/weather?q=${currentLocation}&appid=${config.apiKey}`);
    
    axios.all([weatherForecast, weatherToday]).then(axios.spread((...responses) => {
      const forecastRes = responses[0];
      const todayRes = responses[1];
      console.log("Today:::", todayRes);
      setWeather(forecastRes.data.list);
      setCurrentWeather([todayRes.data]);
      setIsLoading(false);

    })).catch(err => {
      console.log('Error:::', err);
      setIsLoading(false);
      setIsError('Something went wrong! Please re-enter your city name');
    });
  }, [currentLocation]);

  useEffect(() => {
    if(weather){
      const filterDate = moment(showDate).format('Y-MM-DD');
      console.log(filterDate);
      const weatherByDate = weather.filter((w) => w.dt_txt.indexOf(filterDate) >= 0);
      console.log('WD:::', weatherByDate);
      setCurrentWeather(weatherByDate);
    }
  }, [showDate])

  const handleShowDateWeather = (weatherDate) => {
    console.log(weatherDate);
    setShowDate(moment(weatherDate).format('Y-MM-DD'));
  }


  return (
    <div className="App">
      <div id="current" className="wrapper">

        <Search handleUpdateLocation={handleUpdateLocation} />
        {isError ?
          isError
          : null
        }
        {
          !isError ?
            isLoading ?
              <Loader />
            :
              <TodayWeather showDate={showDate} currentLocation={currentLocation} currentWeather={currentWeather} />
          : null
        }
      </div>
      {
        isLoading || isError ?
          null
        :
          <FutureWeather weather={weather} handleShowDateWeather={handleShowDateWeather} />
      }
    </div>
  );
}

export default App;
