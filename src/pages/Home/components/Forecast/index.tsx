/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { fetchWeather } from '../../../../services';
import { WeatherType } from '../../../../types';
import { getListDateForecast } from '../../../../utils/helpers';
import useAppStore from '../../../../stores';
import './forecast.scss';

export default function Forecast() {
  const { location, forecastData, setForecastData, setForecastLoading } =
    useAppStore();

  const handleFetchData = async () => {
    setForecastLoading(true);
    const data = await fetchWeather(location, WeatherType.FORECAST);
    if (data.cod === 200) setForecastData(data.data);
    setForecastLoading(false);
  };

  useEffect(() => {
    if (location && !forecastData) handleFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='forecast card'>
      {forecastData ? (
        getListDateForecast().map((item: string, index: number) => (
          <div className='forecast-item' key={index}>
            <p className='forecast-item__date'>{item}</p>
            <div className='forecast-item__content'>
              {forecastData[item].map((it: any, index: number) => (
                <div className='forecast-item__content-item' key={index}>
                  <div className='forecast-item__content-item__time'>
                    {it.time}
                  </div>
                  <div className='forecast-item__content-item__status'>
                    <div className='forecast-item__content-item__status-overview'>
                      <img
                        className='forecast-item__content-item__status-overview__condition'
                        src={`https://openweathermap.org/img/wn/${it.icon}@2x.png`}
                        alt={it.description}
                      />
                      <div className='forecast-item__content-item__status-overview__temperature'>
                        <span>{it.tempMin}</span>
                        <span>/</span>
                        <span>{it.tempMax}</span>
                      </div>
                    </div>
                    <p className='forecast-item__content-item__status-description'>
                      {it.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className='empty-text'>No data</p>
      )}
    </div>
  );
}
