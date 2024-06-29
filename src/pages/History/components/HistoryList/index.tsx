import useAppStore from '../../../../stores';
import iconSearch from '../../../../assets/images/icon-search.svg';
import iconBin from '../../../../assets/images/icon-trash.svg';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';
import { WeatherType } from '../../../../types';
import { fetchWeather } from '../../../../services';
import { LIST_HISTORY_STORAGE_KEY } from '../../../../utils/constants';
import './historyList.scss';

export default function HistoryList() {
  const navigate = useNavigate();
  const {
    history,
    setHistory,
    setWeatherLoading,
    setWeatherData,
    setLocation,
  } = useAppStore();

  const onDeleteHistoryItem = (index: number) => {
    const historyClone = [...history];
    historyClone.splice(index, 1);
    setHistory(historyClone);
    secureLocalStorage.setItem(LIST_HISTORY_STORAGE_KEY, historyClone);
  };

  const onSearch = async (locationIndex: number) => {
    setWeatherLoading(true);

    const data = await fetchWeather(
      history[locationIndex],
      WeatherType.WEATHER
    );

    if (data.cod === 200) {
      const historyClone = [...history];
      const location = historyClone.splice(locationIndex, 1);
      historyClone.unshift(location);
      setHistory(historyClone);
      secureLocalStorage.setItem(LIST_HISTORY_STORAGE_KEY, historyClone);

      setWeatherData(data);
      setLocation(data.name);
      setWeatherLoading(false);
      navigate('/');
    }
    setWeatherLoading(false);
  };

  return (
    <div className='history-list'>
      <h3 className='history-list__title'>Search History</h3>
      <div className='history-list__content card'>
        {history?.length ? (
          history.map((item: string, index: number) => (
            <div className='history-list__content-item' key={index}>
              <p className='history-list__content-item__city-country'>{item}</p>
              <div className='history-list__content-item__actions'>
                <img
                  src={iconSearch}
                  alt='Search'
                  onClick={() => onSearch(index)}
                />
                <img
                  src={iconBin}
                  alt='Delete'
                  onClick={() => onDeleteHistoryItem(index)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className='empty-text'>No data</p>
        )}
      </div>
    </div>
  );
}
