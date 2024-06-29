import { useEffect } from 'react';
import { fetchWeather } from '../../../../services';
import { WeatherType } from '../../../../types';
import { formatDateTime } from '../../../../utils/helpers';
import Loading from '../../../../components/Loading';
import useAppStore from '../../../../stores';
import './weather.scss';

export default function Weather() {
  const {
    location,
    weatherData,
    weatherLoading,
    setWeatherData,
    setWeatherLoading,
  } = useAppStore();

  const handleFetchData = async () => {
    setWeatherLoading(true);
    const data = await fetchWeather(location, WeatherType.WEATHER);
    if (data.cod === 200) setWeatherData(data);
    setWeatherLoading(false);
  };

  useEffect(() => {
    if (location && !weatherData) handleFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className='weather card'>
      <p className='weather__date'>{formatDateTime(new Date())}</p>
      {weatherLoading ? (
        <Loading />
      ) : weatherData ? (
        <>
          <div className='weather__status'>
            {weatherData?.icon ? (
              <img
                className='weather__status__condition'
                src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                alt={weatherData?.description}
              />
            ) : (
              <></>
            )}
            <div className='weather__status__temperature'>
              <p className='weather__status__temperature__detail'>
                {weatherData?.temp}
              </p>
              <p className='weather__status__temperature__description'>
                {weatherData?.description}
              </p>
            </div>
          </div>
          <div className='weather__more'>
            <div className='weather__more__info'>
              <p className='weather__more__info__label'>Humidity</p>
              <p className='weather__more__info__detail humidity'>
                {weatherData?.humidity}
              </p>
            </div>
            <div className='weather__more__info'>
              <p className='weather__more__info__label'>Winds</p>
              <p className='weather__more__info__detail wind'>
                {weatherData?.winds}
              </p>
            </div>
            <div className='weather__more__info'>
              <p className='weather__more__info__label'>Visibility</p>
              <p className='weather__more__info__detail visibility'>
                {weatherData?.visibility}
              </p>
            </div>
          </div>
        </>
      ) : (
        <p className='empty-text'>No data</p>
      )}
    </div>
  );
}
