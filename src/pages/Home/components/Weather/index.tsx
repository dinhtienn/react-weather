import './weather.scss';

export default function Weather() {
  return (
    <div className='weather card'>
      <p className='weather__date'>January 24, 2024</p>
      <div className='weather__status'>
        <img
          className='weather__status__condition'
          src='https://openweathermap.org/img/wn/10d@2x.png'
          alt='Current status'
        />
        <div className='weather__status__temperature'>
          <p className='weather__status__temperature__detail'>26</p>
          <p className='weather__status__temperature__description'>
            Broken Clouds
          </p>
        </div>
      </div>
      <div className='weather__more'>
        <div className='weather__more__info'>
          <p className='weather__more__info__label'>Humidity</p>
          <p className='weather__more__info__detail humidity'>96</p>
        </div>
        <div className='weather__more__info'>
          <p className='weather__more__info__label'>Winds</p>
          <p className='weather__more__info__detail wind'>1.54</p>
        </div>
        <div className='weather__more__info'>
          <p className='weather__more__info__label'>Visibility</p>
          <p className='weather__more__info__detail visibility'>8</p>
        </div>
      </div>
    </div>
  );
}
