import { WeatherType } from '../types';
import { processForecast, processWeather } from '../utils/helpers';
import { API_URL } from '../utils/constants';

export const fetchWeather = async (search: string, type: WeatherType) => {
  try {
    const response = await fetch(`${API_URL}/api/${type}?q=${search}`);
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
