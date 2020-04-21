import React from 'react';
import moment from 'moment';
import {convertKtoF, sell} from '../helper/helper';

const FutureWeather = (props) => {
    if(!props.weather) return null;
    let unique = props.weather.reduce((x, y) =>
        x.findIndex(e=> moment(e.dt_txt).format('Y-MM-DD') === moment(y.dt_txt).format('Y-MM-DD')) < 0 ? [...x, y]: x, []);
    const today = unique[0];
    unique.shift();
    const icons = sell(unique);
    console.log('All::', icons);

    return(
    <div id="future" className="wrapper">
        {
            unique.map((w, i) => {
                const allIcon = icons.icons;
                return(
                <div className="container" key={`weather-${i}`} onClick={props.handleShowDateWeather.bind(null, w.dt_txt)}>
                    <h3 className="day">{moment(w.dt_txt).format('ddd')}</h3>
                    <div className="weatherIcon">
                        <img src={`http://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`} alt={w.weather[0].description} />
                        {
                            allIcon[i].map((ic, j) => {
                                if((ic === 'jacket' && i > 0 && icons.jacket) || 
                                  (ic === 'umbrella' && i > 0 && icons.umbrella)) return null;
                                return(
                                    <img src={`/icons/${ic}-icon.png`} className="sellIcons" key={`sell-${j}`} alt={ic} />
                                )
                            })
                        }

                    </div>
                    <p className="conditions">{w.weather[0].description}</p>
                    <p className="tempRange">
                        <span className="high">{convertKtoF(w.main.temp_max)}</span> |
                        <span className="low"> {convertKtoF(w.main.temp_min)}</span>
                    </p>
                </div>
                )
            })
        }

	</div>
    );
}

export default FutureWeather;