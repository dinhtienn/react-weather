import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWeather } from '../../../../services';
import { WeatherType } from '../../../../types';
import { LIST_HISTORY_STORAGE_KEY } from '../../../../utils/constants';
import useAppStore from '../../../../stores';
import secureLocalStorage from 'react-secure-storage';
import './search.scss';

export default function Search() {
  const navigate = useNavigate();
  const {
    setWeatherData,
    setWeatherLoading,
    setLocation,
    history,
    setHistory,
  } = useAppStore();
  const [search, setSearch] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event?.target?.value);
    if (message) setMessage('');
  };

  const onInputKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.keyCode === 13) onSearch();
  };

  const onSearch = async () => {
    if (!search) {
      setMessage('Please enter country or city');
      return;
    }
    setWeatherLoading(true);

    const data = await fetchWeather(search, WeatherType.WEATHER);

    if (data.cod === 200) {
      setWeatherData(data);
      setLocation(data.name);
      await handleHistory(data.name);
    } else if (data.cod === 500) setMessage('Internal server error');
    else setMessage('Invalid country or city');

    setWeatherLoading(false);
    if (data.cod === 200) navigate('/');
  };

  const handleHistory = (location: string) => {
    const historyClone = [...history];
    if (!history.length) {
      setHistory([location]);
      secureLocalStorage.setItem(LIST_HISTORY_STORAGE_KEY, [location]);
      return;
    }
    const index = history.indexOf(location);
    if (index > -1) {
      historyClone.splice(index, 1);
    }
    historyClone.unshift(location);
    setHistory(historyClone);
    secureLocalStorage.setItem(LIST_HISTORY_STORAGE_KEY, historyClone);
  };

  return (
    <div className='history-search'>
      <div className='history-search__input'>
        <input
          type='text'
          placeholder='Search country or city here...'
          value={search}
          onChange={onInputChange}
          onKeyUp={onInputKeyUp}
        />
        <button className='btn-primary' onClick={onSearch}>
          Search
        </button>
      </div>
      <p className='history-search__error'>{message}</p>
    </div>
  );
}
