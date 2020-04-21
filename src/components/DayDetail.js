import React from 'react';
import moment from 'moment';
import {convertKtoF} from '../helper/helper';

const DayDetail = ({detailWeather}) => {
    return (
        <div className="dayDetail">
            {
                detailWeather.map((dw, i) => {
                    return(
                    <div key={`detail-weather-${i}`} className="detailItem">
                        <img src={`http://openweathermap.org/img/wn/${dw.weather[0].icon}@2x.png`} alt={dw.weather[0].description} />
                        <p className="detailTemp">{convertKtoF(dw.main.temp)}</p>
                        <p>{moment(dw.dt_txt).format('HH:mm')}</p>
                    </div>
                    )
                })
            }
                
               
            </div>
    )
}

export default DayDetail;