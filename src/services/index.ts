import { API_KEY } from '../utils/constants';
import { WeatherType } from '../types';
import { processForecast, processWeather } from '../utils/helpers';

export const fetchWeather = async (search: string, type: WeatherType) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/${type}?q=${search}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();

    if (Number(data.cod) === 200)
      return type === WeatherType.WEATHER
        ? processWeather(data)
        : processForecast(data);

    return data;
  } catch (error) {
    return {
      cod: 500,
    };
  }
};
