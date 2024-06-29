import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWeather } from '../../../../services';
import { WeatherType } from '../../../../types';
import useAppStore from '../../../../stores';
import './search.scss';

export default function Search() {
  const navigate = useNavigate();
  const { setWeatherData, setWeatherLoading, setLocation } = useAppStore();
  const [search, setSearch] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event?.target?.value);
    if (message) setMessage('');
  };

  const onSearch = async () => {
    setWeatherLoading(true);

    const data = await fetchWeather(search, WeatherType.WEATHER);

    if (data.cod === 200) {
      setWeatherData(data);
      setLocation(data.name);
    } else if (data.cod === 500) setMessage('Internal server error');
    else setMessage('Invalid country or city');

    setWeatherLoading(false);
    if (data.cod === 200) navigate('/');
  };

  return (
    <div className='history-search'>
      <div className='history-search__input'>
        <input
          type='text'
          placeholder='Search country or city here...'
          value={search}
          onChange={onInputChange}
        />
        <button className='btn-primary' onClick={onSearch}>
          Search
        </button>
      </div>
      <p className='history-search__error'>{message}</p>
    </div>
  );
}
