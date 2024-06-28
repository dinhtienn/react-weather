import iconSearch from '../../../../assets/images/icon-search.svg';
import iconBin from '../../../../assets/images/icon-trash.svg';
import './historyList.scss';

export default function HistoryList() {
  return (
    <div className='history-list'>
      <h3 className='history-list__title'>Search History</h3>
      <div className='history-list__content card'>
        <div className='history-list__content-item'>
          <p className='history-list__content-item__city-country'>Sydney, AU</p>
          <div className='history-list__content-item__actions'>
            <img src={iconSearch} alt='Search' />
            <img src={iconBin} alt='Delete' />
          </div>
        </div>
        <div className='history-list__content-item'>
          <p className='history-list__content-item__city-country'>Sydney, AU</p>
          <div className='history-list__content-item__actions'>
            <img src={iconSearch} alt='Search' />
            <img src={iconBin} alt='Delete' />
          </div>
        </div>
        <div className='history-list__content-item'>
          <p className='history-list__content-item__city-country'>Sydney, AU</p>
          <div className='history-list__content-item__actions'>
            <img src={iconSearch} alt='Search' />
            <img src={iconBin} alt='Delete' />
          </div>
        </div>
        <div className='history-list__content-item'>
          <p className='history-list__content-item__city-country'>Sydney, AU</p>
          <div className='history-list__content-item__actions'>
            <img src={iconSearch} alt='Search' />
            <img src={iconBin} alt='Delete' />
          </div>
        </div>
        <div className='history-list__content-item'>
          <p className='history-list__content-item__city-country'>Sydney, AU</p>
          <div className='history-list__content-item__actions'>
            <img src={iconSearch} alt='Search' />
            <img src={iconBin} alt='Delete' />
          </div>
        </div>
        <div className='history-list__content-item'>
          <p className='history-list__content-item__city-country'>Sydney, AU</p>
          <div className='history-list__content-item__actions'>
            <img src={iconSearch} alt='Search' />
            <img src={iconBin} alt='Delete' />
          </div>
        </div>
      </div>
    </div>
  );
}
