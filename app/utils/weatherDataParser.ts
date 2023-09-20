import {WeatherListApiResponse} from '../models/weather';
import { weather } from '../constants';
const getWeatherDay = (dt_txt: string) => {
    const date = new Date(dt_txt);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
};
  
export const parseWeatherResponse = (weatherResponse: WeatherListApiResponse): Promise<WeatherListApiResponse> => {
  const uniqueDates = new Set();
  const filteredList = weatherResponse.list
    .filter((forecast) => {
      const { dt_txt } = forecast;
      return isInNextFiveDays(dt_txt);
    })
    .filter((forecast) => {
      const date = forecast.dt_txt.split(' ')[0];
      if (uniqueDates.has(date)) {
        return false;
      }
      uniqueDates.add(date);
      return true;
    });

  return Promise.resolve({
    ...weatherResponse,
    list: filteredList.map((forecast) => {
      const { dt_txt } = forecast;
      const mainWeather = forecast?.weather[0].main.toLowerCase();
      if (mainWeather.includes('clear')) {
        forecast.weather[0].main = 'Sunny'; 
      } else if (mainWeather.includes('cloud')) {
        forecast.weather[0].main = 'Cloudy'; 
      } else if (mainWeather.includes('rain')) {
        forecast.weather[0].main = 'Rainy'; 
      }
      return {
        ...forecast,
        main: {
          ...forecast.main,
          temp: Math.round(forecast.main.temp - weather.KELVIN_TO_CELSIUS),
          temp_min: Math.round(forecast.main.temp_min - weather.KELVIN_TO_CELSIUS),
          temp_max: Math.round(forecast.main.temp_max - weather.KELVIN_TO_CELSIUS),
        },
        day: getWeatherDay(dt_txt),
      };
    }),
  });
};

function isInNextFiveDays(dateStr: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const fiveDaysLater = new Date(today);
  fiveDaysLater.setDate(today.getDate() + 6);

  const inputDate = new Date(dateStr);
  inputDate.setHours(0, 0, 0, 0);

  return inputDate > today && inputDate < fiveDaysLater;
}


