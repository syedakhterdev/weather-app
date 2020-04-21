import React from 'react';
import moment from 'moment';
import DayDetail from './DayDetail';
import {convertKtoF} from '../helper/helper';

const TodayWeather = (props) => {
    if(!props.currentWeather) return null;

    const showing = props.currentWeather[0];
    const kelvinToFahrenheit = convertKtoF(showing.main.temp);
    return (
        <div>
            <h1 className="location">{props.currentLocation}</h1>
            <h2 className="date">{moment(props.showDate).format('dddd, MMMM DD, Y')}
            </h2>
            <div className="weatherIcon">
                <img src={`http://openweathermap.org/img/wn/${showing.weather[0].icon}@2x.png`} alt={showing.weather[0].description} />
            </div>
            <p className="temp">{kelvinToFahrenheit}</p>
            <p className="conditions">{showing.weather[0].main}</p>
            {/* <DayDetail detailWeather={props.currentWeather} /> */}
        </div>
    );
}

export default TodayWeather;