export const convertKtoF = (kelvin) => {
    return parseInt(( kelvin - 273.15) * (9/5) + 32);
}

export const sell = (weather) => {
    let icons = [];
    for(const w of weather) {
        const temp = convertKtoF(w.main.temp);
        let weatherForDay = [];
        if(w.weather[0].main.toLowerCase() === 'rain' || w.weather[0].main.toLowerCase() === 'snow') {
            weatherForDay.push('umbrella');
        }
        if(temp <=45) {
            weatherForDay.push('jacket');
        }
        icons.push(weatherForDay);
    }

    const jacketEveryDay = icons.every((j) => j.indexOf('jacket') > -1);
    const umbrellaEveryDay = icons.every((j) => j.indexOf('umbrella') > -1);
    return {icons, jacket: jacketEveryDay, umbrella: umbrellaEveryDay};
}